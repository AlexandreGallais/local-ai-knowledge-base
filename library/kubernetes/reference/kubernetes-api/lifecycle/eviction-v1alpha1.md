---
title: "Eviction (part 1 of 9)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/lifecycle/eviction-v1alpha1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Eviction

`apiVersion: lifecycle.k8s.io/v1alpha1`

`import "k8s.io/api/lifecycle/v1alpha1"`

## Eviction {#Eviction}

Eviction initiates an eviction process, which should ideally result in a graceful eviction of a .spec.target (e.g. termination of a pod).

The evictionrequest-controller observes intents of all EvictionRequests and transforms them into Evictions. It manages the Eviction lifecycle. Requesters are preserved in .status.requesters even after they have withdrawn their request. If all requesters withdraw their eviction intent for a common target, the eviction will be canceled. Once all EvictionRequest corresponding to this Eviction .spec.target have been removed, this Eviction object will eventually be garbage collected.

If the target is a pod, the .status.targetResponders is populated from Pod's .spec.evictionResponders.

Responders should observe and communicate through the .status to help with the eviction of the target when they see their state == Active in .status.targetResponders. ResponderStatus struct should then be periodically updated to indicate the progress or completion of the eviction process by each responder in .status.responders. If .status.responders[].heartbeatTime is not updated within the heartbeat deadline defined by the Eviction API (currently 20 minutes), the eviction is passed over to the next responder with a lower priority.

If there are no other responders and the target is a pod, the last default imperative-eviction.k8s.io/evictor responder with a priority of 100 will evict the pod using the imperative Eviction API (pods/<name>/eviction subresource).

   | Field | Description

       | `apiVersion`string
       | APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

       | `kind`string
       | Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

       | `metadata`ObjectMeta
       | metadata is the standard object metadata; More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata. .metadata.name set by the evictionrequest-controller is purely informative and subject to change. .spec.target field should be used to identify the target precisesly.  The requester and responder names will be used as label keys and added to the labels of the eviction in one of the following formats: 1. acme.io/foo: "requester" 2. acme.io/foo: "responder" 3. acme.io/foo: "requester-responder"  Please see EvictionParticipantRole for available role label values.

       | `spec` *EvictionSpec
       | spec defines the eviction specification. https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status

       | `status`EvictionStatus
       | status represents the most recently observed status of the eviction. Populated by responders and evictionrequest-controller. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status

## EvictionSpec {#EvictionSpec}

EvictionSpec is a specification of an Eviction.

   | Field | Description

       | `target` *EvictionTarget
       | target contains a reference to an object (e.g. a pod) that should be evicted. This field is required and immutable.

## EvictionStatus {#EvictionStatus}

EvictionStatus represents the last observed status of the eviction request.

   | Field | Description

       | `conditions`Condition arraypatch strategy: merge on key `type`
       | conditions contain information about the eviction request.  Eviction specific conditions are: TargetEvicted or Failed (managed by evictionrequest-controller). - Failed means that the eviction request is no longer being processed   by any eviction responder. This can happen if the request is canceled or if no responder   managed to evict the target (e.g. terminate or delete a pod). - TargetEvicted means that the target has been evicted (e.g. a pod has been terminated or deleted).  	The maximum length of the conditions list is 100.

       | `observedGeneration`integer
       | observedGeneration is Eviction's .metadata.generation observed by the evictionrequest-controller. The observed generation value cannot be negative and can only be incremented. The minimum value is 1. This field is managed by evictionrequest-controller.

       | `requesters`Requester arraypatch strategy: merge on key `name`
       | requesters allow you to identify the entities, that requested the eviction of the target. If all the requesters withdraw their eviction intent, the eviction will be canceled.  The maximum length of the requesters list is 100. If this limit is exceeded, requesters with Withdrawn intent should be dropped first.

       | `responders`ResponderStatus arraypatch strategy: merge on key `name`
       | responders represents the eviction process status of each declared responder.  The responder list should be the same length and have the same .name fields as .status.targetResponders. Only responders with .name that have Active state in .targetResponders[].state should be updated and can be mutated. First initialization of the list is allowed.  Each ResponderStatus is initialized by evictionrequest-controller and then managed by the designated responder.

       | `targetResponders`TargetResponder arraypatch strategy: merge on key `name`
       | targetResponders reference responders that should eventually respond to this eviction to help with the graceful eviction of a target. These responders are selected sequentially, according to their specified priority by setting the Active state to the TargetResponder .state field. The maximum number of active responders allowed is 1. Eventually each responder can end up in an Interrupted, Canceled or, Completed state. Responders should observe these states in order to navigate their lifecycle.  If the target is a pod, the field is populated from Pod's .spec.evictionResponders. Default responders may be added to the list according to the target.  Default responders: - imperative-eviction.k8s.io/evictor responder with a priority of 100 is added to the list if the   target is a pod. It will call the imperative Eviction API (pods/\<name>/eviction subresource).   This call may not succeed due to PodDisruptionBudgets, which may block the pod termination.   It will update the responder message and try again with a backoff.  The maximum length of the responders list is 11. The length and keys of the list cannot change once set. This field is managed by evictionrequest-controller.

## EvictionList {#EvictionList}

EvictionList contains a list of Eviction resources.

   | Field | Description

       | `apiVersion`string
       | APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

       | `items` *Eviction array
       | items is the list of Evictions.

       | `kind`string
       | Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

       | `metadata`ListMeta
       | metadata is the standard list metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata

## EvictionPodReference {#EvictionPodReference}

EvictionPodReference contains enough information to locate the referenced pod inside the same namespace.

   | Field | Description

       | `name` *string
       | name of the target. This field is required.

       | `uid` *string
       | uid of the target. It can be found in .metadata.uid of the target and is a lowercase UUID in 8-4-4-4-12 format. This field is required.

## EvictionTarget {#EvictionTarget}

EvictionTarget contains a reference to an object that should be evicted.

   | Field | Description

       | `pod`EvictionPodReference
       | pod references a pod that is subject to eviction/termination. Pods that are part of a PodGroup (.spec.schedulingGroup is set) are not supported.

## Requester {#Requester}

Requester allows you to identify the entity, that requested the eviction of the target.

   | Field | Description

       | `intent` *string
       | intent specifies the action that should be taken for the specified target.  - Eviction means that the requester is interested in the eviction of the target. - Withdrawn means that the requester is no longer interested in the eviction of the target.   If all requesters' intents are withdrawn, the eviction will be canceled.   Cancellation consequences:   - Inactive responders will never run.   - Active responders are expected to cancel the eviction.   - Completed or Interrupted responders should not take any action.Possible enum values: - `"Eviction"` means that the requester is interested in the eviction of the target. - `"Withdrawn"` means that the requester is no longer interested in the eviction of the target. If all requesters' intents are withdrawn, the eviction will be canceled. Cancellation consequences: - Inactive responders will never run. - Active responders are expected to cancel the eviction. - Completed or Interrupted responders should not take any action.

       | `name` *string
       | name allows you to identify the entity, that requested the eviction of the target.  It must be a valid domain-prefixed key (such as "acme.io/foo"). This field must be unique for each requester. This field is required.

## ResponderStatus {#ResponderStatus}

ResponderStatus represents the last observed status of the eviction process of the responder. It should be only updated by the designated responder whose name is .name field.

   | Field | Description

       | `completionTime`Time
       | completionTime tracks the time at which the Responder stopped processing the eviction request. Completion means that the responders has either fully or partially completed the eviction process, which may have resulted in target eviction (e.g. pod termination). It should reflect the present time when set. This field becomes immutable once set.

       | `expectedCompletionTime`Time
       | expectedCompletionTime is the time at which the eviction process step is expected to end for the responder. The time cannot be set to the past. May be omitted if no estimate can be made.

       | `heartbeatTime`Time
       | heartbeatTime is the last time at which the eviction process was reported to be in progress by the responder. It should reflect the present time when set. Responders should avoid heartbeats more frequent than 20 seconds to avoid overloading the control-plane.

       | `message`string
       | message provides human-readable details about the state of the responder and the eviction process. Maximum length is 4000 characters.

       | `name` *string
       | name allows you to identify the responder reacting to the Eviction.  It must be a valid domain-prefixed key (such as "acme.io/foo"). This field is initialized by Kubernetes and must be unique for each responder. This field is required.

       | `startTime`Time
       | startTime tracks the time at which this responder was designated as active and should start processing the eviction request. It should reflect the present time when set. This field is initialized by Kubernetes when this responder becomes active. This field becomes immutable once set.
