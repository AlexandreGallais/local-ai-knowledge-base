---
title: "kube-apiserver (part 2 of 6)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/kube-apiserver.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# kube-apiserver (part 2 of 6)

## Options

 | --admission-control strings

 |  | Admission is divided into two phases. In the first phase, only mutating admission plugins run. In the second phase, only validating admission plugins run. The names in the below list may represent a validating plugin, a mutating plugin, or both. The order of plugins in which they are passed to this flag does not matter. Comma-delimited list of: AlwaysAdmit, AlwaysDeny, AlwaysPullImages, CertificateApproval, CertificateSigning, CertificateSubjectRestriction, ClusterTrustBundleAttest, DefaultIngressClass, DefaultStorageClass, DefaultTolerationSeconds, DenyServiceExternalIPs, EventRateLimit, ExtendedResourceToleration, ImagePolicyWebhook, LimitPodHardAntiAffinityTopology, LimitRanger, MutatingAdmissionPolicy, MutatingAdmissionWebhook, NamespaceAutoProvision, NamespaceExists, NamespaceLifecycle, NodeDeclaredFeatureValidator, NodeRestriction, OwnerReferencesPermissionEnforcement, PersistentVolumeClaimResize, PodGroupProtection, PodNodeSelector, PodResizeValidator, PodSecurity, PodTolerationRestriction, PodTopologyLabels, Priority, ResourceQuota, RuntimeClass, ServiceAccount, StorageObjectInUseProtection, TaintNodesByCondition, ValidatingAdmissionPolicy, ValidatingAdmissionWebhook. (DEPRECATED: Use --enable-admission-plugins or --disable-admission-plugins instead. Will be removed in a future version.)

 | --admission-control-config-file string

 |  | File with admission control configuration.

 | --advertise-address string

 |  | The IP address on which to advertise the apiserver to members of the cluster. This address must be reachable by the rest of the cluster. If blank, the --bind-address will be used. If --bind-address is unspecified, the host's default interface will be used.

 | --aggregator-reject-forwarding-redirect     Default: true

 |  | Aggregator reject forwarding redirect response back to client.

 | --allow-metric-labels stringToString     Default: []

 |  | The map from metric-label to value allow-list of this label. The key's format is <MetricName>,<LabelName>. The value's format is <allowed_value>,<allowed_value>...e.g. metric1,label1='v1,v2,v3', metric1,label2='v1,v2,v3' metric2,label1='v1,v2,v3'.

 | --allow-metric-labels-manifest string

 |  | The path to the manifest file that contains the allow-list mapping. The format of the file is the same as the flag --allow-metric-labels, i.e.,allowListMapping:"metric1,label1": "value11,value12""metric2,label2": ""Note that the flag --allow-metric-labels will override the manifest file.

 | --allow-privileged

 |  | If true, allow privileged containers. [default=false]

 | --anonymous-auth     Default: true

 |  | Enables anonymous requests to the secure port of the API server. Requests that are not rejected by another authentication method are treated as anonymous requests. Anonymous requests have a username of system:anonymous, and a group name of system:unauthenticated.

 | --api-audiences strings

 |  | Identifiers of the API. The service account token authenticator will validate that tokens used against the API are bound to at least one of these audiences. If the --service-account-issuer flag is configured and this flag is not, this field defaults to a single element list containing the issuer URL.

 | --audit-log-batch-buffer-size int     Default: 10000

 |  | The size of the buffer to store events before batching and writing. Only used in batch mode.

 | --audit-log-batch-max-size int     Default: 1

 |  | The maximum size of a batch. Only used in batch mode.

 | --audit-log-batch-max-wait duration

 |  | The amount of time to wait before force writing the batch that hadn't reached the max size. Only used in batch mode.

 | --audit-log-batch-throttle-burst int

 |  | Maximum number of requests sent at the same moment if ThrottleQPS was not utilized before. Only used in batch mode.

 | --audit-log-batch-throttle-enable

 |  | Whether batching throttling is enabled. Only used in batch mode.

 | --audit-log-batch-throttle-qps float

 |  | Maximum average number of batches per second. Only used in batch mode.

 | --audit-log-compress

 |  | If set, the rotated log files will be compressed using gzip.

 | --audit-log-format string     Default: "json"

 |  | Format of saved audits. "legacy" indicates 1-line text format for each event. "json" indicates structured json format. Known formats are legacy,json.

 | --audit-log-maxage int     Default: 366

 |  | The maximum number of days to retain old audit log files based on the timestamp encoded in their filename. Setting a value of 0 means old audit log files are not removed based on age.

 | --audit-log-maxbackup int     Default: 100

 |  | The maximum number of old audit log files to retain. Setting a value of 0 will mean there's no restriction on the number of files.

 | --audit-log-maxsize int     Default: 100

 |  | The maximum size in megabytes of the audit log file before it gets rotated. Setting to 0 disables rotation (not recommended).

 | --audit-log-mode string     Default: "blocking"

 |  | Strategy for sending audit events. Blocking indicates sending events should block server responses. Batch causes the backend to buffer and write events asynchronously. Known modes are batch,blocking,blocking-strict.

 | --audit-log-path string

 |  | If set, all requests coming to the apiserver will be logged to this file.  '-' means standard out.

 | --audit-log-truncate-enabled

 |  | Whether event and batch truncating is enabled.

 | --audit-log-truncate-max-batch-size int     Default: 10485760

 |  | Maximum size of the batch sent to the underlying backend. Actual serialized size can be several hundreds of bytes greater. If a batch exceeds this limit, it is split into several batches of smaller size.

 | --audit-log-truncate-max-event-size int     Default: 102400

 |  | Maximum size of the audit event sent to the underlying backend. If the size of an event is greater than this number, first request and response are removed, and if this doesn't reduce the size enough, event is discarded.

 | --audit-log-version string     Default: "audit.k8s.io/v1"

 |  | API group and version used for serializing audit events written to log.

 | --audit-policy-file string

 |  | Path to the file that defines the audit policy configuration.

 | --audit-webhook-batch-buffer-size int     Default: 10000

 |  | The size of the buffer to store events before batching and writing. Only used in batch mode.

 | --audit-webhook-batch-max-size int     Default: 400

 |  | The maximum size of a batch. Only used in batch mode.

 | --audit-webhook-batch-max-wait duration     Default: 30s

 |  | The amount of time to wait before force writing the batch that hadn't reached the max size. Only used in batch mode.

 | --audit-webhook-batch-throttle-burst int     Default: 15

 |  | Maximum number of requests sent at the same moment if ThrottleQPS was not utilized before. Only used in batch mode.

 | --audit-webhook-batch-throttle-enable     Default: true

 |  | Whether batching throttling is enabled. Only used in batch mode.

 | --audit-webhook-batch-throttle-qps float     Default: 10

 |  | Maximum average number of batches per second. Only used in batch mode.

 | --audit-webhook-config-file string

 |  | Path to a kubeconfig formatted file that defines the audit webhook configuration.

 | --audit-webhook-initial-backoff duration     Default: 10s

 |  | The amount of time to wait before retrying the first failed request.

 | --audit-webhook-mode string     Default: "batch"

 |  | Strategy for sending audit events. Blocking indicates sending events should block server responses. Batch causes the backend to buffer and write events asynchronously. Known modes are batch,blocking,blocking-strict.

 | --audit-webhook-truncate-enabled

 |  | Whether event and batch truncating is enabled.

 | --audit-webhook-truncate-max-batch-size int     Default: 10485760

 |  | Maximum size of the batch sent to the underlying backend. Actual serialized size can be several hundreds of bytes greater. If a batch exceeds this limit, it is split into several batches of smaller size.

 | --audit-webhook-truncate-max-event-size int     Default: 102400

 |  | Maximum size of the audit event sent to the underlying backend. If the size of an event is greater than this number, first request and response are removed, and if this doesn't reduce the size enough, event is discarded.

 | --audit-webhook-version string     Default: "audit.k8s.io/v1"

 |  | API group and version used for serializing audit events written to webhook.

 | --authentication-config string

 |  | File with Authentication Configuration to configure the JWT Token authenticator or the anonymous authenticator. This flag is mutually exclusive with the --oidc-* flags if the file configures the JWT Token authenticator. This flag is mutually exclusive with --anonymous-auth if the file configures the Anonymous authenticator.

 | --authentication-token-webhook-cache-ttl duration     Default: 2m0s

 |  | The duration to cache responses from the webhook token authenticator.

 | --authentication-token-webhook-config-file string

 |  | File with webhook configuration for token authentication in kubeconfig format. The API server will query the remote service to determine authentication for bearer tokens.

 | --authentication-token-webhook-version string     Default: "v1beta1"

 |  | The API version of the authentication.k8s.io TokenReview to send to and expect from the webhook.

 | --authorization-config string

 |  | File with Authorization Configuration to configure the authorizer chain. This flag is mutually exclusive with the other --authorization-mode and --authorization-webhook-* flags.

 | --authorization-mode strings

 |  | Ordered list of plug-ins to do authorization on secure port. Defaults to AlwaysAllow if --authorization-config is not used. Comma-delimited list of: AlwaysAllow,AlwaysDeny,ABAC,Webhook,RBAC,Node.

 | --authorization-policy-file string

 |  | File with authorization policy in json line by line format, used with --authorization-mode=ABAC, on the secure port.

 | --authorization-webhook-cache-authorized-ttl duration     Default: 5m0s

 |  | The duration to cache 'authorized' responses from the webhook authorizer.

 | --authorization-webhook-cache-unauthorized-ttl duration     Default: 30s

 |  | The duration to cache 'unauthorized' responses from the webhook authorizer.

 | --authorization-webhook-config-file string

 |  | File with webhook configuration in kubeconfig format, used with --authorization-mode=Webhook. The API server will query the remote service to determine access on the API server's secure port.

 | --authorization-webhook-version string     Default: "v1beta1"

 |  | The API version of the authorization.k8s.io SubjectAccessReview to send to and expect from the webhook.

 | --bind-address string     Default: 0.0.0.0

 |  | The IP address on which to listen for the --secure-port port. The associated interface(s) must be reachable by the rest of the cluster, and by CLI/web clients. If blank or an unspecified address (0.0.0.0 or ::), all interfaces and IP address families will be used.

 | --cert-dir string     Default: "/var/run/kubernetes"

 |  | The directory where the TLS certs are located. If --tls-cert-file and --tls-private-key-file are provided, this flag will be ignored.

 | --client-ca-file string

 |  | If set, any request presenting a client certificate signed by one of the authorities in the client-ca-file is authenticated with an identity corresponding to the CommonName of the client certificate.

 | --contention-profiling

 |  | Enable block profiling, if profiling is enabled

 | --coordinated-leadership-lease-duration duration     Default: 15s

 |  | The duration of the lease used for Coordinated Leader Election.

 | --coordinated-leadership-renew-deadline duration     Default: 10s

 |  | The deadline for renewing a coordinated leader election lease.

 | --coordinated-leadership-retry-period duration     Default: 2s

 |  | The period for retrying to renew a coordinated leader election lease.

 | --cors-allowed-origins strings

 |  | List of allowed origins for CORS, comma separated. An allowed origin can be a regular expression to support subdomain matching. If this list is empty CORS will not be enabled. Please ensure each expression matches the entire hostname by anchoring to the start with '^' or including the '//' prefix, and by anchoring to the end with '$' or including the ':' port separator suffix. Examples of valid expressions are '//example.com(:|$)' and '^https://example.com(:|$)'

 | --debug-socket-path string

 |  | Use an unprotected (no authn/authz) unix-domain socket for profiling with the given path

 | --default-not-ready-toleration-seconds int     Default: 300

 |  | Indicates the tolerationSeconds of the toleration for notReady:NoExecute that is added by default to every pod that does not already have such a toleration.

 | --default-unreachable-toleration-seconds int     Default: 300

 |  | Indicates the tolerationSeconds of the toleration for unreachable:NoExecute that is added by default to every pod that does not already have such a toleration.

 | --delete-collection-workers int     Default: 1

 |  | Number of workers spawned for DeleteCollection call. These are used to speed up namespace cleanup.

 | --disable-admission-plugins strings
