---
title: "Validating Admission Policy (part 3 of 4)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/access-authn-authz/validating-admission-policy.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Validating Admission Policy (part 3 of 4)

### Validation Expression

`spec.validations[i].expression` represents the expression which will be evaluated by CEL.
To learn more, see the CEL language specification
CEL expressions have access to the contents of the Admission request/response, organized into CEL
variables as well as some other useful variables:

- 'object' - The object from the incoming request. The value is null for DELETE requests.
- 'oldObject' - The existing object. The value is null for CREATE requests.
- 'request' - Attributes of the admission request.
- 'params' - Parameter resource referred to by the policy binding being evaluated. The value is
  null if `ParamKind` is not specified.
- `namespaceObject` - The namespace, as a Kubernetes resource, that the incoming object belongs to.
  The value is null if the incoming object is cluster-scoped.
- `authorizer` - A CEL Authorizer. May be used to perform authorization checks for the principal
  (authenticated user) of the request. See
  AuthzSelectors and
  Authz in the Kubernetes CEL library
  documentation for more details.
- `authorizer.requestResource` - A shortcut for an authorization check configured with the request
  resource (group, resource, (subresource), namespace, name).

In CEL expressions, variables like `object` and `oldObject` are strongly-typed.
You can access any field in the object's schema, such as `object.metadata.labels` and fields in `spec`.

For any Kubernetes object, including schemaless Custom Resources, CEL guarantees access to a minimal set of properties:
`apiVersion`, `kind`, `metadata.name`, and `metadata.generateName`.

Equality on arrays with list type of 'set' or 'map' ignores element order, i.e. [1, 2] == [2, 1].
Concatenation on arrays with x-kubernetes-list-type use the semantics of the list type:

- 'set': `X + Y` performs a union where the array positions of all elements in `X` are preserved and
  non-intersecting elements in `Y` are appended, retaining their partial order.
- 'map': `X + Y` performs a merge where the array positions of all keys in `X` are preserved but the values
  are overwritten by values in `Y` when the key sets of `X` and `Y` intersect. Elements in `Y` with
  non-intersecting keys are appended, retaining their partial order.

#### Validation expression examples

| Expression                                                                                   | Purpose                                                                           |
|----------------------------------------------------------------------------------------------| ------------                                                                      |
| `object.minReplicas <= object.replicas && object.replicas <= object.maxReplicas`             | Validate that the three fields defining replicas are ordered appropriately        |
| `'Available' in object.stateCounts`                                                          | Validate that an entry with the 'Available' key <example-value> in a map                   |
| `(size(object.list1) == 0) != (size(object.list2) == 0)`                                     | Validate that one of two lists is non-empty, but not both                         |
| `!('MY_KEY' in object.map1) &#124;&#124; object.map1['MY_KEY'].matches('^[a-zA-Z]*$')` | Validate the value of a map for a specific key, if it is in the map        |
| `object.envars.filter(e, e.name == 'MY_ENV').all(e, e.value.matches('^[a-zA-Z]*$')`          | Validate the 'value' field of a listMap entry where key field 'name' is 'MY_ENV'  |
| `has(object.expired) && object.created + object.ttl < object.expired`                        | Validate that 'expired' date is after a 'create' date plus a 'ttl' duration       |
| `object.health.startsWith('ok')`                                                             | Validate a 'health' string field has the prefix 'ok'                              |
| `object.widgets.exists(w, w.key == 'x' && w.foo < 10)`                                       | Validate that the 'foo' property of a listMap item with a key 'x' is less than 10 |
| `type(object) == string ? object == '100%' : object == 1000`                                 | Validate an int-or-string field for both the int and string cases             |
| `object.metadata.name.startsWith(object.prefix)`                                             | Validate that an object's name has the prefix of another field value              |
| `object.set1.all(e, !(e in object.set2))`                                                    | Validate that two listSets are disjoint                                           |
| `size(object.names) == size(object.details) && object.names.all(n, n in object.details)`     | Validate the 'details' map is keyed by the items in the 'names' listSet           |
| `size(object.clusters.filter(c, c.name == object.primary)) == 1`                             | Validate that the 'primary' property has one and only one occurrence in the 'clusters' listMap           |

Read Supported evaluation on CEL
for more information about CEL rules.

`spec.validation[i].reason` represents a machine-readable description of why this validation failed.
If this is the first validation in the list to fail, this reason, as well as the corresponding
HTTP response code, are used in the HTTP response to the client.
The currently supported reasons are: `Unauthorized`, `Forbidden`, `Invalid`, `RequestEntityTooLarge`.
If not set, `StatusReasonInvalid` is used in the response to the client.

### Matching requests: `matchConditions`

You can define _match conditions_ for a `ValidatingAdmissionPolicy` if you need fine-grained request filtering. These
conditions are useful if you find that match rules, `objectSelectors` and `namespaceSelectors` still
doesn't provide the filtering you want. Match conditions are
CEL expressions. All match conditions must evaluate to true for the
resource to be evaluated.

Here is an example illustrating a few different uses for match conditions:

```yaml
apiVersion: admissionregistration.k8s.io/v1
kind: ValidatingAdmissionPolicy
metadata:
  name: "demo-policy.example.com"
spec:
  failurePolicy: Fail
  matchConstraints:
    resourceRules:
      - apiGroups:   ["*"]
        apiVersions: ["*"]
        operations:  ["CREATE", "UPDATE"]
        resources:   ["*"]
  matchConditions:
    - name: 'exclude-leases' # Each match condition must have a unique name
      expression: '!(request.resource.group == "coordination.k8s.io" && request.resource.resource == "leases")' # Match non-lease resources.
    - name: 'exclude-kubelet-requests'
      expression: '!("system:nodes" in request.userInfo.groups)' # Match requests made by non-node users.
    - name: 'rbac' # Skip RBAC requests.
      expression: 'request.resource.group != "rbac.authorization.k8s.io"'
  validations:
    - expression: "!object.metadata.name.contains('demo') || object.metadata.namespace == 'demo'"
```

Match conditions have access to the same CEL variables as validation expressions, except for
`namespaceObject` and `variables`:

- `namespaceObject` is not populated for match conditions and always evaluates to null. To select
  requests based on namespace labels, use a `namespaceSelector` in the policy's `matchConstraints`
  or in the binding's `matchResources`. To check other namespace fields, use a validation
  expression, where `namespaceObject` is available.
- `variables` cannot be referenced from match conditions, because match conditions are evaluated
  before the rest of the policy.

In the event of an error evaluating a match condition the policy is not evaluated. Whether to reject
the request is determined as follows:

1. If **any** match condition evaluated to `false` (regardless of other errors), the API server skips the policy.
2. Otherwise:
   - for `failurePolicy: Fail`, reject the request (without evaluating the policy).
   - for `failurePolicy: Ignore`, proceed with the request but skip the policy.

### Audit annotations

`auditAnnotations` may be used to include audit annotations in the audit event of the API request.

For example, here is an admission policy with an audit annotation:

```yaml
apiVersion: admissionregistration.k8s.io/v1
kind: ValidatingAdmissionPolicy
metadata:
  name: "demo-policy.example.com"
spec:
  failurePolicy: Fail
  matchConstraints:
    resourceRules:
    - apiGroups:   ["apps"]
      apiVersions: ["v1"]
      operations:  ["CREATE", "UPDATE"]
      resources:   ["deployments"]
  validations:
    - expression: "object.spec.replicas > 50"
      messageExpression: "'Deployment spec.replicas set to ' + string(object.spec.replicas)"
  auditAnnotations:
    - key: "high-replica-count"
      valueExpression: "'Deployment spec.replicas set to ' + string(object.spec.replicas)"
```

When an API request is validated with this admission policy, the resulting audit event will look like:

```
# the audit event recorded
{
    "kind": "Event",
    "apiVersion": "audit.k8s.io/v1",
    "annotations": {
        "demo-policy.example.com/high-replica-count": "Deployment spec.replicas set to 128"
        # other annotations
        ...
    }
    # other fields
    ...
}
```

In this example the annotation will only be included if the `spec.replicas` of the Deployment is more than
50, otherwise the CEL expression evaluates to null and the annotation will not be included.

Note that audit annotation keys are prefixed by the name of the `ValidatingAdmissionPolicy` and a `/`. If
another admission controller, such as an admission webhook, uses the exact same audit annotation key, the
value of the first admission controller to include the audit annotation will be included in the audit
event and all other values will be ignored.

### Message expression

To return a more friendly message when the policy rejects a request, we can use a CEL expression
to composite a message with `spec.validations[i].messageExpression`. Similar to the validation expression,
a message expression has access to `object`, `oldObject`, `request`, `params`, and `namespaceObject`.
Unlike validations, message expression must evaluate to a string.

For example, to better inform the user of the reason of denial when the policy refers to a parameter,
we can have the following validation:

```yaml
apiVersion: admissionregistration.k8s.io/v1
kind: ValidatingAdmissionPolicy
metadata:
  name: "deploy-replica-policy.example.com"
spec:
  paramKind:
    apiVersion: rules.example.com/v1
    kind: ReplicaLimit
  matchConstraints:
    resourceRules:
    - apiGroups:   ["apps"]
      apiVersions: ["v1"]
      operations:  ["CREATE", "UPDATE"]
      resources:   ["deployments"]
  validations:
  - expression: "object.spec.replicas <= params.maxReplicas"
    messageExpression: "'object.spec.replicas must be no greater than ' + string(params.maxReplicas)"
    reason: Invalid
```

After creating a params object that limits the replicas to 3 and setting up the binding,
when we try to create a deployment with 5 replicas, we will receive the following message.

```
$ kubectl create deploy --image=nginx nginx --replicas=5
error: failed to create deployment: deployments.apps "nginx" is forbidden: ValidatingAdmissionPolicy 'deploy-replica-policy.example.com' with binding 'demo-binding-test.example.com' denied request: object.spec.replicas must be no greater than 3
```

This is more informative than a static message of "too many replicas".

The message expression takes precedence over the static message defined in `spec.validations[i].message` if both are defined.
However, if the message expression fails to evaluate, the static message will be used instead.
Additionally, if the message expression evaluates to a multi-line string,
the evaluation result will be discarded and the static message will be used if present.
Note that static message is validated against multi-line strings.
