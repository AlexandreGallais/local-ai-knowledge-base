---
title: "Persistent Volumes (part 5 of 6)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/concepts/storage/persistent-volumes.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Persistent Volumes (part 5 of 6)

## PersistentVolumeClaims

Each PVC contains a spec and status, which is the specification and status of the claim.
The name of a PersistentVolumeClaim object must be a valid
DNS subdomain name.

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: myclaim
spec:
  accessModes:
    - ReadWriteOnce
  volumeMode: Filesystem
  resources:
    requests:
      storage: 8Gi
  storageClassName: slow
  selector:
    matchLabels:
      release: "stable"
    matchExpressions:
      - {key: <example-value>, operator: In, values: [dev]}
```

### Access Modes

Claims use the same conventions as volumes when requesting
storage with specific access modes.

### Volume Modes

Claims use the same convention as volumes to indicate the
consumption of the volume as either a filesystem or block device.

### Volume Name

Claims can use the `volumeName` field to explicitly bind to a specific PersistentVolume. You can also leave
`volumeName` unset, indicating that you'd like Kubernetes to set up a new PersistentVolume
that matches the claim.
If the specified PV is already bound to another PVC, the binding will be stuck
in a pending state.

### Resources

Claims, like Pods, can request specific quantities of a resource. In this case,
the request is for storage. The same
resource model
applies to both volumes and claims.

**Note:**
For `Filesystem` volumes, the storage request refers to the "outer" volume size
(i.e. the allocated size from the storage backend).
This means that the writeable size may be slightly lower for providers that
build a filesystem on top of a block device, due to filesystem overhead.
This is especially visible with XFS, where many metadata features are enabled by default.

### Selector

Claims can specify a
label selector
to further filter the set of volumes.
Only the volumes whose labels match the selector can be bound to the claim.
The selector can consist of two fields:

* `matchLabels` - the volume must have a label with this value
* `matchExpressions` - a list of requirements made by specifying key, list of values,
  and operator that relates the key and values.
  Valid operators include `In`, `NotIn`, `Exists`, and `DoesNotExist`.

All of the requirements, from both `matchLabels` and `matchExpressions`, are
ANDed together – they must all be satisfied in order to match.

### Class

A claim can request a particular class by specifying the name of a
StorageClass
using the attribute `storageClassName`.
Only PVs of the requested class, ones with the same `storageClassName` as the PVC,
can be bound to the PVC.

PVCs don't necessarily have to request a class. A PVC with its `storageClassName` set
equal to `""` is always interpreted to be requesting a PV with no class, so it
can only be bound to PVs with no class (no annotation or one set equal to `""`).
A PVC with no `storageClassName` is not quite the same and is treated differently
by the cluster, depending on whether the
`DefaultStorageClass` admission plugin
is turned on.

* If the admission plugin is turned on, the administrator may specify a default StorageClass.
  All PVCs that have no `storageClassName` can be bound only to PVs of that default.
  Specifying a default StorageClass is done by setting the annotation
  `storageclass.kubernetes.io/is-default-class` equal to `true` in a StorageClass object.
  If the administrator does not specify a default, the cluster responds to PVC creation
  as if the admission plugin were turned off.
  If more than one default StorageClass is specified, the newest default is used when
  the PVC is dynamically provisioned.
* If the admission plugin is turned off, there is no notion of a default StorageClass.
  All PVCs that have `storageClassName` set to `""` can be bound only to PVs
  that have `storageClassName` also set to `""`.
  However, PVCs with missing `storageClassName` can be updated later once default StorageClass becomes available.
  If the PVC gets updated it will no longer bind to PVs that have `storageClassName` also set to `""`.

See retroactive default StorageClass assignment for more details.

Depending on installation method, a default StorageClass may be deployed
to a Kubernetes cluster by addon manager during installation.

When a PVC specifies a `selector` in addition to requesting a StorageClass,
the requirements are ANDed together: only a PV of the requested class and with
the requested labels may be bound to the PVC.

**Note:**
Currently, a PVC with a non-empty `selector` can't have a PV dynamically provisioned for it.

In the past, the annotation `volume.beta.kubernetes.io/storage-class` was used instead
of `storageClassName` attribute. This annotation is still working; however,
it won't be supported in a future Kubernetes release.

#### Retroactive default StorageClass assignment

**Feature state:** v1.28 [stable]

You can create a PersistentVolumeClaim without specifying a `storageClassName`
for the new PVC, and you can do so even when no default StorageClass exists
in your cluster. In this case, the new PVC creates as you defined it, and the
`storageClassName` of that PVC remains unset until default becomes available.

When a default StorageClass becomes available, the control plane identifies any
existing PVCs without `storageClassName`. For the PVCs that either have an empty
value for `storageClassName` or do not have this key, the control plane then
updates those PVCs to set `storageClassName` to match the new default StorageClass.
If you have an existing PVC where the `storageClassName` is `""`, and you configure
a default StorageClass, then this PVC will not get updated.

In order to keep binding to PVs with `storageClassName` set to `""`
(while a default StorageClass is present), you need to set the `storageClassName`
of the associated PVC to `""`.

This behavior helps administrators change default StorageClass by removing the
old one first and then creating or setting another one. This brief window while
there is no default causes PVCs without `storageClassName` created at that time
to not have any default, but due to the retroactive default StorageClass
assignment this way of changing defaults is safe.

### Unused PVC tracking

**Feature state:**

When enabled, the PVC protection controller adds an `Unused`
condition to each
PersistentVolumeClaim to indicate whether it is currently referenced by any
non-terminal Pod.

The condition has two states:

`Unused` with status `"True"` (reason `NoPodsUsingPVC`)
: No non-terminal Pod references this PVC. The `lastTransitionTime` records when
  the PVC became unused.

`Unused` with status `"False"` (reason `PodUsingPVC`)
: At least one non-terminal Pod currently references this PVC. The
  `lastTransitionTime` records when the PVC started being used.

A Pod is considered non-terminal if its phase is not `Succeeded` or `Failed`.
This means that a Pending Pod (even one that has not yet been scheduled) counts
as using the PVC.

The `lastTransitionTime` of the `Unused` condition can be used by cluster
administrators, monitoring tools, and external controllers to identify PVCs that
have been unused for a long time. For example, to find all PVCs that have been
unused for more than 30 days, you could query for PVCs where the `Unused`
condition has `status: "True"` and `lastTransitionTime` is older than 30 days.

**Note:**
The unused duration indicated by this condition may be shorter than the actual
unused time because of processing delays in the controller or because the
feature was enabled after the PVC was already unused. The condition is not
updated when a PVC has `deletionTimestamp` set (that is, PVCs that are being deleted).

## Claims As Volumes

Pods access storage by using the claim as a volume. Claims must exist in the
same namespace as the Pod using the claim. The cluster finds the claim in the
Pod's namespace and uses it to get the PersistentVolume backing the claim.
The volume is then mounted to the host and into the Pod.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: mypod
spec:
  containers:
    - name: myfrontend
      image: nginx
      volumeMounts:
      - mountPath: "/var/www/html"
        name: mypd
  volumes:
    - name: mypd
      persistentVolumeClaim:
        claimName: myclaim
```

### A Note on Namespaces

PersistentVolumes binds are exclusive, and since PersistentVolumeClaims are
namespaced objects, mounting claims with "Many" modes (`ROX`, `RWX`) is only
possible within one namespace.

### PersistentVolumes typed `hostPath`

A `hostPath` PersistentVolume uses a file or directory on the Node to emulate
network-attached storage. See
an example of `hostPath` typed volume.

## Raw Block Volume Support

**Feature state:** v1.18 [stable]

The following volume plugins support raw block volumes, including dynamic provisioning where
applicable:

* CSI (including some CSI migrated volume types)
* FC (Fibre Channel)
* iSCSI
* Local volume

### PersistentVolume using a Raw Block Volume {#persistent-volume-using-a-raw-block-volume}

```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: block-pv
spec:
  capacity:
    storage: 10Gi
  accessModes:
    - ReadWriteOnce
  volumeMode: Block
  persistentVolumeReclaimPolicy: Retain
  fc:
    targetWWNs: ["50060e801049cfd1"]
    lun: 0
    readOnly: false
```

### PersistentVolumeClaim requesting a Raw Block Volume {#persistent-volume-claim-requesting-a-raw-block-volume}

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: block-pvc
spec:
  accessModes:
    - ReadWriteOnce
  volumeMode: Block
  resources:
    requests:
      storage: 10Gi
```

### Pod specification adding Raw Block Device path in container

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: pod-with-block-volume
spec:
  containers:
    - name: fc-container
      image: fedora:26
      command: ["/bin/sh", "-c"]
      args: [ "tail -f /dev/null" ]
      volumeDevices:
        - name: data
          devicePath: /dev/xvda
  volumes:
    - name: data
      persistentVolumeClaim:
        claimName: block-pvc
```

**Note:**
When adding a raw block device for a Pod, you specify the device path in the
container instead of a mount path.

### Binding Block Volumes

If a user requests a raw block volume by indicating this using the `volumeMode`
field in the PersistentVolumeClaim spec, the binding rules differ slightly from
previous releases that didn't consider this mode as part of the spec.
Listed is a table of possible combinations the user and admin might specify for
requesting a raw block device. The table indicates if the volume will be bound or
not given the combinations: Volume binding matrix for statically provisioned volumes:

| PV volumeMode | PVC volumeMode  | Result           |
| --------------|:---------------:| ----------------:|
|   unspecified | unspecified     | BIND             |
|   unspecified | Block           | NO BIND          |
|   unspecified | Filesystem      | BIND             |
|   Block       | unspecified     | NO BIND          |
|   Block       | Block           | BIND             |
|   Block       | Filesystem      | NO BIND          |
|   Filesystem  | Filesystem      | BIND             |
|   Filesystem  | Block           | NO BIND          |
|   Filesystem  | unspecified     | BIND             |

**Note:**
Only statically provisioned volumes are supported for alpha release. Administrators
should take care to consider these values when working with raw block devices.

## Volume Snapshot and Restore Volume from Snapshot Support

**Feature state:** v1.20 [stable]

Volume snapshots only support the out-of-tree CSI volume plugins.
For details, see Volume Snapshots.
In-tree volume plugins are deprecated. You can read about the deprecated volume
plugins in the
Volume Plugin FAQ.

### Create a PersistentVolumeClaim from a Volume Snapshot {#create-persistent-volume-claim-from-volume-snapshot}

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: restore-pvc
spec:
  storageClassName: csi-hostpath-sc
  dataSource:
    name: new-snapshot-test
    kind: VolumeSnapshot
    apiGroup: snapshot.storage.k8s.io
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 10Gi
```

## Volume Cloning

Volume Cloning
only available for CSI volume plugins.

### Create PersistentVolumeClaim from an existing PVC {#create-persistent-volume-claim-from-an-existing-pvc}

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: cloned-pvc
spec:
  storageClassName: my-csi-plugin
  dataSource:
    name: existing-src-pvc-name
    kind: PersistentVolumeClaim
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 10Gi
```

## Volume populators and data sources

Volume cloning and
snapshot restore pre-populate
a new volume from a built-in _data source_. _Volume populators_ extend this mechanism so that
a PersistentVolumeClaim can be pre-populated from other kinds of source (a custom resource),
referenced through its `dataSourceRef` field:

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: populated-pvc
spec:
  dataSourceRef:
    name: example-name
    kind: ExampleDataSource
    apiGroup: example.storage.k8s.io
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 10Gi
```

For details, including cross-namespace data sources, see
Volume Populators and Data Sources.

## Writing Portable Configuration

If you're writing configuration templates or examples that run on a wide range of clusters
and need persistent storage, it is recommended that you use the following pattern:

- Include PersistentVolumeClaim objects in your bundle of config (alongside
  Deployments, ConfigMaps, etc).
- Do not include PersistentVolume objects in the config, since the user instantiating
  the config may not have permission to create PersistentVolumes.
- Give the user the option of providing a storage class name when instantiating
  the template.
  - If the user provides a storage class name, put that value into the
    `persistentVolumeClaim.storageClassName` field.
    This will cause the PVC to match the right storage
    class if the cluster has StorageClasses enabled by the admin.
  - If the user does not provide a storage class name, leave the
    `persistentVolumeClaim.storageClassName` field as nil. This will cause a
    PV to be automatically provisioned for the user with the default StorageClass
    in the cluster. Many cluster environments have a default StorageClass installed,
    or administrators can create their own default StorageClass.
- In your tooling, watch for PVCs that are not getting bound after some time
  and surface this to the user, as this may indicate that the cluster has no
  dynamic storage support (in which case the user should create a matching PV)
  or the cluster has no storage system (in which case the user cannot deploy
  config requiring PVCs).
