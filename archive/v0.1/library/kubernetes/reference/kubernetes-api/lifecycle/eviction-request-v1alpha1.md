---
title: "EvictionRequest (part 1 of 8)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/lifecycle/eviction-request-v1alpha1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# EvictionRequest

`apiVersion: lifecycle.k8s.io/v1alpha1`

`import "k8s.io/api/lifecycle/v1alpha1"`

## EvictionRequest {#EvictionRequest}

EvictionRequest defines a request that should ideally result in a graceful eviction of a .spec.target (e.g. termination of a pod).

The evictionrequest-controller observes intents of all EvictionRequests and transforms them into Evictions.
  - .spec.requester is set as a label on the Eviction for easier lookup.
  - Each target can have a set of responders assigned to it. Eviction objects are observed by
    these responders, who implement the eviction logic and update the Eviction's status with
    progress.

There is many-to-many relationship between EvictionRequests and Evictions in general. And many-to-one if the target is a  pod.

If all requesters withdraw their eviction intent for a common target, the eviction will be canceled. Deleting an EvictionRequest also counts as a withdrawal. Once all EvictionRequest of a target are removed, the corresponding Evictions are eventually garbage collected.

   | Field | Description

       | `apiVersion`string
       | APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

       | `kind`string
       | Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

       | `metadata`ObjectMeta
       | metadata is the standard object metadata; More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata.

       | `spec` *EvictionRequestSpec
       | spec defines the eviction request specification. https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status

       | `status`EvictionRequestStatus
       | status represents the most recently observed status of the eviction request. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status

## EvictionRequestSpec {#EvictionRequestSpec}

EvictionRequestSpec is a specification of an EvictionRequest.

   | Field | Description

       | `intent` *string
       | intent specifies the action that should be taken for the specified target.  - Eviction means that the requester is interested in the eviction of the target. - Withdrawn means that the requester is no longer interested in the eviction of the target.   If all requesters' intents are withdrawn for a common target, the eviction will be canceled.   Cancellation consequences:   - Inactive responders will never run.   - Active responders are expected to cancel the eviction.   - Completed or Interrupted responders should not take any action.Possible enum values: - `"Eviction"` means that the requester is interested in the eviction of the target. - `"Withdrawn"` means that the requester is no longer interested in the eviction of the target. If all requesters' intents are withdrawn for a common target, the eviction will be canceled. Cancellation consequences: - Inactive responders will never run. - Active responders are expected to cancel the eviction. - Completed or Interrupted responders should not take any action.

       | `requester` *string
       | requester allows you to identify the entity, that requested the eviction of the target.  It must be a valid domain-prefixed key (such as "acme.io/foo"). Domain names *.k8s.io and *.kubernetes.io are reserved. This field is required and immutable.

       | `target` *EvictionRequestTarget
       | target contains a reference to an object (e.g. a pod) that should be evicted. This field is required and immutable.

## EvictionRequestStatus {#EvictionRequestStatus}

EvictionRequestStatus represents the last observed status of the eviction request.

   | Field | Description

       | `conditions`Condition arraypatch strategy: merge on key `type`
       | conditions contain information about the eviction request.  EvictionRequest specific conditions are: TargetEvicted or Failed (managed by evictionrequest-controller). - Failed means that the eviction request is no longer being processed   by any eviction responder. This can happen if the request is canceled or if no responder   managed to evict the target (e.g. terminate or delete a pod). - TargetEvicted means that the target has been evicted (e.g. a pod has been terminated or deleted).  These conditions can be reset if the eviction was unsuccessful and a new Eviction intent has been submitted.  The maximum length of the conditions list is 100.

       | `observedGeneration`integer
       | observedGeneration is EvictionRequest's .metadata.generation observed by the evictionrequest-controller. The observed generation value cannot be negative and can only be incremented. The minimum value is 1. This field is managed by evictionrequest-controller.

## EvictionRequestList {#EvictionRequestList}

EvictionRequestList contains a list of EvictionRequests resources.

   | Field | Description

       | `apiVersion`string
       | APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

       | `items` *EvictionRequest array
       | items is the list of EvictionRequests.

       | `kind`string
       | Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

       | `metadata`ListMeta
       | metadata is the standard list metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata

## EvictionRequestPodReference {#EvictionRequestPodReference}

EvictionRequestPodReference contains enough information to locate the referenced pod inside the same namespace.

   | Field | Description

       | `name` *string
       | name of the target. This field is required.

       | `uid` *string
       | uid of the target. It can be found in .metadata.uid of the target and is a lowercase UUID in 8-4-4-4-12 format. This field is required.

## EvictionRequestTarget {#EvictionRequestTarget}

EvictionRequestTarget contains a reference to an object that should be evicted.

   | Field | Description

       | `pod`EvictionRequestPodReference
       | pod references a pod that is subject to eviction/termination. Pods that are part of a PodGroup (.spec.schedulingGroup is set) are not supported.
