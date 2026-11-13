---
title: "kube-apiserver (part 5 of 6)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/kube-apiserver.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# kube-apiserver (part 5 of 6)

|  | This and --max-mutating-requests-inflight are summed to determine the server's total concurrency limit (which must be positive) if --enable-priority-and-fairness is true. Otherwise, this flag limits the maximum number of non-mutating requests in flight, or a zero value disables the limit completely.

 | --min-compatibility-version strings

 |  | The min version of control plane components the server should be compatible with.Must be less or equal to the emulated-version. Version format could only be major.minor, for example: '--min-compatibility-version=wardle=1.2,kube=1.31'.Options are: kube=1.34..1.37(default:1.36)If the component is not specified, defaults to "kube"

 | --min-request-timeout int     Default: 1800

 |  | An optional field indicating the minimum number of seconds a handler must keep a request open before timing it out. Currently only honored by the watch request handler, which picks a randomized value above this number as the connection timeout, to spread out load.

 | --oidc-ca-file string

 |  | If set, the OpenID server's certificate will be verified by one of the authorities in the oidc-ca-file, otherwise the host's root CA set will be used.

 | --oidc-client-id string

 |  | The client ID for the OpenID Connect client, must be set if oidc-issuer-url is set.

 | --oidc-groups-claim string

 |  | If provided, the name of a custom OpenID Connect claim for specifying user groups. The claim value is expected to be a string or array of strings. This flag is experimental, please see the authentication documentation for further details.

 | --oidc-groups-prefix string

 |  | If provided, all groups will be prefixed with this value to prevent conflicts with other authentication strategies.

 | --oidc-issuer-url string

 |  | The URL of the OpenID issuer, only HTTPS scheme will be accepted. If set, it will be used to verify the OIDC JSON Web Token (JWT).

 | --oidc-required-claim <comma-separated 'key=value' pairs>

 |  | A key=value pair that describes a required claim in the ID Token. If set, the claim is verified to be present in the ID Token with a matching value. Repeat this flag to specify multiple claims.

 | --oidc-signing-algs strings     Default: "RS256"

 |  | Comma-separated list of allowed JOSE asymmetric signing algorithms. JWTs with a supported 'alg' header values are: RS256, RS384, RS512, ES256, ES384, ES512, PS256, PS384, PS512. Values are defined by RFC 7518 https://tools.ietf.org/html/rfc7518#section-3.1.

 | --oidc-username-claim string     Default: "sub"

 |  | The OpenID claim to use as the user name. Note that claims other than the default ('sub') is not guaranteed to be unique and immutable. This flag is experimental, please see the authentication documentation for further details.

 | --oidc-username-prefix string

 |  | If provided, all usernames will be prefixed with this value. If not provided, username claims other than 'email' are prefixed by the issuer URL to avoid clashes. To skip any prefixing, provide the value '-'.

 | --peer-advertise-ip string

 |  | If set and the UnknownVersionInteroperabilityProxy feature gate is enabled, this IP will be used by peer kube-apiservers to proxy requests to this kube-apiserver when the request cannot be handled by the peer due to version skew between the kube-apiservers. This flag is only used in clusters configured with multiple kube-apiservers for high availability.

 | --peer-advertise-port string

 |  | If set and the UnknownVersionInteroperabilityProxy feature gate is enabled, this port will be used by peer kube-apiservers to proxy requests to this kube-apiserver when the request cannot be handled by the peer due to version skew between the kube-apiservers. This flag is only used in clusters configured with multiple kube-apiservers for high availability.

 | --peer-ca-file string

 |  | If set and the UnknownVersionInteroperabilityProxy feature gate is enabled, this file will be used to verify serving certificates of peer kube-apiservers. This flag is only used in clusters configured with multiple kube-apiservers for high availability.

 | --permit-address-sharing

 |  | If true, SO_REUSEADDR will be used when binding the port. This allows binding to wildcard IPs like 0.0.0.0 and specific IPs in parallel, and it avoids waiting for the kernel to release sockets in TIME_WAIT state. [default=false]

 | --permit-port-sharing

 |  | If true, SO_REUSEPORT will be used when binding the port, which allows more than one instance to bind on the same address and port. [default=false]

 | --profiling     Default: true

 |  | Enable profiling via web interface host:port/debug/pprof/

 | --proxy-client-cert-file string

 |  | Client certificate used to prove the identity of the aggregator or kube-apiserver when it must call out during a request. This includes proxying requests to a user api-server and calling out to webhook admission plugins. It is expected that this cert includes a signature from the CA in the --requestheader-client-ca-file flag. That CA is published in the 'extension-apiserver-authentication' configmap in the kube-system namespace. Components receiving calls from kube-aggregator should use that CA to perform their half of the mutual TLS verification.

 | --proxy-client-key-file string

 |  | Private key for the client certificate used to prove the identity of the aggregator or kube-apiserver when it must call out during a request. This includes proxying requests to a user api-server and calling out to webhook admission plugins.

 | --request-timeout duration     Default: 1m0s

 |  | An optional field indicating the duration a handler must keep a request open before timing it out. This is the default request timeout for requests but may be overridden by flags such as --min-request-timeout for specific types of requests.

 | --requestheader-allowed-names strings

 |  | List of client certificate common names to allow to provide usernames in headers specified by --requestheader-username-headers. If empty, any client certificate validated by the authorities in --requestheader-client-ca-file is allowed.

 | --requestheader-client-ca-file string

 |  | Root certificate bundle to use to verify client certificates on incoming requests before trusting usernames in headers specified by --requestheader-username-headers. WARNING: generally do not depend on authorization being already done for incoming requests.

 | --requestheader-extra-headers-prefix strings

 |  | List of request header prefixes to inspect. X-Remote-Extra- is suggested.

 | --requestheader-group-headers strings

 |  | List of request headers to inspect for groups. X-Remote-Group is suggested.

 | --requestheader-uid-headers strings

 |  | List of request headers to inspect for UIDs. X-Remote-Uid is suggested. Requires the RemoteRequestHeaderUID feature to be enabled.

 | --requestheader-username-headers strings

 |  | List of request headers to inspect for usernames. X-Remote-User is common.

 | --runtime-config <comma-separated 'key=value' pairs>

 |  | A set of key=value pairs that enable or disable built-in APIs. Supported options are:v1=true|false for the core API group<group>/<version>=true|false for a specific API group and version (e.g. apps/v1=true)api/all=true|false controls all API versionsapi/ga=true|false controls all API versions of the form v[0-9]+api/beta=true|false controls all API versions of the form v[0-9]+beta[0-9]+api/alpha=true|false controls all API versions of the form v[0-9]+alpha[0-9]+api/legacy is deprecated, and will be removed in a future version

 | --runtime-config-emulation-forward-compatible

 |  | If true, APIs identified by group/version that are enabled in the --runtime-config flag will be installed even if it is introduced after the emulation version. If false, server would fail to start if any APIs identified by group/version that are enabled in the --runtime-config flag are introduced after the emulation version. Can only be set to true if the emulation version is lower than the binary version.

 | --secure-port int     Default: 6443

 |  | The port on which to serve HTTPS with authentication and authorization. It cannot be switched off with 0.

 | --service-account-extend-token-expiration     Default: true

 |  | Turns on projected service account expiration extension during token generation, which helps safe transition from legacy token to bound service account token feature. If this flag is enabled, admission injected tokens would be extended up to 1 year to prevent unexpected failure during transition, ignoring value of service-account-max-token-expiration.

 | --service-account-issuer strings

 |  | Identifier of the service account token issuer. The issuer will assert this identifier in "iss" claim of issued tokens. This value is a string or URI. If this option is not a valid URI per the OpenID Discovery 1.0 spec, the ServiceAccountIssuerDiscovery feature will remain disabled, even if the feature gate is set to true. It is highly recommended that this value comply with the OpenID spec: https://openid.net/specs/openid-connect-discovery-1_0.html. In practice, this means that service-account-issuer must be an https URL. It is also highly recommended that this URL be capable of serving OpenID discovery documents at {service-account-issuer}/.well-known/openid-configuration. When this flag is specified multiple times, the first is used to generate tokens and all are used to determine which issuers are accepted.

 | --service-account-jwks-uri string

 |  | Overrides the URI for the JSON Web Key Set in the discovery doc served at /.well-known/openid-configuration. This flag is useful if the discovery doc and key set are served to relying parties from a URL other than the API server's external (as auto-detected or overridden with external-hostname).

 | --service-account-key-file strings

 |  | File containing PEM-encoded x509 RSA or ECDSA private or public keys, used to verify ServiceAccount tokens. The specified file can contain multiple keys, and the flag can be specified multiple times with different files. If unspecified, --tls-private-key-file is used. Must be specified when --service-account-signing-key-file is provided

 | --service-account-lookup     Default: true

 |  | If true, validate ServiceAccount tokens exist in etcd as part of authentication.

 | --service-account-max-token-expiration duration

 |  | The maximum validity duration of a token created by the service account token issuer. If an otherwise valid TokenRequest with a validity duration larger than this value is requested, a token will be issued with a validity duration of this value.

 | --service-account-signing-endpoint string

 |  | Path to socket where a external JWT signer is listening. This flag is mutually exclusive with --service-account-signing-key-file and --service-account-key-file. Requires enabling feature gate (ExternalServiceAccountTokenSigner)

 | --service-account-signing-key-file string

 |  | Path to the file that contains the current private key of the service account token issuer. The issuer will sign issued ID tokens with this private key.

 | --service-cluster-ip-range string

 |  | A CIDR notation IP range from which to assign service cluster IPs. This must not overlap with any IP ranges assigned to nodes or pods. Max of two dual-stack CIDRs is allowed.

 | --service-node-port-range <a string in the form 'N1-N2'>     Default: 30000-32767

 |  | A port range to reserve for services with NodePort visibility.  This must not overlap with the ephemeral port range on nodes.  Example: '30000-32767'. Inclusive at both ends of the range.

 | --show-hidden-metrics-for-version string

 |  | The previous version for which you want to show hidden metrics. Only the previous minor version is meaningful, other values will not be allowed. The format is <major>.<minor>, e.g.: '1.16'. The purpose of this format is make sure you have the opportunity to notice if the next release hides additional metrics, rather than being surprised when they are permanently removed in the release after that.

 | --shutdown-delay-duration duration

 |  | Time to delay the termination. During that time the server keeps serving requests normally. The endpoints /healthz and /livez will return success, but /readyz immediately returns failure. Graceful termination starts after this delay has elapsed. This can be used to allow load balancer to stop sending traffic to this server.

 | --shutdown-send-retry-after

 |  | If true the HTTP Server will continue listening until all non long running request(s) in flight have been drained, during this window all incoming requests will be rejected with a status code 429 and a 'Retry-After' response header, in addition 'Connection: close' response header is set in order to tear down the TCP connection when idle.

 | --shutdown-watch-termination-grace-period duration

 |  | This option, if set, represents the maximum amount of grace period the apiserver will wait for active watch request(s) to drain during the graceful server shutdown window.

 | --storage-backend string

 |  | The storage backend for persistence. Options: 'etcd3' (default).

 | --storage-initialization-timeout duration     Default: 1m0s

 |  | Maximum amount of time to wait for storage initialization before declaring apiserver ready. Defaults to 1m.

 | --storage-media-type string     Default: "application/vnd.kubernetes.protobuf"

 |  | The media type to use to store objects in storage. Some resources or storage backends may only support a specific media type and will ignore this setting. Supported media types: [application/json, application/yaml, application/vnd.kubernetes.protobuf]

 | --strict-transport-security-directives strings

 |  | List of directives for HSTS, comma separated. If this list is empty, then HSTS directives will not be added. Example: 'max-age=31536000,includeSubDomains,preload'

 | --tls-cert-file string

 |  | File containing the default x509 Certificate for HTTPS. (CA cert, if any, concatenated after server cert). If HTTPS serving is enabled, and --tls-cert-file and --tls-private-key-file are not provided, a self-signed certificate and key are generated for the public address and saved to the directory specified by --cert-dir.

 | --tls-cipher-suites strings
