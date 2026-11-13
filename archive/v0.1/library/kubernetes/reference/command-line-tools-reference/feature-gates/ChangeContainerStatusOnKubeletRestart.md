---
title: "ChangeContainerStatusOnKubeletRestart"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/ChangeContainerStatusOnKubeletRestart.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# ChangeContainerStatusOnKubeletRestart

Enable legacy writes to update container `ready` status after the kubelet detects a
restart.

This feature gate was introduced to allow you revert the behavior to a previously used default.
If you are satisfied with the default behavior, you do not need to enable this
feature gate.
