# 🤖 AGENTIC KIT — INIT

> [!IMPORTANT]
> **BOOTSTRAP ONLY — EXECUTE ONLY ON AN EXPLICIT USER REQUEST.**
> This file is the master bootstrap orchestrator for the Dev Booster Agentic Kit.
> Never read or execute it for ordinary tasks or any `@Obsidian` request. Begin the sequence below only when the user explicitly asks to run the Dev Booster bootstrap.

---

## ⚡ BOOTSTRAP SEQUENCE

After the user explicitly requests the Dev Booster bootstrap, execute each step in order. Do not skip steps. Do not ask for confirmation between steps.

### STEP 1 — Read the Governance Protocol

Read `.devbooster/rules/PROTOCOL.md` in full.
This defines your conduct rules, communication style, and architectural constraints.
For instant `@` shortcut triggers (`@Frontend`, `@Debug`, `@Audit`, etc.), see `AGENTS.md` at the project root (created in Step 8).

### STEP 2 — Capture the Initial Project Snapshot

Run the lightweight structural discovery script:

```bash
python .devbooster/hub/scripts/session_manager.py status
```

Use its output only as initial orientation for the manual bootstrap investigation:

- identify the likely project type and technology stack;
- locate likely frontend, backend, database, and feature directories;
- understand the project's broad file structure and capabilities;
- guide where to look during the following White Label scans.

This snapshot does **not** replace reading the repository and is not an audit. Do not run security, lint, type coverage, API, schema, UX, SEO, GEO, performance, mobile, i18n, or test scripts during bootstrap.

### STEP 3 — Generate `CODEBASE.md` (Project Snapshot)

Read `.devbooster/rules/CODEBASE.md`.
The file contains a bootstrap prompt. Execute it: build the compact, always-read project snapshot from the Step 2 output plus quick reads (README, `package.json`, source scan, runtime test).

### STEP 4 — Bootstrap PROJECT.md

Read `.devbooster/rules/PROJECT.md`.
The file contains a bootstrap prompt. Execute it: scan the project and overwrite the file with project-specific architecture documentation.

### STEP 5 — Bootstrap FRONTEND.md

Read `.devbooster/rules/FRONTEND.md`.
The file contains a bootstrap prompt. Execute it: scan the frontend stack and overwrite the file with stack-specific frontend rules.

### STEP 6 — Bootstrap BACKEND.md

Read `.devbooster/rules/BACKEND.md`.
The file contains a bootstrap prompt. Execute it: scan the backend/API architecture and overwrite the file with stack-specific backend rules.

### STEP 7 — Bootstrap COMMERCIAL.md

Read `.devbooster/rules/COMMERCIAL.md`.
The file contains a bootstrap prompt. Execute it: analyze the product's business model and overwrite the file with commercial positioning documentation.

### STEP 8 — IDE Bridge Fallback

The CLI already tries to locate known AI/IDE instruction files and append the Dev Booster bridge automatically.

If the file `.devbooster/hub/flags/needs-ide-bridge` exists, it means no known IDE instruction file was found during installation.
In that case, create `AGENTS.md` at the project root and insert the following block:

```md
# 🤖 DEV BOOSTER — AGENTIC KIT BOOTSTRAP

Before any action, read `.devbooster/rules/PROTOCOL.md` for full governance rules.

## Instant Triggers

You can instantly activate any Dev Booster behavior by typing the corresponding `@` trigger in chat.

**Important:** A trigger activates the booster's contract mode only (Armed/Stage 0).
It does NOT authorize the booster to analyze, investigate, or modify the project.
After activation, provide the concrete task or symptom before the booster proceeds.

Read `.devbooster/rules/TRIGGERS.md` for the complete trigger dictionary.

Common examples:

- `@Frontend` — activate frontend specialist
- `@Backend` — activate backend architect
- `@Debug` — systematic root cause analysis
- `@Audit` — lint and typecheck audit
- `@Refactor` — clean code and SOLID refactoring
- `@Performance` — Web Vitals and optimization
- `@Testing` — test strategy and coordination
- `@Advisor` — kit GPS to choose the right booster
```

Do not duplicate the block if the file already references `.devbooster/rules/PROTOCOL.md`.
If `AGENTS.md` already exists, append the block at the end instead of overwriting the file.

### STEP 9 — Confirm Completion

After all files have been overwritten (including `CODEBASE.md`), report back to the user with:

- A summary of what was detected in each domain (project, frontend, backend, commercial) and the generated `CODEBASE.md` snapshot.
- Whether the IDE bridge was already handled by the CLI or whether `AGENTS.md` had to be created as fallback.
- Any gaps or missing information that could not be auto-detected and may need manual input.

Then offer, without running it automatically:

```md
Você quer que eu faça uma análise geral da sua aplicação com o Booster Intel?

A análise é opcional, somente leitura na primeira etapa, pode levar alguns minutos e não aplica correções sem autorização. Ela gera um relatório persistente, organiza os achados por severidade e pode recomendar ondas seguras com boosters especializados.
```

Only activate Intel after the user explicitly confirms the analysis. The completion report shown in chat must follow the global language configured for the active LLM/environment.
The generated project artifacts and technical file contents may remain in technical English when appropriate.

---

> [!NOTE]
> This file can remain here safely. If you need to re-run the full bootstrap (e.g. after a major architectural change), simply ask your AI to "read DEVBOOSTER_INIT.md and re-execute all bootstrap steps."
