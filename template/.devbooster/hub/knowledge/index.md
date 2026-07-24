# 📚 Dev Booster — Knowledge Base

> Consolidated knowledge base for Dev Booster.
> Each article documents a problem pattern + validated solution.

---

## How to Use

1. Identify the concrete technical decision or problem pattern (e.g., framework behavior, migration concern, ESLint rule name, error message, or symptom).
2. Check the index below to locate the relevant article and section.
3. Use `read_file` with `start_line`/`end_line` to read **only** the necessary local section.
4. **Always read the official source linked by that section before choosing or applying a solution.** Use the local entry for field-validated context and the official source for current API, version, constraints, and migration guidance.
5. Inspect the actual project: installed versions, local rules, existing abstractions, configuration, conventions, and relevant tests.
6. Preserve a valid established project convention. Do not replace it only because another official approach is also valid; recommend a change only when the developer requests it or evidence shows the current approach is incompatible, unsafe, deprecated, broken, or responsible for a verified issue.

### Example

User reports: `TS2345: Type 'string' is not assignable to type 'number'`

1. Identify the pattern → TypeScript strict error on a discriminated union or runtime type mismatch.
2. Check the index → `typescript-patterns.md` table entry confirms it covers "null safety, discriminated UI states, runtime validation".
3. Read the relevant section → `read_file` with `start_line`/`end_line` to get only the "null-safety" section of `typescript-patterns.md`.
4. Read the official source → open the [TypeScript Handbook section on Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html) to verify current API behavior.
5. Inspect the project → check `tsconfig.json` strict flags, existing type guards in the codebase, and whether the error is in a new area or a pre-typed module.
6. Decide → if the project already uses a consistent pattern (e.g. Zod schemas + inferred types), preserve it. Only suggest a different approach if the current one is incompatible, unsafe, or the user explicitly requests a change.

---

### If Not Found in the Base

Use the relevant **official source** below. Prefer primary documentation, official changelogs, and official migration guides over blog posts, search snippets, or unverified answers.

| Area | Trusted sources |
|---|---|
| React | [React documentation](https://react.dev), [useEffect](https://react.dev/reference/react/useEffect), [useState](https://react.dev/reference/react/useState), [useMemo](https://react.dev/reference/react/useMemo), [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect) |
| React Hooks linting | [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks) |
| Next.js | [Next.js documentation](https://nextjs.org/docs), [Next.js 16 upgrade guide](https://nextjs.org/docs/app/guides/upgrading/version-16), [TypeScript configuration](https://nextjs.org/docs/app/api-reference/config/next-config-js/typescript), [Image configuration](https://nextjs.org/docs/app/api-reference/components/image#configuration-options) |
| Historical Next.js behavior | [Next.js 15 ESLint configuration](https://nextjs.org/docs/15/app/api-reference/config/next-config-js/eslint) |
| ESLint | [ESLint configuration files](https://eslint.org/docs/latest/use/configure/configuration-files), [ESLint migration to flat config](https://eslint.org/docs/latest/use/configure/migration-guide) |
| TypeScript | [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/), [TSConfig reference](https://www.typescriptlang.org/tsconfig/), [TypeScript release notes](https://devblogs.microsoft.com/typescript/) |
| npm | [npm CLI documentation](https://docs.npmjs.com/cli/), [npm audit](https://docs.npmjs.com/cli/commands/npm-audit), [peer dependency settings](https://docs.npmjs.com/cli/using-npm/config#strict-peer-deps) |
| Yarn Classic | [Yarn Classic documentation](https://classic.yarnpkg.com/en/docs/), [yarn audit](https://classic.yarnpkg.com/en/docs/cli/audit/), [yarn outdated](https://classic.yarnpkg.com/en/docs/cli/outdated/), [yarn why](https://classic.yarnpkg.com/en/docs/cli/why/) |
| pnpm | [pnpm documentation](https://pnpm.io/), [pnpm audit](https://pnpm.io/cli/audit), [pnpm why](https://pnpm.io/cli/why), [pnpm workspaces](https://pnpm.io/workspaces) |
| Node.js | [Node.js API documentation](https://nodejs.org/docs/latest/api/), [Node.js package guidance](https://nodejs.org/en/learn/getting-started/packages) |
| Monorepos | [npm workspaces](https://docs.npmjs.com/cli/using-npm/workspaces), [Yarn workspaces](https://classic.yarnpkg.com/en/docs/workspaces/), [pnpm workspaces](https://pnpm.io/workspaces), [Turborepo documentation](https://turbo.build/docs), [Nx documentation](https://nx.dev/docs) |
| tRPC | [tRPC documentation](https://trpc.io/docs), [Context](https://trpc.io/docs/server/context), [Procedures](https://trpc.io/docs/server/procedures), [Error handling](https://trpc.io/docs/server/error-handling) |
| TanStack Query | [TanStack Query documentation](https://tanstack.com/query/latest/docs/framework/react/overview), [Query keys](https://tanstack.com/query/latest/docs/framework/react/guides/query-keys), [SSR and hydration](https://tanstack.com/query/latest/docs/framework/react/guides/ssr) |
| Prisma + PostgreSQL | [Prisma documentation](https://www.prisma.io/docs/orm), [Prisma Migrate](https://www.prisma.io/docs/orm/prisma-migrate), [PostgreSQL documentation](https://www.postgresql.org/docs/), [PostgreSQL EXPLAIN](https://www.postgresql.org/docs/current/using-explain.html) |
| NestJS | [NestJS documentation](https://docs.nestjs.com/), [Modules](https://docs.nestjs.com/modules), [Validation](https://docs.nestjs.com/techniques/validation), [Exception filters](https://docs.nestjs.com/exception-filters) |
| Vite | [Vite Guide](https://vite.dev/guide/), [Environment variables](https://vite.dev/guide/env-and-mode), [Vite config](https://vite.dev/config/) |
| Tailwind CSS | [Tailwind documentation](https://tailwindcss.com/docs), [Tailwind v4 upgrade guide](https://tailwindcss.com/docs/upgrade-guide) |
| Angular | [Angular documentation](https://angular.dev/overview), [Angular version compatibility](https://angular.dev/reference/versions), [Angular CLI](https://angular.dev/cli) |
| Testing | [Vitest documentation](https://vitest.dev/guide/), [Jest documentation](https://jestjs.io/docs/getting-started), [Playwright documentation](https://playwright.dev/docs/intro) |
| react-to-print | [Official repository](https://github.com/MatthewHerbst/react-to-print), [v3 changelog](https://github.com/MatthewHerbst/react-to-print/blob/v3.3.0/CHANGELOG.md) |
| Formik | [Formik Form API](https://formik.org/docs/api/form) |
| Radix UI | [Radix Primitives documentation](https://www.radix-ui.com/primitives/docs/overview/introduction) |
| shadcn/ui | [shadcn CLI](https://ui.shadcn.com/docs/cli), [Radix migration](https://ui.shadcn.com/docs/cli#migrate-radix), [Tailwind v4 migration](https://ui.shadcn.com/docs/tailwind-v4) |

For a library-specific issue, prioritize the library's official documentation, release notes, changelog, and migration guide. If the official sources do not cover the case, resolve it from the actual project context without writing to this knowledge base.

---

## Articles

| File | Stacks | Content |
|---|---|---|
| [`react-patterns.md`](./react-patterns.md) | React 19, React Hooks | Effects, derived state, async UI strategy, Suspense boundaries, custom-hook extraction, state mutation |
| [`nextjs-pitfalls.md`](./nextjs-pitfalls.md) | Next.js 16 | Build/lint changes, config schema drift, Server/Client boundaries, route loading/errors, hydration |
| [`eslint-migration.md`](./eslint-migration.md) | ESLint 9, Flat Config | Flat config migration, masking, `resolutions`, inline suppressions |
| [`typescript-patterns.md`](./typescript-patterns.md) | TypeScript Strict | Imports, suppressions, refs, discriminated UI states, runtime validation, null safety |
| [`dependency-guide.md`](./dependency-guide.md) | npm/yarn/pnpm | Safe update model, dependency analysis, audit interpretation |
| [`upgrade-fallout.md`](./upgrade-fallout.md) | Multi-stack | Upgrade fallout: scripts, config, new lint rules, validation |
| [`migration-guides.md`](./migration-guides.md) | Libraries | `react-to-print` v3, Formik + React 19, Radix UI |
| [`nodejs-patterns.md`](./nodejs-patterns.md) | Node.js | Runtime alignment, ESM/CJS, environment handling, async failures, script portability |
| [`package-manager-patterns.md`](./package-manager-patterns.md) | npm, Yarn, pnpm | Lockfiles, peers, overrides, audit, workspaces, immutable installs |
| [`monorepo-patterns.md`](./monorepo-patterns.md) | npm/Yarn/pnpm workspaces, Turbo, Nx | Package boundaries, dependency resolution, shared configs, cache hygiene |
| [`trpc-patterns.md`](./trpc-patterns.md) | tRPC | Context/auth, input validation, errors, type integrity, router design, transport |
| [`tanstack-patterns.md`](./tanstack-patterns.md) | TanStack Query | Query ownership, keys, invalidation, async UI states, caching, SSR hydration, cancellation, optimistic updates |
| [`prisma-postgresql-patterns.md`](./prisma-postgresql-patterns.md) | Prisma, PostgreSQL | Generation drift, migrations, query loading, transactions, indexes, pooling |
| [`nestjs-patterns.md`](./nestjs-patterns.md) | NestJS | Modules, DI, validation, guards, exceptions, configuration, request scope |
| [`vite-patterns.md`](./vite-patterns.md) | Vite | Env exposure, base paths, aliases, ESM/CJS, optimizer cache, plugins, React integration |
| [`tailwind-shadcn-patterns.md`](./tailwind-shadcn-patterns.md) | Tailwind CSS, shadcn/ui | v3/v4 migration, source scanning, tokens, dependencies, themes, design-system reuse |
| [`testing-patterns.md`](./testing-patterns.md) | Vitest, Jest, Playwright | Environments, determinism, mocks, async UI behavior, isolation, CI parity, validation |
| [`angular-patterns.md`](./angular-patterns.md) | Angular | Standalone APIs, DI, signals/RxJS, forms, HTTP, routing, version alignment |

---

## Maintenance (Dev Booster Maintainers Only)

This base is manually curated. Only Dev Booster maintainers add, update, or remove content.
