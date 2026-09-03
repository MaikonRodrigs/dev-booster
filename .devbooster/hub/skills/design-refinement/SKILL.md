---
name: design-refinement
description: Refine an existing UI/UX without redesigning it. Use when polishing, fixing typography/layout/spacing, amplifying a flat design (bolder), toning down a loud design (quieter), stripping complexity (distill), or clarifying interface copy. Preserves the incumbent visual world; never concealed redesign.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
---

# Design Refinement

> Refinement preserves; redesign replaces.
> Every "improve this" request on existing UI is a refinement unless the user asks for a new visual world.

## 0. When to load (lazy-load contract)

Load this skill only when the task targets an **existing surface** and asks to change its quality or direction — never for building something new:

- polish / final pass / ship-ready / consistency cleanup
- typography (typeset), layout, spacing, visual rhythm
- bolder (amplify), quieter (tone down), distill (strip complexity)
- clarify (UX copy, labels, error messages)

Do NOT load for: new surfaces (use `frontend-design` + `ux-references`), visual-world replacement, or feature building (use `enhance`).

## 1. Core contract

1. **Refinement preserves.** Keep the incumbent identity, behavior, copy, and everything outside scope. Refinement is never concealed redesign. If the concept itself is wrong, say so and recommend a redesign instead of smuggling one in.
2. **Scope is sovereign.** "Everything else stays" is a literal instruction. Touch only the named target: no new colors, fonts, radii, shadows, or system primitives the surface does not already own. If the existing system genuinely cannot express the direction, stop and ask before expanding it.
3. **Evidence before edits.** Inspect the rendered experience and the real interaction path (desktop and mobile), not only the code. A detector/lint result is defect evidence, not proof of quality.

## 2. Assess first

Before editing, classify each drift:

| Finding                | Meaning                                              | Fix level              |
| ---------------------- | ---------------------------------------------------- | ---------------------- |
| Missing token          | The system needs a reusable value                    | Add the token          |
| One-off implementation | A shared component/pattern should replace it         | Swap to the shared one |
| Conceptual mismatch    | Flow, IA, or hierarchy differs from comparable areas | Fix at the flow level  |
| Local defect           | Implementation is incomplete or inconsistent         | Fix in place           |

Then pick **ONE direction** below. Mixing directions mid-task is the #1 failure mode.

### Severity triage

Score each finding before fixing, so polish effort lands where it matters:

| Severity | Definition                                            | Response                   |
| -------- | ----------------------------------------------------- | -------------------------- |
| **P0**   | Broken, blocked, inaccessible, or data-losing         | Fix immediately, alone     |
| **P1**   | Visible inconsistency, wrong hierarchy, missing state | Fix in this pass           |
| **P2**   | Cosmetic/optional improvement                         | Note it; fix only if cheap |

Assess across five dimensions and let the weakest drive the pass: layout/structure, typography, color, motion, and interaction states. A screen that scores P0 in any dimension is not "almost ready" — the pass starts there.

## 3. Direction playbooks

### Polish — bring the whole path to one quality bar

- Triage in order: broken/blocked/inaccessible → missing states (loading, empty, error, success, disabled, permission) → flow/hierarchy/system drift → visual and motion inconsistencies → code and asset cleanup.
- Group related content tightly and separate distinct groups generously; align to the grid (optical and mathematical).
- Verify every supported viewport, not just the current screenshot.
- Every control needs default / hover / focus / active / disabled / loading / error / success behavior.
- Remove debug output, dead code, unused imports, obsolete styles. Promote genuinely reusable values to tokens; never create a system abstraction for one local exception.

### Typeset — typography inside the established world

- Establish roles (heading / body / label / metadata / data) distinguishable at a glance; combine size + weight + space + tone, never size alone.
- Body floor 1rem/16px; prose in the 45–75ch measure; tune line height to the face and measure (inversely with width).
- Compensate light text on dark surfaces: slightly more line height, a touch more tracking, one step more weight.
- Load only used font assets; provide metric-compatible fallbacks; avoid invisible text and disruptive reflow.
- Preserve zoom, user font settings, and text scaling. Keep repeated roles identical across screens and states.
- Do not introduce a second family without a clear role it alone can perform.

### Layout — structure before boxes

- Squint test: with detail blurred, can you still see primary → secondary → major groups in order?
- Group by meaning; use proximity before adding containers. Rhythm = deliberate contrast between tight and generous intervals.
- Use a documented spacing scale (a 4-unit base covers the middle steps an 8-only scale misses).
- Make responsive behavior structural: reorder, collapse, or reflow based on what stays important.
- Keep keyboard, touch, and assistive-technology order agreeing with the visual order; touch targets usable even when their visible marks are small.
- Use depth only when it clarifies state or hierarchy.

### Bolder — amplify, don't decorate

- The reflex answer (reaching for more effects) is the opposite of bold. Reject it first.
- A flat section usually opted out of the system's own strongest moves: bring the target up to the expressive level its neighbors already reach, in the system's own vocabulary.
- Commit, then clarify: one decisive move, everything around it quieter. If every element got louder, the section got flatter.
- Skeleton test: strip the copy — does the bare structure still say what this section is and why it matters? If it only works with words, the boldness is in text size, not design.
- No new color, font, or system primitive without being asked.

### Quieter — reduce intensity without going generic

- Identify intensity sources: color saturation, contrast extremes, competing visual weight, animation excess, decoration, uniform scale.
- Reduce per dimension, don't flatten: fewer saturated colors, weight 900→600, whitespace up, borders thinner or removed, motion shorter (10–20px) and gentler (ease-out-quart, never bounce/elastic).
- Never: everything the same size/weight, grayscale, personality removal, or unclear functional affordances.
- Quiet without intent collapses to generic. Restraint is precision.

### Distill — strip to essence

- Find the ONE primary user goal; the 20% that delivers 80% of the value.
- Remove what does not earn its place: redundant elements, repeated information, decorative noise, cosmetic complexity, unnecessary containers (never nest cards inside cards).
- Progressive disclosure over showing everything; one primary action, few secondary, everything else tertiary or hidden.
- Keep content honest: shorter copy, active voice, say it once. Preserve functionality, accessibility, and decision-critical information.
- Perfection is achieved not when there is nothing more to add, but when there is nothing left to take away.

### Clarify — UX copy

- Set the message hierarchy per state: the one fact the user needs now → the next action → supporting context → tone.
- Say each idea once. If the heading already explains the state, the intro must add new information or disappear.
- Actionable errors answer: what failed → why (when known and useful) → how to recover. Never expose internal codes as the primary message.
- Forms: persistent labels (placeholders are examples), requirements before submission, validation that says what to fix without blaming the user.
- Empty states distinguish first use / no results / filters / permissions / failure, and always provide the next useful action.
- Keep terminology consistent; preserve factual meaning, product terms, and brand voice. Ask before changing claims.

## 4. Verify

- Walk the full path again: mouse, keyboard, touch.
- States: loading, empty, error, success, disabled, long-content, missing-content.
- Zoom, contrast, focus, semantics, screen-reader names.
- Console errors, layout shift, interaction latency.
- No unexplained lint/detector findings — a clean scan is a floor, not proof of quality.
- Finish with a source diff: no accidental churn, orphaned code, redundant values, or temporary artifacts.

## ARTIFACT POLICY

- No artifacts by default. Save a summary to `@booster-generated/refine/<slug>.md` only if the user explicitly asks.
- Never create or update artifacts silently.
