---
title: "VolumeAttachment (part 1 of 6)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/storage/volume-attachment-v1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# VolumeAttachment

`apiVersion: storage.k8s.io/v1`

`import "k8s.io/api/storage/v1"`

## VolumeAttachment {#VolumeAttachment}

VolumeAttachment captures the intent to attach or detach the specified volume to/from the specified node.

VolumeAttachment objects are non-namespaced.

   | Field | Description

       | `apiVersion`string
       | APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

       | `kind`string
       | Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

       | `metadata`ObjectMeta
       | metadata is the standard object metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata

       | `spec` *VolumeAttachmentSpec
       | spec represents specification of the desired attach/detach volume behavior. Populated by the Kubernetes system.

       | `status`VolumeAttachmentStatus
       | status represents status of the VolumeAttachment request. Populated by the entity completing the attach or detach operation, i.e. the external-attacher.

## VolumeAttachmentSpec {#VolumeAttachmentSpec}

VolumeAttachmentSpec is the specification of a VolumeAttachment request.

   | Field | Description

       | `attacher` *string
       | attacher indicates the name of the volume driver that MUST handle this request. This is the name returned by GetPluginName().

       | `nodeName` *string
       | nodeName represents the node that the volume should be attached to.

       | `source` *VolumeAttachmentSource
       | source represents the volume that should be attached.

## VolumeAttachmentStatus {#VolumeAttachmentStatus}

VolumeAttachmentStatus is the status of a VolumeAttachment request.

   | Field | Description

       | `attachError`VolumeError
       | attachError represents the last error encountered during attach operation, if any. This field must only be set by the entity completing the attach operation, i.e. the external-attacher.

       | `attached` *boolean
       | attached indicates the volume is successfully attached. This field must only be set by the entity completing the attach operation, i.e. the external-attacher.

       | `attachmentMetadata`object
       | attachmentMetadata is populated with any information returned by the attach operation, upon successful attach, that must be passed into subsequent WaitForAttach or Mount calls. This field must only be set by the entity completing the attach operation, i.e. the external-attacher.

       | `detachError`VolumeError
       | detachError represents the last error encountered during detach operation, if any. This field must only be set by the entity completing the detach operation, i.e. the external-attacher.

## VolumeAttachmentList {#VolumeAttachmentList}

VolumeAttachmentList is a collection of VolumeAttachment objects.

   | Field | Description

       | `apiVersion`string
       | APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

       | `items` *VolumeAttachment array
       | items is the list of VolumeAttachments

       | `kind`string
       | Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

       | `metadata`ListMeta
       | Standard list metadata More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata

## VolumeAttachmentSource {#VolumeAttachmentSource}

VolumeAttachmentSource represents a volume that should be attached. Right now only PersistentVolumes can be attached via external attacher, in the future we may allow also inline volumes in pods. Exactly one member can be set.

   | Field | Description

       | `inlineVolumeSpec`PersistentVolumeSpec
       | inlineVolumeSpec contains all the information necessary to attach a persistent volume defined by a pod's inline VolumeSource. This field is populated only for the CSIMigration feature. It contains translated fields from a pod's inline VolumeSource to a PersistentVolumeSpec. This field is beta-level and is only honored by servers that enabled the CSIMigration feature.

       | `persistentVolumeName`string
       | persistentVolumeName represents the name of the persistent volume to attach.

## VolumeError {#VolumeError}

VolumeError captures an error encountered during a volume operation.

   | Field | Description

       | `errorCode`integer
       | errorCode is a numeric gRPC code representing the error encountered during Attach or Detach operations.  This field requires the MutableCSINodeAllocatableCount feature gate being enabled to be set.

       | `message`string
       | message represents the error encountered during Attach or Detach operation. This string may be logged, so it should not contain sensitive information.

       | `time`Time
       | time represents the time the error was encountered.
