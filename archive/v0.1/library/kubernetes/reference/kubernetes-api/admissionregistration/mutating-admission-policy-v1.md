---
title: "MutatingAdmissionPolicy (part 1 of 6)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/admissionregistration/mutating-admission-policy-v1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# MutatingAdmissionPolicy

`apiVersion: admissionregistration.k8s.io/v1`

`import "k8s.io/api/admissionregistration/v1"`

## MutatingAdmissionPolicy {#MutatingAdmissionPolicy}

MutatingAdmissionPolicy describes the definition of an admission mutation policy that mutates the object coming into admission chain.

   | Field | Description

       | `apiVersion`string
       | APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

       | `kind`string
       | Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

       | `metadata`ObjectMeta
       | metadata is the standard object metadata; More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata.

       | `spec`MutatingAdmissionPolicySpec
       | spec defines the desired behavior of the MutatingAdmissionPolicy.

## MutatingAdmissionPolicySpec {#MutatingAdmissionPolicySpec}

MutatingAdmissionPolicySpec defines the desired behavior of the admission policy.

   | Field | Description

       | `failurePolicy`string
       | failurePolicy defines how to handle failures for the admission policy. Failures can occur from CEL expression parse errors, type check errors, runtime errors and invalid or mis-configured policy definitions or bindings.  A policy is invalid if paramKind refers to a non-existent Kind. A binding is invalid if paramRef.name refers to a non-existent resource.  failurePolicy does not define how validations that evaluate to false are handled.  Allowed values are Ignore or Fail. Defaults to Fail.Possible enum values: - `"Fail"` means that an error calling the webhook causes the admission to fail. - `"Ignore"` means that an error calling the webhook is ignored.

       | `matchConditions`MatchCondition arraypatch strategy: merge on key `name`
       | matchConditions is a list of conditions that must be met for a request to be validated. Match conditions filter requests that have already been matched by the matchConstraints. An empty list of matchConditions matches all requests. There are a maximum of 64 match conditions allowed.  If a parameter object is provided, it can be accessed via the `params` handle in the same manner as validation expressions.  The exact matching logic is (in order):   1. If ANY matchCondition evaluates to FALSE, the policy is skipped.   2. If ALL matchConditions evaluate to TRUE, the policy is evaluated.   3. If any matchCondition evaluates to an error (but none are FALSE):      - If failurePolicy=Fail, reject the request      - If failurePolicy=Ignore, the policy is skipped

       | `matchConstraints`MatchResources
       | matchConstraints specifies what resources this policy is designed to validate. The MutatingAdmissionPolicy cares about a request if it matches _all_ Constraints. However, in order to prevent clusters from being put into an unstable state that cannot be recovered from via the API MutatingAdmissionPolicy cannot match MutatingAdmissionPolicy and MutatingAdmissionPolicyBinding. The CREATE, UPDATE and CONNECT operations are allowed.  The DELETE operation may not be matched. '\*' matches CREATE, UPDATE and CONNECT. Required.

       | `mutations`Mutation array
       | mutations contain operations to perform on matching objects. mutations may not be empty; a minimum of one mutation is required. mutations are evaluated in order, and are reinvoked according to the reinvocationPolicy. The mutations of a policy are invoked for each binding of this policy and reinvocation of mutations occurs on a per binding basis.

       | `paramKind`ParamKind
       | paramKind specifies the kind of resources used to parameterize this policy. If absent, there are no parameters for this policy and the param CEL variable will not be provided to validation expressions. If paramKind refers to a non-existent kind, this policy definition is mis-configured and the FailurePolicy is applied. If paramKind is specified but paramRef is unset in MutatingAdmissionPolicyBinding, the params variable will be null.

       | `reinvocationPolicy`string
       | reinvocationPolicy indicates whether mutations may be called multiple times per MutatingAdmissionPolicyBinding as part of a single admission evaluation. Allowed values are "Never" and "IfNeeded".  Never: These mutations will not be called more than once per binding in a single admission evaluation.  IfNeeded: These mutations may be invoked more than once per binding for a single admission request and there is no guarantee of order with respect to other admission plugins, admission webhooks, bindings of this policy and admission policies.  Mutations are only reinvoked when mutations change the object after this mutation is invoked. Required.Possible enum values: - `"IfNeeded"` indicates that the mutation may be called at least one additional time as part of the admission evaluation if the object being admitted is modified by other admission plugins after the initial mutation call. - `"Never"` indicates that the mutation must not be called more than once in a single admission evaluation.

       | `variables`Variable array
       | variables contain definitions of variables that can be used in composition of other expressions. Each variable is defined as a named CEL expression. The variables defined here will be available under `variables` in other expressions of the policy except matchConditions because matchConditions are evaluated before the rest of the policy.  The expression of a variable can refer to other variables defined earlier in the list but not those after. Thus, variables must be sorted by the order of first appearance and acyclic.

## MutatingAdmissionPolicyList {#MutatingAdmissionPolicyList}

MutatingAdmissionPolicyList is a list of MutatingAdmissionPolicy.

   | Field | Description

       | `apiVersion`string
       | APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

       | `items` *MutatingAdmissionPolicy array
       | List of ValidatingAdmissionPolicy.

       | `kind`string
       | Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

       | `metadata`ListMeta
       | metadata is the standard list metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

## ApplyConfiguration {#ApplyConfiguration}

ApplyConfiguration defines the desired configuration values of an object.

   | Field | Description

       | `expression`string
       | expression will be evaluated by CEL to create an apply configuration. ref: https://github.com/google/cel-spec  Apply configurations are declared in CEL using object initialization. For example, this CEL expression returns an apply configuration to set a single field:  	Object{ 	  spec: Object.spec{ 	    serviceAccountName: "example" 	  } 	}  Apply configurations may not modify atomic structs, maps or arrays due to the risk of accidental deletion of values not included in the apply configuration.  CEL expressions have access to the object types needed to create apply configurations:  - 'Object' - CEL type of the resource object. - 'Object.\<fieldName>' - CEL type of object field (such as 'Object.spec') - 'Object.\<fieldName1>.\<fieldName2>...\<fieldNameN>` - CEL type of nested field (such as 'Object.spec.containers')  CEL expressions have access to the contents of the API request, organized into CEL variables as well as some other useful variables:  - 'object' - The object from the incoming request. The value is null for DELETE requests. - 'oldObject' - The existing object. The value is null for CREATE requests. - 'request' - Attributes of the API request(ref). - 'params' - Parameter resource referred to by the policy binding being evaluated. Only populated if the policy has a ParamKind. - 'namespaceObject' - The namespace object that the incoming object belongs to. The value is null for cluster-scoped resources. - 'variables' - Map of composited variables, from its name to its lazily evaluated value.   For example, a variable named 'foo' can be accessed as 'variables.foo'. - 'authorizer' - A CEL Authorizer. May be used to perform authorization checks for the principal (user or service account) of the request.   See https://pkg.go.dev/k8s.io/apiserver/pkg/cel/library#Authz - 'authorizer.requestResource' - A CEL ResourceCheck constructed from the 'authorizer' and configured with the   request resource.  The `apiVersion`, `kind`, `metadata.name` and `metadata.generateName` are always accessible from the root of the object. No other metadata properties are accessible.  Only property names of the form `a-zA-Z_.-/*` are accessible. Required.

## JSONPatch {#JSONPatch}

JSONPatch defines a JSON Patch.

   | Field | Description

       | `expression`string
       | expression will be evaluated by CEL to create a JSON patch. ref: https://github.com/google/cel-spec  expression must return an array of JSONPatch values.  For example, this CEL expression returns a JSON patch to conditionally modify a value:  	  [ 	    JSONPatch{op: "test", path: "/spec/example", value: "Red"}, 	    JSONPatch{op: "replace", path: "/spec/example", value: "Green"} 	  ]  To define an object for the patch value, use Object types. For example:  	  [ 	    JSONPatch{ 	      op: "add", 	      path: "/spec/selector", 	      value: Object.spec.selector{matchLabels: {"environment": "test"}} 	    } 	  ]  To use strings containing '/' and '~' as JSONPatch path keys, use "jsonpatch.escapeKey". For example:  	  [ 	    JSONPatch{ 	      op: "add", 	      path: "/metadata/labels/" + jsonpatch.escapeKey("example.com/environment"), 	      value: "test" 	    }, 	  ]  CEL expressions have access to the types needed to create JSON patches and objects:  - 'JSONPatch' - CEL type of JSON Patch operations. JSONPatch has the fields 'op', 'from', 'path' and 'value'.   See JSON patch for more details. The 'value' field may be set to any of: string,   integer, array, map or object.  If set, the 'path' and 'from' fields must be set to a   JSON pointer string, where the 'jsonpatch.escapeKey()' CEL   function may be used to escape path keys containing '/' and '~'. - 'Object' - CEL type of the resource object. - 'Object.\<fieldName>' - CEL type of object field (such as 'Object.spec') - 'Object.\<fieldName1>.\<fieldName2>...\<fieldNameN>` - CEL type of nested field (such as 'Object.spec.containers')  CEL expressions have access to the contents of the API request, organized into CEL variables as well as some other useful variables:  - 'object' - The object from the incoming request. The value is null for DELETE requests. - 'oldObject' - The existing object. The value is null for CREATE requests. - 'request' - Attributes of the API request(ref). - 'params' - Parameter resource referred to by the policy binding being evaluated. Only populated if the policy has a ParamKind. - 'namespaceObject' - The namespace object that the incoming object belongs to. The value is null for cluster-scoped resources. - 'variables' - Map of composited variables, from its name to its lazily evaluated value.   For example, a variable named 'foo' can be accessed as 'variables.foo'. - 'authorizer' - A CEL Authorizer. May be used to perform authorization checks for the principal (user or service account) of the request.   See https://pkg.go.dev/k8s.io/apiserver/pkg/cel/library#Authz - 'authorizer.requestResource' - A CEL ResourceCheck constructed from the 'authorizer' and configured with the   request resource.  CEL expressions have access to Kubernetes CEL function libraries as well as:  - 'jsonpatch.escapeKey' - Performs JSONPatch key escaping. '~' and  '/' are escaped as '~0' and `~1' respectively).  Only property names of the form `a-zA-Z_.-/*` are accessible. Required.

## Mutation {#Mutation}

Mutation specifies the CEL expression which is used to apply the Mutation.

   | Field | Description

       | `applyConfiguration`ApplyConfiguration
       | applyConfiguration defines the desired configuration values of an object. The configuration is applied to the admission object using structured merge diff. A CEL expression is used to create apply configuration.

       | `jsonPatch`JSONPatch
       | jsonPatch defines a JSON patch operation to perform a mutation to the object. A CEL expression is used to create the JSON patch.

       | `patchType` *string
       | patchType indicates the patch strategy used. Allowed values are "ApplyConfiguration" and "JSONPatch". Required.Possible enum values: - `"ApplyConfiguration"` ApplyConfiguration indicates that the mutation is using apply configuration to mutate the object. - `"JSONPatch"` JSONPatch indicates that the object is mutated through JSON Patch.
