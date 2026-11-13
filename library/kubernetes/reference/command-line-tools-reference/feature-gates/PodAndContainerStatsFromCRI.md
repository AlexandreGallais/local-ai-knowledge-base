---
title: "PodAndContainerStatsFromCRI"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/PodAndContainerStatsFromCRI.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# PodAndContainerStatsFromCRI

Configure the kubelet to gather container and pod stats from the CRI container runtime rather than gathering them from cAdvisor.
As of 1.26, this also includes gathering metrics from CRI and emitting them over `/metrics/cadvisor` (rather than having cAdvisor emit them directly).
