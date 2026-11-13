---
title: "Kubelet Summary API (v1alpha1)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubelet-api/stats.v1alpha1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Kubelet Summary API (v1alpha1)

## Resource Types

- Summary

## `AcceleratorStats`     {#AcceleratorStats}

**Appears in:**

- ContainerStats

AcceleratorStats contains stats for accelerators attached to the container.

 | Field | Description

 | `make` [Required]
`string`

 |
   Make of the accelerator (nvidia, amd, google etc.)

 | `model` [Required]
`string`

 |
   Model of the accelerator (tesla-p100, tesla-k80 etc.)

 | `id` [Required]
`string`

 |
   ID of the accelerator.

 | `memoryTotal` [Required]
`uint64`

 |
   Total accelerator memory.
unit: bytes

 | `memoryUsed` [Required]
`uint64`

 |
   Total accelerator memory allocated.
unit: bytes

 | `dutyCycle` [Required]
`uint64`

 |
   Percent of time over the past sample period (10s) during which
the accelerator was actively processing.

## `CPUStats`     {#CPUStats}

**Appears in:**

- ContainerStats

- NodeStats

- PodStats

CPUStats contains data about CPU usage.

 | Field | Description

 | `time` [Required]
`meta/v1.Time`

 |
   The time at which these stats were updated.

 | `usageNanoCores`
`uint64`

 |
   Total CPU usage (sum of all cores) averaged over the sample window.
The "core" unit can be interpreted as CPU core-nanoseconds per second.

 | `usageCoreNanoSeconds`
`uint64`

 |
   Cumulative CPU usage (sum of all cores) since object creation.

 | `psi`
`PSIStats`

 |
   CPU PSI stats.

## `ContainerStats`     {#ContainerStats}

**Appears in:**

- NodeStats

- PodStats

ContainerStats holds container-level unprocessed sample stats.

 | Field | Description

 | `name` [Required]
`string`

 |
   Reference to the measured container.

 | `startTime` [Required]
`meta/v1.Time`

 |
   The time at which data collection for this container was (re)started.

 | `cpu`
`CPUStats`

 |
   Stats pertaining to CPU resources.

 | `memory`
`MemoryStats`

 |
   Stats pertaining to memory (RAM) resources.

 | `io`
`IOStats`

 |
   Stats pertaining to IO resources.

 | `accelerators` [Required]
`[]AcceleratorStats`

 |
   Metrics for Accelerators. Each Accelerator corresponds to one element in the array.

 | `rootfs`
`FsStats`

 |
   Stats pertaining to container rootfs usage of filesystem resources.
Rootfs.UsedBytes is the number of bytes used for the container write layer.

 | `logs`
`FsStats`

 |
   Stats pertaining to container logs usage of filesystem resources.
Logs.UsedBytes is the number of bytes used for the container logs.

 | `userDefinedMetrics` [Required]
`[]UserDefinedMetric`

 |
   User defined metrics that are exposed by containers in the pod. Typically, we expect only one container in the pod to be exposing user defined metrics. In the event of multiple containers exposing metrics, they will be combined here.

 | `swap`
`SwapStats`

 |
   Stats pertaining to swap resources. This is reported to non-windows systems only.

## `FsStats`     {#FsStats}

**Appears in:**

- ContainerStats

- NodeStats

- PodStats

- RuntimeStats

- VolumeStats

FsStats contains data about filesystem usage.

 | Field | Description

 | `time` [Required]
`meta/v1.Time`

 |
   The time at which these stats were updated.

 | `availableBytes`
`uint64`

 |
   AvailableBytes represents the storage space available (bytes) for the filesystem.

 | `capacityBytes`
`uint64`

 |
   CapacityBytes represents the total capacity (bytes) of the filesystems underlying storage.

 | `usedBytes`
`uint64`

 |
   UsedBytes represents the bytes used for a specific task on the filesystem.
This may differ from the total bytes used on the filesystem and may not equal CapacityBytes - AvailableBytes.
e.g. For ContainerStats.Rootfs this is the bytes used by the container rootfs on the filesystem.

 | `inodesFree`
`uint64`

 |
   InodesFree represents the free inodes in the filesystem.

 | `inodes`
`uint64`

 |
   Inodes represents the total inodes in the filesystem.

 | `inodesUsed` [Required]
`uint64`

 |
   InodesUsed represents the inodes used by the filesystem
This may not equal Inodes - InodesFree because this filesystem may share inodes with other "filesystems"
e.g. For ContainerStats.Rootfs, this is the inodes used only by that container, and does not count inodes used by other containers.

## `IOStats`     {#IOStats}

**Appears in:**

- ContainerStats

- NodeStats

- PodStats

IOStats contains data about IO usage.

 | Field | Description

 | `time` [Required]
`meta/v1.Time`

 |
   The time at which these stats were updated.

 | `psi`
`PSIStats`

 |
   IO PSI stats.

## `InterfaceStats`     {#InterfaceStats}

**Appears in:**

- NetworkStats

InterfaceStats contains resource value data about interface.

 | Field | Description

 | `name` [Required]
`string`

 |
   The name of the interface

 | `rxBytes`
`uint64`

 |
   Cumulative count of bytes received.

 | `rxErrors`
`uint64`

 |
   Cumulative count of receive errors encountered.

 | `txBytes`
`uint64`

 |
   Cumulative count of bytes transmitted.

 | `txErrors`
`uint64`

 |
   Cumulative count of transmit errors encountered.

## `MemoryStats`     {#MemoryStats}

**Appears in:**

- ContainerStats

- NodeStats

- PodStats

MemoryStats contains data about memory usage.

 | Field | Description

 | `time` [Required]
`meta/v1.Time`

 |
   The time at which these stats were updated.

 | `availableBytes`
`uint64`

 |
   Available memory for use.  This is defined as the memory limit - workingSetBytes.
If memory limit is undefined, the available bytes is omitted.

 | `usageBytes`
`uint64`

 |
   Total memory in use. This includes all memory regardless of when it was accessed.

 | `workingSetBytes`
`uint64`

 |
   The amount of working set memory. This includes recently accessed memory,
dirty memory, and kernel memory. WorkingSetBytes is <= UsageBytes

 | `rssBytes`
`uint64`

 |
   The amount of anonymous and swap cache memory (includes transparent
hugepages).

 | `pageFaults`
`uint64`

 |
   Cumulative number of minor page faults.

 | `majorPageFaults`
`uint64`

 |
   Cumulative number of major page faults.

 | `psi`
`PSIStats`

 |
   Memory PSI stats.

## `NetworkStats`     {#NetworkStats}

**Appears in:**

- NodeStats

- PodStats

NetworkStats contains data about network resources.

 | Field | Description

 | `time` [Required]
`meta/v1.Time`

 |
   The time at which these stats were updated.

 | `InterfaceStats` [Required]
`InterfaceStats`

 |
   Stats for the default interface, if found

 | `interfaces` [Required]
`[]InterfaceStats`

 |
   No description provided.

## `NodeStats`     {#NodeStats}

**Appears in:**

- Summary

NodeStats holds node-level unprocessed sample stats.

 | Field | Description

 | `nodeName` [Required]
`string`

 |
   Reference to the measured Node.

 | `systemContainers`
`[]ContainerStats`

 |
   Stats of system daemons tracked as raw containers.
The system containers are named according to the SystemContainer* constants.

 | `startTime` [Required]
`meta/v1.Time`

 |
   The time at which data collection for the node-scoped (i.e. aggregate) stats was (re)started.

 | `cpu`
`CPUStats`

 |
   Stats pertaining to CPU resources.

 | `memory`
`MemoryStats`

 |
   Stats pertaining to memory (RAM) resources.

 | `io`
`IOStats`

 |
   Stats pertaining to IO resources.

 | `network`
`NetworkStats`

 |
   Stats pertaining to network resources.

 | `fs`
`FsStats`

 |
   Stats pertaining to total usage of filesystem resources on the rootfs used by node k8s components.
NodeFs.Used is the total bytes used on the filesystem.

 | `runtime`
`RuntimeStats`

 |
   Stats about the underlying container runtime.

 | `rlimit`
`RlimitStats`

 |
   Stats about the rlimit of system.

 | `swap`
`SwapStats`

 |
   Stats pertaining to swap resources. This is reported to non-windows systems only.

## `PSIData`     {#PSIData}

**Appears in:**

- PSIStats

PSI data for an individual resource.

 | Field | Description

 | `total` [Required]
`uint64`

 |
   Total time duration for tasks in the cgroup have waited due to congestion.
Unit: nanoseconds.

 | `avg10` [Required]
`float64`

 |
   The average (in %) tasks have waited due to congestion over a 10 second window.

 | `avg60` [Required]
`float64`

 |
   The average (in %) tasks have waited due to congestion over a 60 second window.

 | `avg300` [Required]
`float64`

 |
   The average (in %) tasks have waited due to congestion over a 300 second window.

## `PSIStats`     {#PSIStats}

**Appears in:**

- CPUStats

- IOStats

- MemoryStats

PSI statistics for an individual resource.

 | Field | Description

 | `full` [Required]
`PSIData`

 |
   PSI data for all tasks in the cgroup.

 | `some` [Required]
`PSIData`

 |
   PSI data for some tasks in the cgroup.

## `PVCReference`     {#PVCReference}

**Appears in:**

- VolumeStats

PVCReference contains enough information to describe the referenced PVC.

 | Field | Description

 | `name` [Required]
`string`

 |
   No description provided.

 | `namespace` [Required]
`string`

 |
   No description provided.

## `PodReference`     {#PodReference}

**Appears in:**

- PodStats

PodReference contains enough information to locate the referenced pod.

 | Field | Description

 | `name` [Required]
`string`

 |
   No description provided.

 | `namespace` [Required]
`string`

 |
   No description provided.

 | `uid` [Required]
`string`

 |
   No description provided.

## `PodStats`     {#PodStats}

**Appears in:**

- Summary

PodStats holds pod-level unprocessed sample stats.

 | Field | Description

 | `podRef` [Required]
`PodReference`

 |
   Reference to the measured Pod.

 | `startTime` [Required]
`meta/v1.Time`

 |
   The time at which data collection for the pod-scoped (e.g. network) stats was (re)started.

 | `containers` [Required]
`[]ContainerStats`

 |
   Stats of containers in the measured pod.

 | `cpu`
`CPUStats`

 |
   Stats pertaining to CPU resources consumed by pod cgroup (which includes all containers' resource usage and pod overhead).

 | `memory`
`MemoryStats`

 |
   Stats pertaining to memory (RAM) resources consumed by pod cgroup (which includes all containers' resource usage and pod overhead).

 | `io`
`IOStats`

 |
   Stats pertaining to IO resources consumed by pod cgroup (which includes all containers' resource usage and pod overhead).

 | `network`
`NetworkStats`

 |
   Stats pertaining to network resources.

 | `volume`
`[]VolumeStats`

 |
   Stats pertaining to volume usage of filesystem resources.
VolumeStats.UsedBytes is the number of bytes used by the Volume

 | `ephemeral-storage`
`FsStats`

 |
   EphemeralStorage reports the total filesystem usage for the containers and emptyDir-backed volumes in the measured Pod.

 | `process_stats`
`ProcessStats`

 |
   ProcessStats pertaining to processes.

 | `swap`
`SwapStats`

 |
   Stats pertaining to swap resources. This is reported to non-windows systems only.

## `ProcessStats`     {#ProcessStats}

**Appears in:**

- PodStats

ProcessStats are stats pertaining to processes.

 | Field | Description

 | `process_count`
`uint64`

 |
   Number of processes

## `RlimitStats`     {#RlimitStats}

**Appears in:**

- NodeStats

RlimitStats are stats rlimit of OS.

 | Field | Description

 | `time` [Required]
`meta/v1.Time`

 |
   No description provided.

 | `maxpid` [Required]
`int64`

 |
   The max number of extant process (threads, precisely on Linux) of OS. See RLIMIT_NPROC in getrlimit(2).
The operating system ceiling on the number of process IDs that can be assigned.
On Linux, tasks (either processes or threads) consume 1 PID each.

 | `curproc` [Required]
`int64`

 |
   The number of running process (threads, precisely on Linux) in the OS.

## `RuntimeStats`     {#RuntimeStats}

**Appears in:**

- NodeStats

RuntimeStats are stats pertaining to the underlying container runtime.

 | Field | Description

 | `imageFs`
`FsStats`

 |
   Stats about the underlying filesystem where container images are stored.
This filesystem could be the same as the primary (root) filesystem.
Usage here refers to the total number of bytes occupied by images on the filesystem.

 | `containerFs`
`FsStats`

 |
   Stats about the underlying filesystem where container's writeable layer is stored.
This filesystem could be the same as the primary (root) filesystem or the ImageFS.
Usage here refers to the total number of bytes occupied by the writeable layer on the filesystem.

## `SwapStats`     {#SwapStats}

**Appears in:**

- ContainerStats

- NodeStats

- PodStats

SwapStats contains data about memory usage

 | Field | Description

 | `time` [Required]
`meta/v1.Time`

 |
   The time at which these stats were updated.

 | `swapAvailableBytes`
`uint64`

 |
   Available swap memory for use.  This is defined as the  - .
If swap limit is undefined, this value is omitted.

 | `swapUsageBytes`
`uint64`

 |
   Total swap memory in use.

## `UserDefinedMetric`     {#UserDefinedMetric}

**Appears in:**

- ContainerStats

UserDefinedMetric represents a metric defined and generated by users.

 | Field | Description

 | `UserDefinedMetricDescriptor` [Required]
`UserDefinedMetricDescriptor`

 |
   No description provided.

 | `time` [Required]
`meta/v1.Time`

 |
   The time at which these stats were updated.

 | `value` [Required]
`float64`

 |
   Value of the metric. Float64s have 53 bit precision.
We do not foresee any metrics exceeding that value.

## `UserDefinedMetricDescriptor`     {#UserDefinedMetricDescriptor}

**Appears in:**

- UserDefinedMetric

UserDefinedMetricDescriptor contains metadata that describes a user defined metric.

 | Field | Description

 | `name` [Required]
`string`

 |
   The name of the metric.

 | `type` [Required]
`UserDefinedMetricType`

 |
   Type of the metric.

 | `units` [Required]
`string`

 |
   Display Units for the stats.

 | `labels`
`map[string]string`

 |
   Metadata labels associated with this metric.

## `UserDefinedMetricType`     {#UserDefinedMetricType}

(Alias of `string`)

**Appears in:**

- UserDefinedMetricDescriptor

UserDefinedMetricType defines how the metric should be interpreted by the user.

## `VolumeStats`     {#VolumeStats}

**Appears in:**

- PodStats

VolumeStats contains data about Volume filesystem usage.

 | Field | Description

 | `FsStats` [Required]
`FsStats`

 |
   Embedded FsStats

 | `name`
`string`

 |
   Name is the name given to the Volume

 | `pvcRef`
`PVCReference`

 |
   Reference to the PVC, if one exists
