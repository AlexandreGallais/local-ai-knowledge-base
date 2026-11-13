---
title: "DRADeviceCompatibilityGroups"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/DRADeviceCompatibilityGroups.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# DRADeviceCompatibilityGroups

Enables support for device compatibility groups
in DRA. Drivers can declare opaque compatibility groups on each
`consumesCounters` entry of a device in a ResourceSlice, and the scheduler
only co-allocates devices drawing from the same counter set when their
declared groups intersect. Requires `DRAPartitionableDevices` to be enabled.
