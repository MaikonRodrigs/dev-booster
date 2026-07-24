# 📦 Dependency Guide

> **Purpose:** Decision model for safe dependency updates and audit interpretation
> **Primary official sources:** [npm CLI documentation](https://docs.npmjs.com/cli/) · [Yarn documentation](https://yarnpkg.com/) · [pnpm documentation](https://pnpm.io/)

## Project Convention Decision Rule

Before applying this guidance, verify the installed versions, local rules, existing abstractions, configuration, lockfile, and tests. Preserve a valid established project convention; do not replace it only because another documented approach is also valid. Use official sources to verify API behavior, compatibility, constraints, and migrations. Recommend a change only when the developer requests it or evidence shows the current approach is incompatible, unsafe, deprecated, broken, or responsible for a verified issue.

---

## Table of Contents

1. [Safe-Update Decision Model](#safe-update-decision-model)
2. [Eligible vs Non-Eligible — Examples](#eligible-vs-non-eligible)
3. [Method for Analyzing Dependency Usage](#method-for-analyzing-dependency-usage)
4. [Audit Interpretation Rules](#audit-interpretation-rules)
5. [Package Manager Behavior](#package-manager-behavior)
6. [Validation Hierarchy](#validation-hierarchy)

---

## Safe-Update Decision Model

### Conditions for considering an update "safe"

A dependency is eligible for a safe update **only when ALL of the following conditions are true**:

1. **Same major version** — the update stays within the same major version (including a patch or minor update) and the upstream release notes do not identify an incompatible change
2. **No coupled migration** — it is not part of a known migration family that requires source code adaptation
3. **Role understood** — the dependency's role is known: runtime, build, types, or security
4. **Validation path exists** — the project exposes a validation path capable of detecting obvious fallout (lint, build, typecheck)
5. **No forced operations** — the update does not require lockfile override, `resolutions`, codemod, global rewrite, or behavior not supported by the package manager

### Golden rule
If any condition fails, the update goes to deeper analysis.

---

## Eligible vs Non-Eligible

### Eligible (safe update)
| Category | Example | Reason |
|---|---|---|
| Same-major minor | `next 16.1.x → 16.2.x` | Eligible for release-note review and validation; not inherently free of breaking behavior |
| Coupled packages | `react + react-dom` | Update together within compatible major versions |
| Security priority | `axios 1.x → 1.y` | Same-major security update; confirm the advisory path and release notes |
| Bounded same-major | `@tanstack/react-query 5.x → 5.y` | Same-major update with targeted validation |

### Non-Eligible (requires deep analysis)
| Dependency | Reason |
|---|---|
| `tailwindcss 3 → 4` | Breaking change, config migration |
| `Chakra UI 2 → 3` | Breaking change, component rewrite |
| `TypeScript 5 → 7` | Two majors, high risk |
| `ESLint 9 → 10` | Config breaking change |
| `Zustand 4 → 5` | API breaking change |
| `date-fns 2 → 4` | Two majors, breaking changes |

---

## Method for Analyzing Dependency Usage

### Four layers of evidence

Before recommending an update or removal, use these 4 layers:

1. **Runtime import evidence**
   - Search the code for imports/requires and API calls
   ```bash
   rg -n --glob '*.{js,jsx,ts,tsx,mjs,cjs}' \
     "from ['\"]package-name['\"]|import ['\"]package-name['\"]|require\(['\"]package-name['\"]|import\(['\"]package-name['\"]" src/
   ```
   - Also check aliases, generated code, and configuration files; source searches alone are not conclusive.

2. **Framework/config evidence**
   - Inspect: framework config, PostCSS/Tailwind, ESLint, scripts, Docker, CI
   - The dependency may be in use even without a direct import in source

3. **Type-system evidence**
   - Inspect `tsconfig.json`, exported types
   - Packages that only provide types (e.g., `@types/*`) have no runtime import

4. **Dependency provenance**
   - Use `yarn why <package>` / `npm ls <package>` / `pnpm why <package>`
   - Check whether it's a direct or transitive dependency

### Result classification

| Classification | Meaning | Action |
|---|---|---|
| **Runtime confirmed** | Direct import/call in source | Do not remove |
| **Tooling confirmed** | Used by scripts/config/build | Do not remove without checking scripts |
| **Indirect only** | Required by framework/chain | Check if framework still needs it |
| **Removal candidate** | No direct or indirect evidence | Remove with validation |

### Generic example
A package like `sharp` may be listed in `package.json` but have no direct import in source — it may be used internally by the framework (e.g., Next.js uses `sharp` for image optimization). **In this case, even without a direct import, do not remove it without confirming whether the framework still uses it.**

---

## Audit Interpretation Rules

### Rules for interpreting `npm audit` / `yarn audit`

1. **Audit count ≠ business risk**
   - A package may emit multiple advisories and paths
   - The number of findings is not the number of independent risks

2. **Root upgrade does not patch nested framework copy**
   - Root `sharp@0.35` can coexist with `next#sharp@0.34`
   - Root `postcss@8.5` can coexist with `next#postcss@8.4`
   - Updating the root does not necessarily resolve the nested copy

3. **Always cross-reference audit output with provenance**
   ```bash
   yarn why <package>
   npm ls <package>
   ```
   Inspect the upstream package's `package.json` when necessary.

4. **Classify risk separately**
   - Findings in toolchain (eslint, webpack, etc.) may be **build-time risk**, not runtime
   - Do not ignore — classify exposure and remediation separately

5. **Do not add resolutions/overrides just to lower audit count**
   - Overriding an internal framework range is a policy decision
   - Requires compatibility validation and explicit approval

---

## Package Manager Behavior

### Yarn Classic (1.x)

| Command | Important behavior |
|---|---|
| `yarn outdated` | Exit code `1` when there are updates — **not an error**, it's a sign of findings |
| `yarn audit --level moderate` | Returns a severity bitmask: info `1`, low `2`, moderate `4`, high `8`, critical `16`; `--level` filters displayed findings but does not change the exit code |
| `yarn outdated` | Lists current, wanted, and latest versions; it does not diagnose lockfile synchronization |
| Peer warnings | May exist even with lint/build passing (e.g., React 18 peer range in libs) |

If `package.json` changes, run `yarn install` serially to update `yarn.lock`. In CI, use the project's frozen/immutable lockfile policy to detect unexpected lockfile changes.

### Mandatory serialization
**Never** run two commands that write to the lockfile in parallel:
```bash
# ❌ WRONG: parallel
yarn add package-a & yarn add package-b

# ✅ CORRECT: serialized
yarn add package-a
yarn add package-b
```

Serialize `install`, `add`, `remove`, and equivalents to avoid:
- Lockfile races
- Non-deterministic state
- Loss of updates

---

## Validation Hierarchy

### Available validation matrix

| Validation | What it proves | Limitation |
|---|---|---|
| `lint` | Lint config works, no errors | Does not exercise runtime |
| `build` | The configured production build pipeline (for example, bundling and framework configuration) | Type checking, route coverage, and generated output depend on the project's toolchain and settings; does not verify external APIs or UX |
| Dedicated typecheck | Type errors (faster than build) | May not exist as a separate script |
| Automated tests | Regression of behavior | May not exist |
| Manual smoke test | UX and integration | Requires human execution |

---
