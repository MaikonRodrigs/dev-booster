# SwiftUI Testing Reference

> Read when writing tests for Swift/SwiftUI apps — unit, view, UI, and CI testing.

---

## 1. Testing Pyramid for Apple Apps

### The Pyramid

```
        ┌───────────────┐
        │   UI (E2E)    │  ← XCUITest: FEW, slow, catch integration regressions
        ├───────────────┤
        │  View / Model │  ← @Observable logic, ViewInspector: medium count
        │     Logic     │
        ├───────────────┤
        │     Unit      │  ← Models, services, formatters: MANY, ms-fast
        │    Tests      │
        └───────────────┘
```

| Layer | What it catches | Typical speed |
| --- | --- | --- |
| **Unit** | Wrong business rules, edge cases, decoding bugs | ms |
| **View logic** | Wrong state transitions, load/error flows | ms |
| **Integration** | Model + store (SwiftData/Core Data), networking stack, mapping | seconds |
| **UI (XCUITest)** | Broken navigation, missing accessibility, real-device runtime issues | minutes |

### The Mindset

- **Unit tests own the business rules**: price math, date formatting, validation, JSON decoding. If it runs without a device, test it without a device.
- **View-model tests own state**: `idle → loading → loaded`, `error → retry`. Testing the `@Observable` model directly is faster and more stable than driving the same path through UI.
- **UI tests own journeys, not assertions**: one happy-path login, one checkout, one empty state. If you need 200 UI tests, your pyramid is inverted.
- **Tests are documentation**: a failing test name reads as a spec. `emptyCartDisablesCheckout()` explains behavior better than a comment.
- > 🚫 If a *unit* test requires a simulator, the logic lives in the wrong layer.

---

## 2. XCTest

Still fully supported (Xcode 26 ships both XCTest and Swift Testing) — existing suites keep running.

### Structure

```swift
// ✅ CORRECT: XCTestCase with async setUp/tearDown
final class CartTests: XCTestCase {
    var cart: Cart!

    override func setUp() async throws {
        cart = Cart()
    }

    override func tearDown() async throws {
        cart = nil
    }

    func testAddItemIncrementsTotal() {
        cart.add(Item(name: "Milk", price: 1.99))
        XCTAssertEqual(cart.total, 1.99, accuracy: 0.001)
    }
}
```

### XCTAssert Family

| Assertion | Checks |
| --- | --- |
| `XCTAssertEqual(_:_:)` / `XCTAssertNotEqual` | Equality (`Equatable`) |
| `XCTAssertTrue` / `XCTAssertFalse` | Boolean condition |
| `XCTAssertNil` / `XCTAssertNotNil` | Optional state |
| `XCTAssertThrowsError` | Error thrown (optionally inspect it) |
| `XCTAssertNoThrow` | No error |
| `XCTUnwrap` | Unwraps an optional or fails the test (throws) |
| `XCTAssertEqual(_:_:accuracy:)` | Floating-point tolerance |
| `XCTFail` | Explicit unconditional failure |

### Async Test Methods & Expectations

```swift
// ✅ CORRECT: async throws test method
func testLoadProducts() async throws {
    let products = try await service.loadProducts()
    XCTAssertEqual(products.count, 3)
}

// ✅ CORRECT: expectation for callback/Combine APIs
func testNetworkCallback() {
    let exp = expectation(description: "request completes")
    var received: Data?
    client.fetch { result in
        received = result
        exp.fulfill()
    }
    wait(for: [exp], timeout: 2)
    XCTAssertNotNil(received)
}
```

### Performance Tests

```swift
func testSortPerformance() {
    measure {
        _ = largeArray.sorted()
    }
}
```

> ⚠️ `measure` is for hot paths only. On CI, treat metric variance as advisory; assert *correctness* with real assertions and use `.timeLimit`-style guards to catch regressions.

---

## 3. Swift Testing (Swift 6+, Xcode 16+)

The modern default for new suites: no class boilerplate, `#expect`/`#require` macros, parameterized tests, parallel-by-default execution, and native `async/await`.

```swift
// ✅ CORRECT: Swift Testing basics
import Testing

struct CartTests {
    @Test func emptyCartTotalIsZero() {
        let cart = Cart()
        #expect(cart.total == 0)
    }

    @Test func discountCapsAtFiftyPercent() throws {
        let price = try #require(Discount(rawValue: 0.6))  // fails test if nil
        #expect(price.amount == 0.5)
    }
}
```

### Macros

| Macro | Behavior |
| --- | --- |
| `#expect(condition)` | Records a failure if false, continues running |
| `#require(condition)` | Stops the test if false; returns the unwrapped value |

### Traits (annotate `@Test` / `@Suite`)

| Trait | Example |
| --- | --- |
| Tags | `@Test(.tags(.network))` — filter with `--filter` |
| enabled | `@Test(.enabled(if: isCI))` — skip locally, run on CI |
| timeLimit | `@Test(.timeLimit(.minutes(2)))` — kills runaway tests |
| bug | `@Test(.bug("APP-123"))` — links to a tracker |
| disabled | `@Test(.disabled("flaky on iOS 18"))` — quarantine, don't delete |
| serialized | `@Suite(.serialized)` — opt out of parallelism |

### Parameterized Tests

```swift
@Test(arguments: [
    ("milk", true),
    ("", false),
    ("   ", false),
])
func itemTitleIsValid(title: String, expected: Bool) {
    #expect(Item(title: title).isValid == expected)
}
```

### XCTest → Swift Testing Migration

| XCTest | Swift Testing |
| --- | --- |
| `final class XTests: XCTestCase` | `struct XTests` (or `@Suite struct XTests`) |
| `func testFoo()` | `@Test func foo()` |
| `XCTAssertEqual(a, b)` | `#expect(a == b)` |
| `XCTAssertTrue(cond)` | `#expect(cond)` |
| `XCTAssertThrowsError { ... }` | `#expect(throws: Error.self) { ... }` |
| `XCTUnwrap(x)` | `try #require(x)` |
| `setUp` / `tearDown` | `init()` / `deinit` |
| `wait(for:timeout:)` | `await` directly — concurrency-native |
| `measure { }` | `.timeLimit` trait; benchmark outside tests |
| `-only-testing:Target/Class/method` | `--filter "Suite/method"` |

> ✅ **Prefer Swift Testing for new code.** Keep XCTest for legacy suites and where a tool (some XCUITest setups, certain plugins) requires it.

---

## 4. Testing View Logic & View Models

### Rule: logic lives where it's testable

Keep business logic out of `body`. `@Observable` models and view models are plain Swift — test them directly, no UI needed.

```swift
@Observable final class ProductListModel {          // iOS 17+ / macOS 14+
    var products: [Product] = []
    var isLoading = false
    var errorMessage: String?

    func load() async {
        isLoading = true
        defer { isLoading = false }
        do {
            products = try await repository.fetchProducts()
        } catch {
            errorMessage = "Could not load products"
        }
    }
}

// ✅ CORRECT: test the model directly
@Test func loadFailureShowsError() async {
    let model = ProductListModel(
        repository: MockRepository(result: .failure(URLError(.badURL)))
    )
    await model.load()
    #expect(model.errorMessage != nil)
    #expect(model.products.isEmpty)
    #expect(model.isLoading == false)
}
```

### Dependency Injection Over Singletons

```swift
protocol ProductRepository: Sendable {
    func fetchProducts() async throws -> [Product]
}

struct MockRepository: ProductRepository {
    let result: Result<[Product], Error>
    func fetchProducts() async throws -> [Product] {
        try result.get()
    }
}
```

| ❌ NEVER | Why It's Wrong | ✅ ALWAYS |
| --- | --- | --- |
| `ProductService.shared` used inside the model | Can't swap in mocks; hidden global state | Inject protocols via `init(repository:)` |
| Model defaults that hit the network | Tests silently depend on network | Inject mocks; production default in the app |
| Testing a whole screen to change one state | Slow, brittle, needs UI | Test state transitions in the model |
| Branching business logic inside `body` | Untestable without UI | Extract to model methods / computed properties |

### Async Loading State Tests

Cover all four states: `idle`, `loading`, `loaded`, `error`.

```swift
@Test func loadingStateIsSetDuringFetch() async throws {
    let model = ProductListModel(repository: SlowRepository())
    async let _ = model.load()       // start the load
    await Task.yield()               // let it begin
    #expect(model.isLoading == true)
}
```

---

## 5. XCUITest (UI Tests)

### Launch & Test Mode

```swift
final class LoginUITests: XCTestCase {
    func testSuccessfulLogin() {
        let app = XCUIApplication()
        app.launchArguments += ["-ui-testing", "-reset-state"]   // app reads these
        app.launchEnvironment["UITEST_TOKEN"] = "stub-token"
        app.launch()

        let emailField = app.textFields["login.email"]           // accessibilityIdentifier
        XCTAssertTrue(emailField.waitForExistence(timeout: 5))
        emailField.tap()
        emailField.typeText("user@example.com")
        app.buttons["login.submit"].tap()

        XCTAssertTrue(app.staticTexts["dashboard.title"].waitForExistence(timeout: 5))
    }
}
```

### Setting Identifiers in SwiftUI

```swift
// ✅ CORRECT: stable, localization-proof identifiers
Button("Log In") { ... }
    .accessibilityIdentifier("login.submit")

// ❌ WRONG: matching visible text — breaks on localization and redesigns
// app.buttons["Log In"].tap()
```

### Queries & Interactions

| Pattern | Example |
| --- | --- |
| Element queries | `app.buttons["id"]`, `app.textFields["id"]`, `app.staticTexts["id"]`, `app.cells` |
| Hierarchy | `app.navigationBars["Title"].buttons["Back"]`, `app.tabBars.buttons["Home"]` |
| Counts | `app.cells.count`, `app.buttons.matching(identifier: "row").count` |
| Async wait | `.waitForExistence(timeout: 5)` before asserting |
| Input | `.tap()`, `.typeText("...")`, `.swipeUp()`, `.doubleTap()`, `.press(forDuration:)` |
| Keyboard | `app.keyboards.buttons["return"].tap()` |
| Alerts | `app.alerts["Error"].buttons["OK"].tap()` |

### Resetting State Between Tests

| ❌ NEVER | ✅ ALWAYS |
| --- | --- |
| Rely on state left by a previous test | Launch with `-reset-state`; reset `UserDefaults`/keychain in app code |
| `XCTAssertTrue(x.exists)` without a wait | `waitForExistence(timeout:)` first |
| `sleep(2)` to "wait for async UI" | `waitForExistence` / `wait(for:timeout:)` |
| Match on localized visible text | Match on `.accessibilityIdentifier` |

> UI tests run the real app process. Keep them few and journey-shaped; assert behavior, not pixels.

---

## 6. SwiftUI View Testing (ViewInspector)

Apple offers **no built-in unit testing for SwiftUI view trees**. The community standard is [ViewInspector](https://github.com/nalexn/ViewInspector) (SwiftPM: `nalexn/ViewInspector`).

```swift
// ✅ CORRECT: inspect the tree, invoke closures
final class ProfileViewTests: XCTestCase {
    func testGreetingShowsUserName() throws {
        let sut = ProfileView(userName: "Ada")
        let text = try sut.inspect().find(text: "Hello, Ada!")
        XCTAssertEqual(text.string(), "Hello, Ada!")
    }

    func testButtonTaps() throws {
        var tapped = false
        let sut = ProfileView(onTap: { tapped = true })
        try sut.inspect().button().tap()
        XCTAssertTrue(tapped)
    }
}
```

| Capability | Example |
| --- | --- |
| Traverse the tree | `try sut.inspect().find(viewWithAccessibilityIdentifier: "id")` |
| Read modifiers | `try sut.inspect().text().attributes().foregroundColor()` |
| Invoke actions | `try sut.inspect().button().tap()`, `.list().row(0).button().tap()` |
| Container wrappers | `.implicitAnyView()` when `AnyView`/`Group` wraps nodes |

### Limitations

- SwiftUI bodies are opaque; some nodes require `.implicitAnyView()` unwrapping.
- `@MainActor` views need `@MainActor` test methods.
- Not a substitute for model tests — use it for *view wiring*, not business logic.
- No Apple support → pin the package version and re-verify after Xcode upgrades.

---

## 7. Snapshot Testing

[swift-snapshot-testing](https://github.com/pointfreeco/swift-snapshot-testing) (Point-Free, SwiftPM: `pointfreeco/swift-snapshot-testing`) records output on first run, then diffs on later runs.

```swift
// ✅ CORRECT: view snapshot (needs a rendering context)
assertSnapshot(of: sut, as: .image)

// ✅ CORRECT: pure-value snapshots — no rendering
assertSnapshot(of: invoice.totalString, as: .lines)
assertSnapshot(of: apiResponse, as: .json)
```

| Strategy | Use for | Notes |
| --- | --- | --- |
| `.image` | Rendered views/layouts | Flaky across fonts/OS — pin simulator + OS |
| `.recursiveDescription` | SwiftUI view structure | Textual, stable across OS versions |
| `.lines` / `.dump` | Strings, structured data | Fastest, best diff output |
| `.json` | Codable payloads | Guards API contract drift |

### Discipline

| ❌ NEVER | ✅ ALWAYS |
| --- | --- |
| Re-record snapshots on every CI failure | Inspect the diff; update only intended changes |
| Snapshot dynamic content (dates, UUIDs) | Inject deterministic/frozen values |
| Image snapshots as your *only* coverage | Pair with unit tests — snapshots prove shape, not behavior |
| Giant full-screen images in every PR | Keep snapshots small and targeted |

Record deliberately: `assertSnapshot(of: x, as: .image, record: true)`, review the reference, commit, re-run with recording off.

---

## 8. Testing Async & Combine

### Async Test Patterns

```swift
// ✅ CORRECT: Swift Testing handles async natively
@Test func fetchReturnsSortedItems() async throws {
    let items = try await repository.fetchItems()
    #expect(items == items.sorted())
}
```

### Awaiting Publisher Output

```swift
// ✅ CORRECT: XCTest + expectation for Combine
func testPublisherEmitsValue() {
    let exp = expectation(description: "value received")
    var received: Int?
    let cancellable = subject
        .sink { value in
            received = value
            exp.fulfill()
        }
    subject.send(42)
    wait(for: [exp], timeout: 1)
    XCTAssertEqual(received, 42)
    cancellable.cancel()
}
```

### Cancellation Tests

```swift
@Test func cancelledTaskStopsLoading() async {
    let model = ProductListModel(repository: SlowRepository())
    let task = Task { await model.load() }
    await Task.yield()
    task.cancel()
    await task.value
    #expect(model.isLoading == false)   // load() must honor cancellation
}
```

### Mock URLProtocol for Network

```swift
// ✅ CORRECT: intercept URLSession without touching app code
final class MockURLProtocol: URLProtocol {
    static var handler: ((URLRequest) throws -> (HTTPURLResponse, Data))?

    override class func canInit(with request: URLRequest) -> Bool { true }
    override class func canonicalRequest(for request: URLRequest) -> URLRequest { request }

    override func startLoading() {
        guard let handler = MockURLProtocol.handler else { return }
        let (response, data) = try! handler(request)
        client?.urlProtocol(self, didReceive: response, cacheStoragePolicy: .notAllowed)
        client?.urlProtocol(self, didLoad: data)
        client?.urlProtocolDidFinishLoading(self)
    }
    override func stopLoading() {}
}
// setUp: URLProtocol.registerClass(MockURLProtocol.self) + a URLSession with MockURLProtocol in its configuration
```

| ❌ NEVER | ✅ ALWAYS |
| --- | --- |
| Hit real servers in tests | Protocol-injected repositories or `MockURLProtocol` |
| `sleep()` to "wait for async" | Expectations / `await` / `waitForExistence` |
| Ignore `CancellationError` | `Task.checkCancellation()` in loops; propagate with `try await` |
| One shared mock for every test | Per-test stubs; assert on injected inputs |

---

## 9. CI/CD

### Local & CI Test Run

```bash
# ✅ CORRECT: build + test on a simulator
xcodebuild test \
  -project MyApp.xcodeproj \
  -scheme MyApp \
  -destination 'platform=iOS Simulator,name=iPhone 16,OS=26.0' \
  -resultBundlePath build/MyApp.xcresult \
  -enableCodeCoverage YES

# ✅ CORRECT: run one class only
xcodebuild test -scheme MyApp -destination 'platform=iOS Simulator,name=iPhone 16' \
  -only-testing:MyAppTests/CartTests

# coverage + readable results
xcrun xccov view --report --json build/MyApp.xcresult
xcrun xcresulttool get --path build/MyApp.xcresult --format json > result.json
```

### Test Plans (`.xctestplan`)

- Created in Xcode or hand-edited; selected with `-testPlan MyApp`.
- Enable **parallelizable** (classes run in parallel), **randomExecutionOrder**, and **code coverage** per plan.
- Keep UI and unit tests in separate bundles: UI tests don't parallelize the same way.

| Flag | Effect |
| --- | --- |
| `-parallel-testing-enabled YES` | Run test bundles in parallel |
| `-parallel-testing-worker-count 4` | Cap parallel workers (CI sizing) |
| `-testPlan MyApp` | Use a specific test plan |
| `-skip-testing:MyAppUITests` | Skip a bundle |

### CI Providers

| Provider | Notes |
| --- | --- |
| **Xcode Cloud** | Native `xcodebuild`, test plans, archives to App Store Connect |
| **GitHub Actions** | `macos-15`/`macos-26` runners; cache `DerivedData` + SwiftPM; run `xcodebuild` directly |
| **Bitrise / CircleCI / Jenkins** | Same `xcodebuild` invocation; prefer result bundles over raw logs |

> Store `xcresult` artifacts on every run — failed UI tests ship with screenshots you can attach to PRs.

---

## 10. Testing Checklist

### Before Every PR

- [ ] Every model/service/formatter has unit tests (Swift Testing for new code).
- [ ] Every `@Observable` view model covers `idle / loading / loaded / error`.
- [ ] Decoding tests for every `Codable` API payload.
- [ ] No test hits the network; no test sleeps.
- [ ] Accessibility identifiers exist for every element UI tests touch.
- [ ] Local run green: `xcodebuild test -scheme MyApp -destination 'platform=iOS Simulator,name=iPhone 16'`.
- [ ] Clean build: `xcodebuild build -scheme MyApp -destination 'platform=iOS Simulator,name=iPhone 16'`.

### Before Release

- [ ] Full suite on the minimum supported OS **and** the latest OS.
- [ ] UI smoke test on a physical device, not just the simulator.
- [ ] Coverage reviewed — critical flows (payments, auth, offline sync) fully covered.
- [ ] Snapshot references committed and current.
- [ ] Parallel test run on CI; flaky tests quarantined with `.disabled("flaky")`, not deleted.
- [ ] Result bundle archived with the release.

---

> **Tests are documentation.** Name them as behavior (`addingItemTwiceThrows`), keep them deterministic, and let the pyramid decide where each assertion lives.
