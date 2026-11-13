---
title: "CSIVolumeFSGroupPolicy"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/CSIVolumeFSGroupPolicy.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# CSIVolumeFSGroupPolicy

Allows CSIDrivers to use the `fsGroupPolicy` field.
This field controls whether volumes created by a CSIDriver support volume ownership
and permission modifications when these volumes are mounted.
