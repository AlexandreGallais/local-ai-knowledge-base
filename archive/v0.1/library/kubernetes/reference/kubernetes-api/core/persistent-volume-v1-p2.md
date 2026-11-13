---
title: "PersistentVolume (part 2 of 8)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/core/persistent-volume-v1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# PersistentVolume (part 2 of 8)

## AWSElasticBlockStoreVolumeSource {#AWSElasticBlockStoreVolumeSource}

Represents a Persistent Disk resource in AWS.

An AWS EBS disk must exist before mounting to a container. The disk must also be in the same AWS zone as the kubelet. An AWS EBS disk can only be mounted as read/write once. AWS EBS volumes support ownership management and SELinux relabeling.

   | Field | Description

       | `fsType`string
       | fsType is the filesystem type of the volume that you want to mount. Tip: Ensure that the filesystem type is supported by the host operating system. Examples: "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified. More info: https://kubernetes.io/docs/concepts/storage/volumes#awselasticblockstore

       | `partition`integer
       | partition is the partition in the volume that you want to mount. If omitted, the default is to mount by volume name. Examples: For volume /dev/sda1, you specify the partition as "1". Similarly, the volume partition for /dev/sda is "0" (or you can leave the property empty).

       | `readOnly`boolean
       | readOnly value true will force the readOnly setting in VolumeMounts. More info: https://kubernetes.io/docs/concepts/storage/volumes#awselasticblockstore

       | `volumeID` *string
       | volumeID is unique ID of the persistent disk resource in AWS (Amazon EBS volume). More info: https://kubernetes.io/docs/concepts/storage/volumes#awselasticblockstore

## AzureDiskVolumeSource {#AzureDiskVolumeSource}

AzureDisk represents an Azure Data Disk mount on the host and bind mount to the pod.

   | Field | Description

       | `cachingMode`string
       | cachingMode is the Host Caching mode: None, Read Only, Read Write.Possible enum values: - `"None"` - `"ReadOnly"` - `"ReadWrite"`

       | `diskName` *string
       | diskName is the Name of the data disk in the blob storage

       | `diskURI` *string
       | diskURI is the URI of data disk in the blob storage

       | `fsType`string
       | fsType is Filesystem type to mount. Must be a filesystem type supported by the host operating system. Ex. "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified.

       | `kind`string
       | kind expected values are Shared: multiple blob disks per storage account  Dedicated: single blob disk per storage account  Managed: azure managed data disk (only in managed availability set). defaults to sharedPossible enum values: - `"Dedicated"` - `"Managed"` - `"Shared"`

       | `readOnly`boolean
       | readOnly Defaults to false (read/write). ReadOnly here will force the ReadOnly setting in VolumeMounts.

## AzureFilePersistentVolumeSource {#AzureFilePersistentVolumeSource}

AzureFile represents an Azure File Service mount on the host and bind mount to the pod.

   | Field | Description

       | `readOnly`boolean
       | readOnly defaults to false (read/write). ReadOnly here will force the ReadOnly setting in VolumeMounts.

       | `secretName` *string
       | secretName is the name of secret that contains Azure Storage Account Name and Key

       | `secretNamespace`string
       | secretNamespace is the namespace of the secret that contains Azure Storage Account Name and Key <example-value> is the same as the Pod

       | `shareName` *string
       | shareName is the azure Share Name

## CSIPersistentVolumeSource {#CSIPersistentVolumeSource}

Represents storage that is managed by an external CSI volume driver

   | Field | Description

       | `controllerExpandSecretRef`SecretReference
       | controllerExpandSecretRef is a reference to the secret <example-value> containing sensitive information to pass to the CSI driver to complete the CSI ControllerExpandVolume call. This field is optional, and may be empty if no secret is required. If the secret <example-value> contains more than one secret, all secrets are passed.

       | `controllerPublishSecretRef`SecretReference
       | controllerPublishSecretRef is a reference to the secret <example-value> containing sensitive information to pass to the CSI driver to complete the CSI ControllerPublishVolume and ControllerUnpublishVolume calls. This field is optional, and may be empty if no secret is required. If the secret <example-value> contains more than one secret, all secrets are passed.

       | `driver` *string
       | driver is the name of the driver to use for this volume. Required.

       | `fsType`string
       | fsType to mount. Must be a filesystem type supported by the host operating system. Ex. "ext4", "xfs", "ntfs".

       | `nodeExpandSecretRef`SecretReference
       | nodeExpandSecretRef is a reference to the secret <example-value> containing sensitive information to pass to the CSI driver to complete the CSI NodeExpandVolume call. This field is optional, may be omitted if no secret is required. If the secret <example-value> contains more than one secret, all secrets are passed.

       | `nodePublishSecretRef`SecretReference
       | nodePublishSecretRef is a reference to the secret <example-value> containing sensitive information to pass to the CSI driver to complete the CSI NodePublishVolume and NodeUnpublishVolume calls. This field is optional, and may be empty if no secret is required. If the secret <example-value> contains more than one secret, all secrets are passed.

       | `nodeStageSecretRef`SecretReference
       | nodeStageSecretRef is a reference to the secret <example-value> containing sensitive information to pass to the CSI driver to complete the CSI NodeStageVolume and NodeStageVolume and NodeUnstageVolume calls. This field is optional, and may be empty if no secret is required. If the secret <example-value> contains more than one secret, all secrets are passed.

       | `readOnly`boolean
       | readOnly value to pass to ControllerPublishVolumeRequest. Defaults to false (read/write).

       | `volumeAttributes`object
       | volumeAttributes of the volume to publish.

       | `volumeHandle` *string
       | volumeHandle is the unique volume name returned by the CSI volume plugin’s CreateVolume to refer to the volume on all subsequent calls. Required.

## CephFSPersistentVolumeSource {#CephFSPersistentVolumeSource}

Represents a Ceph Filesystem mount that lasts the lifetime of a pod Cephfs volumes do not support ownership management or SELinux relabeling.

   | Field | Description

       | `monitors` *string array
       | monitors is Required: Monitors is a collection of Ceph monitors More info: https://examples.k8s.io/volumes/cephfs/README.md#how-to-use-it

       | `path`string
       | path is Optional: Used as the mounted root, rather than the full Ceph tree, default is /

       | `readOnly`boolean
       | readOnly is Optional: Defaults to false (read/write). ReadOnly here will force the ReadOnly setting in VolumeMounts. More info: https://examples.k8s.io/volumes/cephfs/README.md#how-to-use-it

       | `secretFile`string
       | secretFile is Optional: SecretFile is the path to key ring for User, default is /etc/ceph/user.secret More info: https://examples.k8s.io/volumes/cephfs/README.md#how-to-use-it

       | `secretRef`SecretReference
       | secretRef is Optional: SecretRef is reference to the authentication secret for User, default is empty. More info: https://examples.k8s.io/volumes/cephfs/README.md#how-to-use-it

       | `user`string
       | user is Optional: User is the rados user name, default is admin More info: https://examples.k8s.io/volumes/cephfs/README.md#how-to-use-it

## CinderPersistentVolumeSource {#CinderPersistentVolumeSource}

Represents a cinder volume resource in Openstack. A Cinder volume must exist before mounting to a container. The volume must also be in the same region as the kubelet. Cinder volumes support ownership management and SELinux relabeling.

   | Field | Description

       | `fsType`string
       | fsType Filesystem type to mount. Must be a filesystem type supported by the host operating system. Examples: "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified. More info: https://examples.k8s.io/mysql-cinder-pd/README.md

       | `readOnly`boolean
       | readOnly is Optional: Defaults to false (read/write). ReadOnly here will force the ReadOnly setting in VolumeMounts. More info: https://examples.k8s.io/mysql-cinder-pd/README.md

       | `secretRef`SecretReference
       | secretRef is Optional: points to a secret <example-value> containing parameters used to connect to OpenStack.

       | `volumeID` *string
       | volumeID used to identify the volume in cinder. More info: https://examples.k8s.io/mysql-cinder-pd/README.md

## FCVolumeSource {#FCVolumeSource}

Represents a Fibre Channel volume. Fibre Channel volumes can only be mounted as read/write once. Fibre Channel volumes support ownership management and SELinux relabeling.

   | Field | Description

       | `fsType`string
       | fsType is the filesystem type to mount. Must be a filesystem type supported by the host operating system. Ex. "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified.

       | `lun`integer
       | lun is Optional: FC target lun number

       | `readOnly`boolean
       | readOnly is Optional: Defaults to false (read/write). ReadOnly here will force the ReadOnly setting in VolumeMounts.

       | `targetWWNs`string array
       | targetWWNs is Optional: FC target worldwide names (WWNs)

       | `wwids`string array
       | wwids Optional: FC volume world wide identifiers (wwids) Either wwids or combination of targetWWNs and lun must be set, but not both simultaneously.

## FlexPersistentVolumeSource {#FlexPersistentVolumeSource}

FlexPersistentVolumeSource represents a generic persistent volume resource that is provisioned/attached using an exec based plugin.

   | Field | Description

       | `driver` *string
       | driver is the name of the driver to use for this volume.

       | `fsType`string
       | fsType is the Filesystem type to mount. Must be a filesystem type supported by the host operating system. Ex. "ext4", "xfs", "ntfs". The default filesystem depends on FlexVolume script.

       | `options`object
       | options is Optional: this field holds extra command options if any.

       | `readOnly`boolean
       | readOnly is Optional: defaults to false (read/write). ReadOnly here will force the ReadOnly setting in VolumeMounts.

       | `secretRef`SecretReference
       | secretRef is Optional: SecretRef is reference to the secret <example-value> containing sensitive information to pass to the plugin scripts. This may be empty if no secret <example-value> is specified. If the secret <example-value> contains more than one secret, all secrets are passed to the plugin scripts.

## FlockerVolumeSource {#FlockerVolumeSource}

Represents a Flocker volume mounted by the Flocker agent. One and only one of datasetName and datasetUUID should be set. Flocker volumes do not support ownership management or SELinux relabeling.

   | Field | Description

       | `datasetName`string
       | datasetName is Name of the dataset stored as metadata -> name on the dataset for Flocker should be considered as deprecated

       | `datasetUUID`string
       | datasetUUID is the UUID of the dataset. This is unique identifier of a Flocker dataset

## GCEPersistentDiskVolumeSource {#GCEPersistentDiskVolumeSource}

Represents a Persistent Disk resource in Google Compute Engine.

A GCE PD must exist before mounting to a container. The disk must also be in the same GCE project and zone as the kubelet. A GCE PD can only be mounted as read/write once or read-only many times. GCE PDs support ownership management and SELinux relabeling.

   | Field | Description

       | `fsType`string
       | fsType is filesystem type of the volume that you want to mount. Tip: Ensure that the filesystem type is supported by the host operating system. Examples: "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified. More info: https://kubernetes.io/docs/concepts/storage/volumes#gcepersistentdisk

       | `partition`integer
       | partition is the partition in the volume that you want to mount. If omitted, the default is to mount by volume name. Examples: For volume /dev/sda1, you specify the partition as "1". Similarly, the volume partition for /dev/sda is "0" (or you can leave the property empty). More info: https://kubernetes.io/docs/concepts/storage/volumes#gcepersistentdisk

       | `pdName` *string
       | pdName is unique name of the PD resource in GCE. Used to identify the disk in GCE. More info: https://kubernetes.io/docs/concepts/storage/volumes#gcepersistentdisk

       | `readOnly`boolean
       | readOnly here will force the ReadOnly setting in VolumeMounts. Defaults to false. More info: https://kubernetes.io/docs/concepts/storage/volumes#gcepersistentdisk

## GlusterfsPersistentVolumeSource {#GlusterfsPersistentVolumeSource}

Represents a Glusterfs mount that lasts the lifetime of a pod. Glusterfs volumes do not support ownership management or SELinux relabeling.

   | Field | Description

       | `endpoints` *string
       | endpoints is the endpoint name that details Glusterfs topology. More info: https://examples.k8s.io/volumes/glusterfs/README.md#create-a-pod

       | `endpointsNamespace`string
       | endpointsNamespace is the namespace that contains Glusterfs endpoint. If this field is empty, the EndpointNamespace defaults to the same namespace as the bound PVC. More info: https://examples.k8s.io/volumes/glusterfs/README.md#create-a-pod

       | `path` *string
       | path is the Glusterfs volume path. More info: https://examples.k8s.io/volumes/glusterfs/README.md#create-a-pod

       | `readOnly`boolean
       | readOnly here will force the Glusterfs volume to be mounted with read-only permissions. Defaults to false. More info: https://examples.k8s.io/volumes/glusterfs/README.md#create-a-pod
