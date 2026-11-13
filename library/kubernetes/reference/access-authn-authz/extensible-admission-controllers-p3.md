---
title: "Dynamic Admission Control (part 3 of 5)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/access-authn-authz/extensible-admission-controllers.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Dynamic Admission Control (part 3 of 5)

## Webhook configuration

To register admission webhooks, create `MutatingWebhookConfiguration` or `ValidatingWebhookConfiguration` API objects.
The name of a `MutatingWebhookConfiguration` or a `ValidatingWebhookConfiguration` object must be a valid
DNS subdomain name.

**Note:**
Names ending in `.static.k8s.io` are reserved for
manifest-based admission control
and cannot be used for API-based webhook configurations. This reservation is
enforced when the `ManifestBasedAdmissionControlConfig`
feature gate is enabled.

Each configuration can contain one or more webhooks.
If multiple webhooks are specified in a single configuration, each must be given a unique name.
This is required in order to make resulting audit logs and metrics easier to match up to active
configurations.

Each webhook defines the following things.

### Matching requests: rules

Each webhook must specify a list of rules used to determine if a request to the API server should be sent to the webhook.
Each rule specifies one or more operations, apiGroups, apiVersions, and resources, and a resource scope:

* `operations` lists one or more operations to match. Can be `"CREATE"`, `"UPDATE"`, `"DELETE"`, `"CONNECT"`,
  or `"*"` to match all.
* `apiGroups` lists one or more API groups to match. `""` is the core API group. `"*"` matches all API groups.
* `apiVersions` lists one or more API versions to match. `"*"` matches all API versions.
* `resources` lists one or more resources to match.

  * `"*"` matches all resources, but not subresources.
  * `"*/*"` matches all resources and subresources.
  * `"pods/*"` matches all subresources of pods.
  * `"*/status"` matches all status subresources.

* `scope` specifies a scope to match. Valid values are `"Cluster"`, `"Namespaced"`, and `"*"`.
  Subresources match the scope of their parent resource. Default is `"*"`.

  * `"Cluster"` means that only cluster-scoped resources will match this rule (Namespace API objects are cluster-scoped).
  * `"Namespaced"` means that only namespaced resources will match this rule.
  * `"*"` means that there are no scope restrictions.

If an incoming request matches one of the specified `operations`, `groups`, `versions`,
`resources`, and `scope` for any of a webhook's `rules`, the request is sent to the webhook.

Here are other examples of rules that could be used to specify which resources should be intercepted.

Match `CREATE` or `UPDATE` requests to `apps/v1` and `apps/v1beta1` `deployments` and `replicasets`:

```yaml
apiVersion: admissionregistration.k8s.io/v1
kind: ValidatingWebhookConfiguration
...
webhooks:
- name: my-webhook.example.com
  rules:
  - operations: ["CREATE", "UPDATE"]
    apiGroups: ["apps"]
    apiVersions: ["v1", "v1beta1"]
    resources: ["deployments", "replicasets"]
    scope: "Namespaced"
  ...
```

Match create requests for all resources (but not subresources) in all API groups and versions:

```yaml
apiVersion: admissionregistration.k8s.io/v1
kind: ValidatingWebhookConfiguration
webhooks:
  - name: my-webhook.example.com
    rules:
      - operations: ["CREATE"]
        apiGroups: ["*"]
        apiVersions: ["*"]
        resources: ["*"]
        scope: "*"
```

Match update requests for all `status` subresources in all API groups and versions:

```yaml
apiVersion: admissionregistration.k8s.io/v1
kind: ValidatingWebhookConfiguration
webhooks:
  - name: my-webhook.example.com
    rules:
      - operations: ["UPDATE"]
        apiGroups: ["*"]
        apiVersions: ["*"]
        resources: ["*/status"]
        scope: "*"
```

### Excluded virtual resources {#excluded-virtual-resources}

**Feature state:**

Admission webhooks are not called for the following non-persisted (virtual)
authentication and authorization resources, even if a webhook's `rules` match
them:

* TokenReviews
* SelfSubjectReviews
* LocalSubjectAccessReviews
* SelfSubjectAccessReviews
* SelfSubjectRulesReviews
* SubjectAccessReviews

A webhook intercepting these resources can lock a cluster out of its own
authentication and authorization path: for example, a failing webhook that
matches `subjectaccessreviews` can block the authorization checks that the
cluster itself depends on. Excluding them brings admission webhooks into line
with ValidatingAdmissionPolicy
and MutatingAdmissionPolicy,
which have always excluded these resources.

If you create or update a webhook configuration with a rule that explicitly
names one of these resources, the API server returns a warning telling you that
the rule has no effect. The API server also logs the name of any existing
webhook configuration with such a rule when it loads that configuration, so
you can audit your cluster before upgrading. Rules that match these resources
only through a wildcard (`"*"`) in `apiGroups` or `resources` are not flagged,
because their intent is ambiguous.

Webhook interception of these virtual resources is deprecated as of Kubernetes
v1.37. As a temporary measure, you can set the
`ExcludeAdmissionWebhookVirtualResources`
feature gate
to `false` to restore the previous behavior. The feature gate is planned to be
locked to enabled when this feature graduates to stable, after which admission
webhooks can no longer intercept these resources.

### Matching requests: objectSelector

Webhooks may optionally limit which requests are intercepted based on the labels of the
objects they would be sent, by specifying an `objectSelector`. If specified, the objectSelector
is evaluated against both the object and oldObject that would be sent to the webhook,
and is considered to match if either object matches the selector.

A null object (`oldObject` in the case of create, or `newObject` in the case of delete),
or an object that cannot have labels (like a `DeploymentRollback` or a `PodProxyOptions` object)
is not considered to match.

Use the object selector only if the webhook is opt-in, because end users may skip
the admission webhook by setting the labels.

This example shows a mutating webhook that would match a `CREATE` of any resource (but not subresources) with the label `foo: bar`:

```yaml
apiVersion: admissionregistration.k8s.io/v1
kind: MutatingWebhookConfiguration
webhooks:
- name: my-webhook.example.com
  objectSelector:
    matchLabels:
      foo: bar
  rules:
  - operations: ["CREATE"]
    apiGroups: ["*"]
    apiVersions: ["*"]
    resources: ["*"]
    scope: "*"
```

See labels concept
for more examples of label selectors.

### Matching requests: namespaceSelector

Webhooks may optionally limit which requests for namespaced resources are intercepted,
based on the labels of the containing namespace, by specifying a `namespaceSelector`.

The `namespaceSelector` decides whether to run the webhook on a request for a namespaced resource
(or a Namespace object), based on whether the namespace's labels match the selector.
If the object itself is a namespace, the matching is performed on object.metadata.labels.
If the object is a cluster scoped resource other than a Namespace, `namespaceSelector` has no effect.

This example shows a mutating webhook that matches a `CREATE` of any namespaced resource inside a namespace
that does not have a "runlevel" label of "0" or "1":

```yaml
apiVersion: admissionregistration.k8s.io/v1
kind: MutatingWebhookConfiguration
webhooks:
  - name: my-webhook.example.com
    namespaceSelector:
      matchExpressions:
        - key: runlevel
          operator: NotIn
          values: ["0","1"]
    rules:
      - operations: ["CREATE"]
        apiGroups: ["*"]
        apiVersions: ["*"]
        resources: ["*"]
        scope: "Namespaced"
```

This example shows a validating webhook that matches a `CREATE` of any namespaced resource inside
a namespace that is associated with the "environment" of "prod" or "staging":

```yaml
apiVersion: admissionregistration.k8s.io/v1
kind: ValidatingWebhookConfiguration
webhooks:
  - name: my-webhook.example.com
    namespaceSelector:
      matchExpressions:
        - key: environment
          operator: In
          values: ["prod","staging"]
    rules:
      - operations: ["CREATE"]
        apiGroups: ["*"]
        apiVersions: ["*"]
        resources: ["*"]
        scope: "Namespaced"
```

See labels concept
for more examples of label selectors.

### Matching requests: matchPolicy

API servers can make objects available via multiple API groups or versions.

For example, if a webhook only specified a rule for some API groups/versions
(like `apiGroups:["apps"], apiVersions:["v1","v1beta1"]`),
and a request was made to modify the resource via another API group/version (like `extensions/v1beta1`),
the request would not be sent to the webhook.

The `matchPolicy` lets a webhook define how its `rules` are used to match incoming requests.
Allowed values are `Exact` or `Equivalent`.

* `Exact` means a request should be intercepted only if it exactly matches a specified rule.
* `Equivalent` means a request should be intercepted if it modifies a resource listed in `rules`,
  even via another API group or version.

In the example given above, the webhook that only registered for `apps/v1` could use `matchPolicy`:

* `matchPolicy: Exact` would mean the `extensions/v1beta1` request would not be sent to the webhook
* `matchPolicy: Equivalent` means the `extensions/v1beta1` request would be sent to the webhook
  (with the objects converted to a version the webhook had specified: `apps/v1`)

Specifying `Equivalent` is recommended, and ensures that webhooks continue to intercept the
resources they expect when upgrades enable new versions of the resource in the API server.

When a resource stops being served by the API server, it is no longer considered equivalent to
other versions of that resource that are still served.
For example, `extensions/v1beta1` deployments were first deprecated and then removed (in Kubernetes v1.16).

Since that removal, a webhook with a `apiGroups:["extensions"], apiVersions:["v1beta1"], resources:["deployments"]` rule
does not intercept deployments created via `apps/v1` APIs. For that reason, webhooks should prefer registering
for stable versions of resources.

This example shows a validating webhook that intercepts modifications to deployments (no matter the API group or version),
and is always sent an `apps/v1` `Deployment` object:

```yaml
apiVersion: admissionregistration.k8s.io/v1
kind: ValidatingWebhookConfiguration
webhooks:
- name: my-webhook.example.com
  matchPolicy: Equivalent
  rules:
  - operations: ["CREATE","UPDATE","DELETE"]
    apiGroups: ["apps"]
    apiVersions: ["v1"]
    resources: ["deployments"]
    scope: "Namespaced"
```

The `matchPolicy` for an admission webhooks defaults to `Equivalent`.

### Matching requests: `matchConditions`

**Feature state:**

You can define _match conditions_ for webhooks if you need fine-grained request filtering. These
conditions are useful if you find that match rules, `objectSelectors` and `namespaceSelectors` still
doesn't provide the filtering you want over when to call out over HTTP. Match conditions are
CEL expressions. All match conditions must evaluate to true for the
webhook to be called.

Here is an example illustrating a few different uses for match conditions:

```yaml
apiVersion: admissionregistration.k8s.io/v1
kind: ValidatingWebhookConfiguration
webhooks:
  - name: my-webhook.example.com
    matchPolicy: Equivalent
    rules:
      - operations: ['CREATE','UPDATE']
        apiGroups: ['*']
        apiVersions: ['*']
        resources: ['*']
    failurePolicy: 'Ignore' # Fail-open (optional)
    sideEffects: None
    clientConfig:
      service:
        namespace: my-namespace
        name: my-webhook
      caBundle: '<omitted>'
    # You can have up to 64 matchConditions per webhook
    matchConditions:
      - name: 'exclude-leases' # Each match condition must have a unique name
        expression: '!(request.resource.group == "coordination.k8s.io" && request.resource.resource == "leases")' # Match non-lease resources.
      - name: 'exclude-kubelet-requests'
        expression: '!("system:nodes" in request.userInfo.groups)' # Match requests made by non-node users.
      - name: 'rbac' # Skip RBAC requests, which are handled by the second webhook.
        expression: 'request.resource.group != "rbac.authorization.k8s.io"'

  # This example illustrates the use of the 'authorizer'. The authorization check is more expensive
  # than a simple expression, so in this example it is scoped to only RBAC requests by using a second
  # webhook. Both webhooks can be served by the same endpoint.
  - name: rbac.my-webhook.example.com
    matchPolicy: Equivalent
    rules:
      - operations: ['CREATE','UPDATE']
        apiGroups: ['rbac.authorization.k8s.io']
        apiVersions: ['*']
        resources: ['*']
    failurePolicy: 'Fail' # Fail-closed (the default)
    sideEffects: None
    clientConfig:
      service:
        namespace: my-namespace
        name: my-webhook
      caBundle: '<omitted>'
    # You can have up to 64 matchConditions per webhook
    matchConditions:
      - name: 'breakglass'
        # Skip requests made by users authorized to 'breakglass' on this webhook.
        # The 'breakglass' API verb does not need to exist outside this check.
        expression: '!authorizer.group("admissionregistration.k8s.io").resource("validatingwebhookconfigurations").name("my-webhook.example.com").check("breakglass").allowed()'
```

**Note:**
You can define up to 64 elements in the `matchConditions` field per webhook.

Match conditions have access to the following CEL variables:

- `object` - The object from the incoming request. The value is null for DELETE requests. The object
  version may be converted based on the matchPolicy.
- `oldObject` - The existing object. The value is null for CREATE requests.
- `request` - The request portion of the AdmissionReview, excluding `object` and `oldObject`.
- `authorizer` - A CEL Authorizer. May be used to perform authorization checks for the principal
  (authenticated user) of the request. See
  Authz in the Kubernetes CEL library
  documentation for more details.
- `authorizer.requestResource` - A shortcut for an authorization check configured with the request
  resource (group, resource, (subresource), namespace, name).

For more information on CEL expressions, refer to the
Common Expression Language in Kubernetes reference.

In the event of an error evaluating a match condition the webhook is never called. Whether to reject
the request is determined as follows:

1. If **any** match condition evaluated to `false` (regardless of other errors), the API server skips the webhook.
2. Otherwise:
    - for `failurePolicy: Fail`, reject the request (without calling the webhook).
    - for `failurePolicy: Ignore`, proceed with the request but skip the webhook.
