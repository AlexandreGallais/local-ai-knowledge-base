---
title: "kube-scheduler (part 4 of 4)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/kube-scheduler.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# kube-scheduler (part 4 of 4)

|  | The min version of control plane components the server should be compatible with.Must be less or equal to the emulated-version. Version format could only be major.minor, for example: '--min-compatibility-version=wardle=1.2,kube=1.31'.Options are: kube=1.34..1.37(default:1.36)If the component is not specified, defaults to "kube"

 | --permit-address-sharing

 |  | If true, SO_REUSEADDR will be used when binding the port. This allows binding to wildcard IPs like 0.0.0.0 and specific IPs in parallel, and it avoids waiting for the kernel to release sockets in TIME_WAIT state. [default=false]

 | --permit-port-sharing

 |  | If true, SO_REUSEPORT will be used when binding the port, which allows more than one instance to bind on the same address and port. [default=false]

 | --pod-max-in-unschedulable-pods-duration duration     Default: 5m0s

 |  | DEPRECATED: the maximum time a pod can stay in unschedulablePods. If a pod stays in unschedulablePods for longer than this value, the pod will be moved from unschedulablePods to backoffQ or activeQ. This flag is deprecated and will be removed in a future version.

 | --profiling     Default: true

 |  | DEPRECATED: enable profiling via web interface host:port/debug/pprof/. This parameter is ignored if a config file is specified in --config.

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

 | --secure-port int     Default: 10259

 |  | The port on which to serve HTTPS with authentication and authorization. If 0, don't serve HTTPS at all.

 | --show-hidden-metrics-for-version string

 |  | The previous version for which you want to show hidden metrics. Only the previous minor version is meaningful, other values will not be allowed. The format is <major>.<minor>, e.g.: '1.16'. The purpose of this format is make sure you have the opportunity to notice if the next release hides additional metrics, rather than being surprised when they are permanently removed in the release after that.

 | --tls-cert-file string

 |  | File containing the default x509 Certificate for HTTPS. (CA cert, if any, concatenated after server cert). If HTTPS serving is enabled, and --tls-cert-file and --tls-private-key-file are not provided, a self-signed certificate and key are generated for the public address and saved to the directory specified by --cert-dir.

 | --tls-cipher-suites strings

 |  | Comma-separated list of cipher suites for the server. If omitted, the default Go cipher suites will be used.Preferred values: TLS_AES_128_GCM_SHA256, TLS_AES_256_GCM_SHA384, TLS_CHACHA20_POLY1305_SHA256, TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA, TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256, TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA, TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384, TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305, TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256, TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA, TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256, TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA, TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384, TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305, TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305_SHA256.Insecure values: TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA256, TLS_ECDHE_ECDSA_WITH_RC4_128_SHA, TLS_ECDHE_RSA_WITH_3DES_EDE_CBC_SHA, TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256, TLS_ECDHE_RSA_WITH_RC4_128_SHA, TLS_RSA_WITH_3DES_EDE_CBC_SHA, TLS_RSA_WITH_AES_128_CBC_SHA, TLS_RSA_WITH_AES_128_CBC_SHA256, TLS_RSA_WITH_AES_128_GCM_SHA256, TLS_RSA_WITH_AES_256_CBC_SHA, TLS_RSA_WITH_AES_256_GCM_SHA384, TLS_RSA_WITH_RC4_128_SHA.

 | --tls-curve-preferences int32Slice     Default: []

 |  | Comma-separated list of numeric Go crypto/tls CurveID values, as the allowed key <example-value> mechanisms for the server. The supported values depend on the Go version used. See https://pkg.go.dev/crypto/tls#CurveID for values supported for each Go version. The order of the list is ignored, and key <example-value> mechanisms are chosen by Go from this list using an internal preference order. If omitted, the default Go curves will be used.

 | --tls-min-version string

 |  | Minimum TLS version supported. Possible values: VersionTLS10, VersionTLS11, VersionTLS12, VersionTLS13

 | --tls-private-key-file string

 |  | File containing the default x509 private key <example-value> --tls-cert-file.

 | --tls-sni-cert-key <example-value>

 |  | A pair of x509 certificate and private key file paths, optionally suffixed with a list of domain patterns which are fully qualified domain names, possibly with prefixed wildcard segments. The domain patterns also allow IP addresses, but IPs should only be used if the apiserver has visibility to the IP address requested by a client. If no domain patterns are provided, the names of the certificate are extracted. Non-wildcard matches trump over wildcard matches, explicit domain patterns trump over extracted names. For multiple key/certificate pairs, use the --tls-sni-cert-key <example-value> times. Examples: "example.crt,example.key" or "foo.crt,foo.key:*.foo.com,foo.com".

 | -v, --v int

 |  | number for the log level verbosity

 | --version version[=true]

 |  | --version, --version=raw prints version information and quits; --version=vX.Y.Z... sets the reported version

 | --vmodule pattern=N,...

 |  | comma-separated list of pattern=N settings for file-filtered logging (only works for text log format)

 | --write-config-to string

 |  | If set, write the configuration values to this file and exit.
