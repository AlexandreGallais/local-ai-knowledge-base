---
title: "Pod Priority and Preemption (part 2 of 2)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/concepts/scheduling-eviction/pod-priority-preemption.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Pod Priority and Preemption (part 2 of 2)

## Preemption

When Pods are created, they go to a queue and wait to be scheduled. The
scheduler picks a Pod from the queue and tries to schedule it on a Node. If no
Node is found that satisfies all the specified requirements of the Pod,
preemption logic is triggered for the pending Pod. Let's call the pending Pod P.
Preemption logic tries to find a Node where removal of one or more Pods with
lower priority than P would enable P to be scheduled on that Node. If such a
Node is found, one or more lower priority Pods get evicted from the Node. After
the Pods are gone, P can be scheduled on the Node.

### PodGroup preemption

**Feature state:**

When the `GenericWorkload` feature gate is enabled, PodGroups can participate
in preemption as either the initiator or the victim. When a PodGroup triggers
preemption, it follows the
workload-aware preemption
logic to preempt other Pods and PodGroups to make room for itself.
When a Pod triggers preemption, a PodGroup can become a victim. In that case the
PodGroup `priority` field is used for ordering with respect to other potential
victims and `disruptionMode` field is used to dictate the PodGroup disruption behavior.
The detailed description of those fields is available on the
Pod Group Disruption and Priority
page.

### User exposed information

When Pod P preempts one or more Pods on Node N, `nominatedNodeName` field of Pod
P's status is set to the name of Node N. This field helps the scheduler track
resources reserved for Pod P and also gives users information about preemptions
in their clusters.

Please note that Pod P is not necessarily scheduled to the "nominated Node".
The scheduler always tries the "nominated Node" before iterating over any other nodes.
After victim Pods are preempted, they get their graceful termination period. If
another node becomes available while scheduler is waiting for the victim Pods to
terminate, scheduler may use the other node to schedule Pod P. As a result
`nominatedNodeName` and `nodeName` of Pod spec are not always the same. Also, if
the scheduler preempts Pods on Node N, but then a higher priority Pod than Pod P
arrives, the scheduler may give Node N to the new higher priority Pod. In such a
case, scheduler clears `nominatedNodeName` of Pod P. By doing this, scheduler
makes Pod P eligible to preempt Pods on another Node.

### Limitations of preemption

#### Graceful termination of preemption victims

When Pods are preempted, the victims get their
graceful termination period.
They have that much time to finish their work and exit. If they don't, they are
killed. This graceful termination period creates a time gap between the point
that the scheduler preempts Pods and the time when the pending Pod (P) can be
scheduled on the Node (N). In the meantime, the scheduler keeps scheduling other
pending Pods. As victims exit or get terminated, the scheduler tries to schedule
Pods in the pending queue. Therefore, there is usually a time gap between the
point that scheduler preempts victims and the time that Pod P is scheduled. In
order to minimize this gap, one can set graceful termination period of lower
priority Pods to zero or a small number.

#### PodDisruptionBudget is supported, but not guaranteed

A PodDisruptionBudget (PDB)
allows application owners to limit the number of Pods of a replicated application
that are down simultaneously from voluntary disruptions. Kubernetes supports
PDB when preempting Pods, but respecting PDB is best effort. The scheduler tries
to find victims whose PDB are not violated by preemption, but if no such victims
are found, preemption will still happen, and lower priority Pods will be removed
despite their PDBs being violated.

#### Inter-Pod affinity on lower-priority Pods

A Node is considered for preemption only when the answer to this question is
yes: "If all the Pods with lower priority than the pending Pod are removed from
the Node, can the pending Pod be scheduled on the Node?"

**Note:**
Preemption does not necessarily remove all lower-priority
Pods. If the pending Pod can be scheduled by removing fewer than all
lower-priority Pods, then only a portion of the lower-priority Pods are removed.
Even so, the answer to the preceding question must be yes. If the answer is no,
the Node is not considered for preemption.

If a pending Pod has inter-pod affinity
to one or more of the lower-priority Pods on the Node, the inter-Pod affinity
rule cannot be satisfied in the absence of those lower-priority Pods. In this case,
the scheduler does not preempt any Pods on the Node. Instead, it looks for another
Node. The scheduler might find a suitable Node or it might not. There is no
guarantee that the pending Pod can be scheduled.

Our recommended solution for this problem is to create inter-Pod affinity only
towards equal or higher priority Pods.

#### Cross node preemption

Suppose a Node N is being considered for preemption so that a pending Pod P can
be scheduled on N. P might become feasible on N only if a Pod on another Node is
preempted. Here's an example:

*   Pod P is being considered for Node N.
*   Pod Q is running on another Node in the same Zone as Node N.
*   Pod P has Zone-wide anti-affinity with Pod Q (`topologyKey:
    topology.kubernetes.io/zone`).
*   There are no other cases of anti-affinity between Pod P and other Pods in
    the Zone.
*   In order to schedule Pod P on Node N, Pod Q can be preempted, but scheduler
    does not perform cross-node preemption. So, Pod P will be deemed
    unschedulable on Node N.

If Pod Q were removed from its Node, the Pod anti-affinity violation would be
gone, and Pod P could possibly be scheduled on Node N.

We may consider adding cross Node preemption in future versions if there is
enough demand and if we find an algorithm with reasonable performance.

### Preemption for in-place Pod resize {#preemption-for-in-place-pod-resize}

**Feature state:**

When the `InPlacePodVerticalScalingSchedulerPreemption` feature gate is enabled,
preemption also applies when a running Pod's in-place resize request is `Deferred`
(meaning the requested resize is temporarily not possible, but might become
feasible later) due to insufficient node capacity.
For details on resize states, see
Pod resize status.

If a higher-priority Pod cannot be resized in-place because its node lacks
available CPU or memory, `kube-scheduler` attempts to preempt lower-priority Pods
on that node to free up the required capacity.

Preemption for in-place Pod resize differs from standard Pod placement
preemption in several key ways:

* **Node restriction**: Preemption is strictly restricted to the Pod's currently
  assigned node. The scheduler does not evaluate other candidate nodes across
  the cluster.
* **Resource delta calculation**: Required preemption capacity is calculated
  based on the resource delta (the difference between the desired resources and
  currently allocated resources), rather than the total Pod request.
* **Resource blocking**: The requested resources of the resizing Pod are
  considered already consumed for scheduler resource accounting on that node,
  blocking other lower-priority Pods from using them until the resize is
  eventually performed or the deferred status is removed by the Kubelet.
* **Nominated node status**: The `nominatedNodeName` field in the Pod's status
  is not set, because the Pod is already assigned to and running on its target node.
* **Kubelet actuation**: The scheduler triggers preemption to free up node
  capacity, but does not re-bind the Pod. The Kubelet detects the newly freed
  capacity on the node and performs the actual in-place resize actuation.
* **Node-level preemption policy**: Preemption can be disabled specifically for
  in-place resizes on specific nodes using the Node spec's
  `spec.podPreemptionPolicy.disableResizePreemption` field.
  Unlike standard preemption, which can only be disabled per-priority-class
  using `preemptionPolicy: Never`, this allows operators or autoscaling systems
  to disable preemption on individual nodes.

For more details on in-place Pod resizing, see
Resize CPU and Memory Resources assigned to Containers.

#### Disabling preemption for in-place Pod resize at the Node level {#disabling-preemption-for-in-place-pod-resize-at-the-node-level}

Cluster operators and controllers can disable scheduler-triggered preemption
caused by in-place Pod resize requests on specific nodes.
This is useful for resizable nodes or nodes with custom autoscaling solutions,
protecting existing workloads from disruption and allowing node-upsizing to
handle the resource deficit instead.

This is configured using the `spec.podPreemptionPolicy` field on the `Node` spec.
If the `disableResizePreemption` list is non-empty, resize-induced preemption
is disabled on that node, and `kube-scheduler` will skip preemption attempts
for any deferred resizes running on that node.

Here is an example Node configuration:

```yaml
apiVersion: v1
kind: Node
metadata:
  name: resizable-node
spec:
  podPreemptionPolicy:
    disableResizePreemption:
      - autoscaling.k8s.io/cluster-autoscaler
      - autoscaling.k8s.io/vpa-updater
```

Constraints and validation rules:
* **Label format**: Each entry in the `disableResizePreemption` list must follow
  the standard Kubernetes label key <example-value> (for example, a DNS subdomain prefix
  and a name separated by a `/`).
* **Max items**: The list can contain a maximum of 20 entries.
* **Non-empty list**: The policy is honored (preemption is disabled) if the
  list contains at least one entry.
  If the list is empty or the `podPreemptionPolicy` field is omitted,
  preemption for in-place resize is enabled on the node.

## Troubleshooting

Pod priority and preemption can have unwanted side effects. Here are some
examples of potential problems and ways to deal with them.

### Pods are preempted unnecessarily

Preemption removes existing Pods from a cluster under resource pressure to make
room for higher priority pending Pods. If you give high priorities to
certain Pods by mistake, these unintentionally high priority Pods may cause
preemption in your cluster. Pod priority is specified by setting the
`priorityClassName` field in the Pod's specification. The integer value for
priority is then resolved and populated to the `priority` field of `podSpec`.

To address the problem, you can change the `priorityClassName` for those Pods
to use lower priority classes, or leave that field empty. An empty
`priorityClassName` is resolved to zero by default.

When a Pod is preempted, there will be events recorded for the preempted Pod.
Preemption should happen only when a cluster does not have enough resources for
a Pod. In such cases, preemption happens only when the priority of the pending
Pod (preemptor) is higher than the victim Pods. Preemption must not happen when
there is no pending Pod, or when the pending Pods have equal or lower priority
than the victims. If preemption happens in such scenarios, please file an issue.

### Pods are preempted, but the preemptor is not scheduled

When pods are preempted, they receive their requested graceful termination
period, which is by default 30 seconds. If the victim Pods do not terminate within
this period, they are forcibly terminated. Once all the victims go away, the
preemptor Pod can be scheduled.

While the preemptor Pod is waiting for the victims to go away, a higher priority
Pod may be created that fits on the same Node. In this case, the scheduler will
schedule the higher priority Pod instead of the preemptor.

This is expected behavior: the Pod with the higher priority should take the place
of a Pod with a lower priority.

### Higher priority Pods are preempted before lower priority pods

The scheduler tries to find nodes that can run a pending Pod. If no node is
found, the scheduler tries to remove Pods with lower priority from an arbitrary
node in order to make room for the pending pod.
If a node with low priority Pods is not feasible to run the pending Pod, the scheduler
may choose another node with higher priority Pods (compared to the Pods on the
other node) for preemption. The victims must still have lower priority than the
preemptor Pod.

When there are multiple nodes available for preemption, the scheduler tries to
choose the node with a set of Pods with lowest priority. However, if such Pods
have PodDisruptionBudget that would be violated if they are preempted then the
scheduler may choose another node with higher priority Pods.

When multiple nodes exist for preemption and none of the above scenarios apply,
the scheduler chooses a node with the lowest priority.

## Interactions between Pod priority and quality of service {#interactions-of-pod-priority-and-qos}

Pod priority and QoS class
are two orthogonal features with few interactions and no default restrictions on
setting the priority of a Pod based on its QoS classes. The scheduler's
preemption logic does not consider QoS when choosing preemption targets.
Preemption considers Pod priority and attempts to choose a set of targets with
the lowest priority. Higher-priority Pods are considered for preemption only if
the removal of the lowest priority Pods is not sufficient to allow the scheduler
to schedule the preemptor Pod, or if the lowest priority Pods are protected by
`PodDisruptionBudget`.

The kubelet uses Priority to determine pod order for node-pressure eviction.
You can use the QoS class to estimate the order in which pods are most likely
to get evicted. The kubelet ranks pods for eviction based on the following factors:

  1. Whether the starved resource usage exceeds requests
  1. Pod Priority
  1. Amount of resource usage relative to requests

See Pod selection for kubelet eviction
for more details.

kubelet node-pressure eviction does not evict Pods when their
usage does not exceed their requests. If a Pod with lower priority is not
exceeding its requests, it won't be evicted. Another Pod with higher priority
that exceeds its requests may be evicted.

## What's next

* Read about using ResourceQuotas in connection with PriorityClasses: limit Priority Class consumption by default
* Learn about Pod Disruption
* Learn about API-initiated Eviction
* Learn about Node-pressure Eviction
