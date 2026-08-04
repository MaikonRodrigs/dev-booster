# 📇 INITIALIZATION: CODEBASE (PROJECT SNAPSHOT)

> [!IMPORTANT]
> **THIS IS A WHITELABEL TEMPLATE.**
> To activate this project, run the bootstrap prompt below manually.

## ⚡ BOOTSTRAP PROMPT (MANUAL CONTROL)

"Generate the compact project snapshot for this codebase.

**STEP 1: Context Analysis (Mandatory Read):**

1. `README.md` (product purpose and value proposition).
2. `package.json` (identify the core stack and runtime).
3. Run `python .devbooster/hub/scripts/session_manager.py status` (stack and structure detection).
4. Test the runtime: `node -v`; if `.nvmrc` exists, activate NVM (`nvm install; nvm use`) and record the exact version; state whether NVM is active.
5. Source scan: identify the main directories and entry points.

**STEP 2: Generate Elite Rule:**
Rewrite this file (CODEBASE.md) as the compact, always-read project summary — frontmatter + 5 bullets, ≤ ~15 lines, no headings, no decorative markdown. Use the 'Pattern Reference' below as the benchmark. Structure:

```markdown
---
name: codebase
priority: P0.4 (Project Snapshot)
description: Compact project summary — what it is, stack, runtime, structure.
---

- **What:** [purpose in 1-2 lines — from README / product context]
- **Stack:** [main technologies that matter for changes — e.g. "Next.js (App Router) · Node 22 · tRPC + Prisma · Clerk · Formik + Zod"]
- **Runtime:** [tested, concrete facts — NVM active? exact node version?]
- **Structure:** [key directories / entry points, simplified — not a full dump]
- **Deeper (only if asked):** source + domain rules — `FRONTEND.md`, `BACKEND.md`, `PROJECT.md`.
```

Rules:

- ≤ ~15 lines total.
- Do NOT include: dev commands (redundant with stack), OS for web projects (only native/desktop apps record it), or proactive pointers to deep files.
- The `Runtime` bullet must contain the tested, concrete facts (NVM active? node version?), not generic advice."

---

## 🏗️ EXPECTED STRUCTURE

1. **Frontmatter**: `name`, `priority: P0.4 (Project Snapshot)`, `description`.
2. **Bullets** (bold label + short value): What · Stack · Runtime · Structure · Deeper (only if asked).

---

## 🌟 PATTERN REFERENCE (THE ELITE STANDARD)

_Use this as your benchmark for density and format:_

```markdown
---
name: codebase
priority: P0.4 (Project Snapshot)
description: Compact project summary — what it is, stack, runtime, structure.
---

- **What:** Dev Booster — reusable agentic kit (guided boosters, governance rules, knowledge skills, validation scripts) installed via npm to make AI assistants project-aware.
- **Stack:** Node.js (ESM) + Python 3 (`hub/scripts`). npm. No framework/UI/backend/DB of its own.
- **Runtime:** Node >= 20 via NVM (ativo; sem `.nvmrc` no repo) — `nvm use` ativa a versão em cada shell (regra NVM no PROTOCOL).
- **Structure:** `bin/dev-booster.js` (CLI) · `src/` · `scripts/` · `.devbooster/` (boosters, hub, rules) · `template/` · `@booster-generated/`
- **Deeper (only if asked):** source + domain rules — `FRONTEND.md`, `BACKEND.md`, `PROJECT.md`.
```

---

## 🤖 AI SELF-EXECUTION DIRECTIVE

> [!IMPORTANT]
> **IF YOU ARE AN AI READING THIS FILE:**
> If the content above still matches the 'Whitelabel Template', you are MANDATED to execute the **BOOTSTRAP PROMPT** at the top of this file immediately.

1. Scan the project as instructed.
2. Analyze the stack and runtime.
3. Overwrite this entire file with the project-specific snapshot.
