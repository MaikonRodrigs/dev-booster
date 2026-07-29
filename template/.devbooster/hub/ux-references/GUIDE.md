# UX Reference Library Guide

## Purpose

This directory is a visual reference library for designing new pages and improving existing interfaces.

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

## How to use the references

When a design or frontend request is related to a page type represented in this library:

1. Identify the relevant page category.
2. Select only the references that are relevant to the request.
3. Analyze the visual composition of the selected references.
4. Compare their structure, hierarchy, density, spacing, navigation, imagery, content flow, and calls to action.
5. Cross-reference those observations with the product context, target audience, business goal, existing project patterns, and technical stack.
6. Produce an original direction adapted to the project.
7. Let the developer decide the final implementation approach.

Multiple references may be combined. For example, one reference may provide the hero composition, another may provide the section rhythm, and another may provide the conversion or testimonial structure.

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
