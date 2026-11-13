---
title: "Well-Known Labels, Annotations and Taints (part 5 of 9)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/labels-annotations-taints/_index.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Well-Known Labels, Annotations and Taints (part 5 of 9)

### topology.kubernetes.io/zone {#topologykubernetesiozone}

Type: Label

Example: `topology.kubernetes.io/zone: "us-east-1c"`

Used on: Node, PersistentVolume

**On Node**: The `kubelet` or the external `cloud-controller-manager` populates this
with the information from the cloud provider. This will be set only if you are using
a cloud provider. However, you can consider setting this on nodes if it makes sense
in your topology.

**On PersistentVolume**: topology-aware volume provisioners will automatically set
node affinity constraints on a `PersistentVolume`.

A zone represents a logical failure domain. It is common for Kubernetes clusters to
span multiple zones for increased availability. While the exact definition of a zone
is left to infrastructure implementations, common properties of a zone include
very low network latency within a zone, no-cost network traffic within a zone, and
failure independence from other zones.
For example, nodes within a zone might share a network switch, but nodes in different
zones should not.

A region represents a larger domain, made up of one or more zones.
It is uncommon for Kubernetes clusters to span multiple regions,
While the exact definition of a zone or region is left to infrastructure implementations,
common properties of a region include higher network latency between them than within them,
non-zero cost for network traffic between them, and failure independence from other zones or regions.
For example, nodes within a region might share power infrastructure (e.g. a UPS or generator),
but nodes in different regions typically would not.

Kubernetes makes a few assumptions about the structure of zones and regions:

1. regions and zones are hierarchical: zones are strict subsets of regions and
   no zone can be in 2 regions
2. zone names are unique across regions; for example region "africa-east-1" might be comprised
   of zones "africa-east-1a" and "africa-east-1b"

It should be safe to assume that topology labels do not change.
Even though labels are strictly mutable, consumers of them can assume that a given node
is not going to be moved between zones without being destroyed and recreated.

Kubernetes can use this information in various ways.
For example, the scheduler automatically tries to spread the Pods in a ReplicaSet across nodes
in a single-zone cluster (to reduce the impact of node failures, see
kubernetes.io/hostname).
With multiple-zone clusters, this spreading behavior also applies to zones (to reduce the impact of zone failures).
This is achieved via _SelectorSpreadPriority_.

_SelectorSpreadPriority_ is a best effort placement. If the zones in your cluster are
heterogeneous (for example: different numbers of nodes, different types of nodes, or different pod
resource requirements), this placement might prevent equal spreading of your Pods across zones.
If desired, you can use homogeneous zones (same number and types of nodes) to reduce the probability
of unequal spreading.

The scheduler (through the _VolumeZonePredicate_ predicate) also will ensure that Pods,
that claim a given volume, are only placed into the same zone as that volume.
Volumes cannot be attached across zones.

If `PersistentVolumeLabel` does not support automatic labeling of your PersistentVolumes,
you should consider adding the labels manually (or adding support for `PersistentVolumeLabel`).
With `PersistentVolumeLabel`, the scheduler prevents Pods from mounting volumes in a different zone.
If your infrastructure doesn't have this constraint, you don't need to add the zone labels to the volumes at all.

### volume.alpha.kubernetes.io/node-affinity (deprecated) {#volume-alpha-kubernetes-io-node-affinity}

Type: Annotation

Used on: PersistentVolume

This annotation stored node affinity rules for a PersistentVolume as a JSON-serialized
`NodeAffinity` object. The scheduler used these rules to limit which nodes could access the volume.

This annotation has been deprecated since Kubernetes v1.10. Use the
`nodeAffinity` field in the
PersistentVolume spec instead.

### volume.beta.kubernetes.io/storage-provisioner (deprecated)

Type: Annotation

Example: `volume.beta.kubernetes.io/storage-provisioner: "k8s.io/minikube-hostpath"`

Used on: PersistentVolumeClaim

This annotation has been deprecated since v1.23.
See volume.kubernetes.io/storage-provisioner.

### volume.beta.kubernetes.io/storage-class (deprecated)

Type: Annotation

Example: `volume.beta.kubernetes.io/storage-class: "example-class"`

Used on: PersistentVolume, PersistentVolumeClaim

This annotation can be used for PersistentVolume(PV) or PersistentVolumeClaim(PVC)
to specify the name of StorageClass.
When both the `storageClassName` attribute and the `volume.beta.kubernetes.io/storage-class`
annotation are specified, the annotation `volume.beta.kubernetes.io/storage-class`
takes precedence over the `storageClassName` attribute.

This annotation has been deprecated. Instead, set the
`storageClassName` field
for the PersistentVolumeClaim or PersistentVolume.

### volume.beta.kubernetes.io/mount-options (deprecated) {#mount-options}

Type: Annotation

Example : `volume.beta.kubernetes.io/mount-options: "ro,soft"`

Used on: PersistentVolume

A Kubernetes administrator can specify additional
mount options
for when a PersistentVolume is mounted on a node.

### volume.kubernetes.io/storage-provisioner  {#volume-kubernetes-io-storage-provisioner}

Type: Annotation

Used on: PersistentVolumeClaim

This annotation is added to a PVC that is supposed to be dynamically provisioned.
Its value is the name of a volume plugin that is supposed to provision a volume
for this PVC.

### volume.kubernetes.io/selected-node

Type: Annotation

Used on: PersistentVolumeClaim

This annotation is added to a PVC that is triggered by a scheduler to be
dynamically provisioned. Its value is the name of the selected node.

### volumes.kubernetes.io/controller-managed-attach-detach

Type: Annotation

Used on: Node

If a node has the annotation `volumes.kubernetes.io/controller-managed-attach-detach`,
its storage attach and detach operations are being managed by the _volume attach/detach_
controller.

The value of the annotation isn't important.

### node.kubernetes.io/windows-build {#nodekubernetesiowindows-build}

Type: Label

Example: `node.kubernetes.io/windows-build: "10.0.17763"`

Used on: Node

When the kubelet is running on Microsoft Windows, it automatically labels its Node
to record the version of Windows Server in use.

The label's value is in the format "MajorVersion.MinorVersion.BuildNumber".

### storage.alpha.kubernetes.io/migrated-plugins {#storagealphakubernetesiomigrated-plugins}

Type: Annotation

Example:`storage.alpha.kubernetes.io/migrated-plugins: "kubernetes.io/cinder"`

Used on: CSINode (an extension API)

This annotation is automatically added for the CSINode object that maps to a node that
installs CSIDriver. This annotation shows the in-tree plugin name of the migrated plugin. Its
value depends on your cluster's in-tree cloud provider storage type.

For example, if the in-tree cloud provider storage type is `CSIMigrationvSphere`, the CSINodes instance for the node should be updated with:
`storage.alpha.kubernetes.io/migrated-plugins: "kubernetes.io/vsphere-volume"`

### service.kubernetes.io/headless {#servicekubernetesioheadless}

Type: Label

Example: `service.kubernetes.io/headless: ""`

Used on: EndpointSlice, Endpoints

The control plane adds
this label to EndpointSlice and
Endpoints objects when the owning service is
headless (as a hint to the service proxy that it can ignore these endpoints). To
learn more, read Headless
Services.

### service.kubernetes.io/topology-aware-hints (deprecated) {#servicekubernetesiotopology-aware-hints}

Example: `service.kubernetes.io/topology-aware-hints: "Auto"`

Used on: Service

This is a deprecated alias for the
`service.kubernetes.io/topology-mode`
annotation, which has the same functionality.

### service.kubernetes.io/topology-mode

Type: Annotation

Example: `service.kubernetes.io/topology-mode: Auto`

Used on: Service

This annotation provides a way to define how Services handle network topology;
for example, you can configure a Service so that Kubernetes prefers keeping traffic between
a client and server within a single topology zone.
In some cases this can help reduce costs or improve network performance.

See Topology Aware Routing
for more details.

### kubernetes.io/service-name {#kubernetesioservice-name}

Type: Label

Example: `kubernetes.io/service-name: "my-website"`

Used on: EndpointSlice

Kubernetes associates EndpointSlices with
Services using this label.

This label records the name of the
Service that the EndpointSlice is backing. All EndpointSlices should have this label set to
the name of their associated Service.

### kubernetes.io/service-account.name

Type: Annotation

Example: `kubernetes.io/service-account.name: "sa-name"`

Used on: Secret

This annotation records the name of the
ServiceAccount that the token (stored in the Secret of type `kubernetes.io/service-account-token`)
represents.

### kubernetes.io/service-account.uid

Type: Annotation

Example: `kubernetes.io/service-account.uid: da68f9c6-9d26-11e7-b84e-002dc52800da`

Used on: Secret

This annotation records the unique ID of the
ServiceAccount that the token (stored in the Secret of type `kubernetes.io/service-account-token`)
represents.

### kubernetes.io/legacy-token-last-used

Type: Label

Example: `kubernetes.io/legacy-token-last-used: 2022-10-24`

Used on: Secret

The control plane only adds this label to Secrets that have the type
`kubernetes.io/service-account-token`.
The value of this label records the date (ISO 8601 format, UTC time zone) when the control plane
last saw a request where the client authenticated using the service account token.

If a legacy token was last used before the cluster gained the feature (added in Kubernetes v1.26),
then the label isn't set.

### kubernetes.io/legacy-token-invalid-since

Type: Label

Example: `kubernetes.io/legacy-token-invalid-since: 2023-10-27`

Used on: Secret

The control plane automatically adds this label to auto-generated Secrets that
have the type `kubernetes.io/service-account-token`. This label marks the
Secret-based token as invalid for authentication. The value of this label
records the date (ISO 8601 format, UTC time zone) when the control plane detects
that the auto-generated Secret has not been used for a specified duration
(defaults to one year).

### endpoints.kubernetes.io/managed-by (deprecated) {#endpoints-kubernetes-io-managed-by}

Type: Label

Example: `endpoints.kubernetes.io/managed-by: endpoint-controller`

Used on: Endpoints

This label is used internally to mark Endpoints objects that were created by
Kubernetes (as opposed to Endpoints created by users or external controllers).

**Note:**
The Endpoints
API is deprecated in favor of
EndpointSlice.

### endpointslice.kubernetes.io/managed-by {#endpointslicekubernetesiomanaged-by}

Type: Label

Example: `endpointslice.kubernetes.io/managed-by: endpointslice-controller.k8s.io`

Used on: EndpointSlices

The label is used to indicate the controller or entity that manages the EndpointSlice. This label
aims to enable different EndpointSlice objects to be managed by different controllers or entities
within the same cluster. The value `endpointslice-controller.k8s.io` indicates an
EndpointSlice object that was created automatically by Kubernetes for a Service with a
selectors.

### endpointslice.kubernetes.io/skip-mirror {#endpointslicekubernetesioskip-mirror}

Type: Label

Example: `endpointslice.kubernetes.io/skip-mirror: "true"`

Used on: Endpoints

The label can be set to `"true"` on an Endpoints resource to indicate that the
EndpointSliceMirroring controller should not mirror this resource with EndpointSlices.

### service.kubernetes.io/service-proxy-name {#servicekubernetesioservice-proxy-name}

Type: Label

Example: `service.kubernetes.io/service-proxy-name: "foo-bar"`

Used on: Service

Setting a value for this label tells kube-proxy to ignore this service for proxying purposes.
This allows for use of alternative proxy implementations for this service (e.g. running
a DaemonSet that manages nftables its own way). Multiple alternative proxy implementations
could be active simultaneously using this field, e.g. by having a value unique to each
alternative proxy implementation to be responsible for their respective services.

### experimental.windows.kubernetes.io/isolation-type (deprecated) {#experimental-windows-kubernetes-io-isolation-type}

Type: Annotation

Example: `experimental.windows.kubernetes.io/isolation-type: "hyperv"`

Used on: Pod

The annotation is used to run Windows containers with Hyper-V isolation.

**Note:**
Starting from v1.20, this annotation is deprecated.
Experimental Hyper-V support was removed in 1.21.

### gateway.networking.k8s.io/generator

Type: Annotation

Example: `gateway.networking.k8s.io/generator: "ingress2gateway"`

Used on: Gateway, HTTPRoute, and other Gateway API resources

This annotation is added by tools that automatically generate
Gateway API resources.
The value identifies the tool that created the resource (for example,
`ingress2gateway`). The annotation is informational only and does not
affect the behavior of any Gateway API implementation.

### ingressclass.kubernetes.io/is-default-class

Type: Annotation

Example: `ingressclass.kubernetes.io/is-default-class: "true"`

Used on: IngressClass

When a IngressClass resource has this annotation set to `"true"`, new Ingress resource
without a class specified will be assigned this default class.

### kubernetes.io/ingress.class (deprecated)

Type: Annotation

Used on: Ingress

**Note:**
Starting in v1.18, this annotation is deprecated in favor of `spec.ingressClassName`.

### kubernetes.io/cluster-service (deprecated) {#kubernetes-io-cluster-service}

Type: Label

Example: `kubernetes.io/cluster-service: "true"`

Used on: Service

This label indicates that the Service provides a service to the cluster, if the value is set to true.
When you run `kubectl cluster-info`, the tool queries for Services with this label set to true.

However, setting this label on any Service is deprecated.

### storageclass.kubernetes.io/is-default-class

Type: Annotation

Example: `storageclass.kubernetes.io/is-default-class: "true"`

Used on: StorageClass

When a single StorageClass resource has this annotation set to `"true"`, new PersistentVolumeClaim
resource without a class specified will be assigned this default class.
