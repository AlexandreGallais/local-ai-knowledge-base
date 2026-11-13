---
title: "MaxUnavailableStatefulSet"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/MaxUnavailableStatefulSet.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# MaxUnavailableStatefulSet

Enables setting the `maxUnavailable` field for the
rolling update strategy
of a StatefulSet. The field specifies the maximum number of Pods
that can be unavailable during the update.
