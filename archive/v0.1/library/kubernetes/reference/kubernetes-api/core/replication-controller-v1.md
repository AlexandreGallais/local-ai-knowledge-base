---
title: "ReplicationController (part 1 of 9)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/core/replication-controller-v1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# ReplicationController

`apiVersion: v1`

`import "k8s.io/api/core/v1"`

## ReplicationController {#ReplicationController}

ReplicationController represents the configuration of a replication controller.

   | Field | Description

       | `apiVersion`string
       | APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

       | `kind`string
       | Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

       | `metadata`ObjectMeta
       | If the Labels of a ReplicationController are empty, they are defaulted to be the same as the Pod(s) that the replication controller manages. Standard object's metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata

       | `spec`ReplicationControllerSpec
       | Spec defines the specification of the desired behavior of the replication controller. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status

       | `status`ReplicationControllerStatus
       | Status is the most recently observed status of the replication controller. This data may be out of date by some window of time. Populated by the system. Read-only. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status

## ReplicationControllerSpec {#ReplicationControllerSpec}

ReplicationControllerSpec is the specification of a replication controller.

   | Field | Description

       | `minReadySeconds`integer
       | Minimum number of seconds for which a newly created pod should be ready without any of its container crashing, for it to be considered available. Defaults to 0 (pod will be considered available as soon as it is ready)

       | `replicas`integer
       | Replicas is the number of desired replicas. This is a pointer to distinguish between explicit zero and unspecified. Defaults to 1. More info: https://kubernetes.io/docs/concepts/workloads/controllers/replicationcontroller#what-is-a-replicationcontroller

       | `selector`object
       | Selector is a label query over pods that should match the Replicas count. If Selector is empty, it is defaulted to the labels present on the Pod template. Label keys and values that must match in order to be controlled by this replication controller, if empty defaulted to labels on Pod template. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/#label-selectors

       | `template`PodTemplateSpec
       | Template is the object that describes the pod that will be created if insufficient replicas are detected. This takes precedence over a TemplateRef. The only allowed template.spec.restartPolicy value is "Always". More info: https://kubernetes.io/docs/concepts/workloads/controllers/replicationcontroller#pod-template

## ReplicationControllerStatus {#ReplicationControllerStatus}

ReplicationControllerStatus represents the current status of a replication controller.

   | Field | Description

       | `availableReplicas`integer
       | The number of available replicas (ready for at least minReadySeconds) for this replication controller.

       | `conditions`ReplicationControllerCondition arraypatch strategy: merge on key `type`
       | Represents the latest available observations of a replication controller's current state.

       | `fullyLabeledReplicas`integer
       | The number of pods that have labels matching the labels of the pod template of the replication controller.

       | `observedGeneration`integer
       | ObservedGeneration reflects the generation of the most recently observed replication controller.

       | `readyReplicas`integer
       | The number of ready replicas for this replication controller.

       | `replicas` *integer
       | Replicas is the most recently observed number of replicas. More info: https://kubernetes.io/docs/concepts/workloads/controllers/replicationcontroller#what-is-a-replicationcontroller

## ReplicationControllerList {#ReplicationControllerList}

ReplicationControllerList is a collection of replication controllers.

   | Field | Description

       | `apiVersion`string
       | APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

       | `items` *ReplicationController array
       | List of replication controllers. More info: https://kubernetes.io/docs/concepts/workloads/controllers/replicationcontroller

       | `kind`string
       | Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

       | `metadata`ListMeta
       | Standard list metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

## ReplicationControllerCondition {#ReplicationControllerCondition}

ReplicationControllerCondition describes the state of a replication controller at a certain point.

   | Field | Description

       | `lastTransitionTime`Time
       | The last time the condition transitioned from one status to another.

       | `message`string
       | A human readable message indicating details about the transition.

       | `reason`string
       | The reason for the condition's last transition.

       | `status` *string
       | Status of the condition, one of True, False, Unknown.

       | `type` *string
       | Type of replication controller condition.
