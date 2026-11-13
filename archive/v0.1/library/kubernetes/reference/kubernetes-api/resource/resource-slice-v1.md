---
title: "ResourceSlice (part 1 of 8)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/resource/resource-slice-v1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# ResourceSlice

`apiVersion: resource.k8s.io/v1`

`import "k8s.io/api/resource/v1"`

## ResourceSlice {#ResourceSlice}

ResourceSlice represents one or more resources in a pool of similar resources, managed by a common driver. A pool may span more than one ResourceSlice, and exactly how many ResourceSlices comprise a pool is determined by the driver.

At the moment, the only supported resources are devices with attributes and capacities. Each device in a given pool, regardless of how many ResourceSlices, must have a unique name. The ResourceSlice in which a device gets published may change over time. The unique identifier for a device is the tuple <driver name>, <pool name>, <device name>.

Whenever a driver needs to update a pool, it increments the pool.Spec.Pool.Generation number and updates all ResourceSlices with that new number and new resource definitions. A consumer must only use ResourceSlices with the highest generation number and ignore all others.

When allocating all resources in a pool matching certain criteria or when looking for the best solution among several different alternatives, a consumer should check the number of ResourceSlices in a pool (included in each ResourceSlice) to determine whether its view of a pool is complete and if not, should wait until the driver has completed updating the pool.

For resources that are not local to a node, the node name is not set. Instead, the driver may use a node selector to specify where the devices are available.

   | Field | Description

       | `apiVersion`string
       | APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

       | `kind`string
       | Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

       | `metadata`ObjectMeta
       | Standard object metadata

       | `spec` *ResourceSliceSpec
       | Contains the information published by the driver.  Changing the spec automatically increments the metadata.generation number.

## ResourceSliceSpec {#ResourceSliceSpec}

ResourceSliceSpec contains the information published by the driver in one ResourceSlice.

   | Field | Description

       | `allNodes`boolean
       | AllNodes indicates that all nodes have access to the resources in the pool.  Exactly one of NodeName, NodeSelector, AllNodes, and PerDeviceNodeSelection must be set.

       | `devices`Device array
       | Devices lists some or all of the devices in this pool.  Must not have more than 128 entries. If any device uses taints or consumes counters the limit is 64.  Only one of Devices and SharedCounters can be set in a ResourceSlice.

       | `driver` *string
       | Driver identifies the DRA driver providing the capacity information. A field selector can be used to list only ResourceSlice objects with a certain driver name.  Must be a DNS subdomain and should end with a DNS domain owned by the vendor of the driver. It should use only lower case characters. This field is immutable.

       | `nodeName`string
       | NodeName identifies the node which provides the resources in this pool. A field selector can be used to list only ResourceSlice objects belonging to a certain node.  This field can be used to limit access from nodes to ResourceSlices with the same node name. It also indicates to autoscalers that adding new nodes of the same type as some old node might also make new resources available.  Exactly one of NodeName, NodeSelector, AllNodes, and PerDeviceNodeSelection must be set. This field is immutable.

       | `nodeSelector`NodeSelector
       | NodeSelector defines which nodes have access to the resources in the pool, when that pool is not limited to a single node.  Must use exactly one term.  Exactly one of NodeName, NodeSelector, AllNodes, and PerDeviceNodeSelection must be set.

       | `partitionTypeAttribute`string
       | PartitionTypeAttribute names a string device attribute (by fully qualified name, e.g. "gpu.example.com/profile") whose value labels each device with its partition type, such as "Full" or "Half" for a MIG-style GPU.  When set, every partitionable device in the slice must carry the attribute and devices sharing a value must share the same ConsumesCounters cost.

       | `perDeviceNodeSelection`boolean
       | PerDeviceNodeSelection defines whether the access from nodes to resources in the pool is set on the ResourceSlice level or on each device. If it is set to true, every device defined the ResourceSlice must specify this individually.  Exactly one of NodeName, NodeSelector, AllNodes, and PerDeviceNodeSelection must be set.

       | `pool` *ResourcePool
       | Pool describes the pool that this ResourceSlice belongs to.

       | `sharedCounters`CounterSet array
       | SharedCounters defines a list of counter sets, each of which has a name and a list of counters available.  The names of the counter sets must be unique in the ResourcePool.  Only one of Devices and SharedCounters can be set in a ResourceSlice.  The maximum number of counter sets is 8.

       | `skipNodeOperations`string array
       | SkipNodeOperations lists node-local resource operations (gRPC calls) that will be skipped for the devices in this slice when determining whether operations are necessary on the node. If all allocated devices for a driver in a claim skip an operation, that gRPC call will be skipped. Valid values are:  - "NodePrepareResources": NodePrepareResources gRPC calls are skipped. This   value cannot be specified unless "NodeUnprepareResources" is also listed   (or "*" is specified). - "NodeUnprepareResources": NodeUnprepareResources gRPC calls are skipped. - "*": All node-local resource operations are skipped.  Other values may be added in the future. The kubelet must ignore unknown values.

## ResourceSliceList {#ResourceSliceList}

ResourceSliceList is a collection of ResourceSlices.

   | Field | Description

       | `apiVersion`string
       | APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

       | `items` *ResourceSlice array
       | Items is the list of resource ResourceSlices.

       | `kind`string
       | Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

       | `metadata`ListMeta
       | Standard list metadata

## CapacityRequestPolicy {#CapacityRequestPolicy}

CapacityRequestPolicy defines how requests consume device capacity.

Must not set more than one ValidRequestValues.

   | Field | Description

       | `default`Quantity
       | Default specifies how much of this capacity is consumed by a request that does not contain an entry for it in DeviceRequest's Capacity.

       | `validRange`CapacityRequestPolicyRange
       | ValidRange defines an acceptable quantity value range in consuming requests.  If this field is set, Default must be defined and it must fall within the defined ValidRange.  If the requested amount does not fall within the defined range, the request violates the policy, and this device cannot be allocated.  If the request doesn't contain this capacity entry, Default value is used.

       | `validValues`Quantity array
       | ValidValues defines a set of acceptable quantity values in consuming requests.  Must not contain more than 10 entries. Must be sorted in ascending order.  If this field is set, Default must be defined and it must be included in ValidValues list.  If the requested amount does not match any valid value but smaller than some valid values, the scheduler calculates the smallest valid value that is greater than or equal to the request. That is: min(ceil(requestedValue) ∈ validValues), where requestedValue ≤ max(validValues).  If the requested amount exceeds all valid values, the request violates the policy, and this device cannot be allocated.

## CapacityRequestPolicyRange {#CapacityRequestPolicyRange}

CapacityRequestPolicyRange defines a valid range for consumable capacity values.

If the DRAFractionalCapacityRange feature gate is enabled and at least one of Min, Max, or Step is a fractional quantity (i.e. its value is not an integer), milli-unit arithmetic is used instead, supporting values with up to 3 decimal places (e.g. 100m = 0.1). The largest supported value then is 1000 times smaller compared to using 64-bit integers. Otherwise, all comparisons use 64-bit integer arithmetic via resource.Quantity.Value().

  - If the requested amount is less than Min, it is rounded up to the Min value.
  - If Step is set and the requested amount is between Min and Max but not aligned with Step,
    it will be rounded up to the next value equal to Min + (n * Step).
  - If Step is not set, the requested amount is used as-is if it falls within the range Min to Max (if set).
  - If the requested or rounded amount exceeds Max (if set), the request does not satisfy the policy,
    and the device cannot be allocated.

   | Field | Description

       | `max`Quantity
       | Max defines the upper limit for capacity that can be requested.  Max must be less than or equal to the capacity value. Min and requestPolicy.default must be less than or equal to the maximum.

       | `min` *Quantity
       | Min specifies the minimum capacity allowed for a consumption request.  Min must be greater than or equal to zero, and less than or equal to the capacity value. requestPolicy.default must be more than or equal to the minimum.

       | `step`Quantity
       | Step defines the step size between valid capacity amounts within the range.  Max (if set) and requestPolicy.default must be a multiple of Step. Min + Step must be less than or equal to the capacity value.

## Counter {#Counter}

Counter describes a quantity associated with a device.

   | Field | Description

       | `value` *Quantity
       | Value defines how much of a certain device counter is available.

## CounterSet {#CounterSet}

CounterSet defines a named set of counters that are available to be used by devices defined in the ResourcePool.

The counters are not allocatable by themselves, but can be referenced by devices. When a device is allocated, the portion of counters it uses will no longer be available for use by other devices.

   | Field | Description

       | `counters` *object
       | Counters defines the set of counters for this CounterSet The name of each counter must be unique in that set and must be a DNS label.  The maximum number of counters is 32.

       | `name` *string
       | Name defines the name of the counter set. It must be a DNS label.
