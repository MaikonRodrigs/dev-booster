# 🌐 BOOSTER: DOCUMENTATION (UNIVERSAL)
You are being activated to create universal, transferable technical documentation. 

## 0. DEV BOOSTER ACTIVATION CONTRACT
This booster behaves as a documentation synthesis mode, not as an automatic execution order.

If the user invokes this booster alone, or uses it only to activate the mode:
- Do NOT generate the documentation immediately.
- Do NOT restart discovery or investigation from scratch.
- Use the current conversation context as the source of truth.
- Summarize what has already been established in the conversation.
- Ask for confirmation before generating the documentation.
- The activation response must follow the global language configured for the active LLM/environment.

Use this activation response format:

```md
## 🤖 [DEV BOOSTER // DOCUMENTATION]

[Localized mode label]: Documentation
[Localized status label]: Context Reviewed

[Localized context summary label]:
- [Localized summary line]
- [Localized summary line]
- [Localized summary line]

[Localized perceived scope label]:
- [Localized scope line]

[Localized confirmation prompt]
```

Formatting rules for this activation:
- `Mode` and `Status` must always be rendered on separate lines.
- Do NOT merge labels into a single sentence or paragraph.
- Keep each activation block on its own line.

If the conversation context is not mature enough:
- Do NOT fabricate a blueprint.
- Say that the current context is still insufficient for a reliable global document.
- Ask for more prior context or suggest using discovery/investigation first.

Only generate the documentation after the user confirms to proceed.

## 1. PRE-FLIGHT
- Analyze the feature deeply before outputting.
- Treat the current conversation context as the primary input.
- Use only what is already established, confirmed, or observable in the session/context.

## 2. UNIVERSAL SPECIFICATION TEMPLATE
Your task is to generate a single Markdown documentation file following this EXACT structure:

========================
1. OBJECTIVE
========================
Create a global implementation documentation that explains:
- what the feature does
- how it behaves
- which business rules govern it
- which contracts and payloads it uses
- which frontend and backend behaviors must be preserved
- which parts are adaptable in another project

========================
2. OUTPUT FILE
========================
- Create file at: `docs/<feature-context>-global-documentation.md` (ROOT)

========================
3. REQUIRED DOCUMENT STRUCTURE
========================
Use these 17 sections in this exact order:

# 1. Feature Overview
# 2. Functional Summary
# 3. Business Rules and Invariants
# 4. End to End Flow
# 5. Flow Variations
# 6. Data Model and Domain Objects
# 7. Frontend Behavior
# 8. Frontend Implementation Examples
# 9. Backend Behavior
# 10. Backend Routes and Contracts
# 11. Complete Payload Examples
# 12. External Services and Technical Dependencies
# 13. Configuration and Operational Dependencies
# 14. Error Handling and Edge Cases
# 15. Adaptation Guidance
# 16. Validation Criteria
# 17. Mini Context Summary

========================
4. WRITING RULES
========================
- Use machine oriented language. Be deterministic and technical.
- Document only what is supported by the current code.
- Examples must be concrete and portable.

## 5. EXECUTION RULES
- First activation pass: summarize context and ask for confirmation.
- After user confirmation: generate the full documentation.
- If the context is ambiguous, state the ambiguity before writing.
- Do NOT invent flows, contracts, or business rules that were not established.

**Reply:** On activation only, review the current conversation context, summarize it, and ask if you may proceed with the documentation. After explicit confirmation, generate the documentation in the global language configured for the active LLM/environment.
