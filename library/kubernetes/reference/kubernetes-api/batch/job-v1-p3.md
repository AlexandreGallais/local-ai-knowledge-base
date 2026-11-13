---
title: "Job (part 3 of 10)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/batch/job-v1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Job (part 3 of 10)

## SuccessPolicyRule {#SuccessPolicyRule}

SuccessPolicyRule describes rule for declaring a Job as succeeded. Each rule must have at least one of the &#34;succeededIndexes&#34; or &#34;succeededCount&#34; specified.

   | Field | Description

       | `succeededCount`integer
       | succeededCount specifies the minimal required size of the actual set of the succeeded indexes for the Job. When succeededCount is used along with succeededIndexes, the check is constrained only to the set of indexes specified by succeededIndexes. For example, given that succeededIndexes is "1-4", succeededCount is "3", and completed indexes are "1", "3", and "5", the Job isn't declared as succeeded because only "1" and "3" indexes are considered in that rules. When this field is null, this doesn't default to any value and is never evaluated at any time. When specified it needs to be a positive integer.

       | `succeededIndexes`string
       | succeededIndexes specifies the set of indexes which need to be contained in the actual set of the succeeded indexes for the Job. The list of indexes must be within 0 to ".spec.completions-1" and must not contain duplicates. At least one element is required. The indexes are represented as intervals separated by commas. The intervals can be a decimal integer or a pair of decimal integers separated by a hyphen. The number are listed in represented by the first and last element of the series, separated by a hyphen. For example, if the completed indexes are 1, 3, 4, 5 and 7, they are represented as "1,3-5,7". When this field is null, this field doesn't default to any value and is never evaluated at any time.

## UncountedTerminatedPods {#UncountedTerminatedPods}

UncountedTerminatedPods holds UIDs of Pods that have terminated but haven't been accounted in Job status counters.

   | Field | Description

       | `failed`string array
       | failed holds UIDs of failed Pods.

       | `succeeded`string array
       | succeeded holds UIDs of succeeded Pods.

## WorkloadPodGroupAllDisruptionMode {#WorkloadPodGroupAllDisruptionMode}

WorkloadPodGroupAllDisruptionMode indicates that all pods in the group must be disrupted together.

## WorkloadPodGroupBasicSchedulingPolicy {#WorkloadPodGroupBasicSchedulingPolicy}

WorkloadPodGroupBasicSchedulingPolicy indicates standard Kubernetes scheduling behavior.

## WorkloadPodGroupDisruptionMode {#WorkloadPodGroupDisruptionMode}

WorkloadPodGroupDisruptionMode defines how individual pods within a group can be disrupted. Exactly one mode must be set.

   | Field | Description

       | `all`WorkloadPodGroupAllDisruptionMode
       | all specifies that all pods in the group must be disrupted together.

       | `single`WorkloadPodGroupSingleDisruptionMode
       | single specifies that pods can be disrupted independently from each other.

## WorkloadPodGroupGangSchedulingPolicy {#WorkloadPodGroupGangSchedulingPolicy}

WorkloadPodGroupGangSchedulingPolicy defines the parameters for gang (all-or-nothing) scheduling.

   | Field | Description

       | `minCount`integer
       | minCount is the minimum number of pods that must be scheduled at the same time for the scheduler to admit the entire group. This field is optional. If it is not specified, the controller should inject a context-specific sane default (e.g., parallelism for a Job). If set, it must be a positive integer.

## WorkloadPodGroupResourceClaim {#WorkloadPodGroupResourceClaim}

WorkloadPodGroupResourceClaim references a dynamic resource claim that is shared across pods in the group.

   | Field | Description

       | `name` *string
       | name uniquely identifies this resource claim inside the group. This field is required. It must be a DNS_LABEL.

       | `resourceClaimName`string
       | resourceClaimName is the name of a ResourceClaim object in the same namespace. This field is optional. If it is not specified, no resource claim is used. If set, it must be a DNS subdomain.

       | `resourceClaimTemplateName`string
       | resourceClaimTemplateName is the name of a ResourceClaimTemplate object in the same namespace. This field is optional. If it is not specified, no resource claim template is used. If set, it must be a DNS subdomain.

## WorkloadPodGroupSchedulingConstraints {#WorkloadPodGroupSchedulingConstraints}

WorkloadPodGroupSchedulingConstraints defines leaf-level scheduling constraints, such as topology.

   | Field | Description

       | `topology`TopologyConstraint array
       | topology specifies desired topological placements for all pods within the pod group. If unset, no topology placement is requested.

## WorkloadPodGroupSchedulingPolicy {#WorkloadPodGroupSchedulingPolicy}

WorkloadPodGroupSchedulingPolicy defines the scheduling policy for a group of pods managed by a workload controller. Exactly one policy must be set.

   | Field | Description

       | `basic`WorkloadPodGroupBasicSchedulingPolicy
       | basic <example-value> that standard, pod-by-pod Kubernetes scheduling behavior should be used.

       | `gang`WorkloadPodGroupGangSchedulingPolicy
       | gang specifies all-or-nothing scheduling semantics.

## WorkloadPodGroupSingleDisruptionMode {#WorkloadPodGroupSingleDisruptionMode}

WorkloadPodGroupSingleDisruptionMode indicates that individual pods can be disrupted independently.
