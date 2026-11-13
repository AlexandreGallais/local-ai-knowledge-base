---
title: "StatefulSet (part 1 of 9)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/apps/stateful-set-v1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# StatefulSet

`apiVersion: apps/v1`

`import "k8s.io/api/apps/v1"`

## StatefulSet {#StatefulSet}

StatefulSet represents a set of pods with consistent identities. Identities are defined as:
  - Network: A single stable DNS and hostname.
  - Storage: As many VolumeClaims as requested.

The StatefulSet guarantees that a given network identity will always map to the same storage identity.

   | Field | Description

       | `apiVersion`string
       | APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

       | `kind`string
       | Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

       | `metadata`ObjectMeta
       | Standard object's metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata

       | `spec` *StatefulSetSpec
       | Spec defines the desired identities of pods in this set.

       | `status`StatefulSetStatus
       | Status is the current status of Pods in this StatefulSet. This data may be out of date by some window of time.

## StatefulSetSpec {#StatefulSetSpec}

A StatefulSetSpec is the specification of a StatefulSet.

   | Field | Description

       | `minReadySeconds`integer
       | Minimum number of seconds for which a newly created pod should be ready without any of its container crashing for it to be considered available. Defaults to 0 (pod will be considered available as soon as it is ready)

       | `ordinals`StatefulSetOrdinals
       | ordinals controls the numbering of replica indices in a StatefulSet. The default ordinals behavior assigns a "0" index to the first replica and increments the index by one for each additional replica requested.

       | `persistentVolumeClaimRetentionPolicy`StatefulSetPersistentVolumeClaimRetentionPolicy
       | persistentVolumeClaimRetentionPolicy describes the lifecycle of persistent volume claims created from volumeClaimTemplates. By default, all persistent volume claims are created as needed and retained until manually deleted. This policy allows the lifecycle to be altered, for example by deleting persistent volume claims when their stateful set is deleted, or when their pod is scaled down.

       | `podManagementPolicy`string
       | podManagementPolicy controls how pods are created during initial scale up, when replacing pods on nodes, or when scaling down. The default policy is `OrderedReady`, where pods are created in increasing order (pod-0, then pod-1, etc) and the controller will wait until each pod is ready before continuing. When scaling down, the pods are removed in the opposite order. The alternative policy is `Parallel` which will create pods in parallel to match the desired scale without waiting, and on scale down will delete all pods at once.Possible enum values: - `"OrderedReady"` will create pods in strictly increasing order on scale up and strictly decreasing order on scale down, progressing only when the previous pod is ready or terminated. At most one pod will be changed at any time. - `"Parallel"` will create and delete pods as soon as the stateful set replica count is changed, and will not wait for pods to be ready or complete termination.

       | `replicas`integer
       | replicas is the desired number of replicas of the given Template. These are replicas in the sense that they are instantiations of the same Template, but individual replicas also have a consistent identity. If unspecified, defaults to 1.

       | `revisionHistoryLimit`integer
       | revisionHistoryLimit is the maximum number of revisions that will be maintained in the StatefulSet's revision history. The revision history consists of all revisions not represented by a currently applied StatefulSetSpec version. The default value is 10.

       | `selector` *LabelSelector
       | selector is a label query over pods that should match the replica count. It must match the pod template's labels. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/#label-selectors

       | `serviceName`string
       | serviceName is the name of the service that governs this StatefulSet. This service must exist before the StatefulSet, and is responsible for the network identity of the set. Pods get DNS/hostnames that follow the pattern: pod-specific-string.serviceName.default.svc.cluster.local where "pod-specific-string" is managed by the StatefulSet controller.

       | `template` *PodTemplateSpec
       | template is the object that describes the pod that will be created if insufficient replicas are detected. Each pod stamped out by the StatefulSet will fulfill this Template, but have a unique identity from the rest of the StatefulSet. Each pod will be named with the format \<statefulsetname>-\<podindex>. For example, a pod in a StatefulSet named "web" with index number "3" would be named "web-3". The only allowed template.spec.restartPolicy value is "Always".

       | `updateStrategy`StatefulSetUpdateStrategy
       | updateStrategy indicates the StatefulSetUpdateStrategy that will be employed to update Pods in the StatefulSet when a revision is made to Template.

       | `volumeClaimTemplates`PersistentVolumeClaim array
       | volumeClaimTemplates is a list of claims that pods are allowed to reference. The StatefulSet controller is responsible for mapping network identities to claims in a way that maintains the identity of a pod. Every claim in this list must have at least one matching (by name) volumeMount in one container in the template. A claim in this list takes precedence over any volumes in the template, with the same name.

## StatefulSetStatus {#StatefulSetStatus}

StatefulSetStatus represents the current state of a StatefulSet.

   | Field | Description

       | `availableReplicas`integer
       | Total number of available pods (ready for at least minReadySeconds) targeted by this statefulset.

       | `collisionCount`integer
       | collisionCount is the count of hash collisions for the StatefulSet. The StatefulSet controller uses this field as a collision avoidance mechanism when it needs to create the name for the newest ControllerRevision.

       | `conditions`StatefulSetCondition arraypatch strategy: merge on key `type`
       | Represents the latest available observations of a statefulset's current state.

       | `currentReplicas`integer
       | currentReplicas is the number of Pods created by the StatefulSet controller from the StatefulSet version indicated by currentRevision.

       | `currentRevision`string
       | currentRevision, if not empty, indicates the version of the StatefulSet used to generate Pods in the sequence [0,currentReplicas).

       | `observedGeneration`integer
       | observedGeneration is the most recent generation observed for this StatefulSet. It corresponds to the StatefulSet's generation, which is updated on mutation by the API Server.

       | `readyReplicas`integer
       | readyReplicas is the number of pods created for this StatefulSet with a Ready Condition.

       | `replicas` *integer
       | replicas is the number of Pods created by the StatefulSet controller.

       | `updateRevision`string
       | updateRevision, if not empty, indicates the version of the StatefulSet used to generate Pods in the sequence [replicas-updatedReplicas,replicas)

       | `updatedReplicas`integer
       | updatedReplicas is the number of Pods created by the StatefulSet controller from the StatefulSet version indicated by updateRevision.

## StatefulSetList {#StatefulSetList}

StatefulSetList is a collection of StatefulSets.

   | Field | Description

       | `apiVersion`string
       | APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

       | `items` *StatefulSet array
       | Items is the list of stateful sets.

       | `kind`string
       | Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

       | `metadata`ListMeta
       | Standard list's metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata

## RollingUpdateStatefulSetStrategy {#RollingUpdateStatefulSetStrategy}

RollingUpdateStatefulSetStrategy is used to communicate parameter for RollingUpdateStatefulSetStrategyType.

   | Field | Description

       | `maxUnavailable`
       | The maximum number of pods that can be unavailable during the update. Value can be an absolute number (ex: 5) or a percentage of desired pods (ex: 10%). Absolute number is calculated from percentage by rounding up. This can not be 0. Defaults to 1. This field is beta-level and is enabled by default. The field applies to all pods in the range 0 to Replicas-1. That means if there is any unavailable pod in the range 0 to Replicas-1, it will be counted towards MaxUnavailable. This setting might not be effective for the OrderedReady podManagementPolicy. That policy ensures pods are created and become ready one at a time.

       | `partition`integer
       | Partition indicates the ordinal at which the StatefulSet should be partitioned for updates. During a rolling update, all pods from ordinal Replicas-1 to Partition are updated. All pods from ordinal Partition-1 to 0 remain untouched. This is helpful in being able to do a canary based deployment. The default value is 0.

## StatefulSetCondition {#StatefulSetCondition}

StatefulSetCondition describes the state of a statefulset at a certain point.

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
       | Type of statefulset condition.

## StatefulSetOrdinals {#StatefulSetOrdinals}

StatefulSetOrdinals describes the policy used for replica ordinal assignment in this StatefulSet.

   | Field | Description

       | `start`integer
       | start is the number representing the first replica's index. It may be used to number replicas from an alternate index (eg: 1-indexed) over the default 0-indexed names, or to orchestrate progressive movement of replicas from one StatefulSet to another. If set, replica indices will be in the range:   [.spec.ordinals.start, .spec.ordinals.start + .spec.replicas). If unset, defaults to 0. Replica indices will be in the range:   [0, .spec.replicas).

## StatefulSetPersistentVolumeClaimRetentionPolicy {#StatefulSetPersistentVolumeClaimRetentionPolicy}

StatefulSetPersistentVolumeClaimRetentionPolicy describes the policy used for PVCs created from the StatefulSet VolumeClaimTemplates.

   | Field | Description

       | `whenDeleted`string
       | WhenDeleted specifies what happens to PVCs created from StatefulSet VolumeClaimTemplates when the StatefulSet is deleted. The default policy of `Retain` causes PVCs to not be affected by StatefulSet deletion. The `Delete` policy causes those PVCs to be deleted.

       | `whenScaled`string
       | WhenScaled specifies what happens to PVCs created from StatefulSet VolumeClaimTemplates when the StatefulSet is scaled down. The default policy of `Retain` causes PVCs to not be affected by a scaledown. The `Delete` policy causes the associated PVCs for any excess pods above the replica count to be deleted.

## StatefulSetUpdateStrategy {#StatefulSetUpdateStrategy}

StatefulSetUpdateStrategy indicates the strategy that the StatefulSet controller will use to perform updates. It includes any additional parameters necessary to perform the update for the indicated strategy.

   | Field | Description

       | `rollingUpdate`RollingUpdateStatefulSetStrategy
       | RollingUpdate is used to communicate parameters when Type is RollingUpdateStatefulSetStrategyType.

       | `type`string
       | Type indicates the type of the StatefulSetUpdateStrategy. Default is RollingUpdate.Possible enum values: - `"OnDelete"` disables ordered rolling restarts. Version tracking is done on a best-effort basis - the controller will try to eventually converge StatefulSet's currentRevision with updateRevision. Pods are recreated from the StatefulSetSpec when they are manually deleted. When a scale operation is performed with this strategy, new Pods will be created from the specification version indicated by the StatefulSet's updateRevision. - `"Recreate"` indicates that all existing pods will be deleted and fully terminated before any new-revision pods are created. This ensures that old and new revision Pods never run at the same time. This is an alpha type and requires enabling StatefulSetRecreateStrategy feature gate. Switching to the Recreate strategy is allowed when the feature gate is enabled, and switching away from it to a different update strategy is also allowed. +featureGate=StatefulSetRecreateStrategy - `"RollingUpdate"` indicates that update will be applied to all Pods in the StatefulSet with respect to the StatefulSet ordering constraints. When a scale operation is performed with this strategy, new Pods will be created from the specification version indicated by the StatefulSet's updateRevision.
