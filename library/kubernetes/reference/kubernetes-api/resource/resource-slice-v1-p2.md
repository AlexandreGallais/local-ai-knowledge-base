---
title: "ResourceSlice (part 2 of 8)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/resource/resource-slice-v1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# ResourceSlice (part 2 of 8)

## Device {#Device}

Device represents one individual hardware instance that can be selected based on its attributes. Besides the name, exactly one field must be set.

   | Field | Description

       | `allNodes`boolean
       | AllNodes indicates that all nodes have access to the device.  Must only be set if Spec.PerDeviceNodeSelection is set to true. At most one of NodeName, NodeSelector and AllNodes can be set.

       | `allowMultipleAllocations`boolean
       | AllowMultipleAllocations marks whether the device is allowed to be allocated to multiple DeviceRequests.  If AllowMultipleAllocations is set to true, the device can be allocated more than once, and all of its capacity is consumable, regardless of whether the requestPolicy is defined or not.

       | `attributes`object
       | Attributes defines the set of attributes for this device. The name of each attribute must be unique in that set.  The maximum number of attributes and capacities combined is 32.

       | `bindingConditions`string array
       | BindingConditions defines the conditions for proceeding with binding. All of these conditions must be set in the per-device status conditions with a value of True to proceed with binding the pod to the node while scheduling the pod.  The maximum number of binding conditions is 4.  The conditions must be a valid condition type string.  This is a beta field and requires enabling the DRADeviceBindingConditions and DRAResourceClaimDeviceStatus feature gates.

       | `bindingFailureConditions`string array
       | BindingFailureConditions defines the conditions for binding failure. They may be set in the per-device status conditions. If any is set to "True", a binding failure occurred.  The maximum number of binding failure conditions is 4.  The conditions must be a valid condition type string.  This is a beta field and requires enabling the DRADeviceBindingConditions and DRAResourceClaimDeviceStatus feature gates.

       | `bindsToNode`boolean
       | BindsToNode indicates if the usage of an allocation involving this device has to be limited to exactly the node that was chosen when allocating the claim. If set to true, the scheduler will set the ResourceClaim.Status.Allocation.NodeSelector to match the node where the allocation was made.  This is a beta field and requires enabling the DRADeviceBindingConditions and DRAResourceClaimDeviceStatus feature gates.

       | `capacity`object
       | Capacity defines the set of capacities for this device. The name of each capacity must be unique in that set.  The maximum number of attributes and capacities combined is 32.

       | `consumesCounters`DeviceCounterConsumption array
       | ConsumesCounters defines a list of references to sharedCounters and the set of counters that the device will consume from those counter sets.  There can only be a single entry per counterSet.  The maximum number of device counter consumptions per device is 2.

       | `name` *string
       | Name is unique identifier among all devices managed by the driver in the pool. It must be a DNS label.

       | `nodeAllocatableResources`object
       | NodeAllocatableResources defines the mapping of node resources that are managed by the DRA driver exposing this device. This includes resources currently reported in v1.Node `status.allocatable` that are not extended resources (see https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#extended-resources). Examples include "cpu", "memory", "ephemeral-storage", and hugepages. In addition to standard requests made through the Pod `spec`, these resources can also be requested through claims and allocated by the DRA driver. For example, a CPU DRA driver might allocate exclusive CPUs or auxiliary node memory dependencies of an accelerator device. The keys of this map are the node-allocatable resource names (e.g., "cpu", "memory"). Extended resource names are not permitted as keys.

       | `nodeName`string
       | NodeName identifies the node where the device is available.  Must only be set if Spec.PerDeviceNodeSelection is set to true. At most one of NodeName, NodeSelector and AllNodes can be set.

       | `nodeSelector`NodeSelector
       | NodeSelector defines the nodes where the device is available.  Must use exactly one term.  Must only be set if Spec.PerDeviceNodeSelection is set to true. At most one of NodeName, NodeSelector and AllNodes can be set.

       | `taints`DeviceTaint array
       | If specified, these are the driver-defined taints.  The maximum number of taints is 16. If taints are set for any device in a ResourceSlice, then the maximum number of allowed devices per ResourceSlice is 64 instead of 128.  This is a beta field and requires enabling the DRADeviceTaints feature gate.

## DeviceAttribute {#DeviceAttribute}

DeviceAttribute must have exactly one field set.

   | Field | Description

       | `bool`boolean
       | BoolValue is a true/false value.

       | `bools`boolean array
       | BoolValues is a non-empty list of true/false values.

       | `int`integer
       | IntValue is a number.

       | `ints`integer array
       | IntValues is a non-empty list of numbers.  This is an alpha field and requires enabling the DRAListTypeAttributes feature gate.

       | `string`string
       | StringValue is a string. Must not be longer than 64 characters.

       | `strings`string array
       | StringValues is a non-empty list of strings. Each string must not be longer than 64 characters.  This is an alpha field and requires enabling the DRAListTypeAttributes feature gate.

       | `version`string
       | VersionValue is a semantic version according to semver.org spec 2.0.0. Must not be longer than 64 characters.

       | `versions`string array
       | VersionValues is a non-empty list of semantic versions according to semver.org spec 2.0.0. Each version string must not be longer than 64 characters.  This is an alpha field and requires enabling the DRAListTypeAttributes feature gate.

## DeviceCapacity {#DeviceCapacity}

DeviceCapacity describes a quantity associated with a device.

   | Field | Description

       | `requestPolicy`CapacityRequestPolicy
       | RequestPolicy defines how this DeviceCapacity must be consumed when the device is allowed to be shared by multiple allocations.  The Device must have allowMultipleAllocations set to true in order to set a requestPolicy.  If unset, capacity requests are unconstrained: requests can consume any amount of capacity, as long as the total consumed across all allocations does not exceed the device's defined capacity. If request is also unset, default is the full capacity value.

       | `value` *Quantity
       | Value defines how much of a certain capacity that device has.  This field reflects the fixed total capacity and does not change. The consumed amount is tracked separately by scheduler and does not affect this value.

## DeviceCounterConsumption {#DeviceCounterConsumption}

DeviceCounterConsumption defines a set of counters that a device will consume from a CounterSet.

   | Field | Description

       | `compatibilityGroups`string array
       | CompatibilityGroups is a list of opaque group names for this counter set consumption.  Devices that consume counters from the same counter set may only be allocated at the same time ("co-allocated") if they all share at least one common group: the intersection of the CompatibilityGroups of all co-allocated devices on that counter set must be non-empty. Devices that consume from different counter sets are never compared via this field.  An unset field, an explicit nil, and an empty list are equivalent and mean "no groups": such a device is only co-allocatable with sibling devices on the same counter set that also have no groups, and is never co-allocatable with a device that declares one or more groups.  Group names are opaque and meaningful only within the publishing driver's pool.  The maximum number of groups is 2, and the names must be unique.

       | `counterSet` *string
       | CounterSet is the name of the set from which the counters defined will be consumed.

       | `counters` *object
       | Counters defines the counters that will be consumed by the device.  The maximum number of counters is 32.

## NodeAllocatableMapping {#NodeAllocatableMapping}

NodeAllocatableMapping defines how a DRA allocation directly translates into a node allocatable resource quantity. The mapping can be derived from either the count of allocated devices (via deviceMultiplier) or the specific capacity consumed (via capacityKey and capacityMultiplier). These options are mutually exclusive. Kubelet adds this mapped resource quantity from claim to both requests and limits at the pod-level cgroup, and to limits at the container-level cgroup for each container referencing the claim.

   | Field | Description

       | `capacityKey`string
       | CapacityKey references a capacity name defined as a key in the `spec.devices[*].capacity` map. When this field is set, the value associated with this key in the `status.allocation.devices.results[*].consumedCapacity` map (for a specific claim allocation) determines the base quantity for the node allocatable resource. `capacityMultiplier` must also be set and is multiplied with the base quantity. For example, if `spec.devices[*].capacity` has an entry "dra.example.com/memory": "128Gi", and this field is set to "dra.example.com/memory", then for a claim allocation that consumes { "dra.example.com/memory": "4Gi" } the base quantity for the node allocatable resource mapping will be "4Gi". The final node allocatable resource amount is `consumedCapacity[capacityKey]` * `capacityMultiplier`.

       | `capacityMultiplier`Quantity
       | CapacityMultiplier is used as a multiplier for the allocated capacity consumed. It is only valid if `capacityKey` is set. The final node allocatable resource amount is `consumedCapacity[capacityKey]` * `capacityMultiplier`. For example, if a Device's capacity "dra.example.com/cores" is consumed, and each "core" provides 2 "cpu"s, the mapping would be: {ResourceName: "cpu", capacityKey: "dra.example.com/cores", capacityMultiplier: "2"}. If a claim consumes 8 "dra.example.com/cores", the CPU footprint is 8 * 2 = 16.

       | `deviceMultiplier`Quantity
       | DeviceMultiplier is used as a multiplier for the allocated device count in the claim. The final node allocatable resource amount is `deviceCount` * `deviceMultiplier`. For example, a DRA driver representing each cache complex (CCX) as a device would have {ResourceName: "cpu", deviceMultiplier: "8"} in its `nodeAllocatableResources`. If 2 devices (CCX) are allocated to the claim, 2 * 8 = 16 CPUs would be considered as allocated. It is only valid when `capacityKey` and `capacityMultiplier` are not set.

## NodeAllocatableOverhead {#NodeAllocatableOverhead}

NodeAllocatableOverhead defines auxiliary resource overheads incurred when allocating a device. Overheads can be specified as a fixed cost per pod referencing the claim, a variable cost per container reference, or both. Kubelet accounts for this overhead by adding it to both the pod-level and container-level cgroups of referencing containers.

   | Field | Description

       | `perContainer`Quantity
       | PerContainer is applied per container reference to the claim. This models overhead scaling linearly with the number of containers actively using the device. When both PerPod and PerContainer are specified, the total overhead allocated for each pod referencing the claim is computed as: Quantity = PerPod + (PerContainer * NumReferences) Kubelet accounts for this overhead in cgroups: - Pod-level cgroup (requests and limits): Kubelet adds PerPod + (PerContainer * NumReferences). - Container-level cgroup (limits only): Kubelet adds PerPod + PerContainer for each referencing container. This allows any single container to access the pod-level overhead, while the parent cgroup caps the total usage to account for PerPod exactly once.

       | `perPod`Quantity
       | PerPod is overhead applied once per pod referencing the claim on this node. This is a flat overhead incurred for every pod referencing the claim.

## NodeAllocatableResource {#NodeAllocatableResource}

NodeAllocatableResource defines the translation between the DRA device/capacity units requested to the corresponding quantity of the node allocatable resource. At least one of Mapping or Overhead must be specified. Not specifying either is an invalid configuration.

   | Field | Description

       | `mapping`NodeAllocatableMapping
       | Mapping is used when the device directly models a node allocatable resource like standard CPU or memory (e.g., with a CPU DRA driver). The calculated quantity is accounted for exactly once per claim instance on the node. To prevent node cgroup isolation friction, the scheduler explicitly blocks sharing mapped device claims across multiple pods.

       | `overhead`NodeAllocatableOverhead
       | Overhead contains fields for modeling auxiliary overhead incurred on node allocatable resources when allocating devices that are not themselves modeling a node allocatable resource (e.g., host memory overhead for GPUs). Sharing overhead-mapped claims across multiple pods is allowed. The node allocatable overhead is accounted for individually for each pod referencing the claim. Overhead is always subtracted from the node's allocatable capacity for the resource, even when mapping is specified for the same resource. Eg: If a device models memory capacity per socket as a consumable capacity pool via Mapping (with CapacityKey), any overhead specified for the same resource will be subtracted from the node's general allocatable capacity and not from the per-socket capacity pool in Mapping.

## NodeSelectorRequirement {#NodeSelectorRequirement}

A node selector requirement is a selector that contains values, a key, and an operator that relates the key and values.

   | Field | Description

       | `key` *string
       | The label key that the selector applies to.

       | `operator` *string
       | Represents a key's relationship to a set of values. Valid operators are In, NotIn, Exists, DoesNotExist. Gt, and Lt.Possible enum values: - `"DoesNotExist"` - `"Exists"` - `"Gt"` - `"In"` - `"Lt"` - `"NotIn"`

       | `values`string array
       | An array of string values. If the operator is In or NotIn, the values array must be non-empty. If the operator is Exists or DoesNotExist, the values array must be empty. If the operator is Gt or Lt, the values array must have a single element, which will be interpreted as an integer. This array is replaced during a strategic merge patch.
