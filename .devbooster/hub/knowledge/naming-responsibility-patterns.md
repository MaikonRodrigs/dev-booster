# Naming and Responsibility Patterns

## 1. Generic or Misleading Names

**Signal:** names such as `utils`, `helpers`, `common`, `data`, `manager`, `handler`, or `service` obscure a specific responsibility, or a file name no longer matches its contents.

**Evidence:** exported members, consumer usage, neighboring naming conventions, and domain vocabulary.

**Do not flag:** a generic name that is established and clearly scoped by its module or framework.

**Recommendation:** suggest a name that describes the actual responsibility and follows the project’s dominant terminology.

## 2. Mixed Responsibilities

**Signal:** one file combines unrelated concerns, such as UI rendering, API access, domain transformations, and orchestration without an established local pattern.

**Evidence:** distinct dependency categories, unrelated exports, independent change reasons, and comparable modular files.

**Do not flag:** framework composition roots, deliberately thin adapters, or cohesive modules that are simply long.

## 3. Oversized Modules

File size is a signal, not a defect. Report a large file only when its size is accompanied by mixed responsibilities, distinct consumers, high branching, or repeated separable sections.

## 4. Naming Consistency

Check singular/plural consistency, terminology drift, language mixing, suffix use, and equivalent concepts with different names. Prefer the established project vocabulary over a universal naming style.
