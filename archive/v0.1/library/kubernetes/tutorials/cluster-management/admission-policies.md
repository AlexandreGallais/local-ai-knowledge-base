---
title: "Explore Validating and Mutating Admission Policies (part 1 of 2)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/tutorials/cluster-management/admission-policies.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

This page lets you try out declarative _admission policies_, which allow you to use the Common
Expression Language (CEL) to validate or mutate resources.

Kubernetes  supports two kinds of admission policy:

- ValidatingAdmissionPolicy
- MutatingAdmissionPolicy

This tutorial covers both kinds of admission policy.

## Before you begin

To define admission policies, you must be a cluster administrator. Make sure you have administrator
access to the cluster where you are learning.

For ValidatingAdmissionPolicy, you need:
* A cluster running version 1.30 or later.

For MutatingAdmissionPolicy, you need:
* A cluster running version 1.36 or later.

To check the version, run `kubectl version`.
If you are running an older version of Kubernetes, check the documentation for that version.

## What are declarative admission policies?

Declarative admission policies offer a declarative,
in-process alternative to admission webhooks.

By using the Common Expression Language (CEL) to declare policy rules,
these policies are evaluated directly within the API server.

These policies are highly configurable, enabling policy authors to define logic that can be parameterized
and scoped to resources as needed by cluster administrators.

### API types for admission policies

The two types of policy have different purposes.

ValidatingAdmissionPolicy is for _enforcing constraints_.

MutatingAdmissionPolicy is for _modifying resources during admission_.

### Policy elements

Each applied policy always has a _policy_ object (ValidatingAdmissionPolicy or MutatingAdmissionPolicy)
and a separate _binding_ object (ValidatingAdmissionPolicyBinding or MutatingAdmissionPolicyBinding).

You can also use _parameters_, which are **optional**. To learn more, see
parameter resources (ValidatingAdmissionPolicy) or
parameter resources (MutatingAdmissionPolicy).

Policy objects describe the abstract logic of a policy using Common Expression Language (CEL).
For example, a ValidatingAdmissionPolicy might enforce replica limits or ensure specific labels are present,
while a MutatingAdmissionPolicy can modify resources such as adding a default label to a namespace.

Binding objects link the policy to your cluster and provide scoping.
A ValidatingAdmissionPolicyBinding or MutatingAdmissionPolicyBinding connects the policy to specific resources.
If you only want to enforce a policy for a specific subset of resources, the binding is where you narrow the
scope of the policy (using `matchResources`).

Parameters allow separating configuration for the policy behavior from its definition.
Parameter resources refer to Kubernetes resources available in the API.
They can be built-in API types (such as ConfigMap), or they can be
custom resources.
A policy binding then uses `spec.paramRef` to reference an actual parameter resource.

If a policy does not require parameters, you leave `spec.paramKind` unspecified.

### CEL expressions

Both kinds of policy rely on an expression language known as Common Expression Language (CEL).
Read CEL in Kubernetes to learn more.

If you are new to CEL, practice writing a very simple expression, such as `false || true`.
You can test CEL expressions in CEL Playground.

### Policy actions

Each admission policy binding must specify one or more actions to declare how the policy
is enforced.

#### ValidatingAdmissionPolicyBinding {#policy-actions-validating}

For ValidatingAdmissionPolicyBinding, the supported `validationActions` are:

Audit
: Validation failure is included in the audit event for the API request.

Warn
: Validation failure is reported to the request client as a
  warning.

Deny
: Validation failure results in a denied request.

A policy check that fails or an error that occurs is enforced according to these actions.
Failures defined by the `failurePolicy` are enforced according to these actions only if the `failurePolicy`
is set to `Fail` (or not specified).

See Audit Annotations: validation failures
for more details about audit logging for policies.

You are not allowed to use Deny and Warn together, since this combination would duplicate
the validation failure in both the API response body and the HTTP `Warning:` header.

#### MutatingAdmissionPolicyBinding {#policy-actions-mutating}

For MutatingAdmissionPolicyBinding, the action is always to mutate the object.

You can use a JSON Patch or a Kubernetes _apply configuration_.

## Enforcement through validation

Now, try defining a ValidatingAdmissionPolicy.

The following is an example of a ValidatingAdmissionPolicy that requires that any Deployment has multiple replicas.

```yaml
---
apiVersion: admissionregistration.k8s.io/v1
kind: ValidatingAdmissionPolicy
metadata:
  name: "enforce-multiple-replicas-deployments"
  annotations:
    kubernetes.io/description: "Require that matching Deployments have multiple replicas"
spec:
  matchConstraints:
    resourceRules:
    - apiGroups:   ["apps"]
      apiVersions: ["v1"]
      resources:   ["deployments"]      # the Deployment API
      operations:  ["CREATE", "UPDATE"] # the API verb, converted to upper case
  validations:
    - expression: "object.spec.replicas >= 2"
```

`spec.validations` contains CEL expressions which use the Common Expression Language (CEL)
to validate the request.
If an expression evaluates to false, the validation check is enforced according to the `spec.failurePolicy` field.

Write a policy like this and apply it.

Or, if you want to apply a ready-made manifest:

```shell
kubectl apply --server-side -f https://k8s.io/examples/access/manifest-admission-control/vap-min-replicas.yaml
```

On its own, this doesn't do anything.

You can try creating a Deployment with 0 or 1 replicas; it will work (unless some other policy prevents it).

---

To make it work, you define a ValidatingAdmissionPolicyBinding.

Pick a namespace where you'll enforce the new policy.

The following is an example ValidatingAdmissionPolicyBinding for the policy you made:

```yaml
apiVersion: admissionregistration.k8s.io/v1
kind: ValidatingAdmissionPolicyBinding
metadata:
  name: enforce-multiple-replicas-deployments-binding
spec:
  policyName: "enforce-multiple-replicas-deployments"
  validationActions: [Deny]
  matchResources:
    namespaceSelector:
      matchLabels:
        kubernetes.io/metadata.name: default # change this to match the namespace you're using
```

**Caution:**
Anyone with full / admin access to a namespace can write to its labels. This includes deleting a label from
the namespace.

The `kubernetes.io/metadata.name` label is protected, but if you use a different label, take care to make sure
that only trusted users have a way to remove or edit that label you choose.

Write a manifest based on that example YAML (if you're using the `default` namespace, you can use
it without any changes). Apply that manifest using `kubectl apply`.

### Test the policy {#test-admission-policy-validation}

Now, test the policy. Try creating a Deployment
and then scale it to 0 replicas using `kubectl scale`. What happens?

You could change the ValidatingAdmissionPolicyBinding to have a different validation action,
instead of Deny. If you choose the Warning validation action and try to scale a Deployment to 0 replicas,
what happens?

**Note:**
If you did change the ValidatingAdmissionPolicyBinding to just warn people, there's a problem…

The name is wrong! If you change a ValidatingAdmissionPolicyBinding or the associated ValidatingAdmissionPolicy so
that it only warns people, you should check if you also need to change the name of the policy. You would change the
name to make sure that the naming doesn't mislead people.

### Existing resources aren't affected {#limitation-admission-policy-validation}

If you have a Deployment with 0 or 1 replicas, and you change the ValidatingAdmissionPolicyBinding back
to Deny mode, it doesn't affect any existing resources.

(If you wanted to try to scale out Deployments to have at least 2 replicas, you could achieve that another
way - for example, using a controller).

That's all for the ValidatingAdmissionPolicy. Now you'll learn about MutatingAdmissionPolicies.
