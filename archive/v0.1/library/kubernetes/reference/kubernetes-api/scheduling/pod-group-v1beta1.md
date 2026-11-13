---
title: "PodGroup (part 1 of 8)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/scheduling/pod-group-v1beta1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# PodGroup

`apiVersion: scheduling.k8s.io/v1beta1`

`import "k8s.io/api/scheduling/v1beta1"`

## PodGroup {#PodGroup}

PodGroup represents a runtime instance of pods grouped together. PodGroups are created by workload controllers (Job, LWS, JobSet, etc...) from Workload.podGroupTemplates. PodGroup API enablement is toggled by the GenericWorkload feature gate.

   | Field | Description

       | `apiVersion`string
       | APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

       | `kind`string
       | Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

       | `metadata`ObjectMeta
       | metadata is the standard object metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata

       | `spec` *PodGroupSpec
       | spec defines the desired state of the PodGroup.

       | `status`PodGroupStatus
       | status represents the current observed state of the PodGroup.

## PodGroupSpec {#PodGroupSpec}

PodGroupSpec defines the desired state of a PodGroup.

   | Field | Description

       | `disruptionMode`DisruptionMode
       | disruptionMode defines the mode in which a given PodGroup can be disrupted. Controllers are expected to fill this field by copying it from a PodGroupTemplate. One of Single, All. Defaults to Single if unset. This field is immutable.

       | `parentCompositePodGroupName`string
       | parentCompositePodGroupName contains the name of the parent composite pod group within the same namespace as this pod group. If it's nil, then this pod group is a root of a workload's hierarchy. This field is used only when the CompositePodGroup feature gate is enabled. This field is immutable.

       | `preemptionPolicy`string
       | preemptionPolicy is the Policy for preempting pods/podgroups with lower priority. One of Never, PreemptLowerPriority. Defaults to PreemptLowerPriority if unset. When Priority Admission Controller is enabled, it populates this field from PriorityClassName, and defaults to PreemptLowerPriority if value is unset in PriorityClass. This field is immutable. This field is available only when the PodGroupPreemptionPolicy feature gate is enabled.Possible enum values: - `"Never"` means that pod never preempts other pods with lower priority. - `"PreemptLowerPriority"` means that pod can preempt other pods with lower priority.

       | `priority`integer
       | priority is the value of priority of this pod group. Various system components use this field to find the priority of the pod group. When Priority Admission Controller is enabled, it prevents users from setting this field. The admission controller populates this field from PriorityClassName. The higher the value, the higher the priority. This field is immutable.

       | `priorityClassName`string
       | priorityClassName defines the priority that should be considered when scheduling this pod group. Controllers are expected to fill this field by copying it from a PodGroupTemplate. Otherwise, it is validated and resolved similarly to the PriorityClassName on PodGroupTemplate (i.e. if no priority class is specified, admission control can set this to the global default priority class if it exists. Otherwise, the pod group's priority will be zero). This field is immutable.

       | `resourceClaims`PodGroupResourceClaim arraypatch strategy: merge,retainKeys on key `name`
       | resourceClaims defines which ResourceClaims may be shared among Pods in the group. Pods consume the devices allocated to a PodGroup's claim by defining a claim in its own Spec.ResourceClaims that matches the PodGroup's claim exactly. The claim must have the same name and refer to the same ResourceClaim or ResourceClaimTemplate.  This is a beta-level field and requires that the DRAWorkloadResourceClaims feature gate is enabled.  This field is immutable.

       | `schedulingConstraints`PodGroupSchedulingConstraints
       | schedulingConstraints defines optional scheduling constraints (e.g. topology) for this PodGroup. Controllers are expected to fill this field by copying it from a PodGroupTemplate. This field is immutable. This field is only available when the TopologyAwareWorkloadScheduling feature gate is enabled.

       | `schedulingPolicy` *PodGroupSchedulingPolicy
       | schedulingPolicy defines the scheduling policy for this instance of the PodGroup. Controllers are expected to fill this field by copying it from a PodGroupTemplate.

       | `workloadRef`WorkloadReference
       | workloadRef references an optional PodGroup template within the Workload object that was used to create the PodGroup. This field is immutable.

## PodGroupStatus {#PodGroupStatus}

PodGroupStatus represents information about the status of a pod group.

   | Field | Description

       | `conditions`Condition arraypatch strategy: merge on key `type`
       | conditions represent the latest observations of the PodGroup's state.  Known condition types: - "PodGroupInitiallyScheduled": Indicates whether the scheduling requirement has been satisfied. Once this condition transitions to True, it serves as a terminal state and will never revert to False, even if pods are subsequently evicted and group constraints are no longer met. - "DisruptionTarget": Indicates whether the PodGroup is about to be terminated   due to disruption such as preemption.  Known reasons for the PodGroupInitiallyScheduled condition: - "Unschedulable": The PodGroup cannot be scheduled due to resource constraints,   affinity/anti-affinity rules, or insufficient capacity for the gang. - "SchedulerError": The PodGroup cannot be scheduled due to some internal error   that happened during scheduling, for example due to nodeAffinity parsing errors.  Known reasons for the DisruptionTarget condition: - "PreemptionByScheduler": The PodGroup was preempted by the scheduler to make room for   higher-priority PodGroups or Pods.

       | `resourceClaimStatuses`PodGroupResourceClaimStatus arraypatch strategy: merge,retainKeys on key `name`
       | resourceClaimStatuses is status of resource claims.

## PodGroupList {#PodGroupList}

PodGroupList contains a list of PodGroup resources.

   | Field | Description

       | `apiVersion`string
       | APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

       | `items` *PodGroup array
       | Items is the list of PodGroups.

       | `kind`string
       | Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

       | `metadata`ListMeta
       | Standard list metadata.

## AllDisruptionMode {#AllDisruptionMode}

AllDisruptionMode specifies that children can only be disrupted together.

## BasicSchedulingPolicy {#BasicSchedulingPolicy}

BasicSchedulingPolicy indicates that standard Kubernetes scheduling behavior should be used.

## DisruptionMode {#DisruptionMode}

DisruptionMode defines how individual entities within a group can be disrupted. Exactly one mode can be set.

   | Field | Description

       | `all`AllDisruptionMode
       | all specifies that all children can only be disrupted together.

       | `single`SingleDisruptionMode
       | single specifies that children can be disrupted independently from each other.

## GangSchedulingPolicy {#GangSchedulingPolicy}

GangSchedulingPolicy defines the parameters for gang scheduling.

   | Field | Description

       | `minCount` *integer
       | minCount is the minimum number of pods that must be schedulable or scheduled at the same time for the scheduler to admit the entire group. It must be a positive integer. This field is mutable to support workload scaling.  Note that the scheduler operates on an eventually consistent model. Updates to minCount may not be immediately reflected in scheduling decisions due to propagation delays. If minCount is updated while a scheduling cycle is in progress for that group, the new value may not take effect until the next cycle. Moreover, minCount is only enforced during scheduling, meaning that modifications to this field do not affect already-scheduled pods, applying only to those evaluated in future cycles.

## PodGroupResourceClaim {#PodGroupResourceClaim}

PodGroupResourceClaim references exactly one ResourceClaim, either directly or by naming a ResourceClaimTemplate which is then turned into a ResourceClaim for the PodGroup.

It adds a name to it that uniquely identifies the ResourceClaim inside the PodGroup. Pods that need access to the ResourceClaim define a matching reference in its own Spec.ResourceClaims. The Pod's claim must match all fields of the PodGroup's claim exactly.

   | Field | Description

       | `name` *string
       | name uniquely identifies this resource claim inside the PodGroup. This must be a DNS_LABEL.

       | `resourceClaimName`string
       | resourceClaimName is the name of a ResourceClaim object in the same namespace as this PodGroup. The ResourceClaim will be reserved for the PodGroup instead of its individual pods.  Exactly one of ResourceClaimName and ResourceClaimTemplateName must be set.

       | `resourceClaimTemplateName`string
       | resourceClaimTemplateName is the name of a ResourceClaimTemplate object in the same namespace as this PodGroup.  The template will be used to create a new ResourceClaim, which will be bound to this PodGroup. When this PodGroup is deleted, the ResourceClaim will also be deleted. The PodGroup name and resource name, along with a generated component, will be used to form a unique name for the ResourceClaim, which will be recorded in podgroup.status.resourceClaimStatuses.  This field is immutable and no changes will be made to the corresponding ResourceClaim by the control plane after creating the ResourceClaim.  Exactly one of ResourceClaimName and ResourceClaimTemplateName must be set.

## PodGroupSchedulingConstraints {#PodGroupSchedulingConstraints}

PodGroupSchedulingConstraints defines scheduling constraints (e.g. topology) for a PodGroup.

   | Field | Description

       | `topology`TopologyConstraint array
       | topology defines the topology constraints for the pod group. Currently only a single topology constraint can be specified. This may change in the future.

## PodGroupSchedulingPolicy {#PodGroupSchedulingPolicy}

PodGroupSchedulingPolicy defines the scheduling configuration for a PodGroup. Exactly one policy must be set. The policy is chosen at creation time by setting either the Basic or Gang field. The PodGroup may not change policy after creation. Fields within chosen policy may be updated after creation when their individual fields allow it.

   | Field | Description

       | `basic`BasicSchedulingPolicy
       | basic <example-value> that the pods in this group should be scheduled using standard Kubernetes scheduling behavior. Setting this field at group creation time opts this group to basic <example-value>; this field cannot be changed afterward.

       | `gang`GangSchedulingPolicy
       | gang specifies that the pods in this group should be scheduled using all-or-nothing semantics. Setting this field at group creation time opts this group to gang scheduling; this field cannot be set or unset afterward. The minCount field within Gang scheduling policy remains mutable after group creation.

## SingleDisruptionMode {#SingleDisruptionMode}

SingleDisruptionMode specifies that children can be disrupted independently.

## TopologyConstraint {#TopologyConstraint}

TopologyConstraint defines a topology constraint for a PodGroup.

   | Field | Description

       | `key` *string
       | key <example-value> the key of the node label representing the topology domain. All pods within the PodGroup must be colocated within the same domain instance. Different PodGroups can land on different domain instances even if they derive from the same PodGroupTemplate. Examples: "topology.kubernetes.io/rack"

## WorkloadReference {#WorkloadReference}

WorkloadReference references the Workload object together with the template that was used to create a particular PodGroup.

   | Field | Description

       | `templateName` *string
       | templateName is the name of a template within the Workload object that was used to create a pod group. It must be a DNS label. This field is required.

       | `workloadName` *string
       | workloadName is the name of the Workload object that contains a template that was used when creating a pod group. It must be a DNS name. This field is required.
