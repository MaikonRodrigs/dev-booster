# 🦾 Dev Booster

> Drop a production-grade AI governance kit into any project — in one command.

```bash
npx dev-booster
```

---

## What it does

**Dev Booster** installs a complete **Agentic Kit** into your project — a structured set of rules, boosters, and skills that supercharge any AI assistant (Gemini, Claude, Copilot, Cursor, etc.) with deep project context and expert behavior.

Unlike generic agent folders, **Dev Booster** uses a manual, activation-first model:
- boosters are activated intentionally by the user
- most boosters use lazy loading instead of loading the full kit immediately
- context is pulled only when the task, artifact, or pain point actually requires it
- each booster has a distinct operational role, instead of behaving like a generic prompt blob

This gives the kit a stronger product identity and helps avoid unnecessary context bloat.

After running the command, your project gets:

```
.devbooster/
├── MANIFEST.md          ← inventory of all agents, skills, and boosters
├── boosters/            ← 23 expert activators (debug, review, design, deploy...)
├── hub/                 ← 40+ skills and operational scripts
└── rules/
    ├── PROTOCOL.md      ← governance and conduct rules
    ├── PROJECT.md       ← whitelabel → auto-fills with your architecture
    ├── FRONTEND.md      ← whitelabel → auto-fills with your frontend stack
    ├── BACKEND.md       ← whitelabel → auto-fills with your backend stack
    ├── COMERCIAL.md     ← whitelabel → auto-fills with your business model
    └── USER_PREFERENCES.md
DEVBOOSTER_INIT.md                  ← bootstrap orchestrator (read below)
```

---

## Bootstrap: DEVBOOSTER_INIT.md

After installation, open your AI assistant and say:

> **"Read DEVBOOSTER_INIT.md and execute all bootstrap steps."**

The AI will:
1. Read your project's architecture, stack, and business logic
2. Auto-fill all whitelabel rule files with project-specific documentation
3. Report what it found and flag any gaps it couldn't auto-detect

This process only needs to run once. The `DEVBOOSTER_INIT.md` stays in your project — if you need to re-run after a major architectural change, just ask again.

---

## Boosters

Boosters are expert activators you invoke manually during development.

| Booster | When to use |
|---|---|
| `implementation.md` | Selecting the right implementation plan after context is mature |
| `debug.md` | Systematic root cause analysis |
| `review.md` | Pre-PR code audit |
| `design.md` | UI/UX component review |
| `deploy.md` | Pre-flight deployment checks |
| `security.md` | Security posture audit |
| `refactor.md` | Cleaning technical debt |
| `planning.md` | Validating readiness, risks, and gaps before implementation |
| `discovery.md` | Product brainstorm |
| `performance.md` | Core Web Vitals / bundle issues |
| + 13 more | See `.devbooster/MANIFEST.md` |

The practical activation flow is simple:
- drag a booster file into the chat
- send it
- let the mode activate
- then send the real task, artifact, or objective

Many boosters now use a two-step flow:
1. Activate the mode
2. Provide the real task, context, artifact, or pain point so the booster can load only what it needs

---

## Smart Usage Patterns

One of the main strengths of Dev Booster is that boosters can be used in sequence, not just in isolation.

### 1. Investigate before implementation

Use this when the repository is complex and you do not want the AI to jump straight into coding.

Flow:
1. `investigation.md`
2. `planning.md`
3. `implementation.md`
4. `review.md`

What this gives you:
- repository-aware analysis first
- readiness and risk alignment before execution
- the right implementation template (`simple`, `standard`, or `heavy`)
- a stronger validation pass at the end

### 2. Product idea to executable plan

Use this when the idea is still being shaped.

Flow:
1. `discovery.md`
2. `planning.md`
3. `implementation.md`

What this gives you:
- idea exploration
- clarification of business rules and gaps
- a structured path into execution only after the context is mature

### 3. Mature context to technical documentation

Use this after discovery or investigation has already produced enough context.

Flow:
1. `investigation.md` or `discovery.md`
2. `documentation.md`

What this gives you:
- synthesis of the current conversation context
- confirmation before generation
- a reusable technical document instead of fragmented chat history

### 4. Safe review in a fresh chat

Use this when you want a stronger validation pass with minimal prior bias.

Flow:
1. Open a fresh chat
2. Activate `review.md`
3. Paste the implementation plan, documentation, diff, or reference

What this gives you:
- a cleaner validation environment
- artifact-first review
- skill/persona loading only after the review target is provided

### 5. Release note generation from real Git state

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

### 6. Domain mode plus execution mode

Boosters can also be combined by role.

Example flow:
1. `frontend.md`
2. `planning.md`
3. `implementation.md`

This works well when:
- you know the task belongs to a domain
- but you still want alignment and execution discipline before building

### 7. Use Advisor when you are unsure

If you do not know which booster should come first:
1. activate `advisor.md`
2. describe the task in one message
3. let it recommend the smallest effective booster path

The advisor recommends boosters only, keeping the path clean and focused.

---

## Requirements

- Node.js >= 20

---

## Credits

Adapted and maintained by [Maikon Rodrigs](https://github.com/MaikonRodrigs).

---

## License

MIT
