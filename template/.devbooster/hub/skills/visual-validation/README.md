# Visual Validation

Use this skill for screenshot review, design-to-code comparison, prototype interpretation, and final UI polish.

## Evidence order

1. Actual running interface at representative viewport sizes.
2. Existing project tokens, components, and responsive rules.
3. Figma, Framer, Penpot, screenshot, or prototype supplied by the user.
4. Curated references from `.devbooster/hub/ux-references/` and the official sources in the tool catalog.

A visual reference informs direction; it does not override the product's content, accessibility, runtime constraints, or design system.

## Validation checklist

- Information hierarchy and primary action are immediately clear.
- Typography, line length, spacing rhythm, and alignment are intentional.
- Responsive layouts work at narrow, medium, and wide widths.
- Hover, focus-visible, active, disabled, loading, empty, error, and success states exist where relevant.
- Contrast and keyboard navigation are valid.
- `prefers-reduced-motion` is respected.
- Images, SVGs, and fonts load without avoidable layout shift.
- Motion and visual effects do not create unnecessary CPU/GPU or bundle cost.
- Differences from the reference are explained by product or technical constraints.

## Documentation verification

If a specific library appears in the design or implementation, read the matching local skill and its current official documentation before reporting a mismatch or proposing a fix. Record only the relevant decision and validation evidence; do not paste third-party documentation into the project.
