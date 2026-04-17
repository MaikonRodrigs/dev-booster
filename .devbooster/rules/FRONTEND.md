# 🎨 INITIALIZATION: FRONTEND PRACTICES & UI ARCHITECTURE

> [!IMPORTANT]
> **THIS IS A WHITELABEL TEMPLATE.** 
> To activate this project, run the bootstrap prompt below manually.

## ⚡ BOOTSTRAP PROMPT (MANUAL CONTROL)
"Analyze the frontend ecosystem and UI architecture of this project to generate the definitive technical documentation.

**STEP 1: Context Analysis (Mandatory Read):**
1. `package.json` (Identify Frameworks, Styling libraries, State Managers, and Iconography).
2. `globals.css` (Identify Tailwind version, CSS-in-JS, or global design tokens).
3. Directory Scan: Search for patterns in `src/app/` or `src/pages/` to identify the Routing system.
4. Component Audit: Scan `src/components/` to identify the UI library (ShadCN, MUI, Mantine) and component structure.

**STEP 2: Identify Real Architecture:**
- Determine the Styling strategy: Tailwind v3, v4, CSS Modules, or Styled-components.
- Map State Management: Identify if the project uses Zustand, Redux, Context API, or local state.
- Form Handling: Identify the engine (Formik, React Hook Form, or Native).
- Data Consumption: Map how the UI consumes data (tRPC hooks, SWR, React Query, or raw fetch).

**STEP 3: Generate Elite Rule:**
Rewrite this file (FRONTEND.md) documenting the exact patterns found in this project. You MUST use the 'Pattern Reference' below as a benchmark for quality, design philosophy (Anti-Generic), and technical depth. Document with precision how to handle stages, form validation, and global loading states. The goal is for any new agent to understand the UI architecture and design language in 1 minute."

---

## 🏗️ EXPECTED STRUCTURE
1. **Stack & Architecture**: Framework, directory structure of pages and components.
2. **Styling & Design System**: Styling engine rules, color system tokens, and utility standards.
3. **State Management & UI Machines**: Global stores, local UI orchestration, and stage machine logic.
4. **Forms & Validation**: Standard engine, schema validation patterns, and visual feedback rules.
5. **Data Consumption**: Implementation patterns for mutations, queries, and optimistic updates.
6. **Iconography & UI Elements**: Library sizing, loading indicators, and layout wrappers.

---

## 🌟 PATTERN REFERENCE (THE ELITE STANDARD)
*Use this as your benchmark for UI/UX engineering detail. Maintain this level of rigor regardless of the stack:*

### 1. Stack & Architecture (Example: Next.js + Tailwind v4)
- **Framework:** Next.js (App Router) with isolation between `(pages)` and `(auth)`.
- **Styling:** Tailwind CSS v4 using semantic tokens (e.g., `bg-primary`, `text-muted-foreground`).
- **UI Base:** ShadCN primitives for consistent accessible components.

### 2. State Management & UI Machines (Zustand)
- **Patterns:** Utilize Zustand stores to manage complex 'Stage' states in multi-step interfaces.
- **Consumption:** Use `React.useMemo` with `switch` statements for clean stage-based rendering to avoid ternary hell.

### 3. Forms & Validation (Formik + Yup)
- **Engine:** `useFormik` hook for all forms.
- **Schema:** Strict validation built in `src/schema/` and imported via `validationSchema`.
- **Feedback:** Use `cn()` to apply conditional error classes (e.g., `border-destructive`).

### 4. Data Consumption & Feedback
- **Mutations:** Use specialized hooks (e.g., tRPC `useMutation`) with explicit `onSuccess` and `onError` blocks.
- **Global Loading:** Trigger global overlays (e.g., particle loaders) via central stores for heavy operations.

### 5. Iconography & UI Elements
- **Library:** `lucide-react`.
- **Sizing:** Standard props `size={24}` (preferred over `className`).
- **Loaders:** `Loader2` with `animate-spin` as the default project spinner.

### 6. Layout Wrappers
- **Auth Guard:** All protected pages MUST be wrapped in `<AuthTemplate>`.
- **Feedback:** Use `sonner` for toast notifications and Dialogs for destructive confirmation.

---

## 🤖 AI SELF-EXECUTION DIRECTIVE
> [!IMPORTANT]
> **IF YOU ARE AN AI READING THIS FILE:**
> If the content above still matches the 'Whitelabel Template', you are MANDATED to execute the **BOOTSTRAP PROMPT** at the top of this file immediately. 

1. Scan the project as instructed.
2. Analyze the frontend patterns.
3. Overwrite this entire file with the project-specific technical documentation.
