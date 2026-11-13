---
title: "InPlacePodVerticalScalingExclusiveCPUs"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/InPlacePodVerticalScalingExclusiveCPUs.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# InPlacePodVerticalScalingExclusiveCPUs

Enable resource resizing for containers in Guaranteed pods with integer CPU requests.
It applies only in nodes with `InPlacePodVerticalScaling` and `CPUManager` features enabled,
and the CPUManager policy set to `static`.
