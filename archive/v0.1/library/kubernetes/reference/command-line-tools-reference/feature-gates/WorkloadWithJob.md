---
title: "WorkloadWithJob"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/WorkloadWithJob.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# WorkloadWithJob

Enables the Job controller to compile a Job's `.spec.scheduling` configuration into
Workload and PodGroup
objects before it creates any Pods.
When `.spec.scheduling` is omitted, the Job defaults to the `Basic` scheduling policy. See
Integrate with Workload APIs
for details.
