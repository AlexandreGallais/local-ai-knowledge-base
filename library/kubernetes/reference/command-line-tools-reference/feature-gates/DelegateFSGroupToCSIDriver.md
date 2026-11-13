---
title: "DelegateFSGroupToCSIDriver"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/DelegateFSGroupToCSIDriver.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# DelegateFSGroupToCSIDriver

If supported by the CSI driver, delegates the
role of applying `fsGroup` from a Pod's `securityContext` to the driver by
passing `fsGroup` through the NodeStageVolume and NodePublishVolume CSI calls.
