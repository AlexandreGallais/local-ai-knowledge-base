---
title: "CSINode (part 1 of 6)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/storage/csi-node-v1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# CSINode

`apiVersion: storage.k8s.io/v1`

`import "k8s.io/api/storage/v1"`

## CSINode {#CSINode}

CSINode holds information about all CSI drivers installed on a node. CSI drivers do not need to create the CSINode object directly. As long as they use the node-driver-registrar sidecar container, the kubelet will automatically populate the CSINode object for the CSI driver as part of kubelet plugin registration. CSINode has the same name as a node. If the object is missing, it means either there are no CSI Drivers available on the node, or the Kubelet version is low enough that it doesn't create this object. CSINode has an OwnerReference that points to the corresponding node object.

   | Field | Description

       | `apiVersion`string
       | APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

       | `kind`string
       | Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

       | `metadata`ObjectMeta
       | metadata is the standard object metadata. metadata.name must be the Kubernetes node name.

       | `spec` *CSINodeSpec
       | spec is the specification of CSINode

       | `status`CSINodeStatus
       | status contains health and status information for the node's storage.

## CSINodeSpec {#CSINodeSpec}

CSINodeSpec holds information about the specification of all CSI drivers installed on a node

   | Field | Description

       | `drivers` *CSINodeDriver arraypatch strategy: merge on key `name`
       | drivers is a list of information of all CSI Drivers existing on a node. If all drivers in the list are uninstalled, this can become empty.

## CSINodeStatus {#CSINodeStatus}

CSINodeStatus contains health and status information for storage on a node.

   | Field | Description

       | `storageHealth`StorageHealth arraypatch strategy: merge on key `name`
       | storageHealth contains backend health reports for CSI drivers registered on the node.

## CSINodeList {#CSINodeList}

CSINodeList is a collection of CSINode objects.

   | Field | Description

       | `apiVersion`string
       | APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

       | `items` *CSINode array
       | items is the list of CSINode

       | `kind`string
       | Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

       | `metadata`ListMeta
       | Standard list metadata More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata

## CSINodeDriver {#CSINodeDriver}

CSINodeDriver holds information about the specification of one CSI driver installed on a node

   | Field | Description

       | `allocatable`VolumeNodeResources
       | allocatable represents the volume resources of a node that are available for scheduling. This field is beta.

       | `name` *string
       | name represents the name of the CSI driver that this object refers to. This MUST be the same name returned by the CSI GetPluginName() call for that driver.

       | `nodeID` *string
       | nodeID of the node from the driver point of view. This field enables Kubernetes to communicate with storage systems that do not share the same nomenclature for nodes. For example, Kubernetes may refer to a given node as "node1", but the storage system may refer to the same node as "nodeA". When Kubernetes issues a command to the storage system to attach a volume to a specific node, it can use this field to refer to the node name using the ID that the storage system will understand, e.g. "nodeA" instead of "node1". This field is required.

       | `topologyKeys`string array
       | topologyKeys is the list of keys supported by the driver. When a driver is initialized on a cluster, it provides a set of topology keys that it understands (e.g. "company.com/zone", "company.com/region"). When a driver is initialized on a node, it provides the same topology keys along with values. Kubelet will expose these topology keys as labels on its own node object. When Kubernetes does topology aware provisioning, it can use this list to determine which labels it should retrieve from the node object and pass back to the driver. It is possible for different nodes to use different topology keys. This can be empty if driver does not support topology.

## StorageHealth {#StorageHealth}

StorageHealth contains storage backend health reported by a CSI driver on a node.

   | Field | Description

       | `healthConditions`StorageHealthCondition array
       | healthConditions are the adverse storage backend conditions reported by the CSI driver. At most 16 conditions may be reported.

       | `name` *string
       | name is the CSI driver name, matching CSINodeDriver.name.

## StorageHealthCondition {#StorageHealthCondition}

StorageHealthCondition represents an adverse health condition reported by a CSI driver for its storage backend on a node.

   | Field | Description

       | `accessMode`string
       | accessMode is the access mode affected. Nil means all access modes are affected.Possible enum values: - `"ReadOnlyMany"` can be mounted in read-only mode to many hosts - `"ReadWriteMany"` can be mounted in read/write mode to many hosts - `"ReadWriteOnce"` can be mounted in read/write mode to exactly 1 host - `"ReadWriteOncePod"` can be mounted in read/write mode to exactly 1 pod cannot be used in combination with other access modes

       | `lastTransitionTime`Time
       | lastTransitionTime is when this condition first appeared at its current state.

       | `message`string
       | message is a human-readable description. Maximum permitted length of a message is 1024 characters.

       | `reason` *string
       | reason is a brief CamelCase machine-parseable reason. Maximum permitted length of a reason is 256 characters.

       | `status` *string
       | status is the health status category. One of "StorageUnreachable", "StorageDegraded".Possible enum values: - `"StorageDegraded"` indicates the storage backend is functioning with reduced capability. - `"StorageUnreachable"` indicates the storage backend is unreachable.

       | `volumeMode`string
       | volumeMode is the volume mode affected. Nil means both are affected.Possible enum values: - `"Block"` means the volume will not be formatted with a filesystem and will remain a raw block device. - `"Filesystem"` means the volume will be or is formatted with a filesystem.

## VolumeNodeResources {#VolumeNodeResources}

VolumeNodeResources is a set of resource limits for scheduling of volumes.

   | Field | Description

       | `count`integer
       | count indicates the maximum number of unique volumes managed by the CSI driver that can be used on a node. A volume that is both attached and mounted on a node is considered to be used once, not twice. The same rule applies for a unique volume that is shared among multiple pods on the same node. If this field is not specified, then the supported number of volumes on this node is unbounded.
