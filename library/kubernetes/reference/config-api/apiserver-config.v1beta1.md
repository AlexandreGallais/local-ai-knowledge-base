---
title: "kube-apiserver Configuration (v1beta1) (part 1 of 2)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/config-api/apiserver-config.v1beta1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# kube-apiserver Configuration (v1beta1)

Package v1beta1 is the v1beta1 version of the API.

## Resource Types

- AuthenticationConfiguration
- AuthorizationConfiguration
- EgressSelectorConfiguration
- TracingConfiguration

## `TracingConfiguration`     {#TracingConfiguration}

**Appears in:**

- KubeletConfiguration

- TracingConfiguration

- TracingConfiguration

TracingConfiguration provides versioned configuration for OpenTelemetry tracing clients.

 | Field | Description

 | `endpoint`
`string`

 |
   Endpoint of the collector this component will report traces to.
The connection is insecure, and does not currently support TLS.
Recommended is unset, and endpoint is the otlp grpc default, localhost:4317.

 | `samplingRatePerMillion`
`int32`

 |
   SamplingRatePerMillion is the number of samples to collect per million spans.
Recommended is unset. If unset, sampler respects its parent span's sampling
rate, but otherwise never samples.

## `AuthenticationConfiguration`     {#apiserver-k8s-io-v1beta1-AuthenticationConfiguration}

AuthenticationConfiguration provides versioned configuration for authentication.

 | Field | Description

 | `apiVersion`string | `apiserver.k8s.io/v1beta1`

 | `kind`string | `AuthenticationConfiguration`

 | `jwt` [Required]
`[]JWTAuthenticator`

 |
   jwt is a list of authenticator to authenticate Kubernetes users using
JWT compliant tokens. The authenticator will attempt to parse a raw ID token,
verify it's been signed by the configured issuer. The public key to verify the
signature is discovered from the issuer's public endpoint using OIDC discovery.
For an incoming token, each JWT authenticator will be attempted in
the order in which it is specified in this list.  Note however that
other authenticators may run before or after the JWT authenticators.
The specific position of JWT authenticators in relation to other
authenticators is neither defined nor stable across releases.  Since
each JWT authenticator must have a unique issuer URL, at most one
JWT authenticator will attempt to cryptographically validate the token.
The minimum valid JWT payload must contain the following claims:
{
"iss": "https://issuer.example.com",
"aud": ["audience"],
"exp": 1234567890,
"": "username"
}

 | `anonymous` [Required]
`AnonymousAuthConfig`

 |
   If present --anonymous-auth must not be set

## `AuthorizationConfiguration`     {#apiserver-k8s-io-v1beta1-AuthorizationConfiguration}

 | Field | Description

 | `apiVersion`string | `apiserver.k8s.io/v1beta1`

 | `kind`string | `AuthorizationConfiguration`

 | `authorizers` [Required]
`[]AuthorizerConfiguration`

 |
   Authorizers is an ordered list of authorizers to
authorize requests against.
This is similar to the --authorization-modes kube-apiserver flag
Must be at least one.

## `EgressSelectorConfiguration`     {#apiserver-k8s-io-v1beta1-EgressSelectorConfiguration}

EgressSelectorConfiguration provides versioned configuration for egress selector clients.

 | Field | Description

 | `apiVersion`string | `apiserver.k8s.io/v1beta1`

 | `kind`string | `EgressSelectorConfiguration`

 | `egressSelections` [Required]
`[]EgressSelection`

 |
   connectionServices contains a list of egress selection client configurations

## `TracingConfiguration`     {#apiserver-k8s-io-v1beta1-TracingConfiguration}

TracingConfiguration provides versioned configuration for tracing clients.

 | Field | Description

 | `apiVersion`string | `apiserver.k8s.io/v1beta1`

 | `kind`string | `TracingConfiguration`

 | `TracingConfiguration` [Required]
`TracingConfiguration`

 |
   Embed the component config tracing configuration struct

## `AnonymousAuthCondition`     {#apiserver-k8s-io-v1beta1-AnonymousAuthCondition}

**Appears in:**

- AnonymousAuthConfig

AnonymousAuthCondition describes the condition under which anonymous auth
should be enabled.

 | Field | Description

 | `path` [Required]
`string`

 |
   Path for which anonymous auth is enabled.

## `AnonymousAuthConfig`     {#apiserver-k8s-io-v1beta1-AnonymousAuthConfig}

**Appears in:**

- AuthenticationConfiguration

AnonymousAuthConfig provides the configuration for the anonymous authenticator.

 | Field | Description

 | `enabled` [Required]
`bool`

 |
   No description provided.

 | `conditions` [Required]
`[]AnonymousAuthCondition`

 |
   If set, anonymous auth is only allowed if the request meets one of the
conditions.

## `AudienceMatchPolicyType`     {#apiserver-k8s-io-v1beta1-AudienceMatchPolicyType}

(Alias of `string`)

**Appears in:**

- Issuer

AudienceMatchPolicyType is a set of valid values for issuer.audienceMatchPolicy

## `AuthorizerConfiguration`     {#apiserver-k8s-io-v1beta1-AuthorizerConfiguration}

**Appears in:**

- AuthorizationConfiguration

 | Field | Description

 | `type` [Required]
`string`

 |
   Type refers to the type of the authorizer
"Webhook" is supported in the generic API server
Other API servers may support additional authorizer
types like Node, RBAC, ABAC, etc.

 | `name` [Required]
`string`

 |
   Name used to describe the webhook
This is explicitly used in monitoring machinery for metrics
Note: Names must be DNS1123 labels like `myauthorizername` or
subdomains like `myauthorizer.example.domain`
Required, with no default

 | `webhook` [Required]
`WebhookConfiguration`

 |
   Webhook defines the configuration for a Webhook authorizer
Must be defined when Type=Webhook
Must not be defined when Type!=Webhook

## `ClaimMappings`     {#apiserver-k8s-io-v1beta1-ClaimMappings}

**Appears in:**

- JWTAuthenticator

ClaimMappings provides the configuration for claim mapping

 | Field | Description

 | `username` [Required]
`PrefixedClaimOrExpression`

 |
   username represents an option for the username attribute.
The claim's value must be a singular string.
Same as the --oidc-username-claim and --oidc-username-prefix flags.
If username.expression is set, the expression must produce a string value.
If username.expression uses 'claims.email', then 'claims.email_verified' must be used in
username.expression or extra[].valueExpression or claimValidationRules[].expression.
An example claim validation rule expression that matches the validation automatically
applied when username.claim is set to 'email' is 'claims.?email_verified.orValue(true) == true'. By explicitly comparing
the value to true, we let type-checking see the result will be a boolean, and to make sure a non-boolean email_verified
claim will be caught at runtime.
In the flag based approach, the --oidc-username-claim and --oidc-username-prefix are optional. If --oidc-username-claim is not set,
the default value is "sub". For the authentication config, there is no defaulting for claim or prefix. The claim and prefix must be set explicitly.
For claim, if --oidc-username-claim was not set with legacy flag approach, configure username.claim="sub" in the authentication config.
For prefix:
(1) --oidc-username-prefix="-", no prefix was added to the username. For the same behavior using authentication config,
set username.prefix=""
(2) --oidc-username-prefix="" and  --oidc-username-claim != "email", prefix was "<value of --oidc-issuer-url>#". For the same
behavior using authentication config, set username.prefix="#"
(3) --oidc-username-prefix="". For the same behavior using authentication config, set username.prefix=""

 | `groups`
`PrefixedClaimOrExpression`

 |
   groups represents an option for the groups attribute.
The claim's value must be a string or string array claim.
If groups.claim is set, the prefix must be specified (and can be the empty string).
If groups.expression is set, the expression must produce a string or string array value.
"", [], and null values are treated as the group mapping not being present.

 | `uid`
`ClaimOrExpression`

 |
   uid represents an option for the uid attribute.
Claim must be a singular string claim.
If uid.expression is set, the expression must produce a string value.

 | `extra`
`[]ExtraMapping`

 |
   extra represents an option for the extra attribute.
expression must produce a string or string array value.
If the value is empty, the extra mapping will not be present.
hard-coded extra key/value

key: "foo"
valueExpression: "'bar'"
This will result in an extra attribute - foo: ["bar"]

hard-coded key, value copying claim value

key: "foo"
valueExpression: "claims.some_claim"
This will result in an extra attribute - foo: [value of some_claim]

hard-coded key, value derived from claim value

key: "admin"
valueExpression: '(has(claims.is_admin) && claims.is_admin) ? "true":""'
This will result in:
if is_admin claim is present and true, extra attribute - admin: ["true"]
if is_admin claim is present and false or is_admin claim is not present, no extra attribute will be added

## `ClaimOrExpression`     {#apiserver-k8s-io-v1beta1-ClaimOrExpression}

**Appears in:**

- ClaimMappings

ClaimOrExpression provides the configuration for a single claim or expression.

 | Field | Description

 | `claim`
`string`

 |
   claim is the JWT claim to use.
Either claim or expression must be set.
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
Mutually exclusive with claim.

## `ClaimValidationRule`     {#apiserver-k8s-io-v1beta1-ClaimValidationRule}

**Appears in:**

- JWTAuthenticator

ClaimValidationRule provides the configuration for a single claim validation rule.

 | Field | Description

 | `claim`
`string`

 |
   claim is the name of a required claim.
Same as --oidc-required-claim flag.
Only string claim keys are supported.
Mutually exclusive with expression and message.

 | `requiredValue`
`string`

 |
   requiredValue is the value of a required claim.
Same as --oidc-required-claim flag.
Only string claim values are supported.
If claim is set and requiredValue is not set, the claim must be present with a value set to the empty string.
Mutually exclusive with expression and message.

 | `expression`
`string`

 |
   expression represents the expression which will be evaluated by CEL.
Must produce a boolean.
CEL expressions have access to the contents of the token claims, organized into CEL variable:

'claims' is a map of claim names to claim values.
For example, a variable named 'sub' can be accessed as 'claims.sub'.
Nested claims can be accessed using dot notation, e.g. 'claims.foo.bar'.
Must return true for the validation to pass.

Documentation on CEL: https://kubernetes.io/docs/reference/using-api/cel/
Mutually exclusive with claim and requiredValue.

 | `message`
`string`

 |
   message customizes the returned error message when expression returns false.
message is a literal string.
Mutually exclusive with claim and requiredValue.

## `Connection`     {#apiserver-k8s-io-v1beta1-Connection}

**Appears in:**

- EgressSelection

Connection provides the configuration for a single egress selection client.

 | Field | Description

 | `proxyProtocol` [Required]
`ProtocolType`

 |
   Protocol is the protocol used to connect from client to the konnectivity server.

 | `transport`
`Transport`

 |
   Transport defines the transport configurations we use to dial to the konnectivity server.
This is required if ProxyProtocol is HTTPConnect or GRPC.

## `EgressSelection`     {#apiserver-k8s-io-v1beta1-EgressSelection}

**Appears in:**

- EgressSelectorConfiguration

EgressSelection provides the configuration for a single egress selection client.

 | Field | Description

 | `name` [Required]
`string`

 |
   name is the name of the egress selection.
Currently supported values are "controlplane", "master", "etcd" and "cluster"
The "master" egress selector is deprecated in favor of "controlplane"

 | `connection` [Required]
`Connection`

 |
   connection is the exact information used to configure the egress selection

## `EgressSelectorType`     {#apiserver-k8s-io-v1beta1-EgressSelectorType}

(Alias of `string`)

**Appears in:**

- Issuer

EgressSelectorType is an indicator of which egress selection should be used for sending traffic.

## `ExtraMapping`     {#apiserver-k8s-io-v1beta1-ExtraMapping}

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
CEL expressions have access to the contents of the token claims, organized into CEL variable:

'claims' is a map of claim names to claim values.
For example, a variable named 'sub' can be accessed as 'claims.sub'.
Nested claims can be accessed using dot notation, e.g. 'claims.foo.bar'.

Documentation on CEL: https://kubernetes.io/docs/reference/using-api/cel/
