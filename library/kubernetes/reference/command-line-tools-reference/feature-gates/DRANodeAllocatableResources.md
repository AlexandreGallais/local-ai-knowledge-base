---
title: "DRANodeAllocatableResources"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/DRANodeAllocatableResources.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# DRANodeAllocatableResources

Enables the `kube-scheduler` to incorporate node allocatable resources (such as
CPU, memory, and hugepages) managed by Dynamic Resource Allocation (DRA) into
its standard node resource accounting.

When enabled, DRA drivers can use the `nodeAllocatableResources` field on
`ResourceSlice` devices to specify how their devices consume node allocatable
resources. This field supports two different use cases:
- `mapping`: For drivers that directly provide a native node resource (e.g., a CPU
  or Memory DRA driver). It supports scaling capacities or device counts.
- `overhead`: For devices that require auxiliary node dependencies (e.g., an
  accelerator that consumes host memory). It supports per-pod or per-container costs.

This allows the scheduler to combine these DRA allocations with standard Pod requests
to prevent node over-subscription during Pod admission.

It also exposes the `status.nodeAllocatableResourceClaimStatuses` field on the
Pod API to track the resulting resource allocations. The `kubelet` consumes this to
update Pod and container cgroup settings and adjust OOM scores.

For more information, see
Node Allocatable Resources
in the Dynamic Resource Allocation documentation.
