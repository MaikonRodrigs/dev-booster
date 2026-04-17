---
name: app-builder
description: Main application building orchestrator. Creates full-stack applications from natural language requests. Determines project type, selects tech stack, coordinates agents.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash, Agent
---

# App Builder - Application Building Orchestrator

> Analyzes user's requests, determines tech stack, plans structure, and coordinates agents.

## 🎯 Selective Reading Rule

**Read ONLY files relevant to the request!** Check the content map, find what you need.

| File | Description | When to Read |
|------|-------------|--------------|
| `project-detection.md` | Keyword matrix, project type detection | Starting new project |
| `tech-stack.md` | 2026 default stack, alternatives | Choosing technologies |
| `agent-coordination.md` | Agent pipeline, execution order | Coordinating multi-agent work |
| `scaffolding.md` | Directory structure, core files | Creating project structure |
| `feature-building.md` | Feature analysis, error handling | Adding features to existing project |
| `templates/SKILL.md` | **Project templates** | Scaffolding new project |

---

## 📦 Templates (13)

Quick-start scaffolding for new projects. **Read the matching template only!**

| Template | Tech Stack | When to Use |
|----------|------------|-------------|
| [nextjs-fullstack](templates/nextjs-fullstack/TEMPLATE.md) | Next.js + Prisma | Full-stack web app |
| [nextjs-saas](templates/nextjs-saas/TEMPLATE.md) | Next.js + Stripe | SaaS product |
| [nextjs-static](templates/nextjs-static/TEMPLATE.md) | Next.js + Framer | Landing page |
| [nuxt-app](templates/nuxt-app/TEMPLATE.md) | Nuxt 3 + Pinia | Vue full-stack app |
| [express-api](templates/express-api/TEMPLATE.md) | Express + JWT | REST API |
| [python-fastapi](templates/python-fastapi/TEMPLATE.md) | FastAPI | Python API |
| [react-native-app](templates/react-native-app/TEMPLATE.md) | Expo + Zustand | Mobile app |
| [flutter-app](templates/flutter-app/TEMPLATE.md) | Flutter + Riverpod | Cross-platform mobile |
| [electron-desktop](templates/electron-desktop/TEMPLATE.md) | Electron + React | Desktop app |
| [chrome-extension](templates/chrome-extension/TEMPLATE.md) | Chrome MV3 | Browser extension |
| [cli-tool](templates/cli-tool/TEMPLATE.md) | Node.js + Commander | CLI app |
| [monorepo-turborepo](templates/monorepo-turborepo/TEMPLATE.md) | Turborepo + pnpm | Monorepo |

---

## 🔗 Related Agents

| Agent | Role |
|-------|------|
| `project-planner` | Task breakdown, dependency graph |
| `frontend-specialist` | UI components, pages |
| `backend-specialist` | API, business logic |
| `database-architect` | Schema, migrations |
| `devops-engineer` | Deployment, preview |

---

## Usage Example

```
User: "Make an Instagram clone with photo sharing and likes"

App Builder Process:
1. Project type: Social Media App
2. Tech stack: Next.js + Prisma + Cloudinary + Clerk
3. Create plan:
   ├─ Database schema (users, posts, likes, follows)
   ├─ API routes (12 endpoints)
   ├─ Pages (feed, profile, upload)
   └─ Components (PostCard, Feed, LikeButton)
4. Coordinate agents
5. Report progress
6. Start preview
```



---
# Content from agent-coordination.md

# Agent Coordination

> How App Builder orchestrates specialist agents.

## Agent Pipeline

```
┌─────────────────────────────────────────────────────────────┐
│                   APP BUILDER (Orchestrator)                 │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     PROJECT PLANNER                          │
│  • Task breakdown                                            │
│  • Dependency graph                                          │
│  • File structure planning                                   │
│  • Create {task-slug}.md in project root (MANDATORY)             │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│              CHECKPOINT: PLAN VERIFICATION                   │
│  🔴 VERIFY: Does {task-slug}.md exist in project root?       │
│  🔴 If NO → STOP → Create plan file first                    │
│  🔴 If YES → Proceed to specialist agents                    │
└─────────────────────────────────────────────────────────────┘
                              │
          ┌───────────────────┼───────────────────┐
          ▼                   ▼                   ▼
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│ DATABASE        │ │ BACKEND         │ │ FRONTEND        │
│ ARCHITECT       │ │ SPECIALIST      │ │ SPECIALIST      │
│                 │ │                 │ │                 │
│ • Schema design │ │ • API routes    │ │ • Components    │
│ • Migrations    │ │ • Controllers   │ │ • Pages         │
│ • Seed data     │ │ • Middleware    │ │ • Styling       │
└─────────────────┘ └─────────────────┘ └─────────────────┘
          │                   │                   │
          └───────────────────┼───────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                 PARALLEL PHASE (Optional)                    │
│  • Security Auditor → Vulnerability check                   │
│  • Test Engineer → Unit tests                               │
│  • Performance Optimizer → Bundle analysis                  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     DEVOPS ENGINEER                          │
│  • Environment setup                                         │
│  • Preview deployment                                        │
│  • Health check                                              │
└─────────────────────────────────────────────────────────────┘
```

## Execution Order

| Phase | Agent(s) | Parallel? | Prerequisite | CHECKPOINT |
|-------|----------|-----------|--------------|------------|
| 0 | Socratic Gate | ❌ | - | ✅ Ask 3 questions |
| 1 | Project Planner | ❌ | Questions answered | ✅ **PLAN.md created** |
| 1.5 | **PLAN VERIFICATION** | ❌ | PLAN.md exists | ✅ **File exists in root** |
| 2 | Database Architect | ❌ | Plan ready | Schema defined |
| 3 | Backend Specialist | ❌ | Schema ready | API routes created |
| 4 | Frontend Specialist | ✅ | API ready (partial) | UI components ready |
| 5 | Security Auditor, Test Engineer | ✅ | Code ready | Tests & audit pass |
| 6 | DevOps Engineer | ❌ | All code ready | Deployment ready |

> 🔴 **CRITICAL:** Phase 1.5 is MANDATORY. No specialist agents proceed without PLAN.md verification.



---
# Content from feature-building.md

# Feature Building

> How to analyze and implement new features.

## Feature Analysis

```
Request: "add payment system"

Analysis:
├── Required Changes:
│   ├── Database: orders, payments tables
│   ├── Backend: /api/checkout, /api/webhooks/stripe
│   ├── Frontend: CheckoutForm, PaymentSuccess
│   └── Config: Stripe API keys
│
├── Dependencies:
│   ├── stripe package
│   └── Existing user authentication
│
└── Estimated Time: 15-20 minutes
```

## Iterative Enhancement Process

```
1. Analyze existing project
2. Create change plan
3. Present plan to user
4. Get approval
5. Apply changes
6. Test
7. Show preview
```

## Error Handling

| Error Type | Solution Strategy |
|------------|-------------------|
| TypeScript Error | Fix type, add missing import |
| Missing Dependency | Run npm install |
| Port Conflict | Suggest alternative port |
| Database Error | Check migration, validate connection |

## Recovery Strategy

```
1. Detect error
2. Try automatic fix
3. If failed, report to user
4. Suggest alternative
5. Rollback if necessary
```



---
# Content from project-detection.md

# Project Type Detection

> Analyze user requests to determine project type and template.

## Keyword Matrix

| Keywords | Project Type | Template |
|----------|--------------|----------|
| blog, post, article | Blog | astro-static |
| e-commerce, product, cart, payment | E-commerce | nextjs-saas |
| dashboard, panel, management | Admin Dashboard | nextjs-fullstack |
| api, backend, service, rest | API Service | express-api |
| python, fastapi, django | Python API | python-fastapi |
| mobile, android, ios, react native | Mobile App (RN) | react-native-app |
| flutter, dart | Mobile App (Flutter) | flutter-app |
| portfolio, personal, cv | Portfolio | nextjs-static |
| crm, customer, sales | CRM | nextjs-fullstack |
| saas, subscription, stripe | SaaS | nextjs-saas |
| landing, promotional, marketing | Landing Page | nextjs-static |
| docs, documentation | Documentation | astro-static |
| extension, plugin, chrome | Browser Extension | chrome-extension |
| desktop, electron | Desktop App | electron-desktop |
| cli, command line, terminal | CLI Tool | cli-tool |
| monorepo, workspace | Monorepo | monorepo-turborepo |

## Detection Process

```
1. Tokenize user request
2. Extract keywords
3. Determine project type
4. Detect missing information → forward to conversation-manager
5. Suggest tech stack
```



---
# Content from scaffolding.md

# Project Scaffolding

> Directory structure and core files for new projects.

---

## Next.js Full-Stack Structure (2025 Optimized)

```
project-name/
├── src/
│   ├── app/                        # Routes only (thin layer)
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   ├── (auth)/                 # Route group - auth pages
│   │   │   ├── login/page.tsx
│   │   │   └── register/page.tsx
│   │   ├── (dashboard)/            # Route group - dashboard layout
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   └── api/
│   │       └── [resource]/route.ts
│   │
│   ├── features/                   # Feature-based modules
│   │   ├── auth/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── actions.ts          # Server Actions
│   │   │   ├── queries.ts          # Data fetching
│   │   │   └── types.ts
│   │   ├── products/
│   │   │   ├── components/
│   │   │   ├── actions.ts
│   │   │   └── queries.ts
│   │   └── cart/
│   │       └── ...
│   │
│   ├── shared/                     # Shared utilities
│   │   ├── components/ui/          # Reusable UI components
│   │   ├── lib/                    # Utils, helpers
│   │   └── hooks/                  # Global hooks
│   │
│   └── server/                     # Server-only code
│       ├── db/                     # Database client (Prisma)
│       ├── auth/                   # Auth config
│       └── services/               # External API integrations
│
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
│
├── public/
├── .env.example
├── .env.local
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

## Structure Principles

| Principle | Implementation |
|-----------|----------------|
| **Feature isolation** | Each feature in `features/` with its own components, hooks, actions |
| **Server/Client separation** | Server-only code in `server/`, prevents accidental client imports |
| **Thin routes** | `app/` only for routing, logic lives in `features/` |
| **Route groups** | `(groupName)/` for layout sharing without URL impact |
| **Shared code** | `shared/` for truly reusable UI and utilities |

---

## Core Files

| File | Purpose |
|------|---------|
| `package.json` | Dependencies |
| `tsconfig.json` | TypeScript + path aliases (`@/features/*`) |
| `tailwind.config.ts` | Tailwind config |
| `.env.example` | Environment template |
| `README.md` | Project documentation |
| `.gitignore` | Git ignore rules |
| `prisma/schema.prisma` | Database schema |

---

## Path Aliases (tsconfig.json)

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@/features/*": ["./src/features/*"],
      "@/shared/*": ["./src/shared/*"],
      "@/server/*": ["./src/server/*"]
    }
  }
}
```

---

## When to Use What

| Need | Location |
|------|----------|
| New page/route | `app/(group)/page.tsx` |
| Feature component | `features/[name]/components/` |
| Server action | `features/[name]/actions.ts` |
| Data fetching | `features/[name]/queries.ts` |
| Reusable button/input | `shared/components/ui/` |
| Database query | `server/db/` |
| External API call | `server/services/` |



---
# Content from tech-stack.md

# Tech Stack Selection (2026)

> Default and alternative technology choices for web applications.

## Default Stack (Web App - 2026)

```yaml
Frontend:
  framework: Next.js 16 (Stable)
  language: TypeScript 5.7+
  styling: Tailwind CSS v4
  state: React 19 Actions / Server Components
  bundler: Turbopack (Stable for Dev)

Backend:
  runtime: Node.js 23
  framework: Next.js API Routes / Hono (for Edge)
  validation: Zod / TypeBox

Database:
  primary: PostgreSQL
  orm: Prisma / Drizzle
  hosting: Supabase / Neon

Auth:
  provider: Auth.js (v5) / Clerk

Monorepo:
  tool: Turborepo 2.0
```

## Alternative Options

| Need | Default | Alternative |
|------|---------|-------------|
| Real-time | - | Supabase Realtime, Socket.io |
| File storage | - | Cloudinary, S3 |
| Payment | Stripe | LemonSqueezy, Paddle |
| Email | - | Resend, SendGrid |
| Search | - | Algolia, Typesense |



---
# Content from TEMPLATE.md

---
name: astro-static
description: Astro static site template principles. Content-focused websites, blogs, documentation.
---

# Astro Static Site Template

## Tech Stack

| Component | Technology |
|-----------|------------|
| Framework | Astro 4.x |
| Content | MDX + Content Collections |
| Styling | Tailwind CSS |
| Integrations | Sitemap, RSS, SEO |
| Output | Static/SSG |

---

## Directory Structure

```
project-name/
├── src/
│   ├── components/      # .astro components
│   ├── content/         # MDX content
│   │   ├── blog/
│   │   └── config.ts    # Collection schemas
│   ├── layouts/         # Page layouts
│   ├── pages/           # File-based routing
│   └── styles/
├── public/              # Static assets
├── astro.config.mjs
└── package.json
```

---

## Key Concepts

| Concept | Description |
|---------|-------------|
| Content Collections | Type-safe content with Zod schemas |
| Islands Architecture | Partial hydration for interactivity |
| Zero JS by default | Static HTML unless needed |
| MDX Support | Markdown with components |

---

## Setup Steps

1. `npm create astro@latest {{name}}`
2. Add integrations: `npx astro add mdx tailwind sitemap`
3. Configure `astro.config.mjs`
4. Create content collections
5. `npm run dev`

---

## Deployment

| Platform | Method |
|----------|--------|
| Vercel | Auto-detected |
| Netlify | Auto-detected |
| Cloudflare Pages | Auto-detected |
| GitHub Pages | Build + deploy action |

---

## Best Practices

- Use Content Collections for type safety
- Leverage static generation
- Add islands only where needed
- Optimize images with Astro Image



---
# Content from TEMPLATE.md

---
name: chrome-extension
description: Chrome Extension template principles. Manifest V3, React, TypeScript.
---

# Chrome Extension Template

## Tech Stack

| Component | Technology |
|-----------|------------|
| Manifest | V3 |
| UI | React 18 |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Bundler | Vite |
| Storage | Chrome Storage API |

---

## Directory Structure

```
project-name/
├── src/
│   ├── popup/           # Extension popup
│   ├── options/         # Options page
│   ├── background/      # Service worker
│   ├── content/         # Content scripts
│   ├── components/
│   ├── hooks/
│   └── lib/
│       ├── storage.ts   # Chrome storage helpers
│       └── messaging.ts # Message passing
├── public/
│   ├── icons/
│   └── manifest.json
└── package.json
```

---

## Manifest V3 Concepts

| Component | Purpose |
|-----------|---------|
| Service Worker | Background processing |
| Content Scripts | Page injection |
| Popup | User interface |
| Options Page | Settings |

---

## Permissions

| Permission | Use |
|------------|-----|
| storage | Save user data |
| activeTab | Current tab access |
| scripting | Inject scripts |
| host_permissions | Site access |

---

## Setup Steps

1. `npm create vite {{name}} -- --template react-ts`
2. Add Chrome types: `npm install -D @types/chrome`
3. Configure Vite for multi-entry
4. Create manifest.json
5. `npm run dev` (watch mode)
6. Load in Chrome: `chrome://extensions` → Load unpacked

---

## Development Tips

| Task | Method |
|------|--------|
| Debug Popup | Right-click icon → Inspect |
| Debug Background | Extensions page → Service worker |
| Debug Content | DevTools console on page |
| Hot Reload | `npm run dev` with watch |

---

## Best Practices

- Use type-safe messaging
- Wrap Chrome APIs in promises
- Minimize permissions
- Handle offline gracefully



---
# Content from TEMPLATE.md

---
name: cli-tool
description: Node.js CLI tool template principles. Commander.js, interactive prompts.
---

# CLI Tool Template

## Tech Stack

| Component | Technology |
|-----------|------------|
| Runtime | Node.js 20+ |
| Language | TypeScript |
| CLI Framework | Commander.js |
| Prompts | Inquirer.js |
| Output | chalk + ora |
| Config | cosmiconfig |

---

## Directory Structure

```
project-name/
├── src/
│   ├── index.ts         # Entry point
│   ├── cli.ts           # CLI setup
│   ├── commands/        # Command handlers
│   ├── lib/
│   │   ├── config.ts    # Config loader
│   │   └── logger.ts    # Styled output
│   └── types/
├── bin/
│   └── cli.js           # Executable
└── package.json
```

---

## CLI Design Principles

| Principle | Description |
|-----------|-------------|
| Subcommands | Group related actions |
| Options | Flags with defaults |
| Interactive | Prompts when needed |
| Non-interactive | Support --yes flags |

---

## Key Components

| Component | Purpose |
|-----------|---------|
| Commander | Command parsing |
| Inquirer | Interactive prompts |
| Chalk | Colored output |
| Ora | Spinners/loading |
| Cosmiconfig | Config file discovery |

---

## Setup Steps

1. Create project directory
2. `npm init -y`
3. Install deps: `npm install commander @inquirer/prompts chalk ora cosmiconfig`
4. Configure bin in package.json
5. `npm link` for local testing

---

## Publishing

```bash
npm login
npm publish
```

---

## Best Practices

- Provide helpful error messages
- Support both interactive and non-interactive modes
- Use consistent output styling
- Validate inputs with Zod
- Exit with proper codes (0 success, 1 error)



---
# Content from TEMPLATE.md

---
name: electron-desktop
description: Electron desktop app template principles. Cross-platform, React, TypeScript.
---

# Electron Desktop App Template

## Tech Stack

| Component | Technology |
|-----------|------------|
| Framework | Electron 28+ |
| UI | React 18 |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Bundler | Vite + electron-builder |
| IPC | Type-safe communication |

---

## Directory Structure

```
project-name/
├── electron/
│   ├── main.ts          # Main process
│   ├── preload.ts       # Preload script
│   └── ipc/             # IPC handlers
├── src/
│   ├── App.tsx
│   ├── components/
│   │   ├── TitleBar.tsx # Custom title bar
│   │   └── ...
│   └── hooks/
├── public/
└── package.json
```

---

## Process Model

| Process | Role |
|---------|------|
| Main | Node.js, system access |
| Renderer | Chromium, React UI |
| Preload | Bridge, context isolation |

---

## Key Concepts

| Concept | Purpose |
|---------|---------|
| contextBridge | Safe API exposure |
| ipcMain/ipcRenderer | Process communication |
| nodeIntegration: false | Security |
| contextIsolation: true | Security |

---

## Setup Steps

1. `npm create vite {{name}} -- --template react-ts`
2. Install: `npm install -D electron electron-builder vite-plugin-electron`
3. Create electron/ directory
4. Configure main process
5. `npm run electron:dev`

---

## Build Targets

| Platform | Output |
|----------|--------|
| Windows | NSIS, Portable |
| macOS | DMG, ZIP |
| Linux | AppImage, DEB |

---

## Best Practices

- Use preload script for main/renderer bridge
- Type-safe IPC with typed handlers
- Custom title bar for native feel
- Handle window state (maximize, minimize)
- Auto-updates with electron-updater



---
# Content from TEMPLATE.md

---
name: express-api
description: Express.js REST API template principles. TypeScript, Prisma, JWT.
---

# Express.js API Template

## Tech Stack

| Component | Technology |
|-----------|------------|
| Runtime | Node.js 20+ |
| Framework | Express.js |
| Language | TypeScript |
| Database | PostgreSQL + Prisma |
| Validation | Zod |
| Auth | JWT + bcrypt |

---

## Directory Structure

```
project-name/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── app.ts           # Express setup
│   ├── config/          # Environment
│   ├── routes/          # Route handlers
│   ├── controllers/     # Business logic
│   ├── services/        # Data access
│   ├── middleware/
│   │   ├── auth.ts      # JWT verify
│   │   ├── error.ts     # Error handler
│   │   └── validate.ts  # Zod validation
│   ├── schemas/         # Zod schemas
│   └── utils/
└── package.json
```

---

## Middleware Stack

| Order | Middleware |
|-------|------------|
| 1 | helmet (security) |
| 2 | cors |
| 3 | morgan (logging) |
| 4 | body parsing |
| 5 | routes |
| 6 | error handler |

---

## API Response Format

| Type | Structure |
|------|-----------|
| Success | `{ success: true, data: {...} }` |
| Error | `{ error: "message", details: [...] }` |

---

## Setup Steps

1. Create project directory
2. `npm init -y`
3. Install deps: `npm install express prisma zod bcrypt jsonwebtoken`
4. Configure Prisma
5. `npm run db:push`
6. `npm run dev`

---

## Best Practices

- Layer architecture (routes → controllers → services)
- Validate all inputs with Zod
- Centralized error handling
- Environment-based config
- Use Prisma for type-safe DB access



---
# Content from TEMPLATE.md

---
name: flutter-app
description: Flutter mobile app template principles. Riverpod, Go Router, clean architecture.
---

# Flutter App Template

## Tech Stack

| Component | Technology |
|-----------|------------|
| Framework | Flutter 3.x |
| Language | Dart 3.x |
| State | Riverpod 2.0 |
| Navigation | Go Router |
| HTTP | Dio |
| Storage | Hive |

---

## Directory Structure

```
project_name/
├── lib/
│   ├── main.dart
│   ├── app.dart
│   ├── core/
│   │   ├── constants/
│   │   ├── theme/
│   │   ├── router/
│   │   └── utils/
│   ├── features/
│   │   ├── auth/
│   │   │   ├── data/
│   │   │   ├── domain/
│   │   │   └── presentation/
│   │   └── home/
│   ├── shared/
│   │   ├── widgets/
│   │   └── providers/
│   └── services/
│       ├── api/
│       └── storage/
├── test/
└── pubspec.yaml
```

---

## Architecture Layers

| Layer | Contents |
|-------|----------|
| Presentation | Screens, Widgets, Providers |
| Domain | Entities, Use Cases |
| Data | Repositories, Models |

---

## Key Packages

| Package | Purpose |
|---------|---------|
| flutter_riverpod | State management |
| riverpod_annotation | Code generation |
| go_router | Navigation |
| dio | HTTP client |
| freezed | Immutable models |
| hive | Local storage |

---

## Setup Steps

1. `flutter create {{name}} --org com.{{bundle}}`
2. Update `pubspec.yaml`
3. `flutter pub get`
4. Run code generation: `dart run build_runner build`
5. `flutter run`

---

## Best Practices

- Feature-first folder structure
- Riverpod for state, React Query pattern for server state
- Freezed for immutable data classes
- Go Router for declarative navigation
- Material 3 theming



---
# Content from TEMPLATE.md

---
name: monorepo-turborepo
description: Turborepo monorepo template principles. pnpm workspaces, shared packages.
---

# Turborepo Monorepo Template

## Tech Stack

| Component | Technology |
|-----------|------------|
| Build System | Turborepo |
| Package Manager | pnpm |
| Apps | Next.js, Express |
| Packages | Shared UI, Config, Types |
| Language | TypeScript |

---

## Directory Structure

```
project-name/
├── apps/
│   ├── web/             # Next.js app
│   ├── api/             # Express API
│   └── docs/            # Documentation
├── packages/
│   ├── ui/              # Shared components
│   ├── config/          # ESLint, TS, Tailwind
│   ├── types/           # Shared types
│   └── utils/           # Shared utilities
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

---

## Key Concepts

| Concept | Description |
|---------|-------------|
| Workspaces | pnpm-workspace.yaml |
| Pipeline | turbo.json task graph |
| Caching | Remote/local task caching |
| Dependencies | `workspace:*` protocol |

---

## Turbo Pipeline

| Task | Depends On |
|------|------------|
| build | ^build (dependencies first) |
| dev | cache: false, persistent |
| lint | ^build |
| test | ^build |

---

## Setup Steps

1. Create root directory
2. `pnpm init`
3. Create pnpm-workspace.yaml
4. Create turbo.json
5. Add apps and packages
6. `pnpm install`
7. `pnpm dev`

---

## Common Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Run all apps |
| `pnpm build` | Build all |
| `pnpm --filter @name/web dev` | Run specific app |
| `pnpm --filter @name/web add axios` | Add dep to app |

---

## Best Practices

- Shared configs in packages/config
- Shared types in packages/types
- Internal packages with `workspace:*`
- Use Turbo remote caching for CI



---
# Content from TEMPLATE.md

---
name: nextjs-fullstack
description: Next.js full-stack template principles. App Router, Prisma, Tailwind v4.
---

# Next.js Full-Stack Template (2026 Edition)

## Tech Stack

| Component | Technology | Version / Notes |
|-----------|------------|-----------------|
| Framework | Next.js | v16+ (App Router, Turbopack) |
| Language | TypeScript | v5+ (Strict Mode) |
| Database | PostgreSQL | Prisma ORM (Serverless friendly) |
| Styling | Tailwind CSS | v4.0 (Zero-config, CSS-first) |
| Auth | Clerk / Better Auth | Middleware Protected Routes |
| UI Logic | React 19 | Server Actions, useActionState |
| Validation | Zod | Schema validation (API & Forms) |

---

## Directory Structure

```
project-name/
├── prisma/
│   └── schema.prisma       # Database schema
├── src/
│   ├── app/
│   │   ├── (auth)/         # Route groups for Login/Register
│   │   ├── (dashboard)/    # Protected routes
│   │   ├── api/            # Route Handlers (only for Webhooks/External integration)
│   │   ├── layout.tsx      # Root Layout (Metadata, Providers)
│   │   ├── page.tsx        # Landing Page
│   │   └── globals.css     # Tailwind v4 config (@theme) lives here
│   ├── components/
│   │   ├── ui/             # Reusable UI (Button, Input)
│   │   └── forms/          # Client forms using useActionState
│   ├── lib/
│   │   ├── db.ts           # Prisma singleton client
│   │   ├── utils.ts        # Helper functions
│   │   └── dal.ts          # Data Access Layer (Server-only)
│   ├── actions/            # Server Actions (Mutations)
│   └── types/              # Global TS Types
├── public/
├── next.config.ts          # TypeScript Config
└── package.json
```

---

## Key Concepts (Updated)

| Concept | Description |
|---------|-------------|
| Server Components | Render on server (default). Direct DB access (Prisma) without APIs. |
| Server Actions | Handle Form mutations. Replaces traditional API Routes. Use in action={}. |
| React 19 Hooks | Form state management: useActionState, useFormStatus, useOptimistic. |
| Data Access Layer | Data security. Separation of DB logic (DTOs) for safe reuse. |
| Tailwind v4 | Styling engine. No tailwind.config.js. Config directly in CSS. |

---

## Environment Variables

| Variable | Purpose |
|----------|---------|
| DATABASE_URL | PostgreSQL connection string (Prisma) |
| NEXT_PUBLIC_APP_URL | Public application URL |
| NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY | Auth (if using Clerk) |
| CLERK_SECRET_KEY | Auth Secret (Server only) |

---

## Setup Steps

1. Initialize Project:
   ```bash
   npx create-next-app@latest my-app --typescript --tailwind --eslint
   # Select Yes for App Router
   # Select No for src directory (optional, this template uses src)
   ```

2. Install DB & Validation:
   ```bash
   npm install prisma @prisma/client zod
   npm install -D ts-node # For running seed scripts
   ```

3. Configure Tailwind v4 (If missing):
   Ensure `src/app/globals.css` uses the new import syntax instead of a config file:
   ```css
   @import "tailwindcss";

   @theme {
     --color-primary: oklch(0.5 0.2 240);
     --font-sans: "Inter", sans-serif;
   }
   ```

4. Initialize Database:
   ```bash
   npx prisma init
   # Update schema.prisma
   npm run db:push
   ```

5. Run Developer Server:
   ```bash
   npm run dev --turbo
   # --turbo to enable faster Turbopack
   ```

---

## Best Practices (2026 Standards)

- **Fetch Data**: Call Prisma directly in Server Components (async/await). Do not use useEffect for initial data fetching.
- **Mutations**: Use Server Actions combined with React 19's `useActionState` to handle loading and error states instead of manual useState.
- **Type Safety**: Share Zod schemas between Server Actions (input validation) and Client Forms.
- **Security**: Always validate input data with Zod before passing it to Prisma.
- **Styling**: Use native CSS variables in Tailwind v4 for easier dynamic theming.



---
# Content from TEMPLATE.md

---
name: nextjs-saas
description: Next.js SaaS template principles (2026 Standards). React 19, Server Actions, Auth.js v6.
---

# Next.js SaaS Template (Updated 2026)

## Tech Stack

| Component | Technology | Version / Notes |
|-----------|------------|-----------------|
| Framework | Next.js | v16+ (App Router, React Compiler) |
| Runtime | Node.js | v24 (Krypton LTS) |
| Auth | Auth.js | v6 (formerly NextAuth) |
| Payments | Stripe API | Latest |
| Database | PostgreSQL | Prisma v6 (Serverless Driver) |
| Email | Resend | React Email |
| UI | Tailwind CSS | v4 (Oxide Engine, no config file) |

---

## Directory Structure

```
project-name/
├── prisma/
│   └── schema.prisma    # Database Schema
├── src/
│   ├── actions/         # NEW: Server Actions (Replaces API Routes for data mutation)
│   │   ├── auth-actions.ts
│   │   ├── billing-actions.ts
│   │   └── user-actions.ts
│   ├── app/
│   │   ├── (auth)/      # Route Group: Login, register
│   │   ├── (dashboard)/ # Route Group: Protected routes (App Layout)
│   │   ├── (marketing)/ # Route Group: Landing, pricing (Marketing Layout)
│   │   └── api/         # Only used for Webhooks or Edge cases
│   │       └── webhooks/stripe/
│   ├── components/
│   │   ├── emails/      # React Email templates
│   │   ├── forms/       # Client components using useActionState (React 19)
│   │   └── ui/          # Shadcn UI
│   ├── lib/
│   │   ├── auth.ts      # Auth.js v6 config
│   │   ├── db.ts        # Prisma Singleton
│   │   └── stripe.ts    # Stripe Singleton
│   └── styles/
│       └── globals.css  # Tailwind v4 imports (CSS only)
└── package.json
```

---

## SaaS Features

| Feature | Implementation |
|---------|---------------|
| Auth | Auth.js v6 + Passkeys + OAuth |
| Data Mutation | Server Actions (No API routes) |
| Subscriptions | Stripe Checkout & Customer Portal |
| Webhooks | Asynchronous Stripe event handling |
| Email | Transactional via Resend |
| Validation | Zod (Server-side validation) |

---

## Database Schema

| Model | Fields (Key fields) |
|-------|---------------------|
| User | id, email, stripeCustomerId, subscriptionId, plan |
| Account | OAuth provider data (Google, GitHub...) |
| Session | User sessions (Database strategy) |

---

## Environment Variables

| Variable | Purpose |
|----------|---------|
| DATABASE_URL | Prisma connection string (Postgres) |
| AUTH_SECRET | Replaces NEXTAUTH_SECRET (Auth.js v6) |
| STRIPE_SECRET_KEY | Payments (Server-side) |
| STRIPE_WEBHOOK_SECRET | Webhook verification |
| RESEND_API_KEY | Email sending |
| NEXT_PUBLIC_APP_URL | Application Canonical URL |

---

## Setup Steps

1. Initialize project (Node 24):
   ```bash
   npx create-next-app@latest {{name}} --typescript --eslint
   ```

2. Install core libraries:
   ```bash
   npm install next-auth@beta stripe resend @prisma/client
   ```

3. Install Tailwind v4 (Add to globals.css):
   ```css
   @import "tailwindcss";
   ```

4. Configure environment (.env.local)

5. Sync Database:
   ```bash
   npx prisma db push
   ```

6. Run local Webhook:
   ```bash
   npm run stripe:listen
   ```

7. Run project:
   ```bash
   npm run dev
   ```



---
# Content from TEMPLATE.md

---
name: nextjs-static
description: Modern template for Next.js 16, React 19 & Tailwind v4. Optimized for Landing pages and Portfolios.
---

# Next.js Static Site Template (Modern Edition)

## Tech Stack

| Component | Technology | Notes |
|-----------|------------|-------|
| Framework | Next.js 16+ | App Router, Turbopack, Static Exports |
| Core | React 19 | Server Components, New Hooks, Compiler |
| Language | TypeScript | Strict Mode |
| Styling | Tailwind CSS v4 | CSS-first configuration (No js config), Oxide Engine |
| Animations | Framer Motion | Layout animations & gestures |
| Icons | Lucide React | Lightweight SVG icons |
| SEO | Metadata API | Native Next.js API (Replaces next-seo) |

---

## Directory Structure

Streamlined structure thanks to Tailwind v4 (theme configuration lives inside CSS).

```
project-name/
├── src/
│   ├── app/
│   │   ├── layout.tsx    # Contains root SEO Metadata
│   │   ├── page.tsx      # Landing Page
│   │   ├── globals.css   # Import Tailwind v4 & @theme config
│   │   ├── not-found.tsx # Custom 404 page
│   │   └── (routes)/     # Route groups (about, contact...)
│   ├── components/
│   │   ├── layout/       # Header, Footer
│   │   ├── sections/     # Hero, Features, Pricing, CTA
│   │   └── ui/           # Atomic components (Button, Card)
│   └── lib/
│       └── utils.ts      # Helper functions (cn, formatters)
├── content/              # Markdown/MDX content
├── public/               # Static assets (images, fonts)
├── next.config.ts        # Next.js Config (TypeScript)
└── package.json
```

---

## Static Export Config

Using `next.config.ts` instead of `.js` for better type safety.

```typescript
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',        // Required for Static Hosting (S3, GitHub Pages)
  images: { 
    unoptimized: true      // Required if not using Node.js server image optimization
  },
  trailingSlash: true,     // Recommended for SEO and fixing 404s on some hosts
  reactStrictMode: true,
};

export default nextConfig;
```

---

## SEO Implementation (Metadata API)

Deprecated next-seo. Configure directly in layout.tsx or page.tsx.

```typescript
// src/app/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Product Name',
    default: 'Home - Product Name',
  },
  description: 'SEO optimized description for the landing page.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mysite.com',
    siteName: 'My Brand',
  },
};
```

---

## Landing Page Sections

| Section | Purpose | Suggested Component |
|---------|---------|---------------------|
| Hero | First impression, H1 & Main CTA | `<HeroSection />` |
| Features | Product benefits (Grid/Bento layout) | `<FeaturesGrid />` |
| Social Proof | Partner logos, User numbers | `<LogoCloud />` |
| Testimonials | Customer reviews | `<TestimonialCarousel />` |
| Pricing | Service plans | `<PricingCards />` |
| FAQ | Questions & Answers (Good for SEO) | `<Accordion />` |
| CTA | Final conversion | `<CallToAction />` |

---

## Animation Patterns (Framer Motion)

| Pattern | Usage | Implementation |
|---------|-------|----------------|
| Fade Up | Headlines, paragraphs | `initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}` |
| Stagger | Lists of Features/Cards | Use variants with `staggerChildren` |
| Parallax | Background images or floating elements | `useScroll` & `useTransform` |
| Micro-interactions | Hover buttons, click effects | `whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}` |

---

## Setup Steps

1. Initialize Project:
   ```bash
   npx create-next-app@latest my-site --typescript --tailwind --eslint
   # Select 'Yes' for App Router
   # Select 'No' for 'Would you like to customize the default import alias?'
   ```

2. Install Auxiliary Libraries:
   ```bash
   npm install framer-motion lucide-react clsx tailwind-merge
   # clsx and tailwind-merge help handle dynamic classes better
   ```

3. Configure Tailwind v4 (in `src/app/globals.css`):
   ```css
   @import "tailwindcss";

   @theme {
     --color-primary: #3b82f6;
     --font-sans: 'Inter', sans-serif;
   }
   ```

4. Development:
   ```bash
   npm run dev --turbopack
   ```

---

## Deployment

| Platform | Method | Important Notes |
|----------|--------|-----------------|
| Vercel | Git Push | Auto-detects Next.js. Best for performance. |
| GitHub Pages | GitHub Actions | Need to set `basePath` in `next.config.ts` if not using a custom domain. |
| AWS S3 / CloudFront | Upload out folder | Ensure Error Document is configured to `404.html`. |
| Netlify | Git Push | Set build command to `npm run build`. |

---

## Best Practices (Modern)

- **React Server Components (RSC)**: Default all components to Server Components. Only add `'use client'` when you need state (`useState`) or event listeners (`onClick`).
- **Image Optimization**: Use the `<Image />` component but remember `unoptimized: true` for static export or use an external image CDN (Cloudinary/Imgix).
- **Font Optimization**: Use `next/font` (Google Fonts) to automatically host fonts and prevent layout shift.
- **Responsive**: Mobile-first design using Tailwind prefixes like `sm:`, `md:`, `lg:`.



---
# Content from TEMPLATE.md

---
name: nuxt-app
description: Nuxt 4 full-stack template. Vue 3 (Vapor), Pinia, Tailwind v4, Prisma.
---

# Nuxt 4 Full-Stack Template (2026 Edition)

Mẫu template Full-Stack hiện đại cho Nuxt 4, tối ưu hóa hiệu suất với Vue Vapor Mode và Tailwind v4.

## Tech Stack

| Component | Technology | Version / Notes |
|-----------|------------|-----------------|
| Framework | Nuxt | v4.0+ (App Directory structure) |
| UI Engine | Vue | v3.6+ (Vapor Mode enabled) |
| Language | TypeScript | v5+ (Strict Mode) |
| State | Pinia | v3+ (Store syntax) |
| Database | PostgreSQL | Prisma ORM |
| Styling | Tailwind CSS | v4.0 (Vite Plugin, Zero-config) |
| UI Lib | Nuxt UI | v3 (Tailwind v4 native) |
| Validation | Zod | Schema validation |

---

## Directory Structure (Nuxt 4 Standard)

Sử dụng cấu trúc `app/` để giữ thư mục gốc gọn gàng.

```
project-name/
├── app/                  # Application Source
│   ├── assets/
│   │   └── css/
│   │       └── main.css  # Tailwind v4 imports
│   ├── components/       # Auto-imported components
│   ├── composables/      # Auto-imported logic
│   ├── layouts/
│   ├── pages/            # File-based routing
│   ├── app.vue           # Root component
│   └── router.options.ts
├── server/               # Nitro Server Engine
│   ├── api/              # API Routes (e.g. /api/users)
│   ├── routes/           # Server Routes
│   └── utils/            # Server-only helpers (Prisma)
├── prisma/
│   └── schema.prisma
├── public/
├── nuxt.config.ts        # Main Config
└── package.json
```

---

## Key Concepts (2026)

| Concept | Description | Future Update |
|---------|-------------|---------------|
| **App Directory** | `app/` | Tách biệt mã nguồn ứng dụng và file cấu hình root. |
| **Vapor Mode** | Opt-in performance | Render không cần Virtual DOM (như SolidJS). Bật trong `nuxt.config`. |
| **Server Functions** | RPC-style calls | Gọi hàm server trực tiếp từ client (thay thế dần API routes thủ công). |
| **Tailwind v4** | CSS-first | Cấu hình theme trực tiếp trong CSS, không cần `tailwind.config.js`. |
| **Nuxt Islands** | Server Components | Render component cô lập trên server (`<NuxtIsland name="..." />`). |

---

## Environment Variables

| Variable | Purpose |
|----------|---------|
| DATABASE_URL | Prisma connection string (PostgreSQL) |
| NUXT_PUBLIC_APP_URL | Canonical URL |
| NUXT_SESSION_PASSWORD | Session encryption key |

---

## Setup Steps

1. Initialize Project:
   ```bash
   npx nuxi@latest init my-app
   # Select "Nuxt 4 structure" if prompted
   ```

2. Install Core Deps:
   ```bash
   npm install @pinia/nuxt @prisma/client zod
   npm install -D prisma
   ```

3. Setup Tailwind v4:
   Install the Vite plugin (new standard):
   ```bash
   npm install tailwindcss @tailwindcss/vite
   ```

   Add to `nuxt.config.ts`:
   ```ts
   import tailwindcss from '@tailwindcss/vite'
   export default defineNuxtConfig({
     vite: {
       plugins: [tailwindcss()]
     },
     css: ['~/assets/css/main.css']
   })
   ```

4. Configure CSS:
   In `app/assets/css/main.css`:
   ```css
   @import "tailwindcss";
   @theme {
     --color-primary: oklch(0.6 0.15 150);
   }
   ```

5. Run Development:
   ```bash
   npm run dev
   # Runs with Turbo/Vite
   ```

---

## Best Practices

- **Vapor Mode**: Kích hoạt cho các component nặng về render:
  ```ts
  <script setup lang="ts" vapor>
  // Component này sẽ compile sang chế độ Vapor (No VDOM)
  </script>
  ```
- **Data Fetching**: Sử dụng `useFetch` với `server: false` cho các tác vụ client-only, hoặc dùng Server Functions để type-safety tốt hơn.
- **State**: Dùng `defineStore` (Pinia) cho global state, `useState` của Nuxt cho state đơn giản chia sẻ giữa Server/Client.
- **Type Safety**: Tự động tạo type cho API routes (`$fetch` typed automatically).



---
# Content from TEMPLATE.md

---
name: python-fastapi
description: FastAPI REST API template principles. SQLAlchemy, Pydantic, Alembic.
---

# FastAPI API Template

## Tech Stack

| Component | Technology |
|-----------|------------|
| Framework | FastAPI |
| Language | Python 3.11+ |
| ORM | SQLAlchemy 2.0 |
| Validation | Pydantic v2 |
| Migrations | Alembic |
| Auth | JWT + passlib |

---

## Directory Structure

```
project-name/
├── alembic/             # Migrations
├── app/
│   ├── main.py          # FastAPI app
│   ├── config.py        # Settings
│   ├── database.py      # DB connection
│   ├── models/          # SQLAlchemy models
│   ├── schemas/         # Pydantic schemas
│   ├── routers/         # API routes
│   ├── services/        # Business logic
│   ├── dependencies/    # DI
│   └── utils/
├── tests/
├── .env.example
└── requirements.txt
```

---

## Key Concepts

| Concept | Description |
|---------|-------------|
| Async | async/await throughout |
| Dependency Injection | FastAPI Depends |
| Pydantic v2 | Validation + serialization |
| SQLAlchemy 2.0 | Async sessions |

---

## API Structure

| Layer | Responsibility |
|-------|---------------|
| Routers | HTTP handling |
| Dependencies | Auth, validation |
| Services | Business logic |
| Models | Database entities |
| Schemas | Request/response |

---

## Setup Steps

1. `python -m venv venv`
2. `source venv/bin/activate`
3. `pip install fastapi uvicorn sqlalchemy alembic pydantic`
4. Create `.env`
5. `alembic upgrade head`
6. `uvicorn app.main:app --reload`

---

## Best Practices

- Use async everywhere
- Pydantic v2 for validation
- SQLAlchemy 2.0 async sessions
- Alembic for migrations
- pytest-asyncio for tests



---
# Content from TEMPLATE.md

---
name: react-native-app
description: React Native mobile app template principles. Expo, TypeScript, navigation.
---

# React Native App Template (2026 Edition)

Modern mobile app template, optimized for New Architecture and React 19.

## Tech Stack

| Component | Technology | Version / Notes |
|-----------|------------|-----------------|
| Core | React Native + Expo | SDK 52+ (New Architecture Enabled) |
| Language | TypeScript | v5+ (Strict Mode) |
| UI Logic | React | v19 (React Compiler, auto-memoization) |
| Navigation | Expo Router | v4+ (File-based, Universal Links) |
| Styling | NativeWind | v4.0 (Tailwind v4, CSS-first config) |
| State | Zustand + React Query | v5+ (Async State Management) |
| Storage | Expo SecureStore | Encrypted local storage |

---

## Directory Structure

Standardized structure for Expo Router and NativeWind v4.

```
project-name/
├── app/                 # Expo Router (File-based routing)
│   ├── _layout.tsx      # Root Layout (Stack/Tabs config)
│   ├── index.tsx        # Main Screen
│   ├── (tabs)/          # Route Group for Tab Bar
│   │   ├── _layout.tsx
│   │   ├── home.tsx
│   │   └── profile.tsx
│   ├── +not-found.tsx   # 404 Page
│   └── [id].tsx         # Dynamic Route (Typed)
├── components/
│   ├── ui/              # Primitive Components (Button, Text)
│   └── features/        # Complex Components
├── hooks/               # Custom Hooks
├── lib/
│   ├── api.ts           # Axios/Fetch client
│   └── storage.ts       # SecureStore wrapper
├── store/               # Zustand stores
├── constants/           # Colors, Theme config
├── assets/              # Fonts, Images
├── global.css           # Entry point for NativeWind v4
├── tailwind.config.ts   # Tailwind Config (if custom theme needed)
├── babel.config.js      # NativeWind Babel Plugin
└── app.json             # Expo Config
```

---

## Navigation Patterns (Expo Router)

| Pattern | Description | Implement |
|---------|-------------|-----------|
| Stack | Hierarchical navigation (Push/Pop) | `<Stack />` in `_layout.tsx` |
| Tabs | Bottom navigation bar | `<Tabs />` in `(tabs)/_layout.tsx` |
| Drawer | Side slide-out menu | `expo-router/drawer` |
| Modals | Overlay screens | `presentation: 'modal'` in Stack screen |

---

## Key Packages & Purpose

| Package | Purpose |
|---------|---------|
| expo-router | File-based routing (Next.js like) |
| nativewind | Use Tailwind CSS classes in React Native |
| react-native-reanimated | Smooth animations (runs on UI thread) |
| @tanstack/react-query | Server state management, caching, pre-fetching |
| zustand | Global state management (lighter than Redux) |
| expo-image | Optimized image rendering for performance |

---

## Setup Steps (2026 Standard)

1. Initialize Project:
   ```bash
   npx create-expo-app@latest my-app --template default
   cd my-app
   ```

2. Install Core Dependencies:
   ```bash
   npx expo install expo-router react-native-safe-area-context react-native-screens expo-link expo-constants expo-status-bar
   ```

3. Install NativeWind v4:
   ```bash
   npm install nativewind tailwindcss react-native-reanimated
   ```

4. Configure NativeWind (Babel & CSS):
   - Add plugin to `babel.config.js`: `plugins: ["nativewind/babel"]`.
   - Create `global.css` with: `@import "tailwindcss";`.
   - Import `global.css` in `app/_layout.tsx`.

5. Run Project:
   ```bash
   npx expo start -c
   # Press 'i' for iOS simulator or 'a' for Android emulator
   ```

---

## Best Practices (Updated)

- **New Architecture**: Ensure `newArchEnabled: true` in `app.json` to leverage TurboModules and Fabric Renderer.
- **Typed Routes**: Use Expo Router's "Typed Routes" feature for type-safe routing (e.g., `router.push('/path')`).
- **React 19**: Reduce usage of `useMemo` or `useCallback` thanks to React Compiler (if enabled).
- **Components**: Build UI primitives (Box, Text) with NativeWind className for reusability.
- **Assets**: Use `expo-image` instead of default `<Image />` for better caching and performance.
- **API**: Always wrap API calls with TanStack Query, avoid direct calls in `useEffect`.
