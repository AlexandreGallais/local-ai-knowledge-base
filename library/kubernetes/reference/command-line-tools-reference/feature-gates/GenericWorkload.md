---
title: "GenericWorkload"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/GenericWorkload.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# GenericWorkload

Enables support for the Workload API and PodGroup API to express scheduling requirements at the workload level.

When enabled, Pods can reference a specific PodGroup to influence the way that they are scheduled. Starting in Kubernetes v1.37, this feature gate also encompasses gang scheduling, and workload-aware preemption.
