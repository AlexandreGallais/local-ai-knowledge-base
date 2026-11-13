---
title: "Taints and Tolerations (part 1 of 2)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/concepts/scheduling-eviction/taint-and-toleration.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Taints and Tolerations

_Node affinity_
is a property of Pods that *attracts* them to
a set of nodes (either as a preference or a
hard requirement). _Taints_ are the opposite -- they allow a node to repel a set of pods.

_Tolerations_ are applied to pods. Tolerations allow the scheduler to schedule pods with matching
taints. Tolerations allow scheduling but don't guarantee scheduling: the scheduler also
evaluates other parameters
as part of its function.

Taints and tolerations work together to ensure that pods are not scheduled
onto inappropriate nodes. One or more taints are applied to a node; this
marks that the node should not accept any pods that do not tolerate the taints.

## Concepts

You add a taint to a node using kubectl taint.
For example,

```shell
kubectl taint nodes node1 key1=value1:NoSchedule
```

places a taint on node `node1`. The taint has key `key1`, value `value1`, and taint effect `NoSchedule`.
This means that no pod will be able to schedule onto `node1` unless it has a matching toleration.

To remove the taint added by the command above, you can run:

```shell
kubectl taint nodes node1 key1=value1:NoSchedule-
```

You specify a toleration for a pod in the PodSpec. Both of the following tolerations "match" the
taint created by the `kubectl taint` line above, and thus a pod with either toleration would be able
to schedule onto `node1`:

```yaml
tolerations:
- key: "key1"
  operator: "Equal"
  value: "value1"
  effect: "NoSchedule"
```

```yaml
tolerations:
- key: "key1"
  operator: "Exists"
  effect: "NoSchedule"
```

The default Kubernetes scheduler takes taints and tolerations into account when
selecting a node to run a particular Pod. However, if you manually specify the
`.spec.nodeName` for a Pod, that action bypasses the scheduler; the Pod is then
bound onto the node where you assigned it, even if there are `NoSchedule`
taints on that node that you selected.
If this happens and the node also has a `NoExecute` taint set, the kubelet will
eject the Pod unless there is an appropriate tolerance set.

Here's an example of a pod that has some tolerations defined:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx
  labels:
    env: test
spec:
  containers:
  - name: nginx
    image: nginx
    imagePullPolicy: IfNotPresent
  tolerations:
  - key: "example-key"
    operator: "Exists"
    effect: "NoSchedule"
```

The default value for `operator` is `Equal`.

A toleration "matches" a taint if the keys are the same and the effects are the same, and:

* the `operator` is `Exists` (in which case no `value` should be specified), or
* the `operator` is `Equal` and the values should be equal.

**Note:**

There are two special cases:

If the `key` is empty, then the `operator` must be `Exists`, which matches all keys and values.
Note that the `effect` still needs to be matched at the same time.

An empty `effect` matches all effects with key `key1`.

The above example used the `effect` of `NoSchedule`. Alternatively, you can use the `effect` of `PreferNoSchedule`.

The allowed values for the `effect` field are:

`NoExecute`
: This affects pods that are already running on the node as follows:

  * Pods that do not tolerate the taint are evicted immediately
  * Pods that tolerate the taint without specifying `tolerationSeconds` in
    their toleration specification remain bound forever
  * Pods that tolerate the taint with a specified `tolerationSeconds` remain
    bound for the specified amount of time. After that time elapses, the node
    lifecycle controller evicts the Pods from the node.

`NoSchedule`
: No new Pods will be scheduled on the tainted node unless they have a matching
  toleration. Pods currently running on the node are **not** evicted.

`PreferNoSchedule`
: `PreferNoSchedule` is a "preference" or "soft" version of `NoSchedule`.
  The control plane will *try* to avoid placing a Pod that does not tolerate
  the taint on the node, but it is not guaranteed.

You can put multiple taints on the same node and multiple tolerations on the same pod.
The way Kubernetes processes multiple taints and tolerations is like a filter: start
with all of a node's taints, then ignore the ones for which the pod has a matching toleration; the
remaining un-ignored taints have the indicated effects on the pod. In particular,

* if there is at least one un-ignored taint with effect `NoSchedule` then Kubernetes will not schedule
the pod onto that node
* if there is no un-ignored taint with effect `NoSchedule` but there is at least one un-ignored taint with
effect `PreferNoSchedule` then Kubernetes will *try* to not schedule the pod onto the node
* if there is at least one un-ignored taint with effect `NoExecute` then the pod will be evicted from
the node (if it is already running on the node), and will not be
scheduled onto the node (if it is not yet running on the node).

For example, imagine you taint a node like this

```shell
kubectl taint nodes node1 key1=value1:NoSchedule
kubectl taint nodes node1 key1=value1:NoExecute
kubectl taint nodes node1 key2=value2:NoSchedule
```

And a pod has two tolerations:

```yaml
tolerations:
- key: "key1"
  operator: "Equal"
  value: "value1"
  effect: "NoSchedule"
- key: "key1"
  operator: "Equal"
  value: "value1"
  effect: "NoExecute"
```

In this case, the pod will not be able to schedule onto the node, because there is no
toleration matching the third taint. But it will be able to continue running if it is
already running on the node when the taint is added, because the third taint is the only
one of the three that is not tolerated by the pod.

Normally, if a taint with effect `NoExecute` is added to a node, then any pods that do
not tolerate the taint will be evicted immediately, and pods that do tolerate the
taint will never be evicted. However, a toleration with `NoExecute` effect can specify
an optional `tolerationSeconds` field that dictates how long the pod will stay bound
to the node after the taint is added. For example,

```yaml
tolerations:
- key: "key1"
  operator: "Equal"
  value: "value1"
  effect: "NoExecute"
  tolerationSeconds: 3600
```

means that if this pod is running and a matching taint is added to the node, then
the pod will stay bound to the node for 3600 seconds, and then be evicted. If the
taint is removed before that time, the pod will not be evicted.

## Numeric comparison operators {#numeric-comparison-operators}

**Feature state:**

In addition to `Equal` and `Exists`, you can use numeric comparison operators
(`Gt` and `Lt`) to match taints with integer values. This is useful for threshold-based
scheduling, such as matching nodes by reliability level or SLA tier.

* `Gt` matches when the taint value is greater than the toleration value.
* `Lt` matches when the taint value is less than the toleration value.

For numeric operators, both the toleration and taint values must be valid integers.
If either value cannot be parsed as an integer, the toleration does not match.

**Note:**
When you create a Pod that uses `Gt` or `Lt` tolerations operators, the API server validates that
the toleration values are valid integers. Taint values on nodes are not validated at node
registration time. If a node has a non-numeric taint value (for example,
`servicelevel.organization.example/agreed-service-level=high:NoSchedule`),
pods with numeric comparison operators will not match that taint and cannot schedule on that node.

For example, if nodes are tainted with a value representing a service level agreement (SLA):

```shell
kubectl taint nodes node1 servicelevel.organization.example/agreed-service-level=950:NoSchedule
```

A pod can tolerate nodes with SLA greater than 900:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx-numeric-toleration
  labels:
    env: test
spec:
  containers:
    - name: nginx
      image: nginx
      imagePullPolicy: IfNotPresent
  tolerations:
    - key: "servicelevel.organization.example/agreed-service-level"
      operator: "Gt"
      value: "900"
      effect: "NoSchedule"
```

This toleration matches the taint on `node1` because `950 > 900` (the taint value
is greater than the toleration value for the `Gt` operator).
Similarly, you can use the `Lt` operator to match taints where the taint value is
less than the toleration value:

```yaml
tolerations:
- key: "servicelevel.organization.example/agreed-service-level"
  operator: "Lt"
  value: "1000"
  effect: "NoSchedule"
```

**Note:**
When using numeric comparison operators:

* Both the toleration and taint values must be valid signed 64-bit integers
  (zero leading numbers (e.g., "0550") are not allowed).
* If a value cannot be parsed as an integer, the toleration does not match.
* Numeric operators work with all taint effects: `NoSchedule`, `PreferNoSchedule`, and `NoExecute`.
* For `PreferNoSchedule` with numeric operators: if a pod's toleration doesn't satisfy the numeric comparison
  (e.g., taint value < toleration value when using `Gt`), the scheduler gives the node a lower priority
  but may still schedule there if no better options exist.

**Warning:**

Before disabling the `TaintTolerationComparisonOperators` feature gate:

* You should identify all workloads using the `Gt` or `Lt` operators to avoid controller hot-loops.
* Update all workload controller templates to use `Equal` or `Exists` operators instead
* Delete any pending pods that use `Gt` or `Lt` operators
* Monitor the `apiserver_request_total` metric for spikes in validation errors

## Example Use Cases

Taints and tolerations are a flexible way to steer pods *away* from nodes or evict
pods that shouldn't be running. A few of the use cases are

* **Dedicated Nodes**: If you want to dedicate a set of nodes for exclusive use by
a particular set of users, you can add a taint to those nodes (say,
`kubectl taint nodes nodename dedicated=groupName:NoSchedule`) and then add a corresponding
toleration to their pods (this would be done most easily by writing a custom
admission controller).
The pods with the tolerations will then be allowed to use the tainted (dedicated) nodes as
well as any other nodes in the cluster. If you want to dedicate the nodes to them *and*
ensure they *only* use the dedicated nodes, then you should additionally add a label similar
to the taint to the same set of nodes (e.g. `dedicated=groupName`), and the admission
controller should additionally add a node affinity to require that the pods can only schedule
onto nodes labeled with `dedicated=groupName`.

* **Nodes with Special Hardware**: In a cluster where a small subset of nodes have specialized
hardware (for example GPUs), it is desirable to keep pods that don't need the specialized
hardware off of those nodes, thus leaving room for later-arriving pods that do need the
specialized hardware. This can be done by tainting the nodes that have the specialized
hardware (e.g. `kubectl taint nodes nodename special=true:NoSchedule` or
`kubectl taint nodes nodename special=true:PreferNoSchedule`) and adding a corresponding
toleration to pods that use the special hardware. As in the dedicated nodes use case,
it is probably easiest to apply the tolerations using a custom
admission controller.
For example, it is recommended to use Extended
Resources
to represent the special hardware, taint your special hardware nodes with the
extended resource name and run the
ExtendedResourceToleration
admission controller. Now, because the nodes are tainted, no pods without the
toleration will schedule on them. But when you submit a pod that requests the
extended resource, the `ExtendedResourceToleration` admission controller will
automatically add the correct toleration to the pod and that pod will schedule
on the special hardware nodes. This will make sure that these special hardware
nodes are dedicated for pods requesting such hardware and you don't have to
manually add tolerations to your pods.

* **Taint based Evictions**: A per-pod-configurable eviction behavior
when there are node problems, which is described in the next section.
