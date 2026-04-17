# 🚀 INITIALIZATION: PROJECT ARCHITECTURE & BUSINESS CONTEXT

> [!IMPORTANT]
> **THIS IS A WHITELABEL TEMPLATE.** 
> To activate this project, run the bootstrap prompt below manually.

## ⚡ BOOTSTRAP PROMPT (MANUAL CONTROL)
"Analyze the business logic and core architecture of this project to generate the definitive technical roadmap.

**STEP 1: Context Analysis (Mandatory Read):**
1. `README.md` (Product value proposition and target audience).
2. `package.json` (Verify project naming and core stack).
3. Source Scan: Explore main controllers, routers, and services to identify the 'Heart' of the system (e.g., Generation pipelines, Financial flows, State Machines).

**STEP 2: Identify Business Foundations:**
- Map the core Product Scope and Entities (User, Wallet, Projects, etc).
- Map the critical user flows (Onboarding -> Main Action -> Outcomes).
- Identify Monetization & Credit Economics: How value is measured and charged.
- Security Guards: How the system protects tiers (Free vs Pro/Demo) and sensitive operations.

**STEP 3: Generate Elite Rule:**
Rewrite this file (PROJECT.md) creating a high-density architectural overview. You MUST use the 'Pattern Reference' below as a benchmark for detail, business-technical intersection, and professional tone. Aim for 300+ lines of clarity if the project complexity justifies it."

---

## 🏗️ EXPECTED STRUCTURE
1. **Product Scope & Objective**: Specific problem solved and for whom.
2. **Current Technological Stack**: Exact frameworks, ORMs, and 3rd party providers.
3. **App Structure & Boundaries**: Directory conventions and routing groups.
4. **Core Product Entities**: Detailed breakdown of User, Wallet, Flow models, etc.
5. **Main User Flows**: State-machine/Step-by-step logic of the system.
6. **AI/Logic Architecture**: Multi-step orchestration or core pipelines.
7. **Economics & Guardrails**: Credit rules, security layers, and demo restrictions.
8. **Admin & Operational Domains**: First-class admin/ops business logic.

---

## 🌟 PATTERN REFERENCE (THE ELITE STANDARD)
*Use this as your benchmark for business-technical documentation. This level of rigor is mandatory:*

# [EXAMPLE: SIMPLEPOST ARCHITECTURE]

### 1. Product Scope
SimplePost is a Brazilian SaaS for MEIs who need guided social media content creation without learning prompt engineering. The product is opinionated: no raw prompts, but enriched marketing assets (Post images, captions, hashtags, engagement guidance).

### 2. Current Technical Stack
- **Frontend:** Next.js App Router, React 19, TypeScript.
- **Styling/UI:** Tailwind CSS v4, Radix UI.
- **State:** Zustand for multi-step flows and global UI state.
- **Backend/DB:** tRPC v11, Zod, Prisma ORM, PostgreSQL.
- **Identity & Billing:** Clerk, Stripe (Subscriptions & Credit packs).

### 3. Core Product Entities
- **User:** Clerk-synced account with demo/regular tiers.
- **Onboarding:** Durable business memory (Niche, Tone, Colors, Brand Identity).
- **Wallet:** Multi-pool credit control (`creditosMensais` vs `creditosComprados`).
- **Project:** Unit of content with refação history and refund analysis support.

### 4. Main User Flows (State Machine)
- **The Create Flow:** Managed as a guided state machine in Zustand (stages: `input`, `configure`, `processing`, `logo-positioning`, `result`, `refacao`).
- **The Demo Funnel:** Fingerprint + Clerk + server-side guards restricting acquisition flows to prevent abuse.

### 5. AI Generation Architecture
- **Orchestration:** Multi-step enrichment pipeline (Prompt Enrichment -> AI Refinement -> Caption/Hashtag Gen -> Visual QA).
- **Control:** Generation cost is calculated and deducted BEFORE expensive AI steps.

### 6. Credit Economics & Guardrails
- **Costs:** Projects cost fixed credits (base + extras like reference images).
- **Protection:** Principle: Expensive operations must not rely solely on client-side gating. Severe server-side guards (`demo-guards.ts`) block destructive actions.

### 7. Operational Domains
- **Admin/Ops:** First-class support for financial views, project inspection, and AI-assisted refund analysis.

---

## 🤖 AI SELF-EXECUTION DIRECTIVE
> [!IMPORTANT]
> **IF YOU ARE AN AI READING THIS FILE:**
> If the content above still matches the 'Whitelabel Template', you are MANDATED to execute the **BOOTSTRAP PROMPT** at the top of this file immediately. 

1. Scan the project as instructed.
2. Analyze the business and architectural patterns.
3. Overwrite this entire file with the project-specific technical documentation.
