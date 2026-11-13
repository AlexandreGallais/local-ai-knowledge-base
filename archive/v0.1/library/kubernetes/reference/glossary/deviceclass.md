---
title: "DeviceClass"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/glossary/deviceclass.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# DeviceClass

A category of devices in the
 cluster that can be used with dynamic resource allocation (DRA).

Administrators or device owners use DeviceClasses to define a set of devices
that can be claimed and used in workloads. Devices are claimed by creating
ResourceClaims
that filter for specific device parameters in a DeviceClass.

For more information, see
Dynamic Resource Allocation
