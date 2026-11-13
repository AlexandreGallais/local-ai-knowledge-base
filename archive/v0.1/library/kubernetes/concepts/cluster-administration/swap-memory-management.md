---
title: "Swap memory management (part 1 of 2)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/concepts/cluster-administration/swap-memory-management.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Swap memory management

Kubernetes can be configured to use swap memory on a node,
allowing the kernel to free up physical memory by swapping out pages to backing storage.
This is useful for multiple use-cases.
For example, nodes running workloads that can benefit from using swap,
such as those that have large memory footprints but only access a portion of that memory at any given time.
It also helps prevent Pods from being terminated during memory pressure spikes,
shields nodes from system-level memory spikes that might compromise its stability,
allows for more flexible memory management on the node, and much more.

To learn about configuring swap in your cluster, read
Configuring swap memory on Kubernetes nodes.

## Operating system support

* Linux nodes support swap; you need to configure each node to enable it.
  By default, the kubelet will **not** start on a Linux node that has swap enabled.
* Windows nodes require swap space.
  By default, the kubelet does **not** start on a Windows node that has swap disabled.

## How does it work?

There are a number of possible ways that one could envision swap use on a node.
If kubelet is already running on a node, it would need to be restarted after swap is provisioned in order to identify it.

When kubelet starts on a node in which swap is provisioned and available
(with the `failSwapOn: false` configuration), kubelet will:
- Be able to start on this swap-enabled node.
- Direct the Container Runtime Interface (CRI) implementation, often referred to as the container runtime,
to allocate zero swap memory to Kubernetes workloads by default.

Swap configuration on a node is exposed to a cluster admin via the
`memorySwap` in the KubeletConfiguration.
As a cluster administrator, you can specify the node's behaviour in the
presence of swap memory by setting `memorySwap.swapBehavior`.

### Swap behaviors

You need to pick a swap behavior to
use. Different nodes in your cluster can use different swap behaviors.

The swap behaviors you can choose for Linux nodes are:

`NoSwap` (default)
: Workloads running as Pods on this node do not and cannot use swap.

`LimitedSwap`
: Kubernetes workloads can utilize swap memory.

**Note:**
If you choose the NoSwap behavior, and you configure the kubelet to tolerate
swap space (`failSwapOn: false`), then your workloads don't use any swap.

However, processes outside of Kubernetes-managed containers, such as systemd
services (and even the kubelet itself!) **can** utilize swap.

You can read configuring swap memory on Kubernetes nodes to learn about enabling swap for your cluster.

### Container runtime integration

The kubelet uses the container runtime API, and directs the container runtime to
apply specific configuration (for example, in the cgroup v2 case, `memory.swap.max`) in a manner that will
enable the desired swap configuration for a container. For runtimes that use control groups, or cgroups,
the container runtime is then responsible for writing these settings to the container-level cgroup.

## Observability for swap use

### Node and container level metric statistics

Kubelet now collects node and container level metric statistics,
which can be accessed at the `/metrics/resource` (which is used mainly by monitoring
tools like Prometheus) and `/stats/summary` (which is used mainly by Autoscalers) kubelet HTTP endpoints.
This allows clients who can directly request the kubelet to
monitor swap usage and remaining swap memory when using `LimitedSwap`.
Additionally, a `machine_swap_bytes` metric has been added to cadvisor to show
the total physical swap capacity of the machine.
See this page for more info.

For example, these `/metrics/resource` are supported:
- `node_swap_usage_bytes`: Current swap usage of the node in bytes.
- `container_swap_usage_bytes`: Current amount of the container swap usage in bytes.
- `container_swap_limit_bytes`: Current amount of the container swap limit in bytes.

### Using `kubectl top --show-swap`

Querying metrics is valuable, but somewhat cumbersome, as these metrics
are designed to be used by software rather than humans.
In order to consume this data in a more user-friendly way,
the `kubectl top` command has been extended to support swap metrics, using the `--show-swap` flag.

In order to receive information about swap usage on nodes, `kubectl top nodes --show-swap` can be used:
```shell
kubectl top nodes --show-swap
```

This will result in an output similar to:
```
NAME    CPU(cores)   CPU(%)   MEMORY(bytes)   MEMORY(%)   SWAP(bytes)    SWAP(%)       
node1   1m           10%      2Mi             10%         1Mi            0%   
node2   5m           10%      6Mi             10%         2Mi            0%   
node3   3m           10%      4Mi             10%         <unknown>      <unknown>   
```

In order to receive information about swap usage by pods, `kubectl top pods --show-swap` can be used:
```shell
kubectl top pod -n kube-system --show-swap
```

This will result in an output similar to:
```
NAME                                      CPU(cores)   MEMORY(bytes)   SWAP(bytes)
coredns-58d5bc5cdb-5nbk4                  2m           19Mi            0Mi
coredns-58d5bc5cdb-jsh26                  3m           37Mi            0Mi
etcd-node01                               51m          143Mi           5Mi
kube-apiserver-node01                     98m          824Mi           16Mi
kube-controller-manager-node01            20m          135Mi           9Mi
kube-proxy-ffgs2                          1m           24Mi            0Mi
kube-proxy-fhvwx                          1m           39Mi            0Mi
kube-scheduler-node01                     13m          69Mi            0Mi
metrics-server-8598789fdb-d2kcj           5m           26Mi            0Mi   
```

### Nodes to report swap capacity as part of node status

A new node status field is now added, `node.status.nodeInfo.swap.capacity`, to report the swap capacity of a node.

As an example, the following command can be used to retrieve the swap capacity of the nodes in a cluster:
```shell
kubectl get nodes -o go-template='{{range .items}}{{.metadata.name}}: {{if .status.nodeInfo.swap.capacity}}{{.status.nodeInfo.swap.capacity}}{{else}}<unknown>{{end}}{{"\n"}}{{end}}'
```

This will result in an output similar to:
```
node1: 21474836480
node2: 42949664768
node3: <unknown>
```

**Note:**

The `<unknown>` value indicates that the `.status.nodeInfo.swap.capacity` field is not set for that Node.
This probably means that the node does not have swap provisioned, or less likely,
that the kubelet is not able to determine the swap capacity of the node.

### Swap discovery using Node Feature Discovery (NFD) {#node-feature-discovery}

Node Feature Discovery
is a Kubernetes addon for detecting hardware features and configuration.
It can be utilized to discover which nodes are provisioned with swap.

As an example, to figure out which nodes are provisioned with swap,
use the following command:
```shell
kubectl get nodes -o jsonpath='{range .items[?(@.metadata.labels.feature\.node\.kubernetes\.io/memory-swap)]}{.metadata.name}{"\t"}{.metadata.labels.feature\.node\.kubernetes\.io/memory-swap}{"\n"}{end}'
```

This will result in an output similar to:
```
k8s-worker1: true
k8s-worker2: true
k8s-worker3: false
```

In this example, swap is provisioned on nodes `k8s-worker1` and `k8s-worker2`, but not on `k8s-worker3`.

## Risks and caveats

**Caution:**

It is deeply encouraged to encrypt the swap space.
See Memory-backed volumes memory-backed volumes for more info.

Having swap available on a system reduces predictability.
While swap can enhance performance by making more RAM available, swapping data
back to memory is a heavy operation, sometimes slower by many orders of magnitude,
which can cause unexpected performance regressions.
Furthermore, swap changes a system's behaviour under memory pressure.
Enabling swap increases the risk of noisy neighbors,
where Pods that frequently use their RAM may cause other Pods to swap.
In addition, since swap allows for greater memory usage for workloads in Kubernetes that cannot be predictably accounted for,
and due to unexpected packing configurations,
the scheduler currently does not account for swap memory usage.
This heightens the risk of noisy neighbors.

The performance of a node with swap memory enabled depends on the underlying physical storage.
When swap memory is in use, performance will be significantly worse in an I/O
operations per second (IOPS) constrained environment, such as a cloud VM with
I/O throttling, when compared to faster storage mediums like solid-state drives
or NVMe.
As swap might cause IO pressure, it is recommended to give a higher IO latency
priority to system critical daemons. See the relevant section in the
recommended practices section below.

### Memory-backed volumes

On Linux nodes, memory-backed volumes (such as `secret`
volume mounts, or `emptyDir` with `medium: Memory`)
are implemented with a `tmpfs` filesystem.
The contents of such volumes should remain in memory at all times, hence should
not be swapped to disk.
To ensure the contents of such volumes remain in memory, the `noswap` tmpfs option
is being used.

The Linux kernel officially supports the `noswap` option from version 6.3 (more info
can be found in Linux Kernel Version Requirements).
However, the different distributions often choose to backport this mount option to older
Linux versions as well.

In order to verify whether the node supports the `noswap` option, the kubelet will do the following:
* If the kernel's version is above 6.3 then the `noswap` option will be assumed to be supported.
* Otherwise, kubelet would try to mount a dummy tmpfs with the `noswap` option at startup.
  If kubelet fails with an error indicating of an unknown option, `noswap` will be assumed
  to not be supported, hence will not be used.
  A kubelet log entry will be emitted to warn the user about memory-backed volumes might swap to disk.
  If kubelet succeeds, the dummy tmpfs will be deleted and the `noswap` option will be used.
  * If the `noswap` option is not supported, kubelet will emit a warning log entry,
    then continue its execution.

See Configuring swap memory on Kubernetes nodes for an example of setting up swap.
However, handling encrypted swap is not within the scope of kubelet;
rather, it is a general OS configuration concern and should be addressed at that level.
It is the administrator's responsibility to provision encrypted swap to mitigate this risk.

### Evictions

Configuring memory eviction thresholds for swap-enabled nodes can be tricky.

With swap being disabled, it is reasonable to configure kubelet's eviction thresholds
to be a bit lower than the node's memory capacity.
The rationale is that we want Kubernetes to start evicting Pods before the node runs out of memory
and invokes the Out Of Memory (OOM) killer, since the OOM killer is not Kubernetes-aware,
therefore does not consider things like QoS, pod priority, or other Kubernetes-specific factors.

With swap enabled, the situation is more complex.
In Linux, the `vm.min_free_kbytes` parameter defines the memory threshold for the kernel
to start aggressively reclaiming memory, which includes swapping out pages.
If the kubelet's eviction thresholds are set in a way that eviction would take place
before the kernel starts reclaiming memory, it could lead to workloads never
being able to swap out during node memory pressure.
However, setting the eviction thresholds too high could result in the node running out of memory
and invoking the OOM killer, which is not ideal either.

To address this, it is recommended to set the kubelet's eviction thresholds
to be slightly lower than the `vm.min_free_kbytes` value.
This way, the node can start swapping before kubelet would start evicting Pods,
allowing workloads to swap out unused data and preventing evictions from happening.
On the other hand, since it is just slightly lower, kubelet is likely to start evicting Pods
before the node runs out of memory, thus avoiding the OOM killer.

The value of `vm.min_free_kbytes` can be determined by running the following command on the node:
```shell
cat /proc/sys/vm/min_free_kbytes
```

### Unutilized swap space

Under the `LimitedSwap` behavior, the amount of swap available to a Pod is determined automatically,
based on the proportion of the memory requested relative to the node's total memory
(For more details, see the section below).

This design means that usually there would be some portion of swap that will remain
restricted for Kubernetes workloads.
For example, since Kubernetes  does not permit swap use for
Pods in the Guaranteed QoS class,
the amount of swap that's proportional to the memory request for Guaranteed pods would
remain unused by Kubernetes workloads.

This behavior carries some risk in a situation where many pods are not eligible for swapping.
On the other hand, it effectively keeps some system-reserved amount of swap memory that can be used by processes
outside of Kubernetes' scope, such as system daemons and even kubelet itself.
