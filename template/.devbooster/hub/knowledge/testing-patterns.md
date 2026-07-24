# 🧪 Testing Patterns

> **Purpose:** Build reliable unit, integration, and browser test coverage with reproducible validation.
> **Primary official sources:** [Vitest Guide](https://vitest.dev/guide/) · [Jest Configuration](https://jestjs.io/docs/configuration) · [Playwright Best Practices](https://playwright.dev/docs/best-practices) · [Playwright Locators](https://playwright.dev/docs/locators) · [Testing Library Guiding Principles](https://testing-library.com/docs/guiding-principles/)

## Project Convention Decision Rule

Before applying this guidance, verify the installed versions, local rules, test runner, existing fixtures and helpers, CI configuration, and tests. Preserve a valid established project convention; do not replace it only because another documented approach is also valid. Use official sources to verify API behavior, compatibility, constraints, and migrations. Recommend a change only when the developer requests it or evidence shows the current approach is incompatible, unsafe, deprecated, broken, or responsible for a verified issue.

---

## Table of Contents

1. [Choose the Smallest Test Scope That Proves the Behavior](#choose-the-smallest-test-scope-that-proves-the-behavior)
2. [Test Environment Does Not Match the Code](#test-environment-does-not-match-the-code)
3. [Tests Depend on Time, Randomness, or Live Network State](#tests-depend-on-time-randomness-or-live-network-state)
4. [Browser Tests Use Fragile Locators or Share State](#browser-tests-use-fragile-locators-or-share-state)
5. [CI and Local Browser or Runtime Environments Differ](#ci-and-local-browser-or-runtime-environments-differ)
6. [Validation Matrix](#validation-matrix)
7. [Test Async UI States Through Observable Behavior](#test-async-ui-states-through-observable-behavior)

---

## Choose the Smallest Test Scope That Proves the Behavior

### Problem
Tests either duplicate implementation details in isolated units or use slow end-to-end flows for every behavior.

### Verify first
State the behavior and boundary being proved: pure logic, a component interaction, an API integration, or an essential user journey. A test’s scope should match the risk it is intended to detect.

### Fix
Use a practical test pyramid:

| Scope | Best for | Avoid using it for |
|---|---|---|
| Unit | Pure functions, validation, reducers, formatting | Browser integration details |
| Integration | Component behavior, module boundaries, request handling | Full deployment and browser compatibility |
| End-to-end | Critical user journeys across real browser boundaries | Exhaustive branch coverage |

Prefer assertions observable to users over internal implementation state. Keep a small set of high-value browser journeys and place most coverage below that layer.

*Sources: [Testing Library — Guiding Principles](https://testing-library.com/docs/guiding-principles/), [Playwright — Best Practices](https://playwright.dev/docs/best-practices)*

---

## Test Environment Does Not Match the Code

### Symptom
Tests fail on `window`, `document`, storage, or layout APIs—or browser-oriented tests run in a slower environment without need.

### Verify first
Identify the APIs exercised by the test. Node is appropriate for server and pure logic. A DOM environment is required for code that accesses browser globals, but simulated DOM behavior is not equivalent to a real browser.

### Fix
Set the environment deliberately per project or test group. In Vitest, configure `environment` or an environment annotation; in Jest, select the appropriate `testEnvironment`. Use Playwright for behavior that depends on an actual browser engine, browser navigation, or real layout behavior.

```ts
// vitest.config.ts
export default {
  test: { environment: 'jsdom' },
}
```

Verify the selected environment's version and supported APIs before adding arbitrary global mocks.

*Sources: [Vitest — Environment](https://vitest.dev/guide/environment.html), [Jest — testEnvironment](https://jestjs.io/docs/configuration#testenvironment-string)*

---

## Tests Depend on Time, Randomness, or Live Network State

### Symptom
Tests are flaky, pass alone but fail in a suite, or fail only in CI.

### Verify first
Look for wall-clock time, timers, random IDs, locale/time zone, shared mutable state, and outgoing network calls. Treat each as an uncontrolled input until explicitly fixed or mocked.

### Fix
Control inputs at the test boundary:

- Use fake timers only when the behavior is timer-driven; advance time intentionally and restore real timers after the test.
- Inject or seed random values when identifiers affect assertions.
- Mock network requests at the client boundary and assert both success and failure behavior; do not call live external services from ordinary tests.
- Reset mocks, module state, storage, and environment changes between tests.

When using fake timers with asynchronous code, follow the test runner's documented async timer APIs and verify pending work has settled before asserting.

*Sources: [Vitest — Mocking Timers](https://vitest.dev/guide/mocking.html#timers), [Jest — Timer Mocks](https://jestjs.io/docs/timer-mocks), [Playwright — Network](https://playwright.dev/docs/network)*

---

## Browser Tests Use Fragile Locators or Share State

### Symptom
A Playwright test breaks after markup or styling changes, or passes/fails depending on test order.

### Verify first
Check whether the locator expresses user-visible meaning and whether the test starts with an independent account, storage state, data record, and browser context.

### Fix
Prefer Playwright’s user-facing locators: `getByRole`, `getByLabel`, `getByText`, and `getByTestId` when a stable test contract is needed. Avoid long CSS/XPath selectors tied to DOM structure. Rely on Playwright’s locator auto-waiting rather than arbitrary sleeps.

Keep tests isolated: create unique data or reset it through supported setup/teardown, and avoid state carried from another test. Reuse authenticated storage state only when it is created and managed as a deliberate fixture.

*Sources: [Playwright — Locators](https://playwright.dev/docs/locators), [Playwright — Test Isolation](https://playwright.dev/docs/browser-contexts), [Playwright — Best Practices](https://playwright.dev/docs/best-practices)*

---

## CI and Local Browser or Runtime Environments Differ

### Symptom
The suite passes locally but fails in CI, or only a particular browser fails.

### Verify first
Compare Node version, package-manager lockfile mode, operating system, browser version, environment variables, time zone/locale, and test command. Confirm whether CI runs the same browser projects and build artifact as local validation.

### Fix
Pin and declare the runtime expected by the toolchain, install from the lockfile in CI, and install the browser binaries required by the Playwright version in use. Run the same focused command locally before changing assertions. Treat a browser-specific failure as evidence to investigate, not as a reason to remove that browser project.

*Sources: [Playwright — Continuous Integration](https://playwright.dev/docs/ci), [Node.js — Releases](https://nodejs.org/en/about/previous-releases)*

---

## Validation Matrix

Run the narrowest relevant checks first, then the complete required matrix before merging:

| Change type | Required validation |
|---|---|
| Pure logic or utility | Targeted unit test, typecheck |
| Component behavior | Targeted component/integration test, typecheck, lint |
| Request or state boundary | Success/failure integration tests, lint, typecheck, build |
| User journey or routing | Targeted Playwright test against the intended build/runtime, lint, typecheck, build |
| Toolchain or dependency change | Full test suite, lint, typecheck, production build, relevant browser tests |

### Verify first
Use the scripts and configuration that the repository actually defines. A passing test command does not imply that linting, type checking, or the production build passed, and a passing DOM simulation does not replace browser coverage.

### Minimum final check
1. Run affected tests.
2. Run lint.
3. Run typecheck.
4. Run the production build.
5. Run affected browser tests when user-visible flows or browser behavior changed.

*Sources: [Vitest — CLI](https://vitest.dev/guide/cli), [Jest — CLI](https://jestjs.io/docs/cli), [Playwright — Test CLI](https://playwright.dev/docs/test-cli)*

---

## Test Async UI States Through Observable Behavior

### Decision
When a feature loads, mutates, retries, or fails, test the user-observable state transitions that the project exposes: pending feedback, success data, empty results, actionable errors, and recovery. Do not assert internal hook calls or implementation-only state unless that is the public contract of a dedicated unit.

### Verify first
- Reuse the project’s test setup, request-mocking layer, render helpers, and query-client fixture.
- Cover the states the screen actually supports; do not invent loading/error behavior absent from the product requirement.
- Await stable UI transitions with the test runner’s documented async utilities rather than arbitrary sleeps.
- For mutation flows, test failure and recovery as well as success when the user can retry or when optimistic UI is used.

Use component/integration tests for most async UI behavior. Add browser coverage when routing, real browser behavior, or a critical end-to-end path is the risk being addressed.

*Sources: [Testing Library — Async Methods](https://testing-library.com/docs/dom-testing-library/api-async/) · [Testing Library — Guiding Principles](https://testing-library.com/docs/guiding-principles/) · [Playwright — Auto-waiting](https://playwright.dev/docs/actionability)*
