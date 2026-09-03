# Reference — Email verification request

- image: verification-01.png
- type: email verification request page
- source: vision description (image not stored)

## Overview

A focused authentication checkpoint that tells the user a verification message was sent and offers a path to enter the code manually. The primary goal is to move the user from email delivery to account verification.

## Route layout blueprint

A single narrow, centered verification panel sits in the main route area. From top to bottom it contains a small email-status icon, a prominent heading, a short explanatory message with the recipient address represented as secondary information, one full-width primary action for manual code entry, and a secondary back-to-login action beneath it.

## Sections (top to bottom)

- Status indicator: one compact outlined email icon centered above the content.
- Verification message: one primary heading followed by two short lines explaining that a verification link was sent.
- Local action: one prominent full-width button to switch to manual code entry.
- Return action: one understated back-navigation link with a leading arrow.

## Components

- Email status icon: one informational icon representing an outgoing or pending email.
- Heading: one route-level title for the verification step.
- Supporting copy: one short explanatory paragraph containing a masked or generic recipient reference.
- Primary button: one full-width local action for entering a verification code manually.
- Back link: one secondary navigation action returning to login.

## Density and rhythm

Very spacious and minimal. The centered content column has generous empty space around it, with clear vertical separation between the message, primary action, and return link.

## Observed states

The route is populated in a pending-verification state. No loading indicator, error message, code field, or success confirmation is visible.

## Observed route interactions

The manual-entry button is the main local interaction. The back-to-login link is also clickable. No filters, tabs, selectors, or contextual menus are observed.

## Observed style (qualitative)

Clean, restrained, and authentication-focused, with a single-column form-like composition and strong emphasis on one primary action.

## Ideal for

Email confirmation flows, passwordless authentication, account activation, invite acceptance, and other lightweight identity verification checkpoints.

## Do not reproduce

Do not reproduce the visible brand identity, recipient address, exact copy, icon artwork, or other proprietary text. Preserve only the generic email-verification structure and interaction hierarchy.
