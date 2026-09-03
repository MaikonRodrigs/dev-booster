# Reference — Detailed profile preferences form

- image: profile-settings-03.png
- type: profile settings form
- source: vision description (image not stored)

## Overview

A detailed settings form for maintaining a public profile and contact preferences. It prioritizes editable fields such as username, website, photo, biography, job title, and alternate email, with a persistent save/cancel action area.

## Route layout blueprint

The main route starts with a settings heading, a search control, and a horizontal internal tab bar. The selected profile tab introduces a short title and helper text, followed by a sequence of labeled form rows. Fields include username, website, photo management, biography editor, job title with visibility checkbox, and alternate contact email. Save and cancel actions remain at the bottom of the form.

## Sections (top to bottom)

- Settings navigation: title, local search field, and internal settings tabs.
- Profile identity links: username field with fixed path prefix and website field with protocol prefix.
- Profile photo: current photo preview with delete and update actions.
- Biography: rich-text toolbar, multi-line editor, and remaining-character counter.
- Job title: single-line input and checkbox controlling whether the title appears publicly.
- Alternate contact: helper text and an email input for secondary contact.
- Form actions: cancel and save buttons aligned at the bottom.

## Components

- Internal tabs: one horizontal tab strip with the profile destination selected.
- Search field: one local settings search control.
- Prefixed inputs: username and website inputs with non-editable prefixes.
- Photo controls: one avatar preview plus delete and update actions.
- Rich-text editor: one formatting toolbar, editor area, and character counter.
- Job title controls: one text input and one checked visibility checkbox.
- Alternate email input: one email field with mail affordance.
- Form actions: one cancel button and one emphasized save button.

## Density and rhythm

Compact and systematic, with repeated horizontal separators between rows. The long form uses consistent label/control alignment and substantial unused space beneath the final row before the action area.

## Observed states

The form is populated and editable. The profile photo is present, the public job-title option is enabled, and no validation, loading, empty, upload, or progress state is visible.

## Observed route interactions

Internal tabs, local settings search, username and website editing, photo deletion/update, rich-text editing, job-title visibility toggle, alternate-email editing, cancel, and save are implied. The global navigation shell is ignored.

## Observed style (qualitative)

Clean, administrative, and form-centric, with a restrained settings layout optimized for scanning and deliberate editing.

## Ideal for

Account settings, profile management, creator platforms, professional directories, SaaS administration, and portfolio products.

## Do not reproduce

Do not reproduce brands, product names, personal names, proprietary text, portraits, exact URLs, logos, or specific icon assets. Use generic labels and representative content.
