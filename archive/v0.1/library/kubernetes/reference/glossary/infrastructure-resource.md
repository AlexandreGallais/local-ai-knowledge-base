---
title: "Resource (infrastructure)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/glossary/infrastructure-resource.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Resource (infrastructure)

Capabilities provided to one or more nodes (CPU, memory, GPUs, etc), and made available for consumption by
Pods running on those nodes.

Kubernetes also uses the term _resource_ to describe an API resource.

Computers provide fundamental hardware facilities: processing power, storage memory, network, etc.
These resources have finite capacity, measured in a unit applicable to that resource (number of CPUs, bytes of memory, etc).
Kubernetes abstracts common resources
for allocation to workloads and utilizes operating system primitives (for example, Linux cgroups) to manage consumption by workloads).

You can also use dynamic resource allocation to
manage complex resource allocations automatically.
