---
title: "kube-controller-manager Configuration (v1alpha1) (part 3 of 4)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/config-api/kube-controller-manager-config.v1alpha1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# kube-controller-manager Configuration (v1alpha1) (part 3 of 4)

## `EndpointSliceMirroringControllerConfiguration`     {#kubecontrollermanager-config-k8s-io-v1alpha1-EndpointSliceMirroringControllerConfiguration}

**Appears in:**

- KubeControllerManagerConfiguration

EndpointSliceMirroringControllerConfiguration contains elements describing
EndpointSliceMirroringController.

 | Field | Description

 | `MirroringConcurrentServiceEndpointSyncs` [Required]
`int32`

 |
   mirroringConcurrentServiceEndpointSyncs is the number of service endpoint
syncing operations that will be done concurrently. Larger number = faster
endpoint slice updating, but more CPU (and network) load.

 | `MirroringMaxEndpointsPerSubset` [Required]
`int32`

 |
   mirroringMaxEndpointsPerSubset is the maximum number of endpoints that
will be mirrored to an EndpointSlice for an EndpointSubset.

 | `MirroringEndpointUpdatesBatchPeriod` [Required]
`meta/v1.Duration`

 |
   mirroringEndpointUpdatesBatchPeriod can be used to batch EndpointSlice
updates. All updates triggered by EndpointSlice changes will be delayed
by up to 'mirroringEndpointUpdatesBatchPeriod'. If other addresses in the
same Endpoints resource change in that period, they will be batched to a
single EndpointSlice update. Default 0 value means that each Endpoints
update triggers an EndpointSlice update.

## `EphemeralVolumeControllerConfiguration`     {#kubecontrollermanager-config-k8s-io-v1alpha1-EphemeralVolumeControllerConfiguration}

**Appears in:**

- KubeControllerManagerConfiguration

EphemeralVolumeControllerConfiguration contains elements describing EphemeralVolumeController.

 | Field | Description

 | `ConcurrentEphemeralVolumeSyncs` [Required]
`int32`

 |
   ConcurrentEphemeralVolumeSyncseSyncs is the number of ephemeral volume syncing operations
that will be done concurrently. Larger number = faster ephemeral volume updating,
but more CPU (and network) load.

## `GarbageCollectorControllerConfiguration`     {#kubecontrollermanager-config-k8s-io-v1alpha1-GarbageCollectorControllerConfiguration}

**Appears in:**

- KubeControllerManagerConfiguration

GarbageCollectorControllerConfiguration contains elements describing GarbageCollectorController.

 | Field | Description

 | `EnableGarbageCollector` [Required]
`bool`

 |
   enables the generic garbage collector. MUST be synced with the
corresponding flag of the kube-apiserver. WARNING: the generic garbage
collector is an alpha feature.

 | `ConcurrentGCSyncs` [Required]
`int32`

 |
   concurrentGCSyncs is the number of garbage collector workers that are
allowed to sync concurrently.

 | `GCIgnoredResources` [Required]
`[]GroupResource`

 |
   gcIgnoredResources is the list of GroupResources that garbage collection should ignore.

## `GroupResource`     {#kubecontrollermanager-config-k8s-io-v1alpha1-GroupResource}

**Appears in:**

- GarbageCollectorControllerConfiguration

GroupResource describes an group resource.

 | Field | Description

 | `Group` [Required]
`string`

 |
   group is the group portion of the GroupResource.

 | `Resource` [Required]
`string`

 |
   resource is the resource portion of the GroupResource.

## `HPAControllerConfiguration`     {#kubecontrollermanager-config-k8s-io-v1alpha1-HPAControllerConfiguration}

**Appears in:**

- KubeControllerManagerConfiguration

HPAControllerConfiguration contains elements describing HPAController.

 | Field | Description

 | `ConcurrentHorizontalPodAutoscalerSyncs` [Required]
`int32`

 |
   ConcurrentHorizontalPodAutoscalerSyncs is the number of HPA objects that are allowed to sync concurrently.
Larger number = more responsive HPA processing, but more CPU (and network) load.

 | `HorizontalPodAutoscalerSyncPeriod` [Required]
`meta/v1.Duration`

 |
   HorizontalPodAutoscalerSyncPeriod is the period for syncing the number of
pods in horizontal pod autoscaler.

 | `HorizontalPodAutoscalerDownscaleStabilizationWindow` [Required]
`meta/v1.Duration`

 |
   HorizontalPodAutoscalerDowncaleStabilizationWindow is a period for which autoscaler will look
backwards and not scale down below any recommendation it made during that period.

 | `HorizontalPodAutoscalerTolerance` [Required]
`float64`

 |
   HorizontalPodAutoscalerTolerance is the tolerance for when
resource usage suggests upscaling/downscaling

 | `HorizontalPodAutoscalerCPUInitializationPeriod` [Required]
`meta/v1.Duration`

 |
   HorizontalPodAutoscalerCPUInitializationPeriod is the period after pod start when CPU samples
might be skipped.

 | `HorizontalPodAutoscalerInitialReadinessDelay` [Required]
`meta/v1.Duration`

 |
   HorizontalPodAutoscalerInitialReadinessDelay is period after pod start during which readiness
changes are treated as readiness being set for the first time. The only effect of this is that
HPA will disregard CPU samples from unready pods that had last readiness change during that
period.

## `JobControllerConfiguration`     {#kubecontrollermanager-config-k8s-io-v1alpha1-JobControllerConfiguration}

**Appears in:**

- KubeControllerManagerConfiguration

JobControllerConfiguration contains elements describing JobController.

 | Field | Description

 | `ConcurrentJobSyncs` [Required]
`int32`

 |
   concurrentJobSyncs is the number of job objects that are
allowed to sync concurrently. Larger number = more responsive jobs,
but more CPU (and network) load.

## `LegacySATokenCleanerConfiguration`     {#kubecontrollermanager-config-k8s-io-v1alpha1-LegacySATokenCleanerConfiguration}

**Appears in:**

- KubeControllerManagerConfiguration

LegacySATokenCleanerConfiguration contains elements describing LegacySATokenCleaner

 | Field | Description

 | `CleanUpPeriod` [Required]
`meta/v1.Duration`

 |
   CleanUpPeriod is the period of time since the last usage of an
auto-generated service account token before it can be deleted.

## `NamespaceControllerConfiguration`     {#kubecontrollermanager-config-k8s-io-v1alpha1-NamespaceControllerConfiguration}

**Appears in:**

- KubeControllerManagerConfiguration

NamespaceControllerConfiguration contains elements describing NamespaceController.

 | Field | Description

 | `NamespaceSyncPeriod` [Required]
`meta/v1.Duration`

 |
   namespaceSyncPeriod is the period for syncing namespace life-cycle
updates.

 | `ConcurrentNamespaceSyncs` [Required]
`int32`

 |
   concurrentNamespaceSyncs is the number of namespace objects that are
allowed to sync concurrently.

## `NodeIPAMControllerConfiguration`     {#kubecontrollermanager-config-k8s-io-v1alpha1-NodeIPAMControllerConfiguration}

**Appears in:**

- KubeControllerManagerConfiguration

NodeIPAMControllerConfiguration contains elements describing NodeIpamController.

 | Field | Description

 | `ServiceCIDR` [Required]
`string`

 |
   serviceCIDR is CIDR Range for Services in cluster.

 | `SecondaryServiceCIDR` [Required]
`string`

 |
   secondaryServiceCIDR is CIDR Range for Services in cluster. This is used in dual stack clusters. SecondaryServiceCIDR must be of different IP family than ServiceCIDR

 | `NodeCIDRMaskSize` [Required]
`int32`

 |
   NodeCIDRMaskSize is the mask size for node cidr in cluster.

 | `NodeCIDRMaskSizeIPv4` [Required]
`int32`

 |
   NodeCIDRMaskSizeIPv4 is the mask size for node cidr in dual-stack cluster.

 | `NodeCIDRMaskSizeIPv6` [Required]
`int32`

 |
   NodeCIDRMaskSizeIPv6 is the mask size for node cidr in dual-stack cluster.

## `NodeLifecycleControllerConfiguration`     {#kubecontrollermanager-config-k8s-io-v1alpha1-NodeLifecycleControllerConfiguration}

**Appears in:**

- KubeControllerManagerConfiguration

NodeLifecycleControllerConfiguration contains elements describing NodeLifecycleController.

 | Field | Description

 | `NodeEvictionRate` [Required]
`float32`

 |
   nodeEvictionRate is the number of nodes per second on which pods are deleted in case of node failure when a zone is healthy

 | `SecondaryNodeEvictionRate` [Required]
`float32`

 |
   secondaryNodeEvictionRate is the number of nodes per second on which pods are deleted in case of node failure when a zone is unhealthy

 | `NodeStartupGracePeriod` [Required]
`meta/v1.Duration`

 |
   nodeStartupGracePeriod is the amount of time which we allow starting a node to
be unresponsive before marking it unhealthy.

 | `NodeMonitorGracePeriod` [Required]
`meta/v1.Duration`

 |
   nodeMontiorGracePeriod is the amount of time which we allow a running node to be
unresponsive before marking it unhealthy. Must be N times more than kubelet's
nodeStatusUpdateFrequency, where N means number of retries allowed for kubelet
to post node status. This value should also be greater than the sum of
HTTP2_PING_TIMEOUT_SECONDS and HTTP2_READ_IDLE_TIMEOUT_SECONDS.

 | `PodEvictionTimeout` [Required]
`meta/v1.Duration`

 |
   podEvictionTimeout is the grace period for deleting pods on failed nodes.

 | `LargeClusterSizeThreshold` [Required]
`int32`

 |
   secondaryNodeEvictionRate is implicitly overridden to 0 for clusters smaller than or equal to largeClusterSizeThreshold

 | `UnhealthyZoneThreshold` [Required]
`float32`

 |
   Zone is treated as unhealthy in nodeEvictionRate and secondaryNodeEvictionRate when at least
unhealthyZoneThreshold (no less than 3) of Nodes in the zone are NotReady

 | `NodeMonitorPeriod` [Required]
`meta/v1.Duration`

 |
   NodeMonitorPeriod is the period for syncing NodeStatus in NodeLifecycleController.

## `PersistentVolumeBinderControllerConfiguration`     {#kubecontrollermanager-config-k8s-io-v1alpha1-PersistentVolumeBinderControllerConfiguration}

**Appears in:**

- KubeControllerManagerConfiguration

PersistentVolumeBinderControllerConfiguration contains elements describing
PersistentVolumeBinderController.

 | Field | Description

 | `PVClaimBinderSyncPeriod` [Required]
`meta/v1.Duration`

 |
   pvClaimBinderSyncPeriod is the period for syncing persistent volumes
and persistent volume claims.

 | `VolumeConfiguration` [Required]
`VolumeConfiguration`

 |
   volumeConfiguration holds configuration for volume related features.

## `PersistentVolumeRecyclerConfiguration`     {#kubecontrollermanager-config-k8s-io-v1alpha1-PersistentVolumeRecyclerConfiguration}

**Appears in:**

- VolumeConfiguration

PersistentVolumeRecyclerConfiguration contains elements describing persistent volume plugins.

 | Field | Description

 | `MaximumRetry` [Required]
`int32`

 |
   maximumRetry is number of retries the PV recycler will execute on failure to recycle
PV.

 | `MinimumTimeoutNFS` [Required]
`int32`

 |
   minimumTimeoutNFS is the minimum ActiveDeadlineSeconds to use for an NFS Recycler
pod.

 | `PodTemplateFilePathNFS` [Required]
`string`

 |
   podTemplateFilePathNFS is the file path to a pod definition used as a template for
NFS persistent volume recycling

 | `IncrementTimeoutNFS` [Required]
`int32`

 |
   incrementTimeoutNFS is the increment of time added per Gi to ActiveDeadlineSeconds
for an NFS scrubber pod.

 | `PodTemplateFilePathHostPath` [Required]
`string`

 |
   podTemplateFilePathHostPath is the file path to a pod definition used as a template for
HostPath persistent volume recycling. This is for development and testing only and
will not work in a multi-node cluster.

 | `MinimumTimeoutHostPath` [Required]
`int32`

 |
   minimumTimeoutHostPath is the minimum ActiveDeadlineSeconds to use for a HostPath
Recycler pod.  This is for development and testing only and will not work in a multi-node
cluster.

 | `IncrementTimeoutHostPath` [Required]
`int32`

 |
   incrementTimeoutHostPath is the increment of time added per Gi to ActiveDeadlineSeconds
for a HostPath scrubber pod.  This is for development and testing only and will not work
in a multi-node cluster.

## `PodGCControllerConfiguration`     {#kubecontrollermanager-config-k8s-io-v1alpha1-PodGCControllerConfiguration}

**Appears in:**

- KubeControllerManagerConfiguration

PodGCControllerConfiguration contains elements describing PodGCController.

 | Field | Description

 | `TerminatedPodGCThreshold` [Required]
`int32`

 |
   terminatedPodGCThreshold is the number of terminated pods that can exist
before the terminated pod garbage collector starts deleting terminated pods.
If <= 0, the terminated pod garbage collector is disabled.

## `ReplicaSetControllerConfiguration`     {#kubecontrollermanager-config-k8s-io-v1alpha1-ReplicaSetControllerConfiguration}

**Appears in:**

- KubeControllerManagerConfiguration

ReplicaSetControllerConfiguration contains elements describing ReplicaSetController.

 | Field | Description

 | `ConcurrentRSSyncs` [Required]
`int32`

 |
   concurrentRSSyncs is the number of replica sets that are  allowed to sync
concurrently. Larger number = more responsive replica  management, but more
CPU (and network) load.

## `ReplicationControllerConfiguration`     {#kubecontrollermanager-config-k8s-io-v1alpha1-ReplicationControllerConfiguration}

**Appears in:**

- KubeControllerManagerConfiguration

ReplicationControllerConfiguration contains elements describing ReplicationController.

 | Field | Description

 | `ConcurrentRCSyncs` [Required]
`int32`

 |
   concurrentRCSyncs is the number of replication controllers that are
allowed to sync concurrently. Larger number = more responsive replica
management, but more CPU (and network) load.

## `ResourceClaimControllerConfiguration`     {#kubecontrollermanager-config-k8s-io-v1alpha1-ResourceClaimControllerConfiguration}

**Appears in:**

- KubeControllerManagerConfiguration

ResourceClaimControllerConfiguration contains elements configuring the resource claim controller.

 | Field | Description

 | `ConcurrentSyncs` [Required]
`int32`

 |
   ConcurrentSyncs is the number of operations (deleting a pod, updating a ResourcClaim status, etc.)
that will be done concurrently. Larger number = processing, but more CPU (and network) load.
The default is 50.

## `ResourceQuotaControllerConfiguration`     {#kubecontrollermanager-config-k8s-io-v1alpha1-ResourceQuotaControllerConfiguration}

**Appears in:**

- KubeControllerManagerConfiguration

ResourceQuotaControllerConfiguration contains elements describing ResourceQuotaController.

 | Field | Description

 | `ResourceQuotaSyncPeriod` [Required]
`meta/v1.Duration`

 |
   resourceQuotaSyncPeriod is the period for syncing quota usage status
in the system.

 | `ConcurrentResourceQuotaSyncs` [Required]
`int32`

 |
   concurrentResourceQuotaSyncs is the number of resource quotas that are
allowed to sync concurrently. Larger number = more responsive quota
management, but more CPU (and network) load.
