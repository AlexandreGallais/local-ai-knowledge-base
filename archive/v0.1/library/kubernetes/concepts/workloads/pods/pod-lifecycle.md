---
title: "Pod Lifecycle (part 1 of 5)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/concepts/workloads/pods/pod-lifecycle.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

This page describes the lifecycle of a Pod. Pods follow a defined lifecycle, starting
in the `Pending` phase, moving through `Running` if at least one
of its primary containers starts OK, and then through either the `Succeeded` or
`Failed` phases depending on whether any container in the Pod terminated in failure.

While a Pod runs, the kubelet manages containers and translates the Pod's spec
for the container runtime. The kubelet also manages executing
probes that track the health of your application.

Like individual application containers, Pods are considered to be relatively
ephemeral (rather than durable) entities. Pods are created, assigned a unique
ID (UID), and scheduled
to run on nodes where they remain until termination (according to restart policy) or
deletion.
If a node dies, the Pods running on (or scheduled
to run on) that node are marked for deletion. The control
plane marks the Pods for removal after a timeout period.

## Pod lifetime

While a Pod is running, the kubelet is able to restart containers to handle
some kind of faults. Within a Pod, Kubernetes tracks different container
states and determines what action to take to make the Pod
healthy again. This is done in a polling
loop that periodically reconciles the
desired state (a Pod spec) with the actual state of the running containers.

In the Kubernetes API, Pods have both a specification and an actual status. The
status for a Pod object consists of a set of Pod conditions.
You can also inject custom readiness information into the
condition data for a Pod, if that is useful to your application.

Pods are only scheduled once in their lifetime;
assigning a Pod to a specific node is called _binding_, and the process of selecting
which node to use is called _scheduling_.
Once a Pod has been scheduled and is bound to a node, Kubernetes tries
to run that Pod on the node. The Pod runs on that node until it stops, or until the Pod
is terminated; if Kubernetes isn't able to start the Pod on the selected
node (for example, if the node crashes before the Pod starts), then that particular Pod
never starts.

You can use Pod Scheduling Readiness
to delay scheduling for a Pod until all its _scheduling gates_ are removed. For example,
you might want to define a set of Pods but only trigger scheduling once all the Pods
have been created.

### Pods and fault recovery {#pod-fault-recovery}

If one of the containers in the Pod fails, then Kubernetes may try to restart that
specific container.
Read How Pods handle problems with containers to learn more.

Pods can however fail in a way that the cluster cannot recover from, and in that case
Kubernetes does not attempt to heal the Pod further; instead, Kubernetes deletes the
Pod and relies on other components to provide automatic healing.

If a Pod is scheduled to a node and that
node then fails, the Pod is treated as unhealthy and Kubernetes eventually deletes the Pod.
A Pod won't survive an eviction due to
a lack of resources or Node maintenance.

Kubernetes uses a higher-level abstraction, called a
controller, that handles the work of
managing the relatively disposable Pod instances.

A given Pod (as defined by a UID) is never "rescheduled" to a different node; instead,
that Pod can be replaced by a new, near-identical Pod. If you make a replacement Pod, it can
even have same name (as in `.metadata.name`) that the old Pod had, but the replacement
would have a different `.metadata.uid` from the old Pod.

Kubernetes does not guarantee that a replacement for an existing Pod would be scheduled to
the same node as the old Pod that was being replaced.

### Associated lifetimes

When something is said to have the same lifetime as a Pod, such as a
volume,
that means that the thing exists as long as that specific Pod (with that exact UID)
exists. If that Pod is deleted for any reason, and even if an identical replacement
is created, the related thing (a volume, in this example) is also destroyed and
created anew.

## Pod phase

A Pod's `status` field is a
PodStatus
object, which has a `phase` field.

The phase of a Pod is a simple, high-level summary of where the Pod is in its
lifecycle. The phase is not intended to be a comprehensive rollup of observations
of container or Pod state, nor is it intended to be a comprehensive state machine.

The number and meanings of Pod phase values are tightly guarded.
Other than what is documented here, nothing should be assumed about Pods that
have a given `phase` value.

Here are the possible values for `phase`:

Value       | Description
:-----------|:-----------
`Pending`   | The Pod has been accepted by the Kubernetes cluster, but one or more of the containers has not been set up and made ready to run. This includes time a Pod spends waiting to be scheduled as well as the time spent downloading container images over the network.
`Running`   | The Pod has been bound to a node, and all of the containers have been created. At least one container is still running, or is in the process of starting or restarting.
`Succeeded` | All containers in the Pod have terminated in success, and will not be restarted.
`Failed`    | All containers in the Pod have terminated, and at least one container has terminated in failure. That is, the container either exited with non-zero status or was terminated by the system, and is not set for automatic restarting.
`Unknown`   | For some reason the state of the Pod could not be obtained. This phase typically occurs due to an error in communicating with the node where the Pod should be running.

**Note:**

When a pod is failing to start repeatedly, `CrashLoopBackOff` may appear in the `Status` field of some kubectl commands.
Similarly, when a pod is being deleted, `Terminating` may appear in the `Status` field of some kubectl commands.

Make sure not to confuse _Status_, a kubectl display field for user intuition, with the pod's `phase`.
Pod phase is an explicit part of the Kubernetes data model and of the
Pod API.

```
  NAMESPACE               NAME               READY   STATUS             RESTARTS   AGE
  alessandras-namespace   alessandras-pod    0/1     CrashLoopBackOff   200        2d9h
```

A Pod is granted a term to terminate gracefully, which defaults to 30 seconds.
You can use the flag `--force` to terminate a Pod by force.

Since Kubernetes 1.27, the kubelet transitions deleted Pods to a terminal phase
(`Failed` or `Succeeded` depending on the exit statuses of the pod containers)
before their deletion from the API server, with two exceptions:

* static Pods (which are
managed directly by the kubelet and represented by mirror Pods)
*  force-deleted
Pods
without a finalizer

If a node dies or is disconnected from the rest of the cluster, Kubernetes
applies a policy for setting the `phase` of all Pods on the lost node to Failed.

## Container states

As well as the phase of the Pod overall, Kubernetes tracks the state of
each container inside a Pod. You can use
container lifecycle hooks to
trigger events to run at certain points in a container's lifecycle.

Once the scheduler
assigns a Pod to a Node, the kubelet starts creating containers for that Pod
using a container runtime.
There are three possible container states: `Waiting`, `Running`, and `Terminated`.

To check the state of a Pod's containers, you can use
`kubectl describe pod <name-of-pod>`. The output shows the state for each container
within that Pod.

Each state has a specific meaning:

### `Waiting` {#container-state-waiting}

If a container is not in either the `Running` or `Terminated` state, it is `Waiting`.
A container in the `Waiting` state is still running the operations it requires in
order to complete start up: for example, pulling the container image from a container
image registry, or applying Secret
data.
When you use `kubectl` to query a Pod with a container that is `Waiting`, you also see
a Reason field to summarize why the container is in that state.

### `Running` {#container-state-running}

The `Running` status indicates that a container is executing without issues. If there
was a `postStart` hook configured, it has already executed and finished. When you use
`kubectl` to query a Pod with a container that is `Running`, you also see information
about when the container entered the `Running` state.

### `Terminated` {#container-state-terminated}

A container in the `Terminated` state began execution and then either ran to
completion or failed for some reason. When you use `kubectl` to query a Pod with
a container that is `Terminated`, you see a reason, an exit code, and the start and
finish time for that container's period of execution.

If a container has a `preStop` hook configured, this hook runs before the container enters
the `Terminated` state.
