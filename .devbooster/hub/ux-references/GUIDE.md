# UX Reference Library Guide

## Purpose

This directory is a visual reference library for designing new pages and improving existing interfaces. The library is organized as a **navigation roadmap**: instead of reading everything, an agent jumps from this guide to the right category index, filters by tag, and opens only the relevant reference file(s).

The images in this library are inspiration material. They are not implementation specifications, reusable code, component definitions, or instructions to reproduce another product.

The purpose of the library is to help the Dev Booster and the developer explore visual directions, compare page structures, and make better UX decisions before implementation.

## What belongs here

The library focuses on complete page references, page flows, and meaningful page sections, such as:

- Dashboards
- Settings pages
- Sign-in and sign-up pages
- Password recovery and verification flows
- Profile pages
- Payment and billing pages
- Contact pages
- Pricing pages
- Landing pages
- Informational pages
- 404 pages
- Email templates
- Headers, feature sections, and footers when they are useful as composition references

This library does not need to catalog every isolated UI component. Buttons, dialogs, tables, tabs, inputs, and similar primitives can be implemented using the project's existing design system, framework, component library, or custom code.

## How to use the references — the roadmap flow

The library is organized as a roadmap with three levels:

```
GUIDE.md  →  <category>/index.md  →  reference file(s)
```

**Level 1 — GUIDE.md (this file).** Identify the page category from the [Category map](#category-map-roadmap) below.

**Level 2 — Category index (`<category>/index.md`).** Open the index of the matching category. Each index catalogs every reference file in that folder with:

- **Type** — what kind of page/section the reference covers.
- **Tags by facet** — a faceted vocabulary of style, layout/density, type/domain, and key components (see [Tags](#tags)).
- **Components** — the central building blocks of the route (charts, tables, forms, maps, etc.).
- **Summary** — one or two lines describing the composition and what it is ideal for.
- A **faceted tag map** at the top that jumps directly from a tag to the matching files.

**Level 3 — Reference file(s).** Open the file(s) the tag map points to. Each file is a complete visual blueprint (layout blueprint, sections, components, density, states, interactions, style, ideal for). Read more than one file when the task needs it — references are combinable: one file may provide the hero composition, another the section rhythm, another the conversion structure.

### Worked example

> Request: "Create a modern analytics dashboard with a line chart and a data table."
>
> 1. Open this guide → the category is `dashboards`.
> 2. Open `dashboards/index.md` → the faceted tag map shows `modern` → `dashboard-17`, `dashboard-18`, and under components `line-chart` and `data-table` point to several more.
> 3. Open the matching file(s) and use the blueprint as inspiration.
> 4. Combine with other categories if the request spans more than one page type (e.g. a dashboard plus its settings).

The same flow works for any tag: `minimal`, `dark`, `split-layout`, `fintech`, `editorial`, `conversion-oriented`, `map`, `carousel`, and so on. If the index has no tag for the exact need, read the closest match or the summaries — the AI should not load the whole library to decide.

## Category map (roadmap)

| Category (folder)     | What it covers                                                                     | Common tags                                                                                 |
| --------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `dashboards`          | Analytics, sales, finance, banking, customer, vendor, marketing dashboards         | `analytics`, `sales`, `finance`, `banking`, `table-heavy`, `enterprise`, `line-chart`       |
| `settings`            | Profile, security, team, billing, notifications, appearance, integrations settings | `profile`, `billing`, `team`, `notifications`, `integrations`, `table-heavy`                |
| `sign-in`             | Login pages: centered, card, split, SSO, social login, email-first                 | `split-layout`, `testimonial`, `card`, `social-login`, `sso`                                |
| `sign-up`             | Registration: centered, card, split, multi-step, social, trial                     | `split-layout`, `multi-step`, `testimonial`, `social-login`, `card`, `password`             |
| `forgot-password`     | Password recovery: request, multi-step, email confirmation, success                | `recovery`, `multi-step`, `confirmation`, `minimal`                                         |
| `verification`        | Email verification, OTP entry, verification success                                | `otp`, `email-verification`, `success`, `centered`                                          |
| `profile`             | Public profile, portfolio, profile analytics, profile settings forms               | `public-profile`, `portfolio`, `settings-form`, `analytics`                                 |
| `payments`            | Pricing/plan pages, billing toggles, comparison tables, FAQ                        | `pricing`, `cards`, `faq`, `comparison`, `trial-cta`, `billing-toggle`                      |
| `pricing`             | Pricing pages: tiers, comparison, sliders, testimonials, FAQ                       | `pricing`, `faq`, `comparison`, `interactive`, `minimal`, `user-slider`                     |
| `contact`             | Contact forms, channels, locations and maps                                        | `form`, `map`, `locations`, `split-layout`, `image-led`                                     |
| `landing-pages`       | Full marketing pages: SaaS, analytics, fintech, banking, creative studios          | `analytics`, `fintech`, `banking`, `saas`, `creative-studio`, `product-led`, `testimonials` |
| `header-sections`     | Header/hero sections — grouped by layout variant                                   | `split-hero`, `preview-hero`, `centered-hero`                                               |
| `feature-sections`    | Feature grids, alternating showcases, integrations sections, dark variants         | `grid`, `integrations`, `dark`, `alternating`, `fintech`, `mobile`                          |
| `footer`              | Link footers, newsletter, CTA, app downloads, light/dark variants                  | `dark`, `light`, `newsletter`, `cta`, `app-downloads`, `minimal`                            |
| `informational-pages` | Back-office workspaces: tables, calendars, messaging, editors, search results      | `table`, `calendar`, `messaging`, `project`, `editor`, `back-office`                        |
| `email-templates`     | Welcome, onboarding, verification, invitation, promotional emails                  | `welcome`, `onboarding`, `transactional`, `video`, `promotional`                            |
| `404`                 | Error 404 pages: minimal, centered, split, search, illustrated, help links         | `minimal`, `search`, `help-links`, `split-layout`, `editorial`                              |

## Tags

Tags are written in **English** and derived directly from the reference files (their `type`, `Observed style`, `Components`, and `Ideal for` fields), so they stay faithful to the content. The AI may match them by intent (e.g. a request for "algo moderno" maps to `modern`). The vocabulary is organized in **five facets**; every index groups its tag map by these facets:

- **Estilo / Style:** `minimal`, `clean`, `editorial`, `corporate`, `modern`, `premium`, `friendly`, `bold`, `dark`, `playful`, `analytical`, `polished`, `conversion-oriented`, `trust-oriented`, `promotional`, `product-led`, `enterprise`, `high-contrast`, `human-centered`, `warm`, `quiet`.
- **Layout & densidade:** `split-layout`, `centered`, `card`, `multi-step`, `table-heavy`, `form-heavy`, `image-led`, `grid`, `single-column`, `left-aligned`, `sidebar`, `carousel`, `multi-column`, `compact`, `dense`, `spacious`, `balanced` — plus category-specific layout tags (`split-hero`, `preview-hero`, `centered-hero`, `alternating`, `two-column`, `rail`).
- **Tipo & domínio:** the page type and the industry, e.g. `analytics`, `sales`, `finance`, `banking`, `fintech`, `saas`, `b2b`, `crm`, `calendar`, `otp`, `newsletter`, `integrations`, `pricing`, `recovery`, `back-office`, `portfolio`, `creative-studio`.
- **Componentes-chave:** the central building blocks of the route, e.g. `line-chart`, `bar-chart`, `donut-chart`, `map`, `data-table`, `form`, `search-form`, `testimonial`, `faq`, `pricing-cards`, `billing-toggle`, `user-slider`, `carousel`, `gallery`, `video-player`, `device-mockup`, `upload`, `rich-text-editor`, `newsletter-form`, `stepper`, `otp-input`, `status-badges`, `toggles`.

Every index has a **faceted tag map** (tag → files) and each reference entry lists its own tags plus a **Components** line. Prefer the tag map for direct jumps; use the per-file entries for detail.

## Source images and licensing

The reference files are **text descriptions only** — the source screenshots are not stored in this kit. They come from real products (including paid/Pro versions of open-source projects) and are kept privately by the developer to respect their licenses; the kit is distributed publicly (e.g. via NPM) and must not ship third-party screenshots.

Because of this, the reference files intentionally avoid reproducing brand assets, proprietary copy, or exact visuals. When a design task needs a more faithful reading of a specific reference, **ask the developer to share the original image in the conversation** — they keep the images locally and can provide them on demand. Do not attempt to reconstruct the image from the description alone as if it were a specification.

## Reference principles

- Use images as visual inspiration, not as instructions to copy.
- Generate new copy based on the actual product and project context.
- Do not reproduce brand names, proprietary text, logos, imagery, or distinctive content from a reference unless the developer explicitly provides permission and the assets are appropriate for the project.
- Preserve valid project conventions when they already exist.
- Do not replace product requirements with visual preference.
- Consider responsive behavior, accessibility, performance, content clarity, and interaction states.
- Prefer selective loading of relevant references over loading the entire library by default.
- Treat this directory as read-only during normal design and implementation work unless the developer explicitly asks to curate or update it.

## What the references are for

The references can support decisions about:

- Page composition
- Visual hierarchy
- Information density
- Navigation placement
- Hero direction
- Section order
- Content grouping
- Use of imagery and mockups
- Social proof
- Calls to action
- Dashboard organization
- Form and authentication layouts
- Empty, informational, and conversion-oriented page structures

The references should not be treated as evidence that a particular implementation, library, framework, or component architecture is required.

## What the references are not for

This library is not:

- A component library
- A code-generation template
- A replacement for product discovery
- A replacement for the project's design system
- A source of production assets by default
- A training dataset that must be loaded in full for every task

## Suggested consultation rule

Consult this guide and the relevant reference category when the user asks to:

- Create a new page or flow
- Redesign an existing page
- Explore visual directions
- Improve the hierarchy or composition of a screen
- Compare possible page structures
- Use one or more saved visual references as inspiration

Do not load the entire library for an unrelated task or for a purely mechanical code change.

## Booster integration candidates

### Primary Boosters

These Boosters are the most natural owners of this guide:

- `ui-ux-pro-max.md` — visual direction, page composition, design exploration, and UX synthesis.
- `design.md` — UI/UX decisions, visual structure, and design review.
- `frontend.md` — frontend requests that require translating visual references into the project's actual UI architecture.

### Secondary Boosters

These Boosters may receive the resulting visual direction when the task moves into implementation:

- `create.md` — creation of a new page or application flow.
- `implementation.md` — planning and selecting the implementation path for a concrete UI task.
- `builder.md` — execution after the visual direction and implementation plan are approved.
- `enhance.md` — evolution or redesign of an existing page.

Secondary Boosters should not independently load the entire reference library by default. They should use the relevant visual conclusions produced during the design or frontend stage, unless the task explicitly requires direct reference analysis.

## Status

This guide defines the intent and usage model of the library. It does not activate any Booster, create an automatic synchronization process, or require changes to the existing Booster rules by itself.
