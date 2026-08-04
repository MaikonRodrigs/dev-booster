# Module Boundaries and Dependencies

## 1. Circular Dependencies

**Signal:** module A imports B through a direct or indirect cycle.

**Evidence:** import graph and runtime/build tooling when available.

**Risk:** initialization ordering, fragile refactors, unclear ownership, and hidden coupling.

**Do not flag:** type-only cycles that the active toolchain safely removes, unless they also violate a documented project boundary.

## 2. Layer and Module Boundary Violations

**Signal:** a module bypasses the project’s established dependency direction, such as UI directly owning persistence or a feature accessing another feature’s internals.

**Evidence:** local rules, import aliases, comparable modules, and actual dependency paths.

**Do not flag:** valid framework composition or documented cross-feature integration.

## 3. Orphan Files and Exports

**Signal:** files or exports appear to have no static consumers.

**Evidence:** import search, exports, route registration, dynamic loading conventions, build configuration, and package entry points.

**Confidence:** usually low until dynamic and framework usage are excluded.

**Recommendation:** report as a review candidate, never as automatically removable code.

## 4. Public and Internal Boundaries

Check whether consumers import internal implementation files when the project exposes a public module boundary. Preserve direct-import conventions when that is the established local pattern.
