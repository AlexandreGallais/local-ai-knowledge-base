---
title: "Storage Classes (part 1 of 2)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/concepts/storage/storage-classes.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Storage Classes

This document describes the concept of a StorageClass in Kubernetes. Familiarity
with volumes and
persistent volumes is suggested.

A StorageClass provides a way for administrators to describe the _classes_ of
storage they offer. Different classes might map to quality-of-service levels,
or to backup policies, or to arbitrary policies determined by the cluster
administrators. Kubernetes itself is unopinionated about what classes
represent.

The Kubernetes concept of a storage class is similar to “profiles” in some other
storage system designs.

## StorageClass objects

Each StorageClass contains the fields `provisioner`, `parameters`, and
`reclaimPolicy`, which are used when a PersistentVolume belonging to the
class needs to be dynamically provisioned to satisfy a PersistentVolumeClaim (PVC).

The name of a StorageClass object is significant, and is how users can
request a particular class. Administrators set the name and other parameters
of a class when first creating StorageClass objects.

As an administrator, you can specify a default StorageClass that applies to any PVCs that
don't request a specific class. For more details, see the
PersistentVolumeClaim concept.

Here's an example of a StorageClass:

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: low-latency
  annotations:
    storageclass.kubernetes.io/is-default-class: "false"
provisioner: csi-driver.example-vendor.example
reclaimPolicy: Retain # default value is Delete
allowVolumeExpansion: true
mountOptions:
  - discard # this might enable UNMAP / TRIM at the block storage layer
volumeBindingMode: WaitForFirstConsumer
parameters:
  guaranteedReadWriteLatency: "true" # provider-specific
```

## Default StorageClass

You can mark a StorageClass as the default for your cluster.
For instructions on setting the default StorageClass, see
Change the default StorageClass.

When a PVC does not specify a `storageClassName`, the default StorageClass is
used.

If you set the
`storageclass.kubernetes.io/is-default-class`
annotation to true on more than one StorageClass in your cluster, and you then
create a PersistentVolumeClaim with no `storageClassName` set, Kubernetes
uses the most recently created default StorageClass.

**Note:**
You should try to only have one StorageClass in your cluster that is
marked as the default. The reason that Kubernetes allows you to have
multiple default StorageClasses is to allow for seamless migration.

You can create a PersistentVolumeClaim without specifying a `storageClassName`
for the new PVC, and you can do so even when no default StorageClass exists
in your cluster. In this case, the new PVC creates as you defined it, and the
`storageClassName` of that PVC remains unset until a default becomes available.

You can have a cluster without any default StorageClass. If you don't mark any
StorageClass as default (and one hasn't been set for you by, for example, a cloud provider),
then Kubernetes cannot apply that defaulting for PersistentVolumeClaims that need
it.

If or when a default StorageClass becomes available, the control plane identifies any
existing PVCs without `storageClassName`. For the PVCs that either have an empty
value for `storageClassName` or do not have this key, the control plane then
updates those PVCs to set `storageClassName` to match the new default StorageClass.
If you have an existing PVC where the `storageClassName` is `""`, and you configure
a default StorageClass, then this PVC will not get updated.

In order to keep binding to PVs with `storageClassName` set to `""`
(while a default StorageClass is present), you need to set the `storageClassName`
of the associated PVC to `""`.

## Provisioner

Each StorageClass has a provisioner that determines what volume plugin is used
for provisioning PVs. This field must be specified.

| Volume Plugin        | Internal Provisioner |            Config Example             |
| :------------------- | :------------------: | :-----------------------------------: |
| AzureFile            |       &#x2713;       |       Azure File       |
| CephFS               |          -           |                   -                   |
| FC                   |          -           |                   -                   |
| FlexVolume           |          -           |                   -                   |
| iSCSI                |          -           |                   -                   |
| Local                |          -           |            Local            |
| NFS                  |          -           |              NFS              |
| PortworxVolume       |       &#x2713;       |  Portworx Volume  |
| RBD                  |          -           |         Ceph RBD         |
| VsphereVolume        |       &#x2713;       |          vSphere          |

You are not restricted to specifying the "internal" provisioners
listed here (whose names are prefixed with "kubernetes.io" and shipped
alongside Kubernetes). You can also run and specify external provisioners,
which are independent programs that follow a specification
defined by Kubernetes. Authors of external provisioners have full discretion
over where their code lives, how the provisioner is shipped, how it needs to be
run, what volume plugin it uses (including Flex), etc. The repository
kubernetes-sigs/sig-storage-lib-external-provisioner
houses a library for writing external provisioners that implements the bulk of
the specification. Some external provisioners are listed under the repository
kubernetes-sigs/sig-storage-lib-external-provisioner.

For example, NFS doesn't provide an internal provisioner, but an external
provisioner can be used. There are also cases when 3rd party storage
vendors provide their own external provisioner.

## Reclaim policy

PersistentVolumes that are dynamically created by a StorageClass will have the
reclaim policy
specified in the `reclaimPolicy` field of the class, which can be
either `Delete` or `Retain`. If no `reclaimPolicy` is specified when a
StorageClass object is created, it will default to `Delete`.

PersistentVolumes that are created manually and managed via a StorageClass will have
whatever reclaim policy they were assigned at creation.

## Volume expansion {#allow-volume-expansion}

PersistentVolumes can be configured to be expandable. This allows you to resize the
volume by editing the corresponding PVC object, requesting a new larger amount of
storage.

The following types of volumes support volume expansion, when the underlying
StorageClass has the field `allowVolumeExpansion` set to true.

| Volume type          | Required Kubernetes version for volume expansion |
| :------------------- | :----------------------------------------------- |
| Azure File           | 1.11                                             |
| CSI                  | 1.24                                             |
| FlexVolume           | 1.13                                             |
| Portworx             | 1.11                                             |
| rbd                  | 1.11                                             |

**Note:**
You can only use the volume expansion feature to grow a Volume, not to shrink it.

## Mount options

PersistentVolumes that are dynamically created by a StorageClass will have the
mount options specified in the `mountOptions` field of the class.

If the volume plugin does not support mount options but mount options are
specified, provisioning will fail. Mount options are **not** validated on either
the class or PV. If a mount option is invalid, the PV mount fails.

## Volume binding mode

The `volumeBindingMode` field controls when
volume binding and dynamic provisioning
should occur. When unset, `Immediate` mode is used by default.

The `Immediate` mode indicates that volume binding and dynamic
provisioning occurs once the PersistentVolumeClaim is created. For storage
backends that are topology-constrained and not globally accessible from all Nodes
in the cluster, PersistentVolumes will be bound or provisioned without knowledge of the Pod's scheduling
requirements. This may result in unschedulable Pods.

A cluster administrator can address this issue by specifying the `WaitForFirstConsumer` mode which
will delay the binding and provisioning of a PersistentVolume until a Pod using the PersistentVolumeClaim is created.
PersistentVolumes will be selected or provisioned conforming to the topology that is
specified by the Pod's scheduling constraints. These include, but are not limited to, resource
requirements,
node selectors,
pod affinity and
anti-affinity,
and taints and tolerations.

The following plugins support `WaitForFirstConsumer` with dynamic provisioning:

- CSI volumes, provided that the specific CSI driver supports this

The following plugins support `WaitForFirstConsumer` with pre-created PersistentVolume binding:

- CSI volumes, provided that the specific CSI driver supports this
- `local`

**Note:**
If you choose to use `WaitForFirstConsumer`, do not use `nodeName` in the Pod spec
to specify node affinity.
If `nodeName` is used in this case, the scheduler will be bypassed and PVC will remain in `pending` state.

Instead, you can use node selector for `kubernetes.io/hostname`:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: task-pv-pod
spec:
  nodeSelector:
    kubernetes.io/hostname: kube-01
  volumes:
    - name: task-pv-storage
      persistentVolumeClaim:
        claimName: task-pv-claim
  containers:
    - name: task-pv-container
      image: nginx
      ports:
        - containerPort: 80
          name: "http-server"
      volumeMounts:
        - mountPath: "/usr/share/nginx/html"
          name: task-pv-storage
```

## Allowed topologies

When a cluster operator specifies the `WaitForFirstConsumer` volume binding mode, it is no longer necessary
to restrict provisioning to specific topologies in most situations. However,
if still required, `allowedTopologies` can be specified.

This example demonstrates how to restrict the topology of provisioned volumes to specific
zones and should be used as a replacement for the `zone` and `zones` parameters for the
supported plugins.

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: standard
provisioner:  example.com/example
parameters:
  type: pd-standard
volumeBindingMode: WaitForFirstConsumer
allowedTopologies:
- matchLabelExpressions:
  - key: topology.kubernetes.io/zone
    values:
    - us-central-1a
    - us-central-1b
```
