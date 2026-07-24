# ⚡ Vite Patterns

> **Purpose:** Diagnose common Vite configuration, dependency, and environment failures.
> **Primary official sources:** [Vite Guide](https://vite.dev/guide/) · [Env and Mode](https://vite.dev/guide/env-and-mode) · [Config](https://vite.dev/config/) · [Plugin API](https://vite.dev/guide/api-plugin) · [Dependency Pre-Bundling](https://vite.dev/guide/dep-pre-bundling)

## Project Convention Decision Rule

Before applying this guidance, verify the installed versions, local rules, existing build and plugin conventions, configuration, environment model, and tests. Preserve a valid established project convention; do not replace it only because another documented approach is also valid. Use official sources to verify API behavior, compatibility, constraints, and migrations. Recommend a change only when the developer requests it or evidence shows the current approach is incompatible, unsafe, deprecated, broken, or responsible for a verified issue.

---

## Table of Contents

1. [Environment Variables Exposed to the Client](#environment-variables-exposed-to-the-client)
2. [Development and Production Base Paths Differ](#development-and-production-base-paths-differ)
3. [Aliases Resolve in Vite but Not TypeScript](#aliases-resolve-in-vite-but-not-typescript)
4. [ESM and CommonJS Dependency Boundaries](#esm-and-commonjs-dependency-boundaries)
5. [Dependency Optimization or Cache Staleness](#dependency-optimization-or-cache-staleness)
6. [Plugin Ordering and Node Runtime Alignment](#plugin-ordering-and-node-runtime-alignment)
7. [Preserve the Existing React Integration and Build Boundary](#preserve-the-existing-react-integration-and-build-boundary)

---

## Environment Variables Exposed to the Client

### Symptom
A value is `undefined` in browser code, or a secret was accidentally included in the browser bundle.

### Verify first
`import.meta.env` is Vite's client-side environment interface. Confirm the variable name, the loaded `.env` file for the active mode, and whether the code runs in the browser rather than only in Node.

### Fix
Only variables beginning with Vite's configured `envPrefix` are exposed to client code; the default prefix is `VITE_`.

```ts
const apiUrl = import.meta.env.VITE_API_URL
```

Do not put credentials, private keys, or server-only tokens in a `VITE_*` variable: any exposed value is bundled into client code. Keep secrets in a server-side boundary.

*Source: [Vite — Env Variables and Modes](https://vite.dev/guide/env-and-mode#env-variables)*

---

## Development and Production Base Paths Differ

### Symptom
Assets, dynamic imports, or client-side navigation work in development but return 404 after deployment under a subpath.

### Verify first
Identify the deployed public URL (for example, `/` versus `/app/`), inspect generated asset URLs, and distinguish application routing from Vite's asset `base` setting.

### Fix
Set `base` to the public path used by the production host. Use `/` when served from the origin root and a trailing-slash subpath when served below one.

```ts
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/app/',
})
```

Use `import.meta.env.BASE_URL` rather than a hard-coded root path when constructing URLs that must respect `base`.

*Source: [Vite — Shared Options: base](https://vite.dev/config/shared-options#base)*

---

## Aliases Resolve in Vite but Not TypeScript

### Symptom
The app runs, but the editor or `tsc` reports `Cannot find module` for an alias such as `@/ui/button`.

### Verify first
Check that the alias resolves to the same absolute directory in Vite and in the TypeScript configuration actually used by type checking. Also confirm case matches the filesystem.

### Fix
Mirror the alias in both places. Vite resolves bundler imports; TypeScript needs `baseUrl` and `paths` to understand the same specifier.

```ts
// vite.config.ts
resolve: { alias: { '@': new URL('./src', import.meta.url).pathname } }
```

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["src/*"] }
  }
}
```

The precise Vite alias representation can vary by configuration format; verify resolution with the project’s typecheck and production build.

*Sources: [Vite — resolve.alias](https://vite.dev/config/shared-options#resolve-alias), [TypeScript — paths](https://www.typescriptlang.org/tsconfig/#paths)*

---

## ESM and CommonJS Dependency Boundaries

### Symptom
A build or config load fails with errors such as `require() of ES Module not supported`, missing named exports, or an unexpected default import.

### Verify first
Inspect the failing file and the dependency's published `package.json` (`type`, `exports`, and documented import examples). Determine whether the failure is application code, a Vite config/plugin, or a Node script; they may run under different module rules.

### Fix
Use the module syntax supported by the dependency and runtime. For an ESM-only package, migrate the consuming boundary to ESM or use the package’s documented compatible entry point. Do not rely on undocumented deep imports or assume transpilation changes Node's runtime module rules.

For Vite configuration, use the module format supported by the current Vite/Node setup and validate the config with the same Node version used in CI.

*Sources: [Node.js — ECMAScript modules](https://nodejs.org/api/esm.html), [Vite — Configuring Vite](https://vite.dev/config/)*

---

## Dependency Optimization or Cache Staleness

### Symptom
A newly linked, updated, or conditionally exported dependency behaves differently until a restart; development shows an old export or optimization error.

### Verify first
Confirm the installed dependency version and lockfile, then reproduce with a clean dev-server restart. Check whether the affected package is a dependency that Vite pre-bundles for development.

### Fix
Use Vite's dependency optimizer options only for a demonstrated resolution issue, such as including a dependency that is not discovered or excluding one that must not be pre-bundled. When the dependency graph has changed, force re-optimization rather than treating cache deletion as a permanent fix:

```sh
vite --force
```

Vite caches optimized dependencies in `node_modules/.vite`; deleting that cache is a diagnostic reset, not evidence of the underlying cause.

*Sources: [Vite — Dependency Pre-Bundling](https://vite.dev/guide/dep-pre-bundling), [Vite — optimizeDeps](https://vite.dev/config/dep-optimization-options)*

---

## Plugin Ordering and Node Runtime Alignment

### Symptom
A transform, virtual module, or generated output is missing; the issue appears only locally or only in CI.

### Verify first
Inspect the final `plugins` array, each plugin's documented compatibility range, and the Node versions in local tooling, CI, and deployment. Check the installed Vite version's current Node requirement rather than assuming a version from another release line.

### Fix
Place plugins in the documented order. When a plugin must run before or after normal plugins, use its supported `enforce: 'pre'` or `enforce: 'post'` hook rather than relying on incidental array position. Align Node versions through the repository’s declared runtime mechanism and CI configuration, then reinstall dependencies and run a production build.

*Sources: [Vite — Plugin API: Ordering](https://vite.dev/guide/api-plugin#plugin-ordering), [Vite — Getting Started](https://vite.dev/guide/)*

---

## Validation Checklist

1. Run the production build with the intended mode and `base`.
2. Run type checking to verify aliases outside Vite’s resolver.
3. Test a fresh dev start after dependency changes; use `--force` only when optimizer state is implicated.
4. Confirm local and CI Node versions satisfy the installed Vite and plugin requirements.
5. Inspect built output or a deployed preview for asset and route URLs under the real public path.

---

## Preserve the Existing React Integration and Build Boundary

### Decision
Before adding or changing Vite plugins, inspect the active framework integration, JSX transform, test configuration, aliases, and environment conventions. Do not replace a working React integration merely because another official Vite plugin is available.

### Verify first
- Identify the installed Vite and framework-plugin versions and read their compatibility guidance.
- Reuse the project’s existing plugin, plugin order, Fast Refresh behavior, and configuration-file format.
- Keep browser-only environment access behind `import.meta.env`; do not copy Node or Next.js environment conventions into a Vite client bundle.
- Validate changes with the project’s typecheck, development startup, and production build.

Choose a migration only when the project explicitly requests it or the installed integration is incompatible, deprecated, broken, or unable to support a verified requirement.

*Sources: [Vite — Using Plugins](https://vite.dev/guide/using-plugins) · [Vite — Features](https://vite.dev/guide/features) · [Vite — Env Variables and Modes](https://vite.dev/guide/env-and-mode)*
