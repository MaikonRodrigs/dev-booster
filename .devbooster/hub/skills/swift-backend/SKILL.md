---
name: swift-backend
description: Server-side Swift with Vapor and Fluent. Routing, controllers, middleware, ORM models, migrations, JWT auth, testing with XCTVapor, and Linux/Docker deployment. Use when building Swift backends, REST APIs, or server-side services. Triggers on vapor, fluent, swift server, server-side swift, swift api, xctvapor, hummingbird.
allowed-tools: Read, Glob, Grep, Bash, Edit, Write
---

# Swift Backend (Server-Side Swift)

> **Philosophy:** Server-side Swift is compile-time safe, async-native, and deploys anywhere.
> **Core Principle:** Vapor 4 is the default framework, but NEVER assume the stack — ASK, then read vapor-patterns.md.

---

## 🔴 MANDATORY: Read Reference Files Before Working!

**⛔ DO NOT start implementing until you read the relevant files:**

| File | Content | Status |
| --- | --- | --- |
| **[vapor-patterns.md](vapor-patterns.md)** | **⚠️ ALL Vapor 4 + Fluent mechanics: routing, models, migrations, auth, XCTVapor, deployment** | **⬜ CRITICAL FIRST** |

> 🧠 **vapor-patterns.md is PRIORITY!** Every Vapor/Fluent API you need lives there. Read it before writing ANY route, model, or test.
> 💡 **Swift language specifics** (Sendable, async, generics) live in the `swift-apps` skill's `swift-language.md`.

---

## ⚠️ CRITICAL: ASK BEFORE ASSUMING (MANDATORY)

> **STOP! If the request is open-ended, DO NOT default to Vapor + PostgreSQL + JWT + Docker.**

### You MUST Ask If Not Specified:

| Aspect | Ask | Why |
| --- | --- | --- |
| **Framework** | "Vapor or Hummingbird?" | Different APIs, async models, ecosystem size |
| **Database** | "PostgreSQL, SQLite, or MySQL?" | Fluent drivers differ; production default is PostgreSQL |
| **Auth strategy** | "JWT, session cookie, or token store?" | Security model + client expectations |
| **Deployment target** | "Linux/Docker, macOS dev, or serverless?" | Config, env files, migration strategy |
| **Async style** | "async/await or EventLoopFuture?" | Vapor 4 supports both; async/await is the default |
| **API style** | "REST, GraphQL, or gRPC?" | Routing shape, codegen, clients |
| **Client** | "Is the consumer an iOS app in Swift?" | Shared models make server-side Swift shine |
| **Scale** | "Expected traffic & data size?" | Indexes, caching, rate limiting needs |

---

## ⛔ AI SWIFT BACKEND ANTI-PATTERNS (YASAK LİSTESİ)

> 🚫 **These are AI default tendencies that MUST be avoided!**

### Performance Sins

| ❌ NEVER DO | Why It's Wrong | ✅ ALWAYS DO |
| --- | --- | --- |
| **Blocking calls on the event loop** (`Thread.sleep`, sync disk I/O, blocking HTTP) | Freezes the thread pool, kills throughput | `async/await` + non-blocking I/O only |
| **N+1 queries in loops** | 1+N round trips, slow endpoints | Eager load with `.with(...)`, batch queries |
| **Missing indexes on filtered columns** | Full-table scans at scale | Add indexes in migrations for `filter`/`sort` keys |
| **Force-unwrapping query results** (`try! query.first()`) | 500s on empty results | Handle nil → 404 / `Abort` |
| **Sync work inside request handlers** | Blocks the event loop | Async APIs, `req.fileio` |

### Concurrency Sins

| ❌ NEVER DO | Why It's Wrong | ✅ ALWAYS DO |
| --- | --- | --- |
| **Non-Sendable shared state across requests** | Data races, crashes under Swift 6 strict concurrency | Immutable/`Sendable` values, actors |
| **Blocking code on the "main"** | No main thread server-side; blocks the loop | Async-only; `Task.detached` only when needed |
| **Event-loop hop misuse** | Deadlocks, performance traps | Stay on async/await; let Vapor schedule |
| **Global mutable singletons** | Hidden coupling, races | Inject dependencies; `app.storage` |

### Security Sins

| ❌ NEVER DO | Why It's Wrong | ✅ ALWAYS DO |
| --- | --- | --- |
| **JWT/refresh tokens in DB plaintext** | Stolen tokens = full account access | Hash tokens, or use opaque stored tokens |
| **No input validation** | Corrupt DB, injection vectors | `Validatable` + `Validations` on every DTO |
| **Missing rate limiting on auth routes** | Brute-force attacks | Nginx `limit_req` or `vapor-community/rate-limiter` |
| **Hardcoded secrets in code** | Leaks via git/logs | `.env` + `Environment.get` + secret manager |
| **Logging passwords/tokens** | Credential leaks | Never log secrets; redact errors |

### Architecture Sins

| ❌ NEVER DO | Why It's Wrong | ✅ ALWAYS DO |
| --- | --- | --- |
| **Business logic in route closures** | Untestable, unmaintainable | Service layer + `RouteCollection` controllers |
| **No service layer** | Logic duplicated across routes | One service per domain, thin controllers |
| **Global singletons everywhere** | Hidden state, hard to test | DI via `init`, `app.storage` |
| **Ignoring migrations / hand-editing schema** | Environments drift, data loss | Every schema change is a migration |
| **Returning `Model` directly as JSON** | Leaks internals (password hash!) | DTOs (`Content` structs) separate from models |

---

## 📝 CHECKPOINT (MANDATORY Before Any Backend Work)

> **Before writing ANY Vapor code, complete this checkpoint:**

```
🧠 CHECKPOINT:

Framework:    [ Vapor 4 / Hummingbird ]
Database:     [ PostgreSQL / SQLite / MySQL ]
Auth:         [ JWT / Session / Token Store ]
Deployment:   [ Docker/Linux / macOS dev ]
Async Style:  [ async/await / EventLoopFuture ]
API Style:    [ REST / GraphQL / gRPC ]
Files Read:   [ List the skill files you've read ]

3 Principles I Will Apply:
1. _______________
2. _______________
3. _______________

Anti-Patterns I Will Avoid:
1. _______________
2. _______________
3. _______________
```

**Example:**

```
🧠 CHECKPOINT:

Framework:    Vapor 4 (current stable)
Database:     PostgreSQL + Fluent
Auth:         JWT (access) + refresh token
Deployment:   Docker on fly.io
Async Style:  async/await (default)
API Style:    REST /api/v1
Files Read:   vapor-patterns.md

3 Principles I Will Apply:
1. All routes async; business logic in a service layer
2. Every schema change behind a Fluent migration
3. Validatable DTOs; never return Model as JSON

Anti-Patterns I Will Avoid:
1. Blocking calls on the event loop
2. N+1 queries → eager load relations
3. Hardcoded secrets → .env + Environment.get
```

> 🔴 **Can't fill the checkpoint? → GO BACK AND READ vapor-patterns.md.**

---

## 🧭 Framework & Stack Decision Tree

```
SERVER-SIDE SWIFT? (shared models, perf, type safety)
        │
        ├── Need Vapor's ecosystem + Fluent ORM + docs
        │   └── ✅ Vapor 4 (default choice)
        │
        ├── Minimal, lightweight, actor-based, single binary
        │   └── ✅ Hummingbird
        │
        ├── Legacy Kitura codebase (archived 2022)
        │   └── ⛔ MIGRATE to Vapor 4
        │
        ├── Team prefers Node/Python, no Swift shared models
        │   └── ✅ Node.js (Express/Fastify) or Python (FastAPI)
        │
        └── Need huge ecosystem (GraphQL libs, AI SDKs, workers)
            └── ⚠️ Prefer Node/Python/Go — Swift ecosystem is smaller
```

**When server-side Swift makes sense:**

- iOS/macOS team already writes Swift — share models, types, encoding.
- Compile-time safety for APIs, async, and `Codable` payloads.
- Strong performance and low memory footprint (Vapor is async-native).

**When it doesn't:**

- Ecosystem maturity: fewer GraphQL, workflow, and AI/ML integrations than Node/Python.
- Smaller hiring pool for server-side Swift.
- Kitura and Perfect are dead; 2026 choices are Vapor 4 (stable) and Hummingbird.

---

## 📋 Pre-Development Checklist

### Before Starting ANY Backend Project

- [ ] **Framework confirmed?** (Vapor 4 / Hummingbird)
- [ ] **Database chosen?** (PostgreSQL default)
- [ ] **Auth strategy decided?** (JWT / Session / Token)
- [ ] **Swift version confirmed?** (`swift --version` — use a Swift 6.x toolchain)
- [ ] **Linux build check run?** (`docker run --rm -v $PWD:/app -w /app swift:6.1 swift build`)
- [ ] **.env structure defined?** (no secrets in code or git)
- [ ] **Migrations planned?** (schema v1 before first deploy)
- [ ] **Logging configured?** (`LoggingSystem.bootstrap`, levels per environment)
- [ ] **Dockerfile ready?** (multi-stage, release build, non-root)
- [ ] **Health endpoint planned?** (`GET /health` for probes)

### Before Every Route / Model

- [ ] **DTO validated?** (`Validatable` on all request bodies)
- [ ] **Route returns DTO, not Model?**
- [ ] **Queries eager-load relations?** (no N+1)
- [ ] **Errors mapped to correct status codes?**

### Before Release

- [ ] **XCTVapor tests green?** (in-memory DB)
- [ ] **Migration `revert` tested?**
- [ ] **Rate limiting on auth routes?**
- [ ] **Secrets rotated and absent from git history?**
- [ ] **Release build passed on Linux?**

---

## 📚 Reference Files

For deeper guidance on specific areas:

| File | When to Use |
| --- | --- |
| **[vapor-patterns.md](vapor-patterns.md)** | **FIRST!** Vapor routing, Fluent models/migrations, auth, XCTVapor, deployment |
| [swift-language.md](../swift-apps/swift-language.md) | Swift language specifics (Sendable, async, generics) |
| [api-patterns/rest.md](../api-patterns/rest.md) | REST resource design, status codes |
| [api-patterns/auth.md](../api-patterns/auth.md) | Auth flows, token lifecycle |
| [api-patterns/versioning.md](../api-patterns/versioning.md) | API versioning strategies |
| [database-design/SKILL.md](../database-design/SKILL.md) | Schema design, indexes, normalization |

---

> **Remember:** A Swift backend that can't build on Linux and pass XCTVapor tests in memory is a prototype, not a service. Compile on Linux, test in-memory, migrate deliberately, and never block the event loop.
