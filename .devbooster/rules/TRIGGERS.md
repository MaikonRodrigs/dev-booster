# 🚀 DEV BOOSTER SHORTCUTS & TRIGGERS (DICTIONARY)
**Version:** 1.0 | **Focus:** Instant behavior routing and background utility execution.

Whenever the user references a `@` trigger, you MUST locate the trigger below, load the specified rules/contract, and instantly transition to that behavior mode or execute the defined action.

---

## 👥 1. GOVERNANCE TRIGGERS
These triggers execute background utility tasks and update persistent rule or status files.

- **`@SavePattern`**
  - **Action:** Extract newly resolved technical patterns or rules from the conversation.
  - **Destination:** Append/Update in `.devbooster/rules/USER_PREFERENCES.md` (Technical English).
  
- **`@SaveState`**
  - **Action:** Summarize current context, decisions, and active task progress.
  - **Destination:** Update the active booster's state file under `@booster-generated/` (e.g., plans, contexts, or coder).
  
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

- **`@Context`** ➔ Actives `.devbooster/boosters/context.md` (Silent Sponge context mapping).
- **`@Coder`** ➔ Activates `.devbooster/boosters/coder.md` (Co-Creative design/writing).
- **`@Builder`** ➔ Activates `.devbooster/boosters/builder.md` (Senior plan audit & execution).
- **`@Planning`** ➔ Activates `.devbooster/boosters/planning.md` (Risk & readiness check).
- **`@Implementation`** ➔ Activates `.devbooster/boosters/implementation.md` (Sizing and plan writing).
- **`@Atomic`** ➔ Activates `.devbooster/boosters/atomic.md` (Surgical step-by-step code writing).
- **`@Review`** ➔ Activates `.devbooster/boosters/review.md` (Elite code and architecture audit).
- **`@Advisor`** ➔ Activates `.devbooster/boosters/advisor.md` (Kit GPS / routing consultant).
- **`@Changelog`** ➔ Activates `.devbooster/boosters/changelog.md` (Release notes generator).
- **`@Debug`** ➔ Activates `.devbooster/boosters/debug.md` (Systematic RCA / hypothesis engine).
- **`@Deploy`** ➔ Activates `.devbooster/boosters/deploy.md` (Pre-flight release validation).
- **`@Discovery`** ➔ Activates `.devbooster/boosters/discovery.md` (Product/ideas brainstorm).
- **`@Investigation`** ➔ Activates `.devbooster/boosters/investigation.md` (No-code repo structure mapping).
- **`@Doc`** ➔ Activates `.devbooster/boosters/global-documentation.md` (Universal spec generation).
