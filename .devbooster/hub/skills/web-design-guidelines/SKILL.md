---
name: web-design-guidelines
description: Review UI code for Web Interface Guidelines compliance. Use when asked to "review my UI", "check accessibility", "audit design", "review UX", or "check my site against best practices".
metadata:
  author: vercel
  version: "1.0.0"
  argument-hint: <file-or-pattern>
---

# Web Interface Guidelines

Review files for compliance with Web Interface Guidelines.

## How It Works

1. Fetch the latest guidelines from the source URL below
2. Read the specified files (or prompt user for files/pattern)
3. Check against all rules in the fetched guidelines
4. Output findings in the terse `file:line` format

## Guidelines Source

Fetch fresh guidelines before each review:

```
https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md
```

Use WebFetch to retrieve the latest rules. The fetched content contains all the rules and output format instructions.

## Usage

When a user provides a file or pattern argument:

1. Fetch guidelines from the source URL above
2. Read the specified files
3. Apply all rules from the fetched guidelines
4. Output findings using the format specified in the guidelines

If no files specified, ask the user which files to review.

---

## Local Verification Checklist (offline fallback)

If the guidelines URL cannot be fetched (no network), or as a quick pre-check before the fetch, verify these locally:

### Accessibility

- [ ] Images have meaningful alt text; decorative icons are `aria-hidden` with a labeled alternative nearby
- [ ] Focus is visible on all interactive elements; tab order is logical
- [ ] Color alone never carries meaning — icons/text/shape also signal state
- [ ] Text contrast ≥ 4.5:1 (body) / ≥ 3:1 (large); no pure `#000`/`#fff` pairs
- [ ] `prefers-reduced-motion` respected
- [ ] Headings form a logical outline (no skipped levels)

### Robustness

- [ ] No content hidden at rest (visible by default, not only on hover/focus)
- [ ] No text clipped/overflowing at supported viewports; containers grow with content
- [ ] No layout break at 375px / 768px / 1024px / 1440px
- [ ] Touch targets ≥ 44px; inputs not cramped
- [ ] Loading, empty, error, success states exist for every data-driven surface
- [ ] No script-error containers — core content degrades cleanly without JS

### Performance & semantics

- [ ] No layout shift from images/fonts (`width`/`height` or `aspect-ratio` set)
- [ ] Only used font weights loaded; fallback stacks metric-compatible
- [ ] Below-the-fold images lazy-loaded; hero image prioritized
- [ ] Semantic HTML: `header`/`nav`/`main`/`footer`/`section`/`article` used appropriately
- [ ] No marquee, pulsing dot, or decorative blink without real-time meaning (AI-motion tells — see `frontend-design/ai-tells.md`)

---

## Division of Labor (who does what)

| Skill                            | Role                                                                                          |
| -------------------------------- | --------------------------------------------------------------------------------------------- |
| **web-design-guidelines** (this) | **Verifies** — audits the implemented UI against guidelines                                   |
| **design-hardening**             | **Implements** — fixes robustness, i18n, error/empty/loading states, accessibility resilience |
| **design-refinement**            | **Changes direction** — polish, typeset, layout, bolder/quieter/distill/clarify               |

Use this to avoid redundant checklists: audits surface findings, hardening implements them, refinement changes direction when the finding is about quality or identity rather than robustness.

---

## Related Skills

| Skill                                              | When to Use                                                                |
| -------------------------------------------------- | -------------------------------------------------------------------------- |
| **[frontend-design](../frontend-design/SKILL.md)** | Before coding - Learn design principles (color, typography, UX psychology) |
| **web-design-guidelines** (this)                   | After coding - Audit for accessibility, performance, and best practices    |

## Design Workflow

```
1. DESIGN   → Read frontend-design principles
2. CODE     → Implement the design
3. AUDIT    → Run web-design-guidelines review ← YOU ARE HERE
4. FIX      → Address findings from audit
```
