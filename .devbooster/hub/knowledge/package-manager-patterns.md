# Package Manager Patterns

> **Purpose:** Resolve reproducibility, dependency-resolution, workspace-scope, and security-report issues across npm, Yarn, and pnpm.
> **Primary official sources:** [npm CLI documentation](https://docs.npmjs.com/cli/) · [Yarn documentation](https://yarnpkg.com/configuration/manifest) · [pnpm documentation](https://pnpm.io/)

## Project Convention Decision Rule

Before applying this guidance, verify the installed versions, local rules, package manager, lockfile, workspace layout, configuration, and tests. Preserve a valid established project convention; do not replace it only because another documented approach is also valid. Use official sources to verify API behavior, compatibility, constraints, and migrations. Recommend a change only when the developer requests it or evidence shows the current approach is incompatible, unsafe, deprecated, broken, or responsible for a verified issue.

---

## Table of Contents

1. [Detect the Manager and Lockfile](#detect-the-manager-and-lockfile)
2. [Override and Resolution Semantics](#override-and-resolution-semantics)
3. [Peer Dependency Conflicts](#peer-dependency-conflicts)
4. [Serialized Installs](#serialized-installs)
5. [Audit Findings](#audit-findings)
6. [Workspace Root Versus Package Scope](#workspace-root-versus-package-scope)
7. [Frozen Lockfile Validation](#frozen-lockfile-validation)

---

## Detect the Manager and Lockfile

### Symptom
An install rewrites the lockfile, resolves a different tree, or fails because a command was run with the wrong manager.

### Verify first
Inspect the repository root for `packageManager` in `package.json`, manager configuration files, and lockfiles such as `package-lock.json`, `yarn.lock`, or `pnpm-lock.yaml`. The Corepack documentation explains the `packageManager` field and shims: [Node.js Corepack](https://nodejs.org/docs/latest/api/corepack.html).

### Fix
- Use the manager declared by the repository; do not introduce or regenerate another manager's lockfile.
- Treat one committed lockfile as the install-resolution authority for a repository.
- When the intended manager is ambiguous, inspect CI and contributor documentation before changing dependencies.
- Pin the manager release through the repository's supported mechanism, then ensure CI uses the same release family.

---

## Override and Resolution Semantics

### Problem
A transitive dependency needs a security or compatibility fix, but editing a lockfile directly is fragile and will be overwritten.

### Verify first
Identify the full dependency path and confirm the replacement version is compatible. Then use the manager's native manifest field:

| Manager | Manifest mechanism | Official reference |
| --- | --- | --- |
| npm | `overrides` | [npm `overrides`](https://docs.npmjs.com/cli/v11/configuring-npm/package-json#overrides) |
| Yarn | `resolutions` | [Yarn manifest `resolutions`](https://yarnpkg.com/configuration/manifest#resolutions) |
| pnpm | `pnpm.overrides` | [pnpm overrides](https://pnpm.io/package_json#pnpmoverrides) |

### Fix
- Put the override where that manager resolves dependencies, normally the root manifest for a workspace repository.
- Scope it as narrowly as the manager supports; document the reason and remove it when upstream constraints no longer require it.
- Reinstall with the declared manager, review the lockfile diff, and test the affected dependency path.
- Do not assume the fields are interchangeable: selector syntax, allowed locations, and direct-dependency rules differ by manager.

---

## Peer Dependency Conflicts

### Symptom
Installation reports incompatible peers, installs multiple host versions, or runtime plugins fail because they are connected to an unexpected host package.

### Verify first
Read the peer range from the package reporting the conflict and identify the actual host version selected by the lockfile. A peer dependency expresses compatibility with a package supplied by the consumer; see [npm peer dependencies](https://docs.npmjs.com/cli/v11/configuring-npm/package-json#peerdependencies) and [pnpm peer dependencies](https://pnpm.io/npmrc#strict-peer-dependencies).

### Fix
1. Prefer versions whose peer ranges overlap.
2. Upgrade or replace the dependent package if it does not support the selected host.
3. Use a documented compatibility bridge only after testing the integration.
4. Avoid permanently suppressing peer checks. A flag can unblock diagnosis, but it does not make an unsupported runtime combination safe.

---

## Serialized Installs

### Symptom
Concurrent jobs or processes corrupt a lockfile, contend for package-manager state, or publish nondeterministic dependency changes.

### Fix
- Make dependency updates a serialized workflow: one writer updates the manifest and lockfile, then commits both together.
- Keep CI installs read-only with respect to the lockfile.
- Avoid sharing mutable package-manager caches or store directories across concurrent jobs unless the tool and cache backend support it safely.
- Separate dependency-update automation from build/test jobs that only consume the committed resolution.

### Verify first
Run a clean install twice in separate workspaces, then confirm the lockfile and dependency tree do not change. Use the manager's own listing/why command to verify the selected version.

---

## Audit Findings

### Symptom
An audit reports vulnerabilities and a bulk auto-fix proposes major upgrades, lockfile churn, or removal of required packages.

### Verify first
For each finding, determine whether the vulnerable package is reachable in the shipped runtime, which version introduces the fix, and whether the advisory applies to the supported deployment path. npm documents its audit command and report format in [npm audit](https://docs.npmjs.com/auditing-package-dependencies-for-security-vulnerabilities).

### Fix
- Prioritize direct, runtime-reachable, exploitable dependencies.
- Upgrade the owning direct dependency when possible; use a narrowly scoped override only when necessary.
- Review major-version changes and test behavior instead of blindly accepting forceful remediation.
- Record accepted risk with scope and review conditions when no compatible fix exists.

An audit is an input to risk assessment, not proof that an application is exploitable or safe.

---

## Workspace Root Versus Package Scope

### Problem
A command runs against the wrong package, configuration appears ignored, or a dependency is added to the root when it belongs to an application/library package.

### Verify first
Confirm the current directory, workspace declaration, and package target. npm documents workspace targeting in [npm workspaces](https://docs.npmjs.com/cli/v11/using-npm/workspaces); Yarn and pnpm have equivalent workspace-aware command support.

### Fix
- Put runtime and library dependencies in the package that imports them.
- Keep root tooling dependencies at the root only when the root owns the command or configuration.
- Use explicit workspace selectors for install, run, test, and publish operations.
- Avoid assuming a command's default scope; root and workspace behavior is manager- and command-specific.

---

## Frozen Lockfile Validation

### Symptom
CI succeeds after silently modifying a lockfile, or a clean checkout cannot reproduce the committed dependency tree.

### Fix
Use the manager's immutable/frozen validation mode in CI:

| Manager | Typical validation command | Reference |
| --- | --- | --- |
| npm | `npm ci` | [npm ci](https://docs.npmjs.com/cli/v11/commands/npm-ci) |
| Yarn | `yarn install --immutable` | [Yarn install](https://yarnpkg.com/cli/install) |
| pnpm | `pnpm install --frozen-lockfile` | [pnpm install](https://pnpm.io/cli/install) |

### Verify first
Start from a clean checkout, run the applicable command, then confirm no manifest or lockfile changes are produced. Use the exact manager release declared by the repository.