---
title: "kube-proxy Configuration (v1alpha1) (part 1 of 2)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/config-api/kube-proxy-config.v1alpha1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# kube-proxy Configuration (v1alpha1)

## Resource Types

- KubeProxyConfiguration

## `FormatOptions`     {#FormatOptions}

**Appears in:**

- LoggingConfiguration

FormatOptions contains options for the different logging formats.

 | Field | Description

 | `text` [Required]
`TextOptions`

 |
   [Alpha] Text contains options for logging format "text".
Only available when the LoggingAlphaOptions feature gate is enabled.

 | `json` [Required]
`JSONOptions`

 |
   [Alpha] JSON contains options for logging format "json".
Only available when the LoggingAlphaOptions feature gate is enabled.

## `JSONOptions`     {#JSONOptions}

**Appears in:**

- FormatOptions

JSONOptions contains options for logging format "json".

 | Field | Description

 | `OutputRoutingOptions` [Required]
`OutputRoutingOptions`

 |
   No description provided.

## `LogFormatFactory`     {#LogFormatFactory}

LogFormatFactory provides support for a certain additional,
non-default log format.

## `LoggingConfiguration`     {#LoggingConfiguration}

**Appears in:**

- KubeProxyConfiguration

- KubeletConfiguration

LoggingConfiguration contains logging options.

 | Field | Description

 | `format` [Required]
`string`

 |
   Format Flag specifies the structure of log messages.
default value of format is `text`

 | `flushFrequency` [Required]
`TimeOrMetaDuration`

 |
   Maximum time between log flushes.
If a string, parsed as a duration (i.e. "1s")
If an int, the maximum number of nanoseconds (i.e. 1s = 1000000000).
Ignored if the selected logging backend writes log messages without buffering.

 | `verbosity` [Required]
`VerbosityLevel`

 |
   Verbosity is the threshold that determines which log messages are
logged. Default is zero which logs only the most important
messages. Higher values enable additional messages. Error messages
are always logged.

 | `vmodule` [Required]
`VModuleConfiguration`

 |
   VModule overrides the verbosity threshold for individual files.
Only supported for "text" log format.

 | `options` [Required]
`FormatOptions`

 |
   [Alpha] Options holds additional parameters that are specific
to the different logging formats. Only the options for the selected
format get used, but all of them get validated.
Only available when the LoggingAlphaOptions feature gate is enabled.

## `LoggingOptions`     {#LoggingOptions}

LoggingOptions can be used with ValidateAndApplyWithOptions to override
certain global defaults.

 | Field | Description

 | `ErrorStream` [Required]
`io.Writer`

 |
   ErrorStream can be used to override the os.Stderr default.

 | `InfoStream` [Required]
`io.Writer`

 |
   InfoStream can be used to override the os.Stdout default.

## `OutputRoutingOptions`     {#OutputRoutingOptions}

**Appears in:**

- JSONOptions

- TextOptions

OutputRoutingOptions contains options that are supported by both "text" and "json".

 | Field | Description

 | `splitStream` [Required]
`bool`

 |
   [Alpha] SplitStream redirects error messages to stderr while
info messages go to stdout, with buffering. The default is to write
both to stdout, without buffering. Only available when
the LoggingAlphaOptions feature gate is enabled.

 | `infoBufferSize` [Required]
`k8s.io/apimachinery/pkg/api/resource.QuantityValue`

 |
   [Alpha] InfoBufferSize sets the size of the info stream when
using split streams. The default is zero, which disables buffering.
Only available when the LoggingAlphaOptions feature gate is enabled.

## `TextOptions`     {#TextOptions}

**Appears in:**

- FormatOptions

TextOptions contains options for logging format "text".

 | Field | Description

 | `OutputRoutingOptions` [Required]
`OutputRoutingOptions`

 |
   No description provided.

## `TimeOrMetaDuration`     {#TimeOrMetaDuration}

**Appears in:**

- LoggingConfiguration

TimeOrMetaDuration is present only for backwards compatibility for the
flushFrequency field, and new fields should use metav1.Duration.

 | Field | Description

 | `Duration` [Required]
`meta/v1.Duration`

 |
   Duration holds the duration

 | `-` [Required]
`bool`

 |
   SerializeAsString controls whether the value is serialized as a string or an integer

## `VModuleConfiguration`     {#VModuleConfiguration}

(Alias of `[]k8s.io/component-base/logs/api/v1.VModuleItem`)

**Appears in:**

- LoggingConfiguration

VModuleConfiguration is a collection of individual file names or patterns
and the corresponding verbosity threshold.

## `VerbosityLevel`     {#VerbosityLevel}

(Alias of `uint32`)

**Appears in:**

- LoggingConfiguration

VerbosityLevel represents a klog or logr verbosity threshold.

## `ClientConnectionConfiguration`     {#ClientConnectionConfiguration}

**Appears in:**

- KubeProxyConfiguration

- KubeSchedulerConfiguration

- GenericControllerManagerConfiguration

ClientConnectionConfiguration contains details for constructing a client.

 | Field | Description

 | `kubeconfig` [Required]
`string`

 |
   kubeconfig is the path to a KubeConfig file.

 | `acceptContentTypes` [Required]
`string`

 |
   acceptContentTypes defines the Accept header sent by clients when connecting to a server, overriding the
default value of 'application/json'. This field will control all connections to the server used by a particular
client.

 | `contentType` [Required]
`string`

 |
   contentType is the content type used when sending data to the server from this client.

 | `qps` [Required]
`float32`

 |
   qps controls the number of queries per second allowed for this connection.

 | `burst` [Required]
`int32`

 |
   burst allows extra queries to accumulate when a client is exceeding its rate.

## `DebuggingConfiguration`     {#DebuggingConfiguration}

**Appears in:**

- KubeSchedulerConfiguration

- GenericControllerManagerConfiguration

DebuggingConfiguration holds configuration for Debugging related features.

 | Field | Description

 | `enableProfiling` [Required]
`bool`

 |
   enableProfiling enables profiling via web interface host:port/debug/pprof/

 | `enableContentionProfiling` [Required]
`bool`

 |
   enableContentionProfiling enables block profiling, if
enableProfiling is true.

## `LeaderElectionConfiguration`     {#LeaderElectionConfiguration}

**Appears in:**

- KubeSchedulerConfiguration

- GenericControllerManagerConfiguration

LeaderElectionConfiguration defines the configuration of leader election
clients for components that can run with leader election enabled.

 | Field | Description

 | `leaderElect` [Required]
`bool`

 |
   leaderElect enables a leader election client to gain leadership
before executing the main loop. Enable this when running replicated
components for high availability.

 | `leaseDuration` [Required]
`meta/v1.Duration`

 |
   leaseDuration is the duration that non-leader candidates will wait
after observing a leadership renewal until attempting to acquire
leadership of a led but unrenewed leader slot. This is effectively the
maximum duration that a leader can be stopped before it is replaced
by another candidate. This is only applicable if leader election is
enabled.

 | `renewDeadline` [Required]
`meta/v1.Duration`

 |
   renewDeadline is the interval between attempts by the acting master to
renew a leadership slot before it stops leading. This must be less
than or equal to the lease duration. This is only applicable if leader
election is enabled.

 | `retryPeriod` [Required]
`meta/v1.Duration`

 |
   retryPeriod is the duration the clients should wait between attempting
acquisition and renewal of a leadership. This is only applicable if
leader election is enabled.

 | `resourceLock` [Required]
`string`

 |
   resourceLock indicates the resource object type that will be used to lock
during leader election cycles.

 | `resourceName` [Required]
`string`

 |
   resourceName indicates the name of resource object that will be used to lock
during leader election cycles.

 | `resourceNamespace` [Required]
`string`

 |
   resourceName indicates the namespace of resource object that will be used to lock
during leader election cycles.

## `KubeProxyConfiguration`     {#kubeproxy-config-k8s-io-v1alpha1-KubeProxyConfiguration}

KubeProxyConfiguration contains everything necessary to configure the
Kubernetes proxy server.

 | Field | Description

 | `apiVersion`string | `kubeproxy.config.k8s.io/v1alpha1`

 | `kind`string | `KubeProxyConfiguration`

 | `featureGates` [Required]
`map[string]bool`

 |
   featureGates is a map of feature names to bools that enable or disable alpha/experimental features.

 | `clientConnection` [Required]
`ClientConnectionConfiguration`

 |
   clientConnection specifies the kubeconfig file and client connection settings for the proxy
server to use when communicating with the apiserver.

 | `logging` [Required]
`LoggingConfiguration`

 |
   logging specifies the options of logging.
Refer to Logs Options
for more information.

 | `hostnameOverride` [Required]
`string`

 |
   hostnameOverride, if non-empty, will be used as the name of the Node that
kube-proxy is running on. If unset, the node name is assumed to be the same as
the node's hostname.

 | `bindAddress` [Required]
`string`

 |
   bindAddress can be used to override kube-proxy's idea of what its node's
primary IP is. Note that the name is a historical artifact, and kube-proxy does
not actually bind any sockets to this IP.

 | `healthzBindAddress` [Required]
`string`

 |
   healthzBindAddress is the IP address and port for the health check server to
serve on, defaulting to "0.0.0.0:10256" (if bindAddress is unset or IPv4), or
"[::]:10256" (if bindAddress is IPv6).

 | `metricsBindAddress` [Required]
`string`

 |
   metricsBindAddress is the IP address and port for the metrics server to serve
on, defaulting to "127.0.0.1:10249" (if bindAddress is unset or IPv4), or
"[::1]:10249" (if bindAddress is IPv6). (Set to "0.0.0.0:10249" / "[::]:10249"
to bind on all interfaces.)

 | `bindAddressHardFail` [Required]
`bool`

 |
   bindAddressHardFail, if true, tells kube-proxy to treat failure to bind to a
port as fatal and exit

 | `enableProfiling` [Required]
`bool`

 |
   enableProfiling enables profiling via web interface on /debug/pprof handler.
Profiling handlers will be handled by metrics server.

 | `showHiddenMetricsForVersion` [Required]
`string`

 |
   showHiddenMetricsForVersion is the version for which you want to show hidden metrics.

 | `mode` [Required]
`ProxyMode`

 |
   mode specifies which proxy mode to use.

 | `iptables` [Required]
`KubeProxyIPTablesConfiguration`

 |
   iptables contains iptables-related configuration options.

 | `ipvs` [Required]
`KubeProxyIPVSConfiguration`

 |
   ipvs contains ipvs-related configuration options.

 | `nftables` [Required]
`KubeProxyNFTablesConfiguration`

 |
   nftables contains nftables-related configuration options.

 | `winkernel` [Required]
`KubeProxyWinkernelConfiguration`

 |
   winkernel contains winkernel-related configuration options.

 | `detectLocalMode` [Required]
`LocalMode`

 |
   detectLocalMode determines mode to use for detecting local traffic, defaults to ClusterCIDR

 | `detectLocal` [Required]
`DetectLocalConfiguration`

 |
   detectLocal contains optional configuration settings related to DetectLocalMode.

 | `clusterCIDR` [Required]
`string`

 |
   clusterCIDR is the CIDR range of the pods in the cluster. (For dual-stack
clusters, this can be a comma-separated dual-stack pair of CIDR ranges.). When
DetectLocalMode is set to ClusterCIDR, kube-proxy will consider
traffic to be local if its source IP is in this range. (Otherwise it is not
used.)

 | `nodePortAddresses` [Required]
`[]string`

 |
   nodePortAddresses is a list of CIDR ranges and/or keywords that expand to CIDR
ranges. NodePort services are only accessible on node IPs covered by the list.
Supported keywords: 'primary' (the Node object's primary IPv4 and/or IPv6
addresses), 'localhost' (127.0.0.0/8 and ::1/128), and 'all' (0.0.0.0/0 and ::/0).
Any combination of valid keywords and CIDRs may be included in the list.
Serving NodePorts on loopback IPs is only supported in iptables mode (IPv4
only, see iptables.localhostNodePorts), and, only for TCP, in nftables mode when
the KubeProxyNFTablesLocalhostNodePorts feature gate is enabled and the list
explicitly includes loopback (e.g. 'localhost').
If unset, this defaults to 'all' in iptables and ipvs mode, and to 'primary' in
nftables mode.

 | `oomScoreAdj` [Required]
`int32`

 |
   oomScoreAdj is the oom-score-adj value for kube-proxy process. Values must be within
the range [-1000, 1000]

 | `conntrack` [Required]
`KubeProxyConntrackConfiguration`

 |
   conntrack contains conntrack-related configuration options.

 | `configSyncPeriod` [Required]
`meta/v1.Duration`

 |
   configSyncPeriod is how often configuration from the apiserver is refreshed. Must be greater
than 0.

 | `portRange` [Required]
`string`

 |
   portRange was previously used to configure the userspace proxy, but is now unused.

 | `windowsRunAsService` [Required]
`bool`

 |
   windowsRunAsService, if true, enables Windows service control manager API integration.

## `DetectLocalConfiguration`     {#kubeproxy-config-k8s-io-v1alpha1-DetectLocalConfiguration}

**Appears in:**

- KubeProxyConfiguration

DetectLocalConfiguration contains optional settings related to DetectLocalMode option

 | Field | Description

 | `bridgeInterface` [Required]
`string`

 |
   bridgeInterface is a bridge interface name. When DetectLocalMode is set to
LocalModeBridgeInterface, kube-proxy will consider traffic to be local if
it originates from this bridge.

 | `interfaceNamePrefix` [Required]
`string`

 |
   interfaceNamePrefix is an interface name prefix. When DetectLocalMode is set to
LocalModeInterfaceNamePrefix, kube-proxy will consider traffic to be local if
it originates from any interface whose name begins with this prefix.
