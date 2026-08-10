# 🦾 MASTER AGENTIC HUB MANIFEST (EXHAUSTIVE V2)

> [!IMPORTANT]
> **This file is the canonical local inventory for this repository.**
> Paths below assume the Dev Booster repository structure: `.devbooster/` for runtime rules and `.devbooster/hub/` for reusable assets.

**Inventory File:** `.devbooster/MANIFEST.md`
**Repository Root:** Use this repository root directly.
**Role:** Inventory of Dev Booster capabilities — Personas, Skills, Boosters, Workflows, and Scripts.
**Credits:** Adapted and maintained by [Maikon Rodrigs](https://github.com/MaikonRodrigs).

---

## 👥 1. SPECIALIZED AGENTS (PERSONAS)

### Core Engineering

- `agent_frontend-specialist`: Next.js, React, UI/UX Logic expert.
- `agent_backend-specialist`: Node.js, tRPC, PostgreSQL, Prisma architect.
- `agent_database-architect`: Complex schemas, migrations, query optimization.
- `agent_debugger`: Deep root cause analysis and logical fix generation.
- `agent_performance-optimizer`: Core Web Vitals, bundle size, expensive operations.
- `agent_explorer-agent`: Deep codebase analysis, structural mapping, and reverse engineering.

### Architecture & Strategy

- `agent_project-planner`: Context consolidation, risk mapping, and readiness validation before implementation.
- `agent_orchestrator`: Management of multiple agents for high-complexity tasks.
- `agent_product-owner`: Business rules, user value, and monetization logic.
- `agent_product-manager`: Product lifecycle, requirements, and discovery.

### Quality & Infrastructure

- `agent_test-engineer`: Unit/Integration tests, AAA patterns.
- `agent_qa-automation-engineer`: E2E (Playwright/Cypress) and CI testing.
- `agent_devops-engineer`: VPS, Linux, Docker, Deployment, Server management.
- `agent_security-auditor`: Security logic, auth bypass, and PII protection.
- `agent_penetration-tester`: Vulnerability hunting and red team simulation.

### Specialized Domains

- `agent_mobile-developer`: React Native, Expo, SwiftUI native, and Responsive Mobile logic.
- `agent_game-developer`: Game engines, physics, and gameplay loops.
- `agent_seo-specialist`: Search engine indexation and semantic HTML.
- `agent_code-archaeologist`: Legacy code analysis and refactoring safety.
- `agent_documentation-writer`: Technical manual generation and global docs.

---

## 📚 1.5 KNOWLEDGE BASE (CURATED PATTERNS AND DECISIONS)

The knowledge base at `.devbooster/hub/knowledge/` contains curated, field-validated patterns, migration guidance, and technical decisions organized by stack. Each article documents a problem, symptom, or decision, and links to the relevant official source. Boosters consult this base selectively:
`index.md` → matching article → relevant section (`start_line`/`end_line`) → linked official source → reconcile with actual project context.

The base is read-only. Only project maintainers update it.

| Article                                                                                    | Content                                                                               |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------- |
| [`index.md`](.devbooster/hub/knowledge/index.md)                                           | Global catalog, usage protocol, trusted official source matrix, and maintenance rules |
| [`react-patterns.md`](.devbooster/hub/knowledge/react-patterns.md)                         | Effects, derived state, async UI strategy, Suspense boundaries, hooks, state mutation |
| [`nextjs-pitfalls.md`](.devbooster/hub/knowledge/nextjs-pitfalls.md)                       | Build/lint changes, config drift, Server/Client boundaries, route loading, hydration  |
| [`eslint-migration.md`](.devbooster/hub/knowledge/eslint-migration.md)                     | ESLint 9 flat config migration, masking, inline suppressions                          |
| [`typescript-patterns.md`](.devbooster/hub/knowledge/typescript-patterns.md)               | Import paths, suppressions, discriminated UI states, runtime validation, null safety  |
| [`dependency-guide.md`](.devbooster/hub/knowledge/dependency-guide.md)                     | Safe update model, dependency analysis, audit interpretation                          |
| [`upgrade-fallout.md`](.devbooster/hub/knowledge/upgrade-fallout.md)                       | Upgrade fallout: scripts, config, new lint rules, validation                          |
| [`migration-guides.md`](.devbooster/hub/knowledge/migration-guides.md)                     | Library-specific migrations (react-to-print, Formik, Radix, shadcn)                   |
| [`nodejs-patterns.md`](.devbooster/hub/knowledge/nodejs-patterns.md)                       | Runtime alignment, ESM/CJS, environment, async failures, scripts                      |
| [`package-manager-patterns.md`](.devbooster/hub/knowledge/package-manager-patterns.md)     | Lockfiles, peers, overrides, audit, workspace, immutable installs                     |
| [`monorepo-patterns.md`](.devbooster/hub/knowledge/monorepo-patterns.md)                   | Package boundaries, dependency resolution, shared config, cache                       |
| [`trpc-patterns.md`](.devbooster/hub/knowledge/trpc-patterns.md)                           | Context/auth, input validation, errors, type integrity, router design                 |
| [`tanstack-patterns.md`](.devbooster/hub/knowledge/tanstack-patterns.md)                   | Query ownership, keys, invalidation, async UI states, caching, SSR hydration          |
| [`prisma-postgresql-patterns.md`](.devbooster/hub/knowledge/prisma-postgresql-patterns.md) | Generation drift, migrations, query loading, transactions, indexes                    |
| [`nestjs-patterns.md`](.devbooster/hub/knowledge/nestjs-patterns.md)                       | Modules, DI, validation, guards, exceptions, configuration                            |
| [`vite-patterns.md`](.devbooster/hub/knowledge/vite-patterns.md)                           | Env exposure, base paths, aliases, ESM/CJS, optimizer, plugins, React integration     |
| [`tailwind-shadcn-patterns.md`](.devbooster/hub/knowledge/tailwind-shadcn-patterns.md)     | v3/v4 migration, source scanning, tokens, themes, design-system reuse                 |
| [`testing-patterns.md`](.devbooster/hub/knowledge/testing-patterns.md)                     | Environments, determinism, mocks, async UI behavior, CI parity, validation            |
| [`angular-patterns.md`](.devbooster/hub/knowledge/angular-patterns.md)                     | Standalone APIs, DI, signals/RxJS, forms, HTTP, routing                               |

---

## 🛠️ 2. TECHNICAL SKILL MATRIX (DENSE KNOWLEDGE)

### Frontend & UI/UX

- `skill_ui-ux-pro-max`: Premium UI Bible (50 styles, 21 palettes, 50 fonts).
- `skill_frontend-design`: The "Anti-Generic" design patterns and system tokens.
- `skill_react-best-practices`: 57+ Vercel rules for React & Next.js performance.
- `skill_web-design-guidelines`: UX Audit (100+ rules for accessibility & Web Vitals).
- `skill_tailwind-patterns`: Atomic CSS v4 and modern utility-first systems.
- `skill_mobile-design`: Specialized Mobile UX and touch patterns.
- `skill_swift-apps`: Swift/SwiftUI native Apple apps (iOS, iPadOS, macOS, watchOS, tvOS) — language, SwiftUI, SwiftData, platform guides.
- `skill_xcode-cli`: Xcode command-line mastery — builds, simulators, signing, notarization, SwiftPM CLI, release.
- `skill_design-engineering-utilities`: Colors, contrast, gradients, easing, SVG, regex, and frontend communication utilities with official-source verification.
- `skill_motion-design`: Motion-system selection, microinteractions, accessibility, and performance constraints.
- `skill_component-composition`: Component-library selection and adaptation with framework/version verification.
- `skill_visual-validation`: Screenshot, prototype, responsive, accessibility, and design-to-code validation.

### Backend, API & Database

- `skill_nodejs-best-practices`: Node.js async, modules, and error handling.
- `skill_api-patterns`: REST, GraphQL, tRPC, and contract-first design.
- `skill_nestjs-expert`: NestJS modules, DI, and enterprise patterns.
- `skill_python-patterns`: FastAPI, automation, and AI pipelines.
- `skill_database-design`: Schema optimization and indexing strategy.
- `skill_prisma-expert`: Prisma ORM, migrations, and deep relationships.
- `skill_swift-backend`: Vapor, Fluent ORM, server-side Swift APIs.

### Architecture & Quality

- `skill_architecture`: Clean Architecture, Hexagonal, and SOLID principles.
- `skill_clean-code`: Global standards for readable/maintainable code.
- `skill_app-builder`: Full-stack scaffolding and rapid prototyping.
- `skill_plan-writing` / `skill_brainstorming`: Discovery and Socratic task planning.
- `skill_testing-patterns`: Jest, Vitest, and AAA testing strategies.
- `skill_webapp-testing`: E2E mastery (Playwright/Cypress).
- `skill_tdd-workflow`: Test-driven development implementation.
- `skill_code-review-checklist`: Code quality standards and PR audit rules.
- `skill_lint-and-validate`: Universal linting and static analysis.

### Security, DevOps & Cloud

- `skill_vulnerability-scanner`: OWASP Top 10 auditing and secret detection.
- `skill_red-team-tactics`: Offensive security and threat modeling.
- `skill_docker-expert`: Containerization, Compose, and orchestration.
- `skill_deployment-procedures`: Release safety and CI/CD workflows.
- `skill_server-management` / `skill_bash-linux`: VPS and Shell mastery.

### Specialized Tools & Growth

- `skill_intelligent-routing`: Autonomous agent selection and task routing logic.
- `skill_typescript-expert`: Type-level programming and performance.
- `skill_rust-pro`: Memory safety and performance-critical module development.
- `skill_mcp-builder`: Model Context Protocol component mastery.
- `skill_parallel-agents`: Multi-agent orchestration logic.
- `skill_seo-fundamentals`: E-E-A-T and semantic HTML compliance.
- `skill_geo-fundamentals`: GenAI Optimization (AI Citations Readiness).
- `skill_i18n-localization`: Global strings and internationalization patterns.
- `skill_game-development`: Mechanics, logic, and state management.
- `skill_systematic-debugging`: Root cause analysis and hypothesis engine.
- `skill_doc`: Technical writing standards and semantic documentation guide.

---

## 🚀 3. BOOSTER ACTIVATORS (CURRENT KIT)

_All boosters live at: `.devbooster/boosters/`_

| Booster                     | Purpose                                                                                                                                                                    |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `create.md`                 | Master Architect — builds new features and apps with structural scaffolding.                                                                                               |
| `performance.md`            | Performance Engineer — optimizes loading speed and Core Web Vitals.                                                                                                        |
| `i18n.md`                   | Localization Specialist — handles internationalization and translations.                                                                                                   |
| `accessibility.md`          | Accessibility Auditor — ensures WCAG compliance and semantic HTML.                                                                                                         |
| `refactor.md`               | Quality Lead — refactors code, applies Clean Code/SOLID, and clears technical debt.                                                                                        |
| `implementation.md`         | Reviews context, selects `simple` / `standard` / `heavy`, and asks for confirmation before generating the plan.                                                            |
| `global-documentation.md`   | Generates the 17-section universal technical documentation spec.                                                                                                           |
| `internal-documentation.md` | Generates repository-specific internal documentation with absolute paths and file/asset maps.                                                                              |
| `atomic.md`                 | Surgical, single-step implementation spec (final execution stage).                                                                                                         |
| `auto-triage.md`            | Auto Triage Orchestrator — manually activated, artifact-centered engineering triage with separate approvals for Plan + Review and reviewed-plan execution.                 |
| `intel.md`                  | Post-bootstrap project health orchestrator — runs adaptive diagnostics, records evidence, delegates bounded remediation waves, and reanalyzes progress.                    |
| `advisor.md`                | Hub Consultant — recommends the best booster path for the user's task.                                                                                                     |
| `review.md`                 | Elite Auditor — multi-agent orchestration for plan and architecture validation.                                                                                            |
| `code-audit.md`             | Strict Code Auditor — syntax, linting, and React Doctor diagnostics for the codebase.                                                                                      |
| `debug.md`                  | Systematic Root Cause Analysis with hypothesis engine.                                                                                                                     |
| `discovery.md`              | Strategic Product Consultant — 3-path brainstorm protocol.                                                                                                                 |
| `investigation.md`          | Context Pre-Orchestrator — no-code analysis before implementation.                                                                                                         |
| `context.md`                | Context Assimilator — silent, non-proactive mapping of code flows and file context.                                                                                        |
| `init.md`                   | Project Init Investigator — evidence-first, read-only answers about the current codebase with concise technical responses.                                                 |
| `design.md`                 | UI/UX Design standards and component audit.                                                                                                                                |
| `deploy.md`                 | Pre-flight checks and deployment execution protocol.                                                                                                                       |
| `security.md`               | Security posture audit and threat modeling.                                                                                                                                |
| `stack-refresh.md`          | Runtime, framework, and dependency modernization analysis with phased upgrade planning.                                                                                    |
| `testing.md`                | Test generation strategy and runner coordination.                                                                                                                          |
| `changelog.md`              | Structured release note and changelog generation.                                                                                                                          |
| `commit.md`                 | Worktree checkpoint commit with conversational preflight, security gate, and root `CHANGELOG.md` update.                                                                   |
| `planning.md`               | Consolidates context, maps risks/gaps, and validates whether the task is ready for implementation.                                                                         |
| `frontend.md`               | Frontend specialist activation with stack-specific rules.                                                                                                                  |
| `forger.md`                 | Forger — forjas atomic plans into code without auditing or questioning. Single confirmation, self-validation with KB, final report.                                        |
| `backend.md`                | Backend specialist activation with API/DB constraints.                                                                                                                     |
| `seo.md`                    | SEO audit and semantic HTML compliance check.                                                                                                                              |
| `mobile.md`                 | Mobile UX activation (React Native / Expo patterns).                                                                                                                       |
| `builder.md`                | Builder Specialist — executes implementation plans and writes actual code.                                                                                                 |
| `coder.md`                  | Co-Creative Coder — debates folder patterns and code design, writes code only under command.                                                                               |
| `save-context.md`           | Save Context — compacta a conversa em YAML para continuar em um novo chat sem perda de contexto.                                                                           |
| `diff-review.md`            | Diff Review — analisa o diff como um dev sênior revisando PR, verificando naming, padrões, complexidade e boas práticas.                                                   |
| `enhance.md`                | Evolution Specialist — adds new features and expands existing flows in running projects.                                                                                   |
| `ui-ux-pro-max.md`          | Premium Design Intelligence — 50+ styles, 97 color palettes, 57 font pairings, 99 UX guidelines.                                                                           |
| `audit.md`                  | Audit — faz lint e typecheck funcionarem no terminal, detecta bypasses e separa achados em Setup Issues / Lot 1 / Lot 2.                                                   |
| `architecture-audit.md`     | Architecture Audit — audita estrutura, duplicações, nomenclatura e dependências, respeitando os padrões existentes do projeto.                                             |
| `smart-task.md`             | Smart Task — lightweight triage with full investigation calibre, single "pode seguir" approval, atomic plan + Forger execution. Persisted artifact for debug and rollback. |
| `save-reference.md`         | Visual Cataloger — receives a screenshot, categorizes it, saves it to the correct UX reference folder, and updates the category index.                                     |
| `check-build.md`            | Check Build (@CheckBuild) — clean cache, clean install, lint, typecheck, build, and optional tests. Sanity gate before merge/deploy.                                       |
| `obsidian.md`               | Obsidian Memory (@Obsidian) — contextual MCP memory with fixed Markdown templates, canonical project notes, pre-flight, and explicit approval before writes.               |
| `design-engineer.md`        | Design Engineer — roadmap-based solution discovery, visual direction, components, motion, web utilities, and official documentation verification.                          |
| `motion.md`                 | Motion — additive animation specialist for finished screens: entrance, hover, scroll reveal, and background motion with zero structural change, user-veto discovery, and sub-agent validation. |

---

## 🏗️ 4. OPERATIONAL SCRIPTS

_Canonical path: `.devbooster/hub/scripts/`_

### 🔍 Core Validation & Quality

- **`checklist.py`**: Incremental priority-based validation (Security, Lint, Schema, UX, SEO), used by applicable audit and readiness flows.
- **`verify_all.py`**: The definitive pre-release Master Check (Lighthouse, E2E, i18n).
- **`intel.md`**: **RECOMMENDED FIRST POST-BOOTSTRAP ANALYSIS FOR DEV** — orchestrates applicable diagnostics, persistent evidence, bounded remediation waves, and reanalysis.
- **`react_performance_checker.py`**: Waterfall and barrel import audit.
- **`lighthouse_audit.py`**: Performance web (LCP, FID, CLS, SEO).
- **`type_coverage.py`**: Coverage analysis (TS/Python) and `any` detection.
- **`lint_runner.py`**: Unified interface for ESLint, TSC, Ruff, Mypy.
- **`test_runner.py`**: Universal executor (Vitest, Jest, Pytest).

### 🎨 UX & Mobile Intelligence

- **`ux_audit.py`**: Psychology of design audit (Hick, Fitts) and UX rules.
- **`mobile_audit.py`**: 50+ Mobile-specific checks (Touch targets, haptics).
- **`accessibility_checker.py`**: WCAG compliance and semantic audit.
- **`i18n_checker.py`**: Detection of hardcoded strings and missing translations.

### 🛡️ Security & Database

- **`security_scan.py`**: Secrets, tokens, and dangerous code patterns.
- **`api_validator.py`**: API contract validation (OpenAPI/Swagger).
- **`schema_validator.py`**: Database integrity (Prisma/Drizzle/SQL).

### 🤖 AI Ready & Ops

- **`geo_checker.py`**: "AI Citations Readiness" (Schema.org, FAQ).
- **`seo_checker.py`**: Deep SEO audit (Meta, Semantics, Indexability).
- **`playwright_runner.py`**: E2E Health checks with headless screenshots.
- **`session_manager.py`**: Rapid tech stack analysis and file-level statistics.
- **`auto_preview.py`**: Automated dev server lifecycle management.
- `convert_rules.py`: Agent rule transformation and standardization — not in `hub/scripts/`; lives at `.devbooster/hub/skills/nextjs-react-expert/scripts/convert_rules.py`.

---

## 📊 5. KIT STATISTICS

| Metric                      | Value                                   |
| --------------------------- | --------------------------------------- |
| **Total Agents**            | 20                                      |
| **Total Skills**            | 43+                                     |
| **Master Boosters**         | 37                                      |
| **Knowledge Base Articles** | 18                                      |
| **Operational Scripts**     | 2 (Master) + 20 (Skill-level)           |
| **Coverage**                | ~95% Full-stack Web/Mobile/Native Apple |

---

## ⚡ 6. NAVIGATION GUIDELINE

When the user asks "How can the kit help?", the Advisor MUST:

1. Scan requirements.
2. Recommend the best **Booster** entry point for the task.
3. Suggest supporting boosters only when the task clearly spans multiple phases or domains.

---

## 📂 7. ARTIFACT ENGINE (SHADOW MEMORY)

Dev Booster no longer treats every booster as a continuous document generator. Artifact creation is now selective and user-controlled: exploratory boosters should stay fast and conversational, while documentation and persistence boosters may generate files only at the end of the flow or after explicit confirmation.

**Target Root Path:** `@booster-generated/`

### Artifact Policy by Booster Type

#### A. Optional only on explicit user request

These boosters must answer in chat first and must NOT create artifacts during normal execution:

- `advisor.md` → `@booster-generated/advisor/`
- `context.md` → `@booster-generated/context/`
- `debug.md` → `@booster-generated/debug/`
- `deploy.md` → `@booster-generated/deploy/`
- `discovery.md` → `@booster-generated/discovery/`
- `investigation.md` → `@booster-generated/investigation/`
- `planning.md` → `@booster-generated/planning/`
- `security.md` → `@booster-generated/security/`

#### B. Final artifact only after confirmation or explicit save intent

These boosters may generate a final deliverable artifact, but only after the user confirms the final generation step:

- `code-audit.md` → `@booster-generated/code-audit/`
- `global-documentation.md` → `@booster-generated/global-documentation/`
- `implementation.md` → `@booster-generated/implementation/`
- `internal-documentation.md` → `@booster-generated/internal-documentation/`

#### C. Persistence-first booster

This booster exists specifically to persist context and may generate its artifact as its primary outcome after confirmation:

- `save-context.md` → `@booster-generated/saved-context/`

#### D. Execution-state artifact booster

These boosters should maintain an execution state artifact during their run to track diagnosis, decisions, and outcomes:

- `audit.md` → `@booster-generated/audit/`
- `stack-refresh.md` → `@booster-generated/stack-refresh/`
- `auto-triage.md` → `@booster-generated/auto-triage/`
- `smart-task.md` → `@booster-generated/smart-task/`

### Behavior Rules:

- Each booster writes to its own folder — no overlapping paths.
- Artifacts are never written silently in the background.
- Files are never overwritten: if a slug already exists, a variation is generated.
- When an artifact is written, the AI must notify the user after writing.
- Exploratory and advisory boosters should prefer chat output over file generation.
- Documentation and persistence boosters should treat artifact creation as a finalization step, not as a continuous side effect.
