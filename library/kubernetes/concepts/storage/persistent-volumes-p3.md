---
title: "Persistent Volumes (part 3 of 6)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/concepts/storage/persistent-volumes.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Persistent Volumes (part 3 of 6)

### Expanding Persistent Volumes Claims

**Feature state:** v1.24 [stable]

Support for expanding PersistentVolumeClaims (PVCs) is enabled by default. You can expand
the following types of volumes:

* csi (including some CSI migrated
volume types)
* flexVolume (deprecated)
* portworxVolume (deprecated)

You can only expand a PVC if its storage class's `allowVolumeExpansion` field is set to true.

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: example-vol-default
provisioner: vendor-name.example/magicstorage
parameters:
  resturl: "http://192.168.10.100:8080"
  restuser: ""
  secretNamespace: ""
  secretName: ""
allowVolumeExpansion: true
```

To request a larger volume for a PVC, edit the PVC object and specify a larger
size. This triggers expansion of the volume that backs the underlying PersistentVolume. A
new PersistentVolume is never created to satisfy the claim. Instead, an existing volume is resized.

**Warning:**
Directly editing the size of a PersistentVolume can prevent an automatic resize of that volume.
If you edit the capacity of a PersistentVolume, and then edit the `.spec` of a matching
PersistentVolumeClaim to make the size of the PersistentVolumeClaim match the PersistentVolume,
then no storage resize happens.
The Kubernetes control plane will see that the desired state of both resources matches,
conclude that the backing volume size has been manually
increased and that no resize is necessary.

#### CSI Volume expansion

**Feature state:** v1.24 [stable]

Support for expanding CSI volumes is enabled by default but it also requires a
specific CSI driver to support volume expansion. Refer to documentation of the
specific CSI driver for more information.

#### Resizing a volume containing a file system

You can only resize volumes containing a file system if the file system is XFS, Ext3, or Ext4.

When a volume contains a file system, the file system is only resized when a new Pod is using
the PersistentVolumeClaim in `ReadWrite` mode. File system expansion is either done when a Pod is starting up
or when a Pod is running and the underlying file system supports online expansion.

FlexVolumes (deprecated since Kubernetes v1.23) allow resize if the driver is configured with the
`RequiresFSResize` capability to `true`. The FlexVolume can be resized on Pod restart.

#### Resizing an in-use PersistentVolumeClaim

**Feature state:** v1.24 [stable]

In this case, you don't need to delete and recreate a Pod or deployment that is using an existing PVC.
Any in-use PVC automatically becomes available to its Pod as soon as its file system has been expanded.
This feature has no effect on PVCs that are not in use by a Pod or deployment. You must create a Pod that
uses the PVC before the expansion can complete.

Similar to other volume types - FlexVolume volumes can also be expanded when in-use by a Pod.

**Note:**
FlexVolume resize is possible only when the underlying driver supports resize.

#### Recovering from Failure when Expanding Volumes

If a user specifies a new size that is too big to be satisfied by underlying
storage system, expansion of PVC will be continuously retried until user or
cluster administrator takes some action. This can be undesirable and hence
Kubernetes provides following methods of recovering from such failures.

**Manually with Cluster Administrator access**

If expanding underlying storage fails, the cluster administrator can manually
recover the Persistent Volume Claim (PVC) state and cancel the resize requests.
Otherwise, the resize requests are continuously retried by the controller without
administrator intervention.

1. Mark the PersistentVolume(PV) that is bound to the PersistentVolumeClaim(PVC)
   with `Retain` reclaim policy.
2. Delete the PVC. Since PV has `Retain` reclaim policy - we will not lose any data
   when we recreate the PVC.
3. Delete the `claimRef` entry from PV specs, so as new PVC can bind to it.
   This should make the PV `Available`.
4. Re-create the PVC with smaller size than PV and set `volumeName` field of the
   PVC to the name of the PV. This should bind new PVC to existing PV.
5. Don't forget to restore the reclaim policy of the PV.

**By requesting expansion to smaller size**

If expansion has failed for a PVC, you can retry expansion with a
smaller size than the previously requested value. To request a new expansion attempt with a
smaller proposed size, edit `.spec.resources` for that PVC and choose a value that is less than the
value you previously tried.
This is useful if expansion to a higher value did not succeed because of capacity constraint.
If that has happened, or you suspect that it might have, you can retry expansion by specifying a
size that is within the capacity limits of underlying storage provider. You can monitor status of
resize operation by watching `.status.allocatedResourceStatuses` and events on the PVC.

Note that,
although you can specify a lower amount of storage than what was requested previously,
the new value must still be higher than `.status.capacity`.
Kubernetes does not support shrinking a PVC to less than its current size.

## Types of Persistent Volumes

PersistentVolume types are implemented as plugins. Kubernetes currently supports the following plugins:

* `csi` - Container Storage Interface (CSI)
* `fc` - Fibre Channel (FC) storage
* `hostPath` - HostPath volume
  (for single node testing only; WILL NOT WORK in a multi-node cluster;
  consider using `local` volume instead)
* `iscsi` - iSCSI (SCSI over IP) storage
* `local` - local storage devices
  mounted on nodes.
* `nfs` - Network File System (NFS) storage

The following types of PersistentVolume are deprecated but still available.
If you are using these volume types except for `flexVolume`, `cephfs` and `rbd`,
please install corresponding CSI drivers.

* `awsElasticBlockStore` - AWS Elastic Block Store (EBS)
  (**migration on by default** starting v1.23)
* `azureDisk` - Azure Disk
  (**migration on by default** starting v1.23)
* `azureFile` - Azure File
  (**migration on by default** starting v1.24)
* `cinder` - Cinder (OpenStack block storage)
  (**migration on by default** starting v1.21)
* `flexVolume` - FlexVolume
  (**deprecated** starting v1.23, no migration plan and no plan to remove support)
* `gcePersistentDisk` - GCE Persistent Disk
  (**migration on by default** starting v1.23)
* `portworxVolume` - Portworx volume
  (**migration on by default** starting v1.31)
* `vsphereVolume` - vSphere VMDK volume
  (**migration on by default** starting v1.25)

Older versions of Kubernetes also supported the following in-tree PersistentVolume types:

* `cephfs`
  (**not available** starting v1.31)
* `flocker` - Flocker storage.
  (**not available** starting v1.25)
* `glusterfs` - GlusterFS storage.
  (**not available** starting v1.26)
* `photonPersistentDisk` - Photon controller persistent disk.
  (**not available** starting v1.15)
* `quobyte` - Quobyte volume.
  (**not available** starting v1.25)
* `rbd` - Rados Block Device (RBD) volume
  (**not available** starting v1.31)
* `scaleIO` - ScaleIO volume.
  (**not available** starting v1.21)
* `storageos` - StorageOS volume.
  (**not available** starting v1.25)
