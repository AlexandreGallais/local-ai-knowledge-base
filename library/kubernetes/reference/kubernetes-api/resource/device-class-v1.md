---
title: "DeviceClass (part 1 of 6)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/resource/device-class-v1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# DeviceClass

`apiVersion: resource.k8s.io/v1`

`import "k8s.io/api/resource/v1"`

## DeviceClass {#DeviceClass}

DeviceClass is a vendor- or admin-provided resource that contains device configuration and selectors. It can be referenced in the device requests of a claim to apply these presets. Cluster scoped.

   | Field | Description

       | `apiVersion`string
       | APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

       | `kind`string
       | Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

       | `metadata`ObjectMeta
       | Standard object metadata

       | `spec`DeviceClassSpec
       | Spec defines what can be allocated and how to configure it.  This is mutable. Consumers have to be prepared for classes changing at any time, either because they get updated or replaced. Claim allocations are done once based on whatever was set in classes at the time of allocation.  Changing the spec automatically increments the metadata.generation number.

## DeviceClassSpec {#DeviceClassSpec}

DeviceClassSpec is used in a [DeviceClass] to define what can be allocated and how to configure it.

   | Field | Description

       | `config`DeviceClassConfiguration array
       | Config defines configuration parameters that apply to each device that is claimed via this class. Some classses may potentially be satisfied by multiple drivers, so each instance of a vendor configuration applies to exactly one driver.  They are passed to the driver, but are not considered while allocating the claim.

       | `extendedResourceName`string
       | ExtendedResourceName is the extended resource name for the devices of this class. The devices of this class can be used to satisfy a pod's extended resource requests. It has the same format as the name of a pod's extended resource. It should be unique among all the device classes in a cluster. If two device classes have the same name, then the class created later is picked to satisfy a pod's extended resource requests. If two classes are created at the same time, then the name of the class lexicographically sorted first is picked.

       | `selectors`DeviceSelector array
       | Each selector must be satisfied by a device which is claimed via this class.

## DeviceClassList {#DeviceClassList}

DeviceClassList is a collection of classes.

   | Field | Description

       | `apiVersion`string
       | APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

       | `items` *DeviceClass array
       | Items is the list of resource classes.

       | `kind`string
       | Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

       | `metadata`ListMeta
       | Standard list metadata

## CELDeviceSelector {#CELDeviceSelector}

CELDeviceSelector contains a CEL expression for selecting a device.

   | Field | Description

       | `expression` *string
       | Expression is a CEL expression which evaluates a single device. It must evaluate to true when the device under consideration satisfies the desired criteria, and false when it does not. Any other result is an error and causes allocation of devices to abort.  The expression's input is an object named "device", which carries the following properties:  - driver (string): the name of the driver which defines this device.  - attributes (map[string]object): the device's attributes, grouped by prefix    (e.g. device.attributes["dra.example.com"] evaluates to an object with all    of the attributes which were prefixed by "dra.example.com").  - capacity (map[string]object): the device's capacities, grouped by prefix.  - allowMultipleAllocations (bool): the allowMultipleAllocations property of the device    (v1.34+ with the DRAConsumableCapacity feature enabled).  Example: Consider a device with driver="dra.example.com", which exposes two attributes named "model" and "ext.example.com/family" and which exposes one capacity named "modules". This input to this expression would have the following fields:      device.driver     device.attributes["dra.example.com"].model     device.attributes["ext.example.com"].family     device.capacity["dra.example.com"].modules  The device.driver field can be used to check for a specific driver, either as a high-level precondition (i.e. you only want to consider devices from this driver) or as part of a multi-clause expression that is meant to consider devices from different drivers.  The value type of each attribute is defined by the device definition, and users who write these expressions must consult the documentation for their specific drivers. The value type of each capacity is Quantity.  If an unknown prefix is used as a lookup in either device.attributes or device.capacity, an empty map will be returned. Any reference to an unknown field will cause an evaluation error and allocation to abort.  A robust expression should check for the existence of attributes before referencing them.  Common errors: - "no such key": Use optional chaining (.? followed by orValue())   or guarding the check with has() for optional fields.   See CEL Optional Types for details:   https://pkg.go.dev/github.com/google/user@example.com/cel#OptionalTypes  For more CEL expression syntax and examples, see: https://kubernetes.io/docs/reference/using-api/cel/  For ease of use, the cel.bind() function is enabled, and can be used to simplify expressions that access multiple attributes with the same domain. For example:      cel.bind(dra, device.attributes["dra.example.com"], dra.someBool && dra.anotherBool)  When the DRAListTypeAttributes feature gate is enabled, the includes() helper is available and it can work for both scalar and list-type attributes. It was introduced to support smooth migration from scalar attributes to list-type attributes while keeping CEL expressions simple. For example:      device.attributes["dra.example.com"].models.includes("some-model")  The length of the expression must be smaller or equal to 10 Ki. The cost of evaluating it is also limited based on the estimated number of logical steps.

## DeviceClassConfiguration {#DeviceClassConfiguration}

DeviceClassConfiguration is used in DeviceClass.

   | Field | Description

       | `opaque`OpaqueDeviceConfiguration
       | Opaque provides driver-specific configuration parameters.

## DeviceSelector {#DeviceSelector}

DeviceSelector must have exactly one field set.

   | Field | Description

       | `cel`CELDeviceSelector
       | CEL contains a CEL expression for selecting a device.

## OpaqueDeviceConfiguration {#OpaqueDeviceConfiguration}

OpaqueDeviceConfiguration contains configuration parameters for a driver in a format defined by the driver vendor.

   | Field | Description

       | `driver` *string
       | Driver is used to determine which kubelet plugin needs to be passed these configuration parameters.  An admission policy provided by the driver developer could use this to decide whether it needs to validate them.  Must be a DNS subdomain and should end with a DNS domain owned by the vendor of the driver. It should use only lower case characters.

       | `parameters` *
       | Parameters can contain arbitrary data. It is the responsibility of the driver developer to handle validation and versioning. Typically this includes self-identification and a version ("kind" + "apiVersion" for Kubernetes types), with conversion between different versions.  The length of the raw data must be smaller or equal to 10 Ki.
