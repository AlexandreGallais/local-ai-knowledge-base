---
title: "kube-apiserver (part 6 of 6)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/kube-apiserver.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# kube-apiserver (part 6 of 6)

|  | Comma-separated list of cipher suites for the server. If omitted, the default Go cipher suites will be used.Preferred values: TLS_AES_128_GCM_SHA256, TLS_AES_256_GCM_SHA384, TLS_CHACHA20_POLY1305_SHA256, TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA, TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256, TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA, TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384, TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305, TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256, TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA, TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256, TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA, TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384, TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305, TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305_SHA256.Insecure values: TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA256, TLS_ECDHE_ECDSA_WITH_RC4_128_SHA, TLS_ECDHE_RSA_WITH_3DES_EDE_CBC_SHA, TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256, TLS_ECDHE_RSA_WITH_RC4_128_SHA, TLS_RSA_WITH_3DES_EDE_CBC_SHA, TLS_RSA_WITH_AES_128_CBC_SHA, TLS_RSA_WITH_AES_128_CBC_SHA256, TLS_RSA_WITH_AES_128_GCM_SHA256, TLS_RSA_WITH_AES_256_CBC_SHA, TLS_RSA_WITH_AES_256_GCM_SHA384, TLS_RSA_WITH_RC4_128_SHA.

 | --tls-curve-preferences int32Slice     Default: []

 |  | Comma-separated list of numeric Go crypto/tls CurveID values, as the allowed key <example-value> mechanisms for the server. The supported values depend on the Go version used. See https://pkg.go.dev/crypto/tls#CurveID for values supported for each Go version. The order of the list is ignored, and key <example-value> mechanisms are chosen by Go from this list using an internal preference order. If omitted, the default Go curves will be used.

 | --tls-min-version string

 |  | Minimum TLS version supported. Possible values: VersionTLS10, VersionTLS11, VersionTLS12, VersionTLS13

 | --tls-private-key-file string

 |  | File containing the default x509 private key <example-value> --tls-cert-file.

 | --tls-sni-cert-key <example-value>

 |  | A pair of x509 certificate and private key file paths, optionally suffixed with a list of domain patterns which are fully qualified domain names, possibly with prefixed wildcard segments. The domain patterns also allow IP addresses, but IPs should only be used if the apiserver has visibility to the IP address requested by a client. If no domain patterns are provided, the names of the certificate are extracted. Non-wildcard matches trump over wildcard matches, explicit domain patterns trump over extracted names. For multiple key/certificate pairs, use the --tls-sni-cert-key <example-value> times. Examples: "example.crt,example.key" or "foo.crt,foo.key:*.foo.com,foo.com".

 | --token-auth-file string

 |  | If set, the file that will be used to secure the secure port of the API server via token authentication.

 | --tracing-config-file string

 |  | File with apiserver tracing configuration.

 | -v, --v int

 |  | number for the log level verbosity

 | --version version[=true]

 |  | --version, --version=raw prints version information and quits; --version=vX.Y.Z... sets the reported version

 | --vmodule pattern=N,...

 |  | comma-separated list of pattern=N settings for file-filtered logging (only works for text log format)

 | --watch-cache     Default: true

 |  | Enable watch caching in the apiserver

 | --watch-cache-sizes strings

 |  | Watch cache size settings for some resources (pods, nodes, etc.), comma separated. The individual setting format: resource[.group]#size, where resource is lowercase plural (no version), group is omitted for resources of apiVersion v1 (the legacy core API) and included for others, and size is a number. This option is only meaningful for resources built into the apiserver, not ones defined by CRDs or aggregated from external servers, and is only consulted if the watch-cache is enabled. The only meaningful size setting to supply here is zero, which means to disable watch caching for the associated resource; all non-zero values are equivalent and mean to not disable watch caching for that resource
