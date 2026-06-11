---
name: user-preferences
priority: P0.2 (Preferences)
description: Dynamic Scratchpad - Experimental patterns and recently approved rules.
---

# 🧠 PROJECT PATTERNS MEMORY (Scratchpad)

This file operates as a "real-time scratchpad" for the AI and the Developer. The core of the project's architecture lives in `FRONTEND.md`, `BACKEND.md`, and `PROJECT.md`.

- This file captures development preferences and emergent decisions using the `@SavePattern` trigger (defined in `PROTOCOL.md`).
- It ensures consistency in the short term. Periodically, the consolidated patterns born here will be migrated to the official frontend or backend files and removed from here.


---

## 📝 EXPERIMENTAL PATTERNS & NEW RULES
*(The AI will save newly discovered patterns below this line, categorizing them appropriately)*

---

### 🔄 AUTOMATION: MIGRATION PROMPT (EXPERT MODE)
*Save this prompt. Paste it in the chat when the area above starts getting crowded to automate the cleanup:*

> **Prompt for the AI:**
> "Act as a Software Architect. Read the 'EXPERIMENTAL PATTERNS' section in my `USER_PREFERENCES.md`. Take all the rules listed there and perform the migration following these guidelines:
> 
> 1. **Mapping:** Identify whether the rule belongs to `FRONTEND.md`, `BACKEND.md`, or `PROJECT.md`.
> 2. **Pro-Max Documentation:** DO NOT just copy and paste blindly. When moving, write the rule following the standard established in the destination files: Dense Explanation + Code Example (if applicable) + 'Why we do it this way' Context.
> 3. **Organic Integration:** Fit the new rule into existing sections or create new categories that maintain the document's hierarchy and logical organization.
> 4. **Cleanup:** After confirming that the information was successfully integrated into the definitive manuals and that file integrity was maintained, clear the 'EXPERIMENTAL PATTERNS' section of `USER_PREFERENCES.md` leaving only the header and this prompt."
