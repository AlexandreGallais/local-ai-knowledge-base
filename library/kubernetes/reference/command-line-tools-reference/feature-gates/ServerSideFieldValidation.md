---
title: "ServerSideFieldValidation"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/ServerSideFieldValidation.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# ServerSideFieldValidation

Enables server-side field validation. This means the validation
of resource schema is performed at the API server side rather than the client side
(for example, the `kubectl create` or `kubectl apply` command line).
