---
title: "ResourceClaim (part 1 of 10)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/resource/resource-claim-v1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# ResourceClaim

`apiVersion: resource.k8s.io/v1`

`import "k8s.io/api/resource/v1"`

## ResourceClaim {#ResourceClaim}

ResourceClaim describes a request for access to resources in the cluster, for use by workloads. For example, if a workload needs an accelerator device with specific properties, this is how that request is expressed. The status stanza tracks whether this claim has been satisfied and what specific resources have been allocated.

   | Field | Description

       | `apiVersion`string
       | APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

       | `kind`string
       | Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

       | `metadata`ObjectMeta
       | Standard object metadata

       | `spec`ResourceClaimSpec
       | Spec describes what is being requested and how to configure it. The spec is immutable.

       | `status`ResourceClaimStatus
       | Status describes whether the claim is ready to use and what has been allocated.

## ResourceClaimSpec {#ResourceClaimSpec}

ResourceClaimSpec defines what is being requested in a ResourceClaim and how to configure it.

   | Field | Description

       | `devices`DeviceClaim
       | Devices defines how to request devices.

## ResourceClaimStatus {#ResourceClaimStatus}

ResourceClaimStatus tracks whether the resource has been allocated and what the result of that was.

   | Field | Description

       | `allocation`AllocationResult
       | Allocation is set once the claim has been allocated successfully.

       | `devices`AllocatedDeviceStatus array
       | Devices contains the status of each device allocated for this claim, as reported by the driver. This can include driver-specific information. Entries are owned by their respective drivers.

       | `reservedFor`ResourceClaimConsumerReference arraypatch strategy: merge on key `uid`
       | ReservedFor indicates which entities are currently allowed to use the claim. A Pod which references a ResourceClaim which is not reserved for that Pod will not be started. A claim that is in use or might be in use because it has been reserved must not get deallocated.  In a cluster with multiple scheduler instances, two pods might get scheduled concurrently by different schedulers. When they reference the same ResourceClaim which already has reached its maximum number of consumers, only one pod can be scheduled.  Both schedulers try to add their pod to the claim.status.reservedFor field, but only the update that reaches the API server first gets stored. The other one fails with an error and the scheduler which issued it knows that it must put the pod back into the queue, waiting for the ResourceClaim to become usable again.  There can be at most 256 such reservations. This may get increased in the future, but not reduced.

## ResourceClaimList {#ResourceClaimList}

ResourceClaimList is a collection of claims.

   | Field | Description

       | `apiVersion`string
       | APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

       | `items` *ResourceClaim array
       | Items is the list of resource claims.

       | `kind`string
       | Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

       | `metadata`ListMeta
       | Standard list metadata

## AllocatedDeviceStatus {#AllocatedDeviceStatus}

AllocatedDeviceStatus contains the status of an allocated device, if the driver chooses to report it. This may include driver-specific information.

The combination of Driver, Pool, Device, and ShareID must match the corresponding key in Status.Allocation.Devices.

   | Field | Description

       | `conditions`Condition array
       | Conditions contains the latest observation of the device's state. If the device has been configured according to the class and claim config references, the `Ready` condition should be True.  Must not contain more than 8 entries.

       | `data`
       | Data contains arbitrary driver-specific data.  The length of the raw data must be smaller or equal to 10 Ki.

       | `device` *string
       | Device references one device instance via its name in the driver's resource pool. It must be a DNS label.

       | `driver` *string
       | Driver specifies the name of the DRA driver whose kubelet plugin should be invoked to process the allocation once the claim is needed on a node.  Must be a DNS subdomain and should end with a DNS domain owned by the vendor of the driver. It should use only lower case characters.

       | `networkData`NetworkDeviceData
       | NetworkData contains network-related information specific to the device.

       | `pool` *string
       | This name together with the driver name and the device name field identify which device was allocated (`\<driver name>/\<pool name>/\<device name>`).  Must not be longer than 253 characters and may contain one or more DNS sub-domains separated by slashes.

       | `shareID`string
       | ShareID uniquely identifies an individual allocation share of the device.

## AllocationResult {#AllocationResult}

AllocationResult contains attributes of an allocated resource.

   | Field | Description

       | `allocationTimestamp`Time
       | AllocationTimestamp stores the time when the resources were allocated. This field is not guaranteed to be set, in which case that time is unknown.  This is a beta field and requires enabling the DRADeviceBindingConditions and DRAResourceClaimDeviceStatus feature gate.

       | `devices`DeviceAllocationResult
       | Devices is the result of allocating devices.

       | `nodeSelector`NodeSelector
       | NodeSelector defines where the allocated resources are available. If unset, they are available everywhere.

## CapacityRequirements {#CapacityRequirements}

CapacityRequirements defines the capacity requirements for a specific device request.

   | Field | Description

       | `requests`object
       | Requests represent individual device resource requests for distinct resources, all of which must be provided by the device.  This value is used as an additional filtering condition against the available capacity on the device. This is semantically equivalent to a CEL selector with `device.capacity[\<domain>].\<name>.compareTo(quantity(\<request quantity>)) >= 0`. For example, device.capacity['test-driver.cdi.k8s.io'].counters.compareTo(quantity('2')) >= 0.  When a requestPolicy is defined, the requested amount is adjusted upward to the nearest valid value based on the policy. If the requested amount cannot be adjusted to a valid value—because it exceeds what the requestPolicy allows— the device is considered ineligible for allocation.  For any capacity that is not explicitly requested: - If no requestPolicy is set, the default consumed capacity is equal to the full device capacity   (i.e., the whole device is claimed). - If a requestPolicy is set, the default consumed capacity is determined according to that policy.  If the device allows multiple allocation, the aggregated amount across all requests must not exceed the capacity value. The consumed capacity, which may be adjusted based on the requestPolicy if defined, is recorded in the resource claim’s status.devices[*].consumedCapacity field.

## DeviceAllocationConfiguration {#DeviceAllocationConfiguration}

DeviceAllocationConfiguration gets embedded in an AllocationResult.

   | Field | Description

       | `opaque`OpaqueDeviceConfiguration
       | Opaque provides driver-specific configuration parameters.

       | `requests`string array
       | Requests lists the names of requests where the configuration applies. If empty, its applies to all requests.  References to subrequests must include the name of the main request and may include the subrequest using the format \[/\<subrequest>]. If just the main request is given, the configuration applies to all subrequests.

       | `source` *string
       | Source records whether the configuration comes from a class and thus is not something that a normal user would have been able to set or from a claim.Possible enum values: - `"FromClaim"` - `"FromClass"`

## DeviceAllocationResult {#DeviceAllocationResult}

DeviceAllocationResult is the result of allocating devices.

   | Field | Description

       | `config`DeviceAllocationConfiguration array
       | This field is a combination of all the claim and class configuration parameters. Drivers can distinguish between those based on a flag.  This includes configuration parameters for drivers which have no allocated devices in the result because it is up to the drivers which configuration parameters they support. They can silently ignore unknown configuration parameters.

       | `results`DeviceRequestAllocationResult array
       | Results lists all allocated devices.

## DeviceClaim {#DeviceClaim}

DeviceClaim defines how to request devices with a ResourceClaim.

   | Field | Description

       | `config`DeviceClaimConfiguration array
       | This field holds configuration for multiple potential drivers which could satisfy requests in this claim. It is ignored while allocating the claim.

       | `constraints`DeviceConstraint array
       | These constraints must be satisfied by the set of devices that get allocated for the claim.

       | `requests`DeviceRequest array
       | Requests represent individual requests for distinct devices which must all be satisfied. If empty, nothing needs to be allocated.

## DeviceClaimConfiguration {#DeviceClaimConfiguration}

DeviceClaimConfiguration is used for configuration parameters in DeviceClaim.

   | Field | Description

       | `opaque`OpaqueDeviceConfiguration
       | Opaque provides driver-specific configuration parameters.

       | `requests`string array
       | Requests lists the names of requests where the configuration applies. If empty, it applies to all requests.  References to subrequests must include the name of the main request and may include the subrequest using the format \[/\<subrequest>]. If just the main request is given, the configuration applies to all subrequests.

## DeviceConstraint {#DeviceConstraint}

DeviceConstraint must have exactly one field set besides Requests.

   | Field | Description

       | `distinctAttribute`string
       | DistinctAttribute requires that all devices in question have this attribute and that its type and value are unique across those devices.  When the DRAListTypeAttributes feature gate is enabled, comparison uses set semantics (i.e., element order and duplicates are ignored): list-valued attributes must be pairwise disjoint across devices. Scalar values are treated as singleton sets for backward compatibility.  This acts as the inverse of MatchAttribute.  This constraint is used to avoid allocating multiple requests to the same device by ensuring attribute-level differentiation.  This is useful for scenarios where resource requests must be fulfilled by separate physical devices. For example, a container requests two network interfaces that must be allocated from two different physical NICs.

       | `matchAttribute`string
       | MatchAttribute requires that all devices in question have this attribute and that its type and value are the same across those devices.  For example, if you specified "dra.example.com/numa" (a hypothetical example!), then only devices in the same NUMA node will be chosen. A device which does not have that attribute will not be chosen. All devices should use a value of the same type for this attribute because that is part of its specification, but if one device doesn't, then it also will not be chosen.  When the DRAListTypeAttributes feature gate is enabled, comparison uses set semantics(i.e., element order and duplicates are ignored): list-valued attributes match when the intersection across all devices is non-empty. Scalar values are treated as single-element lists for backward compatibility.  Must include the domain qualifier.

       | `requests`string array
       | Requests is a list of the one or more requests in this claim which must co-satisfy this constraint. If a request is fulfilled by multiple devices, then all of the devices must satisfy the constraint. If this is not specified, this constraint applies to all requests in this claim.  References to subrequests must include the name of the main request and may include the subrequest using the format \[/\<subrequest>]. If just the main request is given, the constraint applies to all subrequests.
