# 🎨 Tailwind CSS and shadcn/ui Patterns

> **Purpose:** Diagnose migration, scanning, token, theme, and component-installation problems.
> **Primary official sources:** [Tailwind v4 Upgrade Guide](https://tailwindcss.com/docs/upgrade-guide) · [Tailwind Detecting Classes](https://tailwindcss.com/docs/detecting-classes-in-source-files) · [Tailwind Theme Variables](https://tailwindcss.com/docs/theme) · [shadcn/ui Documentation](https://ui.shadcn.com/docs) · [Radix Primitives](https://www.radix-ui.com/primitives/docs/overview/introduction)

## Project Convention Decision Rule

Before applying this guidance, verify the installed versions, local rules, design tokens, component abstractions, class conventions, configuration, and tests. Preserve a valid established project convention; do not replace it only because another documented approach is also valid. Use official sources to verify API behavior, compatibility, constraints, and migrations. Recommend a change only when the developer requests it or evidence shows the current approach is incompatible, unsafe, deprecated, broken, or responsible for a verified issue.

---

## Table of Contents

1. [Tailwind v3 to v4 Is a Migration Boundary](#tailwind-v3-to-v4-is-a-migration-boundary)
2. [Classes Are Missing from Generated CSS](#classes-are-missing-from-generated-css)
3. [CSS Variables and Utility Tokens Drift](#css-variables-and-utility-tokens-drift)
4. [shadcn/ui Component Dependencies Are Missing](#shadcnui-component-dependencies-are-missing)
5. [Radix Unified and Individual Imports Are Mixed](#radix-unified-and-individual-imports-are-mixed)
6. [Dark Mode or Theme Tokens Do Not Apply](#dark-mode-or-theme-tokens-do-not-apply)
7. [Extend the Existing Design System Before Adding Local Styles](#extend-the-existing-design-system-before-adding-local-styles)

---

## Tailwind v3 to v4 Is a Migration Boundary

### Symptom
A version upgrade leaves utilities ungenerated, configuration ignored, or build integration broken.

### Verify first
Identify the installed major version and the active integration. Tailwind v3 uses a JavaScript configuration and `content` array; Tailwind v4 has a CSS-first configuration model and different installation/migration guidance. Do not apply v4 directives or package setup piecemeal to a v3 build.

### Fix
Follow the official upgrade guide as one migration, including the appropriate PostCSS or Vite integration, import syntax, and source-detection approach. Preserve a working v3 setup until the v4 migration is complete and validated.

*Source: [Tailwind CSS v4.0 Upgrade Guide](https://tailwindcss.com/docs/upgrade-guide)*

---

## Classes Are Missing from Generated CSS

### Symptom
A class appears in source but has no effect in the browser, especially in a component package, monorepo, or dynamically constructed class string.

### Verify first
Confirm the exact class is present as a complete static string in a scanned source file. Tailwind scans source as plain text; it does not infer class names assembled at runtime.

### Fix
For Tailwind v3, include every relevant source path in `content`. For Tailwind v4, use automatic detection where applicable and explicitly register ignored or external sources with `@source` when needed. Map runtime choices to complete class names rather than interpolating fragments.

```tsx
const variants = {
  success: 'bg-green-600 text-white',
  danger: 'bg-red-600 text-white',
}

return <button className={variants[state]} />
```

*Sources: [Tailwind — Content Configuration (v3)](https://v3.tailwindcss.com/docs/content-configuration), [Tailwind — Detecting Classes](https://tailwindcss.com/docs/detecting-classes-in-source-files)*

---

## CSS Variables and Utility Tokens Drift

### Symptom
A semantic utility such as `bg-primary` uses an unexpected color, or a component looks correct in one theme and incorrect in another.

### Verify first
Trace the value from the utility name to its CSS variable and then to the active theme selector. Confirm the variable format matches how the utility consumes it (for example, a raw color value versus channel values used with an alpha placeholder).

### Fix
Define one semantic token contract and use it consistently across base and alternate themes. In Tailwind v4, expose theme values with `@theme` when a utility namespace is required; retain ordinary CSS custom properties for runtime theme switching where appropriate. Avoid duplicating literal colors in component classes when a semantic token exists.

*Sources: [Tailwind — Theme Variables](https://tailwindcss.com/docs/theme), [MDN — Using CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_cascading_variables/Using_CSS_custom_properties)*

---

## shadcn/ui Component Dependencies Are Missing

### Symptom
A copied or added component fails to compile because an import, utility, primitive package, or shared file is absent.

### Verify first
Check the component documentation and generated source, then inspect `components.json` aliases and the installed package manifest. shadcn/ui components are code added to the application, not a single opaque runtime package; a component can rely on utilities, icons, Radix primitives, and other components.

### Fix
Use the CLI command documented for the installed shadcn/ui version to add the component and its declared dependencies. If integrating manually, copy every documented dependency deliberately and preserve imports that match the project’s aliases. Run typecheck after installation; do not remove an apparently unused primitive without tracing transitive component use.

*Sources: [shadcn/ui — CLI](https://ui.shadcn.com/docs/cli), [shadcn/ui — components.json](https://ui.shadcn.com/docs/components-json)*

---

## Radix Unified and Individual Imports Are Mixed

### Symptom
Primitive imports resolve inconsistently, dependency versions duplicate, or generated component code no longer matches installed packages.

### Verify first
Inspect the actual import paths in component source and the package manifest. Radix offers documented package entry points; different installation styles can have different import paths and version constraints.

### Fix
Choose the import style documented for the installed Radix packages and keep generated component imports consistent with it. Do not mechanically rewrite individual `@radix-ui/react-*` imports to a unified package, or the reverse, without verifying the installed API, exports, peer dependencies, and build output.

*Sources: [Radix Primitives — Introduction](https://www.radix-ui.com/primitives/docs/overview/introduction), [Radix Primitives — Releases](https://www.radix-ui.com/primitives/docs/overview/releases)*

---

## Dark Mode or Theme Tokens Do Not Apply

### Symptom
The theme toggle changes state but colors do not change, or only part of the interface switches.

### Verify first
In browser developer tools, verify: (1) the expected class or data attribute is applied to the intended root element, (2) the alternate-theme CSS variables match that selector, and (3) rendered elements use semantic token utilities rather than hard-coded colors.

### Fix
Make the theme selector strategy match the Tailwind configuration or CSS variant strategy. Define the same semantic variable names in every theme, including foreground and border tokens, and ensure portal-rendered content inherits or is covered by the selector. Test the initial theme as well as toggling to detect a flash of incorrect theme.

*Sources: [Tailwind — Dark Mode](https://tailwindcss.com/docs/dark-mode), [Tailwind — Colors](https://tailwindcss.com/docs/colors)*

---

## Validation Checklist

1. Confirm the Tailwind major version before changing configuration or directives.
2. Build CSS and inspect whether a known expected utility is emitted.
3. Verify token values and active theme selectors in browser developer tools.
4. Typecheck after adding a shadcn/ui component to catch missing dependencies and alias failures.
5. Test keyboard interaction and focus behavior for installed Radix-based components.

---

## Extend the Existing Design System Before Adding Local Styles

### Decision
Before creating a one-off component, utility combination, color, radius, or spacing scale, inspect the design tokens, reusable primitives, variants, and nearby comparable UI. A working design system is a project convention, not an obstacle to bypass.

### Verify first
- Reuse an existing component or variant when it serves the same semantic role.
- Prefer semantic token utilities over literal colors when the project defines them.
- Follow the project’s existing class-composition and variant conventions.
- Preserve accessibility behavior, focus handling, and responsive states supplied by an existing primitive.

Create a local style only when the existing system cannot express the requirement without distortion. If a new primitive or token is needed, introduce it deliberately at the same ownership layer as comparable project primitives rather than embedding a private design system in one feature.

*Sources: [Tailwind — Theme Variables](https://tailwindcss.com/docs/theme) · [shadcn/ui — Theming](https://ui.shadcn.com/docs/theming) · [Radix Primitives — Accessibility](https://www.radix-ui.com/primitives/docs/overview/accessibility)*
