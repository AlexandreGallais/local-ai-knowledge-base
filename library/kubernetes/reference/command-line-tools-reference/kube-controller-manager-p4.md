---
title: "kube-controller-manager (part 4 of 5)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/kube-controller-manager.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# kube-controller-manager (part 4 of 5)

|  | Number of nodes from which node-lifecycle-controller treats the cluster as large for the eviction logic purposes. --secondary-node-eviction-rate is implicitly overridden to 0 for clusters this size or smaller. Notice: If nodes reside in multiple zones, this threshold will be considered as zone node size threshold for each zone to determine node eviction rate independently.

 | --leader-elect     Default: true

 |  | Start a leader election client and gain leadership before executing the main loop. Enable this when running replicated components for high availability.

 | --leader-elect-lease-duration duration     Default: 15s

 |  | The duration that non-leader candidates will wait after observing a leadership renewal until attempting to acquire leadership of a led but unrenewed leader slot. This is effectively the maximum duration that a leader can be stopped before it is replaced by another candidate. This is only applicable if leader election is enabled.

 | --leader-elect-renew-deadline duration     Default: 10s

 |  | The interval between attempts by the acting master to renew a leadership slot before it stops leading. This must be less than the lease duration. This is only applicable if leader election is enabled.

 | --leader-elect-resource-lock string     Default: "leases"

 |  | The type of resource object that is used for locking during leader election. Supported options are 'leases'.

 | --leader-elect-resource-name string     Default: "kube-controller-manager"

 |  | The name of resource object that is used for locking during leader election.

 | --leader-elect-resource-namespace string     Default: "kube-system"

 |  | The namespace of resource object that is used for locking during leader election.

 | --leader-elect-retry-period duration     Default: 2s

 |  | The duration the clients should wait between attempting acquisition and renewal of a leadership. This is only applicable if leader election is enabled.

 | --leader-migration-config string

 |  | Path to the config file for controller leader migration, or empty to use the value that reflects default configuration of the controller manager. The config file should be of type LeaderMigrationConfiguration, group controllermanager.config.k8s.io, version v1alpha1.

 | --legacy-service-account-token-clean-up-period duration     Default: 8760h0m0s

 |  | The period of time since the last usage of an legacy service account token before it can be deleted.

 | --log-flush-frequency duration     Default: 5s

 |  | Maximum number of seconds between log flushes

 | --log-text-info-buffer-size quantity

 |  | [Alpha] In text format with split output streams, the info messages can be buffered for a while to increase performance. The default value of zero bytes disables buffering. The size can be specified as number of bytes (512), multiples of 1000 (1K), multiples of 1024 (2Ki), or powers of those (3M, 4G, 5Mi, 6Gi). Enable the LoggingAlphaOptions feature gate to use this.

 | --log-text-split-stream

 |  | [Alpha] In text format, write error messages to stderr and info messages to stdout. The default is to write a single stream to stdout. Enable the LoggingAlphaOptions feature gate to use this.

 | --logging-format string     Default: "text"

 |  | Sets the log format. Permitted formats: "text".

 | --master string

 |  | The address of the Kubernetes API server (overrides any value in kubeconfig).

 | --max-endpoints-per-slice int32     Default: 100

 |  | The maximum number of endpoints that will be added to an EndpointSlice. More endpoints per slice will result in less endpoint slices, but larger resources. Defaults to 100.

 | --min-compatibility-version strings

 |  | The min version of control plane components the server should be compatible with.Must be less or equal to the emulated-version. Version format could only be major.minor, for example: '--min-compatibility-version=wardle=1.2,kube=1.31'.Options are: kube=1.34..1.37(default:1.36)If the component is not specified, defaults to "kube"

 | --min-resync-period duration     Default: 12h0m0s

 |  | The resync period in reflectors will be random between MinResyncPeriod and 2*MinResyncPeriod.

 | --mirroring-concurrent-service-endpoint-syncs int32     Default: 5

 |  | The number of service endpoint syncing operations that will be done concurrently by the endpointslice-mirroring-controller. Larger number = faster endpoint slice updating, but more CPU (and network) load. Defaults to 5.

 | --mirroring-endpointslice-updates-batch-period duration

 |  | The length of EndpointSlice updates batching period for endpointslice-mirroring-controller. Processing of EndpointSlice changes will be delayed by this duration to join them with potential upcoming updates and reduce the overall number of EndpointSlice updates. Larger number = higher endpoint programming latency, but lower number of endpoints revision generated

 | --mirroring-max-endpoints-per-subset int32     Default: 1000

 |  | The maximum number of endpoints that will be added to an EndpointSlice by the endpointslice-mirroring-controller. More endpoints per slice will result in less endpoint slices, but larger resources. Defaults to 100.

 | --namespace-sync-period duration     Default: 5m0s

 |  | The period for syncing namespace life-cycle updates

 | --node-cidr-mask-size int32

 |  | Mask size for node cidr in cluster. Default is 24 for IPv4 and 64 for IPv6.

 | --node-cidr-mask-size-ipv4 int32

 |  | Mask size for IPv4 node cidr in dual-stack cluster. Default is 24.

 | --node-cidr-mask-size-ipv6 int32

 |  | Mask size for IPv6 node cidr in dual-stack cluster. Default is 64.

 | --node-eviction-rate float     Default: 0.1

 |  | Number of nodes per second on which pods are deleted in case of node failure when a zone is healthy (see --unhealthy-zone-threshold for definition of healthy/unhealthy). Zone refers to entire cluster in non-multizone clusters.

 | --node-monitor-grace-period duration     Default: 50s

 |  | Amount of time which we allow running Node to be unresponsive before marking it unhealthy. Must be N times more than kubelet's nodeStatusUpdateFrequency, where N means number of retries allowed for kubelet to post node status. This value should also be greater than the sum of HTTP2_PING_TIMEOUT_SECONDS and HTTP2_READ_IDLE_TIMEOUT_SECONDS

 | --node-monitor-period duration     Default: 5s

 |  | The period for syncing NodeStatus in NodeLifecycleController.

 | --node-startup-grace-period duration     Default: 1m0s

 |  | Amount of time which we allow starting Node to be unresponsive before marking it unhealthy.

 | --permit-address-sharing

 |  | If true, SO_REUSEADDR will be used when binding the port. This allows binding to wildcard IPs like 0.0.0.0 and specific IPs in parallel, and it avoids waiting for the kernel to release sockets in TIME_WAIT state. [default=false]

 | --permit-port-sharing

 |  | If true, SO_REUSEPORT will be used when binding the port, which allows more than one instance to bind on the same address and port. [default=false]

 | --profiling     Default: true

 |  | Enable profiling via web interface host:port/debug/pprof/

 | --pv-recycler-increment-timeout-nfs int32     Default: 30

 |  | the increment of time added per Gi to ActiveDeadlineSeconds for an NFS scrubber pod

 | --pv-recycler-minimum-timeout-hostpath int32     Default: 60

 |  | The minimum ActiveDeadlineSeconds to use for a HostPath Recycler pod.  This is for development and testing only and will not work in a multi-node cluster.

 | --pv-recycler-minimum-timeout-nfs int32     Default: 300

 |  | The minimum ActiveDeadlineSeconds to use for an NFS Recycler pod

 | --pv-recycler-pod-template-filepath-hostpath string

 |  | The file path to a pod definition used as a template for HostPath persistent volume recycling. This is for development and testing only and will not work in a multi-node cluster.

 | --pv-recycler-pod-template-filepath-nfs string

 |  | The file path to a pod definition used as a template for NFS persistent volume recycling

 | --pv-recycler-timeout-increment-hostpath int32     Default: 30

 |  | the increment of time added per Gi to ActiveDeadlineSeconds for a HostPath scrubber pod.  This is for development and testing only and will not work in a multi-node cluster.

 | --pvclaimbinder-sync-period duration     Default: 15s

 |  | The period for syncing persistent volumes and persistent volume claims

 | --requestheader-allowed-names strings

 |  | List of client certificate common names to allow to provide usernames in headers specified by --requestheader-username-headers. If empty, any client certificate validated by the authorities in --requestheader-client-ca-file is allowed.

 | --requestheader-client-ca-file string

 |  | Root certificate bundle to use to verify client certificates on incoming requests before trusting usernames in headers specified by --requestheader-username-headers. WARNING: generally do not depend on authorization being already done for incoming requests.

 | --requestheader-extra-headers-prefix strings     Default: "x-remote-extra-"

 |  | List of request header prefixes to inspect. X-Remote-Extra- is suggested.

 | --requestheader-group-headers strings     Default: "x-remote-group"

 |  | List of request headers to inspect for groups. X-Remote-Group is suggested.

 | --requestheader-uid-headers strings

 |  | List of request headers to inspect for UIDs. X-Remote-Uid is suggested. Requires the RemoteRequestHeaderUID feature to be enabled.

 | --requestheader-username-headers strings     Default: "x-remote-user"

 |  | List of request headers to inspect for usernames. X-Remote-User is common.

 | --resource-quota-sync-period duration     Default: 5m0s

 |  | The period for syncing quota usage status in the system

 | --root-ca-file string

 |  | If set, this root certificate authority will be included in service account's token secret. This must be a valid PEM-encoded CA bundle.

 | --route-reconciliation-period duration     Default: 10s

 |  | The period for reconciling routes created for Nodes by cloud provider.

 | --secondary-node-eviction-rate float     Default: 0.01

 |  | Number of nodes per second on which pods are deleted in case of node failure when a zone is unhealthy (see --unhealthy-zone-threshold for definition of healthy/unhealthy). Zone refers to entire cluster in non-multizone clusters. This value is implicitly overridden to 0 if the cluster size is smaller than --large-cluster-size-threshold.

 | --secure-port int     Default: 10257

 |  | The port on which to serve HTTPS with authentication and authorization. If 0, don't serve HTTPS at all.

 | --service-account-private-key-file string

 |  | Enables legacy secret-based tokens when set. Filename containing a PEM-encoded private RSA or ECDSA key used to sign service account tokens.

 | --service-cluster-ip-range string

 |  | CIDR Range for Services in cluster. Only used when --allocate-node-cidrs=true; if false, this option will be ignored.

 | --show-hidden-metrics-for-version string

 |  | The previous version for which you want to show hidden metrics. Only the previous minor version is meaningful, other values will not be allowed. The format is <major>.<minor>, e.g.: '1.16'. The purpose of this format is make sure you have the opportunity to notice if the next release hides additional metrics, rather than being surprised when they are permanently removed in the release after that.

 | --terminated-pod-gc-threshold int32     Default: 12500

 |  | Number of terminated pods that can exist before the terminated pod garbage collector starts deleting terminated pods. If <= 0, the terminated pod garbage collector is disabled.

 | --tls-cert-file string

 |  | File containing the default x509 Certificate for HTTPS. (CA cert, if any, concatenated after server cert). If HTTPS serving is enabled, and --tls-cert-file and --tls-private-key-file are not provided, a self-signed certificate and key are generated for the public address and saved to the directory specified by --cert-dir.

 | --tls-cipher-suites strings

 |  | Comma-separated list of cipher suites for the server. If omitted, the default Go cipher suites will be used.Preferred values: TLS_AES_128_GCM_SHA256, TLS_AES_256_GCM_SHA384, TLS_CHACHA20_POLY1305_SHA256, TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA, TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256, TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA, TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384, TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305, TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256, TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA, TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256, TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA, TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384, TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305, TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305_SHA256.Insecure values: TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA256, TLS_ECDHE_ECDSA_WITH_RC4_128_SHA, TLS_ECDHE_RSA_WITH_3DES_EDE_CBC_SHA, TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256, TLS_ECDHE_RSA_WITH_RC4_128_SHA, TLS_RSA_WITH_3DES_EDE_CBC_SHA, TLS_RSA_WITH_AES_128_CBC_SHA, TLS_RSA_WITH_AES_128_CBC_SHA256, TLS_RSA_WITH_AES_128_GCM_SHA256, TLS_RSA_WITH_AES_256_CBC_SHA, TLS_RSA_WITH_AES_256_GCM_SHA384, TLS_RSA_WITH_RC4_128_SHA.

 | --tls-curve-preferences int32Slice     Default: []

 |  | Comma-separated list of numeric Go crypto/tls CurveID values, as the allowed key exchange mechanisms for the server. The supported values depend on the Go version used. See https://pkg.go.dev/crypto/tls#CurveID for values supported for each Go version. The order of the list is ignored, and key exchange mechanisms are chosen by Go from this list using an internal preference order. If omitted, the default Go curves will be used.

 | --tls-min-version string

 |  | Minimum TLS version supported. Possible values: VersionTLS10, VersionTLS11, VersionTLS12, VersionTLS13

 | --tls-private-key-file string

 |  | File containing the default x509 private key matching --tls-cert-file.

 | --tls-sni-cert-key string

 |  | A pair of x509 certificate and private key file paths, optionally suffixed with a list of domain patterns which are fully qualified domain names, possibly with prefixed wildcard segments. The domain patterns also allow IP addresses, but IPs should only be used if the apiserver has visibility to the IP address requested by a client. If no domain patterns are provided, the names of the certificate are extracted. Non-wildcard matches trump over wildcard matches, explicit domain patterns trump over extracted names. For multiple key/certificate pairs, use the --tls-sni-cert-key multiple times. Examples: "example.crt,example.key" or "foo.crt,foo.key:*.foo.com,foo.com".

 | --unhealthy-zone-threshold float     Default: 0.55

 |  | Fraction of Nodes in a zone which needs to be not Ready (minimum 3) for zone to be treated as unhealthy.

 | --use-service-account-credentials

 |  | If true, use individual service account credentials for each controller.

 | -v, --v int
