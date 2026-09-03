---
name: design-hardening
description: Make an existing UI survive real-world inputs and conditions. Use when hardening forms, checkouts, or flows against text overflow, error states, i18n/RTL, empty and loading states, edge cases, permissions, and accessibility failures. Load when the task is robustness and resilience of a shipped or near-shipped interface.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
---

# Design Hardening

> Designs that only work with perfect data aren't production-ready.

## 0. When to load (lazy-load contract)

Load only when the task is about making an existing interface resilient — never for styling or building new surfaces:

- text overflow / truncation / wrapping fixes
- error handling, form validation, permission and rate-limit states
- i18n / RTL / localization expansion / dates, numbers, plurals
- empty states, loading states, long datasets, concurrent operations
- graceful degradation and accessibility resilience

Do NOT load for: aesthetic refinement (use `design-refinement`), new builds (use `frontend-design`), or motion work (use `motion-design`).

## 1. Hardening dimensions

### Text overflow & wrapping
- Single line: `overflow: hidden; text-overflow: ellipsis; white-space: nowrap`.
- Multi-line: `-webkit-line-clamp` (or the `line-clamp` utility).
- Allow wrapping: `overflow-wrap: break-word; hyphens: auto`.
- Flex/grid: `min-width: 0` on flex items and `min-height: 0` on grid items so they can shrink below their content size.
- Use `clamp()` for fluid type; body floor 16px (14px only for genuinely secondary text — iOS force-zooms focused inputs under 16px).
- Test at 200% zoom; containers must expand with the text.

### Internationalization
- Budget 30–40% expansion for translations (German is typically +30%).
- Avoid fixed widths on text containers; let flex/grid adapt to content.
- RTL: use logical properties (`margin-inline-start`, `padding-inline`, `border-inline-end`) instead of physical ones.
- Format dates, numbers, and currency with `Intl.*` — never hand-rolled.
- Pluralize with an i18n library (or `Intl.PluralRules`), never string concatenation.
- UTF-8 everywhere; test CJK and emoji.

### Error handling
- An actionable error answers: what failed → why (when known and useful) → how to recover.
- Map status codes: 400 validation, 401 login, 403 permission, 404 not-found, 429 rate limit, 500 generic + support path.
- Form validation: inline errors near the field, specific messages, preserve user input, don't block submission unnecessarily.
- Network failures: clear message + retry; offer offline behavior where applicable.
- Never trust client-side validation alone — validate and sanitize on the server.
- Never block the entire interface when one component errors (error boundaries / isolation).

### Empty states
Distinguish the five types and give each a next action:
- First use → emphasize value, offer template or example
- User cleared → light touch, easy to recreate
- No results → suggest a different query / clear filters
- No permissions → explain why and how to get access
- Error → what happened + retry

Every empty state needs: what will be here, why it matters, how to start.

### Loading states
- <1s: no indicator. 1–3s: spinner or simple animation. 3s+: progress bar or skeleton. Unknown: indeterminate.
- Skeleton screens show the layout shape immediately (reduce perceived wait).
- Progress text names the real operation and sets an honest expectation; never invent progress.
- Prevent double-submission: disable while loading; optimistic updates with rollback.

### Edge cases
- Extreme inputs: very long text, single characters, emoji/RTL, huge numbers, 1000+ list items, no data.
- Large datasets: pagination or virtual scrolling; search/filter; don't load everything at once.
- Concurrency: race conditions, repeated rapid clicks, conflict resolution.
- Permissions: read-only, denied, partial access — with explanation.
- Graceful degradation: core function works without JavaScript; images have alt text; feature detection, not browser detection.

### Accessibility resilience
- Everything operable by keyboard; logical tab order; focus management in modals; skip links.
- Screen-reader names aligned with visible labels; announce dynamic changes (live regions).
- Don't rely on color alone: add icon/text/shape cues; test high-contrast mode.
- Respect `prefers-reduced-motion` for anything animated.

## 2. Testing strategies

- Manual: extreme inputs, 200% zoom, throttled/offline network, keyboard-only, screen reader, RTL/CJK content, repeated rapid submission.
- Automated: unit tests for edge cases, integration for error scenarios, E2E for critical paths, visual regression, accessibility scans (axe/WAVE).

## 3. Verify

- Long names (100+ chars), emoji in every accepted text field, RTL and CJK content, offline and throttled, 1000+ items, rapid double-submit, every API error state, fully-empty data.
- No text clipped, no layout break at any supported viewport, no state left without a next action.

## ARTIFACT POLICY

- No artifacts by default. Save a hardening report to `@booster-generated/harden/<slug>.md` only if the user explicitly asks.
- Never create or update artifacts silently.
