# ⚠️ Upgrade Fallout

> **Purpose:** Catalog of side effects observed after dependency upgrades
> **Primary official sources:** [Next.js documentation](https://nextjs.org/docs) · [ESLint documentation](https://eslint.org/docs/latest/) · [TypeScript TSConfig reference](https://www.typescriptlang.org/tsconfig/) · [npm CLI documentation](https://docs.npmjs.com/cli/)

## Project Convention Decision Rule

Before applying this guidance, verify the installed versions, local rules, existing abstractions, configuration, lockfile, upgrade path, and tests. Preserve a valid established project convention; do not replace it only because another documented approach is also valid. Use official sources to verify API behavior, compatibility, constraints, and migrations. Recommend a change only when the developer requests it or evidence shows the current approach is incompatible, unsafe, deprecated, broken, or responsible for a verified issue.

---

## Index

1. [Script Compatibility — Broken Command Post-Update](#script-compatibility)
2. [Config Legacy Incompatible — Serialization Error](#config-legacy-incompatible)
3. [New Lint Rules Exposing Latent Code](#new-lint-rules-exposing-latent-code)
4. [TSConfig Auto-mutated by Build](#tsconfig-auto-mutated-by-build)
5. [Config Schema Drift — Property in Wrong Place](#config-schema-drift)
6. [Peer Warnings Post-Update](#peer-warnings-post-update)
7. [Residual Risk — What Remains After the Safe Wave](#residual-risk)

---

## Script Compatibility

### Problem
A framework update can invalidate `package.json` scripts even when the code compiles without errors.

### Generic example
Starting with Next.js 16, the `next lint` command is removed. A legacy `next lint` script can therefore be interpreted as a request to use `lint` as a project directory.

### Symptom
```
Invalid project directory provided, no such directory: .../lint
```

### Fix
Use the documented Next.js lint migration or migrate explicitly to the ESLint CLI (for example, `next lint` → `eslint .`) only after confirming that ESLint and its configuration are installed and current.

---

## Config Legacy Incompatible

### Problem
An upgrade can expose an unsupported legacy configuration loader or serializer. A generic serialization error alone does not prove that legacy configuration is the cause.

### Diagnostic workflow
1. Identify the tool, version, configuration file, and command that produced the error.
2. Inspect the complete stack trace to find the loader or serializer involved.
3. Compare the active configuration with the tool's version-specific migration documentation.
4. Reproduce the failure with the smallest relevant configuration before changing compatibility settings.

### Resolution
Apply the documented migration only after the incompatible mechanism is identified. Record the affected tool and version so the finding remains reproducible.

---

## New Lint Rules Exposing Latent Code

### Problem
After migrating to a newer lint configuration, new rules may be enabled and reveal problems that already existed in the code — but were not detected.

### Common examples
- Callback referenced before declaration (incorrect ordering)
- Non-deterministic logic during render (e.g. `Math.random()` in the component body)
- Unused import that previously went unnoticed

### Critical distinction
⚠️ **This is not an upgrade regression.** These are latent problems that are now visible because the analysis tools have improved.

### Fix
1. Analyze each error individually
2. Separate between "actual regression" and "latent code now detected"
3. Apply specific fixes for each case

---

## TSConfig Auto-mutated by Build

### Problem
Framework commands may create or update `tsconfig.json` with recommended settings. The exact behavior and command output depend on the framework and version.

### Example change to inspect
```json
{
  "compilerOptions": {
    "moduleResolution": "bundler"
  }
}
```

### Treatment
- The new value may be correct for the framework version in use.
- Review and record the `tsconfig.json` diff and command output.
- Check for other configuration changes before accepting the update.

---

## Config Schema Drift

### Problem
An unsupported configuration property can be mistaken for a version-to-version schema migration. The build may ignore it or emit a warning.

### Generic example
```js
// Invalid top-level Next.js configuration property
module.exports = { unoptimized: true }

// Valid Next.js Image configuration
module.exports = { images: { unoptimized: true } }
```

### Treatment
- Do not present an unsupported property as a documented migration without version-specific evidence.
- A build with warnings is not a sign of clean compatibility.
- Triage warnings tied to the upgrade against the relevant configuration documentation.

---

## Peer Warnings Post-Update

### Problem
After updating a core dependency (e.g. React), libraries with outdated peer ranges may generate warnings.

### Common examples
- UI library with React 18 peer range, after upgrading to React 19
- Transitive dependency with outdated peer range

### Treatment
- Peer warnings may not appear as lint or build diagnostics, but package-manager policy can turn peer conflicts into install failures.
- They can also signal build-time or runtime incompatibility.
- Document unresolved warnings with the dependency path, package-manager behavior, and validation evidence.

---

## Residual Risk

### What remains after the safe wave
Even after applying eligible updates, residual risks may remain:

1. **Direct security exposure** — a confirmed advisory or CVE with no compatible remediation, after assessing reachability
2. **Transitive toolchain exposure** — findings in build or development tooling whose affected environment is documented separately from runtime exposure
3. **Unresolved upstream versions** — nested framework copies that remain after provenance confirms the root update cannot change them
4. **Deferred migration risk** — major migrations that were postponed (e.g. Tailwind 3→4, Chakra 2→3)

### How to document
Use the provenance and exposure classification in [Dependency Guide — Audit Interpretation Rules](dependency-guide.md#audit-interpretation-rules).

```markdown
### Residual Risk
- **3 unresolved audit findings** — include dependency paths, affected environment, and unavailable remediation
- **2 peer warnings** — include the peer ranges and package-manager outcome
- **1 deferred migration**: tailwindcss 3→4 (breaking change)
```
