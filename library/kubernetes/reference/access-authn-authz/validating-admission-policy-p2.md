---
title: "Validating Admission Policy (part 2 of 4)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/access-authn-authz/validating-admission-policy.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Validating Admission Policy (part 2 of 4)

## Getting Started with Validating Admission Policy

Validating Admission Policy is part of the cluster control-plane. You should write and deploy them
with great caution. The following describes how to quickly experiment with Validating Admission Policy.

### Creating a ValidatingAdmissionPolicy

The following is an example of a ValidatingAdmissionPolicy.

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
    - expression: "object.spec.replicas <= 5"
```

`spec.validations` contains CEL expressions which use the Common Expression Language (CEL)
to validate the request. If an expression evaluates to false, the validation check is enforced
according to the `spec.failurePolicy` field.

**Note:**
You can quickly test CEL expressions in CEL Playground.

To configure a validating admission policy for use in a cluster, a binding is required.
The following is an example of a ValidatingAdmissionPolicyBinding.:

```yaml
apiVersion: admissionregistration.k8s.io/v1
kind: ValidatingAdmissionPolicyBinding
metadata:
  name: "demo-binding-test.example.com"
spec:
  policyName: "demo-policy.example.com"
  validationActions: [Deny]
  matchResources:
    namespaceSelector:
      matchLabels:
        environment: test
```

When trying to create a deployment with replicas set not satisfying the validation expression, an
error will return containing message:

```none
ValidatingAdmissionPolicy 'demo-policy.example.com' with binding 'demo-binding-test.example.com' denied request: failed expression: object.spec.replicas <= 5
```

The above provides a simple example of using ValidatingAdmissionPolicy without a parameter configured.

#### Validation actions

Each `ValidatingAdmissionPolicyBinding` must specify one or more
`validationActions` to declare how `validations` of a policy are enforced.

The supported `validationActions` are:

- `Deny`: Validation failure results in a denied request.
- `Warn`: Validation failure is reported to the request client
  as a warning.
- `Audit`: Validation failure is included in the audit event for the API request.

For example, to both warn clients about a validation failure and to audit the
validation failures, use:

```yaml
validationActions: [Warn, Audit]
```

`Deny` and `Warn` may not be used together since this combination
needlessly duplicates the validation failure both in the
API response body and the HTTP warning headers.

A `validation` that evaluates to false is always enforced according to these
actions. Failures defined by the `failurePolicy` are enforced
according to these actions only if the `failurePolicy` is set to `Fail` (or not specified),
otherwise the failures are ignored.

See Audit Annotations: validation failures
for more details about the validation failure audit annotation.

### Parameter resources

Parameter resources allow a policy configuration to be separate from its definition.
A policy can define paramKind, which outlines GVK of the parameter resource,
and then a policy binding ties a policy by name (via policyName) to a particular parameter resource via paramRef.

If parameter configuration is needed, the following is an example of a ValidatingAdmissionPolicy
with parameter configuration.

```yaml
apiVersion: admissionregistration.k8s.io/v1
kind: ValidatingAdmissionPolicy
metadata:
  name: "replicalimit-policy.example.com"
spec:
  failurePolicy: Fail
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
      reason: Invalid
```

The `spec.paramKind` field of the ValidatingAdmissionPolicy specifies the kind of resources used
to parameterize this policy. For this example, it is configured by ReplicaLimit custom resources.
Note in this example how the CEL expression references the parameters via the CEL params variable,
e.g. `params.maxReplicas`. `spec.matchConstraints` specifies what resources this policy is
designed to validate. Note that the native types such like `ConfigMap` could also be used as
parameter reference.

The `spec.validations` fields contain CEL expressions. If an expression evaluates to false, the
validation check is enforced according to the `spec.failurePolicy` field.

The validating admission policy author is responsible for providing the ReplicaLimit parameter CRD.

To configure an validating admission policy for use in a cluster, a binding and parameter resource
are created. The following is an example of a ValidatingAdmissionPolicyBinding
that uses a **cluster-wide** param - the same param will be used to validate
every resource request that matches the binding:

```yaml
apiVersion: admissionregistration.k8s.io/v1
kind: ValidatingAdmissionPolicyBinding
metadata:
  name: "replicalimit-binding-test.example.com"
spec:
  policyName: "replicalimit-policy.example.com"
  validationActions: [Deny]
  paramRef:
    name: "replica-limit-test.example.com"
    namespace: "default"
    parameterNotFoundAction: Deny
  matchResources:
    namespaceSelector:
      matchLabels:
        environment: test
```

Notice this binding applies a parameter to the policy for all resources which
are in the `test` environment.

The parameter resource could be as following:

```yaml
apiVersion: rules.example.com/v1
kind: ReplicaLimit
metadata:
  name: "replica-limit-test.example.com"
  namespace: "default"
maxReplicas: 3
```

This policy parameter resource limits deployments to a max of 3 replicas.

An admission policy may have multiple bindings. To bind all other environments
to have a maxReplicas limit of 100, create another ValidatingAdmissionPolicyBinding:

```yaml
apiVersion: admissionregistration.k8s.io/v1
kind: ValidatingAdmissionPolicyBinding
metadata:
  name: "replicalimit-binding-nontest"
spec:
  policyName: "replicalimit-policy.example.com"
  validationActions: [Deny]
  paramRef:
    name: "replica-limit-prod.example.com"
    namespace: "default"
    parameterNotFoundAction: Deny
  matchResources:
    namespaceSelector:
      matchExpressions:
      - key: environment
        operator: NotIn
        values:
        - test
```

Notice this binding applies a different parameter to resources which
are not in the `test` environment.

And have a parameter resource:

```yaml
apiVersion: rules.example.com/v1
kind: ReplicaLimit
metadata:
  name: "replica-limit-prod.example.com"
maxReplicas: 100
```

For each admission request, the API server evaluates CEL expressions of each
(policy, binding, param) combination that match the request. For a request
to be admitted it must pass **all** evaluations.

If multiple bindings match the request, the policy will be evaluated for each,
and they must all pass evaluation for the policy to be considered passed.

If multiple parameters match a single binding, the policy rules will be evaluated
for each param, and they too must all pass for the binding to be considered passed.
Bindings can have overlapping match criteria. The policy is evaluated for each
matching binding-parameter combination. A policy may even be evaluated multiple
times if multiple bindings match it, or a single binding that matches multiple
parameters.

The params object representing a parameter resource will not be set if a parameter resource has
not been bound, so for policies requiring a parameter resource, it can be useful to add a check to
ensure one has been bound. A parameter resource will not be bound and `params` will be null
if `paramKind` of the policy, or `paramRef` of the binding are not specified.

For the use cases requiring parameter configuration, we recommend to add a param check in
`spec.validations[0].expression`:

```
- expression: "params != null"
  message: "params missing but required to bind to this policy"
```

#### Optional parameters

It can be convenient to be able to have optional parameters as part of a parameter resource, and
only validate them if present. CEL provides the `has()` macro, which checks whether a field
is present before a CEL expression accesses the field's value.
CEL also implements Boolean short-circuiting. If the first half of a logical OR evaluates to true,
it won’t evaluate the other half (since the result of the entire OR will be true regardless).

Combining the two, we can provide a way to validate optional parameters:

`!has(params.optionalNumber) || (params.optionalNumber >= 5 && params.optionalNumber <= 10)`

Here, we first check whether the optional parameter is absent with `!has(params.optionalNumber)`.

- If `optionalNumber` hasn’t been defined, then the expression short-circuits since
  `!has(params.optionalNumber)` will evaluate to true.
- If `optionalNumber` has been defined, then the latter half of the CEL expression will be
  evaluated, and optionalNumber will be checked to ensure that it contains a value between 5 and
  10 inclusive.

Use `has()` to check field presence. To check whether a map contains a key, use the `in`
operator instead. For example,
`has(object.metadata.labels) && 'example.com/environment' in object.metadata.labels` checks that
the `metadata.labels` field is present and that the map contains the `example.com/environment` key.
For multi-level optional field access, prefer CEL optional syntax (Kubernetes 1.29+):
`object.?metadata.labels['example.com/block'].orValue('')` safely traverses absent intermediate
fields and returns the given default value.

#### Per-namespace Parameters

As the author of a ValidatingAdmissionPolicy and its ValidatingAdmissionPolicyBinding,
you can choose to specify cluster-wide, or per-namespace parameters.
If you specify a `namespace` for the binding's `paramRef`, the control plane only
searches for parameters in that namespace.

However, if `namespace` is not specified in the ValidatingAdmissionPolicyBinding, the
API server can search for relevant parameters in the namespace that a request is against.
For example, if you make a request to modify a ConfigMap in the `default` namespace and
there is a relevant ValidatingAdmissionPolicyBinding with no `namespace` set, then the
API server looks for a parameter object in `default`.
This design enables policy configuration that depends on the namespace
of the resource being manipulated, for more fine-tuned control.

#### Parameter selector

In addition to specify a parameter in a binding by `name`, you may
choose instead to specify label selector, such that all resources of the
policy's `paramKind`, and the param's `namespace` (if applicable) that match the
label selector are selected for evaluation. See selector for more information on how label selectors match resources.

If multiple parameters are found to meet the condition, the policy's rules are
evaluated for each parameter found and the results will be ANDed together.

If `namespace` is provided, only objects of the `paramKind` in the provided
namespace are eligible for selection. Otherwise, when `namespace` is empty and
`paramKind` is namespace-scoped, the `namespace` used in the request being
admitted will be used.

#### Authorization checks {#authorization-check}

We introduced the authorization check for parameter resources.
User is expected to have `read` access to the resources referenced by `paramKind` in
`ValidatingAdmissionPolicy` and `paramRef` in `ValidatingAdmissionPolicyBinding`.

Note that if a resource in `paramKind` fails resolving via the restmapper, `read` access to all
resources of groups is required.

#### `paramRef`

The `paramRef` field specifies the parameter resource used by the policy. It has the following fields:

- **name**: The name of the parameter resource.
- **namespace**: The namespace of the parameter resource.
- **selector**: A label selector to match multiple parameter resources.
- **parameterNotFoundAction**: (Required) Controls the behavior when the specified parameters are not found.

  - **Allowed Values**:
    - **`Allow`**: The absence of matched parameters is treated as a successful validation by the binding.
    - **`Deny`**: The absence of matched parameters is subject to the `failurePolicy` of the policy.

One of `name` or `selector` must be set, but not both.

**Note:**
The `parameterNotFoundAction` field in `paramRef` is **required**. It specifies the action to take when no parameters are found matching the `paramRef`. If not specified, the policy binding may be considered invalid and will be ignored or could lead to unexpected behavior.

- **`Allow`**: If set to `Allow`, and no parameters are found, the binding treats the absence of parameters as a successful validation, and the policy is considered to have passed.
- **`Deny`**: If set to `Deny`, and no parameters are found, the binding enforces the `failurePolicy` of the policy. If the `failurePolicy` is `Fail`, the request is rejected.

Make sure to set `parameterNotFoundAction` according to the desired behavior when parameters are missing.

#### Handling Missing Parameters with `parameterNotFoundAction`

When using `paramRef` with a selector, it's possible that no parameters match the selector. The `parameterNotFoundAction` field determines how the binding behaves in this scenario.

**Example:**

```yaml
apiVersion: admissionregistration.k8s.io/v1alpha1
kind: ValidatingAdmissionPolicyBinding
metadata:
  name: example-binding
spec:
  policyName: example-policy
  paramRef:
    selector:
      matchLabels:
        environment: test
    parameterNotFoundAction: Allow
  validationActions:
  - Deny
```  

### Failure Policy

`failurePolicy` defines how mis-configurations and CEL expressions evaluating to error from the
admission policy are handled. Allowed values are `Ignore` or `Fail`.

- `Ignore` means that an error calling the ValidatingAdmissionPolicy is ignored and the API
  request is allowed to continue.
- `Fail` means that an error calling the ValidatingAdmissionPolicy causes the admission to fail
  and the API request to be rejected.

Note that the `failurePolicy` is defined inside `ValidatingAdmissionPolicy`:

```yaml
apiVersion: admissionregistration.k8s.io/v1
kind: ValidatingAdmissionPolicy
spec:
...
failurePolicy: Ignore # The default is "Fail"
validations:
- expression: "object.spec.xyz == params.x"  
```
