---
name: triggers
priority: P0.3 (Dictionary)
description: Maps @ triggers to the booster or action they activate.
---

Whenever the user references a `@` trigger, activate the mapped booster or action below.

## GOVERNANCE TRIGGERS

- **`@SaveContext`** ➔ `.devbooster/boosters/save-context.md` — compact the chat into a YAML snapshot at `@booster-generated/saved-context/context-<slug>.yaml`.
- **`@LogTask`** ➔ append pending tasks to `@booster-generated/tasks.md` in this format:
  ```md
  - [ ] Short title of the task.
        Resumo: detailed explanation of the task.
        Referências: file paths and concepts related to the task.
  ```

## BOOSTER TRIGGERS

- **`@Accessibility`** ➔ `.devbooster/boosters/accessibility.md`
- **`@Advisor`** ➔ `.devbooster/boosters/advisor.md`
- **`@Atomic`** ➔ `.devbooster/boosters/atomic.md`
- **`@ArchAudit`** ➔ `.devbooster/boosters/architecture-audit.md`
- **`@Audit`** ➔ `.devbooster/boosters/audit.md`
- **`@AutoTriage`** ➔ `.devbooster/boosters/auto-triage.md`
- **`@Backend`** ➔ `.devbooster/boosters/backend.md`
- **`@Builder`** ➔ `.devbooster/boosters/builder.md`
- **`@Changelog`** ➔ `.devbooster/boosters/changelog.md`
- **`@CheckBuild`** ➔ `.devbooster/boosters/check-build.md`
- **`@CICD`** ➔ `.devbooster/boosters/ci-cd.md`
- **`@CodeAudit`** ➔ `.devbooster/boosters/code-audit.md`
- **`@Coder`** ➔ `.devbooster/boosters/coder.md`
- **`@Commit`** ➔ `.devbooster/boosters/commit.md`
- **`@Context`** ➔ `.devbooster/boosters/context.md`
- **`@Create`** ➔ `.devbooster/boosters/create.md`
- **`@Debug`** ➔ `.devbooster/boosters/debug.md`
- **`@Deploy`** ➔ `.devbooster/boosters/deploy.md`
- **`@Design`** ➔ `.devbooster/boosters/design.md`
- **`@Discovery`** ➔ `.devbooster/boosters/discovery.md`
- **`@Doc`** ➔ `.devbooster/boosters/global-documentation.md`
- **`@Enhance`** ➔ `.devbooster/boosters/enhance.md`
- **`@Forger`** ➔ `.devbooster/boosters/forger.md`
- **`@Frontend`** ➔ `.devbooster/boosters/frontend.md`
- **`@I18n`** ➔ `.devbooster/boosters/i18n.md`
- **`@Init`** ➔ `.devbooster/boosters/init.md`
- **`@Intel`** ➔ `.devbooster/boosters/intel.md`
- **`@Implementation`** ➔ `.devbooster/boosters/implementation.md`
- **`@InternalDoc`** ➔ `.devbooster/boosters/internal-documentation.md`
- **`@Interview`** ➔ `.devbooster/boosters/interview.md`
- **`@Investigation`** ➔ `.devbooster/boosters/investigation.md`
- **`@Mobile`** ➔ `.devbooster/boosters/mobile.md`
- **`@Motion`** ➔ `.devbooster/boosters/motion.md`
- **`@Observability`** ➔ `.devbooster/boosters/observability.md`
- **`@Obsidian`** ➔ `.devbooster/boosters/obsidian.md` (MCP — only usable when the user explicitly asks, per PROTOCOL)
- **`@Performance`** ➔ `.devbooster/boosters/performance.md`
- **`@Planning`** ➔ `.devbooster/boosters/planning.md`
- **`@Refactor`** ➔ `.devbooster/boosters/refactor.md`
- **`@Refine`** ➔ `.devbooster/boosters/refine.md`
- **`@Pilot`** ➔ `.devbooster/boosters/pilot.md`
- **`@Review`** ➔ `.devbooster/boosters/review.md`
- **`@ReviewDiff`** ➔ `.devbooster/boosters/diff-review.md`

- **`@Security`** ➔ `.devbooster/boosters/security.md`
- **`@Seo`** ➔ `.devbooster/boosters/seo.md`
- **`@SmartTask`** ➔ `.devbooster/boosters/smart-task.md`
- **`@StackRefresh`** ➔ `.devbooster/boosters/stack-refresh.md`
- **`@Testing`** ➔ `.devbooster/boosters/testing.md`
- **`@UIUX`** ➔ `.devbooster/boosters/ui-ux-pro-max.md`
