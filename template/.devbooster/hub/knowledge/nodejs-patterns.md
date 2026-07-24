# Node.js Runtime Patterns

> **Purpose:** Diagnose and prevent common Node.js runtime, module, environment, and script failures.
> **Primary official sources:** [Node.js documentation](https://nodejs.org/docs/latest/api/) · [npm package.json documentation](https://docs.npmjs.com/cli/v11/configuring-npm/package-json) · [npm scripts documentation](https://docs.npmjs.com/cli/v11/using-npm/scripts)

## Project Convention Decision Rule

Before applying this guidance, verify the installed versions, local rules, existing abstractions, configuration, runtime environment, and tests. Preserve a valid established project convention; do not replace it only because another documented approach is also valid. Use official sources to verify API behavior, compatibility, constraints, and migrations. Recommend a change only when the developer requests it or evidence shows the current approach is incompatible, unsafe, deprecated, broken, or responsible for a verified issue.

---

## Table of Contents

1. [Runtime and Engines Misalignment](#runtime-and-engines-misalignment)
2. [ESM and CommonJS Interoperability](#esm-and-commonjs-interoperability)
3. [Environment Loading and Validation](#environment-loading-and-validation)
4. [Unhandled Async Failures](#unhandled-async-failures)
5. [Portable npm Scripts and Lifecycle Hooks](#portable-npm-scripts-and-lifecycle-hooks)
6. [Version Manager, CI, and Container Alignment](#version-manager-ci-and-container-alignment)

---

## Runtime and Engines Misalignment

### Symptom
A command works on one machine but fails in CI or production with syntax errors, unsupported APIs, native-module errors, or an `EBADENGINE` warning/error.

### Verify first
```sh
node --version
npm --version
node -p "process.version"
```
Compare those values with the root `package.json` `engines`, the CI runtime setup, container base image, and any version-manager file. `engines` expresses compatibility metadata; enforcement depends on the package manager and its configuration. See [npm `engines`](https://docs.npmjs.com/cli/v11/configuring-npm/package-json#engines).

### Fix
- Define a tested Node range in `engines`; use an exact version only when reproducibility requires it.
- Select a Node version explicitly in CI and containers rather than relying on a runner or image default.
- Rebuild native dependencies after changing Node versions; do not reuse artifacts built against an incompatible ABI.
- Keep local version-manager configuration aligned with the supported range.

---

## ESM and CommonJS Interoperability

### Symptom
`require is not defined`, `ERR_REQUIRE_ESM`, missing named exports, or different behavior between development and production builds.

### Verify first
Inspect the closest `package.json` for `"type"`, the file extension (`.mjs`, `.cjs`, `.js`), and the dependency's documented exports. Node determines module interpretation from these inputs. See [Node.js modules: packages](https://nodejs.org/docs/latest/api/packages.html) and [ECMAScript modules](https://nodejs.org/docs/latest/api/esm.html).

### Fix
- Choose one module system for new application code and declare it deliberately with `type` or explicit extensions.
- In ESM, import CommonJS through its default export when necessary, then read properties from that value.
- In CommonJS, use `import()` for an ESM-only dependency because synchronous `require()` has compatibility limits.
- Do not depend on undocumented deep imports or inferred named exports; use the dependency's public export map.

```js
// CommonJS loading an ESM package
const loadTool = () => import('an-esm-only-package')

// ESM consuming CommonJS
import legacyPackage from 'legacy-package'
const { createClient } = legacyPackage
```

---

## Environment Loading and Validation

### Symptom
A service starts with `undefined` configuration, uses development credentials in another environment, or fails only after handling traffic.

### Verify first
Identify where configuration is loaded, which process owns it, and whether the expected variables are present without printing secrets:

```sh
node -e "console.log(Boolean(process.env.REQUIRED_SETTING))"
```
Node exposes the process environment through [`process.env`](https://nodejs.org/docs/latest/api/process.html#processenv). Recent Node releases also document loading `.env` files with [`--env-file`](https://nodejs.org/docs/latest/api/cli.html#--env-fileconfig); verify availability in the exact Node version in use before relying on it.

### Fix
- Load configuration before importing or initializing code that reads it.
- Validate required variables, types, allowed values, and cross-field constraints at process startup; fail with variable names, never secret values.
- Treat environment values as strings until parsed and validated.
- Keep secrets out of source control and inject them through the deployment environment or an approved secret mechanism.

---

## Unhandled Async Failures

### Symptom
A request hangs, an error appears as an unhandled rejection, or the process exits unexpectedly after an async operation fails.

### Verify first
Trace every promise-returning call to an `await`/`return`/`.catch()`. Review the runtime's unhandled-rejection behavior for the deployed Node version: [Node.js `unhandledRejection`](https://nodejs.org/docs/latest/api/process.html#event-unhandledrejection).

### Fix
- Await promises inside `try`/`catch` where recovery or translation is needed.
- Return promises from wrapper functions so callers can observe failures.
- At process boundaries, log actionable context, release resources, and exit or restart according to the service's supervision model.
- Do not use a global rejection handler as a substitute for local error handling; it is an observability and last-resort shutdown boundary.

```js
async function readConfiguration() {
  try {
    return await fetchConfiguration()
  } catch (error) {
    throw new Error('Configuration could not be loaded', { cause: error })
  }
}
```

---

## Portable npm Scripts and Lifecycle Hooks

### Symptom
A script passes on one operating system but fails in CI, or an install unexpectedly runs build, download, or publish-related code.

### Verify first
Review `scripts` and lifecycle names in `package.json`, then run the exact package-manager command used by CI. npm exposes lifecycle context through environment variables and has command-specific lifecycle behavior; see [npm scripts](https://docs.npmjs.com/cli/v11/using-npm/scripts) and [lifecycle scripts](https://docs.npmjs.com/cli/v11/using-npm/scripts#life-cycle-operation-order).

### Fix
- Prefer Node-based scripts or cross-platform tooling over shell-specific syntax, utilities, and environment assignments.
- Make each script's inputs and outputs explicit; use package binaries through the package manager rather than assuming global installations.
- Keep `prepare`, `prepack`, `prepublishOnly`, and install hooks small and intentional. Verify which commands trigger each hook before placing builds or side effects there.
- Run install commands with lifecycle scripts disabled only as a diagnostic or controlled security measure, not as a permanent workaround for an unknown hook.

---

## Version Manager, CI, and Container Alignment

### Problem
Node is pinned locally but not in CI or the deployment image, creating a runtime matrix that is neither tested nor supported.

### Fix
Use one documented source of truth for the supported Node range, and make every execution environment select a compatible runtime:

| Environment | Check |
| --- | --- |
| Local development | Version-manager configuration and `node --version` |
| CI | Explicit setup action/task and cache key including Node and lockfile |
| Container | Explicit base-image tag and rebuild after runtime changes |
| Deployment | Platform runtime setting or image runtime |

### Verify first
Print `node --version` at the start of CI and from the built container. Install from the committed lockfile, then run the same test/build commands that validate local development. For supported release lines and schedules, use the [Node.js release page](https://nodejs.org/en/about/previous-releases).