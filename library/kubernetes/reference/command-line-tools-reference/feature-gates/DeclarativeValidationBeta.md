---
title: "DeclarativeValidationBeta"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/DeclarativeValidationBeta.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# DeclarativeValidationBeta

The global safety switch for Beta validation rules (`+k8s:beta`). Disable it to revert
those rules to shadow mode if regressions are found.

In shadow mode, declarative validation still runs and mismatches are logged and metered,
but they do not reject requests; hand-written validation stays authoritative.

Enforcement for resources using `WithDeclarativeEnforcement()`:

- No prefix: always enforced, regardless of this gate.
- `+k8s:beta`: enforced when this gate is enabled (the default), otherwise shadowed.
- `+k8s:alpha`: always shadowed.

This gate takes effect independently of the
`DeclarativeValidation` feature gate,
which controls only mismatch reporting.
