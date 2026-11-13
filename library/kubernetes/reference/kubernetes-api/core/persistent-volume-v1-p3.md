---
title: "PersistentVolume (part 3 of 8)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/core/persistent-volume-v1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# PersistentVolume (part 3 of 8)

## HostPathVolumeSource {#HostPathVolumeSource}

Represents a host path mapped into a pod. Host path volumes do not support ownership management or SELinux relabeling.

   | Field | Description

       | `path` *string
       | path of the directory on the host. If the path is a symlink, it will follow the link to the real path. More info: https://kubernetes.io/docs/concepts/storage/volumes#hostpath

       | `type`string
       | type for HostPath Volume Defaults to "" More info: https://kubernetes.io/docs/concepts/storage/volumes#hostpathPossible enum values: - `""` For backwards compatible, leave it empty if unset - `"BlockDevice"` A block device must exist at the given path - `"CharDevice"` A character device must exist at the given path - `"Directory"` A directory must exist at the given path - `"DirectoryOrCreate"` If nothing exists at the given path, an empty directory will be created there as needed with file mode 0755, having the same group and ownership with Kubelet. - `"File"` A file must exist at the given path - `"FileOrCreate"` If nothing exists at the given path, an empty file will be created there as needed with file mode 0644, having the same group and ownership with Kubelet. - `"Socket"` A UNIX socket must exist at the given path

## ISCSIPersistentVolumeSource {#ISCSIPersistentVolumeSource}

ISCSIPersistentVolumeSource represents an ISCSI disk. ISCSI volumes can only be mounted as read/write once. ISCSI volumes support ownership management and SELinux relabeling.

   | Field | Description

       | `chapAuthDiscovery`boolean
       | chapAuthDiscovery defines whether support iSCSI Discovery CHAP authentication

       | `chapAuthSession`boolean
       | chapAuthSession defines whether support iSCSI Session CHAP authentication

       | `fsType`string
       | fsType is the filesystem type of the volume that you want to mount. Tip: Ensure that the filesystem type is supported by the host operating system. Examples: "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified. More info: https://kubernetes.io/docs/concepts/storage/volumes#iscsi

       | `initiatorName`string
       | initiatorName is the custom iSCSI Initiator Name. If initiatorName is specified with iscsiInterface simultaneously, new iSCSI interface \<target portal>:\<volume name> will be created for the connection.

       | `iqn` *string
       | iqn is Target iSCSI Qualified Name.

       | `iscsiInterface`string
       | iscsiInterface is the interface Name that uses an iSCSI transport. Defaults to 'default' (tcp).

       | `lun` *integer
       | lun is iSCSI Target Lun number.

       | `portals`string array
       | portals is the iSCSI Target Portal List. The Portal is either an IP or ip_addr:port if the port is other than default (typically TCP ports 860 and 3260).

       | `readOnly`boolean
       | readOnly here will force the ReadOnly setting in VolumeMounts. Defaults to false.

       | `secretRef`SecretReference
       | secretRef is the CHAP Secret for iSCSI target and initiator authentication

       | `targetPortal` *string
       | targetPortal is iSCSI Target Portal. The Portal is either an IP or ip_addr:port if the port is other than default (typically TCP ports 860 and 3260).

## LocalVolumeSource {#LocalVolumeSource}

Local represents directly-attached storage with node affinity

   | Field | Description

       | `fsType`string
       | fsType is the filesystem type to mount. It applies only when the Path is a block device. Must be a filesystem type supported by the host operating system. Ex. "ext4", "xfs", "ntfs". The default value is to auto-select a filesystem if unspecified.

       | `path` *string
       | path of the full path to the volume on the node. It can be either a directory or block device (disk, partition, ...).

## NFSVolumeSource {#NFSVolumeSource}

Represents an NFS mount that lasts the lifetime of a pod. NFS volumes do not support ownership management or SELinux relabeling.

   | Field | Description

       | `path` *string
       | path that is exported by the NFS server. More info: https://kubernetes.io/docs/concepts/storage/volumes#nfs

       | `readOnly`boolean
       | readOnly here will force the NFS export to be mounted with read-only permissions. Defaults to false. More info: https://kubernetes.io/docs/concepts/storage/volumes#nfs

       | `server` *string
       | server is the hostname or IP address of the NFS server. More info: https://kubernetes.io/docs/concepts/storage/volumes#nfs

## PhotonPersistentDiskVolumeSource {#PhotonPersistentDiskVolumeSource}

Represents a Photon Controller persistent disk resource.

   | Field | Description

       | `fsType`string
       | fsType is the filesystem type to mount. Must be a filesystem type supported by the host operating system. Ex. "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified.

       | `pdID` *string
       | pdID is the ID that identifies Photon Controller persistent disk

## PortworxVolumeSource {#PortworxVolumeSource}

PortworxVolumeSource represents a Portworx volume resource.

   | Field | Description

       | `fsType`string
       | fSType represents the filesystem type to mount Must be a filesystem type supported by the host operating system. Ex. "ext4", "xfs". Implicitly inferred to be "ext4" if unspecified.

       | `readOnly`boolean
       | readOnly defaults to false (read/write). ReadOnly here will force the ReadOnly setting in VolumeMounts.

       | `volumeID` *string
       | volumeID uniquely identifies a Portworx volume

## QuobyteVolumeSource {#QuobyteVolumeSource}

Represents a Quobyte mount that lasts the lifetime of a pod. Quobyte volumes do not support ownership management or SELinux relabeling.

   | Field | Description

       | `group`string
       | group to map volume access to Default is no group

       | `readOnly`boolean
       | readOnly here will force the Quobyte volume to be mounted with read-only permissions. Defaults to false.

       | `registry` *string
       | registry represents a single or multiple Quobyte Registry services specified as a string as host:port pair (multiple entries are separated with commas) which acts as the central registry for volumes

       | `tenant`string
       | tenant owning the given Quobyte volume in the Backend Used with dynamically provisioned Quobyte volumes, value is set by the plugin

       | `user`string
       | user to map volume access to Defaults to serivceaccount user

       | `volume` *string
       | volume is a string that references an already created Quobyte volume by name.

## RBDPersistentVolumeSource {#RBDPersistentVolumeSource}

Represents a Rados Block Device mount that lasts the lifetime of a pod. RBD volumes support ownership management and SELinux relabeling.

   | Field | Description

       | `fsType`string
       | fsType is the filesystem type of the volume that you want to mount. Tip: Ensure that the filesystem type is supported by the host operating system. Examples: "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified. More info: https://kubernetes.io/docs/concepts/storage/volumes#rbd

       | `image` *string
       | image is the rados image name. More info: https://examples.k8s.io/volumes/rbd/README.md#how-to-use-it

       | `keyring`string
       | keyring is the path to key ring for RBDUser. Default is /etc/ceph/keyring. More info: https://examples.k8s.io/volumes/rbd/README.md#how-to-use-it

       | `monitors` *string array
       | monitors is a collection of Ceph monitors. More info: https://examples.k8s.io/volumes/rbd/README.md#how-to-use-it

       | `pool`string
       | pool is the rados pool name. Default is rbd. More info: https://examples.k8s.io/volumes/rbd/README.md#how-to-use-it

       | `readOnly`boolean
       | readOnly here will force the ReadOnly setting in VolumeMounts. Defaults to false. More info: https://examples.k8s.io/volumes/rbd/README.md#how-to-use-it

       | `secretRef`SecretReference
       | secretRef is name of the authentication secret for RBDUser. If provided overrides keyring. Default is nil. More info: https://examples.k8s.io/volumes/rbd/README.md#how-to-use-it

       | `user`string
       | user is the rados user name. Default is admin. More info: https://examples.k8s.io/volumes/rbd/README.md#how-to-use-it

## ScaleIOPersistentVolumeSource {#ScaleIOPersistentVolumeSource}

ScaleIOPersistentVolumeSource represents a persistent ScaleIO volume

   | Field | Description

       | `fsType`string
       | fsType is the filesystem type to mount. Must be a filesystem type supported by the host operating system. Ex. "ext4", "xfs", "ntfs". Default is "xfs"

       | `gateway` *string
       | gateway is the host address of the ScaleIO API Gateway.

       | `protectionDomain`string
       | protectionDomain is the name of the ScaleIO Protection Domain for the configured storage.

       | `readOnly`boolean
       | readOnly defaults to false (read/write). ReadOnly here will force the ReadOnly setting in VolumeMounts.

       | `secretRef` *SecretReference
       | secretRef references to the secret for ScaleIO user and other sensitive information. If this is not provided, Login operation will fail.

       | `sslEnabled`boolean
       | sslEnabled is the flag to enable/disable SSL communication with Gateway, default false

       | `storageMode`string
       | storageMode indicates whether the storage for a volume should be ThickProvisioned or ThinProvisioned. Default is ThinProvisioned.

       | `storagePool`string
       | storagePool is the ScaleIO Storage Pool associated with the protection domain.

       | `system` *string
       | system is the name of the storage system as configured in ScaleIO.

       | `volumeName`string
       | volumeName is the name of a volume already created in the ScaleIO system that is associated with this volume source.

## SecretReference {#SecretReference}

SecretReference represents a Secret Reference. It has enough information to retrieve secret in any namespace

   | Field | Description

       | `name`string
       | name is unique within a namespace to reference a secret resource.

       | `namespace`string
       | namespace defines the space within which the secret name must be unique.

## StorageOSPersistentVolumeSource {#StorageOSPersistentVolumeSource}

Represents a StorageOS persistent volume resource.

   | Field | Description

       | `fsType`string
       | fsType is the filesystem type to mount. Must be a filesystem type supported by the host operating system. Ex. "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified.

       | `readOnly`boolean
       | readOnly defaults to false (read/write). ReadOnly here will force the ReadOnly setting in VolumeMounts.

       | `secretRef`ObjectReference
       | secretRef specifies the secret to use for obtaining the StorageOS API credentials.  If not specified, default values will be attempted.

       | `volumeName`string
       | volumeName is the human-readable name of the StorageOS volume.  Volume names are only unique within a namespace.

       | `volumeNamespace`string
       | volumeNamespace specifies the scope of the volume within StorageOS.  If no namespace is specified then the Pod's namespace will be used.  This allows the Kubernetes name scoping to be mirrored within StorageOS for tighter integration. Set VolumeName to any name to override the default behaviour. Set to "default" if you are not using namespaces within StorageOS. Namespaces that do not pre-exist within StorageOS will be created.

## VolumeNodeAffinity {#VolumeNodeAffinity}

VolumeNodeAffinity defines constraints that limit what nodes this volume can be accessed from.

   | Field | Description

       | `required`NodeSelector
       | required specifies hard node constraints that must be met.

## VsphereVirtualDiskVolumeSource {#VsphereVirtualDiskVolumeSource}

Represents a vSphere volume resource.

   | Field | Description

       | `fsType`string
       | fsType is filesystem type to mount. Must be a filesystem type supported by the host operating system. Ex. "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified.

       | `storagePolicyID`string
       | storagePolicyID is the storage Policy Based Management (SPBM) profile ID associated with the StoragePolicyName.

       | `storagePolicyName`string
       | storagePolicyName is the storage Policy Based Management (SPBM) profile name.

       | `volumePath` *string
       | volumePath is the path that identifies vSphere volume vmdk
