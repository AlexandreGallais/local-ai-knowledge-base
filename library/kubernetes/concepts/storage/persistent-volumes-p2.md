---
title: "Persistent Volumes (part 2 of 6)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/concepts/storage/persistent-volumes.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Persistent Volumes (part 2 of 6)

## Lifecycle of a volume and claim

PVs are resources in the cluster. PVCs are requests for those resources and also act
as claim checks to the resource. The interaction between PVs and PVCs follows this lifecycle:

### Provisioning

There are two ways PVs may be provisioned: statically or dynamically.

#### Static

A cluster administrator creates a number of PVs. They carry the details of the
real storage, which is available for use by cluster users. They exist in the
Kubernetes API and are available for consumption.

#### Dynamic

When none of the static PVs the administrator created match a user's PersistentVolumeClaim,
the cluster may try to dynamically provision a volume specially for the PVC.
This provisioning is based on StorageClasses: the PVC must request a
storage class and
the administrator must have created and configured that class for dynamic
provisioning to occur. Claims that request the class `""` effectively disable
dynamic provisioning for themselves.

To enable dynamic storage provisioning based on storage class, the cluster administrator
needs to enable the `DefaultStorageClass`
admission controller
on the API server. This can be done, for example, by ensuring that `DefaultStorageClass` is
among the comma-delimited, ordered list of values for the `--enable-admission-plugins` flag of
the API server component. For more information on API server command-line flags,
check kube-apiserver documentation.

### Binding

A user creates, or in the case of dynamic provisioning, has already created,
a PersistentVolumeClaim with a specific amount of storage requested and with
certain access modes. A control loop in the control plane watches for new PVCs, finds
a matching PV (if possible), and binds them together. If a PV was dynamically
provisioned for a new PVC, the loop will always bind that PV to the PVC. Otherwise,
the user will always get at least what they asked for, but the volume may be in
excess of what was requested. Once bound, PersistentVolumeClaim binds are exclusive,
regardless of how they were bound. A PVC to PV binding is a one-to-one mapping,
using a ClaimRef which is a bi-directional binding between the PersistentVolume
and the PersistentVolumeClaim.

Claims will remain unbound indefinitely if a matching volume does not exist.
Claims will be bound as matching volumes become available. For example, a
cluster provisioned with many 50Gi PVs would not match a PVC requesting 100Gi.
The PVC can be bound when a 100Gi PV is added to the cluster.

### Using

Pods use claims as volumes. The cluster inspects the claim to find the bound
volume and mounts that volume for a Pod. For volumes that support multiple
access modes, the user specifies which mode is desired when using their claim
as a volume in a Pod.

Once a user has a claim and that claim is bound, the bound PV belongs to the
user for as long as they need it. Users schedule Pods and access their claimed
PVs by including a `persistentVolumeClaim` section in a Pod's `volumes` block.
See Claims As Volumes for more details on this.

### Storage Object in Use Protection

The purpose of the Storage Object in Use Protection feature is to ensure that
PersistentVolumeClaims (PVCs) in active use by a Pod and PersistentVolume (PVs)
that are bound to PVCs are not removed from the system, as this may result in data loss.

**Note:**
PVC is in active use by a Pod when a Pod object exists that is using the PVC.

If a user deletes a PVC in active use by a Pod, the PVC is not removed immediately.
PVC removal is postponed until the PVC is no longer actively used by any Pods. Also,
if an admin deletes a PV that is bound to a PVC, the PV is not removed immediately.
PV removal is postponed until the PV is no longer bound to a PVC.

You can see that a PVC is protected when the PVC's status is `Terminating` and the
`Finalizers` list includes `kubernetes.io/pvc-protection`:

```shell
kubectl describe pvc hostpath
Name:          hostpath
Namespace:     default
StorageClass:  example-hostpath
Status:        Terminating
Volume:
Labels:        <none>
Annotations:   volume.beta.kubernetes.io/storage-class=example-hostpath
               volume.beta.kubernetes.io/storage-provisioner=example.com/hostpath
Finalizers:    [kubernetes.io/pvc-protection]
...
```

You can see that a PV is protected when the PV's status is `Terminating` and
the `Finalizers` list includes `kubernetes.io/pv-protection` too:

```shell
kubectl describe pv task-pv-volume
Name:            task-pv-volume
Labels:          type=local
Annotations:     <none>
Finalizers:      [kubernetes.io/pv-protection]
StorageClass:    standard
Status:          Terminating
Claim:
Reclaim Policy:  Delete
Access Modes:    RWO
Capacity:        1Gi
Message:
Source:
    Type:          HostPath (bare host directory volume)
    Path:          /tmp/data
    HostPathType:
Events:            <none>
```

### Reclaiming

When a user is done with their volume, they can delete the PVC objects from the
API that allows reclamation of the resource. The reclaim policy for a PersistentVolume
tells the cluster what to do with the volume after it has been released of its claim.
Currently, volumes can either be Retained, Recycled, or Deleted.

#### Retain

The `Retain` reclaim policy allows for manual reclamation of the resource.
When the PersistentVolumeClaim is deleted, the PersistentVolume still exists
and the volume is considered "released". But it is not yet available for
another claim because the previous claimant's data remains on the volume.
An administrator can manually reclaim the volume with the following steps.

1. Delete the PersistentVolume. The associated storage asset in external infrastructure
   still exists after the PV is deleted.
1. Manually clean up the data on the associated storage asset accordingly.
1. Manually delete the associated storage asset.

If you want to reuse the same storage asset, create a new PersistentVolume with
the same storage asset definition.

#### Delete

For volume plugins that support the `Delete` reclaim policy, deletion removes
both the PersistentVolume object from Kubernetes, as well as the associated
storage asset in the external infrastructure. Volumes that were dynamically provisioned
inherit the reclaim policy of their StorageClass, which
defaults to `Delete`. The administrator should configure the StorageClass
according to users' expectations; otherwise, the PV must be edited or
patched after it is created. See
Change the Reclaim Policy of a PersistentVolume.

#### Recycle

**Warning:**
The `Recycle` reclaim policy is deprecated. Instead, the recommended approach
is to use dynamic provisioning.

If supported by the underlying volume plugin, the `Recycle` reclaim policy performs
a basic scrub (`rm -rf /thevolume/*`) on the volume and makes it available again for a new claim.

However, an administrator can configure a custom recycler Pod template using
the Kubernetes controller manager command line arguments as described in the
reference.
The custom recycler Pod template must contain a `volumes` specification, as
shown in the example below:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: pv-recycler
  namespace: default
spec:
  restartPolicy: Never
  volumes:
  - name: vol
    hostPath:
      path: /any/path/it/will/be/replaced
  containers:
  - name: pv-recycler
    image: "registry.k8s.io/busybox"
    command: ["/bin/sh", "-c", "test -e /scrub && rm -rf /scrub/..?* /scrub/.[!.]* /scrub/*  && test -z \"$(ls -A /scrub)\" || exit 1"]
    volumeMounts:
    - name: vol
      mountPath: /scrub
```

However, the particular path specified in the custom recycler Pod template in the
`volumes` part is replaced with the particular path of the volume that is being recycled.

### PersistentVolume deletion protection finalizer
**Feature state:**

Finalizers can be added on a PersistentVolume to ensure that PersistentVolumes
having `Delete` reclaim policy are deleted only after the backing storage are deleted.

The finalizer `external-provisioner.volume.kubernetes.io/finalizer`(introduced
in  v1.31) is added to both dynamically provisioned and statically provisioned
CSI volumes.

The finalizer `kubernetes.io/pv-controller`(introduced in v1.31) is added to
dynamically provisioned in-tree plugin volumes and skipped for statically
provisioned in-tree plugin volumes.

The following is an example of dynamically provisioned in-tree plugin volume:

```shell
kubectl describe pv pvc-74a498d6-3929-47e8-8c02-078c1ece4d78
Name:            pvc-74a498d6-3929-47e8-8c02-078c1ece4d78
Labels:          <none>
Annotations:     kubernetes.io/createdby: vsphere-volume-dynamic-provisioner
                 pv.kubernetes.io/bound-by-controller: yes
                 pv.kubernetes.io/provisioned-by: kubernetes.io/vsphere-volume
Finalizers:      [kubernetes.io/pv-protection kubernetes.io/pv-controller]
StorageClass:    vcp-sc
Status:          Bound
Claim:           default/vcp-pvc-1
Reclaim Policy:  Delete
Access Modes:    RWO
VolumeMode:      Filesystem
Capacity:        1Gi
Node Affinity:   <none>
Message:
Source:
    Type:               vSphereVolume (a Persistent Disk resource in vSphere)
    VolumePath:         [vsanDatastore] d49c4a62-166f-ce12-c464-020077ba5d46/kubernetes-dynamic-pvc-74a498d6-3929-47e8-8c02-078c1ece4d78.vmdk
    FSType:             ext4
    StoragePolicyName:  vSAN Default Storage Policy
Events:                 <none>
```

The finalizer `external-provisioner.volume.kubernetes.io/finalizer` is added for CSI volumes.
The following is an example:

```shell
Name:            pvc-2f0bab97-85a8-4552-8044-eb8be45cf48d
Labels:          <none>
Annotations:     pv.kubernetes.io/provisioned-by: csi.vsphere.vmware.com
Finalizers:      [kubernetes.io/pv-protection external-provisioner.volume.kubernetes.io/finalizer]
StorageClass:    fast
Status:          Bound
Claim:           demo-app/nginx-logs
Reclaim Policy:  Delete
Access Modes:    RWO
VolumeMode:      Filesystem
Capacity:        200Mi
Node Affinity:   <none>
Message:
Source:
    Type:              CSI (a Container Storage Interface (CSI) volume source)
    Driver:            csi.vsphere.vmware.com
    FSType:            ext4
    VolumeHandle:      44830fa8-79b4-406b-8b58-621ba25353fd
    ReadOnly:          false
    VolumeAttributes:      storage.kubernetes.io/csiProvisionerIdentity=1648442357185-8081-csi.vsphere.vmware.com
                           type=vSphere CNS Block Volume
Events:                <none>
```

When the `CSIMigration{provider}` feature flag is enabled for a specific in-tree volume plugin,
the `kubernetes.io/pv-controller` finalizer is replaced by the
`external-provisioner.volume.kubernetes.io/finalizer` finalizer.

The finalizers ensure that the PV object is removed only after the volume is deleted
from the storage backend provided the reclaim policy of the PV is `Delete`. This
also ensures that the volume is deleted from storage backend irrespective of the
order of deletion of PV and PVC.

### Reserving a PersistentVolume

The control plane can bind PersistentVolumeClaims to matching PersistentVolumes
in the cluster. However, if you want a PVC to bind to a specific PV, you need to pre-bind them.

By specifying a PersistentVolume in a PersistentVolumeClaim, you declare a binding
between that specific PV and PVC. If the PersistentVolume exists and has not reserved
PersistentVolumeClaims through its `claimRef` field, then the PersistentVolume and
PersistentVolumeClaim will be bound.

The binding happens regardless of some volume matching criteria, including node affinity.
The control plane still checks that storage class,
access modes, and requested storage size are valid.

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: foo-pvc
  namespace: foo
spec:
  storageClassName: "" # Empty string must be explicitly set otherwise default StorageClass will be set
  volumeName: foo-pv
  ...
```

This method does not guarantee any binding privileges to the PersistentVolume.
If other PersistentVolumeClaims could use the PV that you specify, you first
need to reserve that storage volume. Specify the relevant PersistentVolumeClaim
in the `claimRef` field of the PV so that other PVCs can not bind to it.

```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: foo-pv
spec:
  storageClassName: ""
  claimRef:
    name: foo-pvc
    namespace: foo
  ...
```

This is useful if you want to consume PersistentVolumes that have their `persistentVolumeReclaimPolicy` set
to `Retain`, including cases where you are reusing an existing PV.
