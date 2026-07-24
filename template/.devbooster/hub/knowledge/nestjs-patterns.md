# NestJS Patterns

> **Purpose:** Practical patterns for dependable NestJS application boundaries.
> **Primary official sources:** [Nest modules](https://docs.nestjs.com/modules) · [Nest providers](https://docs.nestjs.com/providers) · [Nest validation](https://docs.nestjs.com/techniques/validation) · [Nest authentication](https://docs.nestjs.com/security/authentication) · [Nest exception filters](https://docs.nestjs.com/exception-filters) · [Nest configuration](https://docs.nestjs.com/techniques/configuration)

## Project Convention Decision Rule

Before applying this guidance, verify the installed versions, local rules, existing abstractions, configuration, and tests. Preserve a valid established project convention; do not replace it only because another documented approach is also valid. Use official sources to verify API behavior, compatibility, constraints, and migrations. Recommend a change only when the developer requests it or evidence shows the current approach is incompatible, unsafe, deprecated, broken, or responsible for a verified issue.

---

## Table of Contents

1. [Module and Provider Visibility](#module-and-provider-visibility)
2. [Circular Dependencies and forwardRef](#circular-dependencies-and-forwardref)
3. [Validation Pipes and DTO Transformation](#validation-pipes-and-dto-transformation)
4. [Authentication Guards and Execution Context](#authentication-guards-and-execution-context)
5. [Global Exception Filters and Error Contracts](#global-exception-filters-and-error-contracts)
6. [Configuration and Environment Validation](#configuration-and-environment-validation)
7. [Request-Scoped Provider Caveats](#request-scoped-provider-caveats)

---

## Module and Provider Visibility

### Symptom
Nest cannot resolve a dependency even though a provider exists elsewhere, or a feature accidentally depends on an implementation that should be private.

### Verify first
- Read the consuming module's `imports`, the providing module's `providers`, and its `exports`.
- Confirm injection tokens match exactly, especially for custom providers and interfaces (which do not exist at runtime).
- Check whether the module was registered in the application graph rather than merely imported by a TypeScript file.

### Fix
- Keep a provider private by default. Export only the provider token or service intended as the module's public API.
- Import the module that exports the provider; adding the provider directly to a second module creates a separate instance and may hide the ownership problem.
- Use explicit tokens for abstractions and bind them in one composition location.

### Verify
- Bootstrap a test module using the same imports as the production consumer.
- Confirm stateful providers have the intended instance lifetime.

*Sources: [Nest modules](https://docs.nestjs.com/modules), [Nest custom providers](https://docs.nestjs.com/fundamentals/custom-providers).*

---

## Circular Dependencies and forwardRef

### Problem
Two providers or modules require each other, leading to unresolved dependencies, undefined imports, or tightly coupled business behavior.

### Verify first
- Distinguish a Nest dependency cycle from a TypeScript import cycle; inspect the dependency direction and runtime tokens.
- Identify whether the services are coordinating two responsibilities that should be extracted behind a third service, event, or interface.

### Fix
- Prefer removing the cycle by extracting the shared orchestration or introducing a narrower dependency direction.
- Use `forwardRef(() => Dependency)` only when the cycle is intentional, limited, and understood. Apply it at the matching module/provider injection point.
- Do not rely on constructor order between circular providers; Nest documents that instantiation order is indeterminate.

### Verify
- Bootstrap the affected module and exercise both paths through the cycle.
- Check that unit tests can replace each side independently; difficult substitution is a sign that the boundary remains too coupled.

*Source: [Nest circular dependency fundamentals](https://docs.nestjs.com/fundamentals/circular-dependency).*

---

## Validation Pipes and DTO Transformation

### Symptom
Requests accept unexpected fields, route/query values retain string types, nested objects are not validated, or validation behavior differs between endpoints.

### Verify first
- Identify the transport and source: body, query, params, headers, or a message payload.
- Confirm the runtime DTO is a concrete class with `class-validator` decorators; TypeScript types/interfaces alone cannot be reflected for validation.
- Test representative invalid input, unknown fields, nested DTOs, and coercion edge cases such as empty strings and dates.

### Fix
- Apply a global `ValidationPipe` only after choosing an API policy for `whitelist`, `forbidNonWhitelisted`, and transformation.
- Use DTO classes for input contracts. For nested values, provide type metadata such as `@Type(() => ChildDto)` where required by `class-transformer`.
- Enable `transform` when handlers need converted primitive route/query values, but declare expected types and test coercion. Transformation is not a substitute for semantic validation.
- Keep validation rules at the boundary; preserve domain-specific invariants in application/domain logic as well.

### Verify
- Add end-to-end tests asserting the status code and error body for malformed input.
- Confirm successful inputs arrive at the handler with the expected runtime types.

*Sources: [Nest validation](https://docs.nestjs.com/techniques/validation), [class-validator](https://github.com/typestack/class-validator), [class-transformer](https://github.com/typestack/class-transformer).*

---

## Authentication Guards and Execution Context

### Problem
Authentication works for one transport but is bypassed or reads the wrong request object for another; authorization logic becomes duplicated across controllers.

### Verify first
- Identify the active transport and context: HTTP, GraphQL, WebSocket, or RPC. `ExecutionContext` exposes different arguments for each.
- Separate authentication (establishing identity) from authorization (deciding access).
- Define which routes are public and how metadata inheritance at controller and handler levels should work.

### Fix
- Put identity extraction and verification in a guard or strategy appropriate to the transport.
- Use `ExecutionContext` APIs rather than assuming `switchToHttp().getRequest()` is valid everywhere.
- Express authorization requirements as explicit metadata and enforce them in a guard. Keep resource-level checks close to the use case when they require loading the resource.
- Attach only the normalized identity/claims needed downstream; do not treat unverified decoded token data as authenticated identity.

### Verify
- Test absent, malformed, expired, and valid credentials plus forbidden-but-authenticated access.
- Exercise every supported transport and both controller- and method-level metadata paths.

*Sources: [Nest guards](https://docs.nestjs.com/guards), [Nest execution context](https://docs.nestjs.com/fundamentals/execution-context), [Nest authorization](https://docs.nestjs.com/security/authorization).*

---

## Global Exception Filters and Error Contracts

### Symptom
Clients receive inconsistent error bodies, internal details leak, or exceptions from different layers map to arbitrary status codes.

### Verify first
- Define the public error contract: status, stable machine-readable code, safe message, field errors where applicable, and correlation/request identifier policy.
- Identify adapter behavior and existing global filters/interceptors. A filter that writes an HTTP response is transport-specific.
- Classify expected domain/application errors separately from programming errors and infrastructure failures.

### Fix
- Use Nest's built-in HTTP exceptions for straightforward transport errors.
- Add a global filter to translate known application errors into one documented public contract, log unexpected errors with safe context, and avoid exposing stack traces or secrets.
- Preserve the original cause for observability when wrapping errors, but do not return it to clients.
- Avoid catching every exception inside controllers; doing so fragments error policy and can hide defects.

### Verify
- Test validation, not-found, forbidden, conflict, and unexpected-error responses.
- Ensure production responses do not contain stack traces, tokens, database errors, or internal file paths.

*Sources: [Nest exception filters](https://docs.nestjs.com/exception-filters), [Nest validation errors](https://docs.nestjs.com/techniques/validation#disable-detailed-errors).*

---

## Configuration and Environment Validation

### Problem
The application starts with missing or malformed configuration, discovers it only under traffic, or reads environment variables throughout business code.

### Verify first
- Inventory required settings, optional settings with defaults, secret sources, and environment-specific constraints.
- Confirm how configuration is loaded in each runtime; `.env` files are not automatically a production secret-management strategy.
- Decide which invalid settings must fail startup versus which can be disabled safely.

### Fix
- Centralize configuration with `@nestjs/config` and expose typed, focused configuration access to consumers.
- Validate required environment values during startup with a schema or custom validation function. Validate format and range, not only presence.
- Keep secrets out of logs, errors, repository files, and client-side configuration.
- Prefer injecting configuration over reading `process.env` across arbitrary services, which makes tests and runtime behavior harder to control.

### Verify
- Start the application with missing, malformed, and valid configurations.
- Confirm failures identify the setting safely without printing its secret value.

*Source: [Nest configuration](https://docs.nestjs.com/techniques/configuration).*

---

## Request-Scoped Provider Caveats

### Problem
A request-scoped dependency unexpectedly increases latency/memory use, causes broad scope propagation, or behaves inconsistently in non-HTTP code.

### Verify first
- Confirm that mutable per-request state cannot instead be passed as an explicit argument or carried by a transport context.
- Inspect the dependency tree: a request-scoped provider can make dependent providers request-scoped.
- Measure the allocation and latency impact under expected concurrency, and identify whether the code also runs in jobs, events, or WebSockets.

### Fix
- Keep services singleton-scoped by default; make dependencies request-scoped only for a concrete per-request lifecycle requirement.
- Pass request-specific values explicitly when practical. This preserves singleton reuse and makes behavior easier to test.
- For non-singleton scenarios, use Nest's documented context/request-provider mechanisms rather than assuming an HTTP request exists.
- Do not use request scope as a substitute for authorization isolation or transaction management.

### Verify
- Load-test the affected route and check instance lifecycle behavior.
- Exercise background and non-HTTP invocation paths if the provider is shared with them.

*Sources: [Nest injection scopes](https://docs.nestjs.com/fundamentals/injection-scopes), [Nest request lifecycle](https://docs.nestjs.com/faq/request-lifecycle).*
