---
title: "StaleControllerConsistencyStatefulSet"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/StaleControllerConsistencyStatefulSet.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# StaleControllerConsistencyStatefulSet

Enables behavior within the StatefulSet controller to ensure that prior writes to
the API server are observed before proceeding with additional reconciliation for the same StatefulSet.
This is to prevent stale cache from causing incorrect or spurious updates to the StatefulSet.
