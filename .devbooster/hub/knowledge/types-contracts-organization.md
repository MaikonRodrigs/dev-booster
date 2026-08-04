# Types and Contracts Organization

## 1. Shared Interfaces and Types

**Signal:** a type or interface is defined inline in multiple files, imported by multiple modules through an unsuitable location, or represents a cross-module contract.

**Evidence:** repeated fields, the same semantic name, multiple consumers, and an existing project convention for shared contracts.

**Do not flag:** a local props type, a one-file implementation detail, or a type intentionally private to its module.

**Recommendation:** suggest relocation only to an existing local destination such as a feature contract file, domain folder, API module, or shared types area.

## 2. Enums and Constant Domains

**Signal:** an enum or finite domain is duplicated, scattered across unrelated modules, or placed inside a module that does not own the concept.

**Evidence:** shared use across features, overlapping members, domain ownership, and existing constant/enumeration conventions.

**Do not flag:** feature-private values with no cross-module consumer.

## 3. Contract Boundaries

**Signal:** API DTOs, domain models, UI view models, and persistence shapes are mixed without a documented local convention.

**Evidence:** incompatible concerns in one contract, repeated ad-hoc mappings, and imports crossing clear boundaries.

**Recommendation:** report the mixed boundary and point to the project’s established contract pattern. Do not require separate DTO/domain/view-model layers unless the project already uses them or the mixture causes a verified risk.

## 4. Naming Consistency for Contracts

Check for equivalent concepts named differently or different concepts sharing a generic name. Prefer the dominant project terminology over generic naming rules.
