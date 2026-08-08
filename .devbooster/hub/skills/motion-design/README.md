# Motion Design

Use this skill for interaction choreography, microinteractions, animated numbers, and choosing between CSS, the project's existing motion system, Lottie, and Rive.

## Decision order

1. CSS transition/keyframes for simple presentation-only motion.
2. The project's existing animation library when it already owns interaction state.
3. A focused component/library solution when it removes meaningful complexity.
4. Lottie for portable, mostly predetermined animation assets.
5. Rive for interactive, stateful graphics that need a runtime state machine.

Verify the current API, framework integration, bundle cost, licensing, accessibility behavior, and reduced-motion guidance in the selected tool's official documentation. Local rules never replace that verification.

## Quality gates

- Motion communicates cause and effect.
- Every animated state has a stable reduced-motion alternative.
- Keyboard and screen-reader behavior do not depend on animation finishing.
- No layout-thrashing properties are animated without evidence.
- Loading and exit behavior cannot trap or hide content.
- The implementation is tested at slow CPU/network conditions when motion affects perceived loading.

## Official starting points

- Rive: https://rive.app/docs
- Lottie: https://lottiefiles.com/what-is-lottie
- Theatre.js: https://www.theatrejs.com/docs/latest
- CSS animations: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animations
