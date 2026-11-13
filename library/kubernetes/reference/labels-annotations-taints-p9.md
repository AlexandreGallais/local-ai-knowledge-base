---
title: "Well-Known Labels, Annotations and Taints (part 9 of 9)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/labels-annotations-taints/_index.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Well-Known Labels, Annotations and Taints (part 9 of 9)

### alpha.jobset.sigs.k8s.io/exclusive-topology

Type: Annotation

Example: `alpha.jobset.sigs.k8s.io/exclusive-topology: "zone"`

Used on: JobSets, Jobs

You can set this label/annotation on a JobSet to ensure exclusive Job
placement per topology group. You can also define this label or annotation on a replicated job
template. Read the documentation for JobSet to learn more.

### alpha.jobset.sigs.k8s.io/node-selector

Type: Annotation

Example: `alpha.jobset.sigs.k8s.io/node-selector: "true"`

Used on: Jobs, Pods

This label/annotation can be applied to a JobSet. When it's set, the JobSet controller modifies the Jobs and their corresponding Pods by adding node selectors and tolerations. This ensures exclusive job placement per topology domain, restricting the scheduling of these Pods to specific nodes based on the strategy.

### alpha.jobset.sigs.k8s.io/namespaced-job

Type: Label

Example: `alpha.jobset.sigs.k8s.io/namespaced-job: "default_myjobset-replicatedjob-0"`

Used on: Nodes

This label is either set manually or automatically (for example, a cluster autoscaler) on the nodes. When `alpha.jobset.sigs.k8s.io/node-selector` is set to  `"true"`, the  JobSet controller adds a nodeSelector to this node label (along with the toleration to the taint `alpha.jobset.sigs.k8s.io/no-schedule` discussed next).

### alpha.jobset.sigs.k8s.io/no-schedule

Type: Taint

Example: `alpha.jobset.sigs.k8s.io/no-schedule: "NoSchedule"`

Used on: Nodes

This taint is either set manually or automatically (for example, a cluster autoscaler) on the nodes. When `alpha.jobset.sigs.k8s.io/node-selector` is set to  `"true"`, the  JobSet controller adds a toleration to this node taint (along with the node selector to the label `alpha.jobset.sigs.k8s.io/namespaced-job` discussed previously).

### jobset.sigs.k8s.io/coordinator

Type: Annotation, Label

Example: `jobset.sigs.k8s.io/coordinator: "myjobset-workers-0-0.headless-svc"`

Used on: Jobs, Pods

This annotation/label is used on Jobs and Pods to store a stable network endpoint where the coordinator
pod can be reached if the JobSet spec defines the `.spec.coordinator` field.

## Annotations used for audit

- `authorization.k8s.io/decision`
- `authorization.k8s.io/reason`
- `insecure-sha1.invalid-cert.kubernetes.io/$hostname`
- `missing-san.invalid-cert.kubernetes.io/$hostname`
- `pod-security.kubernetes.io/audit-violations`
- `pod-security.kubernetes.io/enforce-policy`
- `pod-security.kubernetes.io/exempt`
- `validation.policy.admission.k8s.io/validation_failure`

See more details on Audit Annotations.

## kubeadm

### kubeadm.alpha.kubernetes.io/cri-socket (deprecated) {#kubeadm-alpha-kubernetes-io-cri-socket}

Type: Annotation

Example: `kubeadm.alpha.kubernetes.io/cri-socket: unix:///run/containerd/container.sock`

Used on: Node

**Note:**
Starting from v1.34, this annotation is deprecated, kubeadm will no longer actively set and use it.

### kubeadm.kubernetes.io/etcd.advertise-client-urls

Type: Annotation

Example: `kubeadm.kubernetes.io/etcd.advertise-client-urls: https://172.17.0.18:2379`

Used on: Pod

Annotation that kubeadm places on locally managed etcd Pods to keep track of
a list of URLs where etcd clients should connect to.
This is used mainly for etcd cluster health check purposes.

### kubeadm.kubernetes.io/kube-apiserver.advertise-address.endpoint

Type: Annotation

Example: `kubeadm.kubernetes.io/kube-apiserver.advertise-address.endpoint: https://172.17.0.18:6443`

Used on: Pod

Annotation that kubeadm places on locally managed `kube-apiserver` Pods to keep track
of the exposed advertise address/port endpoint for that API server instance.

### kubeadm.kubernetes.io/component-config.hash

Type: Annotation

Example: `kubeadm.kubernetes.io/component-config.hash: 2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae`

Used on: ConfigMap

Annotation that kubeadm places on ConfigMaps that it manages for configuring components.
It contains a hash (SHA-256) used to determine if the user has applied settings different
from the kubeadm defaults for a particular component.

### node-role.kubernetes.io/control-plane

Type: Label

Used on: Node

A marker label to indicate that the node is used to run control plane components.
The kubeadm tool applies this label to the control plane nodes that it manages.
Other cluster management tools typically also set this taint.

You can label control plane nodes with this label to make it easier to schedule Pods
only onto these nodes, or to avoid running Pods on the control plane.
If this label is set, the EndpointSlice controller
ignores that node while calculating Topology Aware Hints.

### node-role.kubernetes.io/*

Type: Label

Example: `node-role.kubernetes.io/gpu: gpu`

Used on: Node

This optional label is applied to a node when you want to mark a node role.
The node role (text following `/` in the label key) can be set, as long as the overall key <example-value> the
syntax rules for
object labels.

Kubernetes defines one specific node role, **control-plane**. A label you can use to mark that node
role is `node-role.kubernetes.io/control-plane`.

### node-role.kubernetes.io/control-plane {#node-role-kubernetes-io-control-plane-taint}

Type: Taint

Example: `node-role.kubernetes.io/control-plane:NoSchedule`

Used on: Node

Taint that kubeadm applies on control plane nodes to restrict placing Pods and
allow only specific pods to schedule on them.

If this Taint is applied, control plane nodes allow only critical workloads to
be scheduled onto them. You can manually remove this taint with the following
command on a specific node.

```shell
kubectl taint nodes <node-name> node-role.kubernetes.io/control-plane:NoSchedule-
```

### node-role.kubernetes.io/master (deprecated) {#node-role-kubernetes-io-master-taint}

Type: Taint

Used on: Node

Example: `node-role.kubernetes.io/master:NoSchedule`

Taint that kubeadm previously applied on control plane nodes to allow only critical
workloads to schedule on them. Replaced by the
`node-role.kubernetes.io/control-plane`
taint. kubeadm no longer sets or uses this deprecated taint.

### resource.kubernetes.io/admin-access {resource-kubernetes-io-admin-access}

Type: Label

Example: `resource.kubernetes.io/admin-access: "true"`

Used on: Namespace

Used to grant administrative access to certain resource.k8s.io API types within
a namespace. When this label is set on a namespace with the value `"true"`
(case-sensitive), it allows the use of `adminAccess: true` in any namespaced
`resource.k8s.io` API types. Currently, this permission applies to
`ResourceClaim` and `ResourceClaimTemplate` objects.

See Dynamic Resource Allocation Admin access
for more information.
