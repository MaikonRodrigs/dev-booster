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

# Content from vapor-patterns.md

# Vapor & Fluent Patterns

> Read when implementing Vapor routes, models, auth, or tests.

---

## 1. Vapor Bootstrapping

### Entry Point (Vapor 4 template, async)

```swift
// ✅ CORRECT: modern async entrypoint (Vapor 4.77+ template)
import Vapor

@main
struct Entrypoint {
    static func main() async throws {
        var env = try Environment.detect()
        try LoggingSystem.bootstrap(from: &env)
        let app = try await Application.make(env)
        do {
            try await configure(app)
        } catch {
            try await app.asyncShutdown()
            throw error
        }
        try await app.execute()
        try await app.asyncShutdown()
    }
}
```

### configure.swift

```swift
// ✅ CORRECT: configure
func configure(_ app: Application) async throws {
    app.databases.use(.postgres(
        configuration: SQLPostgresConfiguration(
            hostname: Environment.get("DB_HOST") ?? "localhost",
            port: Environment.get("DB_PORT").flatMap(Int.init) ?? 5432,
            username: Environment.get("DB_USER") ?? "postgres",
            password: Environment.get("DB_PASSWORD") ?? "",
            database: Environment.get("DB_NAME") ?? "app"
        )
    ), as: .psql)

    app.migrations.add(CreateUser())
    app.migrations.add(CreateTodo())
    try await app.autoMigrate()     // dev convenience; use `swift run App migrate` in prod

    app.middleware.use(CORSMiddleware(configuration: .init(
        allowedOrigin: .all,
        allowedMethods: [.GET, .POST, .PUT, .DELETE, .PATCH],
        allowedHeaders: [.accept, .authorization, .contentType]
    )))
}
```

### Environment & .env

| API | Purpose |
| --- | --- |
| `Environment.detect()` | Picks `.development` / `.production` from `--env` args |
| `Environment.get("KEY")` | Read env var (also populated from `.env` files) |
| `.env`, `.env.development`, `.env.production` | Auto-loaded by Vapor 4; commit `.env.example`, never `.env` |
| `app.environment` | Branch on `app.environment == .production` |

### Lifecycle & Services

- Run: `swift run App serve` (default `http://0.0.0.0:8080`).
- Port: `app.http.server.configuration.port = 8080`.
- App-wide shared state: `app.storage` with an `Application.StorageKey` — e.g. `app.storage[AppConfigKey.self] = try AppConfig.load()`.
- Request-scoped state: `req.storage`.

---

## 2. Routing

### Basic Routes

```swift
// ✅ CORRECT: async route handlers
app.get("health") { req async -> HealthStatus in
    HealthStatus(status: "ok")
}

app.get("todos", ":id") { req async throws -> TodoDTO in
    guard let id = req.parameters.get("id", as: UUID.self) else {
        throw Abort(.badRequest, reason: "Invalid id")
    }
    // ...
}

app.post("todos") { req async throws -> TodoDTO in
    let create = try req.content.decode(CreateTodo.self)   // Content
    // ...
}

app.delete("todos", ":id") { req async throws -> HTTPStatus in
    // ...
    return .noContent
}
```

### Query Parameters

```swift
let search = req.query[String.self, at: "search"]    // /todos?search=milk
let page   = req.query[Int.self, at: "page"] ?? 1
```

### Grouped Routes & RouteCollection

```swift
// ✅ CORRECT: grouped routes
let api = app.grouped("api", "v1")
let todos = api.grouped("todos")                     // /api/v1/todos
todos.get(use: index)

// ✅ CORRECT: RouteCollection controller
struct TodoController: RouteCollection {
    func boot(routes: any RoutesBuilder) throws {
        let todos = routes.grouped("todos")
        todos.get(use: index)
        todos.post(use: create)
        todos.group(":id") { todo in
            todo.get(use: show)
            todo.delete(use: delete)
        }
    }
    // handlers are async methods on the struct
}
try app.register(collection: TodoController())
```

### Body Decoding & Validation

```swift
// ✅ CORRECT: Content + Validatable
struct CreateTodo: Content, Validatable {
    let title: String
    let priority: Int

    static func validations(_ validations: inout Validations) {
        validations.add("title", as: String.self, is: .count(1...200))
        validations.add("priority", as: Int.self, is: .range(0...5))
    }
}

// in route:
try CreateTodo.validate(content: req)
let create = try req.content.decode(CreateTodo.self)
```

---

## 3. Fluent ORM

### Model

```swift
// ✅ CORRECT: Fluent 4 model
final class Todo: Model, @unchecked Sendable {
    static let schema = "todos"

    @ID(key: .id) var id: UUID?
    @Field(key: "title") var title: String
    @OptionalField(key: "done_at") var doneAt: Date?
    @Enum(key: "status") var status: TodoStatus
    @Parent(key: "user_id") var user: User
    @Timestamp(key: "created_at", on: .create) var createdAt: Date?

    init() {}
    init(id: UUID? = nil, title: String, userID: UUID) {
        self.id = id
        self.title = title
        self.$user.id = userID
    }
}
```

### Migrations (the ONLY way to change schema)

```swift
// ✅ CORRECT: create
struct CreateTodo: AsyncMigration {
    func prepare(on database: any Database) async throws {
        try await database.schema("todos")
            .id()
            .field("title", .string, .required)
            .field("done_at", .datetime)
            .field("status", .string, .required)
            .field("user_id", .uuid, .required,
                   .references("users", "id", onDelete: .cascade))
            .field("created_at", .datetime)
            .unique(on: "title")
            .create()
    }
    func revert(on database: any Database) async throws {
        try await database.schema("todos").delete()
    }
}

// ✅ CORRECT: update (add a column with a default)
try await database.schema("todos")
    .field("priority", .int, .required, .sql(.default(0)))
    .update()
```

| Helper | Purpose |
| --- | --- |
| `.id()` | Primary key UUID |
| `.field(name, .string/.int/.datetime/.uuid/.bool, .required)` | Column |
| `.references("users", "id", onDelete: .cascade)` | Foreign key |
| `.unique(on: "email")` | Unique constraint |
| `.create()` / `.update()` / `.delete()` | Terminate the builder |

Run: `swift run App migrate` (`--auto-migrate` only in dev). **Never hand-edit a live DB.**

### Queries

```swift
// ✅ CORRECT: query patterns
let all = try await Todo.query(on: req.db).all()
let done = try await Todo.query(on: req.db)
    .filter(\.$status == .done)
    .sort(\.$createdAt, .descending)
    .range(0..<20)                          // pagination
    .all()

let one = try await Todo.query(on: req.db)
    .filter(\.$id == id)
    .first()                                // nil if absent → throw 404

let count = try await Todo.query(on: req.db).count()
let total = try await Order.query(on: req.db).sum(of: \.$amount)

// ✅ CORRECT: eager load (NO N+1)
let users = try await User.query(on: req.db).with(\.$todos).all()
```

### Relations

| Property wrapper | Meaning |
| --- | --- |
| `@Parent(key: "user_id")` | Belongs-to (owns the FK) |
| `@Children(for: \.$user)` | Has-many (inverse) |
| `@Siblings(through: TagTodo.self, from: \.$todo, to: \.$tag)` | Many-to-many |
| `@OptionalChild` / `@OptionalParent` | Optional inverse / parent |

### Transactions

```swift
// ✅ CORRECT: atomic operation — both writes succeed or neither does
try await req.db.transaction { db in
    try await account.updateBalance(db)
    try await ledgerEntry.create(on: db)
}
```

---

## 4. Controllers & Services

### Layering

```
Route (thin) → decode + validate → Service (business logic) → Fluent (persistence)
                                    ↓
                        DTOs (Content) — NEVER the Model
```

```swift
// ✅ CORRECT: service layer
struct TodoService {
    let db: any Database
    init(db: any Database) { self.db = db }

    func create(_ dto: CreateTodo, for user: User) async throws -> TodoDTO {
        let todo = Todo(title: dto.title, userID: try user.requireID())
        try await todo.create(on: db)
        return TodoDTO(from: todo)
    }
}

// ✅ CORRECT: DTO, NOT the model
struct TodoDTO: Content {
    let id: UUID
    let title: String
    let status: String

    init(from todo: Todo) throws {
        self.id = try todo.requireID()
        self.title = todo.title
        self.status = todo.status.rawValue
    }
}
```

### Error Mapping

```swift
// ✅ CORRECT: standard Abort
throw Abort(.notFound, reason: "Todo not found")
throw Abort(.unauthorized, reason: "Invalid credentials")
throw Abort(.unprocessableEntity, reason: "Title required")

// ✅ CORRECT: custom error
struct AppError: AbortError {
    let status: HTTPResponseStatus
    let reason: String
    var identifier: String { status.code.description }
}
throw AppError(status: .forbidden, reason: "Not your todo")
```

---

## 5. Authentication & Security

### JWT (vapor/jwt package)

```swift
// ✅ CORRECT: payload + verify
import JWT

struct UserPayload: JWTPayload, Equatable {
    let sub: SubjectClaim
    let exp: ExpirationClaim
    let role: String

    func verify(using signer: any JWTSigner) throws {
        try exp.verifyNotExpired()
    }
}

// issue:
let payload = UserPayload(
    sub: .init(value: userID.uuidString),
    exp: .init(value: Date().addingTimeInterval(3600)),
    role: "user"
)
let token = try app.jwt.sign(payload)

// verify (in route):
let payload = try req.jwt.verify(UserPayload.self)
```

### Bearer Auth (Authenticator)

```swift
// ✅ CORRECT: protect routes
app.grouped(UserAuthenticator(), User.guardMiddleware())
   .grouped("me")
   .get(use: me)

struct UserAuthenticator: AsyncBearerAuthenticator {
    func authenticate(bearer: BearerAuthorization, for request: Request)
        async throws -> (any Authenticatable)? {
        // lookup token → return user or nil
    }
}

// in handler:
let user = try req.auth.require(User.self)
```

| Approach | Use when |
| --- | --- |
| **JWT (stateless)** | Mobile apps, microservices — no server session |
| **Fluent `ModelTokenAuthenticatable`** | Opaque bearer tokens stored (hashed) in DB — revocable |
| **Session auth** | Server-rendered web apps |
| **Basic auth** | Service-to-service, dev |

### Passwords

```swift
// ✅ CORRECT: never store plaintext
let hash = try await req.password.async.hash(password)                  // Bcrypt
let valid = try await req.password.async.verify(password, created: storedHash)
```

### Security Checklist

| ❌ NEVER | ✅ ALWAYS |
| --- | --- |
| Store raw tokens / API keys | Hash tokens; secrets via env vars |
| Trust the client for identity | `req.auth.require(User.self)` after auth middleware |
| Skip validation on DTOs | `Validatable` on every write route |
| Expose `/login` to unlimited brute force | Rate limit via Nginx `limit_req` or `vapor-community/rate-limiter` |
| CORS wide open in production | Restrict `allowedOrigin` to your app's origin |
| Default security headers | Custom middleware: `X-Content-Type-Options`, `X-Frame-Options`, CSP |

---

## 6. Testing (XCTVapor)

### In-Memory DB + Testable App

```swift
// ✅ CORRECT: XCTVapor with in-memory SQLite
import XCTVapor
import Fluent
import FluentSQLiteDriver

@testable import App

final class TodoTests: XCTestCase {
    var app: Application!

    override func setUp() async throws {
        app = try await Application.make(.testing)
        app.databases.use(.sqlite(.memory), as: .sqlite)
        app.migrations.add(CreateTodo())
        try await app.autoMigrate()
        try await configure(app)
    }

    override func tearDown() async throws {
        try await app.asyncShutdown()
        app = nil
    }
}
```

### Testing Routes

```swift
// ✅ CORRECT: app.test()
try await app.test(.GET, "todos", afterResponse: { res async throws in
    XCTAssertEqual(res.status, .ok)
    let dtos = try res.content.decode([TodoDTO].self)
    XCTAssertEqual(dtos.count, 0)
})

try await app.test(.POST, "todos", beforeRequest: { req in
    try req.content.encode(CreateTodo(title: "Milk", priority: 2))
}, afterResponse: { res async throws in
    XCTAssertEqual(res.status, .created)
    XCTAssertNotNil(try res.content.decode(TodoDTO.self).id)
})

// ✅ CORRECT: testing auth-protected routes
let token = try app.jwt.sign(UserPayload(...))
try await app.test(.GET, "me", beforeRequest: { req in
    req.headers.bearerAuthorization = .init(token: token)
}, afterResponse: { res in
    XCTAssertEqual(res.status, .ok)
})
```

| Pattern | Use |
| --- | --- |
| `app.test(.GET, path, afterResponse:)` | Full-stack request through middleware |
| `app.testable()` | Reusable `TestingApplicationTester` |
| `.sqlite(.memory)` | Ephemeral DB, reset per test class |
| `app.autoMigrate()` in `setUp` | Fresh schema per suite |
| `XCTAssertEqual(res.status, .ok)` | Assert status codes, not just strings |

---

## 7. Concurrency on the Server

- **Default: async/await everywhere.** Vapor 4 route handlers, services, and Fluent APIs are async.
- **Legacy `EventLoopFuture`** still compiles in Vapor 4 — do NOT write new code with it.
- **`Sendable` matters:** Swift 6 strict concurrency flags shared state crossing task boundaries. Fluent models are `@unchecked Sendable` by convention (managed by the DB); your own shared state must be safe.

```swift
// ❌ WRONG: blocking the event loop
app.get("slow") { req async in
    Thread.sleep(forTimeInterval: 2)      // freezes the loop
    return "done"
}

// ✅ CORRECT: async, non-blocking
app.get("slow") { req async in
    try await Task.sleep(for: .seconds(2))
    return "done"
}
```

| ❌ NEVER | ✅ ALWAYS |
| --- | --- |
| `Thread.sleep`, sync `Data(contentsOf:)`, blocking file I/O in handlers | Async APIs, `req.fileio` |
| Capturing mutable shared state across requests | Immutable/`Sendable` values, actors for caches |
| Manually hopping event loops (`req.eventLoop.next()`) | Let async/await manage scheduling |
| Synchronous `EventLoopFuture` chains in new code | Rewrite with async/await |

---

## 8. Configuration & Environment

```swift
// ✅ CORRECT: typed config from env
struct AppConfig {
    let port: Int
    let jwtSecret: String
    let databaseURL: String

    static func load() throws -> AppConfig {
        AppConfig(
            port: Environment.get("PORT").flatMap(Int.init) ?? 8080,
            jwtSecret: try Environment.require("JWT_SECRET"),
            databaseURL: try Environment.require("DATABASE_URL")
        )
    }
}
// in configure: app.storage[AppConfigKey.self] = try AppConfig.load()
```

- `.env` / `.env.development` / `.env.production` are auto-loaded; add them to `.gitignore`.
- Prefer URL-based DB config: `DATABASE_URL=postgres://user:pass@host:5432/db` — `SQLPostgresConfiguration(url:)` parses it.
- Secrets come from the host (Docker `--env-file`, fly.io secrets, Railway variables). Never commit them.

---

## 9. Deployment

### Dockerfile (multi-stage)

```dockerfile
# ✅ CORRECT: Swift 6.x multi-stage build
FROM swift:6.1 AS build
WORKDIR /app
COPY Package.swift ./
COPY Sources ./Sources
RUN swift build -c release --static-swift-stdlib

FROM swift:6.1-slim
WORKDIR /app
COPY --from=build /app/.build/release/App .
COPY Public ./Public
EXPOSE 8080
ENTRYPOINT ["./App"]
CMD ["serve", "--env", "production", "--hostname", "0.0.0.0", "--port", "8080"]
```

> Pin the image to the Swift version used to build (e.g. `swift:6.1`); never mix toolchains across build/run stages.

### Platforms

| Platform | Notes |
| --- | --- |
| **fly.io** | `fly launch` detects Vapor; set secrets via `fly secrets set`; run `App migrate` as a one-off before deploy |
| **Railway** | Start command `./App serve --env production`; env vars in dashboard; add a Postgres plugin |
| **Hetzner (VPS)** | `systemd` unit + Nginx reverse proxy; certs via certbot |
| **Any Linux VPS** | Static files via `FileMiddleware` or Nginx; TLS behind a proxy |

### Reverse Proxy (Nginx)

```nginx
server {
    listen 80;
    server_name api.example.com;
    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    location /static/ {
        alias /srv/app/Public/;
    }
}
```

- Static files in-app: `app.middleware.use(FileMiddleware(publicDirectory: app.directory.publicDirectory))`.
- Health checks: `GET /health` returning `.ok`; wire into the platform probe.
- Migrations: run as a release step (one-off), not inside the app process, to avoid racing deploys.

---

## 10. Common Pitfalls & Checklist

### ❌ / ✅ Anti-Patterns

| ❌ NEVER | Why | ✅ ALWAYS |
| --- | --- | --- |
| **Blocking the event loop** (`sleep`, sync I/O) | Freezes all requests | Async/await + non-blocking I/O |
| **Forgetting to register a migration** | Schema never exists → runtime errors | `app.migrations.add(...)` + run `migrate` |
| **N+1 queries** | Slow endpoints | `.with(\.$relation)` eager load |
| **`try! Todo.query(...).first()`** | Crashes on missing row | `first()` → nil-check → `Abort(.notFound)` |
| **Secrets in `configure.swift` / git** | Leaks | `Environment.require(...)`, `.env`, secret manager |
| **Returning `Model` as JSON** | Password hash / internals exposed | DTOs |
| **Skipping `revert` in migrations** | Can't roll back on failure | Always implement `revert` |

### Pre-Release Checklist

- [ ] `swift build` clean on Linux (Docker).
- [ ] `swift test` green — XCTVapor, in-memory DB, auth included.
- [ ] Every migration has both `prepare` and `revert`.
- [ ] Every write route validates (`Validatable`).
- [ ] Auth routes rate-limited.
- [ ] `.env.example` committed, `.env` ignored.
- [ ] Health endpoint + logging wired.
- [ ] Release binary smoke-tested behind a reverse proxy.

---

> **Vapor rewards discipline:** async everywhere, schema only through migrations, models never serialized directly, and tests that run in memory. Follow that and the server stays fast, safe, and shippable.
