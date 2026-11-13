---
title: "Workload (part 1 of 8)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/scheduling/workload-v1beta1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Workload

`apiVersion: scheduling.k8s.io/v1beta1`

`import "k8s.io/api/scheduling/v1beta1"`

## Workload {#Workload}

Workload allows for expressing scheduling constraints that should be used when managing the lifecycle of workloads from the scheduling perspective, including scheduling, preemption, eviction and other phases. Workload API enablement is toggled by the GenericWorkload feature gate.

   | Field | Description

       | `apiVersion`string
       | APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

       | `kind`string
       | Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

       | `metadata`ObjectMeta
       | metadata is the standard object metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata

       | `spec` *WorkloadSpec
       | spec defines the desired behavior of a Workload.

## WorkloadSpec {#WorkloadSpec}

WorkloadSpec defines the desired state of a Workload.

   | Field | Description

       | `compositePodGroupTemplates`CompositePodGroupTemplate array
       | compositePodGroupTemplates is the list of CompositePodGroup templates that make up the Workload. The maximum number of templates is 8. This field is immutable. Exactly one of CompositePodGroupTemplates and PodGroupTemplates must be set.  This field is used only when the CompositePodGroup feature gate is enabled.

       | `controllerRef`TypedLocalObjectReference
       | controllerRef is an optional reference to the controlling object, such as a Deployment or Job. This field is intended for use by tools like CLIs to provide a link back to the original workload definition. This field is immutable.

       | `podGroupTemplates`PodGroupTemplate array
       | podGroupTemplates is the list of templates that make up the Workload. The maximum number of templates is 8. Templates cannot be added or removed after the workload is created. Existing templates may still be updated where their individual fields allow it. Exactly one of CompositePodGroupTemplates and PodGroupTemplates must be set.

## WorkloadList {#WorkloadList}

WorkloadList contains a list of Workload resources.

   | Field | Description

       | `apiVersion`string
       | APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

       | `items` *Workload array
       | items is the list of Workloads.

       | `kind`string
       | Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

       | `metadata`ListMeta
       | metadata is the standard list metadata.

## AllCompositeDisruptionMode {#AllCompositeDisruptionMode}

AllCompositeDisruptionMode means that children of a CompositePodGroup can only be disrupted or preempted together.

## CompositeBasicSchedulingPolicy {#CompositeBasicSchedulingPolicy}

CompositeBasicSchedulingPolicy indicates that the groups belonging to the composite group should be scheduled independently.

## CompositeDisruptionMode {#CompositeDisruptionMode}

CompositeDisruptionMode defines how individual entities within a composite pod group can be disrupted. Exactly one mode must be set.

   | Field | Description

       | `all`AllCompositeDisruptionMode
       | all specifies that all children groups can only be disrupted together.

       | `single`SingleCompositeDisruptionMode
       | single specifies that children groups can be disrupted independently from each other.

## CompositeGangSchedulingPolicy {#CompositeGangSchedulingPolicy}

CompositeGangSchedulingPolicy indicates that the groups belonging to the composite group should be scheduled using all-or-nothing semantics.

   | Field | Description

       | `minGroupCount` *integer
       | minGroupCount is the minimum number of child groups that must be schedulable or scheduled at the same time for the scheduler to admit the entire group. It must be a positive integer.

## CompositePodGroupSchedulingConstraints {#CompositePodGroupSchedulingConstraints}

CompositePodGroupSchedulingConstraints defines scheduling constraints (e.g. topology) for a CompositePodGroup.

   | Field | Description

       | `topology`TopologyConstraint array
       | topology defines the topology constraints for the composite pod group. Currently only a single topology constraint can be specified. This may change in the future.

## CompositePodGroupSchedulingPolicy {#CompositePodGroupSchedulingPolicy}

CompositePodGroupSchedulingPolicy defines the scheduling configuration for a CompositePodGroup. Exactly one policy must be set.

   | Field | Description

       | `basic`CompositeBasicSchedulingPolicy
       | basic specifies that the groups of this composite group should be scheduled independently. This field is immutable.

       | `gang`CompositeGangSchedulingPolicy
       | gang specifies that the groups of this composite group should be scheduled using all-or-nothing semantics.

## CompositePodGroupTemplate {#CompositePodGroupTemplate}

CompositePodGroupTemplate represents a template for a CompositePodGroup with a scheduling policy.

   | Field | Description

       | `compositePodGroupTemplates`CompositePodGroupTemplate array
       | compositePodGroupTemplates is the list of templates for children CompositePodGroups. The maximum number of templates is 8. At least one entry in CompositePodGroupTemplates or PodGroupTemplates must be set.

       | `disruptionMode`CompositeDisruptionMode
       | disruptionMode defines the mode in which a given CompositePodGroup can be disrupted. One of Single, All. This field is immutable.

       | `name` *string
       | name is a unique identifier for the CompositePodGroupTemplate within the Workload. It must be a DNS label. This field is required.

       | `podGroupTemplates`PodGroupTemplate array
       | podGroupTemplates is the list of templates for children PodGroups. The maximum number of templates is 8. At least one entry in CompositePodGroupTemplates or PodGroupTemplates must be set.

       | `preemptionPolicy`string
       | preemptionPolicy is the Policy for preempting pods/podgroups with lower priority. One of Never, PreemptLowerPriority. This field is immutable. This field is available only when the PodGroupPreemptionPolicy feature gate is enabled.Possible enum values: - `"Never"` means that pod never preempts other pods with lower priority. - `"PreemptLowerPriority"` means that pod can preempt other pods with lower priority.

       | `priority`integer
       | priority is the value of priority of composite pod groups created from this template. Various system components use this field to find the priority of the composite pod group. When Priority Admission Controller is enabled, it prevents users from setting this field. The admission controller populates this field from PriorityClassName. The higher the value, the higher the priority. This field is immutable.

       | `priorityClassName`string
       | priorityClassName indicates the priority that should be considered when scheduling a composite pod group created from this template. If no priority class is specified, admission control can set this to the global default priority class if it exists. Otherwise, composite pod groups created from this template will have the priority set to zero. This field is immutable.

       | `schedulingConstraints`CompositePodGroupSchedulingConstraints
       | schedulingConstraints defines optional scheduling constraints (e.g. topology) for this CompositePodGroupTemplate. This field is immutable.

       | `schedulingPolicy` *CompositePodGroupSchedulingPolicy
       | schedulingPolicy defines the scheduling policy for this template.

## PodGroupTemplate {#PodGroupTemplate}

PodGroupTemplate represents a template for a set of pods with a scheduling policy.

   | Field | Description

       | `disruptionMode`DisruptionMode
       | disruptionMode defines the mode in which a given PodGroup can be disrupted. One of Single, All. This field is immutable.

       | `name` *string
       | name is a unique identifier for the PodGroupTemplate within the Workload. It must be a DNS label. This field is immutable.

       | `preemptionPolicy`string
       | preemptionPolicy is the Policy for preempting pods/podgroups with lower priority. One of Never, PreemptLowerPriority. This field is immutable. This field is available only when the PodGroupPreemptionPolicy feature gate is enabled.Possible enum values: - `"Never"` means that pod never preempts other pods with lower priority. - `"PreemptLowerPriority"` means that pod can preempt other pods with lower priority.

       | `priority`integer
       | priority is the value of priority of pod groups created from this template. Various system components use this field to find the priority of the pod group. The higher the value, the higher the priority. This field is immutable.

       | `priorityClassName`string
       | priorityClassName indicates the priority that should be considered when scheduling a pod group created from this template. This field is immutable.

       | `resourceClaims`PodGroupResourceClaim arraypatch strategy: merge,retainKeys on key `name`
       | resourceClaims defines which ResourceClaims may be shared among Pods in the group. Pods consume the devices allocated to a PodGroup's claim by defining a claim in its own Spec.ResourceClaims that matches the PodGroup's claim exactly. The claim must have the same name and refer to the same ResourceClaim or ResourceClaimTemplate.  This is a beta-level field and requires that the DRAWorkloadResourceClaims feature gate is enabled.  This field is immutable.

       | `schedulingConstraints`PodGroupSchedulingConstraints
       | schedulingConstraints defines optional scheduling constraints (e.g. topology) for this PodGroupTemplate. This field is only available when the TopologyAwareWorkloadScheduling feature gate is enabled. This field is immutable.

       | `schedulingPolicy` *PodGroupSchedulingPolicy
       | schedulingPolicy defines the scheduling policy for this PodGroupTemplate.

## SingleCompositeDisruptionMode {#SingleCompositeDisruptionMode}

SingleCompositeDisruptionMode means that individual children of a CompositePodGroup can be disrupted or preempted independently.
