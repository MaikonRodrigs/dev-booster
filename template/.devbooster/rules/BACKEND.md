# 🛠️ INITIALIZATION: BACKEND & COMMUNICATION ARCHITECTURE

> [!IMPORTANT]
> **THIS IS A WHITELABEL TEMPLATE.** 
> To activate this project, run the bootstrap prompt below manually.

## ⚡ BOOTSTRAP PROMPT (MANUAL CONTROL)
"Analyze the backend ecosystem and communication patterns of this project to generate the definitive technical documentation.

**STEP 1: Context Analysis (Mandatory Read):**
1. `package.json` (Identify API/DB/Auth frameworks and libraries).
2. `README.md` (Understand the project's core purpose).
3. Directory Scan: Search for patterns in `src/server/`, `src/app/api/`, `src/actions/`, or direct `fetch` calls within components to understand how the frontend communicates with the data layer.
4. Data Structure: Locate the database schema (e.g., `prisma/schema.prisma`, `schema.ts`, or connection config files).

**STEP 2: Identify Real Architecture:**
- Determine if communication is via tRPC, Route Handlers, Server Actions, REST, or direct fetch.
- Identify how Auth is injected (Middlewares vs Context).
- Map how errors are handled (e.g., `TRPCError` vs `NextResponse` codes).

**STEP 3: Generate Elite Rule:**
Rewrite this file (BACKEND.md) documenting the exact patterns found in this project. You MUST use the 'Pattern Reference' below as a benchmark for quality and tone of voice. Document with technical depth issues such as Race Conditions, Sanitization, Retry logic, and persistence flows. The goal is for any new agent to understand the server architecture in 1 minute."

---

## 🏗️ EXPECTED STRUCTURE
1. **Communication Strategy**: Deep dive into the identified pattern (Decentralized Fetch, Centralized API, Hooks, etc).
2. **Data Persistence & ORM**: Mapping the storage layer (SQL, NoSQL, LocalStorage, or External APIs).
3. **Authentication & Identity**: How the system knows 'who' is making the request and 'what' they can do.
4. **Error Handling & Resiliency**: Standards for failures, retries, and input protection.
5. **Directory Map**: A visual guide of where the 'Server/API' logic resides.

---

## 🌟 PATTERN REFERENCE (THE ELITE STANDARD)
*Use this as your benchmark for technical precision. Even if the technology differs, the depth of detail must match:*

### 1. Stack & Directory Structure (Example: T3 Stack)
- **API Engine:** tRPC (`@trpc/server`) + Zod for validation.
- **Database:** Prisma ORM connected to Neon (PostgreSQL).
- **Directories:** 
  - `src/server/api/routers/*`: All tRPC routers.
  - `src/lib/*`: Core business logic (Cost calculators, Sanitizers).

### 2. API Operations & Procedures
- **Procedures:** `publicProcedure` (Open), `privateProcedure` (Clerk Auth), `adminProcedure` (Role check).
- **Validation:** Every input must be heavily validated with `.input(z.object({...}))`. 
- **Errors:** Throw `TRPCError` with codes like `NOT_FOUND`, `FORBIDDEN`, `CONFLICT`.

### 3. Database & Resiliency
- **Race Conditions:** Use `upsert` or `findUnique` followed by `create` for syncing external IDs.
- **Error Handling:** Use `isPrismaSchemaError()` to translate database schema issues into user-friendly messages.

### 4. Auth & Identity Management
- **Syncing:** Clerk handles the JWT. The backend syncs data into Prisma's `User` schema via `currentUser()`.
- **Demo Guards:** Use `enforceNonDemoUser(ctx.db, ctx.userId)` to block destructive mutations for temporary accounts.

### 5. Business Logic & Reliability
- **Input Sanitization:** ALWAYS run `sanitizeData(rawInput)` before processing data.
- **External API Reliability:** Wrap calls (OpenAI/Stripe) inside `retryWithBackoff(operation, name)`.
- **Credit Logic:** Cascading deduction (debit `creditosComprados` first).

---

## 🤖 AI SELF-EXECUTION DIRECTIVE
> [!IMPORTANT]
> **IF YOU ARE AN AI READING THIS FILE:**
> If the content above still matches the 'Whitelabel Template', you are MANDATED to execute the **BOOTSTRAP PROMPT** at the top of this file immediately. 

1. Scan the project as instructed.
2. Analyze the communication patterns.
3. Overwrite this entire file with the project-specific technical documentation.
