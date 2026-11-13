---
title: "MutableCSINodeAllocatableCount"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/MutableCSINodeAllocatableCount.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# MutableCSINodeAllocatableCount

Make the `.spec.drivers[*].allocatable.count` field of a CSINode mutable.
Also, enable a CSIDriver field, `nodeAllocatableUpdatePeriodSeconds`.

This allows periodic updates to a node's reported allocatable volume capacity,
preventing stateful pods from becoming stuck due to outdated information
that the kube-scheduler would otherwise rely upon.
