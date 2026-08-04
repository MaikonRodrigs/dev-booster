# Swift Language Reference

> Read first — Swift fundamentals, concurrency, and memory. Correct Swift is the foundation of every Apple platform app.
> **This file is PRIORITY: value semantics and Swift 6 concurrency are where AI-generated Swift fails hardest.**

---

## 1. Value Types vs Reference Types

### Decision Table

| Type | Semantics | Use When |
| --- | --- | --- |
| **struct** | Value — copied on assignment | Default for models, DTOs, view state |
| **enum** | Value — one of a set of cases | State machines, options, Result-style models |
| **class** | Reference — shared identity | Rare; Cocoa interop, legacy code |
| **actor** | Reference + isolated mutable state | Shared mutable state across concurrency |

**Rules:**

- Prefer `struct`. Collections (`Array`/`Dictionary`/`Set`/`String`/`Data`) are copy-on-write — copies are cheap until one side mutates.
- Identity: `class` compares by reference (`===`); `struct` by value (`==` after `Equatable`).
- A `let` struct is fully immutable; mutate via `var` + `mutating` methods.

```swift
// ✅ CORRECT: value-type model — copies are isolated, no aliasing bugs
struct User { var name: String; var isAdmin: Bool }
var a = User(name: "Ana", isAdmin: false)
var b = a
b.isAdmin = true          // a.isAdmin is still false

// ❌ WRONG: shared mutable class — silent aliasing surprises
final class UserBox { var name = "Ana" }
let x = UserBox()
let y = x
y.name = "Bob"            // x.name changed too
```

---

## 2. Protocols & Generics

- Protocol-oriented design: define capabilities (`protocol Persistable`), model with `struct`, extend the protocol for behavior.
- Composition: `func save(_ x: Foo & Bar)`.
- **Opaque types (`some Protocol`)**: concrete type fixed but hidden — use for return values (`var body: some View`). No runtime cost.
- **Existentials (`any Protocol`)**: type-erased box, dynamic dispatch, heap allocation — use only for genuinely heterogeneous collections.
- Primary associated types (Swift 5.7+): `Collection<Element>`, `Sequence<Element>`.
- Constraints with `where` clauses: `func f<C: Collection>(_ c: C) where C.Element == Int`.

| Construct | Use | Cost |
| --- | --- | --- |
| `some P` (opaque) | Single fixed concrete type, hidden identity | None (static dispatch) |
| `any P` (existential) | Mixed concrete types in one container | Boxing + dynamic dispatch |
| Generic `<T: P>` | Reuse across types, keep concrete type | None (static dispatch) |

```swift
protocol Vehicle { var name: String { get }; func topSpeed() -> Double }

// ✅ CORRECT: opaque return — concrete type fixed, identity hidden
func makeVehicle() -> some Vehicle { Car() }

// ✅ CORRECT: generic + where clause — no dynamic dispatch
func fastest<C: Collection>(_ vehicles: C) -> Double where C.Element == Vehicle {
    vehicles.map { $0.topSpeed() }.max() ?? 0
}

// ❌ WRONG: `any` existential for everything — boxing + dynamic dispatch
let vehicles: [any Vehicle] = [Car(), Boat()]  // only when types truly differ
```

---

## 3. Error Handling & Optionals

- `throws`/`try`/`catch` for expected failures; `defer` for cleanup (runs LIFO at scope exit — never use it for logic ordering).
- `Result<Success, Failure>` for callback/return-style APIs.
- Unwrap ladder: `guard let` (early exit, required) > `if let` (scoped) > `??` default > `?.` chaining.
- `!` and `try!` are NEVER acceptable in production paths — a nil crashes the app.

```swift
func loadConfig() throws -> Config {
    defer { FileLock.shared.release() }     // ✅ runs on every exit path
    guard let url = URL(string: raw) else { throw ConfigError.badURL }
    ...
}

// ❌ WRONG: force unwrap + force try — crashes on any nil/throw
let url = URL(string: raw)!
let config = try! JSONDecoder().decode(Config.self, from: data)

// ✅ CORRECT: graceful optional handling
guard let url = URL(string: raw) else { return }
let config = try? JSONDecoder().decode(Config.self, from: data)  // nil on failure — handle it
```

```swift
// ✅ CORRECT: Result for callback-style APIs
func fetch(_ completion: @escaping (Result<Config, Error>) -> Void) { ... }
fetch { result in
    switch result {
    case .success(let config): render(config)
    case .failure(let error): show(error)
    }
}
```

---

## 4. Concurrency (async/await, Swift 5.5+ / 6)

### Core Building Blocks

| API | Role |
| --- | --- |
| `async`/`await` | Sequential async code, no callback pyramids |
| `Task { }` | Fire-and-forget work; inherits the surrounding actor context |
| `Task.detached { }` | Work NOT inheriting context — prefer `Task` |
| `async let` | Parallel child tasks |
| `TaskGroup` | Dynamic fan-out of many child tasks |
| `@MainActor` | Isolate UI code to the main thread |
| `@Sendable` | Values/closures safe to cross isolation boundaries |
| `nonisolated` | Actor member callable without isolation (must not touch state) |
| `AsyncSequence`/`AsyncStream` | Async iteration; bridge callbacks to `for await` |
| `withCheckedThrowingContinuation` | Bridge completion-handler APIs |

### Swift 6 Strict Concurrency — What Changes

- Compile-time data-race safety: sharing non-`Sendable` mutable state across isolation boundaries is an error.
- Region-based isolation (SE-0414): values may cross boundaries when ownership is provably exclusive.
- `nonisolated(unsafe)` (Swift 5.10+) escapes the checker for legacy globals — document why.
- Swift 6.1+ opt-in default isolation (SE-0466): `SWIFT_DEFAULT_ACTOR_ISOLATION = MainActor` — new app types default to the main actor.
- Migration path: `SWIFT_STRICT_CONCURRENCY = minimal` → `targeted` → `complete` → Swift 6 language mode.
- Actors are reentrant: state can change at `await` points — re-check invariants after awaiting.
- Cancellation: `Task.isCancelled`, `try Task.checkCancellation()`, `Task.sleep(for:)` throws when cancelled.

### Migration Table: Swift 5 → Swift 6

| Swift 5 pattern | Swift 6-safe pattern |
| --- | --- |
| Shared mutable `class` singleton | `actor` or `@MainActor` singleton |
| Global mutable state | Isolated state (actor / `@MainActor`; `nonisolated(unsafe)` as documented last resort) |
| Completion-handler APIs | async/await wrappers via `withCheckedThrowingContinuation` |
| `@Published` model churn | `@Observable` (iOS 17+) with granular invalidation |
| Callbacks on arbitrary queues | Hop explicitly: `await MainActor.run { }` or `Task { @MainActor in }` |
| Unchecked `Sendable` conformances | Eliminate; prefer isolation |
| `DispatchQueue` for serial work | `actor` |

### Sendability Quick Check

- ✅ Sendable by default: value types (`struct`/`enum`) whose stored properties are Sendable; `final class` with only immutable `let` Sendable properties.
- ❌ NOT Sendable: mutable `class`, `var`-state singletons, `ObservableObject` models, UIKit/AppKit objects.
- ✅ A non-`Sendable` value may cross isolation if ownership moves (region-based isolation) — don't fight the compiler with `@unchecked Sendable`.

```swift
// ✅ CORRECT: actor isolates mutable state
actor Scoreboard {
    private var scores: [String: Int] = [:]
    func add(_ points: Int, for player: String) { scores[player, default: 0] += points }
}

// ✅ CORRECT: async let runs the two fetches concurrently
let (users, posts) = try await (fetchUsers(), fetchPosts())

// ❌ WRONG: data race — two tasks mutate shared state (Swift 6: compile error)
final class Counter { var n = 0 }
Task { counter.n += 1 }; Task { counter.n += 1 }

// ✅ CORRECT: bridge a callback API to async
func legacyLoad() async throws -> Data {
    try await withCheckedThrowingContinuation { continuation in
        legacyFetch { result in continuation.resume(with: result) }
    }
}
```

---

## 5. Memory Management (ARC)

- Strong reference cycles leak. **Prefer `weak` over `unowned`**: `unowned` crashes (precondition failure) if the instance is already gone. `unowned` is only safe when the referent provably outlives the closure.
- Escaping closures capture strongly by default — use capture lists: `[weak self]`, then `guard let self else { return }` (Swift 5.7+ shorthand).
- Value types are copy-on-write: passing `Array`/`String`/`Data` shares storage until one side mutates.

```swift
final class Downloader {
    var onComplete: (() -> Void)?

    func start() {
        // ❌ WRONG: strong capture — Downloader never deallocates
        onComplete = { self.finish() }

        // ✅ CORRECT: weak capture breaks the cycle
        onComplete = { [weak self] in
            guard let self else { return }
            self.finish()
        }
    }
}
```

---

## 6. Enums & Pattern Matching

- `enum` with associated values models states, results, and options better than strings or booleans — the compiler enforces exhaustiveness.
- Synthesized `Equatable`/`Hashable`: just declare conformance; the compiler generates it.
- `switch` is exhaustive; `if case`/`guard case` for single-case checks; `where` clauses refine patterns.
- Result-style modeling: represent each outcome as a case with payloads — no hidden state.

```swift
enum LoadState: Equatable {
    case idle
    case loading(progress: Double)
    case loaded([Item])
    case failed(String)
}

switch state {
case .loading(let p) where p > 0.5:   // pattern + where guard
    showProgress(p)
case .loaded(let items):
    render(items)
case .failed(let message):
    showError(message)
case .idle:
    break
}

if case .failed(let message) = state {
    logger.error(message)
}
```

---

## 7. Common Pitfalls

| ❌ NEVER | Why It's Wrong | ✅ ALWAYS |
| --- | --- | --- |
| `x!` force unwrap | Crashes on nil | `guard let` / `??` / explicit failure |
| `try!` / `as!` | Crashes on failure | `try?` + handle nil, `as?` + `guard` |
| Strong capture of `self` in escaping closure | Retain cycle | `[weak self]` + `guard let self` |
| Mutating a `let` struct property | Compile error | `var` + `mutating func` |
| Indexing `String` with `Int` | Wrong API / compile error | `String.Index`, `firstIndex(of:)` |
| Integer overflow (`Int8(127) + 1`) | Runtime trap | `&+` (explicit wrap) or `addingReportingOverflow` |
| `Any` for dynamic behavior | Erases type, slow dispatch | Generics / `some` / `any` deliberately |
| `defer` for ordering guarantees | LIFO surprises | `defer` only for cleanup |
| `==` on classes | Reference compare — silent bug | Implement `Equatable` intentionally |
| Global mutable state | Data races under Swift 6 | Actor / `@MainActor` isolation |

```swift
// ❌ WRONG: Int-indexing a String
let name = "Swift"
let c = name[1]                    // ❌ compile error

// ✅ CORRECT: String.Index
if let idx = name.firstIndex(of: "w") { let c = name[idx] }
```

---

## 8. Swift Checklist

### Before Writing Swift

- [ ] Language mode decided (5 vs 6)? Strict concurrency on?
- [ ] Value types first (`struct`/`enum`)? `class` only when identity required?
- [ ] Shared mutable state behind an `actor` or `@MainActor`?
- [ ] Errors modeled with `throws`/`Result` — zero force unwraps?
- [ ] UI code marked `@MainActor`?
- [ ] Generic/protocol design, not `Any`?

### Before PR

- [ ] Compiles under Swift 6 strict concurrency (zero errors AND warnings)?
- [ ] No `!`, `try!`, `as!` in production paths?
- [ ] No retain cycles — `weak` where needed?
- [ ] async/await used; no `Thread.sleep`/global `DispatchQueue` hacks?
- [ ] Tests cover error paths and concurrent access?
- [ ] `defer` used only for cleanup?

> **If any answer is no, fix it before continuing. Swift correctness is the foundation of every Apple app.**
