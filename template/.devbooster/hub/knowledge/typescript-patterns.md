# 📘 TypeScript Patterns

> **Purpose:** Problematic patterns and fixes for TypeScript Strict Mode
> **Primary official sources:** [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/) · [TypeScript Release Notes](https://devblogs.microsoft.com/typescript/)

## Project Convention Decision Rule

Before applying this guidance, verify the installed TypeScript version, `tsconfig`, local rules, existing type abstractions, runtime validation boundaries, and tests. Preserve a valid established project convention; do not replace it only because another documented approach is also valid. Use official sources to verify API behavior, compatibility, constraints, and migrations. Recommend a change only when the developer requests it or evidence shows the current approach is incompatible, unsafe, deprecated, broken, or responsible for a verified issue.

---

## Table of Contents

1. [Incorrect Import Path](#incorrect-import-path)
2. [@ts-ignore vs @ts-expect-error](#ts-ignore-vs-ts-expect-error)
3. [React useRef Guidance](#react-useref-guidance)
4. [Function Placement Around Effects](#function-placement-around-effects)
5. [Duplicate Props in Spread](#duplicate-props-in-spread)
6. [Explicit Any](#explicit-any)
7. [Null Check Missing](#null-check-missing)
8. [Model UI State with Discriminated Unions](#model-ui-state-with-discriminated-unions)
9. [Validate Untrusted Data at the Runtime Boundary](#validate-untrusted-data-at-the-runtime-boundary)

---

## Incorrect Import Path

### Problem
Importing a package subpath that is not part of its documented public API.

### Code (symptom)
```ts
// WRONG — internal package path (not public API)
import { SomeType } from 'package-name/src/internal/types'

// CORRECT — public export
import type { SomeType } from 'package-name'
```

### Why it's a problem
- A path containing `src/` is not automatically private, but an unexported deep import is not a stable public API
- Unexported paths can break in future versions without notice
- Internal types may differ from the package's supported exports

### Fix
1. Check the package documentation and its `package.json` `exports` map
2. Use the equivalent documented public path
3. If the needed type is not exported, redesign around the public API or request an export. Avoid copying a package's internal declaration unless you own and can maintain that contract.

---

## @ts-ignore vs @ts-expect-error

### Problem
`@ts-ignore` silently suppresses type errors. If the error is fixed by other changes, the comment becomes orphaned with no warning.

### Code (symptom)
```ts
// @ts-ignore — if the error disappears, nobody knows
const result = someFunction()
```

### Fix
Replace with `@ts-expect-error`:
```ts
// @ts-expect-error — reason: package X's API changed in v2
const result = someFunction()
```

### Why it's better
- If the expected error is resolved, TypeScript reports an **error** for the unused `@ts-expect-error` directive
- It makes intentional suppressions visible for future cleanup
- A lint rule such as `@typescript-eslint/ban-ts-comment` can require a description when the project needs one

### Exceptions
- `@ts-nocheck` in generated or third-party files — requires case-by-case analysis
- Files that will be deleted in an upcoming refactor — may not be worth switching

---

## React useRef Guidance

React 19 requires an explicit initial value for `useRef`; this is a React type-definition change, not a consequence of TypeScript strict mode. See the canonical guidance in [React Patterns: useRef Without Initial Value in React 19](./react-patterns.md#useref-without-initial-value-in-react-19).

For nullable object references, represent the runtime value honestly and check it before use:

```ts
const socketRef = useRef<Socket | null>(null)
if (socketRef.current) socketRef.current.send(message)
```

---

## Function Placement Around Effects

**Evidence:** Field-validated in a real audit.

### Context
A function declared with `const` after a `useEffect` callback is not necessarily a TypeScript or JavaScript hoisting error because the Effect runs after component initialization. In React code, however, source order can obscure a dependency issue when the helper is recreated during render or omitted from the dependency list.

### Guidance
For the complete React-specific pattern, including the safe alternatives and verification criteria, see [React Patterns: Function Placement Around Effects](./react-patterns.md#function-placement-around-effects).

---

## Duplicate Props in Spread

### Problem
A property may be passed through a spread and explicitly. JSX applies props from left to right, so a later explicit prop deterministically overwrites the spread value.

### Intentional override
```tsx
<Component {...props} size={16} /> // size={16} wins
```

### Avoid the duplicate
```tsx
const { size: _ignoredSize, ...rest } = props
<Component {...rest} size={16} />
```

---

## Explicit Any

### Problem
Explicit `any` disables type checking in that section. `noImplicitAny` (included by `strict`) reports implicit `any`, but it does not prohibit an explicit `any` annotation.

### Code (symptom)
```ts
const data: any = await fetchData() // loses all type safety
```

### Fix
```ts
// Option 1: A value from a typed, trusted boundary
const data: ApiResponse = await fetchData()

// Option 2: Validate untrusted API or JSON data at runtime
const data: unknown = await fetchData()
if (isApiResponse(data)) {
  console.log(data.specificField)
}
```

---

## Null Check Missing

### Problem
`strictNullChecks` reports a nullable value when it is used as though it were non-null. It is enabled by `strict` unless explicitly overridden.

### Code (symptom)
```ts
const element = document.getElementById('app')
element.textContent = 'Hello' // ❌ Object is possibly 'null'
```

### Fix
```ts
// Option 1: Early return
const element = document.getElementById('app')
if (!element) return
element.textContent = 'Hello'

// Option 2: Guarded branch
const root = document.getElementById('app')
if (root) root.textContent = 'Hello'

// Option 3: Non-null assertion, only with a proven runtime invariant
document.getElementById('app')!.textContent = 'Hello'
```

---

## Model UI State with Discriminated Unions

### Decision
When a UI has mutually exclusive async states, model the valid states explicitly instead of combining loosely related booleans such as `isLoading`, `hasError`, and nullable data.

### Example
```ts
type LoadState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error }
```

A `switch` on `status` narrows the available fields and makes unhandled states visible to the compiler.

### Verify first
- Reuse the project’s existing state/result type when one exists.
- Do not wrap a query library result in a second state model unless it adds a real domain boundary.
- Include only states the UI can actually reach; do not create abstractions that hide the library or framework behavior developers maintain.

*Source: [TypeScript Handbook — Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions)*

---

## Validate Untrusted Data at the Runtime Boundary

### Decision
Type annotations do not validate JSON, external API responses, form payloads, storage values, or any value supplied at runtime. Treat untrusted input as `unknown` until a runtime validator, schema, or type guard establishes its shape.

### Verify first
- Reuse the project’s established validation library and schemas when present.
- Keep validation near the transport, storage, or form boundary so downstream code receives a trusted type.
- Do not add a new validation library only to replace a valid project convention.

```ts
const payload: unknown = await response.json()
if (!isUser(payload)) throw new Error('Invalid user payload')
// payload is User here
```

Avoid `as User` for external input unless a proven runtime contract already guarantees it and the project convention documents that boundary.

*Sources: [TypeScript Handbook — `unknown`](https://www.typescriptlang.org/docs/handbook/2/functions.html#unknown) · [TypeScript Handbook — Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)*
