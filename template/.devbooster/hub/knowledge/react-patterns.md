# ⚛️ React Patterns

> **Purpose:** Problematic patterns and fixes for React 19 + React Hooks
> **Primary official sources:** [React documentation](https://react.dev) · [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks) · [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)

## Project Convention Decision Rule

Before applying this guidance, verify the installed versions, local rules, rendering model, existing component and hook abstractions, data-fetching conventions, and tests. Preserve a valid established project convention; do not replace it only because another documented approach is also valid. Use official sources to verify API behavior, compatibility, constraints, and migrations. Recommend a change only when the developer requests it or evidence shows the current approach is incompatible, unsafe, deprecated, broken, or responsible for a verified issue.

---

## Index

1. [Components Created During Render](#components-created-during-render)
2. [Decorative useMemo](#decorative-usememo)
3. [Initial State from localStorage](#initial-state-from-localstorage)
4. [Fetching Data in Effects](#fetching-data-in-effects)
5. [Sequential Fetches with State Dependencies](#sequential-fetches-with-state-dependencies)
6. [Legitimate Fetch in an Effect](#legitimate-fetch-in-an-effect)
7. [Derived State That Should Be Computed](#derived-state-that-should-be-computed)
8. [Lazy State Initializer](#lazy-state-initializer)
9. [Key to Reset State](#key-to-reset-state)
10. [Effect with Two Responsibilities](#effect-with-two-responsibilities)
11. [Keyed Animation Reset](#keyed-animation-reset)
12. [Function Placement Around Effects](#function-placement-around-effects)
13. [exhaustive-deps Suppressions](#exhaustive-deps-suppressions)
14. [useRef Without Initial Value in React 19](#useref-without-initial-value-in-react-19)
15. [State Mutation](#state-mutation)
16. [Choose an Async UI Strategy Before Adding an Effect](#choose-an-async-ui-strategy-before-adding-an-effect)
17. [Suspense Boundaries Are Not Data Fetchers](#suspense-boundaries-are-not-data-fetchers)
18. [Extract a Custom Hook Only for a Reusable Stateful Contract](#extract-a-custom-hook-only-for-a-reusable-stateful-contract)

---

## Components Created During Render

### Problem
Defining a React component inside the body of another component. On each render, a new component function/type is created. Because its identity changes, React unmounts and remounts that subtree, losing local state and defeating memoization.

*Source: [react.dev — Keeping Components Pure](https://react.dev/learn/keeping-components-pure)*

### Code (symptom)
```tsx
const Card = () => {
  const Icon = () => <svg>{/* ... */}</svg>  // ← RECREATED ON EVERY RENDER
  return <Icon />
}
```

### Fix
```tsx
// Option 1: Inline the element (simplest)
const Card = () => <svg>{/* ... */}</svg>

// Option 2: Extract outside the component
const Icon = () => <svg>{/* ... */}</svg>
const Card = () => <Icon />

// Option 3: Separate file (when reusable)
```
### When NOT to apply
- Rare — in practice, inline or extract always resolves it
- If the subcomponent needs many props from the parent scope, consider passing it as `children`

---

## Decorative useMemo

### Problem
`useMemo` wrapping trivial computations where the cost of the hook (dependency comparison + closure allocation) is greater than the computation itself.

*Source: [react.dev — useMemo](https://react.dev/reference/react/useMemo)*

> "You should only rely on useMemo as a performance optimization. If your code doesn't work without it, find the underlying problem and fix it first."

### Code (symptom)
```tsx
const colorClass = useMemo(() => {
  switch (status) {
    case 'active': return 'text-green-600'
    case 'inactive': return 'text-red-600'
  }
}, [status])
```

### Fix
```tsx
const colorClass = status === 'active' ? 'text-green-600' : 'text-red-600'
```

### When to keep `useMemo`
- Profiling shows that the calculation is meaningfully expensive
- A stable reference is required by a memoized child and avoids a measured re-render

Do not use `useMemo` merely because a calculation contains an array or several lines. For Effects, prefer removing unnecessary object or function dependencies—for example, create them inside the Effect—rather than memoizing solely to control when an Effect runs.

### Note on React Compiler
The React Compiler can automatically memoize eligible values and functions. It does not make every existing manual memo safe to remove: confirm the compiler is enabled for the code and validate behavior and performance before changing manual memoization.

---

## Initial State from localStorage

### Problem
Using an Effect only to read a synchronous browser value such as `localStorage` adds a render after mount in client-only applications.

*Source: [react.dev — useState: Avoiding recreating the initial state](https://react.dev/reference/react/useState#avoiding-recreating-the-initial-state)*

### Fix for client-only rendering
```tsx
const [data, setData] = useState(() => {
  try {
    const stored = localStorage.getItem('config')
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
})
```

### SSR caveat
`typeof window === 'undefined'` prevents a server-side exception, but it can still produce different initial server and client output when persisted data exists. For SSR, use the same initial value on server and client, or isolate the browser-only state behind a client-only boundary; hydrate persisted state after mount when matching initial HTML is required.

---

## Fetching Data in Effects

### Problem
Fetching in an Effect is supported when a component must synchronize with an external system, but it needs complete dependencies and stale-response handling. A loop occurs only when an Effect changes a dependency to a new value that makes the Effect run again—not simply because it calls a state setter.

*Source: [react.dev — Fetching data with Effects](https://react.dev/reference/react/useEffect#fetching-data-with-effects)*

### Dependency-correct example
```tsx
useEffect(() => {
  const controller = new AbortController()

  async function loadDetails() {
    setLoading(true)
    try {
      const response = await fetch(`/api/items/${selectedId}`, {
        signal: controller.signal,
      })
      if (!response.ok) throw new Error('Failed to load item')
      const details = await response.json()
      if (!controller.signal.aborted) setDetails(details)
    } catch (error) {
      if (!controller.signal.aborted) setError(error)
    } finally {
      if (!controller.signal.aborted) setLoading(false)
    }
  }

  if (selectedId) void loadDetails()
  return () => controller.abort()
}, [selectedId])
```

If an initial request selects an ID, keep that request separate from the details Effect; the details Effect can then react to `selectedId` without also changing it. Define async helpers inside the Effect when they are only used there, so their dependencies are explicit.

### Architectural choice
Effect-based fetching is valid, but it does not provide caching, request deduplication, or server preloading by itself. Prefer framework-integrated data loading or a caching library when those capabilities are needed.

---

## Sequential Fetches with State Dependencies

**Evidence:** Field-validated in a real audit.

### Problem
One request updates state required by a second request, while both requests are placed in the same Effect that depends on that state. This can re-run the first request after it changes the dependency and create repeated requests or a loop.

### Code (symptom)
```tsx
useEffect(() => {
  fetchPrimaryData()  // updates selectedId
  fetchDetails()      // reads selectedId
}, [selectedId])
```

### Fix
Separate the responsibilities so that the second Effect reacts to the value produced by the first:
```tsx
useEffect(() => {
  void fetchPrimaryData()
}, [])

useEffect(() => {
  if (selectedId) void fetchDetails(selectedId)
}, [selectedId])
```

If both requests must run exactly once as one workflow, keep the selected value local to a single async function instead of using state as the handoff.

### Verify first
Confirm whether `selectedId` is intentionally refreshed later. If it is, use complete dependencies, stale-response protection, and a deliberate refresh strategy rather than an empty dependency array.

---

## Legitimate Fetch in an Effect

**Evidence:** Field-validated in a real audit.

### Context
A fetch on mount is not automatically an error. It can be the correct way to synchronize visible client UI with a network resource, browser API, or another external system.

*Source: [react.dev — Fetching data with Effects](https://react.dev/reference/react/useEffect#fetching-data-with-effects)*

### Decision guidance
Keep the Effect when the data must be synchronized while the component is visible and no framework-level data-loading path is available. The Effect still needs complete dependencies, loading/error handling, and protection against stale responses.

For server-rendered applications or data that benefits from caching, preloading, or request deduplication, prefer the framework's data-loading mechanism or a client cache. This is an architectural choice, not an automatic lint fix.

---

## Derived State That Should Be Computed

### Problem
State that is purely derived from props or other state, but is being synchronized via `useEffect` instead of being computed directly.

*Source: [react.dev — You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)*

> "When something can be calculated from the existing props or state, don't put it in state. Instead, calculate it during rendering."

### Code (symptom)
```tsx
const [isActive, setIsActive] = useState(false)
useEffect(() => {
  setIsActive(statusCode === 200)
}, [statusCode])
```

### Fix
```tsx
const isActive = statusCode === 200
```

### When not to apply
- The value needs to be set independently (it is not purely derived)

An expensive derived value should still be calculated from existing state or props, optionally with `useMemo` when profiling justifies it; it should not be synchronized into separate state.

---

## Lazy State Initializer

### Problem
Initial state calculation function being called on every render, even though the result is only used on mount.

*Source: [react.dev — useState: Avoiding recreating the initial state](https://react.dev/reference/react/useState#avoiding-recreating-the-initial-state)*

### Code (symptom)
```tsx
const [items, setItems] = useState(createInitialItems())  // called on every render
```

### Fix
```tsx
const [items, setItems] = useState(createInitialItems)  // passing the function, not the result
```

### When to use
- Expensive initial computation (large arrays, complex transformations)
- Reading from `localStorage` / `sessionStorage` on mount

---

## Key to Reset State

### Problem
Effect resetting internal state when props change, typically in modals, forms, or tabs.

*Source: [react.dev — useState: Resetting state with a key](https://react.dev/reference/react/useState#resetting-state-with-a-key)*

### Code (symptom)
```tsx
<Profile userId={userId} />
// useEffect inside Profile: if (prev.userId !== userId) { setState(initial) }
```

### Fix
```tsx
<Profile key={userId} userId={userId} />
```

### Why it works
React unmounts/remounts the component when the `key` changes. Local state starts fresh without an Effect.

### Caveat
A key reset also runs cleanup and resets the entire subtree, including focus, pending work, and every local state value. Use it when a full reset is intentional.

---

## Effect with Two Responsibilities

### Problem
A single `useEffect` managing unrelated responsibilities (for example, navigation and data fetching) is harder to reason about. Splitting it must preserve each responsibility's original trigger.

*Source: [react.dev — You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)*

### Fix
```tsx
useEffect(() => {
  setScreen('details')
}, [itemId]) // preserves the original behavior

useEffect(() => {
  async function load() {
    const response = await fetch(`/api/items/${itemId}`)
    setData(await response.json())
  }
  void load()
}, [itemId])
```

When navigation is caused by a user action, prefer updating screen state in that event handler. If the actions must occur in a specific order, keep that orchestration in the event or a single deliberate workflow instead of relying on Effect ordering.

---

## Keyed Animation Reset

### Problem
An animation with local progress may need to restart when an index changes.

### Example
```tsx
function ProgressBar() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (progress >= 100) return
    const timer = setTimeout(() => {
      setProgress(value => Math.min(value + 2, 100))
    }, 100)
    return () => clearTimeout(timer)
  }, [progress])

  return <div style={{ width: `${progress}%` }} />
}

// Usage: <ProgressBar key={currentIndex} />
```

### Why it works
The `key` remounts the component and restarts its local progress. React runs the previous Effect cleanup during that unmount; the timeout also stops once progress reaches `100`.

---

## Function Placement Around Effects

**Evidence:** Field-validated in a real audit.

### Context
A function declared with `const` after an Effect is not automatically a JavaScript temporal-dead-zone error: an Effect runs after the component body finishes. However, source order can make a callback harder to inspect and can interact with Hook lint/compiler analysis when the function is recreated during render or omitted from dependencies.

*Source: [react.dev — Specifying reactive dependencies](https://react.dev/reference/react/useEffect#specifying-reactive-dependencies)*

### Safer structure
When a helper is used only by one Effect, define it inside that Effect:
```tsx
useEffect(() => {
  async function load() {
    const response = await fetch(`/api/items/${itemId}`)
    if (!response.ok) throw new Error('Failed to load item')
    setData(await response.json())
  }

  void load()
}, [itemId])
```

When a helper is shared, define it before its consumers and make its reactive dependencies explicit with `useCallback`, or restructure the flow so the Effect has complete dependencies.

### Verify first
Read the exact lint/compiler finding before reordering code. The fix may be source order, dependency management, or moving a helper into the Effect; it is not automatically a hoisting fix.

---

## exhaustive-deps Suppressions

### Problem
`eslint-disable-next-line react-hooks/exhaustive-deps` scattered throughout the code. Each suppression hides a specific reason.

*Source: [react.dev — useEffect: Specifying reactive dependencies](https://react.dev/reference/react/useEffect#specifying-reactive-dependencies)*

### Principle
Dependencies are determined by the reactive values read by the Effect; they are not selected to control when it runs. If adding a required dependency causes a loop or repeated request, restructure the Effect or its object/function inputs instead of retaining a suppression.

A suppression should be rare, documented with the proven invariant, and revisited when the Effect changes.

---



## useRef Without Initial Value in React 19

### Problem
React 19 requires `useRef` to have an explicit initial value.

### Code (symptom)
```ts
const ref = useRef<HTMLDivElement>()  // ❌ error in React 19
```

### Fix
```ts
const ref = useRef<HTMLDivElement>(null)  // ✅
```

### Variations
| Type | Fix |
|---|---|
| DOM Element | `useRef<HTMLDivElement>(null)` |
| Numeric value | `useRef<number>(0)` |
| String value | `useRef<string>('')` |

---

## State Mutation

### Problem
Directly mutating objects or arrays in state instead of replacing them with new ones.

*Source: [react.dev — Updating Objects in State](https://react.dev/learn/updating-objects-in-state)*

### Code (symptom)
```tsx
const [user, setUser] = useState({ name: 'Alex', email: 'alex@example.com' })
user.name = 'Morgan'  // ← direct mutation
setUser(user)         // ← React may bail out (same reference)
```

### Fix
```tsx
setUser({ ...user, name: 'Morgan' })
```

### Why it is unsafe
React may bail out when the reference is unchanged, but a later unrelated render can expose the mutated value. Never mutate a value held in React state directly; use a new object/array or a library such as Immer for complex nested updates.

---

## Choose an Async UI Strategy Before Adding an Effect

### Decision
A request for loading UI does not automatically require `useEffect`, `Suspense`, or a new data-fetching library. First inspect the established project approach: framework data loading, query hooks, shared API client, and existing loading, error, empty, and success-state components.

### Use the existing project pattern when
- The project already has query hooks, route loaders, or a shared async-state abstraction for the same boundary.
- Existing screens expose loading, error, empty, and retry behavior consistently.
- The pattern is compatible with the installed framework and is not the verified cause of the issue.

### Choose deliberately
- Use a framework-integrated loading path when the active framework provides one for the route or server-rendered boundary.
- Use an existing client cache/query abstraction when caching, deduplication, invalidation, or shared server state is required.
- Use an Effect to synchronize a client component with an external system when no established data layer owns that work. Include cancellation or stale-response protection, loading, error, and cleanup behavior.
- Compute synchronous derived values during render rather than creating an async state machine for them.

Do not introduce a second fetching strategy beside an established one merely because it is also supported by React.

*Sources: [React — Fetching data with Effects](https://react.dev/reference/react/useEffect#fetching-data-with-effects) · [React — You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)*

---

## Suspense Boundaries Are Not Data Fetchers

### Decision
`Suspense` renders a fallback while a descendant suspends. It does not initiate an API request, provide cache invalidation, or replace loading/error handling by itself.

### Appropriate uses
- Code splitting with `lazy`.
- Framework or library data sources explicitly documented as Suspense-compatible.
- A deliberate loading boundary whose fallback and reveal behavior match the existing UI architecture.

### Verify first
- Confirm the installed framework or data library documents the exact Suspense integration in use.
- Check whether route-level loading or the existing query layer already owns the loading state.
- Place boundaries around a meaningful visual unit; avoid a single fallback that blocks unrelated content unless that is the intended experience.
- Provide an error boundary or the project’s existing error treatment for failures. A Suspense fallback does not render request errors.

Do not replace a working project loading convention with Suspense only because React supports it.

*Sources: [React — Suspense](https://react.dev/reference/react/Suspense) · [React — lazy](https://react.dev/reference/react/lazy)*

---

## Extract a Custom Hook Only for a Reusable Stateful Contract

### Decision
Extract a custom hook when multiple consumers need the same stateful behavior, lifecycle handling, or integration contract—not simply because a component contains several lines of code.

### Verify first
- Identify at least one current or credible near-term consumer with the same inputs, outputs, and lifecycle.
- Keep UI markup, labels, and component-specific presentation in the component.
- Preserve the project’s naming, folder, testing, and return-shape conventions for hooks.
- Prefer a local helper when the logic has one consumer and extraction would obscure the flow.

A custom hook should expose a cohesive behavior contract, such as a subscription lifecycle or form interaction state. It must still follow the Rules of Hooks and keep reactive dependencies explicit.

*Sources: [React — Reusing Logic with Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks) · [React — Rules of Hooks](https://react.dev/reference/rules/rules-of-hooks)*
