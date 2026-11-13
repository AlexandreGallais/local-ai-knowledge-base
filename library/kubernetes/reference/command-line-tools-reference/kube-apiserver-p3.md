---
title: "kube-apiserver (part 3 of 6)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/kube-apiserver.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# kube-apiserver (part 3 of 6)

|  | admission plugins that should be disabled although they are in the default enabled plugins list (NamespaceLifecycle, LimitRanger, ServiceAccount, TaintNodesByCondition, PodSecurity, Priority, DefaultTolerationSeconds, DefaultStorageClass, StorageObjectInUseProtection, PodGroupProtection, PersistentVolumeClaimResize, RuntimeClass, CertificateApproval, CertificateSigning, ClusterTrustBundleAttest, CertificateSubjectRestriction, DefaultIngressClass, PodTopologyLabels, NodeDeclaredFeatureValidator, PodResizeValidator, MutatingAdmissionPolicy, MutatingAdmissionWebhook, ValidatingAdmissionPolicy, ValidatingAdmissionWebhook, ResourceQuota). Comma-delimited list of admission plugins: AlwaysAdmit, AlwaysDeny, AlwaysPullImages, CertificateApproval, CertificateSigning, CertificateSubjectRestriction, ClusterTrustBundleAttest, DefaultIngressClass, DefaultStorageClass, DefaultTolerationSeconds, DenyServiceExternalIPs, EventRateLimit, ExtendedResourceToleration, ImagePolicyWebhook, LimitPodHardAntiAffinityTopology, LimitRanger, MutatingAdmissionPolicy, MutatingAdmissionWebhook, NamespaceAutoProvision, NamespaceExists, NamespaceLifecycle, NodeDeclaredFeatureValidator, NodeRestriction, OwnerReferencesPermissionEnforcement, PersistentVolumeClaimResize, PodGroupProtection, PodNodeSelector, PodResizeValidator, PodSecurity, PodTolerationRestriction, PodTopologyLabels, Priority, ResourceQuota, RuntimeClass, ServiceAccount, StorageObjectInUseProtection, TaintNodesByCondition, ValidatingAdmissionPolicy, ValidatingAdmissionWebhook. The order of plugins in this flag does not matter.

 | --disable-http2-serving

 |  | If true, HTTP2 serving will be disabled [default=false]

 | --disabled-metrics strings

 |  | This flag provides an escape hatch for misbehaving metrics. You must provide the fully qualified metric name in order to disable it. Disclaimer: disabling metrics is higher in precedence than showing hidden metrics.

 | --egress-selector-config-file string

 |  | File with apiserver egress selector configuration.

 | --emulated-version strings

 |  | The versions different components emulate their capabilities (APIs, features, ...) of.If set, the component will emulate the behavior of this version instead of the underlying binary version.Version format could only be major.minor, for example: '--emulated-version=wardle=1.2,kube=1.31'.Options are: kube=1.34..1.37(default:1.37)If the component is not specified, defaults to "kube"

 | --emulation-forward-compatible

 |  | If true, for any beta+ APIs enabled by default or by --runtime-config at the emulation version, their future versions with higher priority/stability will be auto enabled even if they introduced after the emulation version. Can only be set to true if the emulation version is lower than the binary version.

 | --enable-admission-plugins strings

 |  | admission plugins that should be enabled in addition to default enabled ones (NamespaceLifecycle, LimitRanger, ServiceAccount, TaintNodesByCondition, PodSecurity, Priority, DefaultTolerationSeconds, DefaultStorageClass, StorageObjectInUseProtection, PodGroupProtection, PersistentVolumeClaimResize, RuntimeClass, CertificateApproval, CertificateSigning, ClusterTrustBundleAttest, CertificateSubjectRestriction, DefaultIngressClass, PodTopologyLabels, NodeDeclaredFeatureValidator, PodResizeValidator, MutatingAdmissionPolicy, MutatingAdmissionWebhook, ValidatingAdmissionPolicy, ValidatingAdmissionWebhook, ResourceQuota). Comma-delimited list of admission plugins: AlwaysAdmit, AlwaysDeny, AlwaysPullImages, CertificateApproval, CertificateSigning, CertificateSubjectRestriction, ClusterTrustBundleAttest, DefaultIngressClass, DefaultStorageClass, DefaultTolerationSeconds, DenyServiceExternalIPs, EventRateLimit, ExtendedResourceToleration, ImagePolicyWebhook, LimitPodHardAntiAffinityTopology, LimitRanger, MutatingAdmissionPolicy, MutatingAdmissionWebhook, NamespaceAutoProvision, NamespaceExists, NamespaceLifecycle, NodeDeclaredFeatureValidator, NodeRestriction, OwnerReferencesPermissionEnforcement, PersistentVolumeClaimResize, PodGroupProtection, PodNodeSelector, PodResizeValidator, PodSecurity, PodTolerationRestriction, PodTopologyLabels, Priority, ResourceQuota, RuntimeClass, ServiceAccount, StorageObjectInUseProtection, TaintNodesByCondition, ValidatingAdmissionPolicy, ValidatingAdmissionWebhook. The order of plugins in this flag does not matter.

 | --enable-aggregator-routing

 |  | Turns on aggregator routing requests to endpoints IP rather than cluster IP.

 | --enable-bootstrap-token-auth

 |  | Enable to allow secrets of type '<example-value>' in the '<example-value>' namespace to be used for TLS bootstrapping authentication.

 | --enable-garbage-collector     Default: true

 |  | Enables the generic garbage collector. MUST be synced with the corresponding flag of the kube-controller-manager.

 | --enable-logs-handler

 |  | If true, install a /logs handler for the apiserver logs.

 | --enable-priority-and-fairness     Default: true

 |  | If true, replace the max-in-flight handler with an enhanced one that queues and dispatches with priority and fairness

 | --encryption-provider-config string

 |  | The file containing configuration for encryption providers to be used for storing secrets in etcd

 | --encryption-provider-config-automatic-reload

 |  | Determines if the file set by --encryption-provider-config should be automatically reloaded if the disk contents change. Setting this to true disables the ability to uniquely identify distinct KMS plugins via the API server healthz endpoints.

 | --endpoint-reconciler-type string     Default: "lease"

 |  | Use an endpoint reconciler (master-count, lease, none) master-count is deprecated, and will be removed in a future version.

 | --etcd-cafile string

 |  | SSL Certificate Authority file used to secure etcd communication.

 | --etcd-certfile string

 |  | SSL certification file used to secure etcd communication.

 | --etcd-compaction-interval duration     Default: 5m0s

 |  | The interval of compaction requests. If 0, the compaction request from apiserver is disabled.

 | --etcd-count-metric-poll-period duration     Default: 1m0s

 |  | Frequency of polling etcd for number of resources per type. 0 disables the metric collection.

 | --etcd-db-metric-poll-interval duration     Default: 30s

 |  | The interval of requests to poll etcd and update metric. 0 disables the metric collection

 | --etcd-healthcheck-timeout duration     Default: 2s

 |  | The timeout to use when checking etcd health.

 | --etcd-keyfile string

 |  | SSL key file used to secure etcd communication.

 | --etcd-prefix string     Default: "/registry"

 |  | The prefix to prepend to all resource paths in etcd.

 | --etcd-readycheck-timeout duration     Default: 2s

 |  | The timeout to use when checking etcd readiness

 | --etcd-servers strings

 |  | List of etcd servers to connect with (scheme://ip:port), comma separated.

 | --etcd-servers-overrides strings

 |  | Per-resource etcd servers overrides, comma separated. The individual override format: group/resource#servers, where servers are URLs, semicolon separated. Note that this applies only to resources compiled into this server binary. e.g. "/pods#http://etcd4:2379;http://etcd5:2379,/events#http://etcd6:2379"

 | --event-ttl duration     Default: 1h0m0s

 |  | Amount of time to retain events.

 | --external-hostname string

 |  | The hostname to use when generating externalized URLs for this master (e.g. Swagger API Docs or OpenID Discovery).

 | --feature-gates colonSeparatedMultimapStringString
