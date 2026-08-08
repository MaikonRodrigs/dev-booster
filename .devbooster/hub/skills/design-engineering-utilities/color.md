# Color and Contrast

## Local guidance

- Inspect existing design tokens before proposing new colors.
- Use OKLCH as a reasoning space when perceptual lightness or consistent ramps matter; convert to the output format supported by the project's browsers and tooling.
- Define semantic roles (`background`, `foreground`, `muted`, `primary`, `danger`) rather than scattering raw values.
- Test text, icons, focus indicators, disabled states, borders, and interactive states—not only the default background/text pair.
- Preserve intentional brand contrast while meeting the project's accessibility target.

## Official verification

Consult the current first-party material at:

- https://oklch.com/
- https://color.review/
- the browser compatibility data or CSS specification relevant to the chosen color function.

Confirm syntax, fallback requirements, gamut behavior, contrast methodology, and supported browser targets before writing code.

## Output checklist

- Existing tokens inspected
- Color space and fallback decided
- Contrast states checked
- Focus and disabled states checked
- Dark/light or high-contrast behavior checked when applicable
- Official current syntax verified
