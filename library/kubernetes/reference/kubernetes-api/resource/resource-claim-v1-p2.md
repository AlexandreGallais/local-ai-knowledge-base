---
title: "ResourceClaim (part 2 of 10)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/resource/resource-claim-v1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# ResourceClaim (part 2 of 10)

## DeviceDerivedAttribute {#DeviceDerivedAttribute}

DeviceDerivedAttribute defines a derived attribute computed via CEL.

   | Field | Description

       | `expression` *string
       | Expression is a CEL expression evaluated against each candidate device. The expression must evaluate to a primitive scalar (string, integer, boolean, or semver) or a list of these scalars ([]string, []int64, []bool, []semver) to act as a virtual grouping key. Any other return type is an error and causes CEL evaluation for the device to fail.  The expression's input is an object named "device", which carries the same properties as in a CELDeviceSelector.  When pod scheduling encounters CEL runtime errors (such as looking up an attribute that isn't defined) for some devices, it will abort allocation and fail scheduling for the Pod. Surfacing evaluation errors immediately prevents silent topology matching failures that are extremely hard to detect. A robust expression should, for example, check for the existence of attributes before referencing them to avoid runtime evaluation errors.  The expression gets evaluated after a device has passed the other selector expressions for the request in which this expression is used. This allows writing expressions that are tailored towards the specific devices being requested (for example, by assuming the device is from a certain vendor and skipping those checks).  The length of the expression must be smaller or equal to 10 Ki. The cost of evaluating it is also limited based on the estimated number of logical steps; the combined cost of all derived attributes in a claim is capped by a shared CEL cost budget.

       | `name` *string
       | Name is the identifier for this derived attribute, used in constraints.  It must be a DNS subdomain followed by a slash ("/") followed by a C identifier (e.g. "example.com/numaNode" or "derived/numaNode").  If the chosen name matches an existing physical attribute from a driver, the derived attribute's expression will shadow the physical attribute, and its evaluated value will be used in constraints instead. When the goal is to define a derived attribute that is only used within the ResourceClaim and not meant to shadow an existing attribute, use a domain prefix that no DRA driver should be using (e.g. "derived/myAttribute").  It is not valid to define a derived attribute that isn't used in at least one constraint.

## DeviceRequest {#DeviceRequest}

DeviceRequest is a request for devices required for a claim. This is typically a request for a single resource like a device, but can also ask for several identical devices. With FirstAvailable it is also possible to provide a prioritized list of requests.

   | Field | Description

       | `exactly`ExactDeviceRequest
       | Exactly specifies the details for a single request that must be met exactly for the request to be satisfied.  One of Exactly or FirstAvailable must be set.

       | `firstAvailable`DeviceSubRequest array
       | FirstAvailable contains subrequests, of which exactly one will be selected by the scheduler. It tries to satisfy them in the order in which they are listed here. So if there are two entries in the list, the scheduler will only check the second one if it determines that the first one can not be used.  DRA does not yet implement scoring, so the scheduler will select the first set of devices that satisfies all the requests in the claim. And if the requirements can be satisfied on more than one node, other scheduling features will determine which node is chosen. This means that the set of devices allocated to a claim might not be the optimal set available to the cluster. Scoring will be implemented later.

       | `name` *string
       | Name can be used to reference this request in a pod.spec.containers[].resources.claims entry and in a constraint of the claim.  References using the name in the DeviceRequest will uniquely identify a request when the Exactly field is set. When the FirstAvailable field is set, a reference to the name of the DeviceRequest will match whatever subrequest is chosen by the scheduler.  Must be a DNS label.

## DeviceRequestAllocationResult {#DeviceRequestAllocationResult}

DeviceRequestAllocationResult contains the allocation result for one request.

   | Field | Description

       | `adminAccess`boolean
       | AdminAccess indicates that this device was allocated for administrative access. See the corresponding request field for a definition of mode.  Admin access is disabled if this field is unset or set to false, otherwise it is enabled.

       | `bindingConditions`string array
       | BindingConditions contains a copy of the BindingConditions from the corresponding ResourceSlice at the time of allocation.  This is a beta field and requires enabling the DRADeviceBindingConditions and DRAResourceClaimDeviceStatus feature gates.

       | `bindingFailureConditions`string array
       | BindingFailureConditions contains a copy of the BindingFailureConditions from the corresponding ResourceSlice at the time of allocation.  This is a beta field and requires enabling the DRADeviceBindingConditions and DRAResourceClaimDeviceStatus feature gates.

       | `consumedCapacity`object
       | ConsumedCapacity tracks the amount of capacity consumed per device as part of the claim request. The consumed amount may differ from the requested amount: it is rounded up to the nearest valid value based on the device’s requestPolicy if applicable (i.e., may not be less than the requested amount).  The total consumed capacity for each device must not exceed the DeviceCapacity's Value.  This field is populated only for devices that allow multiple allocations. All capacity entries are included, even if the consumed amount is zero.

       | `device` *string
       | Device references one device instance via its name in the driver's resource pool. It must be a DNS label.

       | `driver` *string
       | Driver specifies the name of the DRA driver whose kubelet plugin should be invoked to process the allocation once the claim is needed on a node.  Must be a DNS subdomain and should end with a DNS domain owned by the vendor of the driver. It should use only lower case characters.

       | `pool` *string
       | This name together with the driver name and the device name field identify which device was allocated (`\<driver name>/\<pool name>/\<device name>`).  Must not be longer than 253 characters and may contain one or more DNS sub-domains separated by slashes.

       | `request` *string
       | Request is the name of the request in the claim which caused this device to be allocated. If it references a subrequest in the firstAvailable list on a DeviceRequest, this field must include both the name of the main request and the subrequest using the format \/\<subrequest>.  Multiple devices may have been allocated per request.

       | `shareID`string
       | ShareID uniquely identifies an individual allocation share of the device, used when the device supports multiple simultaneous allocations. It serves as an additional map key to differentiate concurrent shares of the same device.

       | `skipNodeOperations`string array
       | SkipNodeOperations lists node-local resource operations (gRPC calls) that will be skipped for this allocated device when determining whether operations are necessary on the node. If all allocated devices for a driver in a claim skip an operation, that gRPC call will be skipped. It is a copy of the ResourceSlice.spec.skipNodeOperations value at the time when the device was allocated.

       | `tolerations`DeviceToleration array
       | A copy of all tolerations specified in the request at the time when the device got allocated.  The maximum number of tolerations is 16.  This is a beta field and requires enabling the DRADeviceTaints feature gate.

## DeviceSubRequest {#DeviceSubRequest}

DeviceSubRequest describes a request for device provided in the claim.spec.devices.requests[].firstAvailable array. Each is typically a request for a single resource like a device, but can also ask for several identical devices.

DeviceSubRequest is similar to ExactDeviceRequest, but doesn't expose the AdminAccess field as that one is only supported when requesting a specific device.

   | Field | Description

       | `allocationMode`string
       | AllocationMode and its related fields define how devices are allocated to satisfy this subrequest. Supported values are:  - ExactCount: This request is for a specific number of devices.   This is the default. The exact number is provided in the   count field.  - All: This subrequest is for all of the matching devices in a pool.   Allocation will fail if some devices are already allocated,   unless adminAccess is requested.  If AllocationMode is not specified, the default mode is ExactCount. If the mode is ExactCount and count is not specified, the default count is one. Any other subrequests must specify this field.  More modes may get added in the future. Clients must refuse to handle requests with unknown modes.Possible enum values: - `"All"` - `"ExactCount"`

       | `capacity`CapacityRequirements
       | Capacity define resource requirements against each capacity.  If this field is unset and the device supports multiple allocations, the default value will be applied to each capacity according to requestPolicy. For the capacity that has no requestPolicy, default is the full capacity value.  Applies to each device allocation. If Count > 1, the request fails if there aren't enough devices that meet the requirements. If AllocationMode is set to All, the request fails if there are devices that otherwise match the request, and have this capacity, with a value >= the requested amount, but which cannot be allocated to this request.

       | `count`integer
       | Count is used only when the count mode is "ExactCount". Must be greater than zero. If AllocationMode is ExactCount and this field is not specified, the default is one.

       | `derivedAttributes`DeviceDerivedAttribute array
       | DerivedAttributes defines a set of virtual attributes computed via CEL expressions for each candidate device. These virtual attributes can be referenced in `.devices.constraints` to align and match different devices (e.g., co-allocating a GPU and a NIC on the same NUMA node) even if their drivers publish different attributes. Derived attributes are not available via `device.attributes` in the CEL environment when evaluating selector expressions.  Derived attributes allow you to extract, transform, or normalize topology information (such as extracting a NUMA index from a complex topology string or renaming a vendor-specific attribute) into a common virtual attribute name at scheduling time. The scheduler then evaluates these virtual attributes exactly like static attributes when matching constraints.  Every derived attribute defined in this list must be referenced by at least one MatchAttribute or DistinctAttribute constraint in the `.devices.constraints` list.  The maximum number of derived attributes is 32.  This is an alpha field and requires enabling the DRADerivedAttributes feature gate.

       | `deviceClassName` *string
       | DeviceClassName references a specific DeviceClass, which can define additional configuration and selectors to be inherited by this subrequest.  A class is required. Which classes are available depends on the cluster.  Administrators may use this to restrict which devices may get requested by only installing classes with selectors for permitted devices. If users are free to request anything without restrictions, then administrators can create an empty DeviceClass for users to reference.

       | `name` *string
       | Name can be used to reference this subrequest in the list of constraints or the list of configurations for the claim. References must use the format \/\<subrequest>.  Must be a DNS label.

       | `selectors`DeviceSelector array
       | Selectors define criteria which must be satisfied by a specific device in order for that device to be considered for this subrequest. All selectors must be satisfied for a device to be considered.

       | `tolerations`DeviceToleration array
       | If specified, the request's tolerations.  Tolerations for NoSchedule are required to allocate a device which has a taint with that effect. The same applies to NoExecute.  In addition, should any of the allocated devices get tainted with NoExecute after allocation and that effect is not tolerated, then all pods consuming the ResourceClaim get deleted to evict them. The scheduler will not let new pods reserve the claim while it has these tainted devices. Once all pods are evicted, the claim will get deallocated.  The maximum number of tolerations is 16.  This is a beta field and requires enabling the DRADeviceTaints feature gate.

## DeviceToleration {#DeviceToleration}

The ResourceClaim this DeviceToleration is attached to tolerates any taint that matches the triple <key,value,effect> using the matching operator <operator>.

   | Field | Description

       | `effect`string
       | Effect indicates the taint effect to match. Empty means match all taint effects. When specified, allowed values are NoSchedule and NoExecute.Possible enum values: - `"NoExecute"` Evict any already-running pods that do not tolerate the device taint. - `"NoSchedule"` Do not allow new pods to schedule which use a tainted device unless they tolerate the taint, but allow all pods submitted to Kubelet without going through the scheduler to start, and allow all already-running pods to continue running. - `"None"` No effect, the taint is purely informational.

       | `key`string
       | Key is the taint key that the toleration applies to. Empty means match all taint keys. If the key is empty, operator must be Exists; this combination means to match all values and all keys. Must be a label name.

       | `operator`string
       | Operator represents a key's relationship to the value. Valid operators are Exists and Equal. Defaults to Equal. Exists is equivalent to wildcard for value, so that a ResourceClaim can tolerate all taints of a particular category.Possible enum values: - `"Equal"` - `"Exists"`

       | `tolerationSeconds`integer
       | TolerationSeconds represents the period of time the toleration (which must be of effect NoExecute, otherwise this field is ignored) tolerates the taint. By default, it is not set, which means tolerate the taint forever (do not evict). Zero and negative values will be treated as 0 (evict immediately) by the system. If larger than zero, the time when the pod needs to be evicted is calculated as \<time when taint was adedd> + \<toleration seconds>.

       | `value`string
       | Value is the taint value the toleration matches to. If the operator is Exists, the value must be empty, otherwise just a regular string. Must be a label value.
