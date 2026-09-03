# Web Workers in React (Offload Heavy Computation)

> **Purpose:** Keeping the main thread responsive when CPU-heavy work runs in a React app: when a Web Worker is the right tool, how to own its lifecycle with `useRef` + `useEffect`, and how to design a typed message protocol (request/response/error/progress) that stays maintainable.
> **Primary official sources:** [MDN — Web Workers API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) · [MDN — `Worker`](https://developer.mozilla.org/en-US/docs/Web/API/Worker) · [MDN — Structured clone algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm) · [MDN — Transferable objects](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Transferable_objects) · [React — `useEffect`](https://react.dev/reference/react/useEffect) · [React — `useRef`](https://react.dev/reference/react/useRef) · [React — You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)

## Project Convention Decision Rule

Before applying this guidance, verify the installed versions, local rules, existing hook and utility abstractions, data-fetching conventions, build tooling, and tests. Preserve a valid established project convention; do not replace it only because another documented approach is also valid. Use official sources to verify API behavior, compatibility, constraints, and migrations. Recommend a change only when the developer requests it or evidence shows the current approach is incompatible, unsafe, deprecated, broken, or responsible for a verified issue.

For timing-related strategies (debounce/throttle/rAF/cancellation) see [`timing-patterns.md`](./timing-patterns.md). For general React Effect, state, and custom-hook pitfalls see [`react-patterns.md`](./react-patterns.md).

---

## Table of Contents

1. [Choose where work runs before tuning how](#choose-where-work-runs-before-tuning-how)
2. [Keep the Worker instance in a ref, not state](#keep-the-worker-instance-in-a-ref-not-state)
3. [Create the Worker in an Effect with symmetric cleanup](#create-the-worker-in-an-effect-with-symmetric-cleanup)
4. [Design a typed message protocol](#design-a-typed-message-protocol)
5. [Report progress incrementally](#report-progress-incrementally)
6. [Keep payloads minimal; use transferable objects](#keep-payloads-minimal-use-transferable-objects)
7. [Extract a `useWorker` hook only after repeating the pattern](#extract-a-useworker-hook-only-after-repeating-the-pattern)
8. [Worker files in modern build tools](#worker-files-in-modern-build-tools)

---

## Choose where work runs before tuning how

### Problem / symptom

A CPU-heavy computation runs on the main thread: rendering is delayed, clicks stop responding, scrolling becomes choppy, and the application can appear frozen. Typical candidates: processing large datasets, parsing or transforming large files, image processing, expensive mathematical calculations, simulations, compression, some cryptographic workloads, and complex data analysis.

### The event loop does not make CPU work parallel

Marking the function `async` or wrapping it in `setTimeout(..., 0)` does not move the work off the main thread. Async I/O lets the browser *wait*; it does not turn heavy computation into parallel work. Only another execution context, such as a Web Worker, offloads CPU-bound work.

### Fix (decision model)

| Situation | Approach |
| --- | --- |
| Task is small/cheap (e.g. `reduce` over a handful of items) | Keep on the main thread — Worker creation and message serialization can cost more than the work itself |
| Task is a long CPU-bound computation that visibly blocks the UI | Web Worker: move the work, keep the main thread responsive |
| Task is `await fetch("/api/products")` / network wait | No Worker — waiting for a response is not the same problem as CPU-bound work |
| Large binary buffers moving between contexts | Worker + transferable objects to avoid copying costs (see section 6) |

### Verify first

- Measure that the computation actually blocks the main thread (DevTools Performance: long tasks, INP) before introducing a Worker.
- Confirm the work has no DOM dependency — a Worker has no access to `document` or the page `window`.
- A Worker changes *where* work runs, not how fast the calculation itself is — the UX win is responsiveness, not raw throughput.

*Source: [MDN — Web Workers API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)*

---

## Keep the Worker instance in a ref, not state

### Problem

Creating the Worker in the component body (`const worker = new Worker(...)`) creates a new Worker on every render. Storing the instance in `useState` treats it as UI state and schedules an extra render each time it changes, even though the rendered output does not depend on the Worker object itself.

### Fix

`useRef` holds a value that must survive renders without triggering them. Rule of thumb:

```
Does changing this value affect rendered output?
├─ Yes → state (useState)
└─ No, but the value must survive renders → a ref (useRef)
```

```tsx
const workerRef = useRef<Worker | null>(null);
```

The Worker's *result* is state; the Worker instance is a retained reference (a ref).

### Verify first

- The rendered output depends on the worker's result, not on the Worker object.
- The ref starts with an explicit initial value (`null`) — React 19 requires an explicit initial value for `useRef`.

*Source: [React — `useRef`](https://react.dev/reference/react/useRef)*

---

## Create the Worker in an Effect with symmetric cleanup

### Problem

A Worker is an external resource with its own lifetime. If creation and destruction are scattered, later renders can leak Workers and unmounting can leave work running indefinitely.

### Fix

Create the Worker in `useEffect` and destroy it in the effect's cleanup — keep the lifecycle logic together:

```tsx
useEffect(() => {
  const worker = new Worker(
    new URL("./calculation.worker.js", import.meta.url),
    { type: "module" }
  );

  workerRef.current = worker;

  const handleMessage = (event) => {
    const message = event.data;

    if (message.type === "complete") {
      setResult(message.result);
      setIsRunning(false);
    }
  };

  const handleError = (event) => {
    console.error("Worker failed:", event);
    setIsRunning(false);
  };

  worker.addEventListener("message", handleMessage);
  worker.addEventListener("error", handleError);

  return () => {
    worker.removeEventListener("message", handleMessage);
    worker.removeEventListener("error", handleError);
    worker.terminate();
    workerRef.current = null;
  };
}, []);
```

Think of this as resource lifecycle management: the effect creates the resource, its cleanup destroys the same resource, and the component body never creates another Worker just because React renders again.

### Strict Mode

During development, Strict Mode runs an extra setup/cleanup cycle. Symmetric setup/cleanup is what makes that safe: the first Worker is terminated before the next one becomes the active resource. Keep creation and destruction together so the cycle stays correct.

### Verify first

- Cleanup uses the local `worker` variable rather than whatever is in `workerRef.current` at cleanup time.
- Every listener is removed before `terminate()`.
- Sending work uses optional chaining (`workerRef.current?.postMessage(...)`) because the ref starts as `null`.

*Sources: [React — `useEffect`](https://react.dev/reference/react/useEffect) · [MDN — `Worker.terminate()`](https://developer.mozilla.org/en-US/docs/Web/API/Worker/terminate)*

---

## Design a typed message protocol

### Problem

A tiny demo can rely on message shape (`{ iterations: 100_000_000 }`), but real Workers grow: cancellation, progress, multiple operations, validation errors. Relying on object shape becomes ambiguous and tightly coupled.

### Fix

Give every message an explicit `type` plus `payload`, in both directions. Treat worker communication as a small API:

```ts
// React → Worker
worker.postMessage({
  type: "calculate",
  payload: { iterations: 100_000_000 },
});

// Worker → React
self.postMessage({ type: "progress", payload: { progress: 0.5 } });
self.postMessage({ type: "result", payload: { result: total } });
self.postMessage({ type: "error", payload: { message: "Invalid iteration count" } });
```

Worker side routes by type:

```js
self.addEventListener("message", (event) => {
  const { type, payload } = event.data;

  switch (type) {
    case "calculate":
      runCalculation(payload);
      break;
    default:
      console.warn(`Unknown worker message: ${type}`);
  }
});
```

React side filters by type instead of assuming every message is the final result.

### Verify first

- Both directions use `postMessage` — the direction is defined by who calls it, not by the API surface.
- Validate inputs inside the Worker (e.g. integer, non-negative iteration count) and reply with an explicit `error` message type.
- Extend the protocol with new `type` cases, not with shape sniffing.

*Sources: [MDN — `Worker.postMessage()`](https://developer.mozilla.org/en-US/docs/Web/API/Worker/postMessage) · [MDN — `Worker.onmessage`](https://developer.mozilla.org/en-US/docs/Web/API/Worker/message_event)*

---

## Report progress incrementally

### Problem

The page no longer freezes, but the user stares at "Calculating..." for several seconds with no signal that anything is happening.

### Fix

The Worker posts intermediate progress messages while it works; React maps them to UI state:

```js
for (let i = 0; i < iterations; i++) {
  total += Math.sqrt(i);

  if (i > 0 && i % 1_000_000 === 0) {
    self.postMessage({
      type: "progress",
      payload: { progress: i / iterations },
    });
  }
}
```

### Verify first

- Throttle progress frequency (every N iterations, not every iteration) so the UI is not flooded with messages.
- Clamp progress to `[0, 1]` and send a final progress value with the result message.
- Progress messages are a UX signal; keep them cheap and separate from the computation result.

---

## Keep payloads minimal; use transferable objects

### Problem

Messages are cloned between contexts. Sending `entireApplicationState` costs copying time and defeats the purpose of offloading.

### Fix

Send the smallest useful payload:

```ts
worker.postMessage({
  type: "calculate",
  payload: { values }, // only what the task needs
});
```

For large binary buffers, use transferable objects to move ownership instead of copying:

```ts
worker.postMessage({ type: "process", payload: buffer }, [buffer]);
```

### Verify first

- A transferred buffer is detached in the sender — it cannot be reused after transfer.
- Structured clone supports the payload types: no functions, no DOM nodes, no class instances with methods.
- For small payloads, plain structured messages are a perfectly good starting point — transferables are an optimization, not a requirement.

*Sources: [MDN — Structured clone algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm) · [MDN — Transferable objects](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Transferable_objects)*

---

## Extract a `useWorker` hook only after repeating the pattern

### Problem

Extracting an abstraction too early hides the lifecycle details before they are understood — the first Worker should be written directly so the setup/cleanup/protocol is obvious.

### Fix

Write the direct version first. Once several components need the same lifecycle contract, extract a small hook that preserves it (callback refs avoid stale closures without re-creating the Worker):

```tsx
import { useEffect, useRef } from "react";

export function useWorker(url, onMessage, onError) {
  const workerRef = useRef<Worker | null>(null);
  const onMessageRef = useRef(onMessage);
  const onErrorRef = useRef(onError);

  onMessageRef.current = onMessage;
  onErrorRef.current = onError;

  useEffect(() => {
    const worker = new Worker(url, { type: "module" });

    workerRef.current = worker;

    const handleMessage = (event) => onMessageRef.current?.(event.data);
    const handleError = (event) => onErrorRef.current?.(event);

    worker.addEventListener("message", handleMessage);
    worker.addEventListener("error", handleError);

    return () => {
      worker.removeEventListener("message", handleMessage);
      worker.removeEventListener("error", handleError);
      worker.terminate();
      workerRef.current = null;
    };
  }, [url]);

  return workerRef;
}
```

The component then focuses on what it wants the Worker to do:

```tsx
const workerRef = useWorker(
  workerUrl,
  (message) => {
    if (message.type === "result") {
      setResult(message.payload.result);
    }
  },
  (event) => console.error(event)
);
```

### Verify first

- At least one current or credible near-term second consumer exists — same contract discipline as `react-patterns.md` §18.
- The `url` dependency is stable; re-creating the Worker per URL change is the intended behavior (same resource contract as the direct version).
- Preserve the project's hook naming, folder, and return-shape conventions.

*Source: [React — Reusing Logic with Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)*

---

## Worker files in modern build tools

### Problem

`new Worker("/worker.js")` points at a file served from the site's public root, which is wrong when the Worker source belongs to the module graph.

### Fix

Use the module-aware form so the build tool recognizes and processes the Worker dependency:

```ts
new Worker(
  new URL("./calculation.worker.js", import.meta.url),
  { type: "module" }
);
```

`import.meta.url` is the current module URL; the relative Worker path resolves against it. The plain URL form is only correct for files served directly from the public root.

### Verify first

- Confirm the installed build tooling supports the `new URL(..., import.meta.url)` pattern for Worker dependencies.
- Match the chosen form to how the application is built — do not switch forms based on style.
