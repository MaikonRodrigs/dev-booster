# UI Design Skill — Anti-Generic Guide
### For Next.js + Tailwind CSS + shadcn/ui

> Read this document **before** writing any UI component.
> This is not a list of optional rules. It is the visual contract of the project.

---

## 1. The problem you are being hired to avoid

Language models trained on public code have learned from thousands of projects that use the same templates: Tailwind UI, shadcn/ui boilerplates, v0.dev outputs. The result is a "statistical average" of what exists — and this average has a highly recognizable face:

- A 3-column grid with identical cards
- Icon + title + gray paragraph repeated N times
- `border rounded-lg p-6 shadow-sm` on absolutely everything
- Typographic hierarchy: `text-2xl font-bold` → `text-sm text-muted-foreground` without variation
- Palette: white, gray-100, gray-800, and one generic accent color
- Font: Inter. Always Inter.

**Interfaces generated like this are correct. They work. And they are completely invisible.**

---

## 2. Before writing a single line of code

Answer these questions mentally:

1. **What is the information hierarchy?** What does the user need to see *first*? What is secondary? What can fade away?
2. **What is the emotional tone?** Technical/precise? Warm/human? Urgent? Contemplative?
3. **What breaks the pattern here?** An unexpected typographic size, a color outside the grid, an element that is not contained inside a card.
4. **Where is the visual tension?** Contrast in weight, scale, color, or space that creates a reading direction.

If you cannot answer these questions, **do not start coding**. Go back to the context of the component.

---

## 3. Prohibited patterns

### 3.1 Layout

❌ **Uniform grid of cards with the same visual weight**
```tsx
// PROHIBITED — all cards look identical, zero hierarchy
<div className="grid grid-cols-3 gap-6">
  <Card>...</Card>
  <Card>...</Card>
  <Card>...</Card>
</div>
```

✅ **Explicit hierarchy — one element dominates**
```tsx
// One main item (large), other secondary ones (smaller)
<div className="grid grid-cols-3 gap-6">
  <div className="col-span-2 row-span-2">...</div> {/* visual anchor */}
  <Card className="...">...</Card>
  <Card className="...">...</Card>
</div>
```

---

❌ **Card inside a Card inside a Card**
```tsx
// PROHIBITED — nested boxes without a valid purpose
<Card>
  <CardContent>
    <Card> {/* why? */}
      <Card> {/* seriously? */}
```

✅ **Use visual separation without containers**
```tsx
// Divide using space, typography, or borders — not with more boxes
<div className="space-y-6">
  <section>
    <h3 className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-3">
      Section
    </h3>
    <div className="space-y-2">...</div>
  </section>
</div>
```

---

❌ **Generic floating icon above every heading**
```tsx
// PROHIBITED — this pattern screams "template"
<div className="flex flex-col items-center text-center">
  <div className="rounded-full bg-primary/10 p-3 mb-4">
    <Icon className="h-6 w-6 text-primary" />
  </div>
  <h3 className="font-semibold">Title</h3>
  <p className="text-sm text-muted-foreground">Generic description</p>
</div>
```

✅ **Integrate the icon into the typographic flow or eliminate it**
```tsx
<div>
  <h3 className="font-semibold flex items-center gap-2">
    <Icon className="h-4 w-4 opacity-50" />
    Title
  </h3>
  <p className="text-sm text-muted-foreground mt-1 pl-6">Description</p>
</div>
```

---

### 3.2 Typography

❌ **Homogeneous scale — everything is `text-sm` or everything is `text-base`**

✅ **Intentional scale contrast**
```tsx
// Create tension: one very large element, another very small one
<div>
  <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
    Monthly Revenue
  </span>
  <p className="text-4xl font-bold tracking-tight mt-1">$ 48,320</p>
  <p className="text-sm text-muted-foreground mt-1">↑ 12% vs last month</p>
</div>
```

❌ **`font-semibold` as the only degree of emphasis**

✅ **Use the complete system: weight + size + color + spacing + opacity**
```tsx
// Hierarchy without relying entirely on bold text
<p className="text-sm font-medium">Label</p>          // primary
<p className="text-sm text-muted-foreground">Desc</p> // secondary  
<p className="text-xs opacity-50">Metadata</p>        // tertiary
```

---

❌ **Inter as the default font out of pure inertia**

✅ **Choose with intention** — either use what is defined in `tailwind.config`, or question whether a display font should be added for headings:
```tsx
// In tailwind.config.ts — fonts with personality
fontFamily: {
  sans: ['Geist', 'system-ui', 'sans-serif'],      // body text
  display: ['Cal Sans', 'serif'],                  // large headings
  mono: ['Geist Mono', 'monospace'],               // code/data
}
```

---

### 3.3 Color

❌ **A palette of 50 shades of gray + one generic brand color**

✅ **Color with an editorial function**
- Use color to create *hierarchy*, not just *identity*
- A warm color in a cold context grabs attention — use this to your advantage
- `text-muted-foreground` is for *truly* secondary information, not just anything that isn't a title

❌ **Pure `#000000` or `#ffffff`**

✅ **Tinted neutrals** — slightly blue, warm, or cold grays depending on the product's tone:
```css
/* Instead of pure gray, use slate (cold/tech), zinc (neutral), or stone (warm) */
--foreground: 224 71% 4%;    /* nearly black with a blue tint */
--background: 210 20% 98%;   /* nearly white with a cold tint */
```

---

### 3.4 Space and Rhythm

❌ **`gap-6` and `p-6` on everything, uniformly**

✅ **Space as hierarchy** — more space = more importance
```tsx
// Main sections: generous spacing
// Related elements: compressed spacing
<div className="space-y-16">          {/* between sections */}
  <section className="space-y-8">     {/* inside the section */}
    <header className="space-y-2">    {/* inside the header */}
```

---

## 4. Patterns that work (use consciously)

### 4.1 Visual Anchor
Every layout needs an element that dominates — through size, color, or position. The eye must know *where to begin*.

### 4.2 Intentional Asymmetry
`col-span-2` + `col-span-1` creates more visual tension than a repeated `col-span-1`. Use it.

### 4.3 Baseline and Data Alignment
For numerical data, align to the right. For text lists, align to the left. Never center tables.

### 4.4 Varied Density
A dense section (high information density, compressed space) placed next to an airy section creates rhythm. Avoid uniform density across the page.

### 4.5 Borders as separation, not decoration
```tsx
// Border as a typographic divider — no shadows, no excessive rounded corners
<div className="border-t pt-4 mt-4">
```

---

## 5. Pre-delivery Checklist

Before finalizing a component, ask yourself:

- [ ] Can I clearly identify the element with the highest visual hierarchy?
- [ ] Is there a `<Card>` that could be replaced by negative space + typography?
- [ ] Does the typographic scale have at least 3 distinct levels of weight/size?
- [ ] Is there at least one element that breaks the symmetry of the grid?
- [ ] Do colors serve a function (hierarchy/attention/state), or are they purely decorative?
- [ ] If someone looks at this component for 3 seconds, will they know what to do?
- [ ] Could this component have come straight out of v0.dev without any changes? **(If yes, revise it)**

---

## 6. Quick Reference — Problematic Tailwind classes vs Better alternatives

| Generic Pattern | Why it fails | Alternative |
|---|---|---|
| `rounded-lg` everywhere | Fake uniformity trying to look "modern" | Vary intentionally: `rounded-none`, `rounded-sm`, `rounded-2xl` |
| `shadow-sm` on every card | Depth without meaning | Use shadows only for truly elevated elements (modals, dropdowns) |
| `text-muted-foreground` in desc | Makes everything equally secondary | Use gradual opacity: `opacity-70`, `opacity-50` |
| Universal `p-6` | Mechanical grid | Asymmetrical padding: `px-6 py-4`, `pt-8 pb-4 px-6` |
| Universal `gap-6` | Lack of rhythm | Vary spacing based on the hierarchical level |
| `font-semibold` for emphasis | Only one degree of emphasis used | Combine `font-medium` + larger size OR a different color |

---

## 7. Core Philosophy

> A *correct* interface is one that works.  
> A *signature* interface is one that the user recognizes without seeing the logo.

The difference isn't in using different tools. It lies in making intentional choices instead of statistically safe ones.

**shadcn/ui is a starting point, not a destination.**  
Modify the components. Break the defaults. Use Radix primitives directly when the shadcn wrapper starts limiting you.

The most generic interface possible is the one where the developer never questioned the default settings.

---

*Version 1.0 — Based on pattern analysis of AI-generated UI with Next.js + Tailwind + shadcn/ui*
