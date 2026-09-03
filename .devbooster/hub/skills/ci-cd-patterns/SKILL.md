---
name: ci-cd-patterns
description: CI/CD pipeline patterns. Shift Left, quality gates, feedback loops, stage structure, secrets hygiene, rollout safety.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
---

# CI/CD Patterns

> Principles for pipelines that actually protect the main branch and deliver fast, safe feedback.

---

## 1. Shift Left

The cheapest checks run first. Move validation as early in the pipeline as possible:

```
Lint → Typecheck → Unit tests → Build → Integration/E2E → Deploy
 (fast, cheap)                      (slower, expensive)
```

| ❌ Anti-pattern | ✅ Pattern |
|-----------------|------------|
| Build runs before lint | Lint/typecheck first (fails in seconds) |
| Tests run only after deploy | Tests gate the deploy |
| E2E on every commit | E2E on merge/PR to main |

---

## 2. Quality Gates

Checks must BLOCK the merge/deploy when they fail. A check that reports but never gates is decoration.

| Gate | Must block | Typical failure |
|------|-----------|-----------------|
| Lint / format | Merge | Style drift |
| Typecheck | Merge | Type regressions |
| Unit / integration tests | Merge + deploy | Behavior regressions |
| Security scan | Merge | Secrets, CVEs |
| Build | Deploy | Broken artifact |

---

## 3. Feedback Loops

- **Fail fast**: the failing job should be the cheapest one to run, so it runs first.
- **Actionable output**: logs, diffs, and stack traces — not just "build failed".
- **Caching**: dependency caches where safe (lockfile keyed).
- **Parallelism**: independent jobs run in parallel; only the real dependency chain is serial.
- **Cancellation**: superseded runs are cancelled (e.g., new push cancels the old run on the same PR).

---

## 4. Stage Structure

Clear separation and correct ordering:

| Stage | Purpose | Example jobs |
|-------|---------|--------------|
| **Validate** | Cheap, fast checks | lint, typecheck, unit |
| **Build** | Produce the artifact | compile, bundle, docker build |
| **Test** | Prove the artifact | integration, E2E, contract |
| **Deploy** | Promote with approval | staging → preview → production |

Rules:

- Jobs that depend on an artifact must run AFTER the build stage, not against the source.
- Staging/preview must exist before production promotion.
- No direct-to-production without at least one gate.

---

## 5. Immutability & Reproducibility

| ✅ Commit | ❌ Anti-pattern |
|-----------|-----------------|
| Lockfiles (`package-lock.json`, `yarn.lock`, `pnpm-lock.yaml`, `poetry.lock`) | `npm install` without lockfile in CI |
| Immutable installs (`npm ci`, `pip install -r` with hashes) | `npm install` in CI |
| Pinned runtimes (`.nvmrc`, `Dockerfile` tags) | Floating `latest` tags |

A pipeline that cannot reproduce the build locally is a pipeline that lies.

---

## 6. Secrets Hygiene

- Secrets come from the provider's store (GitHub Secrets, GitLab CI variables, secret managers) — never committed.
- Never echo secrets in logs or step outputs.
- Never pass secrets as plain environment values visible in the UI.
- Use masked/redacted output for anything secret-shaped.

---

## 7. Rollout Safety

- **Staging before production**: always a non-production environment first.
- **Feature flags**: ship code dark; enable gradually.
- **Promotion steps**: explicit, reviewable promotion from staging to prod (not implicit).
- **Rollback path**: every deploy job should define what "revert" means (previous artifact, git revert, previous image tag).

---

## 8. Failure Handling

| Concern | Pattern |
|---------|---------|
| Flaky network/deps | Retry with backoff on known-transient steps |
| Superseded pushes | Cancel old runs for the same PR/branch |
| Notifications | Visible failure to the channel the team actually watches |
| Pipeline health | The pipeline itself is monitored (broken-for-days workflow is a finding) |

---

## 9. Anti-Patterns

| ❌ Don't | ✅ Do |
|----------|-------|
| Tests that report but don't gate merge | Tests block merge on failure |
| Deploy to production with no gate | Staging/preview + approval before prod |
| `npm install` (floating) in CI | `npm ci` / immutable install |
| Secrets committed or echoed | Provider secret store + masked output |
| One giant serial job | Parallel independent jobs + cache |
| Build before lint/typecheck | Cheap checks first (Shift Left) |
| Uncommitted lockfile | Lockfiles committed and consumed |

---

> **Remember:** The pipeline is the last line of defense for the main branch. If it doesn't gate, it doesn't protect.
