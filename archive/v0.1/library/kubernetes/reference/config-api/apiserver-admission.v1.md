---
title: "kube-apiserver Admission (v1)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/config-api/apiserver-admission.v1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# kube-apiserver Admission (v1)

## Resource Types

- AdmissionReview

## `AdmissionReview`     {#admission-k8s-io-v1-AdmissionReview}

AdmissionReview describes an admission review request/response.

 | Field | Description

 | `apiVersion`string | `admission.k8s.io/v1`

 | `kind`string | `AdmissionReview`

 | `request`
`AdmissionRequest`

 |
   request describes the attributes for the admission request.

 | `response`
`AdmissionResponse`

 |
   response describes the attributes for the admission response.

## `AdmissionRequest`     {#admission-k8s-io-v1-AdmissionRequest}

**Appears in:**

- AdmissionReview

AdmissionRequest describes the admission.Attributes for the admission request.

 | Field | Description

 | `uid`
`k8s.io/apimachinery/pkg/types.UID`

 |
   uid is an identifier for the individual request/response. It allows us to distinguish instances of requests which are
otherwise identical (parallel requests, requests when earlier requests did not modify etc)
The UID is meant to track the round trip (request/response) between the KAS and the WebHook, not the user request.
It is suitable for correlating log entries between the webhook and apiserver, for either auditing or debugging.

 | `kind`
`meta/v1.GroupVersionKind`

 |
   kind is the fully-qualified type of object being submitted (for example, v1.Pod or autoscaling.v1.Scale)

 | `resource`
`meta/v1.GroupVersionResource`

 |
   resource is the fully-qualified resource being requested (for example, v1.pods)

 | `subResource`
`string`

 |
   subResource is the subresource being requested, if any (for example, "status" or "scale")

 | `requestKind`
`meta/v1.GroupVersionKind`

 |
   requestKind is the fully-qualified type of the original API request (for example, v1.Pod or autoscaling.v1.Scale).
If this is specified and differs from the value in "kind", an equivalent match and conversion was performed.
For example, if deployments can be modified via apps/v1 and apps/v1beta1, and a webhook registered a rule of
`apiGroups:["apps"], apiVersions:["v1"], resources: ["deployments"]` and `matchPolicy: Equivalent`,
an API request to apps/v1beta1 deployments would be converted and sent to the webhook
with `kind: {group:"apps", version:"v1", kind:"Deployment"}` (matching the rule the webhook registered for),
and `requestKind: {group:"apps", version:"v1beta1", kind:"Deployment"}` (indicating the kind of the original API request).
See documentation for the "matchPolicy" field in the webhook configuration type for more details.

 | `requestResource`
`meta/v1.GroupVersionResource`

 |
   requestResource is the fully-qualified resource of the original API request (for example, v1.pods).
If this is specified and differs from the value in "resource", an equivalent match and conversion was performed.
For example, if deployments can be modified via apps/v1 and apps/v1beta1, and a webhook registered a rule of
`apiGroups:["apps"], apiVersions:["v1"], resources: ["deployments"]` and `matchPolicy: Equivalent`,
an API request to apps/v1beta1 deployments would be converted and sent to the webhook
with `resource: {group:"apps", version:"v1", resource:"deployments"}` (matching the resource the webhook registered for),
and `requestResource: {group:"apps", version:"v1beta1", resource:"deployments"}` (indicating the resource of the original API request).
See documentation for the "matchPolicy" field in the webhook configuration type.

 | `requestSubResource`
`string`

 |
   requestSubResource is the name of the subresource of the original API request, if any (for example, "status" or "scale")
If this is specified and differs from the value in "subResource", an equivalent match and conversion was performed.
See documentation for the "matchPolicy" field in the webhook configuration type.

 | `name`
`string`

 |
   name is the name of the object as presented in the request.  On a CREATE operation, the client may omit name and
rely on the server to generate the name.  If that is the case, this field will contain an empty string.

 | `namespace`
`string`

 |
   namespace is the namespace associated with the request (if any).

 | `operation`
`Operation`

 |
   operation is the operation being performed. This may be different than the operation
requested. e.g. a patch can result in either a CREATE or UPDATE Operation.

 | `userInfo`
`authentication/v1.UserInfo`

 |
   userInfo is information about the requesting user

 | `object`
`k8s.io/apimachinery/pkg/runtime.RawExtension`

 |
   object is the object from the incoming request.

 | `oldObject`
`k8s.io/apimachinery/pkg/runtime.RawExtension`

 |
   oldObject is the existing object. Only populated for DELETE and UPDATE requests.

 | `dryRun`
`bool`

 |
   dryRun indicates that modifications will definitely not be persisted for this request.
Defaults to false.

 | `options`
`k8s.io/apimachinery/pkg/runtime.RawExtension`

 |
   options is the operation option structure of the operation being performed.
e.g. `meta.k8s.io/v1.DeleteOptions` or `meta.k8s.io/v1.CreateOptions`. This may be
different than the options the caller provided. e.g. for a patch request the performed
Operation might be a CREATE, in which case the Options will a
`meta.k8s.io/v1.CreateOptions` even though the caller provided `meta.k8s.io/v1.PatchOptions`.

## `AdmissionResponse`     {#admission-k8s-io-v1-AdmissionResponse}

**Appears in:**

- AdmissionReview

AdmissionResponse describes an admission response.

 | Field | Description

 | `uid`
`k8s.io/apimachinery/pkg/types.UID`

 |
   uid is an identifier for the individual request/response.
This must be copied over from the corresponding AdmissionRequest.

 | `allowed`
`bool`

 |
   allowed indicates whether or not the admission request was permitted.

 | `status`
`meta/v1.Status`

 |
   status is the result contains extra details into why an admission request was denied.
This field IS NOT consulted in any way if "Allowed" is "true".

 | `patch`
`[]byte`

 |
   patch is the patch body. Currently we only support "JSONPatch" which implements RFC 6902.

 | `patchType`
`PatchType`

 |
   patchType is the type of Patch. Currently we only allow "JSONPatch".

 | `auditAnnotations`
`map[string]string`

 |
   auditAnnotations is an unstructured key value map set by remote admission controller (e.g. error=image-blacklisted).
MutatingAdmissionWebhook and ValidatingAdmissionWebhook admission controller will prefix the keys with
admission webhook name (e.g. imagepolicy.example.com/error=image-blacklisted). AuditAnnotations will be provided by
the admission webhook to add additional context to the audit log for this request.

 | `warnings`
`[]string`

 |
   warnings is a list of warning messages to return to the requesting API client.
Warning messages describe a problem the client making the API request should correct or be aware of.
Limit warnings to 120 characters if possible.
Warnings over 256 characters and large numbers of warnings may be truncated.

## `Operation`     {#admission-k8s-io-v1-Operation}

(Alias of `string`)

**Appears in:**

- AdmissionRequest

Operation is the type of resource operation being checked for admission control

## `PatchType`     {#admission-k8s-io-v1-PatchType}

(Alias of `string`)

**Appears in:**

- AdmissionResponse

PatchType is the type of patch being used to represent the mutated object
