---
title: "Kubelet Configuration (v1beta1) (part 4 of 5)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/config-api/kubelet-config.v1beta1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Kubelet Configuration (v1beta1) (part 4 of 5)

|
   shutdownGracePeriodByPodPriority specifies the shutdown grace period for Pods based
on their associated priority class value.
When a shutdown request is received, the Kubelet will initiate shutdown on all pods
running on the node with a grace period that depends on the priority of the pod,
and then wait for all pods to exit.
Each entry in the array represents the graceful shutdown time a pod with a priority
class value that lies in the range of that value and the next higher entry in the
list when the node is shutting down.
For example, to allow critical pods 10s to shutdown, priority>=10000 pods 20s to
shutdown, and all remaining pods 30s to shutdown.
shutdownGracePeriodByPodPriority:

priority: 2000000000
shutdownGracePeriodSeconds: 10
priority: 10000
shutdownGracePeriodSeconds: 20
priority: 0
shutdownGracePeriodSeconds: 30

The time the Kubelet will wait before exiting will at most be the maximum of all
shutdownGracePeriodSeconds for each priority class range represented on the node.
When all pods have exited or reached their grace periods, the Kubelet will release
the shutdown inhibit lock.
Requires the GracefulNodeShutdown feature gate to be enabled.
This configuration must be empty if either ShutdownGracePeriod or ShutdownGracePeriodCriticalPods is set.
Default: nil

 | `crashLoopBackOff`
`CrashLoopBackOffConfig`

 |
   CrashLoopBackOff contains config to modify node-level parameters for
container restart behavior

 | `reservedMemory`
`[]MemoryReservation`

 |
   reservedMemory specifies a comma-separated list of memory reservations for NUMA nodes.
The parameter makes sense only in the context of the memory manager feature.
The memory manager will not allocate reserved memory for container workloads.
For example, if you have a NUMA0 with 10Gi of memory and the reservedMemory was
specified to reserve 1Gi of memory at NUMA0, the memory manager will assume that
only 9Gi is available for allocation.
You can specify a different amount of NUMA node and memory types.
You can omit this parameter at all, but you should be aware that the amount of
reserved memory from all NUMA nodes should be equal to the amount of memory specified
by the node allocatable.
If at least one node allocatable parameter has a non-zero value, you will need
to specify at least one NUMA node.
Also, avoid specifying:

Duplicates, the same NUMA node, and memory type, but with a different value.
zero limits for any memory type.
NUMAs nodes IDs that do not exist under the machine.
memory types except for memory and hugepages-

Default: nil

 | `enableProfilingHandler`
`bool`

 |
   enableProfilingHandler enables profiling via web interface host:port/debug/pprof/
Default: true

 | `enableDebugFlagsHandler`
`bool`

 |
   enableDebugFlagsHandler enables flags endpoint via web interface host:port/debug/flags/v
Default: true

 | `seccompDefault`
`bool`

 |
   SeccompDefault enables the use of `RuntimeDefault` as the default seccomp profile for all workloads.
Default: false

 | `memoryThrottlingFactor`
`float64`

 |
   MemoryThrottlingFactor specifies the factor multiplied by the memory limit or node allocatable memory
when setting the cgroupv2 memory.high value to enforce MemoryQoS.
Decreasing this factor will set lower high limit for container cgroups and put heavier reclaim pressure
while increasing will put less reclaim pressure. If nil, memory.high is not set.
See https://kep.k8s.io/2570 for more details.
Default: nil

 | `memoryReservationPolicy`
`MemoryReservationPolicy`

 |
   MemoryReservationPolicy controls how the kubelet applies cgroup v2 memory protection.
"None" (default): The kubelet does not set memory.min for containers and pods,
ensuring no hard memory is locked by the kernel.
"TieredReservation": The kubelet sets cgroup v2 memory.min for Guaranteed pods and memory.low for Burstable pods based on memory requests.
Guaranteed memory is never reclaimed by the kernel; Burstable memory is preferentially retained but may be reclaimed under extreme pressure.
See https://kep.k8s.io/2570 for more details.
Default: None

 | `registerWithTaints`
`[]core/v1.Taint`

 |
   registerWithTaints are an array of taints to add to a node object when
the kubelet registers itself. This only takes effect when registerNode
is true and upon the initial registration of the node.
Default: nil

 | `registerNode`
`bool`

 |
   registerNode enables automatic registration with the apiserver.
Default: true

 | `tracing`
`TracingConfiguration`

 |
   Tracing specifies the versioned configuration for OpenTelemetry tracing clients.
See https://kep.k8s.io/2832 for more details.
Default: nil

 | `localStorageCapacityIsolation`
`bool`

 |
   LocalStorageCapacityIsolation enables local ephemeral storage isolation feature. The default setting is true.
This feature allows users to set request/limit for container's ephemeral storage and manage it in a similar way
as cpu and memory. It also allows setting sizeLimit for emptyDir volume, which will trigger pod eviction if disk
usage from the volume exceeds the limit.
This feature depends on the capability of detecting correct root file system disk usage. For certain systems,
such as kind rootless, if this capability cannot be supported, the feature LocalStorageCapacityIsolation should be
disabled. Once disabled, user should not set request/limit for container's ephemeral storage, or sizeLimit for emptyDir.
Default: true

 | `containerRuntimeEndpoint` [Required]
`string`

 |
   ContainerRuntimeEndpoint is the endpoint of container runtime.
Unix Domain Sockets are supported on Linux, while npipe and tcp endpoints are supported on Windows.
Examples:'unix:///path/to/runtime.sock', 'npipe:////./pipe/runtime'

 | `imageServiceEndpoint`
`string`

 |
   ImageServiceEndpoint is the endpoint of container image service.
Unix Domain Socket are supported on Linux, while npipe and tcp endpoints are supported on Windows.
Examples:'unix:///path/to/runtime.sock', 'npipe:////./pipe/runtime'.
If not specified, the value in containerRuntimeEndpoint is used.

 | `failCgroupV1`
`bool`

 |
   FailCgroupV1 prevents the kubelet from starting on hosts
that use cgroup v1. By default, this is set to 'true', meaning
the kubelet will not start on cgroup v1 hosts unless this
option is explicitly disabled.
Default: true

 | `userNamespaces`
`UserNamespaces`

 |
   UserNamespaces contains User Namespace configurations.

## `SerializedNodeConfigSource`     {#kubelet-config-k8s-io-v1beta1-SerializedNodeConfigSource}

SerializedNodeConfigSource allows us to serialize v1.NodeConfigSource.
This type is used internally by the Kubelet for tracking checkpointed dynamic configs.
It exists in the kubeletconfig API group because it is classified as a versioned input to the Kubelet.

 | Field | Description

 | `apiVersion`string | `kubelet.config.k8s.io/v1beta1`

 | `kind`string | `SerializedNodeConfigSource`

 | `source`
`core/v1.NodeConfigSource`

 |
   source is the source that we are serializing.

## `CrashLoopBackOffConfig`     {#kubelet-config-k8s-io-v1beta1-CrashLoopBackOffConfig}

**Appears in:**

- KubeletConfiguration

 | Field | Description

 | `maxContainerRestartPeriod`
`meta/v1.Duration`

 |
   maxContainerRestartPeriod is the maximum duration the backoff delay can accrue
to for container restarts, minimum 1 second, maximum 300 seconds. If not set,
defaults to the internal crashloopbackoff maximum (300s).

## `CredentialProvider`     {#kubelet-config-k8s-io-v1beta1-CredentialProvider}

**Appears in:**

- CredentialProviderConfig

CredentialProvider represents an exec plugin to be invoked by the kubelet. The plugin is only
invoked when an image being pulled matches the images handled by the plugin (see matchImages).

 | Field | Description

 | `name` [Required]
`string`

 |
   name is the required name of the credential provider. It must match the name of the
provider executable as seen by the kubelet. The executable must be in the kubelet's
bin directory (set by the --image-credential-provider-bin-dir flag).
Required to be unique across all providers.

 | `matchImages` [Required]
`[]string`

 |
   matchImages is a required list of strings used to match against images in order to
determine if this provider should be invoked. If one of the strings matches the
requested image from the kubelet, the plugin will be invoked and given a chance
to provide credentials. Images are expected to contain the registry domain
and URL path.
Each entry in matchImages is a pattern which can optionally contain a port and a path.
Globs can be used in the domain, but not in the port or the path. Globs are supported
as subdomains like '.k8s.io' or 'k8s..io', and top-level-domains such as 'k8s.'.
Matching partial subdomains like 'app.k8s.io' is also supported. Each glob can only match
a single subdomain segment, so *.io does not match *.k8s.io.
A match exists between an image and a matchImage when all of the below are true:

Both contain the same number of domain parts and each part matches.
The URL path of an imageMatch must be a prefix of the target image URL path.
If the imageMatch contains a port, then the port must match in the image as well.

Example values of matchImages:

123456789.dkr.ecr.us-east-1.amazonaws.com
*.azurecr.io
gcr.io
..registry.io
registry.io:8080/path

 | `defaultCacheDuration` [Required]
`meta/v1.Duration`

 |
   defaultCacheDuration is the default duration the plugin will cache credentials <example-value>
if a cache duration is not provided in the plugin response. This field is required.

 | `apiVersion` [Required]
`string`

 |
   Required input version of the exec CredentialProviderRequest. The returned CredentialProviderResponse
MUST use the same encoding version as the input. Current supported values are:

credentialprovider.kubelet.k8s.io/v1beta1

 | `args`
`[]string`

 |
   Arguments to pass to the command when executing it.

 | `env`
`[]ExecEnvVar`

 |
   Env defines additional environment variables to expose to the process. These
are unioned with the host's environment, as well as variables client-go uses
to pass <example-value> to the plugin.

## `ExecEnvVar`     {#kubelet-config-k8s-io-v1beta1-ExecEnvVar}

**Appears in:**

- CredentialProvider

ExecEnvVar is used for setting environment variables when executing an exec-based
credential plugin.

 | Field | Description

 | `name` [Required]
`string`

 |
   No description provided.

 | `value` [Required]
`string`

 |
   No description provided.

## `ImagePullCredentials`     {#kubelet-config-k8s-io-v1beta1-ImagePullCredentials}

**Appears in:**

- ImagePulledRecord

ImagePullCredentials <example-value> credentials that can be used to pull an image.

 | Field | Description

 | `kubernetesSecrets`
`[]ImagePullSecret`

 |
   KubernetesSecretCoordinates is an index of coordinates of all the kubernetes
secrets that were used to pull the image.

 | `kubernetesServiceAccounts`
`[]ImagePullServiceAccount`

 |
   KubernetesServiceAccounts is an index of coordinates of all the kubernetes
service accounts that were used to pull the image.

 | `nodePodsAccessible`
`bool`

 |
   NodePodsAccessible is a flag denoting the pull credentials are accessible
by all the pods on the node, or that no credentials are needed for the pull.
If true, it is mutually exclusive with the `kubernetesSecrets` field.

## `ImagePullCredentialsVerificationPolicy`     {#kubelet-config-k8s-io-v1beta1-ImagePullCredentialsVerificationPolicy}

(Alias of `string`)

**Appears in:**

- KubeletConfiguration

ImagePullCredentialsVerificationPolicy is an enum for the policy that is enforced
when pod is requesting an image that appears on the system

## `ImagePullSecret`     {#kubelet-config-k8s-io-v1beta1-ImagePullSecret}

**Appears in:**

- ImagePullCredentials

ImagePullSecret is a representation of a Kubernetes secret <example-value> coordinates along
with a credential hash of the pull secret <example-value> this object contains.

 | Field | Description

 | `uid` [Required]
`string`

 |
   No description provided.

 | `namespace` [Required]
`string`

 |
   No description provided.

 | `name` [Required]
`string`

 |
   No description provided.

 | `credentialHash` [Required]
`string`

 |
   CredentialHash is a SHA-256 retrieved by hashing the image pull credentials
content of the secret <example-value> by the UID/Namespace/Name coordinates.

## `ImagePullServiceAccount`     {#kubelet-config-k8s-io-v1beta1-ImagePullServiceAccount}

**Appears in:**

- ImagePullCredentials

ImagePullServiceAccount is a representation of a Kubernetes service account object coordinates
for which the kubelet sent service account token to the credential <example-value> plugin for image pull credentials.

 | Field | Description

 | `uid` [Required]
`string`

 |
   No description provided.

 | `namespace` [Required]
`string`

 |
   No description provided.

 | `name` [Required]
`string`

 |
   No description provided.

## `KubeletAnonymousAuthentication`     {#kubelet-config-k8s-io-v1beta1-KubeletAnonymousAuthentication}

**Appears in:**

- KubeletAuthentication

 | Field | Description

 | `enabled`
`bool`

 |
   enabled allows anonymous requests to the kubelet server.
Requests that are not rejected by another authentication method are treated as
anonymous requests.
Anonymous requests have a username of `system:anonymous`, and a group name of
`system:unauthenticated`.

## `KubeletAuthentication`     {#kubelet-config-k8s-io-v1beta1-KubeletAuthentication}

**Appears in:**

- KubeletConfiguration

 | Field | Description

 | `x509`
`KubeletX509Authentication`

 |
   x509 contains settings related to x509 client certificate authentication.

 | `webhook`
`KubeletWebhookAuthentication`

 |
   webhook contains settings related to webhook bearer token authentication.

 | `anonymous`
`KubeletAnonymousAuthentication`

 |
   anonymous contains settings related to anonymous authentication.

## `KubeletAuthorization`     {#kubelet-config-k8s-io-v1beta1-KubeletAuthorization}

**Appears in:**

- KubeletConfiguration

 | Field | Description

 | `mode`
`KubeletAuthorizationMode`

 |
   mode is the authorization mode to apply to requests to the kubelet server.
Valid values are `AlwaysAllow` and `Webhook`.
Webhook mode uses the SubjectAccessReview API to determine authorization.

 | `webhook`
`KubeletWebhookAuthorization`

 |
   webhook contains settings related to Webhook authorization.

## `KubeletAuthorizationMode`     {#kubelet-config-k8s-io-v1beta1-KubeletAuthorizationMode}

(Alias of `string`)

**Appears in:**

- KubeletAuthorization

## `KubeletWebhookAuthentication`     {#kubelet-config-k8s-io-v1beta1-KubeletWebhookAuthentication}

**Appears in:**

- KubeletAuthentication

 | Field | Description

 | `enabled`
`bool`

 |
   enabled allows bearer token <example-value> backed by the
tokenreviews.authentication.k8s.io API.

 | `cacheTTL`
`meta/v1.Duration`

 |
   cacheTTL enables caching of authentication results
