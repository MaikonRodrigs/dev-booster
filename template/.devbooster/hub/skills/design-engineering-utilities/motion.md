# Easing and Timing Utilities

## Local guidance

- Start with the interaction purpose: entrance, exit, emphasis, feedback, or state transition.
- Use the shortest motion that communicates causality; avoid animation for decoration alone.
- Prefer `transform` and `opacity` for performant transitions.
- Define duration and easing tokens rather than one-off values.
- Respect `prefers-reduced-motion` and provide an equivalent non-motion state.

## Official verification

Before using a curve or animation helper, consult the current material at:

- https://easings.net/
- https://cubic-bezier.com/
- the relevant browser CSS or selected animation library documentation.

Verify the syntax and behavior in the project's actual animation system. A visual curve reference is not API documentation.
