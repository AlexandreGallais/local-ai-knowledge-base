---
title: "kube-proxy Configuration (v1alpha1) (part 2 of 2)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/config-api/kube-proxy-config.v1alpha1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# kube-proxy Configuration (v1alpha1) (part 2 of 2)

## `KubeProxyConntrackConfiguration`     {#kubeproxy-config-k8s-io-v1alpha1-KubeProxyConntrackConfiguration}

**Appears in:**

- KubeProxyConfiguration

KubeProxyConntrackConfiguration contains conntrack settings for
the Kubernetes proxy server.

 | Field | Description

 | `maxPerCore` [Required]
`int32`

 |
   maxPerCore is the maximum number of NAT connections to track
per CPU core (0 to leave the limit as-is and ignore min).

 | `min` [Required]
`int32`

 |
   min is the minimum value of connect-tracking records to allocate,
regardless of maxPerCore (set maxPerCore=0 to leave the limit as-is).

 | `tcpEstablishedTimeout` [Required]
`meta/v1.Duration`

 |
   tcpEstablishedTimeout is how long an idle TCP connection will be kept open
(e.g. '2s').  Must be greater than 0 to set.

 | `tcpCloseWaitTimeout` [Required]
`meta/v1.Duration`

 |
   tcpCloseWaitTimeout is how long an idle conntrack entry
in CLOSE_WAIT state will remain in the conntrack
table. (e.g. '60s'). Must be greater than 0 to set.

 | `tcpBeLiberal` [Required]
`bool`

 |
   tcpBeLiberal, if true, kube-proxy will configure conntrack
to run in liberal mode for TCP connections and packets with
out-of-window sequence numbers won't be marked INVALID.

 | `udpTimeout` [Required]
`meta/v1.Duration`

 |
   udpTimeout is how long an idle UDP conntrack entry in
UNREPLIED state will remain in the conntrack table
(e.g. '30s'). Must be greater than 0 to set.

 | `udpStreamTimeout` [Required]
`meta/v1.Duration`

 |
   udpStreamTimeout is how long an idle UDP conntrack entry in
ASSURED state will remain in the conntrack table
(e.g. '300s'). Must be greater than 0 to set.

## `KubeProxyIPTablesConfiguration`     {#kubeproxy-config-k8s-io-v1alpha1-KubeProxyIPTablesConfiguration}

**Appears in:**

- KubeProxyConfiguration

KubeProxyIPTablesConfiguration contains iptables-related configuration
details for the Kubernetes proxy server.

 | Field | Description

 | `masqueradeBit` [Required]
`int32`

 |
   masqueradeBit is the bit of the iptables fwmark space to use for SNAT if using
the iptables or ipvs proxy mode. Values must be within the range [0, 31].

 | `masqueradeAll` [Required]
`bool`

 |
   masqueradeAll tells kube-proxy to SNAT all traffic sent to Service cluster IPs,
when using the iptables or ipvs proxy mode. This may be required with some CNI
plugins.

 | `localhostNodePorts` [Required]
`bool`

 |
   localhostNodePorts, if false, tells kube-proxy to disable the legacy behavior
of allowing NodePort services to be accessed via localhost. (Applies only to
iptables mode and IPv4; localhost NodePorts are never allowed with other proxy
modes or with IPv6.)

 | `syncPeriod` [Required]
`meta/v1.Duration`

 |
   syncPeriod is an interval (e.g. '5s', '1m', '2h22m') indicating how frequently
various re-synchronizing and cleanup operations are performed. Must be greater
than 0.

 | `minSyncPeriod` [Required]
`meta/v1.Duration`

 |
   minSyncPeriod is the minimum period between iptables rule resyncs (e.g. '5s',
'1m', '2h22m'). A value of 0 means every Service or EndpointSlice change will
result in an immediate iptables resync.

## `KubeProxyIPVSConfiguration`     {#kubeproxy-config-k8s-io-v1alpha1-KubeProxyIPVSConfiguration}

**Appears in:**

- KubeProxyConfiguration

KubeProxyIPVSConfiguration contains ipvs-related configuration
details for the Kubernetes proxy server.

 | Field | Description

 | `syncPeriod` [Required]
`meta/v1.Duration`

 |
   syncPeriod is an interval (e.g. '5s', '1m', '2h22m') indicating how frequently
various re-synchronizing and cleanup operations are performed. Must be greater
than 0.

 | `minSyncPeriod` [Required]
`meta/v1.Duration`

 |
   minSyncPeriod is the minimum period between IPVS rule resyncs (e.g. '5s', '1m',
'2h22m'). A value of 0 means every Service or EndpointSlice change will result
in an immediate IPVS resync.

 | `scheduler` [Required]
`string`

 |
   scheduler is the IPVS scheduler to use

 | `excludeCIDRs` [Required]
`[]string`

 |
   excludeCIDRs is a list of CIDRs which the ipvs proxier should not touch
when cleaning up ipvs services.

 | `strictARP` [Required]
`bool`

 |
   strictARP configures arp_ignore and arp_announce to avoid answering ARP queries
from kube-ipvs0 interface

 | `tcpTimeout` [Required]
`meta/v1.Duration`

 |
   tcpTimeout is the timeout value used for idle IPVS TCP sessions.
The default value is 0, which preserves the current timeout value on the system.

 | `tcpFinTimeout` [Required]
`meta/v1.Duration`

 |
   tcpFinTimeout is the timeout value used for IPVS TCP sessions after receiving a FIN.
The default value is 0, which preserves the current timeout value on the system.

 | `udpTimeout` [Required]
`meta/v1.Duration`

 |
   udpTimeout is the timeout value used for IPVS UDP packets.
The default value is 0, which preserves the current timeout value on the system.

## `KubeProxyNFTablesConfiguration`     {#kubeproxy-config-k8s-io-v1alpha1-KubeProxyNFTablesConfiguration}

**Appears in:**

- KubeProxyConfiguration

KubeProxyNFTablesConfiguration contains nftables-related configuration
details for the Kubernetes proxy server.

 | Field | Description

 | `masqueradeBit` [Required]
`int32`

 |
   masqueradeBit is the bit of the iptables fwmark space to use for SNAT if using
the nftables proxy mode. Values must be within the range [0, 31].

 | `masqueradeAll` [Required]
`bool`

 |
   masqueradeAll tells kube-proxy to SNAT all traffic sent to Service cluster IPs,
when using the nftables mode. This may be required with some CNI plugins.

 | `syncPeriod` [Required]
`meta/v1.Duration`

 |
   syncPeriod is an interval (e.g. '5s', '1m', '2h22m') indicating how frequently
various re-synchronizing and cleanup operations are performed. Must be greater
than 0.

 | `minSyncPeriod` [Required]
`meta/v1.Duration`

 |
   minSyncPeriod is the minimum period between iptables rule resyncs (e.g. '5s',
'1m', '2h22m'). A value of 0 means every Service or EndpointSlice change will
result in an immediate iptables resync.

## `KubeProxyWinkernelConfiguration`     {#kubeproxy-config-k8s-io-v1alpha1-KubeProxyWinkernelConfiguration}

**Appears in:**

- KubeProxyConfiguration

KubeProxyWinkernelConfiguration contains Windows/HNS settings for
the Kubernetes proxy server.

 | Field | Description

 | `networkName` [Required]
`string`

 |
   networkName is the name of the network kube-proxy will use
to create endpoints and policies

 | `sourceVip` [Required]
`string`

 |
   sourceVip is the IP address of the source VIP endpoint used for
NAT when loadbalancing

 | `enableDSR` [Required]
`bool`

 |
   enableDSR tells kube-proxy whether HNS policies should be created
with DSR

 | `rootHnsEndpointName` [Required]
`string`

 |
   rootHnsEndpointName is the name of hnsendpoint that is attached to
l2bridge for root network namespace

 | `forwardHealthCheckVip` [Required]
`bool`

 |
   forwardHealthCheckVip forwards service VIP for health check port on
Windows

## `LocalMode`     {#kubeproxy-config-k8s-io-v1alpha1-LocalMode}

(Alias of `string`)

**Appears in:**

- KubeProxyConfiguration

LocalMode represents modes to detect local traffic from the node

## `ProxyMode`     {#kubeproxy-config-k8s-io-v1alpha1-ProxyMode}

(Alias of `string`)

**Appears in:**

- KubeProxyConfiguration

ProxyMode represents modes used by the Kubernetes proxy server.
Three modes of proxy are available on Linux platforms: `iptables`, `ipvs`, and
`nftables`. One mode of proxy is available on Windows platforms: `kernelspace`.
If the proxy mode is unspecified, a default proxy mode will be used (currently this
is `iptables` on Linux and `kernelspace` on Windows). If the selected proxy mode cannot be
used (due to lack of kernel support, missing userspace components, etc) then kube-proxy
will exit with an error.
