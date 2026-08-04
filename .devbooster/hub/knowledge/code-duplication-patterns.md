# Code Duplication Patterns

## 1. Duplicate Functions and Helpers

**Signal:** functions or helpers with the same purpose, equivalent inputs/outputs, or materially similar control flow appear in multiple modules.

**Evidence:** normalized code similarity, repeated transformations or validations, identical call patterns, and consumers requiring the same behavior.

**Do not flag:** small local code that is clearer in context, intentional framework adapters, or similar code with distinct domain rules.

**Recommendation:** centralize only when a shared location already exists or when reuse reduces divergence risk without creating an overly generic utility.

## 2. Repeated Business Logic

**Signal:** rules, calculations, formatting policies, authorization checks, or data mappings are independently implemented in more than one place.

**Evidence:** the same domain vocabulary, same branches, same constants, and equivalent results for the same inputs.

**Risk:** independent copies can diverge when the underlying rule changes.

**Recommendation:** identify a shared domain, service, utility, hook, or module only according to the project's existing organization.

## 3. Similar Components and UI Logic

**Signal:** components repeat state handling, rendering structure, or interaction logic beyond expected visual variation.

**Evidence:** matching props, repeated event/state transitions, shared markup structure, and a local component composition pattern.

**Do not flag:** intentionally distinct product flows, accessibility differences, or components whose only similarity is visual.

## 4. Duplicate Detection Confidence

Classify duplicates as:

- **Confirmed:** structurally identical or clearly the same contract/rule.
- **Probable:** high similarity with minor naming or implementation variations.
- **Candidate:** superficial similarity requiring developer review.

Only confirmed and probable duplicates should receive a concrete consolidation recommendation.
