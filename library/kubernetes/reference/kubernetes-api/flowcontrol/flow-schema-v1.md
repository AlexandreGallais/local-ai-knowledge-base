---
title: "FlowSchema (part 1 of 6)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/flowcontrol/flow-schema-v1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# FlowSchema

`apiVersion: flowcontrol.apiserver.k8s.io/v1`

`import "k8s.io/api/flowcontrol/v1"`

## FlowSchema {#FlowSchema}

FlowSchema defines the schema of a group of flows. Note that a flow is made up of a set of inbound API requests with similar attributes and is identified by a pair of strings: the name of the FlowSchema and a &#34;flow distinguisher&#34;.

   | Field | Description

       | `apiVersion`string
       | APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

       | `kind`string
       | Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

       | `metadata`ObjectMeta
       | `metadata` is the standard object's metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata

       | `spec` *FlowSchemaSpec
       | `spec` is the specification of the desired behavior of a FlowSchema. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status

       | `status`FlowSchemaStatus
       | `status` is the current status of a FlowSchema. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status

## FlowSchemaSpec {#FlowSchemaSpec}

FlowSchemaSpec describes how the FlowSchema's specification looks like.

   | Field | Description

       | `distinguisherMethod`FlowDistinguisherMethod
       | `distinguisherMethod` defines how to compute the flow distinguisher for requests that match this schema. `nil` specifies that the distinguisher is disabled and thus will always be the empty string.

       | `matchingPrecedence`integer
       | `matchingPrecedence` is used to choose among the FlowSchemas that match a given request. The chosen FlowSchema is among those with the numerically lowest (which we take to be logically highest) MatchingPrecedence.  Each MatchingPrecedence value must be ranged in [1,10000]. Note that if the precedence is not specified, it will be set to 1000 as default.

       | `priorityLevelConfiguration` *PriorityLevelConfigurationReference
       | `priorityLevelConfiguration` should reference a PriorityLevelConfiguration in the cluster. If the reference cannot be resolved, the FlowSchema will be ignored and marked as invalid in its status. Required.

       | `rules`PolicyRulesWithSubjects array
       | `rules` describes which requests will match this flow schema. This FlowSchema matches a request if and only if at least one member of rules matches the request. if it is an empty slice, there will be no requests matching the FlowSchema.

## FlowSchemaStatus {#FlowSchemaStatus}

FlowSchemaStatus represents the current state of a FlowSchema.

   | Field | Description

       | `conditions`FlowSchemaCondition arraypatch strategy: merge on key `type`
       | `conditions` is a list of the current states of FlowSchema.

## FlowSchemaList {#FlowSchemaList}

FlowSchemaList is a list of FlowSchema objects.

   | Field | Description

       | `apiVersion`string
       | APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

       | `items` *FlowSchema array
       | `items` is a list of FlowSchemas.

       | `kind`string
       | Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

       | `metadata`ListMeta
       | `metadata` is the standard list metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata

## FlowDistinguisherMethod {#FlowDistinguisherMethod}

FlowDistinguisherMethod specifies the method of a flow distinguisher.

   | Field | Description

       | `type` *string
       | `type` is the type of flow distinguisher method The supported types are "ByUser" and "ByNamespace". Required.

## FlowSchemaCondition {#FlowSchemaCondition}

FlowSchemaCondition describes conditions for a FlowSchema.

   | Field | Description

       | `lastTransitionTime`Time
       | `lastTransitionTime` is the last time the condition transitioned from one status to another.

       | `message`string
       | `message` is a human-readable message indicating details about last transition.

       | `reason`string
       | `reason` is a unique, one-word, CamelCase reason for the condition's last transition.

       | `status`string
       | `status` is the status of the condition. Should be specified and set to one of True, False, Unknown.

       | `type` *string
       | `type` is the type of the condition. Required.

## GroupSubject {#GroupSubject}

GroupSubject holds detailed information for group-kind subject.

   | Field | Description

       | `name` *string
       | name is the user group that matches, or "*" to match all user groups. See https://github.com/kubernetes/apiserver/blob/master/pkg/authentication/user/user.go for some well-known group names. Required.

## NonResourcePolicyRule {#NonResourcePolicyRule}

NonResourcePolicyRule is a predicate that matches non-resource requests according to their verb and the target non-resource URL. A NonResourcePolicyRule matches a request if and only if both (a) at least one member of verbs matches the request and (b) at least one member of nonResourceURLs matches the request.

   | Field | Description

       | `nonResourceURLs` *string array
       | `nonResourceURLs` is a set of url prefixes that a user should have access to and may not be empty. For example:   - "/healthz" is legal   - "/hea*" is illegal   - "/hea" is legal but matches nothing   - "/hea/*" also matches nothing   - "/healthz/*" matches all per-component health checks. "*" matches all non-resource urls. if it is present, it must be the only entry. Required.

       | `verbs` *string array
       | `verbs` is a list of matching verbs and may not be empty. "*" matches all verbs. If it is present, it must be the only entry. Required.

## PolicyRulesWithSubjects {#PolicyRulesWithSubjects}

PolicyRulesWithSubjects prescribes a test that applies to a request to an apiserver. The test considers the subject making the request, the verb being requested, and the resource to be acted upon. This PolicyRulesWithSubjects matches a request if and only if both (a) at least one member of subjects matches the request and (b) at least one member of resourceRules or nonResourceRules matches the request.

   | Field | Description

       | `nonResourceRules`NonResourcePolicyRule array
       | `nonResourceRules` is a list of NonResourcePolicyRules that identify matching requests according to their verb and the target non-resource URL.

       | `resourceRules`ResourcePolicyRule array
       | `resourceRules` is a slice of ResourcePolicyRules that identify matching requests according to their verb and the target resource. At least one of `resourceRules` and `nonResourceRules` has to be non-empty.

       | `subjects` *Subject array
       | subjects is the list of normal user, serviceaccount, or group that this rule cares about. There must be at least one member in this slice. A slice that includes both the system:authenticated and system:unauthenticated user groups matches every request. Required.

## PriorityLevelConfigurationReference {#PriorityLevelConfigurationReference}

PriorityLevelConfigurationReference contains information that points to the &#34;request-priority&#34; being used.

   | Field | Description

       | `name` *string
       | `name` is the name of the priority level configuration being referenced Required.

## ResourcePolicyRule {#ResourcePolicyRule}

ResourcePolicyRule is a predicate that matches some resource requests, testing the request's verb and the target resource. A ResourcePolicyRule matches a resource request if and only if: (a) at least one member of verbs matches the request, (b) at least one member of apiGroups matches the request, (c) at least one member of resources matches the request, and (d) either (d1) the request does not specify a namespace (i.e., `Namespace==&#34;&#34;`) and clusterScope is true or (d2) the request specifies a namespace and least one member of namespaces matches the request's namespace.

   | Field | Description

       | `apiGroups` *string array
       | `apiGroups` is a list of matching API groups and may not be empty. "*" matches all API groups and, if present, must be the only entry. Required.

       | `clusterScope`boolean
       | `clusterScope` indicates whether to match requests that do not specify a namespace (which happens either because the resource is not namespaced or the request targets all namespaces). If this field is omitted or false then the `namespaces` field must contain a non-empty list.

       | `namespaces`string array
       | `namespaces` is a list of target namespaces that restricts matches.  A request that specifies a target namespace matches only if either (a) this list contains that target namespace or (b) this list contains "*".  Note that "*" matches any specified namespace but does not match a request that _does not specify_ a namespace (see the `clusterScope` field for that). This list may be empty, but only if `clusterScope` is true.

       | `resources` *string array
       | `resources` is a list of matching resources (i.e., lowercase and plural) with, if desired, subresource.  For example, [ "services", "nodes/status" ].  This list may not be empty. "*" matches all resources and, if present, must be the only entry. Required.

       | `verbs` *string array
       | `verbs` is a list of matching verbs and may not be empty. "*" matches all verbs and, if present, must be the only entry. Required.

## ServiceAccountSubject {#ServiceAccountSubject}

ServiceAccountSubject holds detailed information for service-account-kind subject.

   | Field | Description

       | `name` *string
       | `name` is the name of matching ServiceAccount objects, or "*" to match regardless of name. Required.

       | `namespace` *string
       | `namespace` is the namespace of matching ServiceAccount objects. Required.

## Subject {#Subject}

Subject matches the originator of a request, as identified by the request authentication system. There are three ways of matching an originator; by user, group, or service account.

   | Field | Description

       | `group`GroupSubject
       | `group` matches based on user group name.

       | `kind` *string
       | `kind` indicates which one of the other fields is non-empty. Required

       | `serviceAccount`ServiceAccountSubject
       | `serviceAccount` matches ServiceAccounts.

       | `user`UserSubject
       | `user` matches based on username.

## UserSubject {#UserSubject}

UserSubject holds detailed information for user-kind subject.

   | Field | Description

       | `name` *string
       | `name` is the username that matches, or "*" to match all usernames. Required.
