# Design Engineering Utilities

Use this skill for color, contrast, gradients, easing, SVG, regex, and code-communication utilities.

## Required verification

The local guidance below defines selection criteria. The current official documentation or first-party site defines the live behavior. Consult both before relying on a tool or library, then reconcile them with the project's stack and versions.

## Selection map

| Need | Start locally | Official reference |
| --- | --- | --- |
| Perceptual colors | `color.md` | https://oklch.com/ |
| Contrast | `color.md` | https://color.review/ |
| Easing | `motion.md` | https://easings.net/ and https://cubic-bezier.com/ |
| Gradients | `gradients.md` | https://larswander.com/writing/easing-gradients/ |
| SVG cleanup | `svg.md` | https://github.com/jakearchibald/svgomg |
| Regex/code images | `developer-tools.md` | https://regexr.com/ and https://ray.so/ |

Do not add a dependency merely because a utility exists. Prefer browser-native CSS, the project's existing tooling, and a reproducible workflow when they are sufficient.
