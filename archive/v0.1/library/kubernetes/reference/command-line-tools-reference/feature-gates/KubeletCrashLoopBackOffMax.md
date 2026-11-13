---
title: "KubeletCrashLoopBackOffMax"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/KubeletCrashLoopBackOffMax.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# KubeletCrashLoopBackOffMax

Enables support for configurable per-node backoff maximums for restarting
containers in the `CrashLoopBackOff` state.
For more details, check the `crashLoopBackOff.maxContainerRestartPeriod` field in the
kubelet config file.
