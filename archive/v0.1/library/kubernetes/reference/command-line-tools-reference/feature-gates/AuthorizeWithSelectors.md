---
title: "AuthorizeWithSelectors"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/AuthorizeWithSelectors.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# AuthorizeWithSelectors

Allows authorization to use field and label selectors.
Enables `fieldSelector` and `labelSelector` fields in the SubjectAccessReview API,
passes field and label selector information to authorization webhooks,
enables `fieldSelector` and `labelSelector` functions in the authorizer CEL library,
and enables checking `fieldSelector` and `labelSelector` fields in authorization webhook `matchConditions`.
