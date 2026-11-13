---
title: "DRAPartitionableDevicesType"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/DRAPartitionableDevicesType.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# DRAPartitionableDevicesType

Enables the `PartitionTypeAttribute` field on ResourceSlices, which opts a
partitionable
resource pool into the typed partition summary view of
ResourcePoolStatusRequest.
The field names a device attribute (such as a MIG profile) whose value groups
each partition type, so that a ResourcePoolStatusRequest can report how many
devices of each partition type are still allocatable. This builds on the
`DRAPartitionableDevices`
and
`DRAResourcePoolStatus`
feature gates, both of which must also be enabled.
