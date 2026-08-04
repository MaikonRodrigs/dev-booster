# Project Structure Patterns

## 1. Detect the Existing Organization Model

Identify the dominant model before evaluating placement:

- feature or module based;
- layer based;
- domain based;
- Atomic Design;
- Clean Architecture or hexagonal;
- framework route conventions;
- custom documented structure.

Use repeated directory layouts and local rules as evidence. A project may legitimately combine models at different boundaries.

## 2. File Placement

**Signal:** a file differs from comparable files without an ownership or framework reason.

**Evidence:** neighboring modules, repeated feature layouts, import consumers, and the responsibility expressed by the file.

**Do not flag:** framework-required locations, route files, generated output, migrations, compatibility adapters, or explicitly documented exceptions.

**Recommendation:** name a destination only when equivalent files already establish that destination.

## 3. Shared Versus Feature-specific Code

**Signal:** broadly reused code is trapped inside one feature, or code used only by one feature is stored as global/shared.

**Evidence:** import graph, consumer count, domain ownership, and local shared-module rules.

**Recommendation:** prefer the narrowest ownership that matches actual use. Do not promote code to global solely because it is reusable in theory.

## 4. Structural Consistency

Flag inconsistent folder names, singular/plural drift, conflicting aliases, and module layouts only when a dominant convention is visible. Report the observed convention with every finding.
