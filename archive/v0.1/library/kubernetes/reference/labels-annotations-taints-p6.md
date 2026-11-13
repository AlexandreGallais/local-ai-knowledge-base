---
title: "Well-Known Labels, Annotations and Taints (part 6 of 9)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/labels-annotations-taints/_index.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Well-Known Labels, Annotations and Taints (part 6 of 9)

### alpha.kubernetes.io/provided-node-ip (alpha) {#alpha-kubernetes-io-provided-node-ip}

Type: Annotation

Example: `alpha.kubernetes.io/provided-node-ip: "10.0.0.1"`

Used on: Node

The kubelet can set this annotation on a Node to denote its configured IPv4 and/or IPv6 address.

When kubelet is started with the `--cloud-provider` flag set to any value (includes both external
and legacy in-tree cloud providers), it sets this annotation on the Node to denote an IP address
set from the command line flag (`--node-ip`). This IP is verified with the cloud provider as valid
by the cloud-controller-manager.

### batch.kubernetes.io/job-completion-index

Type: Annotation, Label

Example: `batch.kubernetes.io/job-completion-index: "3"`

Used on: Pod

The Job controller in the kube-controller-manager sets this as a label and annotation for Pods
created with Indexed completion mode.

Note the PodIndexLabel
feature gate must be enabled for this to be added as a pod **label**,
otherwise it will just be an annotation.

### batch.kubernetes.io/cronjob-scheduled-timestamp

Type: Annotation

Example: `batch.kubernetes.io/cronjob-scheduled-timestamp: "2016-05-19T03:00:00-07:00"`

Used on: Jobs and Pods controlled by CronJobs

This annotation is used to record the original (expected) creation timestamp for a Job,
when that Job is part of a CronJob.
The control plane sets the value to that timestamp in RFC3339 format. If the Job belongs to a CronJob
with a timezone specified, then the timestamp is in that timezone. Otherwise, the timestamp is in controller-manager's local time.

### cronjob.kubernetes.io/instantiate {#cronjob-kubernetes-io-instantiate}

Type: Annotation

Example: `cronjob.kubernetes.io/instantiate: "manual"`

Used on: Jobs

When you use `kubectl create job` with the `--from=cronjob/<cronjob-name>` flag to manually create a Job from an existing CronJob template, `kubectl` sets this annotation on the newly created Job.
The value of this annotation is always `manual`. This annotation allows you to distinguish
Jobs that were created on demand by a user from Jobs that the CronJob controller automatically creates on their scheduled time.

### kubectl.kubernetes.io/default-container

Type: Annotation

Example: `kubectl.kubernetes.io/default-container: "front-end-app"`

The value of the annotation is the container name that is default for this Pod.
For example, `kubectl logs` or `kubectl exec` without `-c` or `--container` flag
will use this default container.

### kubectl.kubernetes.io/default-logs-container (deprecated)

Type: Annotation

Example: `kubectl.kubernetes.io/default-logs-container: "front-end-app"`

The value of the annotation is the container name that is the default logging container for this
Pod. For example, `kubectl logs` without `-c` or `--container` flag will use this default
container.

**Note:**
This annotation is deprecated. You should use the
`kubectl.kubernetes.io/default-container`
annotation instead. Kubernetes versions 1.25 and newer ignore this annotation.

### kubectl.kubernetes.io/last-applied-configuration

Type: Annotation

Example: _see following snippet_
```yaml
    kubectl.kubernetes.io/last-applied-configuration: >
      {"apiVersion":"apps/v1","kind":"Deployment","metadata":{"annotations":{},"name":"example","namespace":"default"},"spec":{"selector":{"matchLabels":{"app.kubernetes.io/name":foo}},"template":{"metadata":{"labels":{"app.kubernetes.io/name":"foo"}},"spec":{"containers":[{"image":"container-registry.example/foo-bar:1.42","name":"foo-bar","ports":[{"containerPort":42}]}]}}}}
```

Used on: all objects

The kubectl command line tool uses this annotation as a legacy mechanism
to track changes. That mechanism has been superseded by
Server-side apply.

### kubectl.kubernetes.io/restartedAt {#kubectl-k8s-io-restart-at}

Type: Annotation

Example: `kubectl.kubernetes.io/restartedAt: "2024-06-21T17:27:41Z"`

Used on: Deployment, ReplicaSet, StatefulSet, DaemonSet, Pod

This annotation contains the latest restart time of a resource (Deployment, ReplicaSet, StatefulSet or DaemonSet),
where kubectl triggered a rollout in order to force creation of new Pods.
The command `kubectl rollout restart <RESOURCE>` triggers a restart by patching the template
metadata of all the pods of resource with this annotation. In above example the latest restart time is shown as 21st June 2024 at 17:27:41 UTC.

You should not assume that this annotation represents the date / time of the most recent update;
a separate change could have been made since the last manually triggered rollout.

If you manually set this annotation on a Pod, nothing happens. The restarting side effect comes from
how workload management and Pod templating works.

### endpoints.kubernetes.io/over-capacity (deprecated) {#endpoints-kubernetes-io-over-capacity}

Type: Annotation

Example: `endpoints.kubernetes.io/over-capacity: truncated`

Used on: Endpoints

The control plane adds this annotation to
an Endpoints object if the associated
service has more than 1000 backing endpoints.
The annotation indicates that the Endpoints object is over capacity and the number of endpoints
has been truncated to 1000.

If the number of backend endpoints falls below 1000, the control plane removes this annotation.

**Note:**
The Endpoints
API is deprecated in favor of
EndpointSlice.
A Service can have multiple EndpointSlice objects. As a result, EndpointSlices do not require truncation.

### endpoints.kubernetes.io/last-change-trigger-time (deprecated) {#endpoints-kubernetes-io-last-change-trigger-time}

Type: Annotation

Example: `endpoints.kubernetes.io/last-change-trigger-time: "2023-07-20T04:45:21Z"`

Used on: Endpoints

This annotation set to an Endpoints object that
represents the timestamp (The timestamp is stored in RFC 3339 date-time string format. For example, '2018-10-22T19:32:52.1Z'). This is timestamp
of the last change in some Pod or Service object, that triggered the change to the Endpoints object.

**Note:**
The Endpoints
API is deprecated in favor of
EndpointSlice.

### control-plane.alpha.kubernetes.io/leader (deprecated) {#control-plane-alpha-kubernetes-io-leader}

Type: Annotation

Example: `control-plane.alpha.kubernetes.io/leader={"holderIdentity":"controller-0","leaseDurationSeconds":15,"acquireTime":"2023-01-19T13:12:57Z","renewTime":"2023-01-19T13:13:54Z","leaderTransitions":1}`

Used on: Endpoints

The control plane previously used
an Endpoints object to
coordinate leader assignment for the Kubernetes control plane. This Endpoints
object included an annotation with the following detail:

- Who is the current leader.
- The time when the current leadership was acquired.
- The duration of the lease (of the leadership) in seconds.
- The time the current lease (the current leadership) should be renewed.
- The number of leadership transitions that happened in the past.

Kubernetes now uses Leases to
manage leader assignment for the Kubernetes control plane.

### batch.kubernetes.io/job-tracking (deprecated) {#batch-kubernetes-io-job-tracking}

Type: Annotation

Example: `batch.kubernetes.io/job-tracking: ""`

Used on: Jobs

The presence of this annotation on a Job used to indicate that the control plane is
tracking the Job status using finalizers.
Adding or removing this annotation no longer has an effect (Kubernetes v1.27 and later)
All Jobs are tracked with finalizers.

### job-name (deprecated) {#job-name}

Type: Label

Example: `job-name: "pi"`

Used on: Jobs and Pods controlled by Jobs

**Note:**
Starting from Kubernetes 1.27, this label is deprecated.
Kubernetes 1.27 and newer ignore this label and use the prefixed `job-name` label.

### controller-uid (deprecated) {#controller-uid}

Type: Label

Example: `controller-uid: "$UID"`

Used on: Jobs and Pods controlled by Jobs

**Note:**
Starting from Kubernetes 1.27, this label is deprecated.
Kubernetes 1.27 and newer ignore this label and use the prefixed `controller-uid` label.

### batch.kubernetes.io/job-name {#batchkubernetesio-job-name}

Type: Label

Example: `batch.kubernetes.io/job-name: "pi"`

Used on: Jobs and Pods controlled by Jobs

This label is used as a user-friendly way to get Pods corresponding to a Job.
The `job-name` comes from the `name` of the Job and allows for an easy way to
get Pods corresponding to the Job.

### batch.kubernetes.io/controller-uid {#batchkubernetesio-controller-uid}

Type: Label

Example: `batch.kubernetes.io/controller-uid: "$UID"`

Used on: Jobs and Pods controlled by Jobs

This label is used as a programmatic way to get all Pods corresponding to a Job.
The `controller-uid` is a unique identifier that gets set in the `selector` field so the Job
controller can get all the corresponding Pods.

### scheduler.alpha.kubernetes.io/defaultTolerations {#scheduleralphakubernetesio-defaulttolerations}

Type: Annotation

Example: `scheduler.alpha.kubernetes.io/defaultTolerations: '[{"operator": "Equal", "value": "value1", "effect": "NoSchedule", "key": "dedicated-node"}]'`

Used on: Namespace

This annotation requires the PodTolerationRestriction
admission controller to be enabled. This annotation key <example-value> assigning tolerations to a
namespace and any new pods created in this namespace would get these tolerations added.

### scheduler.alpha.kubernetes.io/tolerationsWhitelist {#schedulerkubernetestolerations-whitelist}

Type: Annotation

Example: `scheduler.alpha.kubernetes.io/tolerationsWhitelist: '[{"operator": "Exists", "effect": "NoSchedule", "key": "dedicated-node"}]'`

Used on: Namespace

This annotation is only useful when the (Alpha)
PodTolerationRestriction
admission controller is enabled. The annotation value is a JSON document that defines a list of
allowed tolerations for the namespace it annotates. When you create a Pod or modify its
tolerations, the API server checks the tolerations to see if they are mentioned in the allow list.
The pod is admitted only if the check succeeds.

### scheduler.alpha.kubernetes.io/preferAvoidPods (deprecated) {#scheduleralphakubernetesio-preferavoidpods}

Type: Annotation

Used on: Node

This annotation requires the NodePreferAvoidPods scheduling plugin
to be enabled. The plugin is deprecated since Kubernetes 1.22.
Use Taints and Tolerations instead.

### node.kubernetes.io/not-ready

Type: Taint

Example: `node.kubernetes.io/not-ready: "NoExecute"`

Used on: Node

The Node controller detects whether a Node is ready by monitoring its health
and adds or removes this taint accordingly.

### node.kubernetes.io/unreachable

Type: Taint

Example: `node.kubernetes.io/unreachable: "NoExecute"`

Used on: Node

The Node controller adds the taint to a Node corresponding to the
NodeCondition `Ready` being `Unknown`.

### node.kubernetes.io/unschedulable

Type: Taint

Example: `node.kubernetes.io/unschedulable: "NoSchedule"`

Used on: Node

The taint will be added to a node when initializing the node to avoid race condition.

### node.kubernetes.io/memory-pressure

Type: Taint

Example: `node.kubernetes.io/memory-pressure: "NoSchedule"`

Used on: Node

The kubelet detects memory pressure based on `memory.available` and `allocatableMemory.available`
observed on a Node. The observed values are then compared to the corresponding thresholds that can
be set on the kubelet to determine if the Node condition and taint should be added/removed.

### node.kubernetes.io/disk-pressure

Type: Taint

Example: `node.kubernetes.io/disk-pressure :"NoSchedule"`

Used on: Node

The kubelet detects disk pressure based on `imagefs.available`, `imagefs.inodesFree`,
`nodefs.available` and `nodefs.inodesFree`(Linux only) observed on a Node.
The observed values are then compared to the corresponding thresholds that can be set on the
kubelet to determine if the Node condition and taint should be added/removed.

### node.kubernetes.io/network-unavailable

Type: Taint

Example: `node.kubernetes.io/network-unavailable: "NoSchedule"`

Used on: Node

This is initially set by the kubelet when the cloud provider used indicates a requirement for
additional network configuration. Only when the route on the cloud is configured properly will the
taint be removed by the cloud provider.

### node.kubernetes.io/pid-pressure

Type: Taint

Example: `node.kubernetes.io/pid-pressure: "NoSchedule"`

Used on: Node

The kubelet checks D-value of the size of `/proc/sys/kernel/pid_max` and the PIDs consumed by
Kubernetes on a node to get the number of available PIDs that referred to as the `pid.available`
metric. The metric is then compared to the corresponding threshold that can be set on the kubelet
to determine if the node condition and taint should be added/removed.

### node.kubernetes.io/out-of-service

Type: Taint

Example: `node.kubernetes.io/out-of-service:NoExecute`

Used on: Node

A user can manually add the taint to a Node marking it out-of-service.
If a Node is marked out-of-service with this taint, the Pods on the node
will be forcefully deleted if there are no matching tolerations on it and
volume detach operations for the Pods terminating on the node will happen immediately.
This allows the Pods on the out-of-service node to recover quickly on a different node.

**Caution:**
Refer to Non-graceful node shutdown
for further details about when and how to use this taint.

### node.cloudprovider.kubernetes.io/uninitialized

Type: Taint

Example: `node.cloudprovider.kubernetes.io/uninitialized: "NoSchedule"`

Used on: Node

Sets this taint on a Node to mark it as unusable, when kubelet is started with the "external"
cloud provider, until a controller from the cloud-controller-manager initializes this Node, and
then removes the taint.

### node.cloudprovider.kubernetes.io/shutdown

Type: Taint

Example: `node.cloudprovider.kubernetes.io/shutdown: "NoSchedule"`

Used on: Node

If a Node is in a cloud provider specified shutdown state, the Node gets tainted accordingly
with `node.cloudprovider.kubernetes.io/shutdown` and the taint effect of `NoSchedule`.

### feature.node.kubernetes.io/*

Type: Label

Example: `feature.node.kubernetes.io/network-sriov.capable: "true"`

Used on: Node

These labels are used by the Node Feature Discovery (NFD) component to advertise
features on a node. All built-in labels use the `feature.node.kubernetes.io` label
namespace and have the format `feature.node.kubernetes.io/<feature-name>: "true"`.
NFD has many extension points for creating vendor and application-specific labels.
For details, see the customization guide.

### nfd.node.kubernetes.io/master.version

Type: Annotation

Example: `nfd.node.kubernetes.io/master.version: "v0.6.0"`

Used on: Node

For node(s) where the Node Feature Discovery (NFD)
master
is scheduled, this annotation records the version of the NFD master.
It is used for informative use only.
