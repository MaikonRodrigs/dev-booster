You already have full context of the business rules, architecture and expected behavior.

Your task is to generate a deterministic, machine-oriented implementation document that can be executed by another LLM with minimal interpretation.

Follow ALL rules strictly:

========================
1. STRUCTURE (MANDATORY)
========================
- Break the implementation into clear STAGES
- Each stage must be independent and executable in isolation

Each stage MUST contain:
- Objective
- Scope (what is included and what is NOT included)
- Files involved (exact paths)
- Step-by-step instructions (deterministic, imperative)
- Constraints (what must NOT be changed)
- Expected result

========================
2. FILE SAFETY (CRITICAL)
========================
For EVERY file modification step, ALWAYS include:
"Before making any change, read the entire file to understand current structure and avoid breaking existing logic"

- Never assume file structure
- Never overwrite blindly

========================
3. DETERMINISTIC EXECUTION
========================
- Do NOT explain, DO instruct
- Use imperative commands only:
  "Create", "Update", "Add", "Replace"
- No vague phrases like:
  "adjust accordingly", "handle logic", "improve"

========================
4. NO ASSUMPTIONS
========================
- Do not invent structures
- Do not create abstractions unless explicitly required
- Do not modify files not listed in the stage

========================
5. CONSISTENCY RULES
========================
- Follow existing naming conventions
- Reuse existing patterns
- Do NOT refactor unrelated code

========================
6. VALIDATION PER STAGE
========================
At the end of EACH stage include:
- What MUST be true after completion
- What MUST NOT be broken
- How to validate the result

========================
7. GRANULARITY
========================
- Prefer small, safe, atomic steps
- Each step must be reversible

========================
8. OUTPUT FORMAT
========================
- Use:
  STAGE 1: <name>
  STAGE 2: <name>
- Use clear bullet points or numbered steps
- No unnecessary explanations

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

========================
9. STAGE PROMPTS (CRITICAL)
========================
After ALL stages, create a section called:

"EXECUTION PROMPTS PER STAGE"

For EACH stage, generate a strict execution prompt that:
- explicitly says: "implement ONLY this stage"
- forbids moving to next stages
- forbids modifying unrelated files
- instructs to read full files before editing
- asks for a summary at the end WITHOUT showing code

========================
10. GLOBAL TODO CHECKLIST (FINAL)
========================
At the VERY END of the document, create a section:

"GLOBAL TODO CHECKLIST"

- List ALL stages
- For each stage include:
  - status placeholder (e.g. [ ] / [x])
  - short description of expected result

========================
IMPORTANT
========================
- This document will be executed by another LLM
- Your goal is ZERO ambiguity
- If any instruction is ambiguous, rewrite it to be explicit BEFORE outputting
