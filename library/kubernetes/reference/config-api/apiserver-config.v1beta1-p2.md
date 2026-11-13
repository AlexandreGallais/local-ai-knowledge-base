---
title: "kube-apiserver Configuration (v1beta1) (part 2 of 2)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/config-api/apiserver-config.v1beta1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# kube-apiserver Configuration (v1beta1) (part 2 of 2)

## `Issuer`     {#apiserver-k8s-io-v1beta1-Issuer}

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

## `JWTAuthenticator`     {#apiserver-k8s-io-v1beta1-JWTAuthenticator}

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
   claimValidationRules are rules that are applied to validate token claims to authenticate users.

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

## `PrefixedClaimOrExpression`     {#apiserver-k8s-io-v1beta1-PrefixedClaimOrExpression}

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
CEL expressions have access to the contents of the token claims, organized into CEL variable:

'claims' is a map of claim names to claim values.
For example, a variable named 'sub' can be accessed as 'claims.sub'.
Nested claims can be accessed using dot notation, e.g. 'claims.foo.bar'.

Documentation on CEL: https://kubernetes.io/docs/reference/using-api/cel/
Mutually exclusive with claim and prefix.

## `ProtocolType`     {#apiserver-k8s-io-v1beta1-ProtocolType}

(Alias of `string`)

**Appears in:**

- Connection

ProtocolType is a set of valid values for Connection.ProtocolType

## `TCPTransport`     {#apiserver-k8s-io-v1beta1-TCPTransport}

**Appears in:**

- Transport

TCPTransport provides the information to connect to konnectivity server via TCP

 | Field | Description

 | `url` [Required]
`string`

 |
   URL is the location of the konnectivity server to connect to.
As an example it might be "https://127.0.0.1:8131"

 | `tlsConfig`
`TLSConfig`

 |
   TLSConfig is the config needed to use TLS when connecting to konnectivity server

## `TLSConfig`     {#apiserver-k8s-io-v1beta1-TLSConfig}

**Appears in:**

- TCPTransport

TLSConfig provides the authentication information to connect to konnectivity server
Only used with TCPTransport

 | Field | Description

 | `caBundle`
`string`

 |
   caBundle is the file location of the CA to be used to determine trust with the konnectivity server.
Must be absent/empty if TCPTransport.URL is prefixed with http://
If absent while TCPTransport.URL is prefixed with https://, default to system trust roots.

 | `clientKey`
`string`

 |
   clientKey is the file location of the client key to be used in mtls handshakes with the konnectivity server.
Must be absent/empty if TCPTransport.URL is prefixed with http://
Must be configured if TCPTransport.URL is prefixed with https://

 | `clientCert`
`string`

 |
   clientCert is the file location of the client certificate to be used in mtls handshakes with the konnectivity server.
Must be absent/empty if TCPTransport.URL is prefixed with http://
Must be configured if TCPTransport.URL is prefixed with https://

 | `tlsServerName`
`string`

 |
   tlsServerName is used to check server certificate. If tlsServerName is empty, the hostname used to contact the server is used.

## `Transport`     {#apiserver-k8s-io-v1beta1-Transport}

**Appears in:**

- Connection

Transport defines the transport configurations we use to dial to the konnectivity server

 | Field | Description

 | `tcp`
`TCPTransport`

 |
   TCP is the TCP configuration for communicating with the konnectivity server via TCP
ProxyProtocol of GRPC is not supported with TCP transport at the moment
Requires at least one of TCP or UDS to be set

 | `uds`
`UDSTransport`

 |
   UDS is the UDS configuration for communicating with the konnectivity server via UDS
Requires at least one of TCP or UDS to be set

## `UDSTransport`     {#apiserver-k8s-io-v1beta1-UDSTransport}

**Appears in:**

- Transport

UDSTransport provides the information to connect to konnectivity server via UDS

 | Field | Description

 | `udsName` [Required]
`string`

 |
   UDSName is the name of the unix domain socket to connect to konnectivity server
This does not use a unix:// prefix. (Eg: /etc/srv/kubernetes/konnectivity-server/konnectivity-server.socket)

## `UserValidationRule`     {#apiserver-k8s-io-v1beta1-UserValidationRule}

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

## `WebhookConfiguration`     {#apiserver-k8s-io-v1beta1-WebhookConfiguration}

**Appears in:**

- AuthorizerConfiguration

 | Field | Description

 | `authorizedTTL` [Required]
`meta/v1.Duration`

 |
   The duration to cache 'authorized' responses from the webhook
authorizer.
Same as setting `--authorization-webhook-cache-authorized-ttl` flag
Default: 5m0s

 | `cacheAuthorizedRequests`
`bool`

 |
   CacheAuthorizedRequests specifies whether authorized requests should be cached.
If set to true, the TTL for cached decisions can be configured via the
AuthorizedTTL field.
Default: true

 | `unauthorizedTTL` [Required]
`meta/v1.Duration`

 |
   The duration to cache 'unauthorized' responses from the webhook
authorizer.
Same as setting `--authorization-webhook-cache-unauthorized-ttl` flag
Default: 30s

 | `cacheUnauthorizedRequests`
`bool`

 |
   CacheUnauthorizedRequests specifies whether unauthorized requests should be cached.
If set to true, the TTL for cached decisions can be configured via the
UnauthorizedTTL field.
Default: true

 | `timeout` [Required]
`meta/v1.Duration`

 |
   Timeout for the webhook request
Maximum allowed value is 30s.
Required, no default value.

 | `subjectAccessReviewVersion` [Required]
`string`

 |
   The API version of the authorization.k8s.io SubjectAccessReview to
send to and expect from the webhook.
Same as setting `--authorization-webhook-version` flag
Valid values: v1beta1, v1
Required, no default value

 | `matchConditionSubjectAccessReviewVersion` [Required]
`string`

 |
   MatchConditionSubjectAccessReviewVersion specifies the SubjectAccessReview
version the CEL expressions are evaluated against
Valid values: v1
Required, no default value

 | `failurePolicy` [Required]
`string`

 |
   Controls the authorization decision when a webhook request fails to
complete or returns a malformed response or errors evaluating
matchConditions.
Valid values:

NoOpinion: continue to subsequent authorizers to see if one of
them allows the request
Deny: reject the request without consulting subsequent authorizers
Required, with no default.

 | `connectionInfo` [Required]
`WebhookConnectionInfo`

 |
   ConnectionInfo defines how we talk to the webhook

 | `matchConditions` [Required]
`[]WebhookMatchCondition`

 |
   matchConditions is a list of conditions that must be met for a request to be sent to this
webhook. An empty list of matchConditions matches all requests.
There are a maximum of 64 match conditions allowed.
The exact matching logic is (in order):

If at least one matchCondition evaluates to FALSE, then the webhook is skipped.
If ALL matchConditions evaluate to TRUE, then the webhook is called.
If at least one matchCondition evaluates to an error (but none are FALSE):

If failurePolicy=Deny, then the webhook rejects the request
If failurePolicy=NoOpinion, then the error is ignored and the webhook is skipped

## `WebhookConnectionInfo`     {#apiserver-k8s-io-v1beta1-WebhookConnectionInfo}

**Appears in:**

- WebhookConfiguration

 | Field | Description

 | `type` [Required]
`string`

 |
   Controls how the webhook should communicate with the server.
Valid values:

KubeConfigFile: use the file specified in kubeConfigFile to locate the
server.
InClusterConfig: use the in-cluster configuration to call the
SubjectAccessReview API hosted by kube-apiserver. This mode is not
allowed for kube-apiserver.

 | `kubeConfigFile` [Required]
`string`

 |
   Path to KubeConfigFile for connection info
Required, if connectionInfo.Type is KubeConfig

## `WebhookMatchCondition`     {#apiserver-k8s-io-v1beta1-WebhookMatchCondition}

**Appears in:**

- WebhookConfiguration

 | Field | Description

 | `expression` [Required]
`string`

 |
   expression represents the expression which will be evaluated by CEL. Must evaluate to bool.
CEL expressions have access to the contents of the SubjectAccessReview in v1 version.
If version specified by subjectAccessReviewVersion in the request variable is v1beta1,
the contents would be converted to the v1 version before evaluating the CEL expression.

'resourceAttributes' describes information for a resource access request and is unset for non-resource requests. e.g. has(request.resourceAttributes) && request.resourceAttributes.namespace == 'default'
'nonResourceAttributes' describes information for a non-resource access request and is unset for resource requests. e.g. has(request.nonResourceAttributes) && request.nonResourceAttributes.path == '/healthz'.
'user' is the user to test for. e.g. request.user == 'alice'
'groups' is the groups to test for. e.g. ('group1' in request.groups)
'extra' corresponds to the user.Info.GetExtra() method from the authenticator.
'uid' is the information about the requesting user. e.g. request.uid == '1'

Documentation on CEL: https://kubernetes.io/docs/reference/using-api/cel/
