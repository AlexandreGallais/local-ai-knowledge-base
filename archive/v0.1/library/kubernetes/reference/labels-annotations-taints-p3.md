---
title: "Well-Known Labels, Annotations and Taints (part 3 of 9)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/labels-annotations-taints/_index.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Well-Known Labels, Annotations and Taints (part 3 of 9)

### deployment.kubernetes.io/revision-history

Type: Annotation

Example: `deployment.kubernetes.io/revision-history: "1,3"`

Used on: ReplicaSet

This annotation is set by the Deployment controller on a ReplicaSet when a rollback
causes that ReplicaSet to be reused. The value is a comma-separated list of all
previous revision numbers that the ReplicaSet has served for a Deployment, maintained
as a history when the `deployment.kubernetes.io/revision` annotation is updated to a
new revision number.

This is an internal annotation used by the Deployment controller and should not be
modified manually.

### internal.config.kubernetes.io/* (reserved prefix) {#internal.config.kubernetes.io-reserved-wildcard}

Type: Annotation

Used on: All objects

This prefix is reserved for internal use by tools that act as orchestrators in accordance
with the Kubernetes Resource Model (KRM) Functions Specification.
Annotations with this prefix are internal to the orchestration process and are not persisted to
the manifests on the filesystem. In other words, the orchestrator tool should set these
annotations when reading files from the local filesystem and remove them when writing the output
of functions back to the filesystem.

A KRM function **must not** modify annotations with this prefix, unless otherwise specified for a
given annotation. This enables orchestrator tools to add additional internal annotations, without
requiring changes to existing functions.

### internal.config.kubernetes.io/path

Type: Annotation

Example: `internal.config.kubernetes.io/path: "relative/file/path.yaml"`

Used on: All objects

This annotation records the slash-delimited, OS-agnostic, relative path to the manifest file the
object was loaded from. The path is relative to a fixed location on the filesystem, determined by
the orchestrator tool.

This annotation is part of the Kubernetes Resource Model (KRM) Functions Specification, which is
used by Kustomize and similar third-party tools.

A KRM Function **should not** modify this annotation on input objects unless it is modifying the
referenced files. A KRM Function **may** include this annotation on objects it generates.

### internal.config.kubernetes.io/index

Type: Annotation

Example: `internal.config.kubernetes.io/index: "2"`

Used on: All objects

This annotation records the zero-indexed position of the YAML document that contains the object
within the manifest file the object was loaded from. Note that YAML documents are separated by
three dashes (`---`) and can each contain one object. When this annotation is not specified, a
value of 0 is implied.

This annotation is part of the Kubernetes Resource Model (KRM) Functions Specification,
which is used by Kustomize and similar third-party tools.

A KRM Function **should not** modify this annotation on input objects unless it is modifying the
referenced files. A KRM Function **may** include this annotation on objects it generates.

### kube-scheduler-simulator.sigs.k8s.io/bind-result

Type: Annotation

Example: `kube-scheduler-simulator.sigs.k8s.io/bind-result: '{"DefaultBinder":"success"}'`

Used on: Pod

This annotation records the result of bind scheduler plugins, used by https://sigs.k8s.io/kube-scheduler-simulator.

### kube-scheduler-simulator.sigs.k8s.io/filter-result

Type: Annotation

Example:

```yaml
kube-scheduler-simulator.sigs.k8s.io/filter-result: >-
      {"node-282x7":{"AzureDiskLimits":"passed","EBSLimits":"passed","GCEPDLimits":"passed","InterPodAffinity":"passed","NodeAffinity":"passed","NodeName":"passed","NodePorts":"passed","NodeResourcesFit":"passed","NodeUnschedulable":"passed","NodeVolumeLimits":"passed","PodTopologySpread":"passed","TaintToleration":"passed","VolumeBinding":"passed","VolumeRestrictions":"passed","VolumeZone":"passed"},"node-gp9t4":{"AzureDiskLimits":"passed","EBSLimits":"passed","GCEPDLimits":"passed","InterPodAffinity":"passed","NodeAffinity":"passed","NodeName":"passed","NodePorts":"passed","NodeResourcesFit":"passed","NodeUnschedulable":"passed","NodeVolumeLimits":"passed","PodTopologySpread":"passed","TaintToleration":"passed","VolumeBinding":"passed","VolumeRestrictions":"passed","VolumeZone":"passed"}}
```

Used on: Pod

This annotation records the result of filter scheduler plugins, used by https://sigs.k8s.io/kube-scheduler-simulator.

### kube-scheduler-simulator.sigs.k8s.io/finalscore-result

Type: Annotation

Example:

```yaml
kube-scheduler-simulator.sigs.k8s.io/finalscore-result: >-
      {"node-282x7":{"ImageLocality":"0","InterPodAffinity":"0","NodeAffinity":"0","NodeNumber":"0","NodeResourcesBalancedAllocation":"76","NodeResourcesFit":"73","PodTopologySpread":"200","TaintToleration":"300","VolumeBinding":"0"},"node-gp9t4":{"ImageLocality":"0","InterPodAffinity":"0","NodeAffinity":"0","NodeNumber":"0","NodeResourcesBalancedAllocation":"76","NodeResourcesFit":"73","PodTopologySpread":"200","TaintToleration":"300","VolumeBinding":"0"}}
```

Used on: Pod

This annotation records the final scores that the scheduler calculates from the scores from score scheduler plugins,
used by https://sigs.k8s.io/kube-scheduler-simulator.

### kube-scheduler-simulator.sigs.k8s.io/permit-result

Type: Annotation

Example: `kube-scheduler-simulator.sigs.k8s.io/permit-result: '{"CustomPermitPlugin":"success"}'`

Used on: Pod

This annotation records the result of permit scheduler plugins, used by https://sigs.k8s.io/kube-scheduler-simulator.

### kube-scheduler-simulator.sigs.k8s.io/permit-result-timeout

Type: Annotation

Example: `kube-scheduler-simulator.sigs.k8s.io/permit-result-timeout: '{"CustomPermitPlugin":"10s"}'`

Used on: Pod

This annotation records the timeouts returned from permit scheduler plugins, used by https://sigs.k8s.io/kube-scheduler-simulator.

### kube-scheduler-simulator.sigs.k8s.io/postfilter-result

Type: Annotation

Example: `kube-scheduler-simulator.sigs.k8s.io/postfilter-result: '{"DefaultPreemption":"success"}'`

Used on: Pod

This annotation records the result of postfilter scheduler plugins, used by https://sigs.k8s.io/kube-scheduler-simulator.

### kube-scheduler-simulator.sigs.k8s.io/prebind-result

Type: Annotation

Example: `kube-scheduler-simulator.sigs.k8s.io/prebind-result: '{"VolumeBinding":"success"}'`

Used on: Pod

This annotation records the result of prebind scheduler plugins, used by https://sigs.k8s.io/kube-scheduler-simulator.

### kube-scheduler-simulator.sigs.k8s.io/prefilter-result

Type: Annotation

Example: `kube-scheduler-simulator.sigs.k8s.io/prebind-result: '{"NodeAffinity":"[\"node-\a"]"}'`

Used on: Pod

This annotation records the PreFilter result of prefilter scheduler plugins, used by https://sigs.k8s.io/kube-scheduler-simulator.

### kube-scheduler-simulator.sigs.k8s.io/prefilter-result-status

Type: Annotation

Example:

```yaml
kube-scheduler-simulator.sigs.k8s.io/prefilter-result-status: >-
      {"InterPodAffinity":"success","NodeAffinity":"success","NodePorts":"success","NodeResourcesFit":"success","PodTopologySpread":"success","VolumeBinding":"success","VolumeRestrictions":"success"}
```

Used on: Pod

This annotation records the result of prefilter scheduler plugins, used by https://sigs.k8s.io/kube-scheduler-simulator.

### kube-scheduler-simulator.sigs.k8s.io/prescore-result

Type: Annotation

Example:

```yaml
    kube-scheduler-simulator.sigs.k8s.io/prescore-result: >-
      {"InterPodAffinity":"success","NodeAffinity":"success","NodeNumber":"success","PodTopologySpread":"success","TaintToleration":"success"}
```

Used on: Pod

This annotation records the result of prefilter scheduler plugins, used by https://sigs.k8s.io/kube-scheduler-simulator.

### kube-scheduler-simulator.sigs.k8s.io/reserve-result

Type: Annotation

Example: `kube-scheduler-simulator.sigs.k8s.io/reserve-result: '{"VolumeBinding":"success"}'`

Used on: Pod

This annotation records the result of reserve scheduler plugins, used by https://sigs.k8s.io/kube-scheduler-simulator.

### kube-scheduler-simulator.sigs.k8s.io/result-history

Type: Annotation

Example: `kube-scheduler-simulator.sigs.k8s.io/result-history: '[]'`

Used on: Pod

This annotation records all the past scheduling results from scheduler plugins, used by https://sigs.k8s.io/kube-scheduler-simulator.

### kube-scheduler-simulator.sigs.k8s.io/score-result

Type: Annotation

```yaml
    kube-scheduler-simulator.sigs.k8s.io/score-result: >-
      {"node-282x7":{"ImageLocality":"0","InterPodAffinity":"0","NodeAffinity":"0","NodeNumber":"0","NodeResourcesBalancedAllocation":"76","NodeResourcesFit":"73","PodTopologySpread":"0","TaintToleration":"0","VolumeBinding":"0"},"node-gp9t4":{"ImageLocality":"0","InterPodAffinity":"0","NodeAffinity":"0","NodeNumber":"0","NodeResourcesBalancedAllocation":"76","NodeResourcesFit":"73","PodTopologySpread":"0","TaintToleration":"0","VolumeBinding":"0"}}
```

Used on: Pod

This annotation records the result of score scheduler plugins, used by https://sigs.k8s.io/kube-scheduler-simulator.

### kube-scheduler-simulator.sigs.k8s.io/selected-node

Type: Annotation

Example: `kube-scheduler-simulator.sigs.k8s.io/selected-node: node-282x7`

Used on: Pod

This annotation records the node that is selected by the scheduling cycle, used by https://sigs.k8s.io/kube-scheduler-simulator.

### kubernetes.io/arch

Type: Label

Example: `kubernetes.io/arch: "amd64"`

Used on: Node

The Kubelet populates this with `runtime.GOARCH` as defined by Go.
This can be handy if you are mixing ARM and x86 nodes.

### kubernetes.io/os

Type: Label

Example: `kubernetes.io/os: "linux"`

Used on: Node, Pod

For nodes, the kubelet populates this with `runtime.GOOS` as defined by Go. This can be handy if you are
mixing operating systems in your cluster (for example: mixing Linux and Windows nodes).

You can also set this label on a Pod. Kubernetes allows you to set any value for this label;
if you use this label, you should nevertheless set it to the Go `runtime.GOOS` string for the operating
system that this Pod actually works with.

When the `kubernetes.io/os` label value for a Pod does not match the label value on a Node,
the kubelet on the node will not admit the Pod. However, this is not taken into account by
the kube-scheduler. Alternatively, the kubelet refuses to run a Pod where you have specified a Pod OS, if
this isn't the same as the operating system for the node where that kubelet is running. Just
look for Pods OS for more details.

### kubernetes.io/metadata.name

Type: Label

Example: `kubernetes.io/metadata.name: "mynamespace"`

Used on: Namespaces

The Kubernetes API server (part of the control plane)
sets this label on all namespaces. The label value is set
to the name of the namespace. You can't change this label's value.

This is useful if you want to target a specific namespace with a label
selector.

### kubernetes.io/limit-ranger

Type: Annotation

Example: `kubernetes.io/limit-ranger: "LimitRanger plugin set: cpu, memory request for container nginx; cpu, memory limit for container nginx"`

Used on: Pod

Kubernetes by default doesn't provide any resource limit, that means unless you explicitly define
limits, your container can consume unlimited CPU and memory.
You can define a default request or default limit for pods. You do this by creating a LimitRange
in the relevant namespace. Pods deployed after you define a LimitRange will have these limits
applied to them.
The annotation `kubernetes.io/limit-ranger` records that resource defaults were specified for the Pod,
and they were applied successfully.
For more details, read about LimitRanges.

### kubernetes.io/config.hash

Type: Annotation

Example: `kubernetes.io/config.hash: "df7cc47f8477b6b1226d7d23a904867b"`

Used on: Pod

When the kubelet creates a static Pod based on a given manifest, it attaches this annotation
to the static Pod. The value of the annotation is the UID of the Pod.
Note that the kubelet also sets the `.spec.nodeName` to the current node name as if the Pod
was scheduled to the node.

### kubernetes.io/config.mirror

Type: Annotation

Example: `kubernetes.io/config.mirror: "df7cc47f8477b6b1226d7d23a904867b"`

Used on: Pod

For a static Pod created by the kubelet on a node, a mirror Pod
is created on the API server. The kubelet adds an annotation to indicate that this Pod is
actually a mirror Pod. The annotation value is copied from the `kubernetes.io/config.hash`
annotation, which is the UID of the Pod.

When updating a Pod with this annotation set, the annotation cannot be changed or removed.
If a Pod doesn't have this annotation, it cannot be added during a Pod update.

### kubernetes.io/config.source

Type: Annotation

Example: `kubernetes.io/config.source: "file"`

Used on: Pod

This annotation is added by the kubelet to indicate where the Pod comes from.
For static Pods, the annotation value could be one of `file` or `http` depending
on where the Pod manifest is located. For a Pod created on the API server and then
scheduled to the current node, the annotation value is `api`.

### kubernetes.io/config.seen

Type: Annotation

Example: `kubernetes.io/config.seen: "2023-10-27T04:04:56.011314488Z"`

Used on: Pod

When the kubelet sees a Pod for the first time, it may add this annotation to
the Pod with a value of current timestamp in the RFC3339 format.

### addonmanager.kubernetes.io/mode

Type: Label

Example: `addonmanager.kubernetes.io/mode: "Reconcile"`

Used on: All objects

To specify how an add-on should be managed, you can use the `addonmanager.kubernetes.io/mode` label.
This label can have one of three values: `Reconcile`, `EnsureExists`, or `Ignore`.

- `Reconcile`: Addon resources will be periodically reconciled with the expected state.
  If there are any differences, the add-on manager will recreate, reconfigure or delete
  the resources as needed. This is the default mode if no label is specified.
- `EnsureExists`: Addon resources will be checked for existence only but will not be modified
  after creation. The add-on manager will create or re-create the resources when there is
  no instance of the resource with that name.
- `Ignore`: Addon resources will be ignored. This mode is useful for add-ons that are not
  compatible with the add-on manager or that are managed by another controller.

For more details, see Addon-manager.

### beta.kubernetes.io/arch (deprecated)

Type: Label

This label has been deprecated. Please use `kubernetes.io/arch` instead.

### beta.kubernetes.io/os (deprecated)

Type: Label

This label has been deprecated. Please use `kubernetes.io/os` instead.
