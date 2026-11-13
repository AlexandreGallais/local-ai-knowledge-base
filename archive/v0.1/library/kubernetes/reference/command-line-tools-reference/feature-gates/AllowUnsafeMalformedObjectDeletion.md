---
title: "AllowUnsafeMalformedObjectDeletion"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/AllowUnsafeMalformedObjectDeletion.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# AllowUnsafeMalformedObjectDeletion

Enables the cluster operator to identify corrupt resource(s) using the **list**
operation, and introduces an option `ignoreStoreReadErrorWithClusterBreakingPotential`
that the operator can set to perform unsafe and force **delete** operation of
such corrupt resource(s) using the Kubernetes API.
