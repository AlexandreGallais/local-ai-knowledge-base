---
title: "DeclarativeValidation"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/DeclarativeValidation.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# DeclarativeValidation

Reports differences between declarative validation of in-tree Kubernetes APIs and the
equivalent hand-written validation.

When enabled, rules marked `+k8s:alpha` or `+k8s:beta` run alongside the hand-written
validation, and the API server logs any discrepancy and counts it in the
`declarative_validation_mismatch_total` metric.

This gate controls only reporting, not which result the API server returns. Enforcement
is:

- No prefix: always enforced.
- `+k8s:beta`: enforced when the
  `DeclarativeValidationBeta` feature gate
  is enabled (the default).
- `+k8s:alpha`: never enforced.

This feature gate only operates on the `kube-apiserver` component.
