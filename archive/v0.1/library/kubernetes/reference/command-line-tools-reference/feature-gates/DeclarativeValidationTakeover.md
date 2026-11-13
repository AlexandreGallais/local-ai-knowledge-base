---
title: "DeclarativeValidationTakeover"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/DeclarativeValidationTakeover.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# DeclarativeValidationTakeover

Deprecated: replaced by the
`DeclarativeValidationBeta` feature gate.

Before Kubernetes v1.36, this gate made declarative validation errors authoritative,
replacing the hand-written errors for rules that had a declarative implementation.

The API server no longer honors this gate. Use `DeclarativeValidationBeta` instead to
control whether `+k8s:beta` rules are enforced.

This feature gate only operates on the `kube-apiserver` component.
