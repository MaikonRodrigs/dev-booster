# 🧹 ESLint Migration

> **Purpose:** Migration guidance and common issues for ESLint 9+ and flat config
> **Primary official sources:** [ESLint configuration migration guide](https://eslint.org/docs/latest/use/configure/migration-guide) · [ESLint configuration files](https://eslint.org/docs/latest/use/configure/configuration-files) · [Next.js ESLint plugin](https://nextjs.org/docs/app/api-reference/config/eslint)

## Project Convention Decision Rule

Before applying this guidance, verify the installed versions, local rules, existing abstractions, configuration, and tests. Preserve a valid established project convention; do not replace it only because another documented approach is also valid. Use official sources to verify API behavior, compatibility, constraints, and migrations. Recommend a change only when the developer requests it or evidence shows the current approach is incompatible, unsafe, deprecated, broken, or responsible for a verified issue.

---

## Table of Contents

1. [ESLint 9 — Flat Config by Default](#eslint-9--flat-config-by-default)
2. [Basic JavaScript + React Hooks Config](#basic-javascript--react-hooks-config)
3. [Configuration for Next.js](#configuration-for-nextjs)
4. [ESLint-level Masking](#eslint-level-masking)
5. [Inline Suppressions](#inline-suppressions)
6. [reportUnusedDisableDirectives](#reportunuseddisabledirectives)
7. [Resolutions Affecting the Toolchain](#resolutions-affecting-the-toolchain)
8. [Legacy Config Mode in ESLint 9](#legacy-config-mode-in-eslint-9)

---

## ESLint 9 — Flat Config by Default

### Status
Flat config (`eslint.config.*`) is the default configuration format in ESLint 9. Legacy `.eslintrc.*` configuration can still be used in ESLint 9 by setting `ESLINT_USE_FLAT_CONFIG=false`, but that mode is deprecated and is removed in ESLint 10.

### Supported config files
| File | Type |
|---|---|
| `eslint.config.js` | ESM or CommonJS, based on `package.json` |
| `eslint.config.mjs` | ESM |
| `eslint.config.cjs` | CommonJS |
| `eslint.config.ts` | TypeScript; requires `jiti` or enabled native Node.js TypeScript support |
| `eslint.config.mts` | TypeScript ESM; requires the same TypeScript support |
| `eslint.config.cts` | TypeScript CommonJS; requires the same TypeScript support |

For Node.js, TypeScript config files require `jiti` or Node's explicitly enabled native TypeScript support. Node 22.13+ alone is not sufficient without the documented TypeScript-stripping and ESLint feature flags.

### Migration checklist
1. Create `eslint.config.*` at the project root.
2. Use `@eslint/migrate-config` as a starting point where applicable, then review the result.
3. Move `.eslintignore` patterns into a flat-config `ignores` object; flat config does not load `.eslintignore` automatically.
4. For Next.js 16+, replace `next lint` with the ESLint CLI.
5. Run `eslint .` and use `eslint --inspect-config <file>` to verify important files receive the intended rules.
6. Update incompatible plugins or use the documented compatibility utilities where necessary.
7. Remove `.eslintrc.*` and `.eslintignore` only after the flat configuration is verified in local development and CI.

---

## Basic JavaScript + React Hooks Config

This example is for JavaScript and JSX only. To lint TypeScript, add a TypeScript parser/configuration such as the [official typescript-eslint flat-config setup](https://typescript-eslint.io/getting-started/); merely adding `*.ts` or `*.tsx` file patterns does not parse TypeScript.

```js
// eslint.config.js
import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import pluginReactHooks from "eslint-plugin-react-hooks";

export default defineConfig([
  {
    files: ["**/*.{js,jsx,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    rules: {
      semi: "error",
      "no-unused-vars": "warn",
    },
  },
  {
    files: ["**/*.jsx"],
    plugins: { "react-hooks": pluginReactHooks },
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
  },
]);
```

---

## Configuration for Next.js

For a TypeScript Next.js application, use the documented Next.js flat configs. Omit `nextTs` for a JavaScript-only project.

```js
// eslint.config.mjs
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);
```

---

## ESLint-level Masking

### Problem
Broad disables and ignore patterns can hide problems, but scoped exceptions are sometimes appropriate for generated code, fixtures, or unsupported environments.

### Risky patterns
```js
// Broad global rule disables require a documented reason.
const config = {
  rules: {
    "react-hooks/exhaustive-deps": "off",
    "@typescript-eslint/no-explicit-any": "off",
  },
};
```

### Handling
- Prefer the narrowest rule override, file pattern, or inline suppression that addresses the specific case.
- Keep test source linted by default; ignore only generated fixtures, vendor assets, or other verified non-source inputs.
- Document why an exception is needed and review it when dependencies or code change.

---

## Inline Suppressions

### Problem
Comments that suppress ESLint or TypeScript rules need review. Some are legitimate, but each should have a narrow scope and an explanation where the reason is not obvious.

### Most common patterns
```ts
// @ts-ignore
// @ts-expect-error — reports an error if no longer needed
// @ts-nocheck — disables type checking for the entire file
// eslint-disable-next-line react-hooks/exhaustive-deps
```

### How to handle during audit
1. Count and classify suppressions by type.
2. Replace `@ts-ignore` with `@ts-expect-error` when an expected error must remain; fix the type when practical.
3. Do not remove `@ts-nocheck` without reviewing the full file, especially generated code or third-party declarations.
4. For `exhaustive-deps`, determine whether the dependency can be added safely before suppressing the rule.

---

## reportUnusedDisableDirectives

### Problem
Disable comments that no longer suppress a finding remain as clutter and can conceal whether an exception is still needed.

*Source: [ESLint configuration files — Report Unused Disable Directives](https://eslint.org/docs/latest/use/configure/configuration-files#report-unused-disable-directives)*

### Fix
```js
// eslint.config.js
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    linterOptions: {
      reportUnusedDisableDirectives: "error",
    },
  },
]);
```

### Why use it
- Detects suppressions that are no longer needed.
- Helps clean up code as rules evolve.
- The default is `"warn"`; using `"error"` makes cleanup enforceable in CI.

---

## Resolutions Affecting the Toolchain

### Problem
Yarn `resolutions`, npm `overrides`, and `pnpm.overrides` can alter transitive dependencies used by development tools. A broad or incompatible override can break ESLint and related tooling.

### Handling
1. Remove overrides that are no longer needed.
2. Document the dependency path and reason for every retained override.
3. Inspect the dependency tree with the package manager in use:
```bash
npm ls ajv
yarn why ajv
pnpm why ajv
```
4. Run linting and the relevant test/build commands after changing an override.

---

## Legacy Config Mode in ESLint 9

### Status
In ESLint 9, `ESLINT_USE_FLAT_CONFIG=false` can temporarily enable legacy `.eslintrc.*` configuration. ESLint marks that mode as deprecated; it is not available in ESLint 10.

### Guidance
Use legacy mode only as a time-bounded compatibility measure while migrating. Verify plugin and shareable-config compatibility in the actual project, then move to flat config before upgrading to ESLint 10.
