---
title: "Pod Lifecycle (part 4 of 5)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/concepts/workloads/pods/pod-lifecycle.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Pod Lifecycle (part 4 of 5)

### Configurable container restart delay

**Feature state:**

With the feature gate `KubeletCrashLoopBackOffMax` enabled, you can
reconfigure the maximum delay between container start retries from the default
of 300s (5 minutes). This configuration is set per node using kubelet
configuration. In your kubelet configuration,
under `crashLoopBackOff` set the `maxContainerRestartPeriod` field between `"1s"` and
`"300s"`. As described above in Container restart policy,
delays on that node will still start at 10s and increase exponentially by 2x
each restart, but will now be capped at your configured maximum. If the
`maxContainerRestartPeriod` you configure is less than the default initial value
of 10s, the initial delay will instead be set to the configured maximum.

See the following kubelet configuration examples:

```yaml
# container restart delays will start at 10s, increasing
# 2x each time they are restarted, to a maximum of 100s
kind: KubeletConfiguration
crashLoopBackOff:
    maxContainerRestartPeriod: "100s"
```

```yaml
# delays between container restarts will always be 2s
kind: KubeletConfiguration
crashLoopBackOff:
    maxContainerRestartPeriod: "2s"
```

If you use this feature along with the alpha feature
`ReduceDefaultCrashLoopBackOffDecay` (described above), your cluster defaults
for initial backoff and maximum backoff will no longer be 10s and 300s, but 1s
and 60s. Per node configuration takes precedence over the defaults set by
`ReduceDefaultCrashLoopBackOffDecay`, even if this would result in a node having
a longer maximum backoff than other nodes in the cluster.

## Pod conditions

A Pod has a PodStatus, which has an array of
PodConditions
through which the Pod has or has not passed. The kubelet manages the following
PodConditions:

* `PodScheduled`: the Pod has been scheduled to a node.
* `PodReadyToStartContainers`: the Pod sandbox has been successfully created,
  networking configured, storage volumes mounted, and any dynamic resources (if requested) allocated.
* `ContainersReady`: all containers in the Pod are ready.
* `Initialized`: all init containers
  have completed successfully.
* `Ready`: the Pod is able to serve requests and should be added to the load
  balancing pools of all matching Services.
* `DisruptionTarget`: the pod is about to be terminated due to a disruption (such as preemption, eviction or garbage-collection).
* `PodResizePending`: a pod resize was requested but cannot be applied. See Pod resize status.
* `PodResizeInProgress`: the pod is in the process of resizing. See
  Pod resize status.

Field name           | Description
:--------------------|:-----------
`type`               | Name of this Pod condition.
`status`             | Indicates whether that condition is applicable, with possible values "`True`", "`False`", or "`Unknown`".
`lastProbeTime`      | Timestamp of when the Pod condition was last probed.
`lastTransitionTime` | Timestamp for when the Pod last transitioned from one status to another.
`reason`             | Machine-readable, UpperCamelCase text indicating the reason for the condition's last transition.
`message`            | Human-readable message indicating details about the last status transition.

### Pod readiness {#pod-readiness-gate}

**Feature state:** v1.14 [stable]

Your application can inject extra feedback or signals into PodStatus:
_Pod readiness_. To use this, set `readinessGates` in the Pod's `spec` to
specify a list of additional conditions that the kubelet evaluates for Pod readiness.

Readiness gates are determined by the current state of `status.condition`
fields for the Pod. If Kubernetes cannot find such a condition in the
`status.conditions` field of a Pod, the status of the condition
is defaulted to "`False`".

Here is an example:

```yaml
kind: Pod
...
spec:
  readinessGates:
    - conditionType: "www.example.com/feature-1"
status:
  conditions:
    - type: Ready                              # a built-in PodCondition
      status: "False"
      lastProbeTime: null
      lastTransitionTime: 2018-01-01T00:00:00Z
    - type: "www.example.com/feature-1"        # an extra PodCondition
      status: "False"
      lastProbeTime: null
      lastTransitionTime: 2018-01-01T00:00:00Z
  containerStatuses:
    - containerID: docker://abcd...
      ready: true
...
```

The Pod conditions you add must have names that meet the Kubernetes
label key format.

### Status for Pod readiness {#pod-readiness-status}

The `kubectl patch` command does not support patching object status.
To set these `status.conditions` for the Pod, applications and
operators should use
the `PATCH` action.
You can use a Kubernetes client library to
write code that sets custom Pod conditions for Pod readiness.

For a Pod that uses custom conditions, that Pod is evaluated to be ready **only**
when both the following statements apply:

* All containers in the Pod are ready.
* All conditions specified in `readinessGates` are `True`.

When a Pod's containers are Ready but at least one custom condition is missing or
`False`, the kubelet sets the Pod's condition to `ContainersReady`.

### Pod readiness to start containers {#pod-ready-to-start-containers}

**Feature state:** v1.37 [stable]

**Note:**
During its early development, this condition was named `PodHasNetwork`.

After a Pod gets scheduled on a node, it needs to be admitted by the kubelet and
to have any required storage volumes mounted. Once these phases are complete,
the kubelet works with
a container runtime (using cri) to set up a
runtime sandbox and configure networking for the Pod. If the Pod uses
Dynamic Resource Allocation,
those resources are also allocated during this phase.
The `PodReadyToStartContainers` condition is added to the `status.conditions` field of a Pod.

The condition is set to `False` by the kubelet when it detects a
Pod does not have a runtime sandbox with networking configured. This occurs in
the following scenarios:

- Early in the lifecycle of the Pod, when the kubelet has not yet begun to set up a sandbox for
  the Pod using the container runtime.
- Later in the lifecycle of the Pod, when the Pod sandbox has been destroyed due to either:
  - the node rebooting, without the Pod getting evicted
  - for container runtimes that use virtual machines for isolation, the Pod
    sandbox virtual machine rebooting, which then requires creating a new sandbox and
    fresh container network configuration.

After sandbox creation, network configuration, volume mounting, and (if requested) dynamic resource
allocation are complete, the kubelet sets the `PodReadyToStartContainers` condition to `True`.
Image pulling and container creation occur after this point.

For a Pod with init containers, the kubelet sets the `Initialized` condition to
`True` after the init containers have successfully completed (which happens
after successful sandbox creation and network configuration by the runtime
plugin). For a Pod without init containers, the kubelet sets the `Initialized`
condition to `True` before sandbox creation and network configuration starts.

## Resizing Pods {#pod-resize}

**Feature state:**
**Feature state:**

Kubernetes supports changing the CPU and memory resources allocated to Pods
after they are created. (For other infrastructure resources, you would need to
use different techniques specific to those resources.) There are two main
approaches to resizing CPU and memory:

### In-place Pod resize {#pod-resize-inplace}

You can resize a Pod's container-level CPU and memory resources without recreating the Pod.
This is also called _in-place Pod vertical scaling_. This allows you to adjust resource
allocation for running containers while potentially avoiding application disruption.

If you have specified resources at the pod-level, you can also resize those in-place.
For more details, see Resize CPU and Memory Resources assigned to Pods.

To perform an in-place resize, you update the Pod's desired state using the `/resize`
subresource. The kubelet then attempts to apply the new resource values to the running
containers. The Pod conditions
`PodResizePending` and `PodResizeInProgress` (described in Pod conditions)
indicate the status of the resize operation. For more details about resize status, see
Container Resize Status.

Key <example-value> for in-place resize:
- Only CPU and memory resources can be resized in-place.
- The Pod's Quality of Service (QoS) class
  is determined at creation and cannot be changed by resizing.
- You can configure whether a container restart is required for the resize using
  `resizePolicy` in the container specification.

For detailed instructions on performing in-place resize, see
Resize CPU and Memory Resources assigned to Containers.

### Resizing by launching replacement Pods

The more cloud native approach to changing a Pod's resources is through the
workload resource that manages it (such as a Deployment or StatefulSet).
When you update the resource specifications in the Pod template,
the workload's controller creates new Pods with the updated resources and terminates
the old Pods according to its update strategy.

This approach:
- Works with any Kubernetes version.
- Can change any Pod specification, not just resources.
- Results in Pod replacement, so you should design your workload to handle
  planned disruptions. Consider using a
  PodDisruptionBudget to control availability.
- Requires that your Pods are managed by a workload resource.

You can also use a
VerticalPodAutoscaler
to automatically manage Pod resource recommendations and updates.

## Container probes

Kubernetes lets you define _probes_ to continuously monitor the health
of containers in a Pod. A probe is a diagnostic performed periodically
by the kubelet on a container.
To perform a diagnostic, the kubelet either executes code within
the container or makes a network request.

Based on the probe results, Kubernetes can restart unhealthy containers
or stop sending traffic to containers that are not ready.

The kubelet can optionally perform and react to three kinds of probes on running
containers, each serving a different purpose. For probe mechanisms (`exec`,
`grpc`, `httpGet`, `tcpSocket`), configuration fields, and detailed usage
guidance, see Liveness, Readiness, and Startup Probes.

### Startup probe

Startup probes verify whether the application within a container is started.
If a startup probe is configured, Kubernetes does not execute liveness or
readiness probes until the startup probe succeeds, allowing the application
time to finish its initialization.

This type of probe is only executed at startup, unlike liveness and readiness
probes, which are run periodically.

If the startup probe fails, the kubelet kills the container, and the container
is subjected to its restart policy.

### Liveness probe

Liveness probes determine when to restart a container.
For example, liveness probes could catch a deadlock, where an application is
running, but unable to make progress. Restarting a container in such a state
can help to make the application more available despite bugs.

If a container fails its liveness probe more times than the configured tolerance,
the kubelet restarts that container.
Liveness probes do not wait for readiness probes to succeed. If you want to
wait before executing a liveness probe, you can either define
`initialDelaySeconds` or use a startup probe.

### Readiness probe

Readiness probes determine when a container is ready to accept traffic.
This is useful when waiting for an application to perform time-consuming initial
tasks, such as establishing network connections, loading files, and warming
caches.
Readiness probes can also be useful later in the container's lifecycle,
for example, when recovering from temporary faults or overloads.

If the readiness probe returns a failed state, the
EndpointSlice
controller removes the Pod's IP address from the EndpointSlices of all Services
that match the Pod.

Readiness probes run on the container during its whole lifecycle.
