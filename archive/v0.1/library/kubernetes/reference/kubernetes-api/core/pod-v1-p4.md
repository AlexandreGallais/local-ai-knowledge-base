---
title: "Pod (part 4 of 24)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/core/pod-v1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Pod (part 4 of 24)

## AzureFileVolumeSource {#AzureFileVolumeSource}

AzureFile represents an Azure File Service mount on the host and bind mount to the pod.

   | Field | Description

       | `readOnly`boolean
       | readOnly defaults to false (read/write). ReadOnly here will force the ReadOnly setting in VolumeMounts.

       | `secretName` *string
       | secretName is the  name of secret that contains Azure Storage Account Name and Key

       | `shareName` *string
       | shareName is the azure share Name

## CSIVolumeSource {#CSIVolumeSource}

Represents a source location of a volume to mount, managed by an external CSI driver

   | Field | Description

       | `driver` *string
       | driver is the name of the CSI driver that handles this volume. Consult with your admin for the correct name as registered in the cluster.

       | `fsType`string
       | fsType to mount. Ex. "ext4", "xfs", "ntfs". If not provided, the empty value is passed to the associated CSI driver which will determine the default filesystem to apply.

       | `nodePublishSecretRef`LocalObjectReference
       | nodePublishSecretRef is a reference to the secret <example-value> containing sensitive information to pass to the CSI driver to complete the CSI NodePublishVolume and NodeUnpublishVolume calls. This field is optional, and  may be empty if no secret is required. If the secret <example-value> contains more than one secret, all secret <example-value> are passed.

       | `readOnly`boolean
       | readOnly specifies a read-only configuration for the volume. Defaults to false (read/write).

       | `volumeAttributes`object
       | volumeAttributes stores driver-specific properties that are passed to the CSI driver. Consult your driver's documentation for supported values.

## Capabilities {#Capabilities}

Adds and removes POSIX capabilities from running containers.

   | Field | Description

       | `add`string array
       | Added capabilities

       | `drop`string array
       | Removed capabilities

## CephFSVolumeSource {#CephFSVolumeSource}

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

       | `secretRef`LocalObjectReference
       | secretRef is Optional: SecretRef is reference to the authentication secret for User, default is empty. More info: https://examples.k8s.io/volumes/cephfs/README.md#how-to-use-it

       | `user`string
       | user is optional: User is the rados user name, default is admin More info: https://examples.k8s.io/volumes/cephfs/README.md#how-to-use-it

## CinderVolumeSource {#CinderVolumeSource}

Represents a cinder volume resource in Openstack. A Cinder volume must exist before mounting to a container. The volume must also be in the same region as the kubelet. Cinder volumes support ownership management and SELinux relabeling.

   | Field | Description

       | `fsType`string
       | fsType is the filesystem type to mount. Must be a filesystem type supported by the host operating system. Examples: "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified. More info: https://examples.k8s.io/mysql-cinder-pd/README.md

       | `readOnly`boolean
       | readOnly defaults to false (read/write). ReadOnly here will force the ReadOnly setting in VolumeMounts. More info: https://examples.k8s.io/mysql-cinder-pd/README.md

       | `secretRef`LocalObjectReference
       | secretRef is optional: points to a secret <example-value> containing parameters used to connect to OpenStack.

       | `volumeID` *string
       | volumeID used to identify the volume in cinder. More info: https://examples.k8s.io/mysql-cinder-pd/README.md

## ClusterTrustBundleProjection {#ClusterTrustBundleProjection}

ClusterTrustBundleProjection describes how to select a set of ClusterTrustBundle objects and project their contents into the pod filesystem.

   | Field | Description

       | `labelSelector`LabelSelector
       | Select all ClusterTrustBundles that match this label selector.  Only has effect if signerName is set.  Mutually-exclusive with name.  If unset, interpreted as "match nothing".  If set but empty, interpreted as "match everything".

       | `name`string
       | Select a single ClusterTrustBundle by object name.  Mutually-exclusive with signerName and labelSelector.

       | `optional`boolean
       | If true, don't block pod startup if the referenced ClusterTrustBundle(s) aren't available.  If using name, then the named ClusterTrustBundle is allowed not to exist.  If using signerName, then the combination of signerName and labelSelector is allowed to match zero ClusterTrustBundles.

       | `path` *string
       | Relative path from the volume root to write the bundle.

       | `signerName`string
       | Select all ClusterTrustBundles that match this signer name. Mutually-exclusive with name.  The contents of all selected ClusterTrustBundles will be unified and deduplicated.

       | `user`integer
       | user is Optional: The owner UID of the created file. If specified, the item-level user field takes precedence over defaultUser. (Alpha) This field requires the AtomicWriteVolumeUserFields feature gate to be enabled.

## ConfigMapEnvSource {#ConfigMapEnvSource}

ConfigMapEnvSource selects a ConfigMap to populate the environment variables with.

The contents of the target ConfigMap's Data field will represent the key-value pairs as environment variables. Keys in the BinaryData field are not currently propagated to container env vars.

   | Field | Description

       | `name`string
       | Name of the referent. This field is effectively required, but due to backwards compatibility is allowed to be empty. Instances of this type with an empty value here are almost certainly wrong. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names

       | `optional`boolean
       | Specify whether the ConfigMap must be defined

## ConfigMapKeySelector {#ConfigMapKeySelector}

Selects a key from a ConfigMap.

   | Field | Description

       | `key` *string
       | The key to select from the ConfigMap's Data field. Keys in the BinaryData field are not currently propagated to container env vars.

       | `name`string
       | Name of the referent. This field is effectively required, but due to backwards compatibility is allowed to be empty. Instances of this type with an empty value here are almost certainly wrong. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names

       | `optional`boolean
       | Specify whether the ConfigMap or its key must be defined

## ConfigMapProjection {#ConfigMapProjection}

Adapts a ConfigMap into a projected volume.

The contents of the target ConfigMap's Data field will be presented in a projected volume as files using the keys in the Data field as the file names, unless the items element is populated with specific mappings of keys to paths. Note that this is identical to a configmap volume source without the default mode.

   | Field | Description

       | `items`KeyToPath array
       | items if unspecified, each key-value pair in the Data field of the referenced ConfigMap will be projected into the volume as a file whose name is the key and content is the value. If specified, the listed keys will be projected into the specified paths, and unlisted keys will not be present. If a key is specified which is not present in the ConfigMap, the volume setup will error unless it is marked optional. Paths must be relative and may not contain the '..' path or start with '..'.

       | `name`string
       | Name of the referent. This field is effectively required, but due to backwards compatibility is allowed to be empty. Instances of this type with an empty value here are almost certainly wrong. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names

       | `optional`boolean
       | optional specify whether the ConfigMap or its keys must be defined

## ConfigMapVolumeSource {#ConfigMapVolumeSource}

Adapts a ConfigMap into a volume.

The contents of the target ConfigMap's Data field will be presented in a volume as files using the keys in the Data field as the file names, unless the items element is populated with specific mappings of keys to paths. ConfigMap volumes support ownership management and SELinux relabeling.

   | Field | Description

       | `defaultMode`integer
       | defaultMode is optional: mode bits used to set permissions on created files by default. Must be an octal value between 0000 and 0777 or a decimal value between 0 and 511. YAML accepts both octal and decimal values, JSON requires decimal values for mode bits. Defaults to 0644. Directories within the path are not affected by this setting. This might be in conflict with other options that affect the file mode, like fsGroup, and the result can be other mode bits set.

       | `defaultUser`integer
       | defaultUser is Optional: The owner UID of the created files by default. The defaultUser field is only used as a fallback when the item-level user field is unset. (Alpha) This field requires the AtomicWriteVolumeUserFields feature gate to be enabled.

       | `items`KeyToPath array
       | items if unspecified, each key-value pair in the Data field of the referenced ConfigMap will be projected into the volume as a file whose name is the key and content is the value. If specified, the listed keys will be projected into the specified paths, and unlisted keys will not be present. If a key is specified which is not present in the ConfigMap, the volume setup will error unless it is marked optional. Paths must be relative and may not contain the '..' path or start with '..'.

       | `name`string
       | Name of the referent. This field is effectively required, but due to backwards compatibility is allowed to be empty. Instances of this type with an empty value here are almost certainly wrong. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names

       | `optional`boolean
       | optional specify whether the ConfigMap or its keys must be defined
