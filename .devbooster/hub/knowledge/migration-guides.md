# 🚚 Migration Guides

> **Purpose:** Migration guides for specific libraries with breaking changes observed in real projects
> **Primary official sources:** [react-to-print repository](https://github.com/MatthewHerbst/react-to-print) · [React documentation](https://react.dev/) · [Radix UI documentation](https://www.radix-ui.com/) · [shadcn/ui documentation](https://ui.shadcn.com/docs)

## Project Convention Decision Rule

Before applying this guidance, verify the installed versions, local rules, existing abstractions, configuration, and tests. Preserve a valid established project convention; do not replace it only because another documented approach is also valid. Use official sources to verify API behavior, compatibility, constraints, and migrations. Recommend a change only when the developer requests it or evidence shows the current approach is incompatible, unsafe, deprecated, broken, or responsible for a verified issue.

---

## Index

1. [react-to-print v2 → v3](#react-to-print-v2--v3)
2. [Formik + React 19 — HTML Form Types](#formik--react-19)
3. [Radix UI — Meta-package vs Individual Packages](#radix-ui-meta-package)
4. [shadcn/ui — Missing Dependencies](#shadcn-ui-missing-dependencies)

---

## react-to-print v2 → v3

### Problem
The `useReactToPrint` API changed significantly from v2 to v3. The `content` option was renamed to `contentRef` and now receives a ref object rather than a callback.

### Code (symptom)
```tsx
// BEFORE (v2)
useReactToPrint({ content: () => ref.current })

// AFTER (v3)
useReactToPrint({ contentRef: ref })
```

### Expected type error
```
'content' does not exist in type 'UseReactToPrintOptions'
```

### Fix
```tsx
const contentRef = useRef<HTMLDivElement>(null)
const print = useReactToPrint({ contentRef })

// Attach contentRef to the element to print, then call print from the print trigger.
```

### Scope
The documented v3 breaking change is the rename and type change from `content` to `contentRef`. Review the v3 migration notes for its other breaking changes.

---

## Formik + React 19

### Problem
React 19 form type errors can result from misaligned `react`, `react-dom`, and `@types/react` versions, including duplicate React type packages. Do not assume that a Formik version alone is the cause.

### Type error
```
Type '{ children: Element; }' is missing the following properties from type
'Pick<DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, ...>':
placeholder, onPointerEnterCapture, onPointerLeaveCapture
```

### Check first
1. Align the installed `react`, `react-dom`, `@types/react`, and `@types/react-dom` versions.
2. Inspect the lockfile and dependency tree for duplicate or incompatible React type packages.
3. Re-run type checking before changing form markup.

### Native form fallback
Use a native `<form>` only when type alignment does not resolve the issue, and preserve the semantics provided by Formik's `<Form>`:

```tsx
<form
  onReset={formik.handleReset}
  onSubmit={formik.handleSubmit}
  {...formProps}
>
  {children}
</form>
```

Preserve any required forwarded props and refs. `noValidate` is a standard HTML form attribute and can be passed directly when needed.

---

## Radix UI Meta-package

### Problem
A component can import either the unified `radix-ui` package or an individual `@radix-ui/react-*` package. The required installation depends on the actual import specifier in the component source.

### Symptom
```
Cannot find module 'radix-ui'
```

### Choose the matching package
```bash
# Source imports from "radix-ui"
yarn add radix-ui

# Source imports from "@radix-ui/react-dialog"
yarn add @radix-ui/react-dialog
```

### Migration
For existing shadcn/ui components that use individual Radix imports, use the documented Radix migration to rewrite imports before removing individual packages. Do not add the unified package solely because another component uses a different import style.

---

## shadcn/ui — Missing Dependencies

### Problem
The standard shadcn CLI installs the dependencies required by the component it adds. Manually copied components, custom registries, or incomplete installs may still reference packages that are absent.

### Component-specific patterns
- `class-variance-authority` — only when the component calls `cva()`
- `tailwind-merge` — only when the project utility imports it
- `lucide-react` — only when the component imports Lucide icons
- `tailwindcss-animate` — legacy Tailwind v3 animation plugin
- `tw-animate-css` — Tailwind v4 animation package

### Fix
Inspect the component imports and registry metadata, then install only the missing direct dependency. For animations, match the package to the Tailwind version:

```bash
# Tailwind v3
yarn add -D tailwindcss-animate

# Tailwind v4
yarn add -D tw-animate-css
```

### Missing dependency symptom
```
Cannot find module 'class-variance-authority'
```
