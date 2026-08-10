```text
🧭 DEV BOOSTER KIT GUIDE (BOOSTERS)

This guide serves as a quick reference to understand the role of each Booster (manual activator).
It has been formatted as a code block to facilitate direct reading in the IDE.

---

[ 🧠 PRIMARY AUTO TRIAGE ENTRY POINT ]

• auto-triage.md    -> Auto Triage Orchestrator. Manually activated and lazy-loaded.
                       After the real demand arrives, it evaluates the full booster catalog,
                       coordinates every applicable specialist through one evidence artifact,
                       requires approval for Plan + Review, then a separate approval for
                       reviewed-plan execution. It complements — never replaces — manual boosters.

---

[ 🛠️ ENGINEERING & EXECUTION ]

• create.md         -> Master Architect. Focused on Scaffolding and creating new
                       features or apps from scratch, integrating FRONTEND.md and BACKEND.md.
• performance.md    -> Performance Engineer. Focused on Core Web Vitals,
                       load speed, and Next.js optimization.
• i18n.md           -> Internationalization Expert. Text extraction and
                       multi-language configuration.
• accessibility.md  -> Accessibility Auditor. Ensures WCAG compliance and
                       correct usage of HTML/ARIA semantics.
• refactor.md       -> Quality Lead. Focused on cleaning technical debt, implementing
                       SOLID principles, and enforcing Clean Code.
• implementation.md -> Implementation Master. Triages complexity (S, M, L)
                       and chooses the correct template before generating the plan upon confirmation.
• global-documentation.md
                    -> Global Documentation. Generates a transferable 17-section technical document
                       from the consolidated context to foresee all rigorous and reusable technical requirements.
• internal-documentation.md
                    -> Internal Documentation. Generates an internal project map with absolute paths,
                       files, assets, scripts, runtime rules, and editing boundaries.
• atomic.md         -> Atomic Execution. Protocol for step-by-step execution,
                       focused on a single surgical change at a time.
• review.md         -> Elite Audit. Triggers multi-agent orchestration to validate
                       if a plan or code follows project standards.
• coder.md          -> Co-Creative Coder. Debates folder patterns and architecture
                       ideas, writing code only under command.
• builder.md        -> Builder Specialist. Executes implementation plans and writes
                       actual code surgically.
• commit.md         -> Commit Checkpoint. Inspects the worktree, proposes one natural commit,
                       performs a security gate, updates the root CHANGELOG.md, and commits the full worktree.
• save-context.md   -> Save Context. Compacta toda a conversa em YAML para continuar
                       em um novo chat sem perda de contexto.
• enhance.md        -> Evolution Specialist. Adds new features and expands existing flows
                       in running projects with staged planning, approval, and verification.
• smart-task.md     -> Smart Task. Lightweight triage with full investigation depth.
                       Same flow mapping and specialist activation as Auto Triage, but
                       single "É isso?" approval → atomic plan → Forger executes.
                       Persisted artifact for traceability.
• forger.md         -> Forger. Forja atomic plans into code without auditing or questioning.
                       Single confirmation, self-validation with lint/typecheck + KB,
                       and final report. Ideal after Smart Task or direct atomic plans.

---

[ 🔍 DISCOVERY & PLANNING ]

• intel.md          -> Intel. Optional post-bootstrap project health analysis. Runs applicable diagnostics, creates a persistent artifact, prioritizes findings, and delegates bounded remediation waves with explicit authorization.
• auto-triage.md    -> Auto Triage. Universal engineering triage for ambiguous, high-risk,
                       or cross-cutting work. Maps context, coordinates applicable boosters,
                       records evidence, and requires staged human approval before execution.
• discovery.md      -> Strategic Consultant. Uses a 3-path brainstorm to validate
                       product ideas and business rules.
• planning.md       -> Alignment & Readiness. Consolidates decisions, maps risks/gaps, and validates readiness
                       before proceeding to implementation.
• investigation.md  -> Context Pre-Orchestrator. Performs deep repository analysis
                       (no-code analysis) before proposing changes.
• context.md        -> Context Assimilator. Reads and memorizes code flows and dependencies in absolute silence.
• init.md            -> Project Init Investigator. Answers focused project questions from codebase evidence with concise technical responses, without modifying files or routing to boosters automatically.
• obsidian.md        -> Obsidian Memory. Uses MCP to classify context, search canonical project notes, and create or update fixed Markdown memories only after explicit approval.
• advisor.md         -> Kit Consultant (GPS). Helps you choose the right booster to use.

---

[ 🐞 FIX & QUALITY ]

• debug.md          -> Root Cause Analysis. Uses a hypothesis engine to systematically investigate bugs.
• diff-review.md    -> Diff Review. Analisa o diff como um dev sênior revisando PR — naming, padrões do projeto, complexidade e boas práticas.
• code-audit.md     -> Code Audit. Strict inspector for syntax, typing,
                       and diagnostics (React Doctor) pre-PR.
• testing.md        -> Test Strategist. Defines coverage strategy (Unit, E2E)
                       and coordinates execution.
• changelog.md      -> History Generator. Creates structured release notes and organizes
                       the change history.
• audit.md          -> Audit. Makes terminal lint and typecheck operational, checks bypasses,
                       diagnoses coverage/setup issues, and separates safe fixes from deep review.
• architecture-audit.md
                    -> Architecture Audit. Audits codebase structure, duplication, naming,
                       responsibility, and dependencies while preserving project conventions.
• check-build.md    -> Check Build. Clean cache + node_modules, fresh install, lint, typecheck,
                       build, and optional tests. Simple pre-merge sanity gate. If complex errors, recommends audit.md.

---

[ 🎨 SPECIALTIES & STACK ]

• frontend.md       -> Frontend Expert. Activates rules for Next.js, React, and UI/UX.
• backend.md        -> Backend Expert. Focused on APIs, tRPC, Databases, and Server.
• design.md         -> UI/UX Audit. Verifies if components are following
                       premium standards and accessibility.
• design-engineer.md -> Design Engineer. Consults the technical solution roadmap to discover
                       components, animation, visual, frontend, and prototyping solutions, then verifies official documentation.
• motion.md          -> Motion. Brings finished routes to life with additive animation only —
                       entrance, hover, scroll reveal, and background motion, with library
                       discovery (user veto) and zero structural change.
• ui-ux-pro-max.md  -> Premium Design Intelligence. 50+ styles, 97 color palettes, 57 font pairings,
                       and 99 UX guidelines for complete design system generation.
• seo.md            -> SEO Guardian. Validates semantic HTML and metatags for indexing.
• mobile.md         -> Mobile Master. Activates patterns for React Native, Expo, and touch UX.
• save-reference.md -> Visual Cataloger. Receives a screenshot, categorizes it into the UX reference library,
                       saves the image to the correct folder, and updates the category index.
• stack-refresh.md  -> Stack Refresh. Audits runtime, framework, and dependency drift,
                       separates security risk from modernization debt, and proposes phased upgrade waves.

---

[ 🛡️ SECURITY & DEPLOY ]

• security.md       -> Security Audit. Analyzes vulnerabilities, secret leaks,
                       and threat modeling.
• deploy.md         -> Release Protocol. Runs "pre-flight checks" to ensure
                       the code is ready for production.

---

💡 HOW TO USE NOW:
Boosters now work as manual modes of the Dev Booster.
In most cases, activation DOES NOT execute everything immediately.

Standard flow:
1. Activate the Booster by name.
2. The Booster enters the correct mode.
3. Then send the task, idea, context, artifact, or real objective.
4. Only then will it load what is necessary and continue.

Activation examples:
- Drag `.devbooster/boosters/frontend.md` into the chat and send.
- Drag `.devbooster/boosters/discovery.md` into the chat and send.
- Drag `.devbooster/boosters/auto-triage.md` into the chat and send.
- Drag `.devbooster/boosters/advisor.md` into the chat and send.

Behavioral patterns:
- `auto-triage.md` is the recommended deep-triage entry point for ambiguous, high-risk, or cross-cutting work. It stays armed until the real demand, builds a shared investigation artifact, requires Plan + Review approval, and requires separate approval before execution.
- Domain boosters, such as frontend, backend, testing, and performance:
  activate quickly, enter armed mode, and load context only after the first real pain point.
- Synthesis boosters, such as documentation and planning:
  summarize the current context and ask for confirmation before proceeding.
- Artifact input boosters, such as review:
  ask for documentation, implementation, file, or reference before loading the rest.
- Operational boosters, such as changelog:
  use the actual Git state as the primary source and ask only minimal questions.

Practical examples:
- Drag `.devbooster/boosters/planning.md` into the chat and send.
- Drag `.devbooster/boosters/global-documentation.md` into the chat and send.
- Drag `.devbooster/boosters/internal-documentation.md` into the chat and send.
- Drag `.devbooster/boosters/changelog.md` into the chat and send.
- Drag `.devbooster/boosters/review.md` into the chat and send.

After activation, send the next step normally.
Example:
"[planning.md file sent in chat]"
"Now I want to validate if we have established enough context to move to implementation."

---

## 📚 KNOWLEDGE BASE

Dev Booster ships with a curated knowledge base at `.devbooster/hub/knowledge/`.
It contains field-validated patterns, migration guides, and technical decisions
organized by stack. Every article links to official documentation.

When a booster encounters a concrete technical finding or non-trivial decision, it
may consult this base selectively:
`index.md` → matching article → relevant section only → linked official source
→ reconcile with the actual project context.

Articles available:
- react-patterns, nextjs-pitfalls, typescript-patterns
- tanstack-patterns, trpc-patterns, testing-patterns
- tailwind-shadcn-patterns, vite-patterns, eslint-migration
- dependency-guide, upgrade-fallout, migration-guides
- nodejs-patterns, package-manager-patterns, monorepo-patterns
- prisma-postgresql-patterns, nestjs-patterns, angular-patterns

The base is read-only. Only project maintainers may update it.
Boosters never create, modify, or maintain files in the knowledge base.

---

💡 INSTANT ROUTING (SHORTCUT TRIGGERS):
Instead of dragging booster files, you can instantly activate any booster behavior contract
by typing its corresponding trigger in the chat (e.g., @Context, @Coder, @Builder, @Planning).
Refer to `.devbooster/rules/TRIGGERS.md` for the complete trigger dictionary.

---

💡 HOW TO UPDATE THE KIT:
If this project already has Dev Booster installed and you want to receive a newer version of the kit,
use in the terminal:

`npx dev-booster --update`

The update:
- updates `.devbooster/boosters/`
- updates `.devbooster/hub/`
- preserves `.devbooster/rules/`
- preserves `DEVBOOSTER_INIT.md`

This ensures that local project rules and adjustments remain safe.
```
