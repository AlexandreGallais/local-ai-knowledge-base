---
title: "ResourceSlice"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/glossary/resourceslice.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# ResourceSlice

Represents one or more infrastructure resources, such as
devices, that are attached to
nodes. Drivers create and manage ResourceSlices in the cluster. ResourceSlices
are used for
dynamic resource allocation (DRA).

When a ResourceClaim is
created, Kubernetes uses ResourceSlices to find nodes that have access to
resources that can satisfy the claim. Kubernetes allocates resources to the
ResourceClaim and schedules the Pod onto a node that can access the resources.
