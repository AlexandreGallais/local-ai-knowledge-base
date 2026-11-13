---
title: "JobTrackingWithFinalizers"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/JobTrackingWithFinalizers.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# JobTrackingWithFinalizers

Enables tracking Job
completions without relying on Pods remaining in the cluster indefinitely.
The Job controller uses Pod finalizers and a field in the Job status to keep
track of the finished Pods to count towards completion.
