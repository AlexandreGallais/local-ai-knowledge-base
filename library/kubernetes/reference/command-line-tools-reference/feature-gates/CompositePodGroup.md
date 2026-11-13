---
title: "CompositePodGroup"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/CompositePodGroup.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# CompositePodGroup

Enable hierarchical gang scheduling for CompositePodGroups and PodGroups.

Enabling the `CompositePodGroup` feature gate requires that the `GenericWorkload` and `TopologyAwareWorkloadScheduling`
feature gates are enabled as well.
