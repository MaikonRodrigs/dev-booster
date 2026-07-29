# 📸 BOOSTER: SAVE UX REFERENCE (VISUAL CATALOGER)

Lazy trigger for saving new visual references into the UX reference library.

Activation is on-demand only. This booster does not activate automatically.

## 0. DEV BOOSTER ACTIVATION CONTRACT

This booster behaves as a lazy command trigger. It only responds when explicitly invoked.

If the user invokes this booster:
- Do NOT analyze the project.
- Do NOT load any context.
- Do NOT run any scripts.
- Only confirm activation using the format below and ask for the image.

Use this activation response format:

```md
## 🤖 [DEV BOOSTER // SAVE REFERENCE]

Mode: Visual Cataloger
Status: Waiting for image

Send me a screenshot or image of a page, section, or flow, and I'll categorize it and save it in the correct UX reference folder.
```

After activation, wait for the user to send an image. Only proceed to the categorization flow when an image is received.

## 1. PREREQUISITES

Before starting, verify:

1. The directory `.devbooster/hub/ux-references/` exists. If it does not exist, report that the UX reference library is not available and abort.
2. The `GUIDE.md` exists at `.devbooster/hub/ux-references/GUIDE.md`. If it does not exist, report that the library is corrupted and abort.
3. The image was provided by the user. If no image is attached, ask for one.

## 2. IMAGE CATEGORIZATION FLOW

### Step 1: Analyze the Image

Analyze the image to determine its page type, structure, and purpose. Identify:

- What type of page or section is this?
- What is the primary purpose?
- What is the visual composition?
- What category does it best fit?

### Step 2: Map to Existing Category

Match the image to one of the existing categories in `.devbooster/hub/ux-references/`:

- `404` — error pages
- `contact` — contact and support pages
- `dashboards` — metric and administration dashboards
- `email-templates` — email layouts
- `feature-sections` — feature highlight sections
- `footer` — footer layouts
- `forgot-password` — password recovery pages
- `header-sections` — header and hero sections
- `informational-pages` — content and institutional pages
- `landing-pages` — marketing landing pages
- `payments` — payment, checkout and billing pages
- `pricing` — pricing and plan comparison pages
- `profile` — user profile pages
- `settings` — settings and configuration pages
- `sign-in` — login and authentication pages
- `sign-up` — registration and sign-up pages
- `verification` — account verification pages

Read the target category's `index.md` to understand its current organization.

### Step 3: Category Decision

- If the image clearly matches one category, select it.
- If the image could fit multiple categories, choose the most specific one and explain the choice to the user.
- If the image does not fit any existing category, ask the user if they want to:
  a. Fit it into the closest existing category, or
  b. Create a new category folder with a new `index.md`.

Only proceed when the category is confirmed.

### Step 4: Generate Filename

Determine the next available sequential number in the target folder.

1. List all files in the target category folder.
2. Identify the highest existing number based on the naming pattern for that category.
3. Generate the next filename following the category's established pattern.

Naming patterns by category:

| Category | Pattern | Example |
|---|---|---|
| `404` | `404-XX.png` | `404-15.png` |
| `contact` | `contact-XX.png` | `contact-11.png` |
| `dashboards` | `dashboard-XX.png` | `dashboard-20.png` |
| `email-templates` | `email-XX.png` | `email-11.png` |
| `feature-sections` | `feature-XX.png` | `feature-47.png` |
| `footer` | `footer-XX.png` | `footer-41.png` |
| `forgot-password` | `forgot-XX.png` | `forgot-06.png` |
| `header-sections` | `header-XX.png` | `header-75.png` |
| `informational-pages` | `info-XX.png` | `info-21.png` |
| `landing-pages` | `landing-XX.webp` | `landing-21.webp` |
| `payments` | `payment-XX.png` | `payment-11.png` |
| `pricing` | `pricing-XX.png` | `pricing-XX.png` |
| `profile` | `profile-XX.png` | `profile-07.png` |
| `settings` | `settings-XX.png` | `settings-22.png` |
| `sign-in` | `login-XX.png` | `login-17.png` |
| `sign-up` | `signup-XX.png` | `signup-22.png` |
| `verification` | `verify-XX.png` | `verify-04.png` |

If the existing files use `.png`, keep `.png`. If they use `.webp`, keep `.webp`. Maintain consistency with the existing format in that folder.

### Step 5: Save the Image

Save the image file to the target category folder with the generated filename.

Path format: `.devbooster/hub/ux-references/<category>/<filename>`

### Step 6: Update the Category Index

After saving the image, update the category's `index.md` by appending a new entry for the saved reference.

The entry format should be:

```md
## [Title describing the reference]

- Image: `<filename>`
- Ideal for: [describe the ideal use case, product types, or scenarios]
- Added on: [YYYY-MM-DD]
```

Append the new entry at the end of the file, before any trailing content or after the last existing entry. Keep the same formatting style as existing entries in that index.

Do NOT modify, remove, or reorder existing entries.

## 3. NEW CATEGORY CREATION

If the user confirms they want a new category:

1. Ask for the category name (kebab-case, lowercase, no spaces).
2. Create the folder at `.devbooster/hub/ux-references/<new-category>/`.
3. Create an `index.md` inside it with:

```md
# [Category display name]

Visual references for [description of what belongs here].

Use this category to explore:
- [aspect 1]
- [aspect 2]

## How to add references

Save images in this folder following the pattern `<prefix>-XX.png` or `<prefix>-XX.webp`.
```

4. Save the image with filename `<prefix>-01.png` (or `.webp` matching the image format).
5. Add the first entry to the new `index.md` following the same format as Step 6.

## 4. OUTPUT FORMAT

After saving, report to the user:

```md
## ✅ Reference saved

- **Category:** [category name]
- **File:** [filename]
- **Path:** `.devbooster/hub/ux-references/<category>/<filename>`

[Optional: brief note about what was observed and why it fits this category]
```

## 5. IMPORTANT RULES

- This booster only saves images. It does not create, modify, or delete any other project files.
- This booster does NOT run `sync-template`. Syncing to template is a separate manual step.
- This booster does NOT commit to Git. Version control is the user's responsibility.
- Do NOT save images outside `.devbooster/hub/ux-references/`.
- Do NOT overwrite existing image files.
- Preserve the original image format (`.png`, `.webp`, etc.) unless the category convention dictates otherwise.
- Always confirm the category with the user when there is ambiguity.
- If the image contains proprietary branding, logos, or identifiable content, mention this to the user but still save the reference. The user is responsible for curating their own library.
- After saving, do NOT offer to analyze, implement, or redesign based on the new reference. This booster only catalogs.
