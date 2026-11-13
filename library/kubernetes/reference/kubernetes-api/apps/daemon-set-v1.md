---
title: "DaemonSet (part 1 of 8)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/apps/daemon-set-v1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# DaemonSet

`apiVersion: apps/v1`

`import "k8s.io/api/apps/v1"`

## DaemonSet {#DaemonSet}

DaemonSet represents the configuration of a daemon set.

   | Field | Description

       | `apiVersion`string
       | APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

       | `kind`string
       | Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

       | `metadata`ObjectMeta
       | Standard object's metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata

       | `spec` *DaemonSetSpec
       | The desired behavior of this daemon set. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status

       | `status`DaemonSetStatus
       | The current status of this daemon set. This data may be out of date by some window of time. Populated by the system. Read-only. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status

## DaemonSetSpec {#DaemonSetSpec}

DaemonSetSpec is the specification of a daemon set.

   | Field | Description

       | `minReadySeconds`integer
       | The minimum number of seconds for which a newly created DaemonSet pod should be ready without any of its container crashing, for it to be considered available. Defaults to 0 (pod will be considered available as soon as it is ready).

       | `revisionHistoryLimit`integer
       | The number of old history to retain to allow rollback. This is a pointer to distinguish between explicit zero and not specified. Defaults to 10.

       | `selector` *LabelSelector
       | A label query over pods that are managed by the daemon set. Must match in order to be controlled. It must match the pod template's labels. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/#label-selectors

       | `template` *PodTemplateSpec
       | An object that describes the pod that will be created. The DaemonSet will create exactly one copy of this pod on every node that matches the template's node selector (or on every node if no node selector is specified). The only allowed template.spec.restartPolicy value is "Always". More info: https://kubernetes.io/docs/concepts/workloads/controllers/replicationcontroller#pod-template

       | `updateStrategy`DaemonSetUpdateStrategy
       | An update strategy to replace existing DaemonSet pods with new pods.

## DaemonSetStatus {#DaemonSetStatus}

DaemonSetStatus represents the current status of a daemon set.

   | Field | Description

       | `collisionCount`integer
       | Count of hash collisions for the DaemonSet. The DaemonSet controller uses this field as a collision avoidance mechanism when it needs to create the name for the newest ControllerRevision.

       | `conditions`DaemonSetCondition arraypatch strategy: merge on key `type`
       | Represents the latest available observations of a DaemonSet's current state.

       | `currentNumberScheduled` *integer
       | The number of nodes that are running at least 1 daemon pod and are supposed to run the daemon pod. More info: https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/

       | `desiredNumberScheduled` *integer
       | The total number of nodes that should be running the daemon pod (including nodes correctly running the daemon pod). More info: https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/

       | `numberAvailable`integer
       | The number of nodes that should be running the daemon pod and have one or more of the daemon pod running and available (ready for at least spec.minReadySeconds)

       | `numberMisscheduled` *integer
       | The number of nodes that are running the daemon pod, but are not supposed to run the daemon pod. More info: https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/

       | `numberReady` *integer
       | numberReady is the number of nodes that should be running the daemon pod and have one or more of the daemon pod running with a Ready Condition.

       | `numberUnavailable`integer
       | The number of nodes that should be running the daemon pod and have none of the daemon pod running and available (ready for at least spec.minReadySeconds)

       | `observedGeneration`integer
       | The most recent generation observed by the daemon set controller.

       | `updatedNumberScheduled`integer
       | The total number of nodes that are running updated daemon pod

## DaemonSetList {#DaemonSetList}

DaemonSetList is a collection of daemon sets.

   | Field | Description

       | `apiVersion`string
       | APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

       | `items` *DaemonSet array
       | A list of daemon sets.

       | `kind`string
       | Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

       | `metadata`ListMeta
       | Standard list metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata

## DaemonSetCondition {#DaemonSetCondition}

DaemonSetCondition describes the state of a DaemonSet at a certain point.

   | Field | Description

       | `lastTransitionTime`Time
       | Last time the condition transitioned from one status to another.

       | `message`string
       | A human readable message indicating details about the transition.

       | `reason`string
       | The reason for the condition's last transition.

       | `status`string
       | Status of the condition, one of True, False, Unknown.

       | `type`string
       | Type of DaemonSet condition.

## DaemonSetUpdateStrategy {#DaemonSetUpdateStrategy}

DaemonSetUpdateStrategy is a struct used to control the update strategy for a DaemonSet.

   | Field | Description

       | `rollingUpdate`RollingUpdateDaemonSet
       | Rolling update config params. Present only if type = "RollingUpdate".

       | `rollingUpdate.maxSurge`
       | The maximum number of nodes with an existing available DaemonSet pod that can have an updated DaemonSet pod during during an update. Value can be an absolute number (ex: 5) or a percentage of desired pods (ex: 10%). This can not be 0 if MaxUnavailable is 0. Absolute number is calculated from percentage by rounding up to a minimum of 1. Default value is 0. Example: when this is set to 30%, at most 30% of the total number of nodes that should be running the daemon pod (i.e. status.desiredNumberScheduled) can have their a new pod created before the old pod is marked as deleted. The update starts by launching new pods on 30% of nodes. Once an updated pod is available (Ready for at least minReadySeconds) the old DaemonSet pod on that node is marked deleted. If the old pod becomes unavailable for any reason (Ready transitions to false, is evicted, or is drained) an updated pod is immediately created on that node without considering surge limits. Allowing surge implies the possibility that the resources consumed by the daemonset on any given node can double if the readiness check fails, and so resource intensive daemonsets should take into account that they may cause evictions during disruption.

       | `rollingUpdate.maxUnavailable`
       | The maximum number of DaemonSet pods that can be unavailable during the update. Value can be an absolute number (ex: 5) or a percentage of total number of DaemonSet pods at the start of the update (ex: 10%). Absolute number is calculated from percentage by rounding up. This cannot be 0 if MaxSurge is 0 Default value is 1. Example: when this is set to 30%, at most 30% of the total number of nodes that should be running the daemon pod (i.e. status.desiredNumberScheduled) can have their pods stopped for an update at any given time. The update starts by stopping at most 30% of those DaemonSet pods and then brings up new DaemonSet pods in their place. Once the new pods are available, it then proceeds onto other DaemonSet pods, thus ensuring that at least 70% of original number of DaemonSet pods are available at all times during the update.

       | `type`string
       | Type of daemon set update. Can be "RollingUpdate" or "OnDelete". Default is RollingUpdate.Possible enum values: - `"OnDelete"` Replace the old daemons only when it's killed - `"RollingUpdate"` Replace the old daemons by new ones using rolling update i.e replace them on each node one after the other.
