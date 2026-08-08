# SVG

## Local guidance

- Preserve viewBox, intrinsic meaning, accessible names, and required animation behavior before optimizing.
- Prefer inline SVG for styling and accessible interactive icons; use an image asset when the SVG is purely decorative or externally managed.
- Remove metadata and redundant paths only after confirming that rendering and accessibility are unchanged.
- Never optimize away IDs, titles, masks, gradients, or namespaces that a runtime feature depends on.

## Official verification

Use the current SVGOMG interface and repository guidance at:

- https://github.com/jakearchibald/svgomg
- the SVG specification/browser documentation for features being preserved.

Run the optimized asset through the project's visual and accessibility checks. Keep the original available until validation completes.
