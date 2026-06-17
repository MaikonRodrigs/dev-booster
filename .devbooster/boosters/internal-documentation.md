# 🧭 BOOSTER: INTERNAL DOCUMENTATION (PROJECT MAP)
You are being activated to create internal, repository-specific project documentation with absolute paths, asset locations, operational files, and navigation guidance.

## 0. DEV BOOSTER ACTIVATION CONTRACT
This booster behaves as an internal documentation synthesis mode, not as an automatic execution order.

If the user invokes this booster alone, or uses it only to activate the mode:
- Do NOT generate the documentation immediately.
- Do NOT scan the repository immediately.
- Do NOT load the full context package yet.
- Use the current conversation context as the source of truth.
- Summarize what has already been established in the conversation.
- Identify whether the current context appears sufficient to create the internal map.
- Ask for confirmation before generating the documentation.
- The activation response must follow the global language configured for the active LLM/environment.

Use this activation response format:

```md
## 🤖 [DEV BOOSTER // INTERNAL DOCUMENTATION]

[Localized mode label]: Internal Documentation
[Localized status label]: Context Reviewed

[Localized context summary label]:
- [Localized summary line]
- [Localized summary line]
- [Localized summary line]

[Localized perceived scope label]:
- [Localized scope line]

[Localized gap label]:
- [Localized missing or uncertain line]
- [Localized missing or uncertain line]

[Localized confirmation prompt]
```

Formatting rules for this activation:
- `Mode` and `Status` must always be rendered on separate lines.
- Do NOT merge labels into a single sentence or paragraph.
- Keep each activation block on its own line.
- The full activation response must be written in the global language configured for the active LLM/environment.

If the conversation context is not mature enough:
- Do NOT fabricate an internal map.
- Say that the current context is still insufficient for reliable internal documentation.
- Ask for the missing target, repository context, or permission to scan after confirmation.

Only generate the documentation after the user confirms to proceed.

## 1. ALLOWED INVENTORY
After the user confirms, load only what is necessary from this inventory:
- `.devbooster/hub/personas/agent_documentation-writer.md`
- `.devbooster/hub/personas/agent_code-archaeologist.md`
- `.devbooster/hub/personas/agent_project-planner.md`
- `.devbooster/hub/personas/agent_explorer-agent.md`
- `.devbooster/hub/personas/documentation-writer.md`
- `.devbooster/hub/personas/code-archaeologist.md`
- `.devbooster/hub/personas/project-planner.md`
- `.devbooster/hub/personas/explorer-agent.md`
- `.devbooster/hub/personas/skill_doc.md`
- `.devbooster/hub/personas/skill_architecture.md`

## 2. PRE-FLIGHT
- Analyze the target repository before outputting the final document.
- Treat the current conversation context as the primary input.
- Use observable repository state as the secondary input after confirmation.
- Prefer repository-native paths and files over assumptions.
- Resolve absolute paths from the actual project root.
- Document only what is supported by the current code, file tree, configuration, or conversation context.

## 3. INTERNAL SPECIFICATION TEMPLATE
Your task is to generate a single Markdown documentation file following this EXACT structure:

========================
1. OBJECTIVE
========================
Create internal project documentation that explains:
- where the project lives on disk
- where important source files, rules, assets, scripts, and generated artifacts live
- which paths are absolute and which paths are repository-relative
- which files are safe to edit, generated, preserved, or replaced by update flows
- how an AI assistant should navigate the repository without guessing
- which gaps could not be detected automatically

========================
2. OUTPUT FILE
========================
- Create file at: `@booster-generated/internal-documentation/internal-project-documentation.md`
- If the repository already has a stronger naming convention for internal docs, follow it only when it is obvious and already established.
- Do not overwrite unrelated documentation unless the user explicitly asks.

========================
3. REQUIRED DOCUMENT STRUCTURE
========================
Use these 17 sections in this exact order:

# 1. Project Identity
# 2. Absolute Root Paths
# 3. Repository-Relative Path Map
# 4. Source Code Locations
# 5. Asset and Static File Locations
# 6. Configuration Files
# 7. Documentation Files
# 8. Dev Booster Kit Locations
# 9. Runtime Rules and Bootstrap Files
# 10. Scripts and Operational Commands
# 11. Generated, Preserved, and Replaceable Files
# 12. Update and Installation Behavior
# 13. AI Navigation Instructions
# 14. Editing Boundaries and Safety Rules
# 15. Known Gaps and Undetected Areas
# 16. Validation Checklist
# 17. Mini Context Summary

========================
4. WRITING RULES
========================
- Use machine oriented language. Be deterministic and technical.
- Use absolute paths for the main path inventory.
- Include repository-relative paths alongside absolute paths when useful.
- Do not invent files, folders, commands, assets, or deployment targets.
- If a folder is absent, state that it was not detected.
- If a path depends on the user's machine, resolve it from the current project root.
- Keep the document useful for future AI sessions and future maintainers.
- Prefer tables for path inventories when they improve scanability.

========================
5. EXECUTION RULES
========================
- First activation pass: summarize context and ask for confirmation.
- After user confirmation: scan the repository, load only necessary inventory, and generate the full documentation.
- If context is ambiguous, state the ambiguity before writing.
- Do NOT invent architecture, assets, or operational rules that were not established.
- Do NOT use this booster for public README, API docs, changelog, or transferable feature documentation. Use `global-documentation.md` for transferable feature documentation.

## 4. FINAL OUTCOME
The result of this booster should be:
- A repository-specific internal documentation file.
- A concise completion report in chat with the artifact path and any unresolved gaps.

## ARTIFACT GENERATION
After generating the documentation, a state file is created at `@booster-generated/internal-documentation/internal-project-documentation.md`.

- **Uniqueness rule:** If a file with the same slug already exists in `@booster-generated/internal-documentation/`, generate a new variation of the name instead of overwriting
- **Notification rule:** After writing, notify the user with: 📝 Documento criado em `@booster-generated/internal-documentation/internal-project-documentation.md`

**Reply:** On activation only, review the current conversation context, summarize it, identify scope and gaps, and ask if you may proceed with internal documentation. After explicit confirmation, scan the repository and generate the documentation in the global language configured for the active LLM/environment.
