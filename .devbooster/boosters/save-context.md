# 💾 BOOSTER: SAVE CONTEXT (STATE BACKUP)

## Required Kit Resources

Every hub resource named by this booster is mandatory. The local Dev Booster may be hidden and Gitignored; a shallow search does not mean a resource is missing. Access the exact `.devbooster/...` path directly from the opened project root. If a required resource is not found, ALWAYS verify it via terminal before concluding it is missing — IDE/file-tree searches hide dotfiles and Gitignored paths. From the project root, run: `find .devbooster -maxdepth 5 -print -exec ls -ld {} \;` (or the equivalent recursive listing). Only if the terminal listing confirms the path is truly absent may you stop this booster and report the exact path. Never skip, replace, or improvise a required resource.

You are being activated to compact the entire conversation context into a YAML state file.

## 0. DEV BOOSTER ACTIVATION CONTRACT

This booster behaves as a state persistence mode, not as an automatic execution order.

If the user invokes this booster alone, or uses it only to activate the mode:

- Do NOT summarize or generate the context file immediately.
- Do NOT review or analyze the conversation history yet.
- Only confirm activation, explain what this booster does, and wait for confirmation to proceed.
- The activation response must follow the global language configured for the active LLM/environment.

Use this activation response format:

```md
## 🤖 [DEV BOOSTER // SAVE CONTEXT]

[Localized mode label]: Save Context
[Localized status label]: Armed

[Localized description of the booster's function]
[Localized confirmation prompt asking if the user wants to generate the context snapshot]
```

Formatting rules for this activation:

- `Mode` and `Status` must always be rendered on separate lines.
- Do NOT merge labels into a single sentence or paragraph.
- Keep each activation block on its own line.

Only proceed to generate the context file after the user explicitly confirms.

### SUB-AGENT POLICY — parallel-agents

- Load Skill: .devbooster/hub/skills/parallel-agents/SKILL.md
- Sub-agent policy: types [D, E], personas: none — YAML snapshot offload

## 1. EXECUTION PROTOCOL

When the user confirms, you MUST:

1. **Read the full conversation context** — every decision, business rule, code change, blocker, and pending task discussed so far.
2. **Compact everything into YAML** — dense, machine-readable format optimized for LLM parsing.
3. **Generate the file** at `@booster-generated/saved-context/context-<slug>.yaml`
4. **Notify the user** and stop — do NOT continue the previous task, do NOT ask follow-up questions.

## 2. YAML STRUCTURE (MANDATORY)

The generated YAML must follow this EXACT structure:

```yaml
meta:
  created_at: "<timestamp ISO 8601>"
  objective: "<objective of the conversation so far>"
  booster: "save-context"

project:
  name: "<project name>"
  stack:
    - "<technology 1>"
    - "<technology 2>"

session:
  current_goal: "<what is being done right now>"
  status: "<in_progress | done | paused>"
  summary: "<compact summary of what was discussed, max 3 paragraphs, dense>"

phases:
  - booster: "<booster name used>"
    summary: "<what was done, decided, or discussed in this phase>"
    decisions:
      - "<decision 1>"
      - "<decision 2>"
    artifacts:
      - "@booster-generated/<path>/<file>.md"
    files_changed:
      - path: "<file path>"
        reason: "<why it was changed>"
    pending:
      - "<pending item 1>"
      - "<pending item 2>"

business_rules:
  - "<business rule 1>"
  - "<business rule 2>"

blockers:
  - "<blocker 1 if any>"

next_steps:
  - "<next step 1>"
  - "<next step 2>"

instruction: |
  You received this file as a context snapshot.
  Read the entire YAML content.
  Give a brief summary of where the project is.
  Do NOT generate code.
  Do NOT suggest improvements.
  Do NOT continue any task.
  Wait for the user's next command.
```

## ARTIFACT GENERATION

During your execution, create a state file at `@booster-generated/saved-context/context-<slug>.yaml` with the full conversation snapshot in YAML format.

- **Uniqueness rule:** If the slug already exists in `@booster-generated/saved-context/`, generate a new variation of the name instead of overwriting
- **Notification rule:** After writing, notify the user with: 📝 Context saved at `@booster-generated/saved-context/context-<slug>.yaml`

Do NOT update this file silently in the background.

**Reply:** On activation only, use the armed-mode banner above, explain what this booster does, and ask if the user wants to proceed. After confirmation, read the full conversation, generate the YAML snapshot, notify the path, and stop. Always answer in the global language configured for the active LLM/environment.
