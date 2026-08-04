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
- **`@Audit`** ➔ `.devbooster/boosters/audit.md`
- **`@AutoTriage`** ➔ `.devbooster/boosters/auto-triage.md`
- **`@Backend`** ➔ `.devbooster/boosters/backend.md`
- **`@Builder`** ➔ `.devbooster/boosters/builder.md`
- **`@Changelog`** ➔ `.devbooster/boosters/changelog.md`
- **`@CheckBuild`** ➔ `.devbooster/boosters/check-build.md`
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
- **`@Investigation`** ➔ `.devbooster/boosters/investigation.md`
- **`@Mobile`** ➔ `.devbooster/boosters/mobile.md`
- **`@Obsidian`** ➔ `.devbooster/boosters/obsidian.md` (sole MCP-authorized booster — see PROTOCOL)
- **`@Performance`** ➔ `.devbooster/boosters/performance.md`
- **`@Planning`** ➔ `.devbooster/boosters/planning.md`
- **`@Refactor`** ➔ `.devbooster/boosters/refactor.md`
- **`@Review`** ➔ `.devbooster/boosters/review.md`
- **`@ReviewDiff`** ➔ `.devbooster/boosters/diff-review.md`
- **`@SaveReference`** ➔ `.devbooster/boosters/save-reference.md`
- **`@Security`** ➔ `.devbooster/boosters/security.md`
- **`@Seo`** ➔ `.devbooster/boosters/seo.md`
- **`@SmartTask`** ➔ `.devbooster/boosters/smart-task.md`
- **`@StackRefresh`** ➔ `.devbooster/boosters/stack-refresh.md`
- **`@Testing`** ➔ `.devbooster/boosters/testing.md`
- **`@UIUX`** ➔ `.devbooster/boosters/ui-ux-pro-max.md`
