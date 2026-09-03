# Reference — Verification success confirmation

- image: verification-03.png
- type: email verification success page
- source: vision description (image not stored)

## Overview

A confirmation state informing the user that their email verification succeeded and offering a continuation action into the next authentication or application step. The primary goal is to reassure the user and continue the flow.

## Route layout blueprint

A single narrow, centered confirmation panel is arranged vertically. At the top is a compact success icon, followed by a prominent success heading and a short two-line confirmation message. A full-width primary continuation button follows, then a resend prompt, and finally a back-to-login action.

## Sections (top to bottom)

- Success indicator: one compact outlined confirmation icon centered above the content.
- Confirmation message: one prominent heading and a short explanatory message describing the completed verification.
- Continuation action: one full-width primary button to proceed to the next step.
- Recovery action: one centered resend prompt with a local link.
- Return action: one understated back-navigation link with a leading arrow.

## Components

- Success icon: one status icon communicating completion.
- Heading: one route-level success title.
- Supporting copy: one short two-line confirmation message.
- Primary button: one full-width continuation action.
- Resend link: one inline local action for requesting another verification message.
- Back link: one secondary navigation action returning to login.

## Density and rhythm

Very spacious and restrained. The content remains compact in the center of the page, with clear breathing room between the success message, continuation button, recovery prompt, and return link.

## Observed states

The route is populated in a successful verification state. No error, loading, code-entry, or progress indicator is visible.

## Observed route interactions

The continuation button advances the authentication flow. The resend link remains available as a local recovery action, and the back link returns to login. No tabs, filters, or menus are observed.

## Observed style (qualitative)

Clean, reassuring, and minimal, with a confirmation-oriented single-column composition and a clear primary next step.

## Ideal for

Email confirmation completion, account activation, passwordless authentication, onboarding checkpoints, and other successful identity-verification states.

## Do not reproduce

Do not reproduce the visible brand identity, exact copy, icon artwork, recipient information, or proprietary text. Preserve only the generic success-confirmation structure and action hierarchy.
