---
title: "PersistentVolumeClaimUnusedSinceTime"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/PersistentVolumeClaimUnusedSinceTime.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# PersistentVolumeClaimUnusedSinceTime

When enabled, the PVC protection controller adds an `Unused` condition to
PersistentVolumeClaims that tracks whether the PVC is currently referenced by
any non-terminal Pod. The condition's `lastTransitionTime` records when the PVC
last transitioned between being in use and being unused.
