---
title: "BasicDevice"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/definitions/basic-device-v1beta1-resource.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# BasicDevice

`apiVersion: resource.k8s.io/v1beta1`

`import "k8s.io/api/resource/v1beta1"`

## BasicDevice {#BasicDevice}

BasicDevice defines one device instance.

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
       | BindingFailureConditions defines the conditions for binding failure. They may be set in the per-device status conditions. If any is true, a binding failure occurred.  The maximum number of binding failure conditions is 4.  The conditions must be a valid condition type string.  This is a beta field and requires enabling the DRADeviceBindingConditions and DRAResourceClaimDeviceStatus feature gates.

       | `bindsToNode`boolean
       | BindsToNode indicates if the usage of an allocation involving this device has to be limited to exactly the node that was chosen when allocating the claim. If set to true, the scheduler will set the ResourceClaim.Status.Allocation.NodeSelector to match the node where the allocation was made.  This is a beta field and requires enabling the DRADeviceBindingConditions and DRAResourceClaimDeviceStatus feature gates.

       | `capacity`object
       | Capacity defines the set of capacities for this device. The name of each capacity must be unique in that set.  The maximum number of attributes and capacities combined is 32.

       | `consumesCounters`DeviceCounterConsumption array
       | ConsumesCounters defines a list of references to sharedCounters and the set of counters that the device will consume from those counter sets.  There can only be a single entry per counterSet.  The maximum number of device counter consumptions per device is 2.

       | `nodeAllocatableResources`object
       | NodeAllocatableResources defines the mapping of node resources that are managed by the DRA driver exposing this device. This includes resources currently reported in v1.Node `status.allocatable` that are not extended resources (see https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#extended-resources). Examples include "cpu", "memory", "ephemeral-storage", and hugepages. In addition to standard requests made through the Pod `spec`, these resources can also be requested through claims and allocated by the DRA driver. For example, a CPU DRA driver might allocate exclusive CPUs or auxiliary node memory dependencies of an accelerator device. The keys of this map are the node-allocatable resource names (e.g., "cpu", "memory"). Extended resource names are not permitted as keys.

       | `nodeName`string
       | NodeName identifies the node where the device is available.  Must only be set if Spec.PerDeviceNodeSelection is set to true. At most one of NodeName, NodeSelector and AllNodes can be set.

       | `nodeSelector`NodeSelector
       | NodeSelector defines the nodes where the device is available.  Must use exactly one term.  Must only be set if Spec.PerDeviceNodeSelection is set to true. At most one of NodeName, NodeSelector and AllNodes can be set.

       | `taints`DeviceTaint array
       | If specified, these are the driver-defined taints.  The maximum number of taints is 16. If taints are set for any device in a ResourceSlice, then the maximum number of allowed devices per ResourceSlice is 64 instead of 128.  This is a beta field and requires enabling the DRADeviceTaints feature gate.
