---
title: "Validating Admission Policy (part 4 of 4)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/access-authn-authz/validating-admission-policy.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Validating Admission Policy (part 4 of 4)

### Type checking

When a policy definition is created or updated, the validation process parses the expressions it contains
and reports any syntax errors, rejecting the definition if any errors are found.
Afterward, the referred variables are checked for type errors, including missing fields and type confusion,
against the matched types of `spec.matchConstraints`.
The result of type checking can be retrieved from `status.typeChecking`.
The presence of `status.typeChecking` indicates the completion of type checking,
and an empty `status.typeChecking` means that no errors were detected.

For example, given the following policy definition:

```yaml
apiVersion: admissionregistration.k8s.io/v1
kind: ValidatingAdmissionPolicy
metadata:
  name: "deploy-replica-policy.example.com"
spec:
  matchConstraints:
    resourceRules:
    - apiGroups:   ["apps"]
      apiVersions: ["v1"]
      operations:  ["CREATE", "UPDATE"]
      resources:   ["deployments"]
  validations:
  - expression: "object.replicas > 1" # should be "object.spec.replicas > 1"
    message: "must be replicated"
    reason: Invalid
```

The status will yield the following information:

```yaml
status:
  typeChecking:
    expressionWarnings:
    - fieldRef: spec.validations[0].expression
      warning: |-
        apps/v1, Kind=Deployment: ERROR: <input>:1:7: undefined field 'replicas'
         | object.replicas > 1
         | ......^
```

If multiple resources are matched in `spec.matchConstraints`, all of matched resources will be checked against.
For example, the following policy definition

```yaml
apiVersion: admissionregistration.k8s.io/v1
kind: ValidatingAdmissionPolicy
metadata:
  name: "replica-policy.example.com"
spec:
  matchConstraints:
    resourceRules:
    - apiGroups:   ["apps"]
      apiVersions: ["v1"]
      operations:  ["CREATE", "UPDATE"]
      resources:   ["deployments","replicasets"]
  validations:
  - expression: "object.replicas > 1" # should be "object.spec.replicas > 1"
    message: "must be replicated"
    reason: Invalid
```

will have multiple types and type checking result of each type in the warning message.

```yaml
status:
  typeChecking:
    expressionWarnings:
    - fieldRef: spec.validations[0].expression
      warning: |-
        apps/v1, Kind=Deployment: ERROR: <input>:1:7: undefined field 'replicas'
         | object.replicas > 1
         | ......^
        apps/v1, Kind=ReplicaSet: ERROR: <input>:1:7: undefined field 'replicas'
         | object.replicas > 1
         | ......^
```

Type Checking has the following limitation:

- No wildcard matching. If `spec.matchConstraints.resourceRules` contains `"*"` in any of `apiGroups`, `apiVersions` or `resources`,
  the types that `"*"` matches will not be checked.
- The number of matched types is limited to 10. This is to prevent a policy that manually specifying too many types.
  to consume excessive computing resources. In the order of ascending group, version, and then resource, 11th combination and beyond are ignored.
- Type Checking does not affect the policy behavior in any way. Even if the type checking detects errors, the policy will continue
  to evaluate. If errors do occur during evaluate, the failure policy will decide its outcome.
- Type Checking does not apply to CRDs, including matched CRD types and reference of paramKind. The support for CRDs will come in future release.

### Variable composition

If an expression grows too complicated, or part of the expression is reusable and computationally expensive to evaluate,
you can extract some part of the expressions into variables. A variable is a named expression that can be referred later
in `variables` in other expressions.

```yaml
spec:
  variables:
    - name: foo
      expression: "'foo' in object.spec.metadata.labels ? object.spec.metadata.labels['foo'] : 'default'"
  validations:
    - expression: variables.foo == 'bar'
```

A variable is lazily evaluated when it is first referred. Any error that occurs during the evaluation will be
reported during the evaluation of the referring expression. Both the result and potential error are memorized and
count only once towards the runtime cost.

The order of variables are important because a variable can refer to other variables that are defined before it.
This ordering prevents circular references.

The following is a more complex example of enforcing that image repo names match the environment defined in its namespace.

```yaml
# This policy enforces that all containers of a deployment has the image repo match the environment label of its namespace.
# Except for "exempt" deployments, or any containers that do not belong to the "example.com" organization (e.g. common sidecars).
# For example, if the namespace has a label of {"environment": "staging"}, all container images must be either staging.example.com/*
# or do not contain "example.com" at all, unless the deployment has {"exempt": "true"} label.
apiVersion: admissionregistration.k8s.io/v1
kind: ValidatingAdmissionPolicy
metadata:
  name: "image-matches-namespace-environment.policy.example.com"
spec:
  failurePolicy: Fail
  matchConstraints:
    resourceRules:
    - apiGroups:   ["apps"]
      apiVersions: ["v1"]
      operations:  ["CREATE", "UPDATE"]
      resources:   ["deployments"]
  variables:
  - name: environment
    expression: "'environment' in namespaceObject.metadata.labels ? namespaceObject.metadata.labels['environment'] : 'prod'"
  - name: exempt
    expression: "'exempt' in object.metadata.labels && object.metadata.labels['exempt'] == 'true'"
  - name: containers
    expression: "object.spec.template.spec.containers"
  - name: containersToCheck
    expression: "variables.containers.filter(c, c.image.contains('example.com/'))"
  validations:
  - expression: "variables.exempt || variables.containersToCheck.all(c, c.image.startsWith(variables.environment + '.'))"
    messageExpression: "'only ' + variables.environment + ' images are allowed in namespace ' + namespaceObject.metadata.name"
```

With the policy bound to the namespace `default`, which is labeled `environment: prod`,
the following attempt to create a deployment would be rejected.
```shell
kubectl create deploy --image=dev.example.com/nginx invalid
```
The error message is similar to this.
```console
error: failed to create deployment: deployments.apps "invalid" is forbidden: ValidatingAdmissionPolicy 'image-matches-namespace-environment.policy.example.com' with binding 'demo-binding-test.example.com' denied request: only prod images are allowed in namespace default
```

## API kinds exempt from admission validation

There are certain API kinds that are exempt from admission-time validation checks. For example, you can't create a ValidatingAdmissionPolicy that prevents changes to ValidatingAdmissionPolicyBindings.

The following admission configuration kinds are exempt from policies created
via the REST API, to prevent circular dependencies:

* ValidatingAdmissionPolicies
* ValidatingAdmissionPolicyBindings
* MutatingAdmissionPolicies
* MutatingAdmissionPolicyBindings

**Note:**
When configured via
manifest-based admission control,
a ValidatingAdmissionPolicy can intercept the admission configuration kinds
listed above. This bypasses the restrictions usually applied to policies
created via the REST API, allowing you to validate even admission
configuration and security-sensitive resources. Unlike the REST API, a bad
manifest-based admission policy intercepting these resources would not be
unrecoverable since it is defined on disk rather than through the API.

Additionally, the following non-persisted (virtual) authentication and
authorization API kinds are exempt from all admission policies, including
manifest-based policies, because intercepting them could lock the cluster out
of its own authentication and authorization path:

* TokenReviews
* SelfSubjectReviews
* LocalSubjectAccessReviews
* SelfSubjectAccessReviews
* SelfSubjectRulesReviews
* SubjectAccessReviews

Starting with Kubernetes v1.37,
admission webhooks
also exclude these virtual resources by default.
