# Reference — Password reset email confirmation

- image: forgot-password-04.png
- type: password reset email confirmation page
- source: vision description (image not stored)

## Overview

A confirmation route telling the user that password reset instructions were sent and offering a direct path to open their email application or request another message.

## Route layout blueprint

A single narrow content block is centered in the route. It contains an email icon, confirmation heading, supporting message with a masked or generic recipient reference, a prominent email-app action, a resend prompt, and a secondary return-to-login link.

## Sections (top to bottom)

- Email confirmation: one envelope-style icon, heading, and supporting message.
- Primary action: one full-width button for opening the email application.
- Recovery fallback: one short resend prompt with an emphasized inline action.
- Secondary navigation: one inline back-to-login link with a directional icon.

## Components

- Email icon: one generic message-delivery indicator.
- Heading: one check-your-email title.
- Supporting text: one message confirming delivery to the account address without reproducing the address.
- Primary button: one open-email-app action.
- Resend link: one inline action for requesting another reset email.
- Back link: one secondary link returning to authentication.

## Density and rhythm

Very spacious and minimal, with a compact hierarchy centered around the primary email action and a clear fallback below it.

## Observed states

Email-sent confirmation state. A resend option is visible; no loading, error, or form-validation state is shown.

## Observed route interactions

The open-email-app button, resend link, and back-to-login link appear clickable.

## Observed style (qualitative)

Minimal, reassuring, and task-oriented authentication confirmation flow.

## Ideal for

Password recovery, email verification, magic-link authentication, SaaS products, and member portals.

## Do not reproduce

Do not reproduce the recipient address, proprietary wording, specific icon artwork, product identity, logo, or exact branding.
