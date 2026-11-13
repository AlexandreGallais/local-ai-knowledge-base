---
title: "ResourceClaim (part 3 of 10)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/resource/resource-claim-v1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# ResourceClaim (part 3 of 10)

## ExactDeviceRequest {#ExactDeviceRequest}

ExactDeviceRequest is a request for one or more identical devices.

   | Field | Description

       | `adminAccess`boolean
       | AdminAccess indicates that this is a claim for administrative access to the device(s). Claims with AdminAccess are expected to be used for monitoring or other management services for a device.  They ignore all ordinary claims to the device with respect to access modes and any resource allocations.  Admin access is disabled if this field is unset or set to false, otherwise it is enabled.

       | `allocationMode`string
       | AllocationMode and its related fields define how devices are allocated to satisfy this request. Supported values are:  - ExactCount: This request is for a specific number of devices.   This is the default. The exact number is provided in the   count field.  - All: This request is for all of the matching devices in a pool.   At least one device must exist on the node for the allocation to succeed.   Allocation will fail if some devices are already allocated,   unless adminAccess is requested.  If AllocationMode is not specified, the default mode is ExactCount. If the mode is ExactCount and count is not specified, the default count is one. Any other requests must specify this field.  More modes may get added in the future. Clients must refuse to handle requests with unknown modes.Possible enum values: - `"All"` - `"ExactCount"`

       | `capacity`CapacityRequirements
       | Capacity define resource requirements against each capacity.  If this field is unset and the device supports multiple allocations, the default value will be applied to each capacity according to requestPolicy. For the capacity that has no requestPolicy, default is the full capacity value.  Applies to each device allocation. If Count > 1, the request fails if there aren't enough devices that meet the requirements. If AllocationMode is set to All, the request fails if there are devices that otherwise match the request, and have this capacity, with a value >= the requested amount, but which cannot be allocated to this request.

       | `count`integer
       | Count is used only when the count mode is "ExactCount". Must be greater than zero. If AllocationMode is ExactCount and this field is not specified, the default is one.

       | `derivedAttributes`DeviceDerivedAttribute array
       | DerivedAttributes defines a set of virtual attributes computed via CEL expressions for each candidate device. These virtual attributes can be referenced in `.devices.constraints` to align and match different devices (e.g., co-allocating a GPU and a NIC on the same NUMA node) even if their drivers publish different attributes. Derived attributes are not available via `device.attributes` in the CEL environment when evaluating selector expressions.  Derived attributes allow you to extract, transform, or normalize topology information (such as extracting a NUMA index from a complex topology string or renaming a vendor-specific attribute) into a common virtual attribute name at scheduling time. The scheduler then evaluates these virtual attributes exactly like static attributes when matching constraints.  Every derived attribute defined in this list must be referenced by at least one MatchAttribute or DistinctAttribute constraint in the `.devices.constraints` list.  The maximum number of derived attributes is 32.  This is an alpha field and requires enabling the DRADerivedAttributes feature gate.

       | `deviceClassName` *string
       | DeviceClassName references a specific DeviceClass, which can define additional configuration and selectors to be inherited by this request.  A DeviceClassName is required.  Administrators may use this to restrict which devices may get requested by only installing classes with selectors for permitted devices. If users are free to request anything without restrictions, then administrators can create an empty DeviceClass for users to reference.

       | `selectors`DeviceSelector array
       | Selectors define criteria which must be satisfied by a specific device in order for that device to be considered for this request. All selectors must be satisfied for a device to be considered.

       | `tolerations`DeviceToleration array
       | If specified, the request's tolerations.  Tolerations for NoSchedule are required to allocate a device which has a taint with that effect. The same applies to NoExecute.  In addition, should any of the allocated devices get tainted with NoExecute after allocation and that effect is not tolerated, then all pods consuming the ResourceClaim get deleted to evict them. The scheduler will not let new pods reserve the claim while it has these tainted devices. Once all pods are evicted, the claim will get deallocated.  The maximum number of tolerations is 16.  This is a beta field and requires enabling the DRADeviceTaints feature gate.

## NetworkDeviceData {#NetworkDeviceData}

NetworkDeviceData provides network-related details for the allocated device. This information may be filled by drivers or other components to configure or identify the device within a network context.

   | Field | Description

       | `hardwareAddress`string
       | HardwareAddress represents the hardware address (e.g. MAC Address) of the device's network interface.  Must not be longer than 128 bytes.

       | `interfaceName`string
       | InterfaceName specifies the name of the network interface associated with the allocated device. This might be the name of a physical or virtual network interface being configured in the pod.  Must not be longer than 256 bytes.

       | `ips`string array
       | IPs lists the network addresses assigned to the device's network interface. This can include both IPv4 and IPv6 addresses. The IPs are in the CIDR notation, which includes both the address and the associated subnet mask. e.g.: "192.0.2.5/24" for IPv4 and "2001:db8::5/64" for IPv6.

## ResourceClaimConsumerReference {#ResourceClaimConsumerReference}

ResourceClaimConsumerReference contains enough information to let you locate the consumer of a ResourceClaim. The user must be a resource in the same namespace as the ResourceClaim.

   | Field | Description

       | `apiGroup`string
       | APIGroup is the group for the resource being referenced. It is empty for the core API. This matches the group in the APIVersion that is used when creating the resources.

       | `name` *string
       | Name is the name of resource being referenced.

       | `resource` *string
       | Resource is the type of resource being referenced, for example "pods".

       | `uid` *string
       | UID identifies exactly one incarnation of the resource.
