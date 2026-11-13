---
title: "StatefulSetRecreateStrategy"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/StatefulSetRecreateStrategy.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# StatefulSetRecreateStrategy

Enables the `Recreate` update strategy for StatefulSets, which deletes all of a
StatefulSet's Pods before creating new Pods that reflect modifications made to the
StatefulSet's `.spec.template`. See
Recreate for details.
