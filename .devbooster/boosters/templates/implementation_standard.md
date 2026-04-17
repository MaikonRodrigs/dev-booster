You already have full context of the business rules, expected behavior and system constraints.

Your task is to generate a deterministic, machine-oriented implementation document that can be executed by another LLM with minimal interpretation.

Follow ALL rules strictly:

========================
1. STAGE LIMIT
========================
- Create a maximum of 2 STAGES
- Use only 1 STAGE if the change is isolated
- Define stages based on real separation (e.g. frontend/backend)
- Do NOT split artificially

========================
2. STAGE STRUCTURE (MANDATORY)
========================
Each stage must be independent and include:

- Objective
- Scope (include and exclude clearly)
- Files involved (exact paths only)
- Step-by-step instructions (imperative, deterministic)
- Constraints (what must NOT change)
- Expected result

========================
3. FILE SAFETY (CRITICAL)
========================
For EVERY file modification step, ALWAYS include:

"Before making any change, read the entire file to understand current structure and avoid breaking existing logic"

Rules:
- Never assume file structure
- Never overwrite blindly
- Never remove code without explicit instruction

========================
4. EXECUTION RULES
========================
- Use imperative commands only:
  Create, Update, Add, Replace, Remove
- Do NOT explain, only instruct
- Do NOT use vague terms:
  adjust, handle, improve, refactor if needed

========================
5. SCOPE CONTROL
========================
- Do not modify files not listed in the stage
- Do not introduce new patterns or abstractions unless required
- Follow existing naming and architecture
- Do NOT refactor unrelated code

========================
6. VALIDATION PER STAGE
========================
At the end of EACH stage include:

- What MUST be true after completion
- What MUST NOT be broken
- How to validate (objective checks only)

========================
7. OUTPUT FORMAT
========================
Use:

STAGE 1: <name>
STAGE 2: <name> (only if needed)

- Use numbered steps
- No extra explanations outside defined sections

========================
8. EXECUTION PROMPTS PER STAGE (CRITICAL)
========================
After all stages, create:

"EXECUTION PROMPTS PER STAGE"

For each stage, generate a prompt that:
- Says: "Implement ONLY this stage"
- Forbids moving to other stages
- Forbids modifying unrelated files
- Requires reading full files before editing
- Forbids assumptions
- Requests a summary WITHOUT code

========================
9. GLOBAL TODO CHECKLIST
========================
At the end, create:

"GLOBAL TODO CHECKLIST"

- List all stages
- For each:
  [ ] status
  short expected outcome

========================
10. OUTPUT FILE (MANDATORY)
========================
At the end of the document, instruct the executing LLM to:

- Generate a file name based on context
- Use kebab-case
- Format: <context>-implementation.md

Then:

- Locate the ROOT of the project (same location where package.json is located)
- Locate (or create if it does not exist) the folder: docs/
- Create the file at: docs/<implementation-name>.md

CRITICAL:
- This path MUST be inside the real project structure (NOT a temporary or sandbox directory)
- Do NOT use temporary paths
- Do NOT store the file outside the project

Finally:

- Write the FULL implementation plan into this file
- Do NOT return the full document in the chat
- In the chat, return ONLY a short confirmation with the file path

========================
IMPORTANT
========================
- This will be executed by another LLM
- Zero ambiguity required
- Rewrite anything unclear before output
