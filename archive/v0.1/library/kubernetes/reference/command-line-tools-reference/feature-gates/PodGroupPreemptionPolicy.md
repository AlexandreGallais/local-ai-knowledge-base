---
title: "PodGroupPreemptionPolicy"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/PodGroupPreemptionPolicy.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# PodGroupPreemptionPolicy

Enables the support for `PreemptionPolicy` field in PodGroup API and Workload API.

When enabled, if a PodGroup has `PreemptionPolicy: Never` it will not perform workload aware preemption.
