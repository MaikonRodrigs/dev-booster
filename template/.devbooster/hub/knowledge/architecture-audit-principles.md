# Architecture Audit Principles

## 1. Project Convention Is the Primary Source of Truth

**Rule:** Analyze the project before judging it. Local rules, the dominant folder pattern, and established abstractions take precedence over generic architecture preferences.

**Evidence:** project rules, repeated module layouts, import conventions, stack configuration, and comparable production code.

**Do not flag:** a valid feature-based, layer-based, domain-based, Atomic Design, Clean Architecture, or custom structure merely because another model is also valid.

**Recommendation boundary:** report an inconsistency only when the project has a clear pattern or the deviation creates a concrete maintenance risk.

## 2. Evidence and Confidence

Every finding must contain affected files, observed evidence, the local pattern used for comparison, and a confidence level.

- **High:** repeated, objective evidence such as a circular import or an identical shared contract.
- **Medium:** a strong pattern with a limited number of exceptions.
- **Low:** a heuristic requiring developer confirmation, such as a possible orphan file.

Do not present low-confidence heuristics as defects.

## 3. Recommendation Discipline

Architecture Audit is read-only. It may identify and recommend, but it must not create folders, move files, consolidate modules, or impose an architecture.

Recommendations must preserve behavior and state the likely destination only when that destination follows an existing local convention.

## 4. False-positive Controls

Before reporting a finding, check for generated files, framework conventions, dynamic imports, route conventions, public package exports, deliberate compatibility layers, and documented exceptions.

When the evidence is inconclusive, use language such as "possible inconsistency" and request confirmation instead of prescribing a change.
