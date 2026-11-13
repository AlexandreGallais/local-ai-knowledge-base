---
title: "CompositePodGroup (part 1 of 8)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/scheduling/composite-pod-group-v1alpha3.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# CompositePodGroup

`apiVersion: scheduling.k8s.io/v1alpha3`

`import "k8s.io/api/scheduling/v1alpha3"`

## CompositePodGroup {#CompositePodGroup}

CompositePodGroup represents a runtime instance of pod groups grouped together. CompositePodGroups are created by workload controllers (LWS, JobSet, etc...) from Workload.compositePodGroupTemplates. CompositePodGroup API enablement is toggled by the CompositePodGroup feature gate.

   | Field | Description

       | `apiVersion`string
       | APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

       | `kind`string
       | Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

       | `metadata`ObjectMeta
       | metadata is the standard object metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata

       | `spec` *CompositePodGroupSpec
       | spec defines the desired state of the CompositePodGroup.

       | `status`CompositePodGroupStatus
       | status represents the current observed state of the CompositePodGroup.

## CompositePodGroupSpec {#CompositePodGroupSpec}

CompositePodGroupSpec defines the desired state of CompositePodGroup.

   | Field | Description

       | `disruptionMode`CompositeDisruptionMode
       | disruptionMode defines the mode in which a given CompositePodGroup can be disrupted. Controllers are expected to fill this field by copying it from a CompositePodGroupTemplate. One of Single, All. Defaults to Single if unset. This field is immutable.

       | `parentCompositePodGroupName`string
       | parentCompositePodGroupName contains the name of the parent composite pod group within the same namespace as this composite pod group. It must be a DNS name. If it's nil, then this composite pod group is a root of a workload's hierarchy. This field is immutable.

       | `preemptionPolicy`string
       | preemptionPolicy is the Policy for preempting pods/podgroups with lower priority. One of Never, PreemptLowerPriority. Defaults to PreemptLowerPriority if unset. When Priority Admission Controller is enabled, it populates this field from PriorityClassName, and defaults to PreemptLowerPriority if value is unset in PriorityClass. This field is immutable. This field is available only when the PodGroupPreemptionPolicy feature gate is enabled.Possible enum values: - `"Never"` means that pod never preempts other pods with lower priority. - `"PreemptLowerPriority"` means that pod can preempt other pods with lower priority.

       | `priority`integer
       | priority is the value of priority of this composite pod group. Various system components use this field to find the priority of the composite pod group. When Priority Admission Controller is enabled, it prevents users from setting this field. The admission controller populates this field from PriorityClassName. The higher the value, the higher the priority. This field is immutable.

       | `priorityClassName`string
       | priorityClassName defines the priority that should be considered when scheduling this CompositePodGroup. Controllers are expected to fill this field by copying it from a CompositePodGroupTemplate. If left unspecified, it is validated and resolved similarly to the PriorityClassName field in Pods (i.e. if no priority class is specified, admission control can set this to the global default priority class if it exists. Otherwise, the composite pod group's priority will be zero). This field is immutable.

       | `schedulingConstraints`CompositePodGroupSchedulingConstraints
       | schedulingConstraints defines optional scheduling constraints (e.g. topology) for this CompositePodGroup. Controllers are expected to fill this field by copying it from a CompositePodGroupTemplate. This field is immutable.

       | `schedulingPolicy` *CompositePodGroupSchedulingPolicy
       | schedulingPolicy defines the scheduling policy for this instance of the CompositePodGroup. Controllers are expected to fill this field by copying it from a CompositePodGroupTemplate. This field is immutable.

       | `workloadRef` *WorkloadReference
       | workloadRef references an optional CompositePodGroup template within the Workload object that was used to create the CompositePodGroup. This field is required. This field is immutable.

## CompositePodGroupStatus {#CompositePodGroupStatus}

CompositePodGroupStatus represents information about the status of a composite pod group.

   | Field | Description

       | `conditions`Condition arraypatch strategy: merge on key `type`
       | conditions represent the latest observations of the CompositePodGroup's state.  Known condition types: - "CompositePodGroupInitiallyScheduled": Indicates whether the overall scheduling requirement   for the subtree under this CompositePodGroup has been satisfied. Once this condition   transitions to True, it serves as a terminal state and will never revert to False,   even if pods are subsequently deleted and group constraints are no longer met. - "DisruptionTarget": Indicates whether the CompositePodGroup is about to be terminated   due to disruption such as preemption.  Known reasons for the CompositePodGroupInitiallyScheduled condition: - "Unschedulable": The CompositePodGroup's subtree could not be placed due to resource constraints,   affinity/anti-affinity, or topological constraints. - "SchedulerError": The CompositePodGroup cannot be scheduled due to some internal error   that occurred during scheduling. - "Invalid": Set to True when kube-scheduler detects an invalid group layout during   runtime validation. The `message` field details the specific layout violation (such as   a detected cycle, exceeding the maximum depth of 4, or referencing multiple distinct Workloads).  Known reasons for the DisruptionTarget condition: - "PreemptionByScheduler": The CompositePodGroup was targeted by the scheduler's preemption loop   to free up capacity for higher-priority preemptors.

## CompositePodGroupList {#CompositePodGroupList}

CompositePodGroupList contains a list of CompositePodGroup resources.

   | Field | Description

       | `apiVersion`string
       | APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

       | `items` *CompositePodGroup array
       | Items is the list of CompositePodGroups.

       | `kind`string
       | Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

       | `metadata`ListMeta
       | Standard list metadata.
