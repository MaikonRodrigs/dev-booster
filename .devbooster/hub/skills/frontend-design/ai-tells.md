# AI-Tells Catalog — "Why does this look generated?"

> Compact catalog of the most recognizable tells of AI-generated / template-driven UI.
> For each tell: what it looks like → why it fails → how to fix it.
> Rules already detailed in [anti-generic-guide.md](anti-generic-guide.md) §3 are **cross-referenced**, not repeated.

---

## 0. How to use this catalog

1. Read the [anti-generic-guide.md](anti-generic-guide.md) first — it is the visual contract of the project.
2. Use this catalog as a **detection checklist** when reviewing an existing screen or a freshly generated one.
3. If a row says "see §3.x", apply the full treatment from the anti-generic guide instead of the summary here.
4. Never fix a tell by adding more decoration — fix the cause.

---

## 1. Layout & composition tells

| Tell | Why it fails | Fix |
|---|---|---|
| **Edge-flush cards** — cards touching the viewport edges | Feels cramped and unconsidered | Add consistent gutters; respect a page-margin system |
| **Side-tab border** — `border-l-4` accent bar on every card/section | Cliché "this is highlighted" signal, so nothing is highlighted | Reserve it for one real active state; use space and type for the rest |
| **Uniform card grid** | Zero hierarchy, all weight equal | See §3.1 — make one element dominate |
| **Card inside a card** | Boxes with no purpose | See §3.1 — use space and type instead |
| **Floating icon above every heading** | Template scream | See §3.1 — integrate the icon into the type flow |
| **Uniform spacing (`gap-6`/`p-6` everywhere)** | Mechanical rhythm | See §3.4 — space as hierarchy |
| **Grid background** — faint blueprint grid behind everything | "Free template" signal | Keep only when the grid is content (charts, editors); otherwise remove |
| **Stripes** — diagonal/vertical stripe texture | Decorative noise | Remove; use a meaningful pattern if texture is truly needed |
| **Hairline + wide shadow** — thin border plus a huge, soft shadow | Signature "AI elevation" look | Use one elevation language: either border or shadow, sized by real depth |

## 2. Color tells

| Tell | Why it fails | Fix |
|---|---|---|
| **Cream palette** — warm off-white background + warm neutrals everywhere | The current AI default background | Choose a neutral with intent (see §3.3 tinted neutrals); cream only when the brand needs warmth |
| **50 shades of gray + one accent** | No color hierarchy | See §3.3 — color must have a function |
| **Pure `#000` / `#fff`** | Harsh, lifeless | See §3.3 — use tinted neutrals |
| **Radial halo / spotlight** — soft radial gradient behind the hero content | Instant "generated hero" look | Use a real image, a geometric shape, or nothing |
| **Glow-heavy dark mode** — neon glow as the default depth signal | Overused "AI dark mode" look | Use layered shadows and surface tints; glow only for genuine states (focus, alerts) |
| **Gradient-heavy buttons** — every CTA is a saturated gradient pill | Template CTA look | Solid, high-contrast CTA; gradient only when it carries brand meaning |

## 3. Typography tells

| Tell | Why it fails | Fix |
|---|---|---|
| **Italic serif hero** — elegant italic serif in the H1 | The current "premium" AI default | Choose a face for the brand; italic is for quotes and emphasis |
| **Eyebrow chip / kicker** — tiny uppercase pill above every section title | Pattern default | Use a real label system or remove; not every section needs a kicker |
| **Numbered labels** — "01", "02"… on every section | Template rhythm | Keep only when numbers carry meaning (steps, timelines) |
| **Aphoristic cadence** — every line a short punchy sentence | AI copywriting rhythm | Vary sentence length; write in the product's actual voice |
| **Oversized H1** — huge hero heading with nothing around it | Looks bold, says nothing | Size must follow hierarchy; the hero needs supporting content |
| **Crushed tracking** — `tracking-tight` on large headings everywhere | Squeezed, trendy | Normal tracking for large type; tight only when the face allows it |
| **Wide tracking** — `tracking-widest` on body/labels everywhere | Spread-out, empty | Reserve wide tracking for real uppercase labels |
| **Justified text** | Rivers and bad wrapping | Left-align (right in RTL); justify only for print |
| **Homogeneous scale** | No typographic tension | See §3.2 — vary size/weight/space/color |
| **`font-semibold` as the only emphasis** | One degree of emphasis | See §3.2 — combine size, weight, space, color |
| **Inter by inertia** | Invisible default | See §3.2 — choose with intention |
| **`text-muted-foreground` on everything secondary** | Everything equally secondary | See §3.2 — gradual opacity: `opacity-70`, `opacity-50` |

## 4. Motion tells

| Tell | Why it fails | Fix |
|---|---|---|
| **Bounce / elastic easing** on generic UI | Toy-like; the "fun" default | Ease-out for entry, ease-in-out for emphasis; springs only for physical objects |
| **Pulsing dot** — "live" status dot that pulses | Fake "we're live" signal | Use only for genuine real-time state; otherwise a static badge |
| **Marquee** — endless scrolling text strip | Promo-site default; content no one can read | Remove; if it scrolls, it isn't content |
| **Decorative blinking cursor** | Fake terminal/typing effect | Remove unless it simulates a real input |
| **Image hover zoom** — every image scales on hover | Template interaction | Zoom only when it means "view closer"; otherwise lift/overlay |
| **Reveal-gating content** — content hidden until scroll | Hides information from users, search, and assistive tech | Reveal subtly or not at all; never gate critical content |

## 5. Content & hierarchy tells

| Tell | Why it fails | Fix |
|---|---|---|
| **Skipped heading level** — h1 → h3 with no h2 | Broken document outline | Keep a logical heading sequence |
| **Heading-rhythm breaks** — a heading every few lines, no section breathing | Wall of headers | Give sections real space; fewer, stronger headings |
| **Text occlusion** — text overlapping other text/elements | Broken layout | Fix spacing and z-index; never ship overlap |
| **Pill buttons everywhere** — every control rounded-full | Template default | Vary radius by role; sharp edges read as more serious |

## 6. Robustness & behavior tells

| Tell | Why it fails | Fix |
|---|---|---|
| **Script-error containers** — empty boxes that only fill with JS | Fails without JS or on error | Provide fallback/error states; see `design-hardening` |
| **Content hidden at rest** — text only visible on hover/focus | Unreadable and inaccessible | Show content by default; reveal only truly secondary info |
| **Undersized UI text** — labels <12px, tiny captions | Unreadable | Floor at 14px for secondary text, 16px for body |
| **Clipped overflow** — text cut mid-word, buttons swallowing content | Data loss | Let containers grow; `overflow-wrap: break-word`; see `design-hardening` |
| **Cramped padding** — inputs/controls touching each other | Accidental taps, dense feel | Follow the spacing scale; touch targets ≥ 44px |

---

## 7. The one-line summary

> If a reviewer can guess the template, the model, or the generator that produced the screen — it has tells. Fix the cause, not the symptom.
