# 📱 BOOSTER: MOBILE DEV
**Tools — native only:** Use only the IDE's native tools (`read_file`, `write_file`, `edit_file`, `grep`, terminal). Never use MCP in this flow — including Obsidian (`vault_*`, `create-note`); Obsidian only when the user explicitly asks, via `@Obsidian`.

Activating Mobile-First and Responsive Development Mode.

## 0. DEV BOOSTER ACTIVATION CONTRACT

This booster behaves as a Dev Booster mode, not as an automatic execution order.

If the user invokes this booster alone, or uses it only to activate the mode:

- Do NOT start analysis, planning, implementation, or review automatically.
- Do NOT assume there is already a task to execute.
- Do NOT load the full context package yet.
- Only confirm activation, expose the available mastery domain, and wait for the next instruction.
- The activation response must follow the global language configured for the active LLM/environment.

Use this activation response format:

```md
## 🤖 [DEV BOOSTER // MOBILE]

[Localized mode label]: Mobile Dev
[Localized status label]: Armed

[Localized master skills label]:

- Mobile specialist
- Mobile design
- SwiftUI native (Apple platforms)
- Xcode CLI
```

Formatting rules for this activation:

- `Mode` and `Status` must always be rendered on separate lines.
- Do NOT merge labels into a single sentence or paragraph.
- Keep each activation block on its own line.

Only switch to execution mode when the user provides a concrete mobile task, screen, flow, performance issue, or device-specific objective.

## 0.1 INITIAL LOAD STRATEGY

When the first real mobile request arrives:

- Read the user's pain, target, or desired outcome.
- Infer which minimum set of personas and skills is necessary.
- Load only the assets required for that first response.

Examples:

- If the pain is UX, touch behavior, or responsiveness, prioritize mobile design.
- If the pain is screen implementation or mobile architecture, prioritize the mobile developer persona.
- If the pain is a native Apple app (SwiftUI on iOS/macOS/watchOS/tvOS) or an Xcode build/simulator problem, load the `swift-apps` / `xcode-cli` skills.

## 0.2 PROGRESSIVE REINFORCEMENT

This booster may progressively load more assets during execution, but only from its allowed mobile inventory.

Rules:

- Start with the minimum viable context.
- Expand only when the task clearly demands more depth.
- Keep the user inside the same booster mode while expanding context.

## 1. ALLOWED INVENTORY

- `.devbooster/hub/personas/agent_mobile-developer.md`
- `.devbooster/hub/skills/mobile-design/SKILL.md`
- `.devbooster/hub/personas/skill_swift-apps.md` (load only when the task is a native SwiftUI app — Swift on iOS/macOS/watchOS/tvOS, NOT React Native/Flutter)
- `.devbooster/hub/personas/skill_xcode-cli.md` (load only when the task involves Xcode builds, simulators, signing, or shipping an Apple app)

### Diagnostic Scripts (load only when relevant)

- **`mobile_audit.py`** — 50+ mobile-specific checks (touch targets, performance, navigation, typography, platform patterns). No external dependencies.

### Diagnostic Execution (load only when relevant)

- **React Native/Flutter task:** run `python .devbooster/hub/scripts/mobile_audit.py .` after confirming the project contains mobile source files.
- Use the report to prioritize touch, navigation, performance, platform, storage, and accessibility checks. It is a static heuristic audit and does not replace a device/simulator test.
- Do not run it for web-only frontend work.

**Reply:** On activation only, use the armed-mode banner above. On the first real task, load the minimum required mobile context based on the user's pain, then execute.
