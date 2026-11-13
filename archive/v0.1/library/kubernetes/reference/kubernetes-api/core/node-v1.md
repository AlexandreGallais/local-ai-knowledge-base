---
title: "Node (part 1 of 8)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/core/node-v1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Node

`apiVersion: v1`

`import "k8s.io/api/core/v1"`

## Node {#Node}

Node is a worker node in Kubernetes. Each node will have a unique identifier in the cache (i.e. in etcd).

   | Field | Description

       | `apiVersion`string
       | APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

       | `kind`string
       | Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

       | `metadata`ObjectMeta
       | Standard object's metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata

       | `spec`NodeSpec
       | Spec defines the behavior of a node. https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status

       | `status`NodeStatus
       | Most recently observed status of the node. Populated by the system. Read-only. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status

## NodeSpec {#NodeSpec}

NodeSpec describes the attributes that a node is created with.

   | Field | Description

       | `configSource`NodeConfigSource
       | Deprecated: Previously used to specify the source of the node's configuration for the DynamicKubeletConfig feature. This feature is removed.

       | `externalID`string
       | Deprecated. Not all kubelets will set this field. Remove field after 1.13. see: https://issues.k8s.io/61966

       | `podCIDR`string
       | PodCIDR represents the pod IP range assigned to the node.

       | `podCIDRs`string arraypatch strategy: merge
       | podCIDRs represents the IP ranges assigned to the node for usage by Pods on that node. If this field is specified, the 0th entry must match the podCIDR field. It may contain at most 1 value for each of IPv4 and IPv6.

       | `podPreemptionPolicy`NodePodPreemptionPolicy
       | PodPreemptionPolicy controls the node-level preemption behaviors for pods on this node. This is an alpha field and requires enabling the InPlacePodVerticalScalingSchedulerPreemption feature gate.

       | `providerID`string
       | ID of the node assigned by the cloud provider in the format: \<ProviderName>://\<ProviderSpecificNodeID>

       | `taints`Taint array
       | If specified, the node's taints.

       | `unschedulable`boolean
       | Unschedulable controls node schedulability of new pods. By default, node is schedulable. More info: https://kubernetes.io/docs/concepts/nodes/node/#manual-node-administration

## NodeStatus {#NodeStatus}

NodeStatus is information about the current status of a node.

   | Field | Description

       | `addresses`NodeAddress arraypatch strategy: merge on key `type`
       | List of addresses reachable to the node. Queried from cloud provider, if available. More info: https://kubernetes.io/docs/reference/node/node-status/#addresses Note: This field is declared as mergeable, but the merge key is not sufficiently unique, which can cause data corruption when it is merged. Callers should instead use a full-replacement patch. See https://pr.k8s.io/79391 for an example. Consumers should assume that addresses can change during the lifetime of a Node. However, there are some exceptions where this may not be possible, such as Pods that inherit a Node's address in its own status or consumers of the downward API (status.hostIP).

       | `allocatable`object
       | Allocatable represents the resources of a node that are available for scheduling. Defaults to Capacity.

       | `capacity`object
       | Capacity represents the total resources of a node. More info: https://kubernetes.io/docs/reference/node/node-status/#capacity

       | `conditions`NodeCondition arraypatch strategy: merge on key `type`
       | Conditions is an array of current observed node conditions. More info: https://kubernetes.io/docs/reference/node/node-status/#condition

       | `config`NodeConfigStatus
       | Status of the config assigned to the node via the dynamic Kubelet config feature.

       | `daemonEndpoints`NodeDaemonEndpoints
       | Endpoints of daemons running on the Node.

       | `declaredFeatures`string array
       | DeclaredFeatures represents the features related to feature gates that are declared by the node.

       | `features`NodeFeatures
       | Features describes the set of features implemented by the CRI implementation.

       | `images`ContainerImage array
       | List of container images on this node

       | `nodeInfo`NodeSystemInfo
       | Set of ids/uuids to uniquely identify the node. More info: https://kubernetes.io/docs/reference/node/node-status/#info

       | `phase`string
       | NodePhase is the recently observed lifecycle phase of the node. More info: https://kubernetes.io/docs/concepts/nodes/node/#phase The field is never populated, and now is deprecated.Possible enum values: - `"Pending"` means the node has been created/added by the system, but not configured. - `"Running"` means the node has been configured and has Kubernetes components running. - `"Terminated"` means the node has been removed from the cluster.

       | `runtimeHandlers`NodeRuntimeHandler array
       | The available runtime handlers.

       | `volumesAttached`AttachedVolume array
       | List of volumes that are attached to the node.

       | `volumesInUse`string array
       | List of attachable volumes in use (mounted) by the node.

## NodeList {#NodeList}

NodeList is the whole list of all Nodes which have been registered with master.

   | Field | Description

       | `apiVersion`string
       | APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

       | `items` *Node array
       | List of nodes

       | `kind`string
       | Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

       | `metadata`ListMeta
       | Standard list metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

## AttachedVolume {#AttachedVolume}

AttachedVolume describes a volume attached to a node

   | Field | Description

       | `devicePath` *string
       | DevicePath represents the device path where the volume should be available

       | `name` *string
       | Name of the attached volume

## ConfigMapNodeConfigSource {#ConfigMapNodeConfigSource}

ConfigMapNodeConfigSource contains the information to reference a ConfigMap as a config source for the Node. This API is deprecated since 1.22: https://git.k8s.io/enhancements/keps/sig-node/281-dynamic-kubelet-configuration

   | Field | Description

       | `kubeletConfigKey` *string
       | KubeletConfigKey <example-value> which key of the referenced ConfigMap corresponds to the KubeletConfiguration structure This field is required in all cases.

       | `name` *string
       | Name is the metadata.name of the referenced ConfigMap. This field is required in all cases.

       | `namespace` *string
       | Namespace is the metadata.namespace of the referenced ConfigMap. This field is required in all cases.

       | `resourceVersion`string
       | ResourceVersion is the metadata.ResourceVersion of the referenced ConfigMap. This field is forbidden in Node.Spec, and required in Node.Status.

       | `uid`string
       | UID is the metadata.UID of the referenced ConfigMap. This field is forbidden in Node.Spec, and required in Node.Status.

## ContainerImage {#ContainerImage}

Describe a container image

   | Field | Description

       | `names`string array
       | Names by which this image is known. e.g. ["kubernetes.example/hyperkube:v1.0.7", "cloud-vendor.registry.example/cloud-vendor/hyperkube:v1.0.7"]

       | `sizeBytes`integer
       | The size of the image in bytes.

## DaemonEndpoint {#DaemonEndpoint}

DaemonEndpoint contains information about a single Daemon endpoint.

   | Field | Description

       | `Port` *integer
       | Port number of the given endpoint.

## NodeAddress {#NodeAddress}

NodeAddress contains information for the node's address.

   | Field | Description

       | `address` *string
       | The node address.

       | `type` *string
       | Node address type, one of Hostname, ExternalIP or InternalIP.

## NodeCondition {#NodeCondition}

NodeCondition contains condition information for a node.

   | Field | Description

       | `lastHeartbeatTime`Time
       | Last time we got an update on a given condition.

       | `lastTransitionTime`Time
       | Last time the condition transit from one status to another.

       | `message`string
       | Human readable message indicating details about last transition.

       | `reason`string
       | (brief) reason for the condition's last transition.

       | `status` *string
       | Status of the condition, one of True, False, Unknown.

       | `type` *string
       | Type of node condition.

## NodeConfigSource {#NodeConfigSource}

NodeConfigSource specifies a source of node configuration. Exactly one subfield (excluding metadata) must be non-nil. This API is deprecated since 1.22

   | Field | Description

       | `configMap`ConfigMapNodeConfigSource
       | ConfigMap is a reference to a Node's ConfigMap

## NodeConfigStatus {#NodeConfigStatus}

NodeConfigStatus describes the status of the config assigned by Node.Spec.ConfigSource.

   | Field | Description

       | `active`NodeConfigSource
       | Active reports the checkpointed config the node is actively using. Active will represent either the current version of the Assigned config, or the current LastKnownGood config, depending on whether attempting to use the Assigned config results in an error.

       | `assigned`NodeConfigSource
       | Assigned reports the checkpointed config the node will try to use. When Node.Spec.ConfigSource is updated, the node checkpoints the associated config payload to local disk, along with a record indicating intended config. The node refers to this record to choose its config checkpoint, and reports this record in Assigned. Assigned only updates in the status after the record has been checkpointed to disk. When the Kubelet is restarted, it tries to make the Assigned config the Active config by loading and validating the checkpointed payload identified by Assigned.

       | `error`string
       | Error describes any problems reconciling the Spec.ConfigSource to the Active config. Errors may occur, for example, attempting to checkpoint Spec.ConfigSource to the local Assigned record, attempting to checkpoint the payload associated with Spec.ConfigSource, attempting to load or validate the Assigned config, etc. Errors may occur at different points while syncing config. Earlier errors (e.g. download or checkpointing errors) will not result in a rollback to LastKnownGood, and may resolve across Kubelet retries. Later errors (e.g. loading or validating a checkpointed config) will result in a rollback to LastKnownGood. In the latter case, it is usually possible to resolve the error by fixing the config assigned in Spec.ConfigSource. You can find additional information for debugging by searching the error message in the Kubelet log. Error is a human-readable description of the error state; machines can check whether or not Error is empty, but should not rely on the stability of the Error text across Kubelet versions.

       | `lastKnownGood`NodeConfigSource
       | LastKnownGood reports the checkpointed config the node will fall back to when it encounters an error attempting to use the Assigned config. The Assigned config becomes the LastKnownGood config when the node determines that the Assigned config is stable and correct. This is currently implemented as a 10-minute soak period starting when the local record of Assigned config is updated. If the Assigned config is Active at the end of this period, it becomes the LastKnownGood. Note that if Spec.ConfigSource is reset to nil (use local defaults), the LastKnownGood is also immediately reset to nil, because the local default config is always assumed good. You should not make assumptions about the node's method of determining config stability and correctness, as this may change or become configurable in the future.

## NodeDaemonEndpoints {#NodeDaemonEndpoints}

NodeDaemonEndpoints lists ports opened by daemons running on the Node.

   | Field | Description

       | `kubeletEndpoint`DaemonEndpoint
       | Endpoint on which Kubelet is listening.

## NodeFeatures {#NodeFeatures}

NodeFeatures describes the set of features implemented by the CRI implementation. The features contained in the NodeFeatures should depend only on the cri implementation independent of runtime handlers.

   | Field | Description

       | `supplementalGroupsPolicy`boolean
       | SupplementalGroupsPolicy is set to true if the runtime supports SupplementalGroupsPolicy and ContainerUser.

## NodePodPreemptionPolicy {#NodePodPreemptionPolicy}

NodePodPreemptionPolicy defines the node-level policies governing preemption for pods on this node.

   | Field | Description

       | `disableResizePreemption`string array
       | DisableResizePreemption lists the owners (e.g., autoscalers, operators, administrators) that have requested to disable scheduler and Kubelet preemption for in-place pod resize on this node. If this list is non-empty, resize-induced preemption is disabled on this node. This is an alpha field and requires enabling the InPlacePodVerticalScalingSchedulerPreemption feature gate.

## NodeRuntimeHandler {#NodeRuntimeHandler}

NodeRuntimeHandler is a set of runtime handler information.

   | Field | Description

       | `features`NodeRuntimeHandlerFeatures
       | Supported features.

       | `name`string
       | Runtime handler name. Empty for the default runtime handler.
