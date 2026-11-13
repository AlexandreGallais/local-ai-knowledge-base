---
title: "Assigning Pods to Nodes (part 2 of 4)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/concepts/scheduling-eviction/assign-pod-node.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Assigning Pods to Nodes (part 2 of 4)

## Affinity and anti-affinity

`nodeSelector` is the simplest way to constrain Pods to nodes with specific
labels. Affinity and anti-affinity expand the types of constraints you can
define. Some of the benefits of affinity and anti-affinity include:

- The affinity/anti-affinity language is more expressive. `nodeSelector` only
  selects nodes with all the specified labels. Affinity/anti-affinity gives you
  more control over the selection logic.
- You can indicate that a rule is *soft* or *preferred*, so that the scheduler
  still schedules the Pod even if it can't find a matching node.
- You can constrain a Pod using labels on other Pods running on the node (or other topological domain),
  instead of just node labels, which allows you to define rules for which Pods
  can be co-located on a node.

The affinity feature consists of two types of affinity:

- *Node affinity* functions like the `nodeSelector` field but is more expressive and
  allows you to specify soft rules.
- *Inter-pod affinity/anti-affinity* allows you to constrain Pods against labels
  on other Pods.

### Node affinity

Node affinity is conceptually similar to `nodeSelector`, allowing you to constrain which nodes your
Pod can be scheduled on based on node labels. There are two types of node
affinity:

- `requiredDuringSchedulingIgnoredDuringExecution`: The scheduler can't
  schedule the Pod unless the rule is met. This functions like `nodeSelector`,
  but with a more expressive syntax.
- `preferredDuringSchedulingIgnoredDuringExecution`: The scheduler tries to
  find a node that meets the rule. If a matching node is not available, the
  scheduler still schedules the Pod.

**Note:**
In the preceding types, `IgnoredDuringExecution` means that if the node labels
change after Kubernetes schedules the Pod, the Pod continues to run.

You can specify node affinities using the `.spec.affinity.nodeAffinity` field in
your Pod spec.

For example, consider the following Pod spec:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: with-node-affinity
spec:
  affinity:
    nodeAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
        nodeSelectorTerms:
        - matchExpressions:
          - key: topology.kubernetes.io/zone
            operator: In
            values:
            - antarctica-east1
            - antarctica-west1
      preferredDuringSchedulingIgnoredDuringExecution:
      - weight: 1
        preference:
          matchExpressions:
          - key: another-node-label-key
            operator: In
            values:
            - another-node-label-value
  containers:
  - name: with-node-affinity
    image: registry.k8s.io/pause:3.8
```

In this example, the following rules apply:

- The node *must* have a label with the key `topology.kubernetes.io/zone` and
  the value of that label *must* be either `antarctica-east1` or `antarctica-west1`.
- The node *preferably* has a label with the key `another-node-label-key` and
  the value `another-node-label-value`.

You can use the `operator` field to specify a logical operator for Kubernetes to use when
interpreting the rules. You can use `In`, `NotIn`, `Exists`, `DoesNotExist`,
`Gt` and `Lt`.

Read Operators
to learn more about how these work.

`NotIn` and `DoesNotExist` allow you to define node anti-affinity behavior.
Alternatively, you can use node taints
to repel Pods from specific nodes.

**Note:**
If you specify both `nodeSelector` and `nodeAffinity`, *both* must be satisfied
for the Pod to be scheduled onto a node.

If you specify multiple terms in `nodeSelectorTerms` associated with `nodeAffinity`
types, then the Pod can be scheduled onto a node if one of the specified terms
can be satisfied (terms are ORed).

If you specify multiple expressions in a single `matchExpressions` field associated with a
term in `nodeSelectorTerms`, then the Pod can be scheduled onto a node only
if all the expressions are satisfied (expressions are ANDed).

See Assign Pods to Nodes using Node Affinity
for more information.

#### Node affinity weight

You can specify a `weight` between 1 and 100 for each instance of the
`preferredDuringSchedulingIgnoredDuringExecution` affinity type. When the
scheduler finds nodes that meet all the other scheduling requirements of the Pod, the
scheduler iterates through every preferred rule that the node satisfies and adds the
value of the `weight` for that expression to a sum.

The final sum is added to the score of other priority functions for the node.
Nodes with the highest total score are prioritized when the scheduler makes a
scheduling decision for the Pod.

For example, consider the following Pod spec:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: with-affinity-preferred-weight
spec:
  affinity:
    nodeAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
        nodeSelectorTerms:
        - matchExpressions:
          - key: kubernetes.io/os
            operator: In
            values:
            - linux
      preferredDuringSchedulingIgnoredDuringExecution:
      - weight: 1
        preference:
          matchExpressions:
          - key: label-1
            operator: In
            values:
            - key-1
      - weight: 50
        preference:
          matchExpressions:
          - key: label-2
            operator: In
            values:
            - key-2
  containers:
  - name: with-node-affinity
    image: registry.k8s.io/pause:3.8
```

If there are two possible nodes that match the
`preferredDuringSchedulingIgnoredDuringExecution` rule, one with the
`label-1:key-1` label and another with the `label-2:key-2` label, the scheduler
considers the `weight` of each node and adds the weight to the other scores for
that node, and schedules the Pod onto the node with the highest final score.

**Note:**
If you want Kubernetes to successfully schedule the Pods in this example, you
must have existing nodes with the `kubernetes.io/os=linux` label.

#### Node affinity per scheduling profile

**Feature state:** v1.20 [beta]

When configuring multiple scheduling profiles, you can associate
a profile with a node affinity, which is useful if a profile only applies to a specific set of nodes.
To do so, add an `addedAffinity` to the `args` field of the `NodeAffinity` plugin
in the scheduler configuration. For example:

```yaml
apiVersion: kubescheduler.config.k8s.io/v1
kind: KubeSchedulerConfiguration

profiles:
  - schedulerName: default-scheduler
  - schedulerName: foo-scheduler
    pluginConfig:
      - name: NodeAffinity
        args:
          addedAffinity:
            requiredDuringSchedulingIgnoredDuringExecution:
              nodeSelectorTerms:
              - matchExpressions:
                - key: scheduler-profile
                  operator: In
                  values:
                  - foo
```

The `addedAffinity` is applied to all Pods that set `.spec.schedulerName` to `foo-scheduler`, in addition to the
NodeAffinity specified in the PodSpec.
That is, in order to match the Pod, nodes need to satisfy `addedAffinity` and
the Pod's `.spec.NodeAffinity`.

Since the `addedAffinity` is not visible to end users, its behavior might be
unexpected to them. Use node labels that have a clear correlation to the
scheduler profile name.

**Note:**
The DaemonSet controller, which creates Pods for DaemonSets,
does not support scheduling profiles. When the DaemonSet controller creates
Pods, the default Kubernetes scheduler places those Pods and honors any
`nodeAffinity` rules in the DaemonSet controller.
