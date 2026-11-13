---
title: "WorkloadAwarePreemption"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/WorkloadAwarePreemption.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# WorkloadAwarePreemption

Enables the support for Workload-aware preemption. This feature gate was removed in 1.37 and merged together with the `GenericWorkload` feature gate.

When enabled, if a PodGroup fails to schedule, the scheduler will use a workload-aware preemption
algorithm to select victims to preempt instead of the default pod preemption algorithm.
