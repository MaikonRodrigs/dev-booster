# tRPC Patterns

> **Purpose:** Practical tRPC v11 patterns for secure procedure boundaries, end-to-end type integrity, and observable HTTP transport.
> **Primary official sources:** [Context](https://trpc.io/docs/server/context) · [Procedures](https://trpc.io/docs/server/procedures) · [Error handling](https://trpc.io/docs/server/error-handling) · [HTTP batch link](https://trpc.io/docs/client/links/httpBatchLink) · [Type inference](https://trpc.io/docs/client/vanilla/infer-types)

## Project Convention Decision Rule

Before applying this guidance, verify the installed versions, local rules, existing router and procedure abstractions, transport configuration, error contracts, and tests. Preserve a valid established project convention; do not replace it only because another documented approach is also valid. Use official sources to verify API behavior, compatibility, constraints, and migrations. Recommend a change only when the developer requests it or evidence shows the current approach is incompatible, unsafe, deprecated, broken, or responsible for a verified issue.

---

## Table of Contents

1. [Keep authentication and authorization at procedure boundaries](#keep-authentication-and-authorization-at-procedure-boundaries)
2. [Validate every procedure input on the server](#validate-every-procedure-input-on-the-server)
3. [Map expected failures to `TRPCError`](#map-expected-failures-to-trpcerror)
4. [Preserve server-to-client type inference](#preserve-server-to-client-type-inference)
5. [Organize routers around reusable primitives and modules](#organize-routers-around-reusable-primitives-and-modules)
6. [Make batching and transport observable](#make-batching-and-transport-observable)
7. [Keep tRPC packages version-aligned](#keep-trpc-packages-version-aligned)

---

## Keep authentication and authorization at procedure boundaries

### Problem / symptom
A resolver checks authentication inconsistently, or trusts a user or permission value supplied in procedure input. This makes a protected route easy to omit during future work and leaves the authenticated value nullable throughout protected resolvers.

### Fix
Build request-derived context once per HTTP request. Export named base procedures: `publicProcedure`, an authenticated procedure that rejects missing identity, and narrower authorization procedures when a route needs a validated scope. Middleware can refine context, so `ctx.user` is non-null in downstream resolvers.

```ts
import { initTRPC, TRPCError } from '@trpc/server'

const t = initTRPC.context<Context>().create()
export const router = t.router
export const publicProcedure = t.procedure

export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.user) throw new TRPCError({ code: 'UNAUTHORIZED' })
  return next({ ctx: { user: ctx.user } })
})
```

Use input to identify the target resource, then authorize that target using trusted context and server-side data. Do not treat an input role, account identifier, or permission flag as proof of authorization.

### Verify first
- Confirm `createContext` is attached to the HTTP handler; tRPC creates it once per request, including one shared context for a batched request.
- Confirm protected procedures cannot be called without an authenticated context.
- Test an authenticated identity that lacks access to the target resource and expect `FORBIDDEN`.

*Source: [Context](https://trpc.io/docs/server/context) · [Reusable base procedures](https://trpc.io/docs/server/procedures#reusable-base-procedures)*

---

## Validate every procedure input on the server

### Problem / symptom
A TypeScript type is used as if it validates network input, or a resolver assumes the caller sent a valid ID, pagination value, or object shape.

### Fix
Add `.input(...)` to every procedure that accepts input. The parser receives untrusted `unknown` input and must return a validated value or throw. Use a supported schema library or a custom parser; keep authorization separate from shape validation.

```ts
import { z } from 'zod'

const byIdInput = z.object({ id: z.string().min(1) })

export const itemRouter = router({
  byId: protectedProcedure
    .input(byIdInput)
    .query(({ input }) => findItem(input.id)),
})
```

Validation types improve developer feedback; the runtime parser is the security boundary.

### Verify first
- Send malformed input directly to the transport, not only through the typed client.
- Confirm the resolver is not entered when parsing fails.
- Confirm limits and domain constraints needed by downstream services are included in the schema.

*Source: [Input parsers](https://trpc.io/docs/quickstart#3-using-input-parser-to-validate-procedure-inputs)*

---

## Map expected failures to `TRPCError`

### Problem / symptom
Expected conditions are thrown as generic errors, producing misleading `INTERNAL_SERVER_ERROR` responses; or detailed internal failures and stacks reach consumers.

### Fix
Throw `TRPCError` for expected API outcomes and use its documented code to express the condition. Keep unexpected errors as internal failures, observe them in the adapter's `onError`, and expose a safe message. tRPC maps its error codes to HTTP statuses and omits stack traces by default in production.

```ts
if (!item) {
  throw new TRPCError({ code: 'NOT_FOUND', message: 'Item not found' })
}
if (!canEdit(ctx.user, item)) {
  throw new TRPCError({ code: 'FORBIDDEN' })
}
```

Use `errorFormatter` only when the client needs a deliberate, safe extension to the error shape. Avoid returning raw database, provider, or stack details.

### Verify first
- Assert `UNAUTHORIZED`, `FORBIDDEN`, validation, and missing-resource paths separately.
- Check the production error response has no stack trace or confidential cause.
- Confirm `onError` records path, operation type, and a safe correlation identifier without logging secrets.

*Source: [Error codes and error handling](https://trpc.io/docs/server/error-handling)*

---

## Preserve server-to-client type inference

### Problem / symptom
The client duplicates request/response interfaces, imports server runtime code, or loses autocomplete after routers are split.

### Fix
Export the root router value and its type from the server boundary. Import `AppRouter` with `import type` on the client and give it to the tRPC client or integration. Derive any shared input/output type with `inferRouterInputs` and `inferRouterOutputs` rather than handwritten duplicates.

```ts
// server/app-router.ts
export const appRouter = router({ item: itemRouter })
export type AppRouter = typeof appRouter

// client/trpc.ts
import { createTRPCClient } from '@trpc/client'
import type { AppRouter } from '../server/app-router'

export const trpc = createTRPCClient<AppRouter>({ links: [] })
```

Treat the router type as a compile-time contract, not runtime data. The client must still handle transport, authorization, and server validation failures.

### Verify first
- Type-check a valid and invalid procedure call at the client boundary.
- Confirm the router is exported as `typeof appRouter`, not a separately maintained interface.
- Confirm the cross-boundary import is type-only and does not bundle server-only runtime dependencies.

*Source: [Quickstart: client type inference](https://trpc.io/docs/quickstart#2-type-inference--autocomplete) · [Inferring types](https://trpc.io/docs/client/vanilla/infer-types)*

---

## Organize routers around reusable primitives and modules

### Problem / symptom
One large router mixes initialization, transport setup, authorization logic, and unrelated procedures. Changes create circular imports or inconsistent procedure behavior.

### Fix
Initialize tRPC once in a dedicated module and export small primitives such as `router`, `publicProcedure`, and `protectedProcedure`. Define feature routers in separate modules, compose them into an `appRouter`, and mount that root router in the transport adapter. This keeps common behavior in base procedures and procedure ownership in feature modules.

```ts
// trpc.ts: initialization and reusable base procedures
// item-router.ts: item procedures
// app-router.ts: router({ item: itemRouter }) and AppRouter export
// http.ts: adapter, appRouter, createContext, onError
```

### Verify first
- Confirm there is a single `initTRPC...create()` initialization per server application.
- Confirm router composition does not import the HTTP adapter back into feature routers.
- Confirm common authentication behavior is inherited through base procedures, not copied per resolver.

*Source: [Quickstart: recommended separation](https://trpc.io/docs/quickstart#installation) · [Reusable base procedures](https://trpc.io/docs/server/procedures#reusable-base-procedures)*

---

## Make batching and transport observable

### Problem / symptom
Requests appear slow or fail with URI/payload errors, but telemetry only shows an HTTP request and cannot identify the individual operations hidden inside a batch.

### Fix
`httpBatchLink` batches individual operations into one HTTP request. Instrument both layers: record operation path/type/duration/errors through tRPC error handling or links, and record HTTP status, batch size, payload/URL limits, and request timing at the transport boundary. Set compatible limits deliberately.

```ts
httpBatchLink({
  url: '/trpc',
  maxItems: 10,
  maxURLLength: 2083,
})

// Configure the adapter with a matching or higher maxBatchSize.
```

A client `maxItems` value at or below the server `maxBatchSize` splits large batches before the server rejects them. If per-operation transport isolation is required, use `httpLink` instead of batch transport.

### Verify first
- Use concurrent calls and confirm the expected number of HTTP requests and operations per batch.
- Exercise a batch above the configured limit; verify the client splits it rather than receiving a server rejection.
- Inspect observability data for a single failed operation in a mixed batch.

*Source: [HTTP batch link](https://trpc.io/docs/client/links/httpBatchLink) · [Adapter `onError`](https://trpc.io/docs/server/error-handling#handling-errors)*

---

## Keep tRPC packages version-aligned

### Problem / symptom
Client and server compile against different tRPC API generations, causing missing exports, incompatible types, or transport behavior that differs from the selected documentation.

### Fix
Review every installed `@trpc/*` package used by the server and client together during an upgrade. Keep their versions compatible with the same tRPC documentation generation, update lockfiles in the same change, and run type-checking across both boundaries. The current official documentation cited here is v11.

### Verify first
- List resolved versions of `@trpc/server`, `@trpc/client`, and any installed framework integration packages.
- Confirm no duplicate incompatible tRPC versions are resolved where a shared type contract is expected.
- Type-check server and client after dependency resolution, then exercise one query and one mutation over the configured transport.

*Source: [tRPC v11 Quickstart](https://trpc.io/docs/quickstart) · [tRPC documentation](https://trpc.io/docs)*
