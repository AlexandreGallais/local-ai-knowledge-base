---
title: "Well-Known Labels, Annotations and Taints (part 4 of 9)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/labels-annotations-taints/_index.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Well-Known Labels, Annotations and Taints (part 4 of 9)

### kube-aggregator.kubernetes.io/automanaged {#kube-aggregator-kubernetesio-automanaged}

Type: Label

Example: `kube-aggregator.kubernetes.io/automanaged: "onstart"`

Used on: APIService

The `kube-apiserver` sets this label on any APIService object that the API server
has created automatically. The label marks how the control plane should manage that
APIService. You should not add, modify, or remove this label by yourself.

**Note:**
Automanaged APIService objects are deleted by kube-apiserver when it has no built-in
or custom resource API corresponding to the API group/version of the APIService.

There are two possible values:

- `onstart`: The APIService should be reconciled when an API server starts up, but not otherwise.
- `true`: The API server should reconcile this APIService continuously.

### service.alpha.kubernetes.io/tolerate-unready-endpoints (deprecated)

Type: Annotation

Used on: Service

This annotation was formerly used to indicate that the Endpoints controller
should create Endpoints for unready Pods. Since Kubernetes 1.11, the preferred
API for this feature has been the `.publishNotReadyAddresses` field on the
service. This annotation has no effect in
Kubernetes .

### autoscaling.alpha.kubernetes.io/behavior (deprecated) {#autoscaling-alpha-kubernetes-io-behavior}

Type: Annotation

Used on: HorizontalPodAutoscaler

This annotation was used to configure the scaling behavior for a HorizontalPodAutoscaler (HPA) in earlier Kubernetes versions.
It allowed you to specify how the HPA should scale pods up or down, including setting stabilization windows and scaling policies.
Setting this annotation has no effect in any supported release of Kubernetes.

### kubernetes.io/hostname {#kubernetesiohostname}

Type: Label

Example: `kubernetes.io/hostname: "ip-172-20-114-199.ec2.internal"`

Used on: Node

The Kubelet populates this label with the hostname of the node. Note that the hostname
can be changed from the "actual" hostname by passing the `--hostname-override` flag to
the `kubelet`.

This label is also used as part of the topology hierarchy.
See topology.kubernetes.io/zone for more information.

### kubernetes.io/change-cause {#change-cause}

Type: Annotation

Example: `kubernetes.io/change-cause: "kubectl edit --record deployment foo"`

Used on: All Objects

This annotation is a best guess at why something was changed.

It is populated when adding `--record` to a `kubectl` command that may change an object.

### kubernetes.io/description {#description}

Type: Annotation

Example: `kubernetes.io/description: "Description of K8s object."`

Used on: All Objects

This annotation is used for describing specific behaviour of given object.

### kubernetes.io/enforce-mountable-secrets (deprecated) {#enforce-mountable-secrets}

Type: Annotation

Example: `kubernetes.io/enforce-mountable-secrets: "<example-value>"`

Used on: ServiceAccount

**Note:**
`kubernetes.io/enforce-mountable-secrets` is deprecated since Kubernetes v1.32. Use separate namespaces to isolate access to mounted secrets.

The value for this annotation must be **true** to take effect.
When you set this annotation  to "true", Kubernetes enforces the following rules for
Pods running as this ServiceAccount:

1. Secrets mounted as volumes must be listed in the ServiceAccount's `secrets` field.
1. Secrets referenced in `envFrom` for containers (including sidecar containers and init containers)
   must also be listed in the ServiceAccount's secrets field.
   If any container in a Pod references a Secret not listed in the ServiceAccount's `secrets` field
   (and even if the reference is marked as `optional`), then the Pod will fail to start,
   and an error indicating the non-compliant secret <example-value> will be generated.
1. Secrets referenced in a Pod's `imagePullSecrets` must be present in the
   ServiceAccount's `imagePullSecrets` field, the Pod will fail to start,
   and an error indicating the non-compliant image pull secret <example-value> will be generated.

When you create or update a Pod, these rules are checked. If a Pod doesn't follow them, it won't start and you'll see an error message.
If a Pod is already running and you change the `kubernetes.io/enforce-mountable-secrets` annotation
to true, or you edit the associated ServiceAccount to remove the reference to a Secret
that the Pod is already using, the Pod continues to run.

### node.alpha.kubernetes.io/ttl (deprecated)

Type: Label

Example: `node.alpha.kubernetes.io/ttl: "0"`

Used on: Node

This label was used historically by some tools (such as minikube) to set a time-to-live
value for nodes. The label is deprecated and should not be used in new deployments.

**Note:**
This label is deprecated and has no effect in current Kubernetes versions.
It may still be set by older tools for backward compatibility.

### node.kubernetes.io/exclude-from-external-load-balancers

Type: Label

Example: `node.kubernetes.io/exclude-from-external-load-balancers`

Used on: Node

You can add labels to particular worker nodes to exclude them from the list of backend servers used by external load balancers.
The following command can be used to exclude a worker node from the list of backend servers in a
backend set:

```shell
kubectl label nodes <node-name> node.kubernetes.io/exclude-from-external-load-balancers=true
```

### controller.kubernetes.io/pod-deletion-cost {#pod-deletion-cost}

Type: Annotation

Example: `controller.kubernetes.io/pod-deletion-cost: "10"`

Used on: Pod

This annotation is used to set Pod Deletion Cost
which allows users to influence ReplicaSet downscaling order.
The annotation value parses into an `int32` type.

### cluster-autoscaler.kubernetes.io/enable-ds-eviction

Type: Annotation

Example: `cluster-autoscaler.kubernetes.io/enable-ds-eviction: "true"`

Used on: Pod

This annotation controls whether a DaemonSet pod should be evicted by a ClusterAutoscaler.
This annotation needs to be specified on DaemonSet pods in a DaemonSet manifest.
When this annotation is set to `"true"`, the ClusterAutoscaler is allowed to evict
a DaemonSet Pod, even if other rules would normally prevent that.
To disallow the ClusterAutoscaler from evicting DaemonSet pods,
you can set this annotation to `"false"` for important DaemonSet pods.
If this annotation is not set, then the ClusterAutoscaler follows its overall behavior
(i.e evict the DaemonSets based on its configuration).

**Note:**
This annotation only impacts DaemonSet Pods.

### kubernetes.io/ingress-bandwidth

Type: Annotation

Example: `kubernetes.io/ingress-bandwidth: 10M`

Used on: Pod

You can apply quality-of-service traffic shaping to a pod and effectively limit its available
bandwidth. Ingress traffic to a Pod is handled by shaping queued packets to effectively
handle data. To limit the bandwidth on a Pod, write an object definition JSON file and specify
the data traffic speed using `kubernetes.io/ingress-bandwidth` annotation. The unit used for
specifying ingress rate is bits per second, as a
Quantity.
For example, `10M` means 10 megabits per second.

**Note:**
Ingress traffic shaping annotation is an experimental feature.
If you want to enable traffic shaping support, you must add the `bandwidth` plugin to your CNI
configuration file (default `/etc/cni/net.d`) and ensure that the binary is included in your CNI
bin dir (default `/opt/cni/bin`).

### kubernetes.io/egress-bandwidth

Type: Annotation

Example: `kubernetes.io/egress-bandwidth: 10M`

Used on: Pod

Egress traffic from a Pod is handled by policing, which simply drops packets in excess of the
configured rate. The limits you place on a Pod do not affect the bandwidth of other Pods.
To limit the bandwidth on a Pod, write an object definition JSON file and specify the data traffic
speed using `kubernetes.io/egress-bandwidth` annotation. The unit used for specifying egress rate
is bits per second, as a Quantity.
For example, `10M` means 10 megabits per second.

**Note:**
Egress traffic shaping annotation is an experimental feature.
If you want to enable traffic shaping support, you must add the `bandwidth` plugin to your CNI
configuration file (default `/etc/cni/net.d`) and ensure that the binary is included in your CNI
bin dir (default `/opt/cni/bin`).

### beta.kubernetes.io/instance-type (deprecated)

Type: Label

**Note:**
Starting in v1.17, this label is deprecated in favor of
node.kubernetes.io/instance-type.

### node.kubernetes.io/instance-type {#nodekubernetesioinstance-type}

Type: Label

Example: `node.kubernetes.io/instance-type: "m3.medium"`

Used on: Node

The Kubelet populates this with the instance type as defined by the cloud provider.
This will be set only if you are using a cloud provider. This setting is handy
if you want to target certain workloads to certain instance types, but typically you want
to rely on the Kubernetes scheduler to perform resource-based scheduling.
You should aim to schedule based on properties rather than on instance types
(for example: require a GPU, instead of requiring a `g2.2xlarge`).

### failure-domain.beta.kubernetes.io/region (deprecated) {#failure-domainbetakubernetesioregion}

Type: Label

**Note:**
Starting in v1.17, this label is deprecated in favor of
topology.kubernetes.io/region.

### failure-domain.beta.kubernetes.io/zone (deprecated) {#failure-domainbetakubernetesiozone}

Type: Label

**Note:**
Starting in v1.17, this label is deprecated in favor of
topology.kubernetes.io/zone.

### pv.kubernetes.io/bind-completed {#pv-kubernetesiobind-completed}

Type: Annotation

Example: `pv.kubernetes.io/bind-completed: "yes"`

Used on: PersistentVolumeClaim

When this annotation is set on a PersistentVolumeClaim (PVC), that indicates that the lifecycle
of the PVC has passed through initial binding setup. When present, that information changes
how the control plane interprets the state of PVC objects.
The value of this annotation does not matter to Kubernetes.

### pv.kubernetes.io/bound-by-controller {#pv-kubernetesioboundby-controller}

Type: Annotation

Example: `pv.kubernetes.io/bound-by-controller: "yes"`

Used on: PersistentVolume, PersistentVolumeClaim

If this annotation is set on a PersistentVolume or PersistentVolumeClaim, it indicates that a
storage binding (PersistentVolume → PersistentVolumeClaim, or PersistentVolumeClaim → PersistentVolume)
was installed by the controller.
If the annotation isn't set, and there is a storage binding in place, the absence of that
annotation means that the binding was done manually.
The value of this annotation does not matter.

### pv.kubernetes.io/provisioned-by {#pv-kubernetesiodynamically-provisioned}

Type: Annotation

Example: `pv.kubernetes.io/provisioned-by: "kubernetes.io/rbd"`

Used on: PersistentVolume

This annotation is added to a PersistentVolume(PV) that has been dynamically provisioned by Kubernetes.
Its value is the name of volume plugin that created the volume. It serves both users (to show where a PV
comes from) and Kubernetes (to recognize dynamically provisioned PVs in its decisions).

### pv.kubernetes.io/migrated-to {#pv-kubernetesio-migratedto}

Type: Annotation

Example: `pv.kubernetes.io/migrated-to: pd.csi.storage.gke.io`

Used on: PersistentVolume, PersistentVolumeClaim

It is added to a PersistentVolume(PV) and PersistentVolumeClaim(PVC) that is supposed to be
dynamically provisioned/deleted by its corresponding CSI driver through the `CSIMigration` feature gate.
When this annotation is set, the Kubernetes components will "stand-down" and the
`external-provisioner` will act on the objects.

### statefulset.kubernetes.io/pod-name {#statefulsetkubernetesiopod-name}

Type: Label

Example: `statefulset.kubernetes.io/pod-name: "mystatefulset-7"`

Used on: Pod

When a StatefulSet controller creates a Pod for the StatefulSet, the control plane
sets this label on that Pod. The value of the label is the name of the Pod being created.

See Pod Name Label
in the StatefulSet topic for more details.

### scheduler.alpha.kubernetes.io/node-selector {#schedulerkubernetesnode-selector}

Type: Annotation

Example: `scheduler.alpha.kubernetes.io/node-selector: "name-of-node-selector"`

Used on: Namespace

The PodNodeSelector
uses this annotation key to assign node selectors to pods in namespaces.

### topology.kubernetes.io/region {#topologykubernetesioregion}

Type: Label

Example: `topology.kubernetes.io/region: "us-east-1"`

Used on: Node, PersistentVolume

See topology.kubernetes.io/zone.
