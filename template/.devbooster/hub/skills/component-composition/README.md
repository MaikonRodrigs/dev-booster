# Component Composition

Use this skill when selecting, adapting, or creating frontend components from shadcn/ui, React Bits, Motion Primitives, 21st.dev, NumberFlow, or an existing project design system.

## Local decision rules

- Inspect the project's framework, package versions, styling tokens, accessibility primitives, and comparable components first.
- Prefer existing local components over introducing a visually similar dependency.
- Treat community snippets as starting points: inspect every import, event handler, data assumption, and responsive state.
- Keep state logic, composition, and presentation understandable and testable.
- Standardize focus, keyboard, loading, error, empty, disabled, and mobile behavior.
- Avoid nested containers and generic repeated cards when hierarchy can be expressed through typography, space, or composition.

## Official verification matrix

| Library | Official source |
| --- | --- |
| shadcn/ui | https://ui.shadcn.com/docs |
| React Bits | https://reactbits.dev/ |
| Motion Primitives | https://www.motion-primitives.com/docs |
| 21st.dev | https://21st.dev/docs |
| NumberFlow | https://number-flow.barvian.me/ |

Before implementation, verify the current install/API instructions and reconcile them with the project lockfile. For shadcn/ui, confirm the generated source is compatible with the local Radix, Tailwind, and TypeScript setup.

## Output checklist

- Existing component or primitive searched
- Official API/version verified
- New dependency justified or avoided
- Accessibility states covered
- Responsive behavior defined
- Visual direction aligned with local tokens
- Tests/build/typecheck plan identified
