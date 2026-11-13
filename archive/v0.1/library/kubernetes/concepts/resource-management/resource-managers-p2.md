---
title: "Resource managers (part 2 of 2)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/concepts/resource-management/resource-managers.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Resource managers (part 2 of 2)

## Device manager

**Feature state:** v1.26 [stable]

*Device Manager* is a kubelet component that allocates hardware devices to pods
using the device plugin API. It consults with the Topology Manager, using
topology information provided by device plugins, to make resource assignment
decisions. To learn more, read
Device Plugin Integration with the Topology Manager.

## Pod-level resource managers {#pod-level-resource-managers}

**Feature state:**

Pod-level resource support for `kubelet` resource managers (Topology, CPU,
and Memory) allows resource managers to use `.spec.resources` directly for
NUMA alignment and exclusive allocation decisions.

To learn more, see the dedicated
Pod-level resource managers
concept page, or read how to
Assign Pod-level CPU and memory resources.

## What's next

-   Node Resource Managers
