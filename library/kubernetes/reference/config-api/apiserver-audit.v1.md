---
title: "kube-apiserver Audit Configuration (v1)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/config-api/apiserver-audit.v1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# kube-apiserver Audit Configuration (v1)

## Resource Types

- Event
- EventList
- Policy
- PolicyList

## `Event`     {#audit-k8s-io-v1-Event}

**Appears in:**

- EventList

Event captures all the information that can be included in an API audit log.

 | Field | Description

 | `apiVersion`string | `audit.k8s.io/v1`

 | `kind`string | `Event`

 | `level` [Required]
`Level`

 |
   AuditLevel at which event was generated

 | `auditID` [Required]
`k8s.io/apimachinery/pkg/types.UID`

 |
   Unique audit ID, generated for each request.

 | `stage` [Required]
`Stage`

 |
   Stage of the request handling when this event instance was generated.

 | `requestURI` [Required]
`string`

 |
   RequestURI is the request URI as sent by the client to a server.

 | `verb` [Required]
`string`

 |
   Verb is the kubernetes verb associated with the request.
For non-resource requests, this is the lower-cased HTTP method.

 | `user` [Required]
`authentication/v1.UserInfo`

 |
   Authenticated user information.

 | `impersonatedUser`
`authentication/v1.UserInfo`

 |
   Impersonated user information.

 | `authenticationMetadata`
`AuthenticationMetadata`

 |
   AuthenticationMetadata contains details about how the request was authenticated.

 | `sourceIPs`
`[]string`

 |
   Source IPs, from where the request originated and intermediate proxies.
The source IPs are listed from (in order):

X-Forwarded-For request header IPs
X-Real-Ip header, if not present in the X-Forwarded-For list
The remote address for the connection, if it doesn't match the last
IP in the list up to here (X-Forwarded-For or X-Real-Ip).
Note: All but the last IP can be arbitrarily set by the client.

 | `userAgent`
`string`

 |
   UserAgent records the user agent string reported by the client.
Note that the UserAgent is provided by the client, and must not be trusted.

 | `objectRef`
`ObjectReference`

 |
   Object reference this request is targeted at.
Does not apply for List-type requests, or non-resource requests.

 | `responseStatus`
`meta/v1.Status`

 |
   The response status, populated even when the ResponseObject is not a Status type.
For successful responses, this will only include the Code and StatusSuccess.
For non-status type error responses, this will be auto-populated with the error Message.

 | `requestObject`
`k8s.io/apimachinery/pkg/runtime.Unknown`

 |
   API object from the request, in JSON format. The RequestObject is recorded as-is in the request
(possibly re-encoded as JSON), prior to version conversion, defaulting, admission or
merging. It is an external versioned object type, and may not be a valid object on its own.
Omitted for non-resource requests.  Only logged at Request Level and higher.

 | `responseObject`
`k8s.io/apimachinery/pkg/runtime.Unknown`

 |
   API object returned in the response, in JSON. The ResponseObject is recorded after conversion
to the external type, and serialized as JSON.  Omitted for non-resource requests.  Only logged
at Response Level.

 | `requestReceivedTimestamp`
`meta/v1.MicroTime`

 |
   Time the request reached the apiserver.

 | `stageTimestamp`
`meta/v1.MicroTime`

 |
   Time the request reached current audit stage.

 | `annotations`
`map[string]string`

 |
   Annotations is an unstructured key value map stored with an audit event that may be set by
plugins invoked in the request serving chain, including authentication, authorization and
admission plugins. Note that these annotations are for the audit event, and do not correspond
to the metadata.annotations of the submitted object. Keys should uniquely identify the informing
component to avoid name collisions (e.g. podsecuritypolicy.admission.k8s.io/policy). Values
should be short. Annotations are included in the Metadata level.

## `EventList`     {#audit-k8s-io-v1-EventList}

EventList is a list of audit Events.

 | Field | Description

 | `apiVersion`string | `audit.k8s.io/v1`

 | `kind`string | `EventList`

 | `metadata`
`meta/v1.ListMeta`

 |
   No description provided.

 | `items` [Required]
`[]Event`

 |
   No description provided.

## `Policy`     {#audit-k8s-io-v1-Policy}

**Appears in:**

- PolicyList

Policy defines the configuration of audit logging, and the rules for how different request
categories are logged.

 | Field | Description

 | `apiVersion`string | `audit.k8s.io/v1`

 | `kind`string | `Policy`

 | `metadata`
`meta/v1.ObjectMeta`

 |
   ObjectMeta is included for interoperability with API infrastructure.
Refer to the Kubernetes API documentation for the fields of the `metadata` field.

 | `rules` [Required]
`[]PolicyRule`

 |
   Rules specify the audit Level a request should be recorded at.
A request may match multiple rules, in which case the FIRST matching rule is used.
The default audit level is None, but can be overridden by a catch-all rule at the end of the list.
PolicyRules are strictly ordered.

 | `omitStages`
`[]Stage`

 |
   OmitStages is a list of stages for which no events are created. Note that this can also
be specified per rule in which case the union of both are omitted.

 | `omitManagedFields`
`bool`

 |
   OmitManagedFields indicates whether to omit the managed fields of the request
and response bodies from being written to the API audit log.
This is used as a global default - a value of 'true' will omit the managed fileds,
otherwise the managed fields will be included in the API audit log.
Note that this can also be specified per rule in which case the value specified
in a rule will override the global default.

## `PolicyList`     {#audit-k8s-io-v1-PolicyList}

PolicyList is a list of audit Policies.

 | Field | Description

 | `apiVersion`string | `audit.k8s.io/v1`

 | `kind`string | `PolicyList`

 | `metadata`
`meta/v1.ListMeta`

 |
   No description provided.

 | `items` [Required]
`[]Policy`

 |
   No description provided.

## `AuthenticationMetadata`     {#audit-k8s-io-v1-AuthenticationMetadata}

**Appears in:**

- Event

 | Field | Description

 | `impersonationConstraint`
`string`

 |
   ImpersonationConstraint is the verb associated with the constrained impersonation mode that was used to authorize
the ImpersonatedUser associated with this audit event.  It is only set when constrained impersonation was used.

## `GroupResources`     {#audit-k8s-io-v1-GroupResources}

**Appears in:**

- PolicyRule

GroupResources represents resource kinds in an API group.

 | Field | Description

 | `group`
`string`

 |
   Group is the name of the API group that contains the resources.
The empty string represents the core API group.
`*` matches all groups

 | `resources`
`[]string`

 |
   Resources is a list of resources this rule applies to.
For example:

`pods` matches pods.
`pods/log` matches the log subresource of pods.
`*` matches all resources and their subresources.
`pods/*` matches all subresources of pods.
`*/scale` matches all scale subresources.

If wildcard is present, the validation rule will ensure resources do not
overlap with each other.
An empty list implies all resources and subresources in this API groups apply.

 | `resourceNames`
`[]string`

 |
   ResourceNames is a list of resource instance names that the policy matches.
Using this field requires Resources to be specified.
An empty list implies that every instance of the resource is matched.

## `Level`     {#audit-k8s-io-v1-Level}

(Alias of `string`)

**Appears in:**

- Event

- PolicyRule

Level defines the amount of information logged during auditing

## `ObjectReference`     {#audit-k8s-io-v1-ObjectReference}

**Appears in:**

- Event

ObjectReference contains enough information to let you inspect or modify the referred object.

 | Field | Description

 | `resource`
`string`

 |
   No description provided.

 | `namespace`
`string`

 |
   No description provided.

 | `name`
`string`

 |
   No description provided.

 | `uid`
`k8s.io/apimachinery/pkg/types.UID`

 |
   No description provided.

 | `apiGroup`
`string`

 |
   APIGroup is the name of the API group that contains the referred object.
The empty string represents the core API group.

 | `apiVersion`
`string`

 |
   APIVersion is the version of the API group that contains the referred object.

 | `resourceVersion`
`string`

 |
   No description provided.

 | `subresource`
`string`

 |
   No description provided.

## `PolicyRule`     {#audit-k8s-io-v1-PolicyRule}

**Appears in:**

- Policy

PolicyRule maps requests based off metadata to an audit Level.
Requests must match the rules of every field (an intersection of rules).

 | Field | Description

 | `level` [Required]
`Level`

 |
   The Level that requests matching this rule are recorded at.

 | `users`
`[]string`

 |
   The users (by authenticated user name) this rule applies to.
An empty list implies every user.

 | `userGroups`
`[]string`

 |
   The user groups this rule applies to. A user is considered matching
if it is a member of any of the UserGroups.
An empty list implies every user group.

 | `verbs`
`[]string`

 |
   The verbs that match this rule.
An empty list implies every verb.

 | `resources`
`[]GroupResources`

 |
   Resources that this rule matches. An empty list implies all kinds in all API groups.

 | `namespaces`
`[]string`

 |
   Namespaces that this rule matches.
The empty string "" matches non-namespaced resources.
An empty list implies every namespace.

 | `nonResourceURLs`
`[]string`

 |
   NonResourceURLs is a set of URL paths that should be audited.
`*`s are allowed, but only as the full, final step in the path.
Examples:

`/metrics` - Log requests for apiserver metrics
`/healthz*` - Log all health checks

 | `omitStages`
`[]Stage`

 |
   OmitStages is a list of stages for which no events are created. Note that this can also
be specified policy wide in which case the union of both are omitted.
An empty list means no restrictions will apply.

 | `omitManagedFields`
`bool`

 |
   OmitManagedFields indicates whether to omit the managed fields of the request
and response bodies from being written to the API audit log.

a value of 'true' will drop the managed fields from the API audit log
a value of 'false' indicates that the managed fileds should be included
in the API audit log
Note that the value, if specified, in this rule will override the global default
If a value is not specified then the global default specified in
Policy.OmitManagedFields will stand.

## `Stage`     {#audit-k8s-io-v1-Stage}

(Alias of `string`)

**Appears in:**

- Event

- Policy

- PolicyRule

Stage defines the stages in request handling that audit events may be generated.
