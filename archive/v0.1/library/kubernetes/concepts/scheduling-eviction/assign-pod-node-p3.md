---
title: "Assigning Pods to Nodes (part 3 of 4)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/concepts/scheduling-eviction/assign-pod-node.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Assigning Pods to Nodes (part 3 of 4)

### Inter-pod affinity and anti-affinity

Inter-pod affinity and anti-affinity allow you to constrain which nodes your
Pods can be scheduled on based on the labels of Pods already running on that
node, instead of the node labels.

#### Types of Inter-pod Affinity and Anti-affinity

Inter-pod affinity and anti-affinity take the form "this
Pod should (or, in the case of anti-affinity, should not) run in an X if that X
is already running one or more Pods that meet rule Y", where X is a topology
domain like node, rack, cloud provider zone or region, or similar and Y is the
rule Kubernetes tries to satisfy.

You express these rules (Y) as label selectors
with an optional associated list of namespaces. Pods are namespaced objects in
Kubernetes, so Pod labels also implicitly have namespaces. Any label selectors
for Pod labels should specify the namespaces in which Kubernetes should look for those
labels.

You express the topology domain (X) using a `topologyKey`, which is the key for
the node label that the system uses to denote the domain. For examples, see
Well-Known Labels, Annotations and Taints.

**Note:**
Inter-pod affinity and anti-affinity require substantial amounts of
processing which can slow down scheduling in large clusters significantly. We do
not recommend using them in clusters larger than several hundred nodes.

**Note:**
Pod anti-affinity requires nodes to be consistently labeled, in other words,
every node in the cluster must have an appropriate label matching `topologyKey`.
If some or all nodes are missing the specified `topologyKey` label, it can lead
to unintended behavior.

Similar to node affinity are two types of Pod affinity and
anti-affinity as follows:

- `requiredDuringSchedulingIgnoredDuringExecution`
- `preferredDuringSchedulingIgnoredDuringExecution`

For example, you could use
`requiredDuringSchedulingIgnoredDuringExecution` affinity to tell the scheduler to
co-locate Pods of two services in the same cloud provider zone because they
communicate with each other a lot. Similarly, you could use
`preferredDuringSchedulingIgnoredDuringExecution` anti-affinity to spread Pods
from a service across multiple cloud provider zones.

To use inter-pod affinity, use the `affinity.podAffinity` field in the Pod spec.
For inter-pod anti-affinity, use the `affinity.podAntiAffinity` field in the Pod
spec.

#### Scheduling Behavior

When scheduling a new Pod, the Kubernetes scheduler evaluates the Pod's affinity/anti-affinity rules in the context of the current cluster state:

1. Hard Constraints (Node Filtering):
   - `podAffinity.requiredDuringSchedulingIgnoredDuringExecution` and `podAntiAffinity.requiredDuringSchedulingIgnoredDuringExecution`:
     - The scheduler ensures the new Pod is assigned to nodes that satisfy these required affinity and anti-affinity rules based on existing Pods.

2. Soft Constraints (Scoring):
   - `podAffinity.preferredDuringSchedulingIgnoredDuringExecution` and `podAntiAffinity.preferredDuringSchedulingIgnoredDuringExecution`:
     - The scheduler scores nodes based on how well they meet these preferred affinity and anti-affinity rules to optimize Pod placement.

3. Ignored Fields:
   - Existing Pods' `podAffinity.preferredDuringSchedulingIgnoredDuringExecution`:
     - These preferred affinity rules are not considered during the scheduling decision for new Pods.
   - Existing Pods' `podAntiAffinity.preferredDuringSchedulingIgnoredDuringExecution`:
     - Similarly, preferred anti-affinity rules of existing Pods are ignored during scheduling.

#### Scheduling a Group of Pods with Inter-pod Affinity to Themselves

If the current Pod being scheduled is the first in a series that have affinity to themselves,
it is allowed to be scheduled if it passes all other affinity checks. This is determined by
verifying that no other Pod in the cluster matches the namespace and selector of this Pod,
that the Pod matches its own terms, and the chosen node matches all requested topologies.
This ensures that there will not be a deadlock even if all the Pods have inter-pod affinity
specified.

#### Pod Affinity Example {#an-example-of-a-pod-that-uses-pod-affinity}

Consider the following Pod spec:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: with-pod-affinity
spec:
  affinity:
    podAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
      - labelSelector:
          matchExpressions:
          - key: <example-value>
            operator: In
            values:
            - S1
        topologyKey: topology.kubernetes.io/zone
    podAntiAffinity:
      preferredDuringSchedulingIgnoredDuringExecution:
      - weight: 100
        podAffinityTerm:
          labelSelector:
            matchExpressions:
            - key: <example-value>
              operator: In
              values:
              - S2
          topologyKey: topology.kubernetes.io/zone
  containers:
  - name: with-pod-affinity
    image: registry.k8s.io/pause:3.8
```

This example defines one Pod affinity rule and one Pod anti-affinity rule. The
Pod affinity rule uses the "hard"
`requiredDuringSchedulingIgnoredDuringExecution`, while the anti-affinity rule
uses the "soft" `preferredDuringSchedulingIgnoredDuringExecution`.

The affinity rule specifies that the scheduler is allowed to place the example Pod
on a node only if that node belongs to a specific zone
where other Pods have been labeled with `security=S1`.
For instance, if we have a cluster with a designated zone, let's call it "Zone V,"
consisting of nodes labeled with `topology.kubernetes.io/zone=V`, the scheduler can
assign the Pod to any node within Zone V, as long as there is at least one Pod within
Zone V already labeled with `security=S1`. Conversely, if there are no Pods with `security=S1`
labels in Zone V, the scheduler will not assign the example Pod to any node in that zone.

The anti-affinity rule specifies that the scheduler should try to avoid scheduling the Pod
on a node if that node belongs to a specific zone
where other Pods have been labeled with `security=S2`.
For instance, if we have a cluster with a designated zone, let's call it "Zone R,"
consisting of nodes labeled with `topology.kubernetes.io/zone=R`, the scheduler should avoid
assigning the Pod to any node within Zone R, as long as there is at least one Pod within
Zone R already labeled with `security=S2`. Conversely, the anti-affinity rule does not impact
scheduling into Zone R if there are no Pods with `security=S2` labels.

To get yourself more familiar with the examples of Pod affinity and anti-affinity,
refer to the design proposal.

You can use the `In`, `NotIn`, `Exists` and `DoesNotExist` values in the
`operator` field for Pod affinity and anti-affinity.

Read Operators
to learn more about how these work.

In principle, the `topologyKey` can be any allowed label key with the following
exceptions for performance and security reasons:

- For Pod affinity and anti-affinity, an empty `topologyKey` field is not allowed in both
  `requiredDuringSchedulingIgnoredDuringExecution`
  and `preferredDuringSchedulingIgnoredDuringExecution`.
- For `requiredDuringSchedulingIgnoredDuringExecution` Pod anti-affinity rules,
  the admission controller `LimitPodHardAntiAffinityTopology` limits
  `topologyKey` to `kubernetes.io/hostname`. You can modify or disable the
  admission controller if you want to allow custom topologies.

In addition to `labelSelector` and `topologyKey`, you can optionally specify a list
of namespaces which the `labelSelector` should match against using the
`namespaces` field at the same level as `labelSelector` and `topologyKey`.
If omitted or empty, `namespaces` defaults to the namespace of the Pod where the
affinity/anti-affinity definition appears.

#### Namespace Selector

**Feature state:** v1.24 [stable]

You can also select matching namespaces using `namespaceSelector`, which is a label query over the set of namespaces.
The affinity term is applied to namespaces selected by both `namespaceSelector` and the `namespaces` field.
Note that an empty `namespaceSelector` ({}) matches all namespaces, while a null or empty `namespaces` list and
null `namespaceSelector` matches the namespace of the Pod where the rule is defined.

#### matchLabelKeys

**Feature state:**

**Note:**

The `matchLabelKeys` field is a beta-level field and is enabled by default in
Kubernetes .
When you want to disable it, you have to disable it explicitly via the
`MatchLabelKeysInPodAffinity` feature gate.

Kubernetes includes an optional `matchLabelKeys` field for Pod affinity
or anti-affinity. The field specifies keys for the labels that should match with the incoming Pod's labels,
when satisfying the Pod (anti)affinity.

The keys are used to look up values from the Pod labels; those key-value labels are combined
(using `AND`) with the match restrictions defined using the `labelSelector` field. The combined
filtering selects the set of existing Pods that will be taken into Pod (anti)affinity calculation.

**Caution:**
It's not recommended to use `matchLabelKeys` with labels that might be updated directly on pods.
Even if you edit the pod's label that is specified at `matchLabelKeys` **directly**, (that is, not via a deployment),
kube-apiserver doesn't reflect the label update onto the merged `labelSelector`.

A common use case is to use `matchLabelKeys` with `pod-template-hash` (set on Pods
managed as part of a Deployment, where the value is unique for each revision).
Using `pod-template-hash` in `matchLabelKeys` allows you to target the Pods that belong
to the same revision as the incoming Pod, so that a rolling upgrade won't break affinity.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: application-server
...
spec:
  template:
    spec:
      affinity:
        podAffinity:
          requiredDuringSchedulingIgnoredDuringExecution:
          - labelSelector:
              matchExpressions:
              - key: app
                operator: In
                values:
                - database
            topologyKey: topology.kubernetes.io/zone
            # Only Pods from a given rollout are taken into consideration when calculating pod affinity.
            # If you update the Deployment, the replacement Pods follow their own affinity rules
            # (if there are any defined in the new Pod template)
            matchLabelKeys:
            - pod-template-hash
```

#### mismatchLabelKeys

**Feature state:**

**Note:**

The `mismatchLabelKeys` field is a beta-level field and is enabled by default in
Kubernetes .
When you want to disable it, you have to disable it explicitly via the
`MatchLabelKeysInPodAffinity` feature gate.

Kubernetes includes an optional `mismatchLabelKeys` field for Pod affinity
or anti-affinity. The field specifies keys for the labels that should not match with the incoming Pod's labels,
when satisfying the Pod (anti)affinity.

**Caution:**
It's not recommended to use `mismatchLabelKeys` with labels that might be updated directly on pods.
Even if you edit the pod's label that is specified at `mismatchLabelKeys` **directly**, (that is, not via a deployment),
kube-apiserver doesn't reflect the label update onto the merged `labelSelector`.

One example use case is to ensure Pods go to the topology domain (node, zone, etc) where only Pods from the same tenant or team are scheduled in.
In other words, you want to avoid running Pods from two different tenants on the same topology domain at the same time.

```yaml
apiVersion: v1
kind: Pod
metadata:
  labels:
    # Assume that all relevant Pods have a "tenant" label set
    tenant: tenant-a
...
spec:
  affinity:
    podAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
      # ensure that Pods associated with this tenant land on the correct node pool
      - matchLabelKeys:
          - tenant
        labelSelector: {}
        topologyKey: <example-value>
    podAntiAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
      # ensure that Pods associated with this tenant can't schedule to nodes used for another tenant
      - mismatchLabelKeys:
        - tenant # whatever the value of the "tenant" label for this Pod, prevent
                 # scheduling to nodes in any pool where any Pod from a different
                 # tenant is running.
        labelSelector:
          # We have to have the labelSelector which selects only Pods with the tenant label,
          # otherwise this Pod would have anti-affinity against Pods from daemonsets as well, for example,
          # which aren't supposed to have the tenant label.
          matchExpressions:
          - key: <example-value>
            operator: Exists
        topologyKey: <example-value>
```

#### More practical use-cases

Inter-pod affinity and anti-affinity can be even more useful when they are used with higher
level collections such as ReplicaSets, StatefulSets, Deployments, etc. These
rules allow you to configure that a set of workloads should
be co-located in the same defined topology; for example, preferring to place two related
Pods onto the same node.

For example: imagine a three-node cluster. You use the cluster to run a web application
and also an in-memory cache (such as Redis). For this example, also assume that latency between
the web application and the memory cache should be as low as is practical. You could use inter-pod
affinity and anti-affinity to co-locate the web servers with the cache as much as possible.

In the following example Deployment for the Redis cache, the replicas get the label `app=store`. The
`podAntiAffinity` rule tells the scheduler to avoid placing multiple replicas
with the `app=store` label on a single node. This creates each cache in a
separate node.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: redis-cache
spec:
  selector:
    matchLabels:
      app: store
  replicas: 3
  template:
    metadata:
      labels:
        app: store
    spec:
      affinity:
        podAntiAffinity:
          requiredDuringSchedulingIgnoredDuringExecution:
          - labelSelector:
              matchExpressions:
              - key: app
                operator: In
                values:
                - store
            topologyKey: "kubernetes.io/hostname"
      containers:
      - name: redis-server
        image: redis:3.2-alpine
```

The following example Deployment for the web servers creates replicas with the label `app=web-store`.
The Pod affinity rule tells the scheduler to place each replica on a node that has a Pod
with the label `app=store`. The Pod anti-affinity rule tells the scheduler never to place
multiple `app=web-store` servers on a single node.
