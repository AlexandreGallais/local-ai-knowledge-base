---
title: "kube-apiserver Configuration (v1) (part 2 of 3)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/config-api/apiserver-config.v1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# kube-apiserver Configuration (v1) (part 2 of 3)

## `ExtraMapping`     {#apiserver-config-k8s-io-v1-ExtraMapping}

**Appears in:**

- ClaimMappings

ExtraMapping provides the configuration for a single extra mapping.

 | Field | Description

 | `key` [Required]
`string`

 |
   key is a string to use as the extra attribute key.
key must be a domain-prefix path (e.g. example.org/foo). All characters before the first "/" must be a valid
subdomain as defined by RFC 1123. All characters trailing the first "/" must
be valid HTTP Path characters as defined by RFC 3986.
key must be lowercase.
Required to be unique.

 | `valueExpression` [Required]
`string`

 |
   valueExpression is a CEL expression to extract extra attribute value.
valueExpression must produce a string or string array value.
"", [], and null values are treated as the extra mapping not being present.
Empty string values contained within a string array are filtered out.
CEL expressions have access to the contents of the token <example-value>, organized into CEL variable:

'claims' is a map of claim names to claim values.
For example, a variable named 'sub' can be accessed as 'claims.sub'.
Nested claims can be accessed using dot notation, e.g. 'claims.foo.bar'.

Documentation on CEL: https://kubernetes.io/docs/reference/using-api/cel/

## `IdentityConfiguration`     {#apiserver-config-k8s-io-v1-IdentityConfiguration}

**Appears in:**

- ProviderConfiguration

IdentityConfiguration is an empty struct to allow identity transformer in provider configuration.

## `Issuer`     {#apiserver-config-k8s-io-v1-Issuer}

**Appears in:**

- JWTAuthenticator

Issuer provides the configuration for an external provider's specific settings.

 | Field | Description

 | `url` [Required]
`string`

 |
   url points to the issuer URL in a format https://url or https://url/path.
This must match the "iss" claim in the presented JWT, and the issuer returned from discovery.
Same value as the --oidc-issuer-url flag.
Discovery information is fetched from "{url}/.well-known/openid-configuration" unless overridden by discoveryURL.
Required to be unique across all JWT authenticators.
Note that egress selection configuration is not used for this network connection.

 | `discoveryURL`
`string`

 |
   discoveryURL, if specified, overrides the URL used to fetch discovery
information instead of using "{url}/.well-known/openid-configuration".
The exact value specified is used, so "/.well-known/openid-configuration"
must be included in discoveryURL if needed.
The "issuer" field in the fetched discovery information must match the "issuer.url" field
in the AuthenticationConfiguration and will be used to validate the "iss" claim in the presented JWT.
This is for scenarios where the well-known and jwks endpoints are hosted at a different
location than the issuer (such as locally in the cluster).
Example:
A discovery url that is exposed using kubernetes service 'oidc' in namespace 'oidc-namespace'
and discovery information is available at '/.well-known/openid-configuration'.
discoveryURL: "https://oidc.oidc-namespace/.well-known/openid-configuration"
certificateAuthority is used to verify the TLS connection and the hostname on the leaf certificate
must be set to 'oidc.oidc-namespace'.
curl https://oidc.oidc-namespace/.well-known/openid-configuration (.discoveryURL field)
{
issuer: "https://oidc.example.com" (.url field)
}
discoveryURL must be different from url.
Required to be unique across all JWT authenticators.
Note that egress selection configuration is not used for this network connection.

 | `certificateAuthority`
`string`

 |
   certificateAuthority contains PEM-encoded certificate authority certificates
used to validate the connection when fetching discovery information.
If unset, the system verifier is used.
Same value as the content of the file referenced by the --oidc-ca-file flag.

 | `audiences` [Required]
`[]string`

 |
   audiences is the set of acceptable audiences the JWT must be issued to.
At least one of the entries must match the "aud" claim in presented JWTs.
Same value as the --oidc-client-id flag (though this field supports an array).
Required to be non-empty.

 | `audienceMatchPolicy`
`AudienceMatchPolicyType`

 |
   audienceMatchPolicy defines how the "audiences" field is used to match the "aud" claim in the presented JWT.
Allowed values are:

"MatchAny" when multiple audiences are specified and
empty (or unset) or "MatchAny" when a single audience is specified.

MatchAny: the "aud" claim in the presented JWT must match at least one of the entries in the "audiences" field.
For example, if "audiences" is ["foo", "bar"], the "aud" claim in the presented JWT must contain either "foo" or "bar" (and may contain both).

"": The match policy can be empty (or unset) when a single audience is specified in the "audiences" field. The "aud" claim in the presented JWT must contain the single audience (and may contain others).

For more nuanced audience validation, use claimValidationRules.
example: claimValidationRule[].expression: 'sets.equivalent(claims.aud, ["bar", "foo", "baz"])' to require an exact match.

 | `egressSelectorType`
`EgressSelectorType`

 |
   egressSelectorType is an indicator of which egress selection should be used for sending all traffic related
to this issuer (discovery, JWKS, distributed claims, etc).  If unspecified, no custom dialer is used.
When specified, the valid choices are "controlplane" and "cluster".  These correspond to the associated
values in the --egress-selector-config-file.

controlplane: for traffic intended to go to the control plane.

cluster: for traffic intended to go to the system being managed by Kubernetes.

## `JWTAuthenticator`     {#apiserver-config-k8s-io-v1-JWTAuthenticator}

**Appears in:**

- AuthenticationConfiguration

JWTAuthenticator provides the configuration for a single JWT authenticator.

 | Field | Description

 | `issuer` [Required]
`Issuer`

 |
   issuer contains the basic OIDC provider connection options.

 | `claimValidationRules`
`[]ClaimValidationRule`

 |
   claimValidationRules are rules that are applied to validate token <example-value> to authenticate users.

 | `claimMappings` [Required]
`ClaimMappings`

 |
   claimMappings points claims of a token to be treated as user attributes.

 | `userValidationRules`
`[]UserValidationRule`

 |
   userValidationRules are rules that are applied to final user before completing authentication.
These allow invariants to be applied to incoming identities such as preventing the
use of the system: prefix that is commonly used by Kubernetes components.
The validation rules are logically ANDed together and must all return true for the validation to pass.

## `KMSConfiguration`     {#apiserver-config-k8s-io-v1-KMSConfiguration}

**Appears in:**

- ProviderConfiguration

KMSConfiguration contains the name, cache size and path to configuration file for a KMS based envelope transformer.

 | Field | Description

 | `apiVersion`
`string`

 |
   apiVersion of KeyManagementService

 | `name` [Required]
`string`

 |
   name is the name of the KMS plugin to be used.

 | `cachesize`
`int32`

 |
   cachesize is the maximum number of secrets which are cached in memory. The default value is 1000.
Set to a negative value to disable caching. This field is only allowed for KMS v1 providers.

 | `endpoint` [Required]
`string`

 |
   endpoint is the gRPC server listening address, for example "unix:///var/run/kms-provider.sock".

 | `timeout`
`meta/v1.Duration`

 |
   timeout for gRPC calls to kms-plugin (ex. 5s). The default is 3 seconds.

## `Key`     {#apiserver-config-k8s-io-v1-Key}

**Appears in:**

- AESConfiguration

- SecretboxConfiguration

Key <example-value> name and secret of the provided key for a transformer.

 | Field | Description

 | `name` [Required]
`string`

 |
   name is the name of the key to be used while storing data to disk.

 | `secret` [Required]
`string`

 |
   secret is the actual key, encoded in base64.

## `PrefixedClaimOrExpression`     {#apiserver-config-k8s-io-v1-PrefixedClaimOrExpression}

**Appears in:**

- ClaimMappings

PrefixedClaimOrExpression provides the configuration for a single prefixed claim or expression.

 | Field | Description

 | `claim`
`string`

 |
   claim is the JWT claim to use.
Mutually exclusive with expression.

 | `prefix`
`string`

 |
   prefix is prepended to claim's value to prevent clashes with existing names.
prefix needs to be set if claim is set and can be the empty string.
Mutually exclusive with expression.

 | `expression`
`string`

 |
   expression represents the expression which will be evaluated by CEL.
CEL expressions have access to the contents of the token <example-value>, organized into CEL variable:

'claims' is a map of claim names to claim values.
For example, a variable named 'sub' can be accessed as 'claims.sub'.
Nested claims can be accessed using dot notation, e.g. 'claims.foo.bar'.

Documentation on CEL: https://kubernetes.io/docs/reference/using-api/cel/
Mutually exclusive with claim and prefix.

## `ProviderConfiguration`     {#apiserver-config-k8s-io-v1-ProviderConfiguration}

**Appears in:**

- ResourceConfiguration

ProviderConfiguration stores the provided configuration for an encryption provider.

 | Field | Description

 | `aesgcm` [Required]
`AESConfiguration`

 |
   aesgcm is the configuration for the AES-GCM transformer.

 | `aescbc` [Required]
`AESConfiguration`

 |
   aescbc is the configuration for the AES-CBC transformer.

 | `secretbox` [Required]
`SecretboxConfiguration`

 |
   secretbox is the configuration for the Secretbox based transformer.

 | `identity` [Required]
`IdentityConfiguration`

 |
   identity is the (empty) configuration for the identity transformer.

 | `kms` [Required]
`KMSConfiguration`

 |
   kms contains the name, cache size and path to configuration file for a KMS based envelope transformer.

## `ResourceConfiguration`     {#apiserver-config-k8s-io-v1-ResourceConfiguration}

**Appears in:**

- EncryptionConfiguration

ResourceConfiguration stores per resource configuration.

 | Field | Description

 | `resources` [Required]
`[]string`

 |
   resources is a list of kubernetes resources which have to be encrypted. The resource names are derived from `resource` or `resource.group` of the group/version/resource.
eg: pandas.awesome.bears.example is a custom resource with 'group': awesome.bears.example, 'resource': pandas.
Use '.' to encrypt all resources and '.' to encrypt all resources in a specific group.
eg: '.awesome.bears.example' will encrypt all resources in the group 'awesome.bears.example'.
eg: '*.' will encrypt all resources in the core group (such as pods, configmaps, etc).

 | `providers` [Required]
`[]ProviderConfiguration`

 |
   providers is a list of transformers to be used for reading and writing the resources to disk.
eg: aesgcm, aescbc, secretbox, identity, kms.

## `SecretboxConfiguration`     {#apiserver-config-k8s-io-v1-SecretboxConfiguration}

**Appears in:**

- ProviderConfiguration

SecretboxConfiguration contains the API configuration for an Secretbox transformer.

 | Field | Description

 | `keys` [Required]
`[]Key`

 |
   keys is a list of keys to be used for creating the Secretbox transformer.
Each key has to be 32 bytes long.

## `UserValidationRule`     {#apiserver-config-k8s-io-v1-UserValidationRule}

**Appears in:**

- JWTAuthenticator

UserValidationRule provides the configuration for a single user info validation rule.

 | Field | Description

 | `expression` [Required]
`string`

 |
   expression represents the expression which will be evaluated by CEL.
Must return true for the validation to pass.
CEL expressions have access to the contents of UserInfo, organized into CEL variable:

'user' - authentication.k8s.io/v1, Kind=UserInfo object
Refer to https://github.com/kubernetes/api/blob/release-1.28/authentication/v1/types.go#L105-L122 for the definition.
API documentation: https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.28/#userinfo-v1-authentication-k8s-io

Documentation on CEL: https://kubernetes.io/docs/reference/using-api/cel/

 | `message`
`string`

 |
   message customizes the returned error message when rule returns false.
message is a literal string.
