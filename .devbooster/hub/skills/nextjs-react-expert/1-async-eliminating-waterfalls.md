# 1. Eliminating Waterfalls

> **Impact:** CRITICAL
> **Focus:** Waterfalls are the #1 performance killer. Each sequential await adds full network latency. Eliminating them yields the largest gains.

---

## Overview

This section contains **6 rules** focused on eliminating waterfalls.

---

## Rule 1.1: Defer Await Until Needed

**Impact:** HIGH  
**Tags:** async, await, conditional, optimization

## Defer Await Until Needed

Move `await` operations into the branches where they're actually used to avoid blocking code paths that don't need them.

**Incorrect (blocks both branches):**

```typescript
async function handleRequest(userId: string, skipProcessing: boolean) {
  const userData = await fetchUserData(userId);

  if (skipProcessing) {
    // Returns immediately but still waited for userData
    return { skipped: true };
  }

  // Only this branch uses userData
  return processUserData(userData);
}
```

**Correct (only blocks when needed):**

```typescript
async function handleRequest(userId: string, skipProcessing: boolean) {
  if (skipProcessing) {
    // Returns immediately without waiting
    return { skipped: true };
  }

  // Fetch only when needed
  const userData = await fetchUserData(userId);
  return processUserData(userData);
}
```

**Another example (early return optimization):**

```typescript
// Incorrect: always fetches permissions
async function updateResource(resourceId: string, userId: string) {
  const permissions = await fetchPermissions(userId);
  const resource = await getResource(resourceId);

  if (!resource) {
    return { error: "Not found" };
  }

  if (!permissions.canEdit) {
    return { error: "Forbidden" };
  }

  return await updateResourceData(resource, permissions);
}

// Correct: fetches only when needed
async function updateResource(resourceId: string, userId: string) {
  const resource = await getResource(resourceId);

  if (!resource) {
    return { error: "Not found" };
  }

  const permissions = await fetchPermissions(userId);

  if (!permissions.canEdit) {
    return { error: "Forbidden" };
  }

  return await updateResourceData(resource, permissions);
}
```

This optimization is especially valuable when the skipped branch is frequently taken, or when the deferred operation is expensive.

---

## Rule 1.2: Dependency-Based Parallelization

**Impact:** CRITICAL  
**Tags:** async, parallelization, dependencies, better-all

## Dependency-Based Parallelization

For operations with partial dependencies, use `better-all` to maximize parallelism. It automatically starts each task at the earliest possible moment.

**Incorrect (profile waits for config unnecessarily):**

```typescript
const [user, config] = await Promise.all([fetchUser(), fetchConfig()]);
const profile = await fetchProfile(user.id);
```

**Correct (config and profile run in parallel):**

```typescript
import { all } from "better-all";

const { user, config, profile } = await all({
  async user() {
    return fetchUser();
  },
  async config() {
    return fetchConfig();
  },
  async profile() {
    return fetchProfile((await this.$.user).id);
  },
});
```

**Alternative without extra dependencies:**

We can also create all the promises first, and do `Promise.all()` at the end.

```typescript
const userPromise = fetchUser();
const profilePromise = userPromise.then((user) => fetchProfile(user.id));

const [user, config, profile] = await Promise.all([
  userPromise,
  fetchConfig(),
  profilePromise,
]);
```

Reference: [https://github.com/shuding/better-all](https://github.com/shuding/better-all)

---

## Rule 1.3: Prevent Waterfall Chains in API Routes

**Impact:** CRITICAL  
**Tags:** api-routes, server-actions, waterfalls, parallelization

## Prevent Waterfall Chains in API Routes

In API routes and Server Actions, start independent operations immediately, even if you don't await them yet.

**Incorrect (config waits for auth, data waits for both):**

```typescript
export async function GET(request: Request) {
  const session = await auth();
  const config = await fetchConfig();
  const data = await fetchData(session.user.id);
  return Response.json({ data, config });
}
```

**Correct (auth and config start immediately):**

```typescript
export async function GET(request: Request) {
  const sessionPromise = auth();
  const configPromise = fetchConfig();
  const session = await sessionPromise;
  const [config, data] = await Promise.all([
    configPromise,
    fetchData(session.user.id),
  ]);
  return Response.json({ data, config });
}
```

For operations with more complex dependency chains, use `better-all` to automatically maximize parallelism (see Dependency-Based Parallelization).

---

## Rule 1.4: Promise.all() for Independent Operations

**Impact:** CRITICAL  
**Tags:** async, parallelization, promises, waterfalls

## Promise.all() for Independent Operations

When async operations have no interdependencies, execute them concurrently using `Promise.all()`.

**Incorrect (sequential execution, 3 round trips):**

```typescript
const user = await fetchUser();
const posts = await fetchPosts();
const comments = await fetchComments();
```

**Correct (parallel execution, 1 round trip):**

```typescript
const [user, posts, comments] = await Promise.all([
  fetchUser(),
  fetchPosts(),
  fetchComments(),
]);
```

---

## Rule 1.5: Strategic Suspense Boundaries

**Impact:** HIGH  
**Tags:** async, suspense, streaming, layout-shift

## Strategic Suspense Boundaries

Instead of awaiting data in async components before returning JSX, use Suspense boundaries to show the wrapper UI faster while data loads.

**Incorrect (wrapper blocked by data fetching):**

```tsx
async function Page() {
  const data = await fetchData(); // Blocks entire page

  return (
    <div>
      <div>Sidebar</div>
      <div>Header</div>
      <div>
        <DataDisplay data={data} />
      </div>
      <div>Footer</div>
    </div>
  );
}
```

The entire layout waits for data even though only the middle section needs it.

**Correct (wrapper shows immediately, data streams in):**

```tsx
function Page() {
  return (
    <div>
      <div>Sidebar</div>
      <div>Header</div>
      <div>
        <Suspense fallback={<Skeleton />}>
          <DataDisplay />
        </Suspense>
      </div>
      <div>Footer</div>
    </div>
  );
}

async function DataDisplay() {
  const data = await fetchData(); // Only blocks this component
  return <div>{data.content}</div>;
}
```

Sidebar, Header, and Footer render immediately. Only DataDisplay waits for data.

**Alternative (share promise across components):**

```tsx
function Page() {
  // Start fetch immediately, but don't await
  const dataPromise = fetchData();

  return (
    <div>
      <div>Sidebar</div>
      <div>Header</div>
      <Suspense fallback={<Skeleton />}>
        <DataDisplay dataPromise={dataPromise} />
        <DataSummary dataPromise={dataPromise} />
      </Suspense>
      <div>Footer</div>
    </div>
  );
}

function DataDisplay({ dataPromise }: { dataPromise: Promise<Data> }) {
  const data = use(dataPromise); // Unwraps the promise
  return <div>{data.content}</div>;
}

function DataSummary({ dataPromise }: { dataPromise: Promise<Data> }) {
  const data = use(dataPromise); // Reuses the same promise
  return <div>{data.summary}</div>;
}
```

Both components share the same promise, so only one fetch occurs. Layout renders immediately while both components wait together.

**When NOT to use this pattern:**

- Critical data needed for layout decisions (affects positioning)
- SEO-critical content above the fold
- Small, fast queries where suspense overhead isn't worth it
- When you want to avoid layout shift (loading → content jump)

**Trade-off:** Faster initial paint vs potential layout shift. Choose based on your UX priorities.

---

## Rule 1.6: Promise.allSettled() for Optional, Non-Critical Data

**Impact:** MEDIUM  
**Tags:** async, parallelization, resilience, optional-data, allSettled

## Promise.allSettled() for Optional, Non-Critical Data

`Promise.all()` is all-or-nothing: one rejection rejects the entire batch. That is the correct behavior for **mandatory** data — a failed critical request must surface as an error. But **optional/enhancement** data (widgets, recommendations, auxiliary panels, analytics) should degrade gracefully instead of taking down the whole screen when a single endpoint fails. Use `Promise.allSettled()` and handle each result individually.

**Decision rule:**

- **Mandatory data** (core content, layout, conversion) → `Promise.all()`. Fail fast and render the error state.
- **Optional/enhancement data** (widgets, recommendations, auxiliary panels) → `Promise.allSettled()`. Each section renders its own fallback.

**Incorrect (one optional endpoint blanks the whole page):**

```tsx
// Optional data treated as mandatory: one rejection
// rejects the whole batch and the page renders nothing.
const [profile, widget, feed] = await Promise.all([
  fetchProfile(), // mandatory
  fetchWidgetData(), // optional — failing here kills the page
  fetchFeed(), // optional — failing here kills the page
]);
```

**Correct (start everything in parallel, fail fast only for mandatory data):**

```tsx
// Start all requests immediately — no waterfall
const profilePromise = fetchProfile();
const widgetPromise = fetchWidgetData();

// Mandatory data: still fail fast (rejects → error state/error boundary)
const profile = await profilePromise;

// Optional data: wait for the outcome, tolerate rejection
const widgetResult = await Promise.allSettled([widgetPromise]).then(
  (results) => results[0],
);
const widget = widgetResult.status === "fulfilled" ? widgetResult.value : null;

return (
  <div>
    <ProfilePanel profile={profile} />
    {widget ? <Widget data={widget} /> : <WidgetFallback />}
  </div>
);
```

Awaiting `profilePromise` first is not a waterfall: the widget request was already started, so both run in parallel.

**Batch version for multiple optional endpoints:**

```tsx
const [widgetResult, feedResult] = await Promise.allSettled([
  fetchWidgetData(),
  fetchFeed(),
]);
const widget = widgetResult.status === "fulfilled" ? widgetResult.value : null;
const feed = feedResult.status === "fulfilled" ? feedResult.value : [];
```

**When NOT to use this pattern:**

- Data the page cannot render meaningfully without — use `Promise.all()` and the error boundary instead.
- Mixing `Promise.allSettled()` inside a `Promise.all()` batch: pick one strategy per fetch group and keep it readable.
- Replacing the project's established error/empty-state conventions — keep the existing handling (see `hub/knowledge/react-patterns.md`, "Suspense Boundaries Are Not Data Fetchers").

**Trade-off:** A little more branch code per request in exchange for resilience — a single failing optional API never blanks the page.
