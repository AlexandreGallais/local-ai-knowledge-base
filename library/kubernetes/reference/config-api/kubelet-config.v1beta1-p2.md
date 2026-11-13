---
title: "Kubelet Configuration (v1beta1) (part 2 of 5)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/config-api/kubelet-config.v1beta1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Kubelet Configuration (v1beta1) (part 2 of 5)

## `KubeletConfiguration`     {#kubelet-config-k8s-io-v1beta1-KubeletConfiguration}

KubeletConfiguration contains the configuration for the Kubelet

 | Field | Description

 | `apiVersion`string | `kubelet.config.k8s.io/v1beta1`

 | `kind`string | `KubeletConfiguration`

 | `enableServer` [Required]
`bool`

 |
   enableServer enables Kubelet's secured server.
Note: Kubelet's insecure port is controlled by the readOnlyPort option.
Default: true

 | `staticPodPath`
`string`

 |
   staticPodPath is the path to the directory containing local (static) pods to
run, or the path to a single static pod file.
Default: ""

 | `podLogsDir`
`string`

 |
   podLogsDir is a custom root directory path kubelet will use to place pod's log files.
Default: "/var/log/pods/"
Note: it is not recommended to use the temp folder as a log directory as it may cause
unexpected behavior in many places.

 | `syncFrequency`
`meta/v1.Duration`

 |
   syncFrequency is the max period between synchronizing running
containers and config.
Default: "1m"

 | `fileCheckFrequency`
`meta/v1.Duration`

 |
   fileCheckFrequency is the duration between checking config files for
new data.
Default: "20s"

 | `httpCheckFrequency`
`meta/v1.Duration`

 |
   httpCheckFrequency is the duration between checking http for new data.
Default: "20s"

 | `staticPodURL`
`string`

 |
   staticPodURL is the URL for accessing static pods to run.
Default: ""

 | `staticPodURLHeader`
`mapstringstring`

 |
   staticPodURLHeader is a map of slices with HTTP headers to use when accessing the podURL.
Default: nil

 | `address`
`string`

 |
   address is the IP address for the Kubelet to serve on (set to 0.0.0.0
for all interfaces).
Default: "0.0.0.0"

 | `port`
`int32`

 |
   port is the port for the Kubelet to serve on.
The port number must be between 1 and 65535, inclusive.
Default: 10250

 | `readOnlyPort`
`int32`

 |
   readOnlyPort is the read-only port for the Kubelet to serve on with
no authentication/authorization.
The port number must be between 1 and 65535, inclusive.
Setting this field to 0 disables the read-only service.
Default: 0 (disabled)

 | `tlsCertFile`
`string`

 |
   tlsCertFile is the file containing x509 Certificate for HTTPS. (CA cert,
if any, concatenated after server cert). If tlsCertFile and
tlsPrivateKeyFile are not provided, a self-signed certificate
and key are generated for the public address and saved to the directory
passed to the Kubelet's --cert-dir flag.
Default: ""

 | `tlsPrivateKeyFile`
`string`

 |
   tlsPrivateKeyFile is the file containing x509 private key matching tlsCertFile.
Default: ""

 | `tlsCipherSuites`
`[]string`

 |
   tlsCipherSuites is the list of allowed cipher suites for the server.
Note that TLS 1.3 ciphersuites are not configurable.
Values are from tls package constants (https://golang.org/pkg/crypto/tls/#pkg-constants).
Default: nil

 | `tlsCurvePreferences`
`[]int32`

 |
   tlsCurvePreferences is the set of allowed key exchange mechanisms for the server,
specified as numeric Go crypto/tls CurveID values.
The supported values depend on the Go version used.
See https://pkg.go.dev/crypto/tls#CurveID for values supported for each Go version.
The order of the list is ignored, and key exchange mechanisms are
chosen by Go from this list using an internal preference order.
If empty, the default Go curves will be used.
Default: nil

 | `tlsMinVersion`
`string`

 |
   tlsMinVersion is the minimum TLS version supported.
Values are from tls package constants (https://golang.org/pkg/crypto/tls/#pkg-constants).
Default: ""

 | `rotateCertificates`
`bool`

 |
   rotateCertificates enables client certificate rotation. The Kubelet will request a
new certificate from the certificates.k8s.io API. This requires an approver to approve the
certificate signing requests.
Default: false

 | `serverTLSBootstrap`
`bool`

 |
   serverTLSBootstrap enables server certificate bootstrap. Instead of self
signing a serving certificate, the Kubelet will request a certificate from
the 'certificates.k8s.io' API. This requires an approver to approve the
certificate signing requests (CSR). The RotateKubeletServerCertificate feature
must be enabled when setting this field.
Default: false

 | `authentication`
`KubeletAuthentication`

 |
   authentication specifies how requests to the Kubelet's server are authenticated.
Defaults:
anonymous:
enabled: false
webhook:
enabled: true
cacheTTL: "2m"

 | `authorization`
`KubeletAuthorization`

 |
   authorization specifies how requests to the Kubelet's server are authorized.
Defaults:
mode: Webhook
webhook:
cacheAuthorizedTTL: "5m"
cacheUnauthorizedTTL: "30s"

 | `registryPullQPS`
`int32`

 |
   registryPullQPS is the limit of registry pulls per second.
The value must not be a negative number.
Setting it to 0 means no limit.
Default: 5

 | `registryBurst`
`int32`

 |
   registryBurst is the maximum size of bursty pulls, temporarily allows
pulls to burst to this number, while still not exceeding registryPullQPS.
The value must not be a negative number.
Only used if registryPullQPS is greater than 0.
Default: 10

 | `imagePullCredentialsVerificationPolicy`
`ImagePullCredentialsVerificationPolicy`

 |
   imagePullCredentialsVerificationPolicy determines how credentials should be
verified when pod requests an image that is already present on the node:

NeverVerify

anyone on a node can use any image present on the node

NeverVerifyPreloadedImages

images that were pulled to the node by something else than the kubelet
can be used without reverifying pull credentials

NeverVerifyAllowlistedImages

like "NeverVerifyPreloadedImages" but only node images from
`preloadedImagesVerificationAllowlist` don't require reverification

AlwaysVerify

all images require credential reverification

 | `preloadedImagesVerificationAllowlist`
`[]string`

 |
   preloadedImagesVerificationAllowlist specifies a list of images that are
exempted from credential reverification for the "NeverVerifyAllowlistedImages"
`imagePullCredentialsVerificationPolicy`.
The list accepts a full path segment wildcard suffix "/*".
Only use image specs without an image tag or digest.

 | `eventRecordQPS`
`int32`

 |
   eventRecordQPS is the maximum event creations per second. If 0, there
is no limit enforced. The value cannot be a negative number.
Default: 50

 | `eventBurst`
`int32`

 |
   eventBurst is the maximum size of a burst of event creations, temporarily
allows event creations to burst to this number, while still not exceeding
eventRecordQPS. This field canot be a negative number and it is only used
when eventRecordQPS > 0.
Default: 100

 | `enableDebuggingHandlers`
`bool`

 |
   enableDebuggingHandlers enables server endpoints for log access
and local running of containers and commands, including the exec,
attach, logs, and portforward features.
Default: true

 | `enableContentionProfiling`
`bool`

 |
   enableContentionProfiling enables block profiling, if enableDebuggingHandlers is true.
Default: false

 | `healthzPort`
`int32`

 |
   healthzPort is the port of the localhost healthz endpoint (set to 0 to disable).
A valid number is between 1 and 65535.
Default: 10248

 | `healthzBindAddress`
`string`

 |
   healthzBindAddress is the IP address for the healthz server to serve on.
Default: "127.0.0.1"

 | `oomScoreAdj`
`int32`

 |
   oomScoreAdj is The oom-score-adj value for kubelet process. Values
must be within the range [-1000, 1000].
Default: -999

 | `clusterDomain`
`string`

 |
   clusterDomain is the DNS domain for this cluster. If set, kubelet will
configure all containers to search this domain in addition to the
host's search domains.
Default: ""

 | `clusterDNS`
`[]string`

 |
   clusterDNS is a list of IP addresses for the cluster DNS server. If set,
kubelet will configure all containers to use this for DNS resolution
instead of the host's DNS servers.
Default: nil

 | `streamingConnectionIdleTimeout`
`meta/v1.Duration`

 |
   streamingConnectionIdleTimeout is the maximum time a streaming connection
can be idle before the connection is automatically closed.
Deprecated: no longer has any effect.
Default: "4h"

 | `nodeStatusUpdateFrequency`
`meta/v1.Duration`

 |
   nodeStatusUpdateFrequency is the frequency that kubelet computes node
status and checks if an update to the API server is necessary. Status
is posted to the API server either when it changes or when
nodeStatusReportFrequency has elapsed since the last report.
Default: "10s"

 | `nodeStatusReportFrequency`
`meta/v1.Duration`

 |
   nodeStatusReportFrequency is the frequency that kubelet posts node
status to the API server if node status does not change. Kubelet will
ignore this frequency and post node status immediately if any change
is detected.
nodeStatusReportFrequency's default value is 5m. But if
nodeStatusUpdateFrequency is set explicitly,
nodeStatusReportFrequency's default value will be set to
nodeStatusUpdateFrequency for backward compatibility.
Default: "5m"

 | `nodeLeaseDurationSeconds`
`int32`

 |
   nodeLeaseDurationSeconds is the duration the Kubelet will set on its corresponding Lease.
NodeLease provides an indicator of node health by having the Kubelet create and
periodically renew a lease, named after the node, in the kube-node-lease namespace.
If the lease expires, the node can be considered unhealthy.
The lease is currently renewed every 10s, per KEP-0009. In the future, the lease renewal
interval may be set based on the lease duration.
The field value must be greater than 0.
Default: 40

 | `imageMinimumGCAge`
`meta/v1.Duration`

 |
   imageMinimumGCAge is the minimum age for an unused image before it is
garbage collected.
The field value must be greater than 0.
If unset or 0, defaults to 2m.
Default: "2m"

 | `imageMaximumGCAge`
`meta/v1.Duration`

 |
   imageMaximumGCAge is the maximum age an image can be unused before it is garbage collected.
The default of this field is "0s", which disables this field--meaning images won't be garbage
collected based on being unused for too long.
Default: "0s" (disabled)

 | `imageGCHighThresholdPercent`
`int32`

 |
   imageGCHighThresholdPercent is the percent of disk usage after which
image garbage collection is always run. The percent is calculated by
dividing this field value by 100, so this field must be between 0 and
100, inclusive. When specified, the value must be greater than
imageGCLowThresholdPercent.
Default: 85

 | `imageGCLowThresholdPercent`
`int32`

 |
   imageGCLowThresholdPercent is the percent of disk usage before which
image garbage collection is never run. Lowest disk usage to garbage
collect to. The percent is calculated by dividing this field value by 100,
so the field value must be between 0 and 100, inclusive. When specified, the
value must be less than imageGCHighThresholdPercent.
Default: 80

 | `volumeStatsAggPeriod`
`meta/v1.Duration`

 |
   volumeStatsAggPeriod is the frequency for calculating and caching volume
disk usage for all pods.
Default: "1m"

 | `kubeletCgroups`
`string`

 |
   kubeletCgroups is the absolute name of cgroups to isolate the kubelet in
Default: ""

 | `systemCgroups`
`string`

 |
   systemCgroups is absolute name of cgroups in which to place
all non-kernel processes that are not already in a container. Empty
for no container. Rolling back the flag requires a reboot.
The cgroupRoot must be specified if this field is not empty.
Default: ""

 | `cgroupRoot`
`string`

 |
   cgroupRoot is the root cgroup to use for pods. This is handled by the
container runtime on a best effort basis.

 | `cgroupsPerQOS`
`bool`

 |
   cgroupsPerQOS enable QoS based CGroup hierarchy: top level CGroups for QoS classes
and all Burstable and BestEffort Pods are brought up under their specific top level
QoS CGroup.
Default: true

 | `cgroupDriver`
`string`

 |
   cgroupDriver is the driver kubelet uses to manipulate CGroups on the host (cgroupfs
or systemd).
Default: "cgroupfs"

 | `cpuManagerPolicy`
`string`

 |
   cpuManagerPolicy is the name of the policy to use.
Default: "None"

 | `singleProcessOOMKill`
`bool`

 |
   singleProcessOOMKill, if true, will prevent the `memory.oom.group` flag from being set for container
cgroups in cgroups v2. This causes processes in the container to be OOM killed individually instead of as
a group. It means that if true, the behavior aligns with the behavior of cgroups v1.
The default value is determined automatically when you don't specify.
On non-linux such as windows, only null / absent is allowed.
On cgroup v1 linux, only null / absent and true are allowed.
On cgroup v2 linux, null / absent, true and false are allowed. The default value is false.

 | `cpuManagerPolicyOptions`
`map[string]string`

 |
   cpuManagerPolicyOptions is a set of key=value which 	allows to set extra options
to fine tune the behaviour of the cpu manager policies.
Default: nil

 | `cpuManagerReconcilePeriod`
`meta/v1.Duration`

 |
   cpuManagerReconcilePeriod is the reconciliation period for the CPU Manager.
Default: "10s"

 | `memoryManagerPolicy`
`string`

 |
   memoryManagerPolicy is the name of the policy to use by memory manager.
Requires the MemoryManager feature gate to be enabled.
Default: "none"

 | `topologyManagerPolicy`
`string`

 |
   topologyManagerPolicy is the name of the topology manager policy to use.
Valid values include:

`restricted`: kubelet only allows pods with optimal NUMA node alignment for
requested resources;
`best-effort`: kubelet will favor pods with NUMA alignment of CPU and device
resources;
`none`: kubelet has no knowledge of NUMA alignment of a pod's CPU and device resources.
`single-numa-node`: kubelet only allows pods with a single NUMA alignment
of CPU and device resources.

Default: "none"

 | `topologyManagerScope`
`string`

 |
   topologyManagerScope represents the scope of topology hint generation
that topology manager requests and hint providers generate. Valid values include:

`container`: topology policy is applied on a per-container basis.
`pod`: topology policy is applied on a per-pod basis.

Default: "container"

 | `topologyManagerPolicyOptions`
`map[string]string`

 |
   TopologyManagerPolicyOptions is a set of key=value which allows to set extra options
to fine tune the behaviour of the topology manager policies.
Requires  both the "TopologyManager" and "TopologyManagerPolicyOptions" feature gates to be enabled.
Default: nil

 | `qosReserved`
`map[string]string`

 |
   qosReserved is a set of resource name to percentage pairs that specify
the minimum percentage of a resource reserved for exclusive use by the
guaranteed QoS tier.
Currently supported resources: "memory"
Requires the QOSReserved feature gate to be enabled.
Default: nil

 | `runtimeRequestTimeout`
`meta/v1.Duration`

 |
   runtimeRequestTimeout is the timeout for all runtime requests except long running
requests - pull, logs, exec and attach.
Default: "2m"

 | `hairpinMode`
`string`
