---
title: "InPlacePodVerticalScalingExclusiveMemory"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/InPlacePodVerticalScalingExclusiveMemory.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# InPlacePodVerticalScalingExclusiveMemory

Allow resource resize for containers in Guaranteed Pods when the memory manager policy is set to `"Static"`.
Applies only to nodes with `InPlacePodVerticalScaling` and memory manager features enabled.
