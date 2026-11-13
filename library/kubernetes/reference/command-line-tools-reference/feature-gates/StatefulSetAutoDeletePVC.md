---
title: "StatefulSetAutoDeletePVC"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/StatefulSetAutoDeletePVC.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# StatefulSetAutoDeletePVC

Allows the use of the optional `.spec.persistentVolumeClaimRetentionPolicy` field,
providing control over the deletion of PVCs in a StatefulSet's lifecycle.
See
PersistentVolumeClaim retention
for more details.
