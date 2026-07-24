# Monorepo Patterns

> **Purpose:** Keep workspace packages, dependency resolution, shared configuration, and task execution reproducible in JavaScript/TypeScript monorepos.
> **Primary official sources:** [npm workspaces](https://docs.npmjs.com/cli/v11/using-npm/workspaces) · [Yarn workspaces](https://yarnpkg.com/features/workspaces) · [pnpm workspaces](https://pnpm.io/workspaces) · [Turborepo documentation](https://turborepo.com/docs) · [Nx documentation](https://nx.dev/)

## Project Convention Decision Rule

Before applying this guidance, verify the installed versions, local rules, existing abstractions, configuration, lockfile, workspace layout, and tests. Preserve a valid established project convention; do not replace it only because another documented approach is also valid. Use official sources to verify API behavior, compatibility, constraints, and migrations. Recommend a change only when the developer requests it or evidence shows the current approach is incompatible, unsafe, deprecated, broken, or responsible for a verified issue.

---

## Table of Contents

1. [Workspace Package Boundaries](#workspace-package-boundaries)
2. [Declared Dependencies and Phantom Dependencies](#declared-dependencies-and-phantom-dependencies)
3. [Shared Configuration Resolution](#shared-configuration-resolution)
4. [Task Runner Cache Hygiene](#task-runner-cache-hygiene)
5. [Workspace-Aware Commands](#workspace-aware-commands)
6. [Lockfile and Root Toolchain Consistency](#lockfile-and-root-toolchain-consistency)

---

## Workspace Package Boundaries

### Symptom
A package imports source files from another package's internals, builds only by accident, or cannot be independently published, tested, or consumed.

### Verify first
Check each workspace's `package.json`: `name`, `private`, `exports` (when published), build output, and declared dependencies. Verify that consumers import the package's public name rather than a relative path into its source tree. Workspace discovery is manager-specific; see [npm workspaces](https://docs.npmjs.com/cli/v11/using-npm/workspaces), [Yarn workspaces](https://yarnpkg.com/features/workspaces), and [pnpm workspaces](https://pnpm.io/workspaces).

### Fix
- Give each independently consumed unit an explicit package boundary and public API.
- Import internal packages by package name, not by relative paths that bypass packaging and export rules.
- Mark packages not intended for publication as `private`.
- Keep generated output, package entry points, and export maps consistent with the files produced by the package build.

---

## Declared Dependencies and Phantom Dependencies

### Symptom
A package builds locally but fails in isolation, after a clean install, or when consumed outside the repository.

### Problem
The package imports a dependency that is only available because another workspace or a hoisted install placed it nearby. This is a phantom dependency.

### Fix
- Declare every runtime, build-time, and type dependency in the package that directly imports it, using the appropriate dependency section.
- Declare internal workspace relationships explicitly and use the package manager's supported workspace protocol where applicable.
- Do not rely on hoisting layout, transitive dependencies, or root-level tooling to make an import resolve.

### Verify first
Install from a clean checkout and test/build the affected workspace directly. For publishable packages, validate the packed artifact in a clean temporary consumer. pnpm explains why workspace linking and protocol use are explicit in [workspace settings](https://pnpm.io/workspaces#workspace-protocol-workspace).

---

## Shared Configuration Resolution

### Symptom
A linter, TypeScript compiler, test runner, or bundler behaves differently when launched from the root versus a workspace.

### Verify first
Determine which config file is found, the current working directory, and whether plugins/presets resolve from the root, the workspace, or the config package. Check the tool's own configuration-resolution documentation before moving files or adding duplicate dependencies.

### Fix
- Make shared configuration a versioned workspace package or a clearly owned root configuration, according to the consuming tool's resolution model.
- Reference shared config through supported package/config mechanisms rather than brittle relative paths when the tool supports it.
- Put plugins and parsers where the resolver expects them; do not depend on incidental hoisting.
- Run configuration-sensitive commands from the same scope in local development and CI.

For TypeScript project structure and references, use the [TypeScript project references handbook](https://www.typescriptlang.org/docs/handbook/project-references.html).

---

## Task Runner Cache Hygiene

### Symptom
A cached task returns stale output, misses a required rebuild after configuration changes, or appears successful without producing expected artifacts.

### Verify first
For the affected task, list its declared inputs, environment variables, dependency tasks, outputs, working directory, and cache mode. Turborepo documents task inputs/outputs and caching in [Turborepo caching](https://turborepo.com/docs/crafting-your-repository/caching); Nx documents inputs and task caching in [Nx cache inputs](https://nx.dev/concepts/how-caching-works#inputs).

### Fix
- Declare outputs precisely so restored cache artifacts match what downstream tasks consume.
- Include relevant source, lockfile, configuration, generated-schema, and environment inputs in the cache definition.
- Exclude secrets from cache keys and outputs; use non-secret version markers when configuration must affect caching.
- Make task dependencies explicit rather than relying on execution order or existing files.
- Clear or bypass cache only to diagnose incorrect cache inputs; repair the task definition before re-enabling it.

---

## Workspace-Aware Commands

### Symptom
A command runs in every package, runs only at the root, resolves the wrong binary, or changes dependencies in an unintended workspace.

### Verify first
Use the package manager's workspace-listing capability and confirm the target package name. Review the exact command's workspace flags rather than assuming equivalent syntax across managers. npm provides [workspace command guidance](https://docs.npmjs.com/cli/v11/using-npm/workspaces#running-commands-in-the-context-of-workspaces).

### Fix
- Prefer explicit workspace/package selectors for focused install, run, test, and build commands.
- Use recursive/all-workspace execution only when the task is designed to be independent or ordered by declared dependencies.
- Keep root scripts as orchestration entry points and package scripts as package-local behavior.
- In CI, log the selected workspace and command to make scope errors visible.

---

## Lockfile and Root Toolchain Consistency

### Problem
Different packages or CI jobs use different package-manager versions, lockfile policies, Node versions, or root tool versions, producing incompatible dependency trees and task results.

### Fix
- Maintain a single root lockfile and use the repository's declared package manager everywhere.
- Pin or otherwise declare the package-manager version with the repository-supported mechanism; Corepack recognizes `packageManager` metadata. See [Node.js Corepack](https://nodejs.org/docs/latest/api/corepack.html).
- Align Node selection across local development, CI, and containers with the root `engines` policy.
- Put monorepo-wide task-runner and shared-tool configuration under clear root ownership.
- Validate CI with a non-mutating install mode, then execute workspace-aware checks from a clean checkout.

### Verify first
Confirm that a clean clone has one expected lockfile, uses the intended manager/runtime, and completes a focused package build followed by the repository's dependency-aware build. Any lockfile modification during validation is a reproducibility failure to investigate, not a change to commit automatically.