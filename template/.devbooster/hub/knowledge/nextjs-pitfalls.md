# ▲ Next.js Pitfalls

> **Purpose:** Common pitfalls and issues in Next.js 16+ projects
> **Primary official sources:** [Next.js TypeScript configuration](https://nextjs.org/docs/app/api-reference/config/next-config-js/typescript) · [Next.js 16 upgrade guide](https://nextjs.org/docs/app/guides/upgrading/version-16) · [Next.js Image configuration](https://nextjs.org/docs/app/api-reference/components/image#configuration-options)

## Project Convention Decision Rule

Before applying this guidance, verify the installed versions, router and rendering model, local rules, existing abstractions, configuration, and tests. Preserve a valid established project convention; do not replace it only because another documented approach is also valid. Use official sources to verify API behavior, compatibility, constraints, and migrations. Recommend a change only when the developer requests it or evidence shows the current approach is incompatible, unsafe, deprecated, broken, or responsible for a verified issue.

---

## Table of Contents

1. [Framework-level Masking — ignoreBuildErrors](#framework-level-masking)
2. [Legacy Build-time Lint Masking — Next.js 15 and Earlier](#legacy-build-time-lint-masking)
3. [Broken Lint Script After a Next.js 16 Upgrade](#broken-lint-script-after-a-nextjs-16-upgrade)
4. [Invalid next.config Properties](#invalid-nextconfig-properties)
5. [TSConfig Changes Triggered by Next.js](#tsconfig-changes-triggered-by-nextjs)
6. [New Lint Findings After an Upgrade](#new-lint-findings-after-an-upgrade)
7. [Warnings Need Triage](#warnings-need-triage)
8. [Choose Server and Client Boundaries Deliberately](#choose-server-and-client-boundaries-deliberately)
9. [Use Route Loading and Error Boundaries Before Rebuilding Them](#use-route-loading-and-error-boundaries-before-rebuilding-them)
10. [Avoid Hydration Mismatches by Preserving Initial Output](#avoid-hydration-mismatches-by-preserving-initial-output)

---

## Framework-level Masking

### Problem
The `typescript.ignoreBuildErrors: true` option in `next.config.*` skips Next.js's built-in TypeScript type-checking step during production builds. It does not run the check and suppress its errors, so it can allow type errors to reach deployment.

*Source: [Next.js TypeScript configuration](https://nextjs.org/docs/app/api-reference/config/next-config-js/typescript)*

> The official Next.js documentation warns: "If disabled, be sure you are running type checks as part of your build or deploy process, otherwise this can be very dangerous."

### Code (symptom)
```js
// next.config.js — bypasses Next.js type checking
typescript: { ignoreBuildErrors: true }
```

### Fix
Remove the flag; `false` is the default:
```js
module.exports = {
  typescript: {
    ignoreBuildErrors: false,
  },
}
```

If a project temporarily keeps the flag, run an explicit type check such as `tsc --noEmit` in CI or the deployment pipeline.

---

## Legacy Build-time Lint Masking

**Evidence:** Field-validated in a real audit.

### Applicability
Next.js 15 and earlier. The `eslint.ignoreDuringBuilds` option was supported in these versions and allowed production builds to complete with ESLint errors.

*Source: [Next.js 15 ESLint configuration](https://nextjs.org/docs/15/app/api-reference/config/next-config-js/eslint)*

### Code (symptom)
```js
module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
}
```

### Why it matters
This setting bypasses Next.js's built-in build-time lint failure. It may have been introduced as a temporary deployment workaround, but it hides lint failures unless ESLint runs independently in CI or another verified workflow.

### Version boundary
Next.js 16 removed `next lint`, build-time linting, and the `eslint` key in `next.config.*`. For Next.js 16+, remove this legacy config and run ESLint directly as a separate validation command.

---

## Broken Lint Script After a Next.js 16 Upgrade

### Problem
Starting with Next.js 16, `next lint` is removed. `next build` no longer runs linting, and the `eslint` key in `next.config.*` is removed.

Invoking the removed command can produce an error such as:
```
Invalid project directory provided, no such directory: .../lint
```

### Fix
Run ESLint directly and make linting a separate CI or deployment step:
```json
{
  "scripts": {
    "lint": "eslint ."
  }
}
```

For flat-config setup and migration details, see [ESLint Migration](./eslint-migration.md).

---

## Invalid next.config Properties

### Problem
A property in an unsupported location in `next.config.*` can produce a configuration warning or be ignored. For example, `unoptimized` is not a top-level Next.js config option.

### Code (symptom)
```js
// Invalid location
module.exports = { unoptimized: true }

// Valid location
module.exports = { images: { unoptimized: true } }
```

### Fix
Use the documented `images.unoptimized` option:
```js
module.exports = {
  images: {
    unoptimized: true,
  },
}
```

---

## TSConfig Changes Triggered by Next.js

### Problem
When TypeScript is added to a project, `next dev` and `next build` can create or update `tsconfig.json` with recommended settings and generated-type includes.

### Handling
- Review the complete `tsconfig.json` diff and identify why each change was made.
- Keep required generated-type includes, such as `.next/types/**/*.ts`, when the project uses Next.js route-aware types.
- Validate compiler-option changes, including `moduleResolution`, against the project's Next.js and TypeScript versions before accepting or reverting them.
- Commit intentional configuration changes so they are visible in review.

---

## New Lint Findings After an Upgrade

### Problem
After migrating to ESLint flat config or updating Next.js, ESLint, or plugins, new rules or changed analysis can reveal existing issues or introduce upgrade-specific incompatibilities.

### Common examples
- A callback referenced before declaration
- Non-deterministic logic during render, such as `Math.random()` in a component body
- An unused import that was previously not reported

### Handling
1. Analyze each finding individually.
2. Classify it as a pre-existing issue now detected, a configuration change, or an upgrade regression.
3. Apply a specific fix or document a narrowly justified exception.

---

## Warnings Need Triage

### Problem
A successful build can still emit warnings about configuration, deprecations, or behavior that affects production.

### Checklist
After a framework upgrade:
1. Run `next build` and capture the full output.
2. Review warnings as well as errors.
3. Determine the source, impact, and owner of each warning.
4. Fix the warning or document an accepted disposition according to the project's release policy.

### Rule of thumb
**A passing build with warnings requires triage; warnings are neither automatically deploy-blocking nor automatically acceptable.**

---

## Choose Server and Client Boundaries Deliberately

### Decision
In the App Router, components are Server Components by default. Add `'use client'` only when the component or one of its direct responsibilities requires client-side capabilities such as state, Effects, browser APIs, or event handlers.

### Verify first
- Identify the active router; do not apply App Router guidance to a Pages Router project.
- Keep the client boundary as narrow as the existing architecture permits.
- Inspect existing component boundaries and shared providers before moving a component to the client.
- Pass serializable props across the Server-to-Client boundary.

Do not convert a server-rendered subtree to a Client Component merely to solve a small interactive concern. Extract the interactive leaf when that preserves the project’s established composition pattern.

*Sources: [Next.js — Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components) · [Next.js — use client](https://nextjs.org/docs/app/api-reference/directives/use-client)*

---

## Use Route Loading and Error Boundaries Before Rebuilding Them

### Decision
For App Router route segments, inspect existing `loading.*`, `error.*`, and shared layout conventions before adding component-local loading or error state. These files define framework-native boundaries for the segment and its descendants.

### Verify first
- Confirm whether the loading state is route-level, component-level, or owned by an existing client query abstraction.
- Preserve existing fallback, retry, error-reporting, and accessibility conventions.
- Do not use `loading.*` as a substitute for errors in a client-side mutation or interaction; use the project’s local feedback pattern there.
- Confirm the required error boundary shape for the installed Next version before creating one.

Use the smallest boundary that gives the intended user experience. A project may intentionally prefer a shared route skeleton or a local component state; preserve either approach when valid.

*Sources: [Next.js — Loading UI and Streaming](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming) · [Next.js — Error Handling](https://nextjs.org/docs/app/building-your-application/routing/error-handling)*

---

## Avoid Hydration Mismatches by Preserving Initial Output

### Symptom
The server-rendered HTML differs from the first client render, producing a hydration warning, discarded markup, or visible flicker.

### Verify first
Look for browser-only values (`window`, storage, viewport), time, randomness, locale, and data that changes between the server and first client render. Confirm whether the component is intended to render consistently on both sides.

### Fix
Render the same initial output on server and client, then read browser-only state after mount when necessary. For an intentionally client-only widget, isolate it behind the project’s established client boundary rather than scattering hydration suppressions.

Do not use `suppressHydrationWarning` as a general fix; it is a narrow escape hatch and does not reconcile the underlying output.

*Source: [Next.js — React Hydration Error](https://nextjs.org/docs/messages/react-hydration-error)*
