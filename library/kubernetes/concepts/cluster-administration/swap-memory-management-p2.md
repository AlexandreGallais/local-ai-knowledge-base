---
title: "Swap memory management (part 2 of 2)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/concepts/cluster-administration/swap-memory-management.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Swap memory management (part 2 of 2)

## Good practice for using swap in a Kubernetes cluster

### Disable swap for system-critical daemons

During the testing phase and based on user feedback, it was observed that the performance
of system-critical daemons and services might degrade.
This implies that system daemons, including the kubelet, could operate slower than usual.
If this issue is encountered, it is advisable to configure the cgroup of the system slice
to prevent swapping (i.e., set `memory.swap.max=0`).

### Protect system-critical daemons for I/O latency

Swap can increase the I/O load on a node.
When memory pressure causes the kernel to rapidly swap pages in and out,
system-critical daemons and services that rely on I/O operations may
experience performance degradation.

To mitigate this, it is recommended for systemd users to prioritize the system slice in terms of I/O latency.
For non-systemd users,
setting up a dedicated cgroup for system daemons and processes and prioritizing I/O latency in the same way is advised.
This can be achieved by setting `io.latency` for the system slice,
thereby granting it higher I/O priority.
See cgroup's documentation for more info.

### Swap and control plane nodes

The Kubernetes project recommends running control plane nodes without any swap space configured.
The control plane primarily hosts Guaranteed QoS Pods, so swap can generally be disabled.
The main concern is that swapping critical services on the control plane could negatively impact performance.

### Use of a dedicated disk for swap

The Kubernetes project recommends using encrypted swap, whenever you run nodes with swap enabled.
If swap resides on a partition or the root filesystem, workloads may interfere
with system processes that need to write to disk.
When they share the same disk, processes can overwhelm swap,
disrupting the I/O of kubelet, container runtime, and systemd, which would impact other workloads.
Since swap space is located on a disk, it is crucial to ensure the disk is fast enough for the intended use cases.
Alternatively, one can configure I/O priorities between different mapped areas of a single backing device.

### Swap-aware scheduling

Kubernetes  does not support allocating Pods to nodes in a way that accounts
for swap memory usage. The scheduler typically uses _requests_ for infrastructure resources
to guide Pod placement, and Pods do not request swap space; they just request `memory`.
This means that the scheduler does not consider swap memory when making scheduling decisions.
While this is something we are actively working on, it is not yet implemented.

In order for administrators to ensure that Pods are not scheduled on nodes
with swap memory unless they are specifically intended to use it,
Administrators can taint nodes with swap available to protect against this problem.
Taints will ensure that workloads which tolerate swap will not spill onto nodes without swap under load.

### Selecting storage for optimal performance

The storage device designated for swap space is critical to maintaining system responsiveness
during high memory usage.
Rotational hard disk drives (HDDs) are ill-suited for this task as their mechanical nature introduces significant latency,
leading to severe performance degradation and system thrashing.
For modern performance needs, a device such as a Solid State Drive (SSD) is probably the appropriate choice for swap,
as its low-latency electronic access minimizes the slowdown.

## Swap behavior details

### How is the swap limit being determined with LimitedSwap?

The configuration of swap memory, including its limitations, presents a significant
challenge. Not only is it prone to misconfiguration, but as a system-level property, any
misconfiguration could potentially compromise the entire node rather than just a specific
workload. To mitigate this risk and ensure the health of the node, we have implemented
Swap with automatic configuration of limitations.

With `LimitedSwap`, Pods that do not fall under the Burstable QoS classification (i.e.
`BestEffort`/`Guaranteed` QoS Pods) are prohibited from utilizing swap memory.
`BestEffort` QoS Pods exhibit unpredictable memory consumption patterns and lack
information regarding their memory usage, making it difficult to determine a safe
allocation of swap memory.
Conversely, `Guaranteed` QoS Pods are typically employed for applications that rely on the
precise allocation of resources specified by the workload, with memory being immediately available.
To maintain the aforementioned security and node health guarantees,
these Pods are not permitted to use swap memory when `LimitedSwap` is in effect.
In addition, high-priority pods are not permitted to use swap in order to ensure the memory
they consume always resides in RAM, hence ready to use.

Prior to detailing the calculation of the swap limit, it is necessary to define the following terms:
* `nodeTotalMemory`: The total amount of physical memory available on the node.
* `totalPodsSwapAvailable`: The total amount of swap memory on the node that is available for use by Pods (some swap memory may be reserved for system use).
* `containerMemoryRequest`: The container's memory request.

Swap limitation is configured as:
( `containerMemoryRequest` / `nodeTotalMemory` ) × `totalPodsSwapAvailable`

In other words, the amount of swap that a container is able to use is proportionate to its
memory request, the node's total physical memory and the total amount of swap memory on
the node that is available for use by Pods.

It is important to note that, for containers within Burstable QoS Pods, it is possible to
opt-out of swap usage by specifying memory requests that are equal to memory limits.
Containers configured in this manner will not have access to swap memory.

## What's next

- To learn about managing swap on Linux nodes, read
  configuring swap memory on Kubernetes nodes.
- You can check out a blog post about Kubernetes and swap
- For background information, please see the original KEP, KEP-2400,
and its design.
