# Reference — Multi-step password recovery form

- image: forgot-password-03.png
- type: multi-step account recovery page
- source: vision description (image not stored)

## Overview

A password recovery step embedded in a broader account setup or onboarding flow. The route asks for an email while exposing progress through the surrounding multi-step structure.

## Route layout blueprint

The screen uses a two-area layout. A vertical progress rail occupies the left side with four sequential steps, while the right side contains the centered recovery form. The form includes a recovery icon, heading, supporting text, email field, primary action, back-to-login link, and a four-dot progress indicator.

## Sections (top to bottom)

- Progress rail: four vertically stacked onboarding steps with icons, labels, and short descriptions; the password-related step is emphasized as current.
- Recovery form: one icon, heading, supporting line, email field, and primary reset action in the right content area.
- Form navigation: back-to-login link followed by a four-position progress indicator with one active position.
- Persistent shell details: small brand and contact/copyright elements are visible but treated as non-route shell content and omitted from the blueprint.

## Components

- Stepper: one vertical four-step progress component with completed, current, and upcoming steps.
- Recovery icon: one generic password-recovery symbol.
- Heading and supporting text: one title with one short explanatory message.
- Email field: one labeled text input.
- Primary button: one reset-password action.
- Back link: one return-to-login action.
- Progress dots: four indicators with one active state.

## Density and rhythm

Light and spacious. The left rail provides structure while the right form remains compact, centered, and easy to scan.

## Observed states

The email field is empty. The multi-step flow is in an active password-recovery step; earlier and later steps are visually differentiated. No validation, loading, error, or success state is visible.

## Observed route interactions

The email field, reset button, back-to-login link, and possibly the stepper appear interactive. The progress dots communicate position more than a confirmed navigation control.

## Observed style (qualitative)

Clean, guided, and onboarding-oriented authentication layout with a restrained progress narrative.

## Ideal for

Multi-step onboarding, workspace setup, account creation, SaaS registration, and guided recovery experiences.

## Do not reproduce

Do not reproduce the visible product identity, brand name, logo, proprietary labels, exact copy, icon artwork, or footer contact details. Ignore the persistent shell when implementing the route.
