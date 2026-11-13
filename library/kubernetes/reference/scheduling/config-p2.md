---
title: "Scheduler Configuration (part 2 of 3)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/scheduling/config.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Scheduler Configuration (part 2 of 3)

## Profiles

A scheduling Profile allows you to configure the different stages of scheduling
in the kube-scheduler.
Each stage is exposed in an extension point.
Plugins provide scheduling behaviors by implementing one
or more of these extension points.

You can configure a single instance of `kube-scheduler` to run
multiple profiles.

### Extension points

Scheduling happens in a series of stages that are exposed through the following
extension points:

1. `queueSort`: These plugins provide an ordering function that is used to
   sort pending Pods in the scheduling queue. Exactly one queue sort plugin
   may be enabled at a time.
1. `placementGenerate`: These plugins generate potential placements (sets of
   nodes) where a considered PodGroup could be scheduled. This extension point
   is only applicable to PodGroup scheduling and requires Workload scheduling
   to be enabled.
1. `placementScore`: These plugins score the placements proposed by
   `placementGenerate`, to pick the optimal placement for the considered
    PodGroup.
1. `preFilter`: These plugins are used to pre-process or check information
   about a Pod or the cluster before filtering. They can mark a pod as
   unschedulable.
1. `filter`: These plugins are the equivalent of Predicates in a scheduling
   Policy and are used to filter out nodes that can not run the Pod. Filters
   are called in the configured order. A pod is marked as unschedulable if no
   nodes pass all the filters.
1. `postFilter`: These plugins are called in their configured order when no
   feasible nodes were found for the pod. If any `postFilter` plugin marks the
   Pod _schedulable_, the remaining plugins are not called. These plugins are not
   applicable for pods being scheduled as part of PodGroup scheduling.
1. `podGroupPostFilter`: These plugins are called in their configured order when no
   feasible placement is found for the pod group. If any `podGroupPostFilter` plugin marks
   the pod group as _schedulable_, the remaining plugins are not called. This extension point
   is only applicable to PodGroup scheduling and requires Workload scheduling
   to be enabled.
1. `preScore`: This is an informational extension point that can be used
   for doing pre-scoring work.
1. `score`: These plugins provide a score to each node that has passed the
   filtering phase. The scheduler will then select the node with the highest
   weighted scores sum.
1. `reserve`: This is an informational extension point that notifies plugins
   when resources have been reserved for a given Pod. Plugins also implement an
   `Unreserve` call that gets called in the case of failure during or after
   `Reserve`.
1. `permit`: These plugins can prevent or delay the binding of a Pod.
1. `preBind`: These plugins perform any work required before a Pod is bound.
1. `bind`: The plugins bind a Pod to a Node. `bind` plugins are called in order
   and once one has done the binding, the remaining plugins are skipped. At
   least one bind plugin is required.
1. `postBind`: This is an informational extension point that is called after
   a Pod has been bound.
1. `multiPoint`: This is a config-only field that allows plugins to be enabled
   or disabled for all of their applicable extension points simultaneously.

For each extension point, you could disable specific default plugins
or enable your own. For example:

```yaml
apiVersion: kubescheduler.config.k8s.io/v1
kind: KubeSchedulerConfiguration
profiles:
  - plugins:
      score:
        disabled:
        - name: PodTopologySpread
        enabled:
        - name: MyCustomPluginA
          weight: 2
        - name: MyCustomPluginB
          weight: 1
```

You can use `*` as name in the disabled array to disable all default plugins
for that extension point. This can also be used to rearrange plugins order, if
desired.

### Scheduling plugins

The following plugins, enabled by default, implement one or more of these
extension points:

- `ImageLocality`: Favors nodes that already have the container images that the
  Pod runs.
  Extension points: `score`.
- `TaintToleration`: Implements
  taints and tolerations.
  Implements extension points: `filter`, `preScore`, `score`.
- `NodeName`: Checks if a Pod spec node name matches the current node.
  Extension points: `filter`.
- `NodePorts`: Checks if a node has free ports for the requested Pod ports.
  Extension points: `preFilter`, `filter`.
- `NodeAffinity`: Implements
  node selectors
  and node affinity.
  Extension points: `filter`, `score`.
- `PodTopologySpread`: Implements
  Pod topology spread.
  Extension points: `preFilter`, `filter`, `preScore`, `score`.
- `NodeUnschedulable`: Filters out nodes that have `.spec.unschedulable` set to
  true.
  Extension points: `filter`.
- `NodeResourcesFit`: For pod-by-pod scheduling checks if the node has all
  the resources that the Pod is requesting. The score can use one of three
  strategies: `LeastAllocated` (default), `MostAllocated` and
  `RequestedToCapacityRatio`.
  For PodGroup scheduling calculates the resource utilization in the entire evaluated placement.
  The score uses the `MostAllocated` strategy.
  Extension points: `preFilter`, `filter`, `score`, `placementScore`.
- `NodeResourcesBalancedAllocation`: Favors nodes that would obtain a more
  balanced resource usage if the Pod is scheduled there.
  Extension points: `score`.
- `VolumeBinding`: Checks if the node has or if it can bind the requested
  volumes.
  Extension points: `preFilter`, `filter`, `reserve`, `preBind`, `score`.
  **Note:**
  `score` extension point is enabled when `StorageCapacityScoring` feature is
  enabled. It prioritizes the smallest PVs that can fit the requested volume
  size.

- `VolumeRestrictions`: Checks that volumes mounted in the node satisfy
  restrictions that are specific to the volume provider.
  Extension points: `filter`.
- `VolumeZone`: Checks that volumes requested satisfy any zone requirements they
  might have.
  Extension points: `filter`.
- `NodeVolumeLimits`: Checks that CSI volume limits can be satisfied for the
  node. This plugin can also prevent pod placement to a node if no CSI driver is installed on the node,
  which requires `VolumeLimitScaling` feature gate to be enabled. It also
  allows cluster-autoscaler to accurately calculate number of nodes required
  for scheduling pending pods with attachable CSI volumes.
  Extension points: `filter`.
- `EBSLimits`: Checks that AWS EBS volume limits can be satisfied for the node.
  Extension points: `filter`.
- `GCEPDLimits`: Checks that GCP-PD volume limits can be satisfied for the node.
  Extension points: `filter`.
- `AzureDiskLimits`: Checks that Azure disk volume limits can be satisfied for
  the node.
  Extension points: `filter`.
- `InterPodAffinity`: Implements
  inter-Pod affinity and anti-affinity.
  Extension points: `preFilter`, `filter`, `preScore`, `score`.
- `PrioritySort`: Provides the default priority based sorting.
  Extension points: `queueSort`.
- `DefaultBinder`: Provides the default binding mechanism.
  Extension points: `bind`.
- `DefaultPreemption`: Provides the default preemption mechanism.
  Extension points: `postFilter`, `podGroupPostFilter`.
- `TopologyPlacement`: Provides the default placement generation mechanism for PodGroup's topology
  constraints.
  Extension points: `placementGenerate`.
- `PodGroupPodsCount`: Provides the placement scoring algorithm based on the number of pods that
  can be scheduled in the given placement.
  Extension points: `placementScore`.

You can also enable the following plugins, through the component config APIs,
that are not enabled by default:

- `CinderLimits`: Checks that OpenStack Cinder
  volume limits can be satisfied for the node.
  Extension points: `filter`.

### Multiple profiles

You can configure `kube-scheduler` to run more than one profile.
Each profile has an associated scheduler name and can have a different set of
plugins configured in its extension points.

With the following sample configuration, the scheduler will run with two
profiles: one with the default plugins and one with all scoring plugins
disabled.

```yaml
apiVersion: kubescheduler.config.k8s.io/v1
kind: KubeSchedulerConfiguration
profiles:
  - schedulerName: default-scheduler
  - schedulerName: no-scoring-scheduler
    plugins:
      preScore:
        disabled:
        - name: '*'
      score:
        disabled:
        - name: '*'
```

Pods that want to be scheduled according to a specific profile can include
the corresponding scheduler name in its `.spec.schedulerName`.

By default, one profile with the scheduler name `default-scheduler` is created.
This profile includes the default plugins described above. When declaring more
than one profile, a unique scheduler name for each of them is required.

If a Pod doesn't specify a scheduler name, kube-apiserver will set it to
`default-scheduler`. Therefore, a profile with this scheduler name should exist
to get those pods scheduled.

**Note:**
Pod's scheduling events have `.spec.schedulerName` as their `reportingController`.
Events for leader election use the scheduler name of the first profile in the list.

For more information, please refer to the `reportingController` section under
Event API Reference.

**Note:**
All profiles must use the same plugin in the `queueSort` extension point and have
the same configuration parameters (if applicable). This is because the scheduler
only has one pending pods queue.
