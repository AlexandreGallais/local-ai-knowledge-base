---
title: "PersistentVolumeClaim (part 2 of 9)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/core/persistent-volume-claim-v1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# PersistentVolumeClaim (part 2 of 9)

## PersistentVolumeClaimCondition {#PersistentVolumeClaimCondition}

PersistentVolumeClaimCondition contains details about state of pvc

   | Field | Description

       | `lastProbeTime`Time
       | lastProbeTime is the time we probed the condition.

       | `lastTransitionTime`Time
       | lastTransitionTime is the time the condition transitioned from one status to another.

       | `message`string
       | message is the human-readable message indicating details about last transition.

       | `reason`string
       | reason is a unique, this should be a short, machine understandable string that gives the reason for condition's last transition. If it reports "Resizing" that means the underlying persistent volume is being resized.

       | `status` *string
       | Status is the status of the condition. Can be True, False, Unknown. More info: https://kubernetes.io/docs/reference/kubernetes-api/config-and-storage-resources/persistent-volume-claim-v1/#:~:text=state%20of%20pvc-,conditions.status,-(string)%2C%20required

       | `type` *string
       | Type is the type of the condition. More info: https://kubernetes.io/docs/reference/kubernetes-api/config-and-storage-resources/persistent-volume-claim-v1/#:~:text=set%20to%20%27ResizeStarted%27.-,PersistentVolumeClaimCondition,-contains%20details%20about

## TypedObjectReference {#TypedObjectReference}

TypedObjectReference contains enough information to let you locate the typed referenced object

   | Field | Description

       | `apiGroup`string
       | APIGroup is the group for the resource being referenced. If APIGroup is not specified, the specified Kind must be in the core API group. For any other third-party types, APIGroup is required.

       | `kind` *string
       | Kind is the type of resource being referenced

       | `name` *string
       | Name is the name of resource being referenced

       | `namespace`string
       | Namespace is the namespace of resource being referenced Note that when a namespace is specified, a gateway.networking.k8s.io/ReferenceGrant object is required in the referent namespace to allow that namespace's owner to accept the reference. See the ReferenceGrant documentation for details. (Alpha) This field requires the CrossNamespaceVolumeDataSource feature gate to be enabled.

## VolumeHealthStatus {#VolumeHealthStatus}

VolumeHealthStatus contains health information for a volume reported by the CSI controller plugin.

   | Field | Description

       | `healthConditions`VolumeHealthCondition arraypatch strategy: merge on key `status`
       | conditions is the set of adverse conditions reported by the CSI controller plugin. An empty list means no adverse condition. At most 16 conditions may be reported.

       | `lastTransitionTime`Time
       | lastTransitionTime is when the current set of conditions first appeared.

## VolumeResourceRequirements {#VolumeResourceRequirements}

VolumeResourceRequirements describes the storage resource requirements for a volume.

   | Field | Description

       | `limits`object
       | Limits describes the maximum amount of compute resources allowed. More info: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/

       | `requests`object
       | Requests describes the minimum amount of compute resources required. If Requests is omitted for a container, it defaults to Limits if that is explicitly specified, otherwise to an implementation-defined value. Requests cannot exceed Limits. More info: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/
