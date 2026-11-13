---
title: "Kubelet Configuration (v1beta1) (part 3 of 5)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/config-api/kubelet-config.v1beta1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Kubelet Configuration (v1beta1) (part 3 of 5)

|
   hairpinMode specifies how the Kubelet should configure the container
bridge for hairpin packets.
Setting this flag allows endpoints in a Service to loadbalance back to
themselves if they should try to access their own Service. Values:

"promiscuous-bridge": make the container bridge promiscuous.
"hairpin-veth":       set the hairpin flag on container veth interfaces.
"none":               do nothing.

Generally, one must set `--hairpin-mode=hairpin-veth to` achieve hairpin NAT,
because promiscuous-bridge assumes the existence of a container bridge named cbr0.
Default: "promiscuous-bridge"

 | `maxPods`
`int32`

 |
   maxPods is the maximum number of Pods that can run on this Kubelet.
The value must be a non-negative integer.
Default: 110

 | `podCIDR`
`string`

 |
   podCIDR is the CIDR to use for pod IP addresses, only used in standalone mode.
In cluster mode, this is obtained from the control plane.
Default: ""

 | `podPidsLimit`
`int64`

 |
   podPidsLimit is the maximum number of PIDs in any pod.
Default: -1

 | `resolvConf`
`string`

 |
   resolvConf is the resolver configuration file used as the basis
for the container DNS resolution configuration.
If set to the empty string, will override the default and effectively disable DNS lookups.
Default: "/etc/resolv.conf"

 | `runOnce`
`bool`

 |
   runOnce causes the Kubelet to check the API server once for pods,
run those in addition to the pods specified by static pod files, and exit.
Default: false

 | `cpuCFSQuota`
`bool`

 |
   cpuCFSQuota enables CPU CFS quota enforcement for containers that
specify CPU limits.
Default: true

 | `cpuCFSQuotaPeriod`
`meta/v1.Duration`

 |
   cpuCFSQuotaPeriod is the CPU CFS quota period value, `cpu.cfs_period_us`.
The value must be between 1 ms and 1 second, inclusive.
Requires the CustomCPUCFSQuotaPeriod feature gate to be enabled.
Default: "100ms"

 | `nodeStatusMaxImages`
`int32`

 |
   nodeStatusMaxImages caps the number of images reported in Node.status.images.
The value must be greater than -2.
Note: If -1 is specified, no cap will be applied. If 0 is specified, no image is returned.
Default: 50

 | `maxOpenFiles`
`int64`

 |
   maxOpenFiles is Number of files that can be opened by Kubelet process.
The value must be a non-negative number.
Default: 1000000

 | `contentType`
`string`

 |
   contentType is contentType of requests sent to apiserver.
Default: "application/vnd.kubernetes.protobuf"

 | `kubeAPIQPS`
`int32`

 |
   kubeAPIQPS is the QPS to use while talking with kubernetes apiserver.
Default: 50

 | `kubeAPIBurst`
`int32`

 |
   kubeAPIBurst is the burst to allow while talking with kubernetes API server.
This field cannot be a negative number.
Default: 100

 | `serializeImagePulls`
`bool`

 |
   serializeImagePulls when enabled, tells the Kubelet to pull images one
at a time. We recommend not changing the default value on nodes that
run docker daemon with version  < 1.9 or an Aufs storage backend.
Issue #10959 has more details.
Default: true

 | `maxParallelImagePulls`
`int32`

 |
   MaxParallelImagePulls sets the maximum number of image pulls in parallel.
This field cannot be set if SerializeImagePulls is true.
Setting it to nil means no limit.
Default: nil

 | `evictionHard`
`map[string]string`

 |
   evictionHard is a map of signal names to quantities that defines hard eviction
thresholds. For example: `{"memory.available": "300Mi"}`.
To explicitly disable, pass a 0% or 100% threshold on an arbitrary resource.
Default:
memory.available:  "100Mi"
nodefs.available:  "10%"
nodefs.inodesFree: "5%"
imagefs.available: "15%"

 | `evictionSoft`
`map[string]string`

 |
   evictionSoft is a map of signal names to quantities that defines soft eviction thresholds.
For example: `{"memory.available": "300Mi"}`.
Default: nil

 | `evictionSoftGracePeriod`
`map[string]string`

 |
   evictionSoftGracePeriod is a map of signal names to quantities that defines grace
periods for each soft eviction signal. For example: `{"memory.available": "30s"}`.
Default: nil

 | `evictionPressureTransitionPeriod`
`meta/v1.Duration`

 |
   evictionPressureTransitionPeriod is the duration for which the kubelet has to wait
before transitioning out of an eviction pressure condition.
A duration of 0s will be converted to the default value of 5m
Default: "5m"

 | `evictionMaxPodGracePeriod`
`int32`

 |
   evictionMaxPodGracePeriod is the maximum allowed grace period (in seconds) to use
when terminating pods in response to a soft eviction threshold being met. This value
effectively caps the Pod's terminationGracePeriodSeconds value during soft evictions.
Default: 0

 | `evictionMinimumReclaim`
`map[string]string`

 |
   evictionMinimumReclaim is a map of signal names to quantities that defines minimum reclaims,
which describe the minimum amount of a given resource the kubelet will reclaim when
performing a pod eviction while that resource is under pressure.
For example: `{"imagefs.available": "2Gi"}`.
Default: nil

 | `mergeDefaultEvictionSettings`
`bool`

 |
   mergeDefaultEvictionSettings indicates that defaults for the evictionHard, evictionSoft, evictionSoftGracePeriod, and evictionMinimumReclaim
fields should be merged into values specified for those fields in this configuration.
Signals specified in this configuration take precedence.
Signals not specified in this configuration inherit their defaults.
If false, and if any signal is specified in this configuration then other signals that
are not specified in this configuration will be set to 0.
It applies to merging the fields for which the default exists, and currently only evictionHard has default values.
Default: false

 | `podsPerCore`
`int32`

 |
   podsPerCore is the maximum number of pods per core. Cannot exceed maxPods.
The value must be a non-negative integer.
If 0, there is no limit on the number of Pods.
Default: 0

 | `enableControllerAttachDetach`
`bool`

 |
   enableControllerAttachDetach enables the Attach/Detach controller to
manage attachment/detachment of volumes scheduled to this node, and
disables kubelet from executing any attach/detach operations.
Note: attaching/detaching CSI volumes is not supported by the kubelet,
so this option needs to be true for that use case.
Default: true

 | `protectKernelDefaults`
`bool`

 |
   protectKernelDefaults, if true, causes the Kubelet to error if kernel
flags are not as it expects. Otherwise the Kubelet will attempt to modify
kernel flags to match its expectation.
Default: false

 | `makeIPTablesUtilChains`
`bool`

 |
   makeIPTablesUtilChains, if true, causes the Kubelet to create the
KUBE-IPTABLES-HINT chain in iptables as a hint to other components about the
configuration of iptables on the system.
Default: true

 | `iptablesMasqueradeBit`
`int32`

 |
   iptablesMasqueradeBit formerly controlled the creation of the KUBE-MARK-MASQ
chain.
Deprecated: no longer has any effect.
Default: 14

 | `iptablesDropBit`
`int32`

 |
   iptablesDropBit formerly controlled the creation of the KUBE-MARK-DROP chain.
Deprecated: no longer has any effect.
Default: 15

 | `featureGates`
`map[string]bool`

 |
   featureGates is a map of feature names to bools that enable or disable experimental
features. This field modifies piecemeal the built-in default values from
"k8s.io/kubernetes/pkg/features/kube_features.go".
Default: nil

 | `failSwapOn`
`bool`

 |
   failSwapOn tells the Kubelet to fail to start if swap is enabled on the node.
Default: true

 | `memorySwap`
`MemorySwapConfiguration`

 |
   memorySwap configures swap memory available to container workloads.

 | `containerLogMaxSize`
`string`

 |
   containerLogMaxSize is a quantity defining the maximum size of the container log
file before it is rotated. For example: "5Mi" or "256Ki".
Default: "10Mi"

 | `containerLogMaxFiles`
`int32`

 |
   containerLogMaxFiles specifies the maximum number of container log files that can
be present for a container.
Default: 5

 | `containerLogMaxWorkers`
`int32`

 |
   ContainerLogMaxWorkers specifies the maximum number of concurrent workers to spawn
for performing the log rotate operations. Set this count to 1 for disabling the
concurrent log rotation workflows
Default: 1

 | `containerLogMonitorInterval`
`meta/v1.Duration`

 |
   ContainerLogMonitorInterval specifies the duration at which the container logs are monitored
for performing the log rotate operation. This defaults to 10 * time.Seconds. But can be
customized to a smaller value based on the log generation rate and the size required to be
rotated against
Default: 10s

 | `configMapAndSecretChangeDetectionStrategy`
`ResourceChangeDetectionStrategy`

 |
   configMapAndSecretChangeDetectionStrategy is a mode in which ConfigMap and Secret
managers are running. Valid values include:

`Get`: kubelet fetches necessary objects directly from the API server;
`Cache`: kubelet uses TTL cache for object fetched from the API server;
`Watch`: kubelet uses watches to observe changes to objects that are in its interest.

Default: "Watch"

 | `systemReserved`
`map[string]string`

 |
   systemReserved is a set of ResourceName=ResourceQuantity (e.g. cpu=200m,memory=150G)
pairs that describe resources reserved for non-kubernetes components.
Currently only cpu and memory are supported.
See https://kubernetes.io/docs/tasks/administer-cluster/reserve-compute-resources for more detail.
Default: nil

 | `kubeReserved`
`map[string]string`

 |
   kubeReserved is a set of ResourceName=ResourceQuantity (e.g. cpu=200m,memory=150G) pairs
that describe resources reserved for kubernetes system components.
Currently cpu, memory and local storage for root file system are supported.
See https://kubernetes.io/docs/tasks/administer-cluster/reserve-compute-resources
for more details.
Default: nil

 | `reservedSystemCPUs` [Required]
`string`

 |
   The reservedSystemCPUs option specifies the CPU list reserved for the host
level system threads and kubernetes related threads. This provide a "static"
CPU list rather than the "dynamic" list by systemReserved and kubeReserved.
This option does not support systemReservedCgroup or kubeReservedCgroup.

 | `showHiddenMetricsForVersion`
`string`

 |
   showHiddenMetricsForVersion is the previous version for which you want to show
hidden metrics.
Only the previous minor version is meaningful, other values will not be allowed.
The format is `<major>.<minor>`, e.g.: `1.16`.
The purpose of this format is make sure you have the opportunity to notice
if the next release hides additional metrics, rather than being surprised
when they are permanently removed in the release after that.
Default: ""

 | `systemReservedCgroup`
`string`

 |
   systemReservedCgroup helps the kubelet identify absolute name of top level CGroup used
to enforce `systemReserved` compute resource reservation for OS system daemons.
Refer to Node Allocatable
doc for more information.
Default: ""

 | `kubeReservedCgroup`
`string`

 |
   kubeReservedCgroup helps the kubelet identify absolute name of top level CGroup used
to enforce `KubeReserved` compute resource reservation for Kubernetes node system daemons.
Refer to Node Allocatable
doc for more information.
Default: ""

 | `enforceNodeAllocatable`
`[]string`

 |
   This flag specifies the various Node Allocatable enforcements that Kubelet needs to perform.
This flag accepts a list of options. Acceptable options are `none`, `pods`,
`system-reserved`, `system-reserved-compressible`, `kube-reserved`, and `kube-reserved-compressible`.
If `none` is specified, no other options may be specified.
When a `system-reserved` option is in the list, systemReservedCgroup must be specified.
When a `kube-reserved` option is in the list, kubeReservedCgroup must be specified.
If a `compressible` option is specified, the corresponding non-compressible option may not be specified.
This field is supported only when `cgroupsPerQOS` is set to true.
Refer to Node Allocatable
for more information.
Default: ["pods"]

 | `allowedUnsafeSysctls`
`[]string`

 |
   A comma separated whitelist of unsafe sysctls or sysctl patterns (ending in `*`).
Unsafe sysctl groups are `kernel.shm*`, `kernel.msg*`, `kernel.sem`, `fs.mqueue.*`,
and `net.*`. For example: "`kernel.msg*,net.ipv4.route.min_pmtu`"
Default: []

 | `defaultPodSysctls`
`map[string]string`

 |
   DefaultPodSysctls is a set of default sysctls that will be applied to all pods.
It can be overridden by sysctls set in pod spec.securityContext.sysctls.
Support namespaced groups: `kernel.shm*`, `kernel.msg*`, `kernel.sem`, `fs.mqueue.*`, `net.*`, `kernel.domainname`, and `user.*`.
For example: {"net.ipv4.ip_forward": "1", "kernel.shmall": "1048576"}

 | `volumePluginDir`
`string`

 |
   volumePluginDir is the full path of the directory in which to search
for additional third party volume plugins.
Default: "/usr/libexec/kubernetes/kubelet-plugins/volume/exec/"

 | `providerID`
`string`

 |
   providerID, if set, sets the unique ID of the instance that an external
provider (i.e. cloudprovider) can use to identify a specific node.
Default: ""

 | `kernelMemcgNotification`
`bool`

 |
   kernelMemcgNotification, if set, instructs the kubelet to integrate with the
kernel memcg notification for determining if memory eviction thresholds are
exceeded rather than polling.
Default: false

 | `logging` [Required]
`LoggingConfiguration`

 |
   logging specifies the options of logging.
Refer to Logs Options
for more information.
Default:
Format: text

 | `enableSystemLogHandler`
`bool`

 |
   enableSystemLogHandler enables system logs via web interface host:port/logs/
Default: true

 | `enableSystemLogQuery`
`bool`

 |
   enableSystemLogQuery enables the node log query feature on the /logs endpoint.
EnableSystemLogHandler has to be enabled in addition for this feature to work.
Enabling this feature has security implications. The recommendation is to enable it on a need basis for debugging
purposes and disabling otherwise.
Default: false

 | `shutdownGracePeriod`
`meta/v1.Duration`

 |
   shutdownGracePeriod specifies the total duration that the node should delay the
shutdown and total grace period for pod termination during a node shutdown.
Default: "0s"

 | `shutdownGracePeriodCriticalPods`
`meta/v1.Duration`

 |
   shutdownGracePeriodCriticalPods specifies the duration used to terminate critical
pods during a node shutdown. This should be less than shutdownGracePeriod.
For example, if shutdownGracePeriod=30s, and shutdownGracePeriodCriticalPods=10s,
during a node shutdown the first 20 seconds would be reserved for gracefully
terminating normal pods, and the last 10 seconds would be reserved for terminating
critical pods.
Default: "0s"

 | `shutdownGracePeriodByPodPriority`
`[]ShutdownGracePeriodByPodPriority`
