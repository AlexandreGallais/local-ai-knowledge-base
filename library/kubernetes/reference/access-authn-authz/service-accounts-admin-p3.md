---
title: "Managing Service Accounts (part 3 of 3)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/access-authn-authz/service-accounts-admin.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Managing Service Accounts (part 3 of 3)

## External ServiceAccount token signing and key management

**Feature state:**

The kube-apiserver can be configured to use external signer for token signing and token verifying key management.
This feature enables kubernetes distributions to integrate with key management solutions of their choice
(for example, HSMs, cloud KMSes) for service account credential signing and verification.
To configure kube-apiserver to use external-jwt-signer set the `--service-account-signing-endpoint` flag
to the location of a Unix domain socket (UDS) on a filesystem, or be prefixed with an @ symbol and name
a UDS in the abstract socket namespace. At the configured UDS shall be an RPC server which implements
an `ExternalJWTSigner` gRPC service.

The external-jwt-signer must be healthy and be ready to serve supported service account keys for the kube-apiserver to start.

**Note:**
The kube-apiserver flags `--service-account-key-file` and `--service-account-signing-key-file` will continue
to be used for reading from files unless `--service-account-signing-endpoint` is set; they are mutually
exclusive ways of supporting JWT signing and authentication.

An external signer provides a `v1.ExternalJWTSigner` gRPC service that implements 3 methods:

### Metadata

Metadata is meant to be called once by `kube-apiserver` on startup.
This enables the external signer to share metadata with kube-apiserver, like the max token lifetime that signer supports.

```proto
rpc Metadata(MetadataRequest) returns (MetadataResponse) {}

message MetadataRequest {}

message MetadataResponse {
  // used by kube-apiserver for defaulting/validation of JWT lifetime while accounting for configuration flag values:
  // 1. `--service-account-max-token-expiration`
  // 2. `--service-account-extend-token-expiration`
  //
  // * If `--service-account-max-token-expiration` is greater than `max_token_expiration_seconds`, kube-apiserver treats that as misconfiguration and exits.
  // * If `--service-account-max-token-expiration` is not explicitly set, kube-apiserver defaults to `max_token_expiration_seconds`.
  // * If `--service-account-extend-token-expiration` is true, the extended expiration is `min(1 year, max_token_expiration_seconds)`.
  //
  // `max_token_expiration_seconds` must be at least 600s.
  int64 max_token_expiration_seconds = 1;
}
```

### FetchKeys

FetchKeys returns the set of public keys that are trusted to sign
Kubernetes service account tokens. Kube-apiserver will call this RPC:
* Every time it tries to validate a JWT from the service account issuer with an unknown key ID, and
* Periodically, so it can serve reasonably-up-to-date keys from the OIDC JWKs endpoint.

```proto
rpc FetchKeys(FetchKeysRequest) returns (FetchKeysResponse) {}

message FetchKeysRequest {}

message FetchKeysResponse {
  repeated Key keys = 1;

  // The timestamp when this data was pulled from the authoritative source of
  // truth for verification keys.
  // kube-apiserver can export this from metrics, to enable end-to-end SLOs.
  google.protobuf.Timestamp data_timestamp = 2;

  // refresh interval for verification keys to pick changes if any.
  // any value <= 0 is considered a misconfiguration.
  int64 refresh_hint_seconds = 3;
}

message Key {
  // A unique identifier for this key.
  // Length must be <=1024.
  string key_id = 1;

  // The public key, PKIX-serialized.
  // must be a public key supported by kube-apiserver (currently RSA 256 or ECDSA 256/384/521)
  bytes key = 2;

  // Set only for keys that are not used to sign bound tokens.
  // eg: supported keys for legacy tokens.
  // If set, key is used for verification but excluded from OIDC discovery docs.
  // if set, external signer should not use this key to sign a JWT.
  bool exclude_from_oidc_discovery = 3;
}
```

### Sign

Sign takes a serialized JWT payload, and returns the serialized header and
signature.  `kube-apiserver` then assembles the JWT from the header, payload,
and signature.

```proto
rpc Sign(SignJWTRequest) returns (SignJWTResponse) {}

message SignJWTRequest {
  // URL-safe base64 wrapped payload to be signed.
  // Exactly as it appears in the second segment of the JWT
  string claims = 1;
}

message SignJWTResponse {
  // header must contain only alg, kid, typ claims.
  // typ must be “JWT”.
  // kid must be non-empty, <=1024 characters, and its corresponding public key should not be excluded from OIDC discovery.
  // alg must be one of the algorithms supported by kube-apiserver (currently RS256, ES256, ES384, ES512).
  // header cannot have any additional data that kube-apiserver does not recognize.
  // Already wrapped in URL-safe base64, exactly as it appears in the first segment of the JWT.
  string header = 1;

  // The signature for the JWT.
  // Already wrapped in URL-safe base64, exactly as it appears in the final segment of the JWT.
  string signature = 2;
}
```

## Clean up

If you created a namespace `examplens` to experiment with, you can remove it:

```shell
kubectl delete namespace examplens
```

## What's next

- Read more details about projected volumes.
