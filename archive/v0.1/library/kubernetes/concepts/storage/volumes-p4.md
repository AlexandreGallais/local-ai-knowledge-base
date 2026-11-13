---
title: "Volumes (part 4 of 5)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/concepts/storage/volumes.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Volumes (part 4 of 5)

## Out-of-tree volume plugins

The out-of-tree volume plugins include
Container Storage Interface (CSI), and also
FlexVolume (which is deprecated). These plugins enable storage vendors to create custom storage plugins
without adding their plugin source code to the Kubernetes repository.

Previously, all volume plugins were "in-tree". The "in-tree" plugins were built, linked, compiled,
and shipped with the core Kubernetes binaries. This meant that adding a new storage system to
Kubernetes (a volume plugin) required checking code into the core Kubernetes code repository.

Both CSI and FlexVolume allow volume plugins to be developed independently of
the Kubernetes code base, and deployed (installed) on Kubernetes clusters as
extensions.

For storage vendors looking to create an out-of-tree volume plugin, please refer
to the volume plugin FAQ.

### csi

Container Storage Interface
(CSI) defines a standard interface for container orchestration systems (like
Kubernetes) to expose arbitrary storage systems to their container workloads.

Please read the CSI design proposal
for more information.

**Note:**
Support for CSI spec versions 0.2 and 0.3 is deprecated in Kubernetes
v1.13 and will be removed in a future release.

**Note:**
CSI drivers may not be compatible across all Kubernetes releases.
Please check the specific CSI driver's documentation for supported
deployment steps for each Kubernetes release and a compatibility matrix.

Once a CSI-compatible volume driver is deployed on a Kubernetes cluster, users
may use the `csi` volume type to attach or mount the volumes exposed by the
CSI driver.

A `csi` volume can be used in a Pod in three different ways:

* through a reference to a PersistentVolumeClaim
* with a generic ephemeral volume
* with a CSI ephemeral volume
  if the driver supports that

The following fields are available to storage administrators to configure a CSI
persistent volume:

* `driver`: A string value that specifies the name of the volume driver to use.
  This value must correspond to the value returned in the `GetPluginInfoResponse`
  by the CSI driver as defined in the
  CSI spec.
  It is used by Kubernetes to identify which CSI driver to call out to, and by
  CSI driver components to identify which PV objects belong to the CSI driver.
* `volumeHandle`: A string value that uniquely identifies the volume. This value
  must correspond to the value returned in the `volume.id` field of the
  `CreateVolumeResponse` by the CSI driver as defined in the
  CSI spec.
  The value is passed as `volume_id` in all calls to the CSI volume driver when
  referencing the volume.
* `readOnly`: An optional boolean value indicating whether the volume is to be
  "ControllerPublished" (attached) as read-only. Default is false. This value is passed
  to the CSI driver via the `readonly` field in the `ControllerPublishVolumeRequest`.
* `fsType`: If the PV's `VolumeMode` is `Filesystem`, then this field may be used
  to specify the filesystem that should be used to mount the volume. If the
  volume has not been formatted and formatting is supported, this value will be
  used to format the volume.
  This value is passed to the CSI driver via the `VolumeCapability` field of
  `ControllerPublishVolumeRequest`, `NodeStageVolumeRequest`, and
  `NodePublishVolumeRequest`.
* `volumeAttributes`: A map of string to string that specifies static properties
  of a volume. This map must correspond to the map returned in the
  `volume.attributes` field of the `CreateVolumeResponse` by the CSI driver as
  defined in the CSI spec.
  The map is passed to the CSI driver via the `volume_context` field in the
  `ControllerPublishVolumeRequest`, `NodeStageVolumeRequest`, and
  `NodePublishVolumeRequest`.
* `controllerPublishSecretRef`: A reference to the secret <example-value> containing
  sensitive information to pass to the CSI driver to complete the CSI
  `ControllerPublishVolume` and `ControllerUnpublishVolume` calls. This field is
  optional, and may be empty if no secret is required. If the Secret
  contains more than one secret, all secrets are passed.
* `nodeExpandSecretRef`: A reference to the secret <example-value> sensitive
  information to pass to the CSI driver to complete the CSI
  `NodeExpandVolume` call. This field is optional and may be empty if no
  secret is required. If the object contains more than one secret, all
  secrets are passed. When you have configured secret data for node-initiated
  volume expansion, the kubelet passes that data via the `NodeExpandVolume()`
  call to the CSI driver. All supported versions of Kubernetes offer the
  `nodeExpandSecretRef` field, and have it available by default. Kubernetes releases
  prior to v1.25 did not include this support.
* Enable the feature gate
  named `CSINodeExpandSecret` for each kube-apiserver and for the kubelet on every
  node. Since Kubernetes version 1.27, this feature has been enabled by default
  and no explicit enablement of the feature gate is required.
  You must also be using a CSI driver that supports or requires secret data during
  node-initiated storage resize operations.
* `nodePublishSecretRef`: A reference to the secret <example-value> containing
  sensitive information to pass to the CSI driver to complete the CSI
  `NodePublishVolume` call. This field is optional and may be empty if no
  secret is required. If the secret <example-value> contains more than one secret, all
  secrets are passed.
* `nodeStageSecretRef`: A reference to the secret <example-value> containing
  sensitive information to pass to the CSI driver to complete the CSI
  `NodeStageVolume` call. This field is optional and may be empty if no secret
  is required. If the Secret <example-value> more than one secret, all secrets
  are passed.

#### CSI raw block volume support

**Feature state:** v1.18 [stable]

Vendors with external CSI drivers can implement raw block volume support
in Kubernetes workloads.

You can set up your
PersistentVolume/PersistentVolumeClaim with raw block volume support
as usual, without any CSI-specific changes.

#### CSI ephemeral volumes

**Feature state:** v1.25 [stable]

You can directly configure CSI volumes within the Pod
specification. Volumes specified in this way are ephemeral and do not
persist across Pod restarts. See
Ephemeral Volumes
for more information.

For more information on how to develop a CSI driver, refer to the
kubernetes-csi documentation

#### Windows CSI proxy

**Feature state:** v1.22 [stable]

CSI node plugins need to perform various privileged
operations like scanning of disk devices and mounting of file systems. These operations
differ for each host operating system. For Linux worker nodes, containerized CSI node
plugins are typically deployed as privileged containers. For Windows worker nodes,
privileged operations for containerized CSI node plugins are supported using
csi-proxy, a community-managed,
stand-alone binary that needs to be pre-installed on each Windows node.

For more details, refer to the deployment guide of the CSI plugin you wish to deploy.

#### Migrating to CSI drivers from in-tree plugins

**Feature state:** v1.25 [stable]

The `CSIMigration` feature directs operations against existing in-tree
plugins to corresponding CSI plugins (which are expected to be installed and configured).
As a result, operators do not have to make any
configuration changes to existing Storage Classes, PersistentVolumes, or PersistentVolumeClaims
(referring to in-tree plugins) when transitioning to a CSI driver that supersedes an in-tree plugin.

**Note:**
Existing PVs created by an in-tree volume plugin can still be used in the future without any configuration
changes, even after the migration to CSI is completed for that volume type, and even after you upgrade to a
version of Kubernetes that doesn't have compiled-in support for that kind of storage.

As part of that migration, you - or another cluster administrator - **must** have installed and configured
the appropriate CSI driver for that storage. The core of Kubernetes does not install that software for you.

---

After that migration, you can also define new PVCs and PVs that refer to the legacy, built-in
storage integrations.
Provided you have the appropriate CSI driver installed and configured, the PV creation continues
to work, even for brand-new volumes. The actual storage management now happens through
the CSI driver.

The operations and features that are supported include:
provisioning/delete, attach/detach, mount/unmount, and resizing of volumes.

In-tree plugins that support `CSIMigration` and have a corresponding CSI driver implemented
are listed in Types of Volumes.

### flexVolume (deprecated)   {#flexvolume}

**Feature state:** v1.23 [deprecated]

FlexVolume is an out-of-tree plugin interface that uses an exec-based model to interface
with storage drivers. The FlexVolume driver binaries must be installed in a pre-defined
volume plugin path on each node, and in some cases, the control plane nodes as well.

Pods interact with FlexVolume drivers through the `flexVolume` in-tree volume plugin.

The following FlexVolume plugins,
deployed as PowerShell scripts on the host, support Windows nodes:

* SMB
* iSCSI

**Note:**
FlexVolume is deprecated. Using an out-of-tree CSI driver is the recommended way to integrate external storage with Kubernetes.

Maintainers of the FlexVolume driver should implement a CSI Driver and help migrate users of FlexVolume drivers to CSI.
Users of FlexVolume should move their workloads to use the equivalent CSI Driver.

## Mount propagation

**Caution:**
Mount propagation is a low-level feature that does not work consistently on all
volume types. The Kubernetes project recommends only using mount propagation with `hostPath`
or memory-backed `emptyDir` volumes. See
Kubernetes issue #95049
for more context.

Mount propagation allows for sharing volumes mounted by a container to
other containers in the same Pod, or even to other Pods on the same node.

Mount propagation of a volume is controlled by the `mountPropagation` field
in `containers[*].volumeMounts`. Its values are:

* `None` - This volume mount will not receive any subsequent mounts
  that are mounted to this volume or any of its subdirectories by the host.
  In a similar fashion, no mounts created by the container will be visible on
  the host. This is the default mode.

  This mode is equal to `rprivate` mount propagation as described in
  `mount(8)`

  However, the CRI runtime may choose `rslave` mount propagation (i.e.,
  `HostToContainer`) when `rprivate` propagation is not applicable.
  cri-dockerd (Docker) is known to choose `rslave` mount propagation when the
  mount source contains the Docker daemon's root directory (`/var/lib/docker`).

* `HostToContainer` - This volume mount will receive all subsequent mounts
  that are mounted to this volume or any of its subdirectories.

  In other words, if the host mounts anything inside the volume mount, the
  container will see it mounted there.

  Similarly, if any Pod with `Bidirectional` mount propagation to the same
  volume mounts anything there, the container with `HostToContainer` mount
  propagation will see it.

  This mode is equal to `rslave` mount propagation as described in the
  `mount(8)`

* `Bidirectional` - This volume mount behaves the same as the `HostToContainer` mount.
  In addition, all volume mounts created by the container will be propagated
  back to the host and to all containers of all Pods that use the same volume.

  A typical use case for this mode is a Pod with a FlexVolume or CSI driver, or
  a Pod that needs to mount something on the host using a `hostPath` volume.

  This mode is equal to `rshared` mount propagation as described in the
  `mount(8)`

  **Warning:**
  `Bidirectional` mount propagation can be dangerous. It can damage
  the host operating system, and therefore, it is allowed only in privileged
  containers. Familiarity with Linux kernel behavior is strongly recommended.
  In addition, any volume mounts created by containers in Pods must be destroyed
  (unmounted) by the containers on termination.

## Read-only mounts

A mount can be made read-only by setting the `.spec.containers[*].volumeMounts[*].readOnly`
field to `true`.
This does not make the volume itself read-only, but that specific container will
not be able to write to it.
Other containers in the Pod may mount the same volume as read-write.

On Linux, read-only mounts are not recursively read-only by default.
For example, consider a Pod that mounts the hosts `/mnt` as a `hostPath` volume. If
there is another filesystem mounted read-write on `/mnt/<SUBMOUNT>` (such as tmpfs,
NFS, or USB storage), the volume mounted into the container(s) will also have a writeable
`/mnt/<SUBMOUNT>`, even if the mount itself was specified as read-only.

### Recursive read-only mounts

**Feature state:**

Recursive read-only mounts can be enabled by setting the
`RecursiveReadOnlyMounts` feature gate
for kubelet and kube-apiserver, and setting the `.spec.containers[*].volumeMounts[*].recursiveReadOnly`
field for a Pod.

The allowed values are:

* `Disabled` (default): no effect.

* `Enabled`: makes the mount recursively read-only.
  Needs all the following requirements to be satisfied:

  * `readOnly` is set to `true`
  * `mountPropagation` is unset, or set to `None`
  * The host is running with Linux kernel v5.12 or later
  * The CRI-level container runtime supports recursive read-only mounts
  * The OCI-level container runtime supports recursive read-only mounts.

  It will fail if any of these is not true.

* `IfPossible`: attempts to apply `Enabled`, and falls back to `Disabled`
  if the feature is not supported by the kernel or the runtime class.

Example:
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: rro
spec:
  volumes:
    - name: mnt
      hostPath:
        # tmpfs is mounted on /mnt/tmpfs
        path: /mnt
  containers:
    - name: busybox
      image: busybox
      args: ["sleep", "infinity"]
      volumeMounts:
        # /mnt-rro/tmpfs is not writable
        - name: mnt
          mountPath: /mnt-rro
          readOnly: true
          mountPropagation: None
          recursiveReadOnly: Enabled
        # /mnt-ro/tmpfs is writable
        - name: mnt
          mountPath: /mnt-ro
          readOnly: true
        # /mnt-rw/tmpfs is writable
        - name: mnt
          mountPath: /mnt-rw
```

When this property is recognized by kubelet and kube-apiserver,
the `.status.containerStatuses[*].volumeMounts[*].recursiveReadOnly` field is set to either
`Enabled` or `Disabled`.
