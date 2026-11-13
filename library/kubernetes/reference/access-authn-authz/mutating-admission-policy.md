---
title: "Mutating Admission Policy"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/access-authn-authz/mutating-admission-policy.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Mutating Admission Policy

**Feature state:**

This page provides an overview of _MutatingAdmissionPolicies_.
MutatingAdmissionPolicies allow you to change what happens when someone writes a change to the Kubernetes API.
If you want to use declarative policies just to prevent a particular kind of change to resources (for example: protecting platform namespaces from deletion),
ValidatingAdmissionPolicy
is
a simpler and more effective alternative.

## What are MutatingAdmissionPolicies?

Mutating admission policies offer a declarative, in-process alternative to mutating admission webhooks.

Mutating admission policies use the Common Expression Language (CEL) to declare mutations to resources.
Mutations can be defined either with an *apply configuration* that is merged using the
server side apply merge strategy,
or a JSON patch.

Mutating admission policies are highly configurable, enabling policy authors to define policies
that can be parameterized and scoped to resources as needed by cluster administrators.

## What resources make a policy

A policy is generally made up of three resources:

- The MutatingAdmissionPolicy describes the abstract logic of a policy
  (think: "this policy sets a particular label to a particular value").

- A _parameter resource_ provides information to a MutatingAdmissionPolicy to make it a concrete
  statement (think "set the `owner` label to something like `company.example.com`").
  Parameter resources refer to Kubernetes resources, available in the Kubernetes API. They can be built-in types or extensions,
  such as a CustomResourceDefinition (CRD). For example, you can use a ConfigMap as a parameter.
- A MutatingAdmissionPolicyBinding links the above (MutatingAdmissionPolicy and parameter) resources together and provides scoping.
  If you only want to set an `owner` label for `Pods`, and not other API kinds, the binding is where you
  specify this mutation.

At least a MutatingAdmissionPolicy and a corresponding MutatingAdmissionPolicyBinding
must be defined for a policy to have an effect.

**Note:**
Names ending in `.static.k8s.io` are reserved for
manifest-based admission control
and cannot be used for API-based policies or bindings. This reservation is
enforced when the `ManifestBasedAdmissionControlConfig`
feature gate is enabled.

If a MutatingAdmissionPolicy does not need to be configured via parameters, simply leave
`spec.paramKind` in  MutatingAdmissionPolicy not specified.

## Getting Started with MutatingAdmissionPolicies

Mutating admission policy is part of the cluster control-plane. You should write
and deploy them with great caution. The following describes how to quickly
experiment with Mutating admission policy.

### Create a MutatingAdmissionPolicy

The following is an example of a MutatingAdmissionPolicy. This policy mutates newly created Pods to have a sidecar container if it does not exist.

```yaml
apiVersion: admissionregistration.k8s.io/v1
kind: MutatingAdmissionPolicy
metadata:
  name: "sidecar-policy.example.com"
spec:
  paramKind:
    kind: Sidecar
    apiVersion: mutations.example.com/v1
  matchConstraints:
    resourceRules:
    - apiGroups:   [""]
      apiVersions: ["v1"]
      operations:  ["CREATE"]
      resources:   ["pods"]
  matchConditions:
    - name: does-not-already-have-sidecar
      expression: "!object.spec.initContainers.exists(ic, ic.name == \"mesh-proxy\")"
  failurePolicy: Fail
  reinvocationPolicy: IfNeeded
  mutations:
    - patchType: "ApplyConfiguration"
      applyConfiguration:
        expression: >
          Object{
            spec: Object.spec{
              initContainers: [
                Object.spec.initContainers{
                  name: "mesh-proxy",
                  image: "mesh/proxy:v1.0.0",
                  args: ["proxy", "sidecar"],
                  restartPolicy: "Always"
                }
              ]
            }
          }
```

The `.spec.mutations` field consists of a list of expressions that evaluate to resource patches.
The emitted patches may be either apply configurations or JSON Patch
patches. You cannot specify an empty list of mutations. After evaluating all the
expressions, the API server applies those changes to the resource that is
passing through admission.

To configure a mutating admission policy for use in a cluster, a binding is
required. The MutatingAdmissionPolicy will only be active if a corresponding
binding exists with the referenced `spec.policyName` matching the `spec.name` of
a policy.

Once the binding and policy are created, any resource request that matches the
`spec.matchConditions` of a policy will trigger the set of mutations defined.

Match conditions cannot use `namespaceObject` or `variables`. `namespaceObject` is not populated
for match conditions and always evaluates to null, and `variables` cannot be referenced because
match conditions are evaluated before the rest of the policy. To select requests based on namespace
labels, use a `namespaceSelector` in the policy's `matchConstraints` or in the binding's
`matchResources`.

In the example above, creating a Pod will add the `mesh-proxy` initContainer mutation:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: myapp
  namespace: default
spec:
  ...
  initContainers:
  - name: mesh-proxy
    image: mesh/proxy:v1.0.0
    args: ["proxy", "sidecar"]
    restartPolicy: Always
  - name: myapp-initializer
    image: example/initializer:v1.0.0
  ...
```

#### Parameter resources

Parameter resources allow a policy configuration to be separate from its
definition. A policy can define `paramKind`, which outlines GVK of the parameter
resource, and then a policy binding ties a policy by name (via `policyName`) to a
particular parameter resource via `paramRef`.

Please refer to parameter resources for more information.

#### `ApplyConfiguration` {#patch-type-apply-configuration}

MutatingAdmissionPolicy expressions are always CEL. Each apply configuration
`expression` must evaluate to a CEL object (declared using `Object()`
initialization).

Apply configurations may not modify atomic structs, maps or arrays due to the risk of accidental deletion of
values not included in the apply configuration.

CEL expressions have access to the object types needed to create apply configurations:

- `Object` - CEL type of the resource object.
- `Object.<fieldName>` - CEL type of object field (such as `Object.spec`)
- `Object.<fieldName1>.<fieldName2>...<fieldNameN>` - CEL type of nested field (such as `Object.spec.containers`)

CEL expressions have access to the contents of the API request, organized into CEL variables as well as some other useful variables:

- `object` - The object from the incoming request. The value is null for DELETE requests.
- `oldObject` - The existing object. The value is null for CREATE requests.
- `request` - Attributes of the API request.
- `params` - Parameter resource referred to by the policy binding being evaluated. Only populated if the policy has a ParamKind.
- `namespaceObject` - The namespace object that the incoming object belongs to. The value is null for cluster-scoped resources.
- `variables` - Map of composited variables, from its name to its lazily evaluated value.
  For example, a variable named `foo` can be accessed as `variables.foo`.
- `authorizer` - A CEL Authorizer. May be used to perform authorization checks for the principal (user or service account) of the request.
  See https://pkg.go.dev/k8s.io/apiserver/pkg/cel/library#Authz
- `authorizer.requestResource` - A CEL ResourceCheck constructed from the `authorizer` and configured with the
  request resource.

The `apiVersion`, `kind`, `metadata.name`, `metadata.generateName` and `metadata.labels` are always accessible from the root of the
object. No other metadata properties are accessible.

#### `JSONPatch` {#patch-type-json-patch}

The same mutation can be written as a JSON Patch as follows:

```yaml
apiVersion: admissionregistration.k8s.io/v1
kind: MutatingAdmissionPolicy
metadata:
  name: "sidecar-policy.example.com"
spec:
  paramKind:
    kind: Sidecar
    apiVersion: mutations.example.com/v1
  matchConstraints:
    resourceRules:
    - apiGroups:   [""]
      apiVersions: ["v1"]
      operations:  ["CREATE"]
      resources:   ["pods"]
  matchConditions:
    - name: does-not-already-have-sidecar
      expression: "!object.spec.initContainers.exists(ic, ic.name == \"mesh-proxy\")"
  failurePolicy: Fail
  reinvocationPolicy: IfNeeded
  mutations:
    - patchType: "JSONPatch"
      jsonPatch:
        expression: >
          [
            JSONPatch{
              op: "add", path: "/spec/initContainers/-",
              value: Object.spec.initContainers{
                name: "mesh-proxy",
                image: "mesh-proxy/v1.0.0",
                restartPolicy: "Always"
              }
            }
          ]
```

The expression will be evaluated by CEL to create a JSON patch.
ref: https://github.com/google/cel-spec

Each evaluated `expression` must return an array of `JSONPatch` values. The
`JSONPatch` type represents one operation from a JSON patch.

For example, this CEL expression returns a JSON patch to conditionally modify a value:

```
  [
    JSONPatch{op: "test", path: "/spec/example", value: "Red"},
    JSONPatch{op: "replace", path: "/spec/example", value: "Green"}
  ]
```

To define a JSON object for the patch operation `value`, use CEL `Object` types. For example:

```
  [
    JSONPatch{
      op: "add",
      path: "/spec/selector",
      value: Object.spec.selector{matchLabels: {"environment": "test"}}
    }
  ]
```

To use strings containing '/' and '~' as JSONPatch path keys, use `jsonpatch.escapeKey()`. For example:

```
  [
    JSONPatch{
      op: "add",
      path: "/metadata/labels/" + jsonpatch.escapeKey("example.com/environment"),
      value: "test"
    },
  ]
```

CEL expressions have access to the types needed to create JSON patches and objects:

- `JSONPatch` - CEL type of JSON Patch operations. JSONPatch has the fields `op`, `from`, `path` and `value`.
  See JSON patch for more details. The `value` field may be set to any of: string,
  integer, array, map or object.  If set, the `path` and `from` fields must be set to a
  JSON pointer string, where the `jsonpatch.escapeKey()` CEL
  function may be used to escape path keys containing `/` and `~`.
- `Object` - CEL type of the resource object.
- `Object.<fieldName>` - CEL type of object field (such as `Object.spec`)
- `Object.<fieldName1>.<fieldName2>...<fieldNameN>` - CEL type of nested field (such as `Object.spec.containers`)

CEL expressions have access to the contents of the API request, organized into CEL variables as well as some other useful variables:

- `object` - The object from the incoming request. The value is null for DELETE requests.
- `oldObject` - The existing object. The value is null for CREATE requests.
- `request` - Attributes of the API request.
- `params` - Parameter resource referred to by the policy binding being evaluated. Only populated if the policy has a ParamKind.
- `namespaceObject` - The namespace object that the incoming object belongs to. The value is null for cluster-scoped resources.
- `variables` - Map of composited variables, from its name to its lazily evaluated value.
  For example, a variable named `foo` can be accessed as `variables.foo`.
- `authorizer` - A CEL Authorizer. May be used to perform authorization checks for the principal (user or service account) of the request.
  See https://pkg.go.dev/k8s.io/apiserver/pkg/cel/library#Authz
- `authorizer.requestResource` - A CEL ResourceCheck constructed from the `authorizer` and configured with the
  request resource.

CEL expressions have access to Kubernetes CEL function libraries
as well as:

- `jsonpatch.escapeKey` - Performs JSONPatch key escaping. `~` and  `/` are escaped as `~0` and `~1` respectively.

Only property names of the form `a-zA-Z_.-/*` are accessible.

## API kinds exempt from mutating admission

There are certain API kinds that are exempt from admission-time mutation. For example, you can't create a MutatingAdmissionPolicy that changes a MutatingAdmissionPolicy.

The following admission configuration kinds are exempt from policies created
via the REST API, to prevent circular dependencies:

* ValidatingAdmissionPolicies
* ValidatingAdmissionPolicyBindings
* MutatingAdmissionPolicies
* MutatingAdmissionPolicyBindings

**Note:**
When configured via
manifest-based admission control,
a MutatingAdmissionPolicy can intercept the admission configuration kinds
listed above. This bypasses the restrictions usually applied to policies
created via the REST API, allowing you to mutate even admission configuration
and security-sensitive resources. Unlike the REST API, a bad manifest-based
admission policy intercepting these resources would not be unrecoverable since
it is defined on disk rather than through the API.

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
