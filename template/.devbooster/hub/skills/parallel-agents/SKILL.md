---
name: parallel-agents
description: Multi-agent coordination and sub-agent orchestration. Use when a task spans multiple independent fronts (frontend, backend, tests), multiple independent stages or subtasks, requires multi-perspective validation, or can offload artifact generation to a dedicated sub-agent. Centralizes the five dispatch patterns (battery, council, single delegate, artifact offload, final verification), the activation package standard, return contracts, and safety invariants.
allowed-tools: Read, Write, Edit, Bash, Agent
---

# Parallel Agents — Sub-Agent Orchestration

> Single source of truth for ALL sub-agent dispatch in the Dev Booster kit. Boosters reference this skill with a two-line activation instead of duplicating orchestration rules. The sub-agent starts with zero conversation context by design — the activation package IS its scope.

---

## 1. Activation Contract

This skill does **NOT** self-apply. A booster activates it with exactly two lines:

```
- Load Skill: .devbooster/hub/skills/parallel-agents/SKILL.md
- Sub-agent policy: types [A, D], personas: matching specialist — units execute trusted stages, no auditing
```

The policy line declares:

- **types** — which dispatch patterns the booster may use (`A` / `B` / `C` / `D` / `E`).
- **personas** — what a unit may load: `none` (default — clean unit), `matching specialist` (persona of the unit's domain), or `skill-only` (a specific skill, e.g. `nextjs-react-expert`).
- **restrictions** — auditing allowed?, knowledge base allowed?, serial waves only?, scope boundaries.

The activating booster's own rules always win. If a booster forbids a pattern (e.g. `diff-review.md` forbids councils), this skill never overrides it.

---

## 2. Invariants (the constitution)

1. **Disjoint write scope** — two sub-agents never touch the same files. Conflict → merge units or serialize.
2. **Dependency order preserved** — dependent units never share a battery.
3. **Zero context is the feature** — minimal package; never pass the full conversation.
4. **Main agent never rewrites** sub-agent work — it uses the return summaries. The approved plan is immutable; a battery never changes scope.
5. **Never simulate** — no sub-agent runtime support → isolated passes, no fake multi-agent discussion.
6. **Respect booster policy** — restrictions from the policy line (no audit, no KB, serial waves) are binding.
7. **Mechanical gate** — batteries close with E2 owning the mechanical gates; single-unit flows without E2 close with the main agent running the project gate (`python .devbooster/hub/scripts/checklist.py .`).
8. **Analysis-only final gate** — E1 and E2 only report; corrections are the main agent's job. Verifiers never fix, never improvise scope.
9. **Terminal-only repository search** — never use the internal `Grep` or `Glob` tools for repository searches. All searches and file discovery MUST run through `Bash` in the terminal, with an explicit scope and exclusions where applicable. Known Kit paths may be accessed directly.

---

## 3. Decision Gate — when to dispatch

Dispatch a sub-agent or battery when:

- **≥2 independent fronts** (frontend / backend / tests / db).
- **≥2 independent stages or subtasks** with disjoint write scope.
- **Multi-perspective validation** is required (council).
- **An artifact is generable from information already in hand** (artifact offload).
- **A bounded delegated mission** exists (single delegate).
- **A battery or artifact offload just completed** → final verification (Pattern E) is the mandatory closing gate.

Do **NOT** dispatch when:

- The task is single and small → execute directly.
- Any invariant in Section 2 is violated (shared write scope → merge or serialize; dependency order; runtime without sub-agent support → isolated passes, never simulate; booster forbids it).

---

## 4. Dispatch Patterns

### Pattern A — Battery (parallel execution)

One sub-agent per independent stage or front, dispatched simultaneously.

- **Used by:** execution boosters (`builder`, `forger`, `coder`, `create`, `enhance`) and stage-based plans.
- **Unit granularity:** one stage / one front / one atomic plan.
- **Example:** plan with STAGE backend + STAGE frontend + STAGE tests → 3 sub-agents in parallel.

### Pattern B — Council (multi-perspective validation)

N sub-agents review the **same target** from different angles. Minimum **3** specialized agents (`review.md` precedent).

- Each member receives: target + its specific angle + concerns to audit + what NOT to evaluate.
- **Consolidation:** report table (agent × focus × status) + final verdict.
- **Used by:** `review`, `code-audit`-style validation flows.

### Pattern C — Single Delegate (bounded handoff)

One sub-agent, bounded mission, **mandatory return** (`intel.md` envelope pattern).

- **Used by:** `intel` (one delegate per remediation wave — waves remain serial by design), `auto-triage` (investigation units per booster), `smart-task` (mandatory single Forger unit per atomic plan).
- Never parallelize waves the booster designed as serial.

### Pattern D — Artifact Offload

Main agent dispatches **one sub-agent to write an artifact** from information already available, while the main agent continues working or consolidating.

- **Time gain:** the main agent never serializes on writing; the sub-agent formats/persists while the main proceeds.
- **When it fires (two moments):**
  - **Final (one-shot):** flow completed, main consolidated → D writes the final artifact (save-context YAML, 17-section spec, implementation plan, changelog).
  - **Progressive (mid-flow):** a unit/stage completes and its information is already ready → main dispatches D to write/update that artifact or section WHILE it starts the next unit. Time gain applies here too.
- **Ownership rule:** the activating booster remains the artifact OWNER. D only writes — the booster validates the file, applies the uniqueness rule, and sends the notification (📝).
- **Who writes artifacts:** ONLY the booster (owner) and its D units (offload writers) touch artifact files. Units A/B/C/E never write artifacts — their only output is the return contract.
- **Living-artifact write-scope rule:** never two D units writing the SAME artifact file (invariant #1). For living state files (`intel`/`auto-triage` style): either D units write isolated section files that the main merges, or the main keeps updating the state file itself and D is reserved for large/final artifacts.
- **Used by:** `implementation` (plan artifact), `global-documentation`, `internal-documentation`, `save-context`, `changelog`, `commit` (changelog step), `obsidian` (content preparation only — persistence keeps its MCP approval gate).

### Pattern E — Final Verification (fresh-context closing gate)

Dispatched AFTER the flow completes. Two verifiers run **in parallel**; both are **analysis-only** — they report, the main agent corrects.

**E1 — Manual Semantic Verifier** (the human reviewer)

- Fresh context. Reads the scope anchor (plan + activation packages) and inspects the ACTUAL code state file by file, at the exact edited locations.
- Hunts the four typical sub-agent lies: **fabrication** (invented files/features), **deviation with self-justification** ("I changed it because it would break — tested, works": verify the claim against the package Constraints), **incompleteness** (half-done or faked scope items), **scope creep / broken contracts** (files outside the list; semantic contract breaks lint cannot catch).
- Never falls back on "lint/typecheck will catch it" — mechanical checks are E2's job; E1 is the semantic second pair of eyes.
- **Forbidden:** fixing code, reading the conversation, consulting the executor sub-agents.

**E2 — Mechanical Verifier** (lint / typecheck / tests)

- Runs the project's mechanical gates and reports: prettier → lint → typecheck → tests. Follows `check-build.md` Stage 1 mechanics by reference — do NOT duplicate them.
- **Baseline rule:** if the repo is already unhealthy (pre-existing failures), E2 BYPASSES the noise — records the baseline state and reports only what the new work introduced.
- **Forbidden:** fixing code; complex fixes (same boundary as `check-build.md`).

Both verifiers RETURN their findings in their response — a verification report is a return, NOT a written artifact. The main agent reads it directly, applies corrections (re-dispatching units with new packages when needed), and re-runs the gate on material changes.

---

## 5. Battery Protocol (phases)

```
1. DECOMPOSE   → split into independent units (dependency graph + write-scope check)
2. PACKAGE     → build one activation package per unit (Section 6)
3. DISPATCH    → parallel when supported; isolated serial passes otherwise
4. COLLECT     → gather returns (Section 7 — return contract)
5. CONSOLIDATE → integrate summaries; report status table; never rewrite
                 sub-agent work (mechanical gate is E2's job in phase 6)
6. VERIFY      → dispatch FINAL VERIFICATION (Pattern E) in parallel:
                 E1 manual semantic verifier + E2 mechanical verifier
                 (lint/typecheck/tests); both analysis-only
7. CORRECT     → max 2 re-dispatch loops; every re-dispatch needs a NEW
                 package (anchor updated with what failed). After round 2
                 without closing: the unit returns its final form
                 (status: blocked, blockers = the reason, rest N/A — the
                 sparse form IS the failure report) and the main ESCALATES
                 to the developer with the form + the 2-round history.
                 No infinite loop, no extra report.
```

---

## 6. Activation Package Standard

**General rules:**

- The package is the sub-agent's TOTAL scope. The sub-agent must NOT read the conversation history.
- **Mandatory bootstrap:** before acting, every sub-agent reads `.devbooster/rules/PROTOCOL.md` directly from the opened project root. This required bootstrap is the sole exception to the package file list.
- The local Dev Booster may be hidden and Gitignored. This never means it is absent: access known `.devbooster/...` paths directly from the project root instead of relying on a shallow search. If a required path is not found, verify it via terminal from the project root (`find .devbooster -maxdepth 5 -print -exec ls -ld {} \;`) before concluding it is missing — IDE/file-tree searches hide dotfiles and Gitignored paths. Do not improvise or continue without a required kit resource merely because it was not returned by a superficial search.
- If the sub-agent needs more context, it asks or reads ONLY the files listed in the package.
- The package is written in deterministic, machine-oriented language: imperative commands only (`Create`, `Update`, `Add`, `Replace`, `Remove`); vague terms banned (`adjust`, `handle`, `improve`, `refactor`); zero ambiguity.
- **If the source already contains an atomic instruction** (`atomic.md` output, `smart-task` plan, template `EXECUTION PROMPTS PER STAGE`), the package WRAPS it — never rewrites it. `atomic.md` is the format authority for execution bodies.
- **Unit identity — smallest-asset rule.** Default: the unit is a clean fresh agent with the package ONLY. When the policy enables `personas: matching specialist` or `skill-only`, the main agent loads the SMALLEST asset that covers the unit's need: conventions distilled into the package (small task) → one specific skill (medium task) → the matching specialist persona (large/complex task). Never jump straight to the largest asset; small tasks never load personas.

**Persistence rule:** Pattern A and D packages become physical files at `@booster-generated/sub-agents/<unit>-activation.md` (traceability, auditability, re-dispatch). Pattern B and C use a compact inline envelope.

### Package A — Execution (envelope + atomic body)

```md
# UNIT-<id> — <stage/front name>

ENVELOPE

- unit_id:
- stage/front:
- context anchor: [distilled decisions, contracts, business rules — NOT the conversation]
- return contract: [Section 7]
- source: [plan path / atomic plan reference]

BODY (atomic.md structure — the format authority)

- Objective
- Scope
  - Included
  - NOT included
- Files involved (exact paths only)
- Implementation instructions (imperative only)
- Constraints
- Validation
  - What MUST be true after completion
  - What MUST NOT be broken
  - How to validate
```

### Package B — Council

```md
- target: [original request + plan + audit script results]
- angle: [the member's specialty]
- concerns to audit: [specific list]
- out of scope: [what this member must NOT evaluate]
```

### Package C — Delegate (handoff envelope)

```md
- orchestrator:
- delegated_booster:
- delegated_wave:
- objective: [bounded]
- max_stage:
- allow_major_updates: false
- allow_risky_changes: false
- return_to:
- return_after: [wave_completed | blocker_found | needs_decision]
```

### Package D — Artifact

```md
- artifact type + template: [e.g. 17-section spec / YAML snapshot / changelog]
- sources/references: [files, maps, paths]
- key decisions: [distilled, NOT the conversation]
- exact output path:
- mandatory format: [structure the artifact MUST follow]
```

### Package E — Final Verification

```md
# VERIFY-<id> — Final verification of the flow

E1 — MANUAL SEMANTIC VERIFIER

- scope anchor: [plan + activation packages of the flow]
- expected outcomes: [Validation section of each package]
- files to inspect: [files touched, from return contracts]
- mandate: scope vs. real code, line by line — fabrication,
  deviation, incompleteness, scope creep, broken contracts
- forbidden: fixing · reading the conversation · consulting executors

E2 — MECHANICAL VERIFIER (parallel)

- gate: [prettier → lint → typecheck → tests — check-build.md mechanics]
- baseline rule: unhealthy baseline → bypass noise, record state
- forbidden: fixing · complex fixes

**Shared return (response only — never a written file):** per-unit table (OK / issue + evidence) + verdict
```

---

## 7. Return Contract (all patterns)

Every sub-agent MUST return its result as a **FIXED FORM** — a structured output contract, independent of the task. The main agent never parses free text: it reads the same form from every unit. Fields that do not apply are filled with `N/A` — never omitted, never padded.

```md
## RETURN — <unit_id>

- status: complete | blocked | needs_decision
- objective: [restate the unit objective in 1 line]
- files touched: [exact paths, one per line] | N/A
- done: [bullets of what was implemented per scope item — NO code]
- deviations: [anything changed vs. package constraints + why] | none
- blockers: [only when blocked / needs_decision] | N/A
- risks: [what the main agent must know] | none
```

Rules:

- **No code in the form** — the return is metadata; the work lives in the files listed.
- **Never omit a field** — `N/A` or `none` when it does not apply.
- Never continue beyond the package scope; never return the full conversation; on `blocked` or `needs_decision`, stop and return — do not improvise.
- **The form IS the context ceiling** — it replaces free-form summaries; no additional report or artifact.

**Final verifiers (E) return a verification report instead of the unit form:** per-unit table (unit → `OK` / `issue` + evidence) + overall verdict (`approved` | `issues-found`). Every finding MUST cite file + location vs. the scope item it contradicts — no evidence, no finding.

---

## 8. Booster Activation Map (reference)

| Booster                  | Types | Policy notes                                                                          |
| ------------------------ | ----- | ------------------------------------------------------------------------------------- |
| `builder`                | A     | Units execute approved stages; no auditing; personas: matching specialist             |
| `forger`                 | A     | Units forge trusted atomic plans; no audit, no KB; personas: none                     |
| `coder`                  | A     | Units execute approved design fronts; personas: matching specialist                   |
| `create`                 | A     | Units per scaffold layer; only after PLAN.md verified; personas: matching specialist  |
| `enhance`                | A     | Units per independent feature layer; personas: matching specialist                    |
| `review`                 | B     | Council, minimum 3 members                                                            |
| `auto-triage`            | C     | Investigation units per booster; council delegated to review                          |
| `smart-task`             | C     | MANDATORY single Forger unit per atomic plan; clean context — execution never in chat |
| `intel`                  | C     | One delegate per wave; waves serial                                                   |
| `implementation`         | D     | Plan artifact offload                                                                 |
| `planning`               | C     | Optional; only multi-stack risk verification                                          |
| `global-documentation`   | D     | 17-section spec offload                                                               |
| `internal-documentation` | D     | Doc + file maps offload                                                               |
| `save-context`           | D     | YAML snapshot offload                                                                 |
| `changelog` / `commit`   | D     | Changelog offload                                                                     |
| `obsidian`               | D     | Content prep only; MCP approval gate kept                                             |

**Pattern E** is enabled for all `A` and `D` boosters: mandatory after batteries (≥2 units) and artifact offloads; optional for single-unit simple flows. `B` (council) and `C` (delegate) already carry their own validation loops.

**Not applicable (by design):** `diff-review` (forbids councils), `refactor` (interdependent changes), `atomic` (generator, not orchestrator), `audit`/`code-audit` (delegatees), domain specialists (`frontend`, `backend`, `testing`, `design`, `seo`, `i18n`, `accessibility`, `performance`, `mobile`) — they are the UNITS of a battery, not orchestrators; serial analysis/ops boosters (`debug`, `discovery`, `investigation`, `context`, `init`, `advisor`, `deploy`, `check-build`, `stack-refresh`, `security`).
