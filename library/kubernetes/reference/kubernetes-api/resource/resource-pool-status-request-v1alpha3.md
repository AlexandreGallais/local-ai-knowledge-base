---
title: "ResourcePoolStatusRequest (part 1 of 6)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/resource/resource-pool-status-request-v1alpha3.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# ResourcePoolStatusRequest

`apiVersion: resource.k8s.io/v1alpha3`

`import "k8s.io/api/resource/v1alpha3"`

## ResourcePoolStatusRequest {#ResourcePoolStatusRequest}

ResourcePoolStatusRequest triggers a one-time calculation of resource pool status based on the provided filters. Once status is set, the request is considered complete and will not be reprocessed. Users should delete and recreate requests to get updated information.

   | Field | Description

       | `apiVersion`string
       | APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

       | `kind`string
       | Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

       | `metadata` *ObjectMeta
       | Standard object metadata

       | `spec` *ResourcePoolStatusRequestSpec
       | Spec defines the filters for which pools to include in the status. The spec is immutable once created.

       | `status`ResourcePoolStatusRequestStatus
       | Status is populated by the controller with the calculated pool status. When status is non-nil, the request is considered complete and the entire object becomes immutable.

## ResourcePoolStatusRequestSpec {#ResourcePoolStatusRequestSpec}

ResourcePoolStatusRequestSpec defines the filters for the pool status request.

   | Field | Description

       | `defaultPartitionTypeAttribute`string
       | DefaultPartitionTypeAttribute optionally names a device attribute (by its fully qualified name, e.g. "gpu.example.com/profile") to use as the default grouping attribute for partitionable devices whose slice has not declared one themselves.  A slice's own PartitionTypeAttribute always takes precedence. This default applies only to devices whose slice does not declare one, so that a request can still get an accurate partitionSummary from a driver that has not been updated to declare it. When neither the slice nor this default names an attribute, a partitionable pool reports no partitionSummary.  Must include the domain qualifier.

       | `driver` *string
       | Driver specifies the DRA driver name to filter pools. Only pools from ResourceSlices with this driver will be included. Must be a DNS subdomain (e.g., "gpu.example.com").

       | `limit`integer
       | Limit optionally specifies the maximum number of pools to return in the status. If more pools match the filter criteria, the response will be truncated (i.e., len(status.pools) \< status.poolCount).  Default: 100 Minimum: 1 Maximum: 1000

       | `poolName`string
       | PoolName optionally filters to a specific pool name. If not specified, all pools from the specified driver are included. When specified, must be a non-empty valid resource pool name (DNS subdomains separated by "/").

## ResourcePoolStatusRequestStatus {#ResourcePoolStatusRequestStatus}

ResourcePoolStatusRequestStatus contains the calculated pool status information.

   | Field | Description

       | `conditions`Condition arraypatch strategy: merge on key `type`
       | Conditions provide information about the state of the request. A condition with type=Complete or type=Failed will always be set when the status is populated.  Known condition types: - "Complete": True when the request has been processed successfully - "Failed": True when the request could not be processed

       | `poolCount` *integer
       | PoolCount is the total number of pools that matched the filter criteria, regardless of truncation. This helps users understand how many pools exist even when the response is truncated. A value of 0 means no pools matched the filter criteria.

       | `pools`PoolStatus array
       | Pools contains the first `spec.limit` matching pools, sorted by driver then pool name. If `len(pools) \< poolCount`, the list was truncated. When omitted, no pools matched the request filters.

## ResourcePoolStatusRequestList {#ResourcePoolStatusRequestList}

ResourcePoolStatusRequestList is a collection of ResourcePoolStatusRequests.

   | Field | Description

       | `apiVersion`string
       | APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

       | `items` *ResourcePoolStatusRequest array
       | Items is the list of ResourcePoolStatusRequests.

       | `kind`string
       | Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

       | `metadata`ListMeta
       | Standard list metadata

## PartitionTypeStatus {#PartitionTypeStatus}

PartitionTypeStatus reports allocatability for a single partition type, identified by the value of a grouping attribute.

   | Field | Description

       | `allocatable` *integer
       | Allocatable is the number of additional devices of this partition type that could still be allocated given current shared-counter consumption.

       | `attribute` *string
       | Attribute is the fully qualified name of the device attribute whose value groups this entry. It is the PartitionTypeAttribute declared by the devices' own slice, or the default named in the request when their slice declares none.

       | `total` *integer
       | Total is the number of devices of this partition type in the pool.

       | `type` *string
       | Type is the partition type value (e.g. "Full" or "Half").

## PoolStatus {#PoolStatus}

PoolStatus contains status information for a single resource pool.

   | Field | Description

       | `allocatedDevices`integer
       | AllocatedDevices is the number of devices currently allocated to claims. A value of 0 means no devices are allocated. May be unset when validationError is set.

       | `availableDevices`integer
       | AvailableDevices is the number of devices available for allocation. This equals TotalDevices - AllocatedDevices - UnavailableDevices. A value of 0 means no devices are currently available. May be unset when validationError is set.

       | `driver` *string
       | Driver is the DRA driver name for this pool. Must be a DNS subdomain (e.g., "gpu.example.com").

       | `generation` *integer
       | Generation is the pool generation observed across all ResourceSlices in this pool. Only the latest generation is reported. During a generation rollout, if not all slices at the latest generation have been published, the pool is included with a validationError and device counts unset.

       | `nodeName`string
       | NodeName is the node this pool is associated with. When omitted, the pool is not associated with a specific node. Must be a valid DNS subdomain name (RFC1123).

       | `partitionSummary`PartitionTypeStatus array
       | PartitionSummary reports allocatability per (attribute, partition type) for a partitionable pool that publishes SharedCounters. Each entry names the grouping attribute it was resolved from: the PartitionTypeAttribute declared by a device's own slice, or for devices whose slice declares none, the default named in the request. A pool that mixes partitions declared under different attributes reports each independently. When no slice declares an attribute and the request names no default, the pool reports no partition summary.

       | `poolName` *string
       | PoolName is the name of the pool. Must be a valid resource pool name (DNS subdomains separated by "/").

       | `resourceSliceCount`integer
       | ResourceSliceCount is the number of ResourceSlices that make up this pool. May be unset when validationError is set.

       | `shareableSummary`ShareableSummaryStatus
       | ShareableSummary reports aggregate capacity for a pool that contains devices with AllowMultipleAllocations. It is populated only when at least one device in the pool is shareable.

       | `totalDevices`integer
       | TotalDevices is the total number of devices in the pool across all slices. A value of 0 means the pool has no devices. May be unset when validationError is set.

       | `unavailableDevices`integer
       | UnavailableDevices is the number of devices that are not available due to taints or other conditions, but are not allocated. A value of 0 means all unallocated devices are available. May be unset when validationError is set.

       | `validationError`string
       | ValidationError is set when the pool's data could not be fully validated (e.g., incomplete slice publication). When set, device count fields and ResourceSliceCount may be unset.

## ShareableCapacityStatus {#ShareableCapacityStatus}

ShareableCapacityStatus reports aggregate amounts for a single shareable capacity key.

   | Field | Description

       | `available` *Quantity
       | Available is Total minus Consumed, never negative.

       | `consumed` *Quantity
       | Consumed is the amount drawn by current allocations.

       | `name` *string
       | Name is the capacity name.

       | `total` *Quantity
       | Total is the sum of this capacity across shareable devices in the pool.

## ShareableSummaryStatus {#ShareableSummaryStatus}

ShareableSummaryStatus reports aggregate capacity for a pool that contains devices with AllowMultipleAllocations.

   | Field | Description

       | `capacity`ShareableCapacityStatus array
       | Capacity reports aggregate total, consumed, and available amounts per shareable capacity key across the pool.

       | `fullyAvailableDevices` *integer
       | FullyAvailableDevices is the number of shareable devices with no capacity consumed.

       | `partiallyAvailableDevices` *integer
       | PartiallyAvailableDevices is the number of shareable devices with some but not all capacity consumed.
