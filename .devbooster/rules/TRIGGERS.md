# 🚀 DEV BOOSTER SHORTCUTS & TRIGGERS (DICTIONARY)
**Version:** 1.0 | **Focus:** Instant behavior routing and background utility execution.

Whenever the user references a `@` trigger, you MUST locate the trigger below, load the specified rules/contract, and instantly transition to that behavior mode or execute the defined action.

---

## 👥 1. GOVERNANCE TRIGGERS
These triggers execute background utility tasks and update persistent rule or status files.

- **`@SavePattern`**
  - **Action:** Extract newly resolved technical patterns or rules from the conversation.
  - **Destination:** Append/Update in `.devbooster/rules/USER_PREFERENCES.md` (Technical English).
  
- **`@SaveContext`**
  - **Action:** Compact the entire conversation into a YAML snapshot for chat continuity.
  - **Destination:** `@booster-generated/saved-context/context-<slug>.yaml`
  - **Trigger behavior:** Ativates `.devbooster/boosters/save-context.md` and follows its execution protocol.
  
- **`@LogTask`**
  - **Action:** Capture pending tasks mentioned in the chat.
  - **Destination:** Append to `@booster-generated/tasks.md` in the following strict format:
    ```md
    - [ ] Short title of the task.
      Resumo: detailed explanation of the task.
      Referências: file paths and concepts related to the task.
    ```

---

## ⚡ 2. BOOSTER SHORTCUT TRIGGERS
These triggers instantly activate specific booster behavior contracts without requiring the user to manually load the booster files. Upon invocation, immediately read the corresponding booster file in `.devbooster/boosters/` and follow its execution instructions.

- **`@AutoTriage`** ➔ Activates `.devbooster/boosters/auto-triage.md` (Artifact-centered automatic engineering triage with separate Plan + Review and execution approvals).
- **`@SmartTask`** ➔ Activates `.devbooster/boosters/smart-task.md` (Lightweight triage with full investigation depth, single "pode seguir" approval, atomic plan + Builder execution, persisted artifact).
- **`@Context`** ➔ Actives `.devbooster/boosters/context.md` (Silent Sponge context mapping).
- **`@Coder`** ➔ Activates `.devbooster/boosters/coder.md` (Co-Creative design/writing).
- **`@Builder`** ➔ Activates `.devbooster/boosters/builder.md` (Senior plan audit & execution).
- **`@Planning`** ➔ Activates `.devbooster/boosters/planning.md` (Risk & readiness check).
- **`@Implementation`** ➔ Activates `.devbooster/boosters/implementation.md` (Sizing and plan writing).
- **`@Atomic`** ➔ Activates `.devbooster/boosters/atomic.md` (Surgical step-by-step code writing).
- **`@Review`** ➔ Activates `.devbooster/boosters/review.md` (Elite code and architecture audit).
- **`@ReviewDiff`** ➔ Activates `.devbooster/boosters/diff-review.md` (Pre-PR code review with project standards).
- **`@Advisor`** ➔ Activates `.devbooster/boosters/advisor.md` (Kit GPS / routing consultant).
- **`@Changelog`** ➔ Activates `.devbooster/boosters/changelog.md` (Release notes generator).
- **`@Debug`** ➔ Activates `.devbooster/boosters/debug.md` (Systematic RCA / hypothesis engine).
- **`@Deploy`** ➔ Activates `.devbooster/boosters/deploy.md` (Pre-flight release validation).
- **`@StackRefresh`** ➔ Activates `.devbooster/boosters/stack-refresh.md` (Runtime/framework/dependency modernization analysis and phased upgrades).
- **`@Audit`** ➔ Activates `.devbooster/boosters/audit.md` (Active lint/typecheck audit, normalization, and classification).
- **`@Discovery`** ➔ Activates `.devbooster/boosters/discovery.md` (Product/ideas brainstorm).
- **`@Investigation`** ➔ Activates `.devbooster/boosters/investigation.md` (No-code repo structure mapping).
- **`@Doc`** ➔ Activates `.devbooster/boosters/global-documentation.md` (Universal spec generation).
- **`@Enhance`** ➔ Activates `.devbooster/boosters/enhance.md` (Evolution mode for adding features to existing projects).
- **`@UIUX`** ➔ Activates `.devbooster/boosters/ui-ux-pro-max.md` (Premium Design Intelligence — 50+ styles, 97 palettes, 57 fonts, 99 UX guidelines).
- **`@Frontend`** ➔ Activates `.devbooster/boosters/frontend.md` (Frontend specialist with stack-specific React/Next/Vite/Angular/Tailwind rules).
- **`@Backend`** ➔ Activates `.devbooster/boosters/backend.md` (Backend architect with API, database, runtime, and validation rules).
- **`@Refactor`** ➔ Activates `.devbooster/boosters/refactor.md` (Clean Code and SOLID refactoring specialist).
- **`@Performance`** ➔ Activates `.devbooster/boosters/performance.md` (Web Vitals, bundle optimization, rendering and caching analysis).
- **`@Testing`** ➔ Activates `.devbooster/boosters/testing.md` (QA and test strategy coordinator for unit, integration, and E2E).
- **`@Security`** ➔ Activates `.devbooster/boosters/security.md` (Security posture auditor for dependency, supply-chain, and threat analysis).
- **`@CodeAudit`** ➔ Activates `.devbooster/boosters/code-audit.md` (Strict syntax, lint, React Doctor, and framework diagnostics audit).
- **`@Design`** ➔ Activates `.devbooster/boosters/design.md` (UI/UX component audit and visual standards validation).
- **`@Create`** ➔ Activates `.devbooster/boosters/create.md` (Master Architect for scaffolding new features and apps).
- **`@Accessibility`** ➔ Activates `.devbooster/boosters/accessibility.md` (WCAG compliance and semantic HTML auditor).
- **`@I18n`** ➔ Activates `.devbooster/boosters/i18n.md` (Internationalization specialist for text extraction and localization).
- **`@Seo`** ➔ Activates `.devbooster/boosters/seo.md` (SEO audit and semantic HTML compliance check).
- **`@Mobile`** ➔ Activates `.devbooster/boosters/mobile.md` (Mobile UX patterns for React Native and Expo).
- **`@InternalDoc`** ➔ Activates `.devbooster/boosters/internal-documentation.md` (Internal project documentation with absolute paths and asset maps).
