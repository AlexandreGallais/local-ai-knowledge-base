---
title: "Job (part 2 of 10)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/batch/job-v1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Job (part 2 of 10)

## JobStatus {#JobStatus}

JobStatus represents the current state of a Job.

   | Field | Description

       | `active`integer
       | The number of pending and running pods which are not terminating (without a deletionTimestamp). The value is zero for finished jobs.

       | `completedIndexes`string
       | completedIndexes holds the completed indexes when .spec.completionMode = "Indexed" in a text format. The indexes are represented as decimal integers separated by commas. The numbers are listed in increasing order. Three or more consecutive numbers are compressed and represented by the first and last element of the series, separated by a hyphen. For example, if the completed indexes are 1, 3, 4, 5 and 7, they are represented as "1,3-5,7".

       | `completionTime`Time
       | Represents time when the job was completed. It is not guaranteed to be set in happens-before order across separate operations. It is represented in RFC3339 form and is in UTC. The completion time is set when the job finishes successfully, and only then. The value cannot be updated or removed. The value indicates the same or later point in time as the startTime field.

       | `conditions`JobCondition arraypatch strategy: merge on key `type`
       | The latest available observations of an object's current state. When a Job fails, one of the conditions will have type "Failed" and status true. When a Job is suspended, one of the conditions will have type "Suspended" and status true; when the Job is resumed, the status of this condition will become false. When a Job is completed, one of the conditions will have type "Complete" and status true.  A job is considered finished when it is in a terminal condition, either "Complete" or "Failed". A Job cannot have both the "Complete" and "Failed" conditions. Additionally, it cannot be in the "Complete" and "FailureTarget" conditions. The "Complete", "Failed" and "FailureTarget" conditions cannot be disabled.  More info: https://kubernetes.io/docs/concepts/workloads/controllers/jobs-run-to-completion/

       | `failed`integer
       | The number of pods which reached phase Failed. The value increases monotonically.

       | `failedIndexes`string
       | FailedIndexes holds the failed indexes when spec.backoffLimitPerIndex is set. The indexes are represented in the text format analogous as for the `completedIndexes` field, ie. they are kept as decimal integers separated by commas. The numbers are listed in increasing order. Three or more consecutive numbers are compressed and represented by the first and last element of the series, separated by a hyphen. For example, if the failed indexes are 1, 3, 4, 5 and 7, they are represented as "1,3-5,7". The set of failed indexes cannot overlap with the set of completed indexes.

       | `ready`integer
       | The number of active pods which have a Ready condition and are not terminating (without a deletionTimestamp).

       | `startTime`Time
       | Represents time when the job controller started processing a job. When a Job is created in the suspended state, this field is not set until the first time it is resumed. This field is reset every time a Job is resumed from suspension. It is represented in RFC3339 form and is in UTC.  Once set, the field can only be removed when the job is suspended. The field cannot be modified while the job is unsuspended or finished.

       | `succeeded`integer
       | The number of pods which reached phase Succeeded. The value increases monotonically for a given spec. However, it may decrease in reaction to scale down of elastic indexed jobs.

       | `terminating`integer
       | The number of pods which are terminating (in phase Pending or Running and have a deletionTimestamp).

       | `uncountedTerminatedPods`UncountedTerminatedPods
       | uncountedTerminatedPods holds the UIDs of Pods that have terminated but the job controller hasn't yet accounted for in the status counters.  The job controller creates pods with a finalizer. When a pod terminates (succeeded or failed), the controller does three steps to account for it in the job status:  1. Add the pod UID to the arrays in this field. 2. Remove the pod finalizer. 3. Remove the pod UID from the arrays while increasing the corresponding     counter.  Old jobs might not be tracked using this field, in which case the field remains null. The structure is empty for finished jobs.

## JobList {#JobList}

JobList is a collection of jobs.

   | Field | Description

       | `apiVersion`string
       | APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

       | `items` *Job array
       | items is the list of Jobs.

       | `kind`string
       | Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

       | `metadata`ListMeta
       | Standard list metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata

## JobCondition {#JobCondition}

JobCondition describes current state of a job.

   | Field | Description

       | `lastProbeTime`Time
       | Last time the condition was checked.

       | `lastTransitionTime`Time
       | Last time the condition transit from one status to another.

       | `message`string
       | Human readable message indicating details about last transition.

       | `reason`string
       | (brief) reason for the condition's last transition.

       | `status` *string
       | Status of the condition, one of True, False, Unknown.

       | `type` *string
       | Type of job condition, Complete or Failed.

## JobSchedulingConfiguration {#JobSchedulingConfiguration}

JobSchedulingConfiguration composes the reusable workload-aware scheduling building blocks.

   | Field | Description

       | `disruptionMode`WorkloadPodGroupDisruptionMode
       | DisruptionMode defines the mode in which the Job's pods can be disrupted. One of Single, All. This field is immutable after creation: it may not be added or removed, and the selected mode may not be changed.

       | `resourceClaims`WorkloadPodGroupResourceClaim arraypatch strategy: merge on key `name`
       | ResourceClaims defines which ResourceClaims may be shared among Pods in the Job. Pods consume the devices allocated to a PodGroup's claim by defining a claim in its own Spec.ResourceClaims that matches the PodGroup's claim exactly. The claim must have the same name and refer to the same ResourceClaim or ResourceClaimTemplate. At most 4 claims may be set, matching the limit on the resulting PodGroup. This list is immutable after creation: entries may neither be added, removed, nor modified.

       | `schedulingConstraints`WorkloadPodGroupSchedulingConstraints
       | SchedulingConstraints defines scheduling constraints (e.g. topology) for the Job's pods. This field is immutable after creation.

       | `schedulingPolicy`WorkloadPodGroupSchedulingPolicy
       | SchedulingPolicy defines the scheduling policy for this Job. Exactly one of Basic or Gang must be set. This field is immutable after creation: the policy may not be added or removed. The policy variant (basic/gang) is frozen by hand-written validation; only schedulingPolicy.gang.minCount may be changed.

## PodFailurePolicy {#PodFailurePolicy}

PodFailurePolicy describes how failed pods influence the backoffLimit.

   | Field | Description

       | `rules` *PodFailurePolicyRule array
       | A list of pod failure policy rules. The rules are evaluated in order. Once a rule matches a Pod failure, the remaining of the rules are ignored. When no rule matches the Pod failure, the default handling applies - the counter of pod failures is incremented and it is checked against the backoffLimit. At most 20 elements are allowed.

## PodFailurePolicyOnExitCodesRequirement {#PodFailurePolicyOnExitCodesRequirement}

PodFailurePolicyOnExitCodesRequirement describes the requirement for handling a failed pod based on its container exit codes. In particular, it lookups the .state.terminated.exitCode for each app container and init container status, represented by the .status.containerStatuses and .status.initContainerStatuses fields in the Pod status, respectively. Containers completed with success (exit code 0) are excluded from the requirement check.

   | Field | Description

       | `containerName`string
       | Restricts the check for exit codes to the container with the specified name. When null, the rule applies to all containers. When specified, it should match one the container or initContainer names in the pod template.

       | `operator` *string
       | Represents the relationship between the container exit code(s) and the specified values. Containers completed with success (exit code 0) are excluded from the requirement check. Possible values are:  - In: the requirement is satisfied if at least one container exit code   (might be multiple if there are multiple containers not restricted   by the 'containerName' field) is in the set of specified values. - NotIn: the requirement is satisfied if at least one container exit code   (might be multiple if there are multiple containers not restricted   by the 'containerName' field) is not in the set of specified values. Additional values are considered to be added in the future. Clients should react to an unknown operator by assuming the requirement is not satisfied.Possible enum values: - `"In"` - `"NotIn"`

       | `values` *integer array
       | Specifies the set of values. Each returned container exit code (might be multiple in case of multiple containers) is checked against this set of values with respect to the operator. The list of values must be ordered and must not contain duplicates. Value '0' cannot be used for the In operator. At least one element is required. At most 255 elements are allowed.

## PodFailurePolicyOnPodConditionsPattern {#PodFailurePolicyOnPodConditionsPattern}

PodFailurePolicyOnPodConditionsPattern describes a pattern for matching an actual pod condition type.

   | Field | Description

       | `status`string
       | Specifies the required Pod condition status. To match a pod condition it is required that the specified status equals the pod condition status. Defaults to True.

       | `type` *string
       | Specifies the required Pod condition type. To match a pod condition it is required that specified type equals the pod condition type.

## PodFailurePolicyRule {#PodFailurePolicyRule}

PodFailurePolicyRule describes how a pod failure is handled when the requirements are met. One of onExitCodes and onPodConditions, but not both, can be used in each rule.

   | Field | Description

       | `action` *string
       | Specifies the action taken on a pod failure when the requirements are satisfied. Possible values are:  - FailJob: indicates that the pod's job is marked as Failed and all   running pods are terminated. - FailIndex: indicates that the pod's index is marked as Failed and will   not be restarted. - Ignore: indicates that the counter towards the .backoffLimit is not   incremented and a replacement pod is created. - Count: indicates that the pod is handled in the default way - the   counter towards the .backoffLimit is incremented. Additional values are considered to be added in the future. Clients should react to an unknown action by skipping the rule.Possible enum values: - `"Count"` This is an action which might be taken on a pod failure - the pod failure is handled in the default way - the counter towards .backoffLimit, represented by the job's .status.failed field, is incremented. - `"FailIndex"` This is an action which might be taken on a pod failure - mark the Job's index as failed to avoid restarts within this index. This action can only be used when backoffLimitPerIndex is set. - `"FailJob"` This is an action which might be taken on a pod failure - mark the pod's job as Failed and terminate all running pods. - `"Ignore"` This is an action which might be taken on a pod failure - the counter towards .backoffLimit, represented by the job's .status.failed field, is not incremented and a replacement pod is created.

       | `onExitCodes`PodFailurePolicyOnExitCodesRequirement
       | Represents the requirement on the container exit codes.

       | `onPodConditions`PodFailurePolicyOnPodConditionsPattern array
       | Represents the requirement on the pod conditions. The requirement is represented as a list of pod condition patterns. The requirement is satisfied if at least one pattern matches an actual pod condition. At most 20 elements are allowed.

## SuccessPolicy {#SuccessPolicy}

SuccessPolicy describes when a Job can be declared as succeeded based on the success of some indexes.

   | Field | Description

       | `rules` *SuccessPolicyRule array
       | rules represents the list of alternative rules for the declaring the Jobs as successful before `.status.succeeded >= .spec.completions`. Once any of the rules are met, the "SuccessCriteriaMet" condition is added, and the lingering pods are removed. The terminal state for such a Job has the "Complete" condition. Additionally, these rules are evaluated in order; Once the Job meets one of the rules, other rules are ignored. At most 20 elements are allowed.
