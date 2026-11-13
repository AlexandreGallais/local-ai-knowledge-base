---
title: "kube-apiserver Configuration (v1) (part 3 of 3)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/config-api/apiserver-config.v1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# kube-apiserver Configuration (v1) (part 3 of 3)

## `WebhookConfiguration`     {#apiserver-config-k8s-io-v1-WebhookConfiguration}

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

## `WebhookConnectionInfo`     {#apiserver-config-k8s-io-v1-WebhookConnectionInfo}

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

## `WebhookMatchCondition`     {#apiserver-config-k8s-io-v1-WebhookMatchCondition}

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
