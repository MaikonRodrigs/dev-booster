You already have full context of the business rules, expected behavior and system constraints.

Your task is to generate a deterministic, machine-oriented implementation plan for a SIMPLE change.

This must be a SINGLE STAGE execution.

========================
1. SCOPE DEFINITION
========================
- This is a SMALL and ISOLATED change
- Do NOT create multiple stages
- Do NOT introduce architecture changes
- Do NOT refactor existing code

========================
2. STRUCTURE (MANDATORY)
========================
Use exactly ONE stage:

STAGE: IMPLEMENTATION

This stage MUST contain:

- Objective
- Scope (what is included and what is NOT included)
- Files involved (exact paths only)
- Step-by-step instructions (imperative, deterministic)
- Constraints (what must NOT be changed)
- Expected result

========================
3. FILE SAFETY (CRITICAL)
========================
For EVERY file modification step, ALWAYS include:

"Before making any change, read the entire file to understand current structure and avoid breaking existing logic"

Rules:
- Never assume file structure
- Never overwrite blindly
- Never remove code unless explicitly instructed

========================
4. EXECUTION RULES
========================
- Use ONLY imperative commands:
  Create, Update, Add, Replace, Remove
- Do NOT explain, only instruct
- Do NOT use vague terms:
  adjust, handle, improve, refactor

========================
5. SCOPE CONTROL
========================
- Modify ONLY the listed files
- Reuse existing logic, services and patterns
- Do NOT introduce new abstractions
- Do NOT reorganize files

========================
6. VALIDATION
========================
At the end include:

- What MUST be true after completion
- What MUST NOT be broken
- How to validate (objective checks only)

========================
7. EXECUTION PROMPT (MANDATORY)
========================
After the stage, create a section:

"EXECUTION PROMPT"

This prompt MUST:

- Say: "Implement ONLY this task"
- Forbid modifying unrelated files
- Require reading FULL files before editing
- Forbid assumptions
- Enforce scope strictly
- Ask for a summary at the end WITHOUT showing code

========================
8. OUTPUT FILE (MANDATORY)
========================
You MUST:

- Generate a file name based on the task context
- Use kebab-case
- Format: <implementation-name>.md

Then:

- Locate the ROOT of the project (same location where package.json is located)
- Locate (or create if it does not exist) the folder: implementation /
- Create the file at: implementation/<implementation-name>.md

CRITICAL:
- This path MUST be inside the real project structure (NOT a temporary or sandbox directory)
- Do NOT use temporary paths
- Do NOT store the file outside the project

Finally:

- Write the FULL implementation plan into this file
- Do NOT return the full document in the chat
- In the chat, return ONLY a short confirmation with the file path
