# Timing Patterns (Debounce, Throttle, rAF, Cancellation)

> **Purpose:** Production-grade browser timing for vanilla JS and React: debounce, throttle, `requestAnimationFrame`, passive listeners, and request cancellation — including the decision model for choosing between them and the pitfalls that basic "interview" implementations miss.
> **Primary official sources:** [MDN — `setTimeout`/`clearTimeout`](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout) · [MDN — `requestAnimationFrame`](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) · [MDN — `AbortController`](https://developer.mozilla.org/en-US/docs/Web/API/AbortController) · [MDN — `IntersectionObserver`](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver) · [MDN — `addEventListener` options](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) · [React — `useEffect`](https://react.dev/reference/react/useEffect) · [lodash — `debounce`/`throttle`](https://lodash.com/docs/4.17.15)

## Project Convention Decision Rule

Before applying this guidance, verify the installed versions, local rules, existing hook and utility abstractions, data-fetching conventions, and tests. Preserve a valid established project convention; do not replace it only because another documented approach is also valid. Use official sources to verify API behavior, compatibility, constraints, and migrations. Recommend a change only when the developer requests it or evidence shows the current approach is incompatible, unsafe, deprecated, broken, or responsible for a verified issue.

For React-specific stale-response handling in Effects, see the dedicated section in [`react-patterns.md`](./react-patterns.md). For scroll-driven animation requirements enforced by the motion audit, see [`frontend-design/scripts/ux_audit.py`](../skills/frontend-design/scripts/ux_audit.py) and the motion checklist in [`frontend-design/motion-graphics.md`](../skills/frontend-design/motion-graphics.md).

---

## Table of Contents

1. [Choose the right timing strategy](#choose-the-right-timing-strategy)
2. [Debounce: wait until calls stop](#debounce-wait-until-calls-stop)
3. [Throttle: limit execution frequency](#throttle-limit-execution-frequency)
4. [Leading and trailing execution](#leading-and-trailing-execution)
5. [Cancel pending work](#cancel-pending-work)
6. [Timer cancellation is not request cancellation](#timer-cancellation-is-not-request-cancellation)
7. [Prevent starvation with `maxWait`](#prevent-starvation-with-maxwait)
8. [Preserve `this` and arguments](#preserve-this-and-arguments)
9. [Use `requestAnimationFrame` for visual work](#use-requestanimationframe-for-visual-work)
10. [Be deliberate with passive event listeners](#be-deliberate-with-passive-event-listeners)
11. [React: avoid closure traps when debouncing](#react-avoid-closure-traps-when-debouncing)
12. [Prevent stale async responses](#prevent-stale-async-responses)

---

## Choose the right timing strategy

### Problem / symptom
An event fires far more often than the work it triggers can afford: search inputs dispatching a request per keystroke, scroll handlers performing layout reads, autosave rescheduling itself forever. Applying the wrong strategy makes the UI feel slow, causes important updates to disappear, or schedules work the browser would handle better.

### Fix
Pick by what each technique guarantees:

| Technique | Mental model | Use when | Do not use for |
| --- | --- | --- | --- |
| **Debounce** | Wait until things become quiet. | The final value matters more than intermediate values: search, validation, autosave after inactivity, resize calculations, expensive filtering. | Interactions that need immediate feedback. |
| **Throttle** | Keep running, but limit the frequency. | Intermediate updates still matter: pointer tracking, telemetry, progress calculations, high-frequency handlers. | A single final result (use debounce). |
| **`requestAnimationFrame`** | Let the browser schedule the work around its rendering cycle. | Work tied directly to rendering: progress indicators, element moves, scroll-position reads for animation. | Reliable wall-clock schedules — rAF pauses or reduces in background tabs; no heartbeats or polling. |
| **`AbortController`** | Cancel work that has already started. | Async work that can become obsolete: search requests superseded by newer input. | Situations where the request simply has not started yet (that is a timer problem, not a request problem). |

These techniques layer: a search interface debounces the input **and** uses `AbortController` for the network requests; a scroll interaction throttles non-visual analytics **and** schedules visual updates with `requestAnimationFrame`.

### Verify first
- Identify what can safely be skipped, delayed, or canceled for the specific interaction.
- Confirm the choice preserves the state the UI actually needs (latest value vs. intermediate values).
- Test against the operation cost and how quickly the UI must respond — a fixed 300 ms default is not automatically correct.

*Source: [MDN — `setTimeout`](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout) · [MDN — `requestAnimationFrame`](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) · [MDN — `AbortController`](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)*

---

## Debounce: wait until calls stop

### Problem / symptom
Typing `frontend` triggers several search requests while the word is still being entered; most responses are obsolete before they arrive.

### Fix
Delay execution until calls stop arriving for the configured interval. Every new call resets the timer.

```js
function debounce(fn, wait) {
  let timeoutId

  return function (...args) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      fn.apply(this, args)
    }, wait)
  }
}

const search = debounce(query => {
  return fetch(`/api/search?q=${encodeURIComponent(query)}`)
}, 300)

input.addEventListener('input', event => {
  search(event.target.value)
})
```

### Pitfalls
- Debouncing introduces latency **by design**; it can feel wrong for interactions that need immediate feedback.
- 300 ms is not automatically a good default. Choose it from the interaction type, operation cost, and required response time.

### Verify first
- Confirm only one call fires after a burst of rapid invocations.
- Confirm the last value is the one delivered (trailing semantics below).

*Source: [MDN — `setTimeout`](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout)*

---

## Throttle: limit execution frequency

### Problem / symptom
Pointer or scroll events fire hundreds of times per second and a handler runs on every single one, even though updates at most once per interval would be enough.

### Fix
Run at most once per interval using timestamps (leading execution — the first eligible call runs immediately):

```js
function throttle(fn, wait) {
  let lastExecution = 0

  return function (...args) {
    const now = Date.now()
    if (now - lastExecution < wait) return
    lastExecution = now
    return fn.apply(this, args)
  }
}

const handleMove = throttle(event => {
  console.log(event.clientX, event.clientY)
}, 100)

window.addEventListener('pointermove', handleMove)
```

### Pitfall
Calls during the waiting period are simply discarded. If call C (the latest state) arrives at 80 ms and nothing arrives after, the latest state is never processed. Sometimes that is desired; other times it produces stale visual state — that is where trailing execution is needed.

### Verify first
- Confirm the handler runs at most once per interval.
- Decide whether discarded calls during the interval can lose required state.

*Source: [MDN — `requestAnimationFrame`](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) for the rendering-aligned alternative*

---

## Leading and trailing execution

### Problem / symptom
A debounced or throttled function must sometimes run at the start of a burst (immediate feedback), at the end (final value), or both — and the naive implementation only supports one behavior.

### Fix
Model the behavior with `leading` and `trailing` options. A leading call executes at the beginning of a burst; a trailing call executes after the burst ends:

```
Events:      A -- B -- C -------- D -- E
Trailing:            C                 E
Leading:    A                 D
Leading+trailing: A    C       D       E
```

```js
function debounce(fn, wait, { leading = false, trailing = true } = {}) {
  let timeoutId = null
  let lastArgs
  let lastThis

  function invoke() {
    const args = lastArgs
    const context = lastThis
    lastArgs = undefined
    lastThis = undefined
    return fn.apply(context, args)
  }

  function debounced(...args) {
    const shouldCallLeading = leading && timeoutId === null
    lastArgs = args
    lastThis = this
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      timeoutId = null
      if (trailing && lastArgs) invoke()
    }, wait)
    if (shouldCallLeading) return invoke()
  }

  return debounced
}
```

Rules of thumb:
- Search box → trailing (the final query matters most).
- Instant visual feedback → leading.
- Some interactions need both — but a single isolated call should generally not execute twice with `leading + trailing` when nothing happened between the calls.

### Pitfall
Once a utility must combine `leading`, `trailing`, `maxWait`, `cancel()`, `flush()`, return values, and precise timing semantics, it is no longer a tiny helper — it is a timing library. A small implementation is fine for local application code; for reusable infrastructure, prefer an established implementation (e.g. `lodash.debounce` / `lodash.throttle`).

### Verify first
- Check the exact order of operations on a single call, a burst, and a burst followed by silence.
- Confirm leading calls receive the arguments of **that** call, not a value stored by a previous invocation.

*Source: [lodash — `debounce` options](https://lodash.com/docs/4.17.15#debounce)*

---

## Cancel pending work

### Problem / symptom
A scheduled callback becomes irrelevant before the timer fires: the user navigates away from a search page, a component unmounts, a view is destroyed.

### Fix
Expose a `cancel()` method on the wrapped function:

```js
function debounce(fn, wait) {
  let timeoutId = null

  function debounced(...args) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      timeoutId = null
      fn.apply(this, args)
    }, wait)
  }

  debounced.cancel = function () {
    clearTimeout(timeoutId)
    timeoutId = null
  }

  return debounced
}

const search = debounce(runSearch, 300)
search('javascript')
search.cancel()
```

In React, call `cancel()` in the `useEffect` cleanup that owns the debounced function.

### Verify first
- Cancel a scheduled call and confirm the callback never runs.
- Confirm repeated calls after cancellation still schedule fresh work.

*Source: [MDN — `clearTimeout`](https://developer.mozilla.org/en-US/docs/Web/API/clearTimeout) · [React — synchronizing with Effects](https://react.dev/reference/react/useEffect)*

---

## Timer cancellation is not request cancellation

### Problem / symptom
`cancel()` is used to stop a search, but a request that already started keeps resolving and updating state.

### Fix
Understand the two layers: `cancel()` clears the timer **before** the operation starts; it cannot stop an in-flight request. Stop in-flight work with `AbortController`:

```js
let controller

async function runSearch(query) {
  controller?.abort()
  controller = new AbortController()

  const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`, {
    signal: controller.signal,
  })

  return response.json()
}
```

A real search interface may need both: debounce reduces unnecessary requests; `AbortController` cancels obsolete ones.

### Verify first
- Confirm `cancel()` only prevents work that has not started.
- Confirm aborting the signal rejects the fetch with an `AbortError` that the caller handles.

*Source: [MDN — `AbortController`](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)*

---

## Prevent starvation with `maxWait`

### Problem / symptom
Pure debounce postpones execution forever when events keep arriving: an autosave with a 300 ms delay and input every 200 ms never fires.

### Fix
Add `maxWait` — an upper bound on how long execution can be delayed:

```js
const save = debounce(saveDraft, 300, { maxWait: 2000 })
```

Behavior: wait for 300 ms of inactivity, but never postpone the operation for more than 2000 ms. Autosave benefits from both: save after the user stops editing, while guaranteeing periodic progress during a long writing session.

### Pitfall
`maxWait` changes the timing model substantially: track both the normal delay and the maximum delay, which affects leading calls, trailing calls, cancellation, repeated invocations, and timer cleanup. For production-grade semantics, prefer an established implementation over adding more branches to a small custom helper.

### Verify first
- Feed a continuous stream of calls past `maxWait` and confirm the callback eventually runs.
- Confirm cleanup still clears all timers on `cancel()`.

*Source: [lodash — `debounce` `maxWait`](https://lodash.com/docs/4.17.15#debounce)*

---

## Preserve `this` and arguments

### Problem / symptom
Wrapping a method in debounce/throttle changes its invocation semantics: `user.search.bind(user)` passed as a listener, or a wrapped method call, can lose the intended receiver.

### Fix
Preserve the `this` value with which the wrapper itself was called, and forward the arguments:

```js
return function (...args) {
  const context = this
  clearTimeout(timeoutId)
  timeoutId = setTimeout(() => {
    fn.apply(context, args)
  }, wait)
}
```

If the wrapper is called by an input element, `context` is still that element. When a specific object is required, bind explicitly or avoid dynamic `this` entirely:

```js
const search = debounce(user.search.bind(user), 300)

// or
const search = debounce(query => {
  user.search(query)
}, 300)
```

### Pitfall
Two separate questions exist: does the wrapper preserve the `this` of its caller, and is that caller the object you actually wanted? They are not the same problem. Explicit dependencies are usually easier to reason about than clever `this` behavior.

### Verify first
- Call the wrapped function as a method and confirm the receiver and arguments are correct.
- Confirm behavior when passed as an event listener.

*Source: [MDN — `Function.prototype.apply`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply) · [MDN — `Function.prototype.bind`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)*

---

## Use `requestAnimationFrame` for visual work

### Problem / symptom
A scroll handler updates visual state on every scroll tick with an arbitrary millisecond throttle, fighting the browser rendering cycle.

### Fix
For rendering work, schedule with `requestAnimationFrame` and let the browser align the callback with its rendering cycle:

```js
let frameId = null

window.addEventListener('scroll', () => {
  if (frameId !== null) return
  frameId = requestAnimationFrame(() => {
    updateVisualState()
    frameId = null
  })
})
```

Useful for: progress indicators, moving elements, reading scroll position for animations, synchronizing visual state.

### Pitfall
rAF is **not** a general-purpose timer. Browsers may reduce or pause animation frame callbacks when the page is hidden or in a background tab. Do not use it for heartbeats, background polling, or business logic that must run on a reliable wall-clock schedule.

The motion audit in this kit enforces throttled/rAF handling for scroll-driven animations — see [`frontend-design/scripts/ux_audit.py`](../skills/frontend-design/scripts/ux_audit.py) and the checklist in [`frontend-design/motion-graphics.md`](../skills/frontend-design/motion-graphics.md).

### Verify first
- Confirm visual updates stop being scheduled while a frame is already pending.
- Confirm the operation is rendering work, not business logic that needs a wall-clock guarantee.

*Source: [MDN — `requestAnimationFrame`](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)*

---

## Be deliberate with passive event listeners

### Problem / symptom
`passive: true` is applied everywhere as a generic scroll-performance trick, or scroll handlers stay non-passive and the browser waits to see whether JavaScript cancels the gesture.

### Fix
Use `passive: true` on listeners for events whose default scrolling behavior can be prevented and that will not call `preventDefault()`:

```js
element.addEventListener('touchmove', handleTouchMove, { passive: true })
```

The practical benefit is mainly for touch and wheel interactions, not a magic switch for `scroll` itself — the expensive part is usually the work inside the handler. Keep handlers lightweight, move visual updates into `requestAnimationFrame`, and avoid mixing layout reads and writes. Where the intention is visibility/position detection, prefer `IntersectionObserver` over continuous measurement during scroll:

```js
const observer = new IntersectionObserver(entries => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      // element became visible — reflect intent, no scroll measurement
    }
  }
})

observer.observe(element)
```

The full listener guidance (correct/incorrect examples, when to use and not to use) is covered by Rule 4.2 in the Next.js/React skill — [`nextjs-react-expert/4-client-client-side-data-fetching.md`](../skills/nextjs-react-expert/4-client-client-side-data-fetching.md).

### Verify first
- Confirm no listener with `passive: true` calls `preventDefault()`.
- Confirm visual work during scroll is implemented with rAF or throttling, not raw per-event work.

*Source: [MDN — `addEventListener` options](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) · [MDN — `IntersectionObserver`](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver)*

---

## React: avoid closure traps when debouncing

### Problem / symptom
A debounced callback created with `useMemo(..., [])` captures state from the initial render and keeps referring to the stale value forever:

```tsx
function Search() {
  const [query, setQuery] = useState('')

  const search = useMemo(
    () => debounce(() => {
      console.log(query) // stale: initial render's query
    }, 300),
    []
  )
  // ...
}
```

### Fix
Do not read state from the debounced closure — pass the latest value as an argument, and cancel on unmount:

```tsx
function Search() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])

  const search = useMemo(
    () => debounce(async value => {
      console.log('Search:', value)
      // fetch with value...
    }, 300),
    []
  )

  useEffect(() => {
    return () => search.cancel()
  }, [search])

  function handleChange(event) {
    const value = event.target.value
    setQuery(value)
    search(value)
  }

  return <input value={query} onChange={handleChange} />
}
```

### Alternative: debounce the value
When the timing behavior is better represented as state, extract a `useDebouncedValue` hook and trigger the work from an effect on the debounced value:

```tsx
function useDebouncedValue(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timeoutId = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timeoutId)
  }, [value, delay])

  return debouncedValue
}
```

```tsx
function Search() {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebouncedValue(query, 300)

  useEffect(() => {
    if (!debouncedQuery.trim()) return
    // perform search for debouncedQuery
  }, [debouncedQuery])

  return <input value={query} onChange={event => setQuery(event.target.value)} />
}
```

This makes the timing explicit in state (with cleanup handled by the effect) instead of hidden inside an event-callback wrapper.

### Verify first
- Confirm the debounced callback never reads state directly from a closure.
- Confirm cleanup cancels pending timers on unmount.
- Confirm `useDebouncedValue` cleans up its timeout when `value` or `delay` changes.

*Source: [React — `useEffect`](https://react.dev/reference/react/useEffect) · [React — `You Might Not Need an Effect`](https://react.dev/learn/you-might-not-need-an-effect)*

---

## Prevent stale async responses

### Problem / symptom
Two search requests overlap — `react` takes 800 ms, `react hooks` takes 100 ms — and the older response overwrites the newer results.

### Fix
Cancel obsolete requests as new ones start, combining debounce with `AbortController` so each layer has one responsibility (debounce reduces unnecessary requests; abort cancels obsolete requests):

```js
let controller

async function search(query) {
  controller?.abort()
  controller = new AbortController()

  try {
    const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`, {
      signal: controller.signal,
    })
    return await response.json()
  } catch (error) {
    if (error.name === 'AbortError') return
    throw error
  }
}

const debouncedSearch = debounce(search, 300)
```

### React variant
In React Effects, guard state updates with the signal's `aborted` flag or abort in the cleanup — see the dedicated "Fetching Data in Effects" section in [`react-patterns.md`](./react-patterns.md). When the request layer already cancels stale work (e.g. TanStack Query consuming `AbortSignal`), prefer that convention over a parallel manual controller.

### Verify first
- Fire overlapping requests and confirm the stale response cannot update state.
- Confirm `AbortError` is handled and not surfaced as a real error.

*Source: [MDN — `AbortController`](https://developer.mozilla.org/en-US/docs/Web/API/AbortController) · [TanStack Query — query functions](https://tanstack.com/query/latest/docs/framework/react/guides/query-functions)*
