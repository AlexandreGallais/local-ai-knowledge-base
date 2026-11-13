---
title: "ReduceDefaultCrashLoopBackOffDecay"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/ReduceDefaultCrashLoopBackOffDecay.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# ReduceDefaultCrashLoopBackOffDecay

Enabled reduction of both the initial delay and the maximum delay accrued
between container restarts for a node for containers in `CrashLoopBackOff`
across the cluster to `1s` initial delay and `60s` maximum delay.
