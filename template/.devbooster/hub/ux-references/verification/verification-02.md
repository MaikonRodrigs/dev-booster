# Reference — Manual verification code entry

- image: verification-02.png
- type: email verification code page
- source: vision description (image not stored)

## Overview

A centered authentication screen where the user enters a short code received by email. The primary goal is to submit the code, with a nearby recovery action for users who did not receive the message.

## Route layout blueprint

A single narrow, centered verification panel is arranged vertically. It starts with a compact email-status icon, followed by a heading and brief delivery explanation. Below that is one horizontal row of four equally sized code-entry fields, then a full-width verification button, a resend prompt with a local link, and a back-to-login action at the bottom.

## Sections (top to bottom)

- Status indicator: one compact outlined email icon centered above the content.
- Verification message: one heading and a short two-line explanation of the email delivery.
- Code input: one four-slot horizontal one-time-code field group, visibly empty with placeholder digits.
- Submission action: one prominent full-width button for verifying the email.
- Recovery action: one centered resend prompt containing a clickable local link.
- Return action: one understated back-navigation link with a leading arrow.

## Components

- Email status icon: one informational icon related to email verification.
- Heading: one route-level title.
- Supporting copy: one short paragraph describing where the verification instruction was sent.
- One-time-code input: four individual adjacent input boxes intended for a short numeric code.
- Primary button: one full-width submit action.
- Resend link: one inline local action for requesting another verification message.
- Back link: one secondary navigation action returning to login.

## Density and rhythm

Minimal and balanced. The main content is compact, while deliberate vertical gaps separate the code group, submit action, recovery prompt, and back-navigation link.

## Observed states

The route is populated but awaiting input: all four code fields appear empty. No validation error, loading state, disabled-state explanation, or success message is visible.

## Observed route interactions

The four code fields are editable and likely advance focus as digits are entered. The verification button submits the code, the resend link requests another message, and the back link returns to login. No tabs, filters, or menus are observed.

## Observed style (qualitative)

Clean, focused, and highly task-oriented, using a narrow single-column authentication layout with one dominant submit action.

## Ideal for

OTP entry, email confirmation, passwordless login, multi-factor authentication, invitation acceptance, and short-code recovery flows.

## Do not reproduce

Do not reproduce the visible brand identity, recipient address, exact copy, placeholder characters, icon artwork, or proprietary text. Preserve only the generic code-entry layout and interaction pattern.
