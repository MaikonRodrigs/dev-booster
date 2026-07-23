# TanStack Query Patterns

> **Purpose:** Practical TanStack Query v5 patterns for correct caching, mutations, cancellation, SSR hydration, and `QueryClient` lifecycle.
> **Primary official sources:** [Query keys](https://tanstack.com/query/latest/docs/framework/react/guides/query-keys) · [Query invalidation](https://tanstack.com/query/latest/docs/framework/react/guides/query-invalidation) · [Caching](https://tanstack.com/query/latest/docs/framework/react/guides/caching) · [SSR and hydration](https://tanstack.com/query/latest/docs/framework/react/guides/ssr) · [Optimistic updates](https://tanstack.com/query/latest/docs/framework/react/guides/optimistic-updates)

## Project Convention Decision Rule

Before applying this guidance, verify the installed versions, local rules, existing query and mutation hooks, query-key conventions, `QueryClient` lifecycle, configuration, and tests. Preserve a valid established project convention; do not replace it only because another documented approach is also valid. Use official sources to verify API behavior, compatibility, constraints, and migrations. Recommend a change only when the developer requests it or evidence shows the current approach is incompatible, unsafe, deprecated, broken, or responsible for a verified issue.

---

## Table of Contents

1. [Use stable, complete query keys](#use-stable-complete-query-keys)
2. [Invalidate affected queries after mutations](#invalidate-affected-queries-after-mutations)
3. [Choose `staleTime` and `gcTime` for different concerns](#choose-staletime-and-gctime-for-different-concerns)
4. [Prefetch and hydrate SSR data deliberately](#prefetch-and-hydrate-ssr-data-deliberately)
5. [Write query functions that consume `AbortSignal`](#write-query-functions-that-consume-abortsignal)
6. [Make mutation errors and optimistic rollbacks explicit](#make-mutation-errors-and-optimistic-rollbacks-explicit)
7. [Create a stable `QueryClient`](#create-a-stable-queryclient)
8. [Prefer Existing Query Ownership Over a Parallel Effect](#prefer-existing-query-ownership-over-a-parallel-effect)
9. [Render Query States Deliberately](#render-query-states-deliberately)

---

## Use stable, complete query keys

### Problem / symptom
Different data is served from one cache entry, or a query fails to refetch when a parameter changes. Common causes are a missing parameter in `queryKey` or inconsistent key shapes across the codebase.

### Fix
Use a serializable array key that uniquely describes the returned data. Include every changing variable read by the query function. Object property order does not affect hashing; array item order does.

```tsx
const itemKeys = {
  all: ['items'] as const,
  list: (filters: { status?: string }) => ['items', { filters }] as const,
  detail: (id: string) => ['items', id] as const,
}

useQuery({
  queryKey: itemKeys.detail(id),
  queryFn: () => fetchItem(id),
})
```

A key factory is optional; the requirement is stable, complete, consistently shaped keys.

### Verify first
- Compare all variables used by `queryFn` with the `queryKey`.
- Change each variable and confirm a distinct cache entry or expected refetch occurs.
- Confirm list and detail keys support the invalidation scope that mutations require.

*Source: [Query keys](https://tanstack.com/query/latest/docs/framework/react/guides/query-keys)*

---

## Invalidate affected queries after mutations

### Problem / symptom
A mutation succeeds but visible data remains stale, or invalidation refetches unrelated data unnecessarily.

### Fix
On mutation success or settlement, invalidate the smallest key prefix that represents all data changed by the mutation. `invalidateQueries` marks matching queries stale and background-refetches matching active queries; invalidation overrides configured `staleTime`.

```tsx
const queryClient = useQueryClient()

useMutation({
  mutationFn: updateItem,
  onSuccess: (_item, variables) =>
    Promise.all([
      queryClient.invalidateQueries({ queryKey: itemKeys.detail(variables.id) }),
      queryClient.invalidateQueries({ queryKey: itemKeys.all }),
    ]),
})
```

Use `{ exact: true }` only when the mutation genuinely affects one exact key. If the mutation response completely and correctly represents a cached resource, `setQueryData` can update that specific entry instead of a refetch.

### Verify first
- List every query view affected by create, update, and delete paths.
- Confirm the invalidation key matches each intended query and excludes unrelated ones.
- Confirm the mutation waits for any required invalidation promise when pending state should include the refetch.

*Source: [Query invalidation](https://tanstack.com/query/latest/docs/framework/react/guides/query-invalidation) · [Invalidation from mutations](https://tanstack.com/query/latest/docs/framework/react/guides/invalidations-from-mutations)*

---

## Choose `staleTime` and `gcTime` for different concerns

### Problem / symptom
`gcTime` is increased to stop refetching, or `staleTime` is increased to retain data for remounts. The result is an incorrect freshness policy or unexpected memory use.

### Fix
`staleTime` controls how long fetched data is considered fresh. `gcTime` controls how long an **inactive** query remains in cache before garbage collection. They are independent:

| Setting | Controls | Default described by the docs |
| --- | --- | --- |
| `staleTime` | Freshness and eligibility for automatic refetch behavior | `0` (immediately stale) |
| `gcTime` | Retention after the final observer unmounts | 5 minutes in the browser |

Set `staleTime` from the acceptable age of the data, not from navigation frequency. Set `gcTime` from the value of retaining inactive data versus memory cost.

### Verify first
- Determine the maximum acceptable data age for each query before choosing `staleTime`.
- Unmount and remount a query before and after `gcTime` to distinguish retention from freshness.
- For SSR, note that default server `gcTime` is `Infinity`; do not set it to `0`, which can remove hydrated data before rendering completes.

*Source: [Caching examples](https://tanstack.com/query/latest/docs/framework/react/guides/caching) · [SSR memory and staleness](https://tanstack.com/query/latest/docs/framework/react/guides/ssr#tips-tricks-and-caveats)*

---

## Prefetch and hydrate SSR data deliberately

### Problem / symptom
SSR markup renders data but the browser immediately fetches it again, displays different initial output, or a server cache leaks data between requests.

### Fix
For data required in initial markup, create a request-local `QueryClient` during the framework's preload/loader phase, `prefetchQuery` the required queries, `dehydrate` it, then render the client tree under `HydrationBoundary` with that state. The browser provider must create one stable client instance per application lifecycle. Set a nonzero `staleTime` when immediate background refetch after hydration is not desired.

```tsx
// Server preload phase
const queryClient = new QueryClient()
await queryClient.prefetchQuery({ queryKey: ['items'], queryFn: fetchItems })
const dehydratedState = dehydrate(queryClient)

// Rendered client tree
<HydrationBoundary state={dehydratedState}>
  <Items />
</HydrationBoundary>
```

Use `fetchQuery` rather than `prefetchQuery` when server rendering must surface a failure for framework-level handling: `prefetchQuery` does not throw, and dehydration includes successful queries by default.

### Verify first
- Confirm the server prefetch key exactly matches the browser query key.
- Confirm the dehydration payload is serialized safely by the framework and contains only data safe to deliver to the browser.
- Test a cold request and a client-side navigation; measure whether critical data refetches according to the selected `staleTime`.

*Source: [Server rendering and hydration](https://tanstack.com/query/latest/docs/framework/react/guides/ssr)*

---

## Write query functions that consume `AbortSignal`

### Problem / symptom
Superseded or unused requests continue consuming network and server resources, or manual cancellation does not cancel the underlying request.

### Fix
TanStack Query passes an `AbortSignal` to each query function. Pass it to `fetch` or a supported HTTP client. When the signal is consumed and aborted, the query promise is cancelled and the query state reverts to its previous state.

```tsx
useQuery({
  queryKey: itemKeys.detail(id),
  queryFn: async ({ signal }) => {
    const response = await fetch(`/api/items/${id}`, { signal })
    if (!response.ok) throw new Error('Unable to load item')
    return response.json()
  },
})
```

By default, an unused query is not cancelled merely because it unmounts; its resolved result can still populate the cache. Consuming the signal opts the request into cancellation behavior.

### Verify first
- Confirm the HTTP library accepts and forwards `AbortSignal`.
- Start a request, unmount or call `cancelQueries`, and inspect whether the underlying request is aborted.
- Ensure UI and error reporting distinguish an intentional cancellation from an actionable failure when that distinction matters.

*Source: [Query cancellation](https://tanstack.com/query/latest/docs/framework/react/guides/query-cancellation)*

---

## Make mutation errors and optimistic rollbacks explicit

### Problem / symptom
An optimistic cache update is overwritten by an in-flight refetch, or a failed mutation leaves incorrect optimistic data visible.

### Fix
Use the simplest option first: render a temporary mutation result from `variables` when only one view needs it. For a shared optimistic cache update, cancel relevant queries, snapshot the previous value, update the cache in `onMutate`, restore the snapshot in `onError`, and invalidate in `onSettled`.

```tsx
useMutation({
  mutationFn: updateItem,
  onMutate: async (nextItem, context) => {
    await context.client.cancelQueries({ queryKey: itemKeys.detail(nextItem.id) })
    const previous = context.client.getQueryData(itemKeys.detail(nextItem.id))
    context.client.setQueryData(itemKeys.detail(nextItem.id), nextItem)
    return { previous }
  },
  onError: (_error, item, snapshot, context) => {
    context.client.setQueryData(itemKeys.detail(item.id), snapshot?.previous)
  },
  onSettled: (_data, _error, item, _snapshot, context) =>
    context.client.invalidateQueries({ queryKey: itemKeys.detail(item.id) }),
})
```

Return the snapshot from `onMutate`; TanStack Query passes it to `onError` and `onSettled`. Retain mutation error state for a visible recovery path when appropriate.

### Verify first
- Force the mutation to fail after the optimistic update and confirm the precise previous value is restored.
- Test a refetch racing with the mutation; confirm `cancelQueries` prevents it from overwriting the optimistic state.
- Test concurrent mutations against the same key before assuming a single snapshot is sufficient.

*Source: [Optimistic updates](https://tanstack.com/query/latest/docs/framework/react/guides/optimistic-updates)*

---

## Create a stable `QueryClient`

### Problem / symptom
Cache data disappears on every render, subscriptions reset, or all requests share cache data during SSR.

### Fix
Create one `QueryClient` for the application lifecycle, not during every component render. In a React client component, initialize it lazily in state. For SSR, create a request-local client in the preload phase; do not place a request-serving cache at module scope.

```tsx
function App() {
  const [queryClient] = React.useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <Routes />
    </QueryClientProvider>
  )
}
```

An async Server Component may create a new client because it runs once on the server. The official ESLint rule can detect the render-time recreation pattern.

### Verify first
- Re-render the provider component and confirm the `QueryClient` identity remains stable.
- For SSR, make two isolated requests and confirm their dehydration payloads cannot contain each other's data.
- Enable `@tanstack/query/stable-query-client` where the ESLint plugin is used.

*Source: [Stable Query Client ESLint rule](https://tanstack.com/query/latest/docs/eslint/stable-query-client) · [SSR setup](https://tanstack.com/query/latest/docs/framework/react/guides/ssr#initial-setup)*

---

## Prefer Existing Query Ownership Over a Parallel Effect

### Decision
When a project already uses TanStack Query for a resource, the query hook owns that server state. Do not add a parallel `useEffect` fetch, duplicate local cache, or second query-key convention for the same resource.

### Verify first
- Locate existing query-key factories, query hooks, API clients, and mutation invalidation rules.
- Reuse the closest existing hook when its contract matches the screen’s data need.
- Create a new hook only when the query has a distinct key, inputs, response contract, or reuse boundary.
- Keep local state for local UI concerns; do not mirror query data into local state without a specific interaction reason.

This preserves cache coherence, loading semantics, invalidation, and developer familiarity. A plain Effect remains appropriate only when the project does not use a query layer for that boundary or when the work is not server-state ownership.

*Sources: [TanStack Query — Important Defaults](https://tanstack.com/query/latest/docs/framework/react/guides/important-defaults) · [React — Fetching data with Effects](https://react.dev/reference/react/useEffect#fetching-data-with-effects)*

---

## Render Query States Deliberately

### Decision
A query result needs an intentional UI for pending, error, empty, and success states. Preserve any shared loading, retry, empty-state, and error components already used by comparable screens.

### Example
```tsx
if (query.isPending) return <ItemsSkeleton />
if (query.isError) return <ErrorState onRetry={() => query.refetch()} />
if (query.data.length === 0) return <EmptyState />
return <ItemList items={query.data} />
```

### Verify first
- Use the status names and behavior documented for the installed TanStack Query version.
- Keep stale data visible during a background refetch when that matches the existing experience; do not replace it with a full-screen spinner without intent.
- Distinguish an empty successful response from a failed request.
- Make retry behavior and user-facing error treatment match project conventions and API semantics.

*Sources: [TanStack Query — Queries](https://tanstack.com/query/latest/docs/framework/react/guides/queries) · [TanStack Query — Background Fetching Indicators](https://tanstack.com/query/latest/docs/framework/react/guides/background-fetching-indicators)*
