---
title: "kube-controller-manager (part 2 of 5)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/kube-controller-manager.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# kube-controller-manager (part 2 of 5)

## Options

 | --allocate-node-cidrs

 |  | Should CIDRs for Pods be allocated and set on the cloud provider. Requires --cluster-cidr.

 | --allow-metric-labels stringToString     Default: []

 |  | The map from metric-label to value allow-list of this label. The key's format is <MetricName>,<LabelName>. The value's format is <allowed_value>,<allowed_value>...e.g. metric1,label1='v1,v2,v3', metric1,label2='v1,v2,v3' metric2,label1='v1,v2,v3'.

 | --allow-metric-labels-manifest string

 |  | The path to the manifest file that contains the allow-list mapping. The format of the file is the same as the flag --allow-metric-labels, i.e.,allowListMapping:"metric1,label1": "value11,value12""metric2,label2": ""Note that the flag --allow-metric-labels will override the manifest file.

 | --attach-detach-reconcile-sync-period duration     Default: 1m0s

 |  | The reconciler sync wait time between volume attach detach. This duration must be larger than one second, and increasing this value from the default may allow for volumes to be mismatched with pods.

 | --authentication-kubeconfig string

 |  | kubeconfig file pointing at the '<example-value>' kubernetes server with enough rights to create tokenreviews.authentication.k8s.io. This is optional. If empty, all token <example-value> are considered to be anonymous and no client CA is looked up in the cluster.

 | --authentication-skip-lookup

 |  | If false, the authentication-kubeconfig will be used to lookup missing authentication configuration from the cluster.

 | --authentication-token-webhook-cache-ttl duration     Default: 10s

 |  | The duration to cache responses from the webhook token authenticator.

 | --authentication-tolerate-lookup-failure

 |  | If true, failures to look up missing authentication configuration from the cluster are not considered fatal. Note that this can result in authentication that treats all requests as anonymous.

 | --authorization-always-allow-paths strings     Default: "/healthz,/readyz,/livez"

 |  | A list of HTTP paths to skip during authorization, i.e. these are authorized without contacting the 'core' kubernetes server.

 | --authorization-kubeconfig string

 |  | kubeconfig file pointing at the 'core' kubernetes server with enough rights to create subjectaccessreviews.authorization.k8s.io. This is optional. If empty, all requests not skipped by authorization are forbidden.

 | --authorization-webhook-cache-authorized-ttl duration     Default: 10s

 |  | The duration to cache 'authorized' responses from the webhook authorizer.

 | --authorization-webhook-cache-unauthorized-ttl duration     Default: 10s

 |  | The duration to cache 'unauthorized' responses from the webhook authorizer.

 | --bind-address string     Default: 0.0.0.0

 |  | The IP address on which to listen for the --secure-port port. The associated interface(s) must be reachable by the rest of the cluster, and by CLI/web clients. If blank or an unspecified address (0.0.0.0 or ::), all interfaces and IP address families will be used.

 | --cert-dir string

 |  | The directory where the TLS certs are located. If --tls-cert-file and --tls-private-key-file are provided, this flag will be ignored.

 | --cidr-allocator-type string     Default: "RangeAllocator"

 |  | Type of CIDR allocator to use

 | --client-ca-file string

 |  | If set, any request presenting a client certificate signed by one of the authorities in the client-ca-file is authenticated with an identity corresponding to the CommonName of the client certificate.

 | --cloud-config string

 |  | The path to the cloud provider configuration file. Empty string for no configuration file.

 | --cloud-provider string

 |  | The provider for cloud services. Empty string for no provider.

 | --cluster-cidr string

 |  | CIDR Range for Pods in cluster. Only used when --allocate-node-cidrs=true; if false, this option will be ignored.

 | --cluster-name string     Default: "kubernetes"

 |  | The instance prefix for the cluster.

 | --cluster-signing-cert-file string

 |  | Filename containing a PEM-encoded X509 CA certificate used to issue cluster-scoped certificates.  If specified, no more specific --cluster-signing-* flag may be specified.

 | --cluster-signing-duration duration     Default: 8760h0m0s

 |  | The max length of duration signed certificates will be given.  Individual CSRs may request shorter certs by setting spec.expirationSeconds.

 | --cluster-signing-key-file string

 |  | Filename containing a PEM-encoded RSA or ECDSA private key used to sign cluster-scoped certificates.  If specified, no more specific --cluster-signing-* flag may be specified.

 | --cluster-signing-kube-apiserver-client-cert-file string

 |  | Filename containing a PEM-encoded X509 CA certificate used to issue certificates for the kubernetes.io/kube-apiserver-client signer.  If specified, --cluster-signing-{cert,key}-file must not be set.

 | --cluster-signing-kube-apiserver-client-key-file string

 |  | Filename containing a PEM-encoded RSA or ECDSA private key used to sign certificates for the kubernetes.io/kube-apiserver-client signer.  If specified, --cluster-signing-{cert,key}-file must not be set.

 | --cluster-signing-kubelet-client-cert-file string

 |  | Filename containing a PEM-encoded X509 CA certificate used to issue certificates for the kubernetes.io/kube-apiserver-client-kubelet signer.  If specified, --cluster-signing-{cert,key}-file must not be set.

 | --cluster-signing-kubelet-client-key-file string

 |  | Filename containing a PEM-encoded RSA or ECDSA private key used to sign certificates for the kubernetes.io/kube-apiserver-client-kubelet signer.  If specified, --cluster-signing-{cert,key}-file must not be set.

 | --cluster-signing-kubelet-serving-cert-file string

 |  | Filename containing a PEM-encoded X509 CA certificate used to issue certificates for the kubernetes.io/kubelet-serving signer.  If specified, --cluster-signing-{cert,key}-file must not be set.

 | --cluster-signing-kubelet-serving-key-file string

 |  | Filename containing a PEM-encoded RSA or ECDSA private key used to sign certificates for the kubernetes.io/kubelet-serving signer.  If specified, --cluster-signing-{cert,key}-file must not be set.

 | --cluster-signing-legacy-unknown-cert-file string

 |  | Filename containing a PEM-encoded X509 CA certificate used to issue certificates for the kubernetes.io/legacy-unknown signer.  If specified, --cluster-signing-{cert,key}-file must not be set.

 | --cluster-signing-legacy-unknown-key-file string

 |  | Filename containing a PEM-encoded RSA or ECDSA private key used to sign certificates for the kubernetes.io/legacy-unknown signer.  If specified, --cluster-signing-{cert,key}-file must not be set.

 | --concurrent-cron-job-syncs int32     Default: 5

 |  | The number of cron job objects that are allowed to sync concurrently. Larger number = more responsive jobs, but more CPU (and network) load

 | --concurrent-daemonset-syncs int32     Default: 2

 |  | The number of daemonset objects that are allowed to sync concurrently. Larger number = more responsive daemonsets, but more CPU (and network) load

 | --concurrent-deployment-syncs int32     Default: 5

 |  | The number of deployment objects that are allowed to sync concurrently. Larger number = more responsive deployments, but more CPU (and network) load

 | --concurrent-device-taint-eviction-syncs int32     Default: 8

 |  | The number of operations (evicting pods, updating DeviceTaintRule status) allowed to run concurrently. Greater number = more responsive, but more CPU (and network) load

 | --concurrent-disruption-syncs int32     Default: 1

 |  | The number of PDB objects that are allowed to sync concurrently. Larger number = more responsive PDB updates, but more CPU (and network) load

 | --concurrent-endpoint-syncs int32     Default: 5

 |  | The number of endpoint syncing operations that will be done concurrently. Larger number = faster endpoint updating, but more CPU (and network) load

 | --concurrent-ephemeralvolume-syncs int32     Default: 5

 |  | The number of ephemeral volume syncing operations that will be done concurrently. Larger number = faster ephemeral volume updating, but more CPU (and network) load

 | --concurrent-gc-syncs int32     Default: 20

 |  | The number of garbage collector workers that are allowed to sync concurrently.

 | --concurrent-horizontal-pod-autoscaler-syncs int32     Default: 5

 |  | The number of horizontal pod autoscaler objects that are allowed to sync concurrently. Larger number = more responsive horizontal pod autoscaler objects processing, but more CPU (and network) load.

 | --concurrent-job-syncs int32     Default: 5

 |  | The number of job objects that are allowed to sync concurrently. Larger number = more responsive jobs, but more CPU (and network) load

 | --concurrent-namespace-syncs int32     Default: 10

 |  | The number of namespace objects that are allowed to sync concurrently. Larger number = more responsive namespace termination, but more CPU (and network) load

 | --concurrent-rc-syncs int32     Default: 5

 |  | The number of replication controllers that are allowed to sync concurrently. Larger number = more responsive replica management, but more CPU (and network) load

 | --concurrent-replicaset-syncs int32     Default: 5

 |  | The number of replica sets that are allowed to sync concurrently. Larger number = more responsive replica management, but more CPU (and network) load

 | --concurrent-resource-quota-syncs int32     Default: 5

 |  | The number of resource quotas that are allowed to sync concurrently. Larger number = more responsive quota management, but more CPU (and network) load

 | --concurrent-resourceclaim-syncs int32     Default: 50

 |  | The number of operations (creating or deleting ResourceClaims) allowed to run concurrently. Larger number = more responsive, but more CPU (and network) load

 | --concurrent-service-endpoint-syncs int32     Default: 5

 |  | The number of service endpoint syncing operations that will be done concurrently. Larger number = faster endpoint slice updating, but more CPU (and network) load. Defaults to 5.

 | --concurrent-serviceaccount-token-syncs int32     Default: 5

 |  | The number of service account token <example-value> that are allowed to sync concurrently. Larger number = more responsive token <example-value>, but more CPU (and network) load

 | --concurrent-statefulset-syncs int32     Default: 5

 |  | The number of statefulset objects that are allowed to sync concurrently. Larger number = more responsive statefulsets, but more CPU (and network) load

 | --concurrent-ttl-after-finished-syncs int32     Default: 5

 |  | The number of ttl-after-finished-controller workers that are allowed to sync concurrently.

 | --concurrent-validating-admission-policy-status-syncs int32     Default: 5

 |  | The number of ValidatingAdmissionPolicyStatusController workers that are allowed to sync concurrently.

 | --configure-cloud-routes     Default: true

 |  | Should CIDRs allocated by allocate-node-cidrs be configured on the cloud provider.

 | --contention-profiling

 |  | Enable block profiling, if profiling is enabled

 | --controller-shutdown-timeout duration     Default: 10s

 |  | Time to wait for the controllers to shut down before terminating the executable

 | --controller-start-interval duration

 |  | Interval between starting controller managers.

 | --controllers strings     Default: "*"

 |  | A list of controllers to enable. '<example-value>' enables all on-by-default controllers, '<example-value>' enables the controller named '<example-value>', '<example-value>' disables the controller named '<example-value>'.All controllers: bootstrap-signer-controller, certificatesigningrequest-approving-controller, certificatesigningrequest-cleaner-controller, certificatesigningrequest-signing-controller, clusterrole-aggregation-controller, cronjob-controller, daemonset-controller, deployment-controller, device-taint-eviction-controller, disruption-controller, endpoints-controller, endpointslice-controller, endpointslice-mirroring-controller, ephemeral-volume-controller, garbage-collector-controller, horizontal-pod-autoscaler-controller, job-controller, kube-apiserver-serving-clustertrustbundle-publisher-controller, legacy-serviceaccount-token-cleaner-controller, namespace-controller, node-ipam-controller, node-lifecycle-controller, persistentvolume-attach-detach-controller, persistentvolume-binder-controller, persistentvolume-expander-controller, persistentvolume-protection-controller, persistentvolumeclaim-protection-controller, pod-garbage-collector-controller, podcertificaterequest-cleaner-controller, podgroup-protection-controller, replicaset-controller, replicationcontroller-controller, resourceclaim-controller, resourcepoolstatusrequest-controller, resourcequota-controller, root-ca-certificate-publisher-controller, selinux-warning-controller, service-cidr-controller, serviceaccount-controller, serviceaccount-token-controller, statefulset-controller, storage-version-migrator-controller, storageversion-garbage-collector-controller, taint-eviction-controller, token-cleaner-controller, ttl-after-finished-controller, ttl-controller, validatingadmissionpolicy-status-controller, volumeattributesclass-protection-controllerDisabled-by-default controllers: bootstrap-signer-controller, selinux-warning-controller, token-cleaner-controller

 | --disable-attach-detach-reconcile-sync

 |  | Disable volume attach detach reconciler sync. Disabling this may cause volumes to be mismatched with pods. Use wisely.

 | --disable-force-detach-on-timeout

 |  | Prevent force detaching volumes based on maximum unmount time and node status. If this flag is set to true, the non-graceful node shutdown feature must be used to recover from node failure. See https://k8s.io/docs/storage-disable-force-detach-on-timeout/.

 | --disable-http2-serving

 |  | If true, HTTP2 serving will be disabled [default=false]

 | --disabled-metrics strings

 |  | This flag provides an escape hatch for misbehaving metrics. You must provide the fully qualified metric name in order to disable it. Disclaimer: disabling metrics is higher in precedence than showing hidden metrics.

 | --emulated-version strings

 |  | The versions different components emulate their capabilities (APIs, features, ...) of.If set, the component will emulate the behavior of this version instead of the underlying binary version.Version format could only be major.minor, for example: '--emulated-version=wardle=1.2,kube=1.31'.Options are: kube=1.34..1.37(default:1.37)If the component is not specified, defaults to "kube"

 | --enable-dynamic-provisioning     Default: true

 |  | Enable dynamic provisioning for environments that support it.

 | --enable-garbage-collector     Default: true

 |  | Enables the generic garbage collector. MUST be synced with the corresponding flag of the kube-apiserver.
