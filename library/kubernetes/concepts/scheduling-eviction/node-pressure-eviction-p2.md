---
title: "Node-pressure Eviction (part 2 of 2)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/concepts/scheduling-eviction/node-pressure-eviction.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Node-pressure Eviction (part 2 of 2)

## Node conditions {#node-conditions}

The kubelet reports node conditions
to reflect that the node is under pressure because hard or soft eviction
threshold is met, independent of configured grace periods.

The kubelet maps eviction signals to node conditions as follows:

| Node Condition    | Eviction Signal                                                                       | Description                                                                                |
|-------------------|---------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------|
| `MemoryPressure`  | `memory.available`                                                                    | Available memory on the node has satisfied an eviction threshold                           |
| `DiskPressure`    | `nodefs.available`, `nodefs.inodesFree`, `imagefs.available`, `imagefs.inodesFree`, `containerfs.available`, or `containerfs.inodesFree` | Available disk space and inodes on either the node's root filesystem, image filesystem, or container filesystem has satisfied an eviction threshold              |
| `PIDPressure`     | `pid.available`                                                                       | Available processes identifiers on the (Linux) node has fallen below an eviction threshold |

The control plane also maps
these node conditions to taints.

The kubelet updates the node conditions based on the configured
`nodeStatusUpdateFrequency`, which defaults to `10s`.

### Node condition oscillation

In some cases, nodes oscillate above and below soft eviction thresholds without
holding for the defined grace periods. This causes the reported node condition
to constantly switch between `true` and `false`, leading to bad eviction decisions.

To protect against oscillation, you can use the `eviction-pressure-transition-period`
flag, which controls how long the kubelet must wait before transitioning a node
condition to a different state. The transition period has a default value of `5m`.

### Reclaiming node level resources {#reclaim-node-resources}

The kubelet tries to reclaim node-level resources before it evicts end-user pods.

When a `DiskPressure` node condition is reported, the kubelet reclaims node-level
resources based on the filesystems on the node.

#### Without `imagefs` or `containerfs`

If the node only has a `nodefs` filesystem that meets eviction thresholds,
the kubelet frees up disk space in the following order:

1. Garbage collect dead pods and containers.
1. Delete unused images.

#### With `imagefs`

If the node has a dedicated `imagefs` filesystem for container runtimes to use,
the kubelet does the following:

- If the `nodefs` filesystem meets the eviction thresholds, the kubelet garbage
  collects dead pods and containers.

- If the `imagefs` filesystem meets the eviction thresholds, the kubelet
  deletes all unused images.

#### With `imagefs` and `containerfs`

If the node has a dedicated `containerfs` alongside the `imagefs` filesystem
configured for the container runtimes to use, then kubelet will attempt to
reclaim resources as follows:

- If the `containerfs` filesystem meets the eviction thresholds, the kubelet
  garbage collects dead pods and containers.

- If the `imagefs` filesystem meets the eviction thresholds, the kubelet
  deletes all unused images.

### Pod selection for kubelet eviction

If the kubelet's attempts to reclaim node-level resources don't bring the eviction
signal below the threshold, the kubelet begins to evict end-user pods.

The kubelet uses the following parameters to determine the pod eviction order:

1. Whether the pod's resource usage exceeds requests
1. Pod Priority
1. The pod's resource usage relative to requests

As a result, kubelet ranks and evicts pods in the following order:

1. `BestEffort` or `Burstable` pods where the usage exceeds requests. These pods
   are evicted based on their Priority and then by how much their usage level
   exceeds the request.

1. `Guaranteed` pods and `Burstable` pods where the usage is less than requests
   are evicted last, based on their Priority.

**Note:**
The kubelet does not use the pod's QoS class to determine the eviction order.
You can use the QoS class to estimate the most likely pod eviction order when
reclaiming resources like memory. QoS classification does not apply to EphemeralStorage requests,
so the above scenario will not apply if the node is, for example, under `DiskPressure`.

`Guaranteed` pods are guaranteed only when requests and limits are specified for
all the containers and they are equal. These pods will never be evicted because
of another pod's resource consumption. If a system daemon (such as `kubelet`
and `journald`) is consuming more resources than were reserved via
`systemReserved` or `kubeReserved` allocations, and the node only has
`Guaranteed` or `Burstable` pods using less resources than requests left on it,
then the kubelet must choose to evict one of these pods to preserve node stability
and to limit the impact of resource starvation on other pods. In this case, it
will choose to evict pods of lowest Priority first.

If you are running a static pod
and want to avoid having it evicted under resource pressure, set the
`priority` field for that Pod directly. Static pods do not support the
`priorityClassName` field.

When the kubelet evicts pods in response to inode or process ID starvation, it uses
the Pods' relative priority to determine the eviction order, because inodes and PIDs have no
requests.

The kubelet sorts pods differently based on whether the node has a dedicated
`imagefs` or `containerfs` filesystem:

#### Without `imagefs` or `containerfs` (`nodefs` and `imagefs` use the same filesystem) {#without-imagefs}

- If `nodefs` triggers evictions, the kubelet sorts pods based on their
  total disk usage (`local volumes + logs and a writable layer of all containers`).

#### With `imagefs` (`nodefs` and `imagefs` filesystems are separate) {#with-imagefs}

- If `nodefs` triggers evictions, the kubelet sorts pods based on `nodefs`
  usage (`local volumes + logs of all containers`).

- If `imagefs` triggers evictions, the kubelet sorts pods based on the
  writable layer usage of all containers.

#### With `imagefs` and `containerfs` (`imagefs` and `containerfs` have been split) {#with-containersfs}

- If `containerfs` triggers evictions, the kubelet sorts pods based on
  `containerfs` usage (`local volumes + logs and a writable layer of all containers`).

- If `imagefs` triggers evictions, the kubelet sorts pods based on the
  `storage of images` rank, which represents the disk usage of a given image.

### Minimum eviction reclaim

**Note:**
As of Kubernetes v, you cannot set a custom value
for the `containerfs.available` metric. The configuration for this specific
metric will be set automatically to reflect values set for either the `nodefs`
or `imagefs`, depending on the configuration.

In some cases, pod eviction only reclaims a small amount of the starved resource.
This can lead to the kubelet repeatedly hitting the configured eviction thresholds
and triggering multiple evictions.

You can use the `evictionMinimumReclaim` field in a kubelet config file to configure a minimum reclaim amount for each resource. When the kubelet notices
that a resource is starved, it continues to reclaim that resource until it
reclaims the quantity you specify.

For example, the following configuration sets minimum reclaim amounts:

```yaml
apiVersion: kubelet.config.k8s.io/v1beta1
kind: KubeletConfiguration
evictionHard:
  memory.available: "500Mi"
  nodefs.available: "1Gi"
  imagefs.available: "100Gi"
evictionMinimumReclaim:
  memory.available: "0Mi"
  nodefs.available: "500Mi"
  imagefs.available: "2Gi"
```

In this example, if the `nodefs.available` signal meets the eviction threshold,
the kubelet reclaims the resource until the signal reaches the threshold of 1GiB,
and then continues to reclaim the minimum amount of 500MiB, until the available
nodefs storage value reaches 1.5GiB.

Similarly, the kubelet tries to reclaim the `imagefs` resource until the `imagefs.available`
value reaches `102Gi`, representing 102 GiB of available container image storage. If the amount
of storage that the kubelet could reclaim is less than 2GiB, the kubelet doesn't reclaim anything.

The default `evictionMinimumReclaim` is `0` for all resources.

## Node out of memory behavior

If the node experiences an _out of memory_ (OOM) event prior to the kubelet
being able to reclaim memory, the node depends on the oom_killer
to respond.

The kubelet sets an `oom_score_adj` value for each container based on the QoS for the pod.

| Quality of Service | `oom_score_adj`                                                                   |
|--------------------|-----------------------------------------------------------------------------------|
| `Guaranteed`       | -997                                                                              |
| `BestEffort`       | 1000                                                                              |
| `Burstable`        | _min(max(2, 1000 - (1000 × memoryRequestBytes) / machineMemoryCapacityBytes), 999)_ |

**Note:**
The kubelet also sets an `oom_score_adj` value of `-997` for any containers in Pods that have
`system-node-critical` Priority.

If the kubelet can't reclaim memory before a node experiences OOM, the
`oom_killer` calculates an `oom_score` based on the percentage of memory it's
using on the node, and then adds the `oom_score_adj` to get an effective `oom_score`
for each container. It then kills the container with the highest score.

This means that containers in low QoS pods that consume a large amount of memory
relative to their scheduling requests are killed first.

Unlike pod eviction, if a container is OOM killed, the kubelet can restart it
based on its `restartPolicy`.

## Good practices {#node-pressure-eviction-good-practices}

The following sections describe good practice for eviction configuration.

### Schedulable resources and eviction policies

When you configure the kubelet with an eviction policy, you should make sure that
the scheduler will not schedule pods if they will trigger eviction because they
immediately induce memory pressure.

Consider the following scenario:

- Node memory capacity: 10GiB
- Operator wants to reserve 10% of memory capacity for system daemons (kernel, `kubelet`, etc.)
- Operator wants to evict Pods at 95% memory utilization to reduce incidence of system OOM.

For this to work, the kubelet configuration file is populated as follows:

```yaml
apiVersion: kubelet.config.k8s.io/v1beta1
kind: KubeletConfiguration
evictionHard:
  memory.available: "500Mi"
systemReserved:
  memory: "1.5Gi"
```

In this configuration, the `systemReserved` reserves 1.5GiB of memory
for the system, which is `10% of the total memory + the eviction threshold amount`.

The node can reach the eviction threshold if a pod is using more than its request,
or if the system is using more than 1GiB of memory, which makes the `memory.available`
signal fall below 500MiB and triggers the threshold.

### DaemonSets and node-pressure eviction {#daemonset}

Pod priority is a major factor in making eviction decisions. If you do not want
the kubelet to evict pods that belong to a DaemonSet, give those pods a high
enough priority by specifying a suitable `priorityClassName` in the pod spec.
You can also use a lower priority, or the default, to only allow pods from that
DaemonSet to run when there are enough resources.

## Known issues

The following sections describe known issues related to out of resource handling.

### kubelet may not observe memory pressure right away

By default, the kubelet polls cAdvisor to collect memory usage stats at a
regular interval. If memory usage increases within that window rapidly, the
kubelet may not observe `MemoryPressure` fast enough, and the OOM killer
will still be invoked.

You can use the `kernelMemcgNotification` configuration field to enable the `memcg`
notification API on the kubelet to get notified immediately when a threshold
is crossed.

If you are not trying to achieve extreme utilization, but a sensible measure of
overcommit, a viable workaround for this issue is to use the `kubeReserved`
and `systemReserved` configuration fields to allocate memory for the system.

### active_file memory is not considered as available memory

On Linux, the kernel tracks the number of bytes of file-backed memory on active
least recently used (LRU) list as the `active_file` statistic. The kubelet treats `active_file` memory
areas as not reclaimable. For workloads that make intensive use of block-backed
local storage, including ephemeral local storage, kernel-level caches of file
and block data means that many recently accessed cache pages are likely to be
counted as `active_file`. If enough of these kernel block buffers are on the
active LRU list, the kubelet is liable to observe this as high resource use and
taint the node as experiencing memory pressure - triggering pod eviction.

For more details, see https://github.com/kubernetes/kubernetes/issues/43916

You can work around that behavior by setting the memory limit and memory request
the same for containers likely to perform intensive I/O activity. You will need
to estimate or measure an optimal memory limit value for that container.

## What's next

- Learn about API-initiated Eviction
- Learn about Pod Priority and Preemption
- Learn about PodDisruptionBudgets
- Learn about Quality of Service (QoS)
- Check out the Eviction API
