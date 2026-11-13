---
title: "kube-scheduler Configuration (v1) (part 1 of 3)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/config-api/kube-scheduler-config.v1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# kube-scheduler Configuration (v1)

## Resource Types

- DefaultPreemptionArgs
- DynamicResourcesArgs
- InterPodAffinityArgs
- KubeSchedulerConfiguration
- NodeAffinityArgs
- NodeResourcesBalancedAllocationArgs
- NodeResourcesFitArgs
- PodTopologySpreadArgs
- VolumeBindingArgs

## `ClientConnectionConfiguration`     {#ClientConnectionConfiguration}

**Appears in:**

- KubeSchedulerConfiguration

ClientConnectionConfiguration contains details for constructing a client.

 | Field | Description

 | `kubeconfig` [Required]
`string`

 |
   kubeconfig is the path to a KubeConfig file.

 | `acceptContentTypes` [Required]
`string`

 |
   acceptContentTypes defines the Accept header sent by clients when connecting to a server, overriding the
default value of 'application/json'. This field will control all connections to the server used by a particular
client.

 | `contentType` [Required]
`string`

 |
   contentType is the content type used when sending data to the server from this client.

 | `qps` [Required]
`float32`

 |
   qps controls the number of queries per second allowed for this connection.

 | `burst` [Required]
`int32`

 |
   burst allows extra queries to accumulate when a client is exceeding its rate.

## `DebuggingConfiguration`     {#DebuggingConfiguration}

**Appears in:**

- KubeSchedulerConfiguration

DebuggingConfiguration holds configuration for Debugging related features.

 | Field | Description

 | `enableProfiling` [Required]
`bool`

 |
   enableProfiling enables profiling via web interface host:port/debug/pprof/

 | `enableContentionProfiling` [Required]
`bool`

 |
   enableContentionProfiling enables block profiling, if
enableProfiling is true.

## `LeaderElectionConfiguration`     {#LeaderElectionConfiguration}

**Appears in:**

- KubeSchedulerConfiguration

LeaderElectionConfiguration defines the configuration of leader election
clients for components that can run with leader election enabled.

 | Field | Description

 | `leaderElect` [Required]
`bool`

 |
   leaderElect enables a leader election client to gain leadership
before executing the main loop. Enable this when running replicated
components for high availability.

 | `leaseDuration` [Required]
`meta/v1.Duration`

 |
   leaseDuration is the duration that non-leader candidates will wait
after observing a leadership renewal until attempting to acquire
leadership of a led but unrenewed leader slot. This is effectively the
maximum duration that a leader can be stopped before it is replaced
by another candidate. This is only applicable if leader election is
enabled.

 | `renewDeadline` [Required]
`meta/v1.Duration`

 |
   renewDeadline is the interval between attempts by the acting master to
renew a leadership slot before it stops leading. This must be less
than or equal to the lease duration. This is only applicable if leader
election is enabled.

 | `retryPeriod` [Required]
`meta/v1.Duration`

 |
   retryPeriod is the duration the clients should wait between attempting
acquisition and renewal of a leadership. This is only applicable if
leader election is enabled.

 | `resourceLock` [Required]
`string`

 |
   resourceLock indicates the resource object type that will be used to lock
during leader election cycles.

 | `resourceName` [Required]
`string`

 |
   resourceName indicates the name of resource object that will be used to lock
during leader election cycles.

 | `resourceNamespace` [Required]
`string`

 |
   resourceName indicates the namespace of resource object that will be used to lock
during leader election cycles.

## `DefaultPreemptionArgs`     {#kubescheduler-config-k8s-io-v1-DefaultPreemptionArgs}

DefaultPreemptionArgs holds arguments used to configure the
DefaultPreemption plugin.

 | Field | Description

 | `apiVersion`string | `kubescheduler.config.k8s.io/v1`

 | `kind`string | `DefaultPreemptionArgs`

 | `minCandidateNodesPercentage` [Required]
`int32`

 |
   MinCandidateNodesPercentage is the minimum number of candidates to
shortlist when dry running preemption as a percentage of number of nodes.
Must be in the range [0, 100]. Defaults to 10% of the cluster size if
unspecified.

 | `minCandidateNodesAbsolute` [Required]
`int32`

 |
   MinCandidateNodesAbsolute is the absolute minimum number of candidates to
shortlist. The likely number of candidates enumerated for dry running
preemption is given by the formula:
numCandidates = max(numNodes * minCandidateNodesPercentage, minCandidateNodesAbsolute)
We say "likely" because there are other factors such as PDB violations
that play a role in the number of candidates shortlisted. Must be at least
0 nodes. Defaults to 100 nodes if unspecified.

## `DynamicResourcesArgs`     {#kubescheduler-config-k8s-io-v1-DynamicResourcesArgs}

DynamicResourcesArgs holds arguments used to configure the DynamicResources plugin.

 | Field | Description

 | `apiVersion`string | `kubescheduler.config.k8s.io/v1`

 | `kind`string | `DynamicResourcesArgs`

 | `filterTimeout` [Required]
`meta/v1.Duration`

 |
   FilterTimeout limits the amount of time that the filter operation may
take per node to search for devices that can be allocated to scheduler
a pod to that node.
In typical scenarios, this operation should complete in 10 to 200
milliseconds, but could also be longer depending on the number of
requests per ResourceClaim, number of ResourceClaims, number of
published devices in ResourceSlices, and the complexity of the
requests. Other checks besides CEL evaluation also take time (usage
checks, match attributes, etc.).
Therefore the scheduler plugin applies this timeout. If the timeout
is reached, the Pod is considered unschedulable for the node.
If filtering succeeds for some other node(s), those are picked instead.
If filtering fails for all of them, the Pod is placed in the
unschedulable queue. It will get checked again if changes in
e.g. ResourceSlices or ResourceClaims indicate that
another scheduling attempt might succeed. If this fails repeatedly,
exponential backoff slows down future attempts.
The default is 10 seconds.
This is sufficient to prevent worst-case scenarios while not impacting normal
usage of DRA. However, slow filtering can slow down Pod scheduling
also for Pods not using DRA. Administators can reduce the timeout
after checking the
`scheduler_framework_extension_point_duration_seconds` metrics.
Setting it to zero completely disables the timeout.

 | `bindingTimeout` [Required]
`meta/v1.Duration`

 |
   BindingTimeout limits how long the PreBind extension point may wait for
ResourceClaim device BindingConditions to become satisfied when such
conditions are present. While waiting, the scheduler periodically checks
device status. If the timeout elapses before all required conditions are
true (or any bindingFailureConditions become true), the allocation is
cleared and the Pod re-enters scheduling queue. Note that the same or other node may be
chosen if feasible; otherwise the Pod is placed in the unschedulable queue and
retried based on cluster changes and backoff.
Defaults & feature gates:

Defaults to 10 minutes when the DRADeviceBindingConditions feature gate is enabled.
Has effect only when BOTH DRADeviceBindingConditions and
DRAResourceClaimDeviceStatus are enabled; otherwise omit this field.
When DRADeviceBindingConditions is disabled, setting this field is considered an error.

Valid values:

=1s (non-zero). No upper bound is enforced.

Tuning guidance:

Lower values reduce time-to-retry when devices aren’t ready but can
increase churn if drivers typically need longer to report readiness.
Review scheduler latency metrics (e.g. PreBind duration in
`scheduler_framework_extension_point_duration_seconds`) and driver
readiness behavior before tightening this timeout.

## `InterPodAffinityArgs`     {#kubescheduler-config-k8s-io-v1-InterPodAffinityArgs}

InterPodAffinityArgs holds arguments used to configure the InterPodAffinity plugin.

 | Field | Description

 | `apiVersion`string | `kubescheduler.config.k8s.io/v1`

 | `kind`string | `InterPodAffinityArgs`

 | `hardPodAffinityWeight` [Required]
`int32`

 |
   HardPodAffinityWeight is the scoring weight for existing pods with a
matching hard affinity to the incoming pod.

 | `ignorePreferredTermsOfExistingPods` [Required]
`bool`

 |
   IgnorePreferredTermsOfExistingPods configures the scheduler to ignore existing pods' preferred affinity
rules when scoring candidate nodes, unless the incoming pod has inter-pod affinities.

## `KubeSchedulerConfiguration`     {#kubescheduler-config-k8s-io-v1-KubeSchedulerConfiguration}

KubeSchedulerConfiguration configures a scheduler

 | Field | Description

 | `apiVersion`string | `kubescheduler.config.k8s.io/v1`

 | `kind`string | `KubeSchedulerConfiguration`

 | `parallelism` [Required]
`int32`

 |
   Parallelism defines the amount of parallelism in algorithms for scheduling a Pods. Must be greater than 0. Defaults to 16

 | `leaderElection` [Required]
`LeaderElectionConfiguration`

 |
   LeaderElection defines the configuration of leader election client.

 | `clientConnection` [Required]
`ClientConnectionConfiguration`

 |
   ClientConnection specifies the kubeconfig file and client connection
settings for the proxy server to use when communicating with the apiserver.

 | `DebuggingConfiguration` [Required]
`DebuggingConfiguration`

 |
   DebuggingConfiguration holds configuration for Debugging related features
TODO: We might wanna make this a substruct like Debugging componentbaseconfigv1alpha1.DebuggingConfiguration

 | `percentageOfNodesToScore` [Required]
`int32`

 |
   PercentageOfNodesToScore is the percentage of all nodes that once found feasible
for running a pod, the scheduler stops its search for more feasible nodes in
the cluster. This helps improve scheduler's performance. Scheduler always tries to find
at least "minFeasibleNodesToFind" feasible nodes no matter what the value of this flag is.
Example: if the cluster size is 500 nodes and the value of this flag is 30,
then scheduler stops finding further feasible nodes once it finds 150 feasible ones.
When the value is 0, default percentage (5%--50% based on the size of the cluster) of the
nodes will be scored. It is overridden by profile level PercentageOfNodesToScore.

 | `podInitialBackoffSeconds` [Required]
`int64`

 |
   PodInitialBackoffSeconds is the initial backoff for unschedulable pods.
If specified, it must be greater than 0. If this value is null, the default value (1s)
will be used.

 | `podMaxBackoffSeconds` [Required]
`int64`

 |
   PodMaxBackoffSeconds is the max backoff for unschedulable pods.
If specified, it must be greater than podInitialBackoffSeconds. If this value is null,
the default value (10s) will be used.

 | `profiles` [Required]
`[]KubeSchedulerProfile`

 |
   Profiles are scheduling profiles that kube-scheduler supports. Pods can
choose to be scheduled under a particular profile by setting its associated
scheduler name. Pods that don't specify any scheduler name are scheduled
with the "default-scheduler" profile, if present here.

 | `extenders` [Required]
`[]Extender`

 |
   Extenders are the list of scheduler extenders, each holding the values of how to communicate
with the extender. These extenders are shared by all scheduler profiles.

 | `delayCacheUntilActive` [Required]
`bool`

 |
   DelayCacheUntilActive specifies when to start caching. If this is true and leader election is enabled,
the scheduler will wait to fill informer caches until it is the leader. Doing so will have slower
failover with the benefit of lower memory overhead while waiting to become leader.
Defaults to false.

## `NodeAffinityArgs`     {#kubescheduler-config-k8s-io-v1-NodeAffinityArgs}

NodeAffinityArgs holds arguments to configure the NodeAffinity plugin.

 | Field | Description

 | `apiVersion`string | `kubescheduler.config.k8s.io/v1`

 | `kind`string | `NodeAffinityArgs`

 | `addedAffinity`
`core/v1.NodeAffinity`

 |
   AddedAffinity is applied to all Pods additionally to the NodeAffinity
specified in the PodSpec. That is, Nodes need to satisfy AddedAffinity
AND .spec.NodeAffinity. AddedAffinity is empty by default (all Nodes
match).
When AddedAffinity is used, some Pods with affinity requirements that match
a specific Node (such as Daemonset Pods) might remain unschedulable.

## `NodeResourcesBalancedAllocationArgs`     {#kubescheduler-config-k8s-io-v1-NodeResourcesBalancedAllocationArgs}

NodeResourcesBalancedAllocationArgs holds arguments used to configure NodeResourcesBalancedAllocation plugin.

 | Field | Description

 | `apiVersion`string | `kubescheduler.config.k8s.io/v1`

 | `kind`string | `NodeResourcesBalancedAllocationArgs`

 | `resources` [Required]
`[]ResourceSpec`

 |
   Resources to be managed, the default is "cpu" and "memory" if not specified.

## `NodeResourcesFitArgs`     {#kubescheduler-config-k8s-io-v1-NodeResourcesFitArgs}

NodeResourcesFitArgs holds arguments used to configure the NodeResourcesFit plugin.

 | Field | Description

 | `apiVersion`string | `kubescheduler.config.k8s.io/v1`

 | `kind`string | `NodeResourcesFitArgs`

 | `ignoredResources` [Required]
`[]string`

 |
   IgnoredResources is the list of resources that NodeResources fit filter
should ignore. This doesn't apply to scoring.

 | `ignoredResourceGroups` [Required]
`[]string`

 |
   IgnoredResourceGroups defines the list of resource groups that NodeResources fit filter should ignore.
e.g. if group is ["example.com"], it will ignore all resource names that begin
with "example.com", such as "example.com/aaa" and "example.com/bbb".
A resource group name can't contain '/'. This doesn't apply to scoring.

 | `scoringStrategy` [Required]
`ScoringStrategy`

 |
   ScoringStrategy selects the node resource scoring strategy.
The default strategy is LeastAllocated with an equal "cpu" and "memory" weight.

## `PodTopologySpreadArgs`     {#kubescheduler-config-k8s-io-v1-PodTopologySpreadArgs}

PodTopologySpreadArgs holds arguments used to configure the PodTopologySpread plugin.

 | Field | Description

 | `apiVersion`string | `kubescheduler.config.k8s.io/v1`

 | `kind`string | `PodTopologySpreadArgs`

 | `defaultConstraints`
`[]core/v1.TopologySpreadConstraint`

 |
   DefaultConstraints defines topology spread constraints to be applied to
Pods that don't define any in `pod.spec.topologySpreadConstraints`.
`.defaultConstraints[*].labelSelectors` must be empty, as they are
deduced from the Pod's membership to Services, ReplicationControllers,
ReplicaSets or StatefulSets.
When not empty, .defaultingType must be "List".

 | `defaultingType`
`PodTopologySpreadConstraintsDefaulting`

 |
   DefaultingType determines how .defaultConstraints are deduced. Can be one
of "System" or "List".

"System": Use kubernetes defined constraints that spread Pods among
Nodes and Zones.
"List": Use constraints defined in .defaultConstraints.

Defaults to "System".
