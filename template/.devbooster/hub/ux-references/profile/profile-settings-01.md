# Reference — Personal details and portfolio upload settings

- image: profile-settings-01.png
- type: profile settings form
- source: vision description (image not stored)

## Overview

An account settings route for editing personal identity and profile presentation. It combines basic details, avatar upload, location preferences, biography editing, and portfolio-project uploads in one vertically scrolling form.

## Route layout blueprint

The route has a settings title, a horizontal internal tab bar, and page-level cancel/save actions. The main form is organized as full-width rows with labels and controls aligned in a consistent two-column pattern. It begins with personal information, then photo upload, role, country, timezone, and a rich-text bio, followed by portfolio upload and an uploaded-file progress row.

## Sections (top to bottom)

- Settings navigation: title, local search field, and a row of internal settings tabs.
- Personal information: first and last name fields, email field, and profile-photo upload area with current avatar preview.
- Profile basics: role text field, country selector, and timezone selector.
- Biography: rich-text editor with formatting toolbar, text area, and character counter.
- Portfolio projects: drag-and-drop upload area followed by an uploaded document row showing file type, size, completion state, progress bar, and delete action.

## Components

- Internal tabs: one horizontal settings tab bar with multiple destinations and a notification badge on one tab.
- Text inputs: name fields, email field, and role field.
- Selectors: country and timezone dropdowns.
- Avatar uploader: current avatar preview plus one upload drop zone.
- Rich-text editor: formatting toolbar, multi-line editor, and remaining-character counter.
- Portfolio uploader: one upload drop zone and one completed file/progress item.
- Form actions: cancel and emphasized save buttons.

## Density and rhythm

Dense but orderly, using repeated horizontal separators and compact form rows. The large biography editor and upload areas create occasional breathing room within an otherwise efficient settings form.

## Observed states

The form is populated and editable. The avatar exists, the portfolio upload area is available, and one uploaded file is shown as complete with a full progress indicator. No error or loading state is visible.

## Observed route interactions

Internal settings tabs, search, text editing, dropdown selection, avatar upload, portfolio drag-and-drop upload, file deletion, cancel, and save are implied. Global sidebar content is ignored.

## Observed style (qualitative)

Functional, structured, form-heavy, and productivity-oriented, with clear section separators and restrained card treatment.

## Ideal for

SaaS account settings, creator profile management, professional directories, portfolio platforms, and workspace administration tools.

## Do not reproduce

Do not reproduce product branding, personal names, emails, proprietary copy, portraits, real filenames, logos, or exact upload constraints. Use generic form values and neutral file examples.
