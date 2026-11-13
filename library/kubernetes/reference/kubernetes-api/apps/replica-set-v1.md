---
title: "ReplicaSet (part 1 of 9)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/apps/replica-set-v1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# ReplicaSet

`apiVersion: apps/v1`

`import "k8s.io/api/apps/v1"`

## ReplicaSet {#ReplicaSet}

ReplicaSet ensures that a specified number of pod replicas are running at any given time.

   | Field | Description

       | `apiVersion`string
       | APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

       | `kind`string
       | Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

       | `metadata`ObjectMeta
       | If the Labels of a ReplicaSet are empty, they are defaulted to be the same as the Pod(s) that the ReplicaSet manages. Standard object's metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata

       | `spec` *ReplicaSetSpec
       | Spec defines the specification of the desired behavior of the ReplicaSet. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status

       | `status`ReplicaSetStatus
       | Status is the most recently observed status of the ReplicaSet. This data may be out of date by some window of time. Populated by the system. Read-only. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status

## ReplicaSetSpec {#ReplicaSetSpec}

ReplicaSetSpec is the specification of a ReplicaSet.

   | Field | Description

       | `minReadySeconds`integer
       | Minimum number of seconds for which a newly created pod should be ready without any of its container crashing, for it to be considered available. Defaults to 0 (pod will be considered available as soon as it is ready)

       | `replicas`integer
       | Replicas is the number of desired pods. This is a pointer to distinguish between explicit zero and unspecified. Defaults to 1. More info: https://kubernetes.io/docs/concepts/workloads/controllers/replicaset

       | `selector` *LabelSelector
       | Selector is a label query over pods that should match the replica count. Label keys and values that must match in order to be controlled by this replica set. It must match the pod template's labels. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/#label-selectors

       | `template`PodTemplateSpec
       | Template is the object that describes the pod that will be created if insufficient replicas are detected. More info: https://kubernetes.io/docs/concepts/workloads/controllers/replicaset/#pod-template

## ReplicaSetStatus {#ReplicaSetStatus}

ReplicaSetStatus represents the current status of a ReplicaSet.

   | Field | Description

       | `availableReplicas`integer
       | The number of available non-terminating pods (ready for at least minReadySeconds) for this replica set.

       | `conditions`ReplicaSetCondition arraypatch strategy: merge on key `type`
       | Represents the latest available observations of a replica set's current state.

       | `fullyLabeledReplicas`integer
       | The number of non-terminating pods that have labels matching the labels of the pod template of the replicaset.

       | `observedGeneration`integer
       | ObservedGeneration reflects the generation of the most recently observed ReplicaSet.

       | `readyReplicas`integer
       | The number of non-terminating pods targeted by this ReplicaSet with a Ready Condition.

       | `replicas` *integer
       | Replicas is the most recently observed number of non-terminating pods. More info: https://kubernetes.io/docs/concepts/workloads/controllers/replicaset

       | `terminatingReplicas`integer
       | The number of terminating pods for this replica set. Terminating pods have a non-null .metadata.deletionTimestamp and have not yet reached the Failed or Succeeded .status.phase.  This is a beta field and requires enabling DeploymentReplicaSetTerminatingReplicas feature (enabled by default).

## ReplicaSetList {#ReplicaSetList}

ReplicaSetList is a collection of ReplicaSets.

   | Field | Description

       | `apiVersion`string
       | APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

       | `items` *ReplicaSet array
       | List of ReplicaSets. More info: https://kubernetes.io/docs/concepts/workloads/controllers/replicaset

       | `kind`string
       | Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

       | `metadata`ListMeta
       | Standard list metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

## ReplicaSetCondition {#ReplicaSetCondition}

ReplicaSetCondition describes the state of a replica set at a certain point.

   | Field | Description

       | `lastTransitionTime`Time
       | The last time the condition transitioned from one status to another.

       | `message`string
       | A human readable message indicating details about the transition.

       | `reason`string
       | The reason for the condition's last transition.

       | `status`string
       | Status of the condition, one of True, False, Unknown.

       | `type`string
       | Type of replica set condition.
