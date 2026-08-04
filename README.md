# 🦾 Dev Booster

> Drop a production-grade AI governance kit into any project — in one command.

```bash
npx --yes dev-booster@latest
```

To update an existing kit installation safely:

```bash
npx --yes dev-booster@latest --update
```

> **Important:** although npm shows `npm i dev-booster`, Dev Booster is intended to be used as a one-off CLI, not as a runtime project dependency.
> Prefer `npx --yes dev-booster@latest` so you always run the newest published version.
> If you install it with `npm i dev-booster`, future `npx dev-booster --update` calls may use the locally installed old version and miss newly published boosters.

---

## What it does

**Dev Booster** installs a complete **Agentic Kit** into your project — a structured set of rules, boosters, and skills that supercharge any AI assistant (Gemini, Claude, Copilot, Cursor, etc.) with deep project context and expert behavior.

Unlike generic agent folders, **Dev Booster** uses a manual, activation-first model:

- boosters are activated intentionally by the user
- most boosters use lazy loading instead of loading the full kit immediately
- context is pulled only when the task, artifact, or pain point actually requires it
- each booster has a distinct operational role, instead of behaving like a generic prompt blob
- artifact generation is now selective: exploratory boosters stay conversational, while documentation and persistence boosters generate files only at the end or after explicit confirmation

This gives the kit a stronger product identity and helps avoid unnecessary context bloat.

After running the command, your project gets:

```
.devbooster/
├── MANIFEST.md          ← inventory of all agents, skills, and boosters
├── boosters/            ← 44 expert activators (intel, auto triage, commit, debug, review, design, deploy, enhance, ui-ux-pro-max, smart-task, save-reference, check-build, obsidian, forger, init...)
├── hub/                 ← 43+ skills and operational scripts
└── rules/
    ├── PROTOCOL.md      ← governance and conduct rules
    ├── PROJECT.md       ← whitelabel → auto-fills with your architecture
    ├── FRONTEND.md      ← whitelabel → auto-fills with your frontend stack
    ├── BACKEND.md       ← whitelabel → auto-fills with your backend stack
    ├── COMMERCIAL.md     ← whitelabel → auto-fills with your business model
    └── USER_PREFERENCES.md
DEVBOOSTER_INIT.md                  ← bootstrap orchestrator (read below)
```

---

## Safe Testing (`--dry-run`)

If you want to see exactly what Dev Booster will install or update in your project without actually making any changes, you can use the `--dry-run` flag:

```bash
npx --yes dev-booster@latest --dry-run
```

For updates:

```bash
npx --yes dev-booster@latest --update --dry-run
```

This will run a full simulation of the command and print a detailed report of which files would be created, updated, or preserved, giving you complete peace of mind before executing the real installation.

---

## Bootstrap: DEVBOOSTER_INIT.md

After installation, open your AI assistant and say:

> **"Read DEVBOOSTER_INIT.md and execute all bootstrap steps."**

The AI will:

1. Read your project's architecture, stack, and business logic
2. Auto-fill all whitelabel rule files with project-specific documentation
3. Report what it found and flag any gaps it couldn't auto-detect

This process only needs to run once. The `DEVBOOSTER_INIT.md` stays in your project — if you need to re-run after a major architectural change, just ask again.

For later kit updates, use:

```bash
npx --yes dev-booster@latest --update
```

This refreshes:

- `.devbooster/boosters/`
- `.devbooster/hub/`

And preserves:

- `.devbooster/rules/`
- `DEVBOOSTER_INIT.md`

---

## Boosters

Boosters are expert activators you invoke manually during development.

| Booster                     | When to use                                                                                                                                   |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `intel.md`                  | Optional post-bootstrap project health analysis with adaptive diagnostics, persistent artifact, bounded remediation waves, and reanalysis     |
| `auto-triage.md`            | Manual activation with automatic, artifact-centered engineering triage; requires separate Plan + Review and reviewed-plan execution approvals |
| `implementation.md`         | Selecting the right implementation plan after context is mature                                                                               |
| `debug.md`                  | Systematic root cause analysis                                                                                                                |
| `review.md`                 | Pre-PR code audit                                                                                                                             |
| `design.md`                 | UI/UX component review                                                                                                                        |
| `deploy.md`                 | Pre-flight deployment checks                                                                                                                  |
| `security.md`               | Security posture audit                                                                                                                        |
| `stack-refresh.md`          | Audit outdated runtimes/frameworks/dependencies and propose phased upgrades                                                                   |
| `refactor.md`               | Cleaning technical debt                                                                                                                       |
| `planning.md`               | Validating readiness, risks, and gaps before implementation                                                                                   |
| `global-documentation.md`   | Transferable technical documentation for mature feature context                                                                               |
| `internal-documentation.md` | Internal project map with absolute paths, files, assets, scripts, and edit boundaries                                                         |
| `discovery.md`              | Product brainstorm                                                                                                                            |
| `performance.md`            | Core Web Vitals / bundle issues                                                                                                               |
| `code-audit.md`             | Strict Code Auditor (Syntax, React Doctor) before PR                                                                                          |
| `audit.md`                  | Make terminal lint and typecheck operational, check bypasses, and separate safe fixes from deep review                                        |
| `commit.md`                 | Worktree checkpoint commit with conversational preflight, security gate, and root `CHANGELOG.md` update                                       |
| `init.md`                   | Read-only project investigation that answers focused technical questions from codebase evidence                                               |
| `obsidian.md`               | Contextual Obsidian MCP memory with canonical project notes and explicit approval before writes                                               |
| + 27 more                   | See `.devbooster/MANIFEST.md`                                                                                                                 |

The practical activation flow is simple:

- drag a booster file into the chat
- send it
- let the mode activate
- then send the real task, artifact, or objective

Many boosters now use a two-step flow:

1. Activate the mode
2. Provide the real task, context, artifact, or pain point so the booster can load only what it needs

### Booster artifact behavior at a glance

| Booster                     | Artifact behavior                                                                                                                                                       |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `advisor.md`                | No artifact by default; save only if the user explicitly asks                                                                                                           |
| `code-audit.md`             | Final report artifact only after confirmation; operational diagnostics files may still be created when needed                                                           |
| `context.md`                | No artifact by default; save only if the user explicitly asks                                                                                                           |
| `debug.md`                  | No artifact by default; save only if the user explicitly asks                                                                                                           |
| `deploy.md`                 | No artifact by default; save only if the user explicitly asks                                                                                                           |
| `discovery.md`              | No artifact by default; save only if the user explicitly asks                                                                                                           |
| `global-documentation.md`   | Final documentation artifact only after confirmation                                                                                                                    |
| `implementation.md`         | Final implementation artifact only after confirmation                                                                                                                   |
| `internal-documentation.md` | Final documentation artifact only after confirmation                                                                                                                    |
| `investigation.md`          | No artifact by default; save only if the user explicitly asks                                                                                                           |
| `intel.md`                  | Creates and continuously updates the canonical analysis, wave, authorization, and recovery artifact at `@booster-generated/intel/` after explicit analysis confirmation |
| `auto-triage.md`            | Creates a visible evidence-board state artifact at `@booster-generated/auto-triage/` after a real demand; never on activation alone                                     |
| `audit.md`                  | Always writes an execution-state artifact to `@booster-generated/audit/` during its run                                                                                 |
| `stack-refresh.md`          | Always writes an execution-state artifact to `@booster-generated/stack-refresh/` during its run                                                                         |
| `planning.md`               | No artifact by default; save only if the user explicitly asks                                                                                                           |
| `save-context.md`           | Persistence-first; generates YAML snapshot after confirmation                                                                                                           |
| `security.md`               | No artifact by default; save only if the user explicitly asks                                                                                                           |
| `coder.md`                  | Does not create local state files                                                                                                                                       |
| `diff-review.md`            | Must not generate files, artifacts, logs, or review documents                                                                                                           |
| `obsidian.md`               | Does not generate local artifacts; writes only to Obsidian through MCP after explicit approval                                                                          |
| `commit.md`                 | No `@booster-generated` artifact; updates only the root `CHANGELOG.md` after approval                                                                                   |

---

## The Artifact Engine

Dev Booster operates an internal **Artifact Engine** (Shadow Memory), but artifact generation is no longer a continuous background behavior for every booster.

### New default behavior

- exploratory, advisory, and iterative boosters answer in chat first
- they do **not** create artifacts during normal execution
- if the result is stable, they may offer to save it at the end of the conversation
- documentation and persistence boosters may generate a final file only after confirmation
- no booster should silently keep updating artifact files in the background

This keeps the conversation faster while still preserving the option to materialize important outputs in `@booster-generated/` when the user actually wants them.

### Booster artifact policy

#### 1. No artifact by default — only if the user explicitly asks

- `advisor.md`
- `context.md`
- `debug.md`
- `deploy.md`
- `discovery.md`
- `investigation.md`
- `planning.md`
- `security.md`

#### 2. Final artifact only after confirmation

- `code-audit.md`
- `global-documentation.md`
- `implementation.md`
- `internal-documentation.md`

#### 3. Persistence-first booster

- `save-context.md`

#### 4. Execution-state artifact booster

- `audit.md`
- `stack-refresh.md`
- `auto-triage.md`

### Artifact locations

When a user explicitly asks to save or confirms final generation, artifacts are organized under `@booster-generated/`, with each booster writing to its own folder. Execution-state boosters — including `auto-triage.md` after it receives a real demand — are the explicit exception and create their visible state artifact during the flow.

### Manual & Shortcut Triggers

You can take manual control of the kit's governance or instantly route behavior modes at any time using explicit Chat Triggers:

#### 👥 Governance Triggers

- **`@SaveContext`**: Compacta toda a conversa em YAML para continuar em um novo chat sem perda de contexto. Gera em `@booster-generated/saved-context/context-<slug>.yaml` após confirmação.
- **`@LogTask`**: Tells the AI to capture a pending technical task and document it systematically in your backlog at `@booster-generated/tasks.md`.

#### ⚡ Booster Shortcut Triggers

Instead of dragging booster files into the chat, you can instantly activate any booster behavior contract by typing its shortcut trigger:

- **`@AutoTriage`** ➔ Activates `auto-triage.md` (automatic, artifact-centered engineering triage with separate Plan + Review and execution approvals).
- **`@Context`** ➔ Activates `context.md` (Silent Sponge context mapping).
- **`@Coder`** ➔ Activates `coder.md` (Co-Creative design/writing).
- **`@Builder`** ➔ Activates `builder.md` (Senior plan audit & execution).
- **`@Planning`** ➔ Activates `planning.md` (Readiness check).
- **`@Implementation`** ➔ Activates `implementation.md` (Plan sizing & generation).
- **`@Atomic`** ➔ Activates `atomic.md` (Surgical step-by-step writing).
- **`@Review`** ➔ Activates `review.md` (Elite code audit).
- **`@Advisor`** ➔ Activates `advisor.md` (Kit GPS consultant).
- **`@Commit`** ➔ Activates `commit.md` (Worktree checkpoint, security gate, and root `CHANGELOG.md` update).
- **`@Enhance`** ➔ Activates `enhance.md` (Evolution mode for adding features to existing projects).
- **`@UIUX`** ➔ Activates `ui-ux-pro-max.md` (Premium Design Intelligence).
- _See `.devbooster/rules/TRIGGERS.md` for the complete trigger list._

---

## Smart Usage Patterns

One of the main strengths of Dev Booster is that boosters can be used in sequence, not just in isolation.

### Auto Triage as the primary deep-analysis entry point

Use `auto-triage.md` when you want the kit to emulate a senior developer's pre-execution triage without giving up manual control.

1. Activate `auto-triage.md` (or `@AutoTriage`); it stays armed and lazy-loaded.
2. Send the actual issue, feature, or target.
3. It evaluates the full booster catalog, coordinates every applicable specialist, and records evidence in one shared artifact.
4. It returns a concise triage conclusion and requests approval for **Plan + Review**.
5. After that approval, it selects `atomic.md` or the appropriate `implementation.md` path and validates the resulting plan through `review.md`.
6. It then requests separate approval to execute that specific reviewed plan.
7. Only after execution approval does it hand the complete artifact to the selected execution booster.

Manual boosters remain available and are still the best option when you know exactly which focused capability you need.

### 1. Use Advisor when you are unsure

If you do not know which booster should come first:

1. activate `advisor.md`
2. describe the task in one message
3. let it recommend the smallest effective booster path

The advisor recommends boosters only, keeping the path clean and focused.

### 2. Investigate before implementation

Use this when the repository is complex and you do not want the AI to jump straight into coding.

Flow:

1. `context.md` (or `investigation.md` for deep PO/PM mapping)
2. `planning.md`
3. `implementation.md`
4. `review.md`

What this gives you:

- repository-aware analysis first
- readiness and risk alignment before execution
- the right implementation template (`simple`, `standard`, or `heavy`)
- a stronger validation pass at the end

### 3. Product idea to executable plan

Use this when the idea is still being shaped.

Flow:

1. `discovery.md`
2. `planning.md`
3. `implementation.md`

What this gives you:

- idea exploration
- clarification of business rules and gaps
- a structured path into execution only after the context is mature

### 4. Mature context to global technical documentation

Use this after discovery or investigation has already produced enough context.

Flow:

1. `investigation.md` or `discovery.md`
2. `global-documentation.md`

What this gives you:

- synthesis of the current conversation context
- confirmation before generation
- a reusable technical document instead of fragmented chat history

For repository-specific internal maps with absolute paths, use `internal-documentation.md` instead of `global-documentation.md`.

### 5. Safe review in a fresh chat

Use this when you want a stronger validation pass with minimal prior bias.

Flow:

1. Open a fresh chat
2. Activate `review.md`
3. Paste the implementation plan, documentation, diff, or reference

What this gives you:

- a cleaner validation environment
- artifact-first review
- skill/persona loading only after the review target is provided

### 6. Release note generation from real Git state

Use this when you want changelogs based on what actually changed, not on memory.

Flow:

1. Activate `changelog.md`
2. If there are uncommitted changes, the booster uses the working tree
3. If the repo is clean, provide compact input like `3 C`

What this gives you:

- Git-driven changelog generation
- three detail levels:
  - `A` = basic
  - `B` = hybrid
  - `C` = technical
- always includes changed files and changed lines

### 7. Domain mode plus execution mode

Boosters can also be combined by role.

Example flow:

1. `frontend.md`
2. `planning.md`
3. `implementation.md`

This works well when:

- you know the task belongs to a domain
- but you still want alignment and execution discipline before building

---

## Requirements

- Node.js >= 20

---

## Credits

Adapted and maintained by [Maikon Rodrigs](https://github.com/MaikonRodrigs).

---

## License

MIT
