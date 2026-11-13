---
title: "DRA API Objects (part 3 of 3)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/concepts/resource-management/dynamic-resource-allocation/dra-api.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# DRA API Objects (part 3 of 3)

### ResourceSlice {#resourceslice}

Each ResourceSlice represents one or more
devices in a pool. The pool is
managed by a device driver, which creates and manages ResourceSlices. The
resources in a pool might be represented by a single ResourceSlice or span
multiple ResourceSlices.

ResourceSlices provide useful information to device users and to the scheduler,
and are crucial for dynamic resource allocation. Every ResourceSlice must include
the following information:

* **Resource pool**: a group of one or more resources that the driver manages.
  The pool can span more than one ResourceSlice. Changes to the resources in a
  pool must be propagated across all of the ResourceSlices in that pool. The
  device driver that manages the pool is responsible for ensuring that this
  propagation happens.
* **Devices**: devices in the managed pool. A ResourceSlice can list every
  device in a pool or a subset of the devices in a pool. The ResourceSlice
  defines device information like attributes, versions, and capacity. Device
  users can select devices for allocation by filtering for device information
  in ResourceClaims or in DeviceClasses.
* **Nodes**: the nodes that can access the resources. Drivers can choose which
  nodes can access the resources, whether that's all of the nodes in the
  cluster, a single named node, or nodes that have specific node labels.

Drivers use a controller to
reconcile ResourceSlices in the cluster with the information that the driver has
to publish. This controller overwrites any manual changes, such as cluster users
creating or modifying ResourceSlices.

Consider the following example ResourceSlice:

```yaml
apiVersion: resource.k8s.io/v1
kind: ResourceSlice
metadata:
  name: cat-slice
spec:
  driver: "resource-driver.example.com"
  pool:
    generation: 1
    name: "black-cat-pool"
    resourceSliceCount: 1
  # The allNodes field defines whether any node in the cluster can access the device.
  allNodes: true
  devices:
  - name: "large-black-cat"
    attributes:
      color:
        string: "black"
      size:
        string: "large"
      cat:
        bool: true
```
This ResourceSlice is managed by the `resource-driver.example.com` driver in the
`black-cat-pool` pool. The `allNodes: true` field indicates that any node in the
cluster can access the devices. There's one device in the ResourceSlice, named
`large-black-cat`, with the following attributes:

* `color`: `black`
* `size`: `large`
* `cat`: `true`

A DeviceClass could select this ResourceSlice by using these attributes, and a
ResourceClaim could filter for specific devices in that DeviceClass.

#### Naming and prioritization {#resourceslice-naming-and-prioritization}

The order in which the Kubernetes scheduler evaluates devices for allocation is
determined by the lexicographical sorting of ResourceSlice and resource pool names.
The scheduler uses a first-fit strategy, meaning it selects the first available device
that satisfies the claim's requirements.

This allows the priority of resource allocation to be influenced by the names
assigned to pools and ResourceSlices. Note that pools without
binding conditions
are always evaluated before those
with binding conditions, regardless of their names.

For drivers built using the `k8s.io/dynamic-resources/kubeletplugin` Go package or
the ResourceSlice controller from that module, these components automatically handle
ResourceSlice naming to ensure they are evaluated in the order specified by the driver.

## Admin access {#admin-access}

**Feature state:**

You can mark a request in a ResourceClaim or ResourceClaimTemplate as having
privileged features for maintenance and troubleshooting tasks. A request with
admin access grants access to in-use devices and may enable additional
permissions when making the device available in a container:

```yaml
apiVersion: resource.k8s.io/v1
kind: ResourceClaimTemplate
metadata:
  name: large-black-cat-claim-template
spec:
  spec:
    devices:
      requests:
      - name: req-0
        exactly:
          deviceClassName: resource.example.com
          allocationMode: All
          adminAccess: true
```

Admin access is a privileged mode and should not be granted to regular users in
multi-tenant clusters. Only users authorized to
create ResourceClaim or ResourceClaimTemplate objects in namespaces labeled with
`resource.kubernetes.io/admin-access: "true"` (case-sensitive) can use the
`adminAccess` field. This ensures that non-admin users cannot misuse the
feature.

Admin access is controlled by the
`DRAAdminAccess` feature gate
in the `kube-apiserver`, `kube-scheduler`, and `kubelet`.

## List type attributes {#list-type-attributes}

**Feature state:**

This feature improves the ResourceSlice API, allowing DRA drivers to specify list values for device attributes instead of only scalars.
This is useful for modeling more complex internal node topologies, for example when a CPU has adjacency to multiple PCIe roots.

For ResourceClaim authors (end users), this means that the `matchAttribute` and `distinctAttribute` work better for these cases.

- `matchAttribute` — the two attributes must have a *non-empty list intersection*, rather than be identical (scalar values are treated as single-item lists).
  This just means that if one driver publishes a single value for, say, the PCIe root, and another driver publishes a list, the constraint is met as long as
  the single value appears somewhere in the list.
- `distinctAttribute` — the attribute values must be *pairwise-disjoint* (no value shared between any two devices)

To help ResourceClaim authors use attributes that may be lists inside CEL expressions, this feature also introduces an `includes()` CEL function.

```
# Scalar attribute (backward compatible)
# assume: device.attributes["dra.example.com"].model = "model-a"
device.attributes["dra.example.com"].model.includes("model-a")  # true
device.attributes["dra.example.com"].model.includes("model-b")  # false

# List-type attribute (requires DRAListTypeAttributes)
# assume: device.attributes["dra.example.com"].supported-models= ["model-a", "model-b"]
device.attributes["dra.example.com"].supported-models.includes("model-a")  # true
device.attributes["dra.example.com"].supported-models.includes("model-c")  # false
```

### Details for DRA Driver Authors

By default, each `DeviceAttribute` holds exactly one scalar value: a boolean, an integer,
a string, or a semantic version string. The `DRAListTypeAttributes` feature gate extends
`DeviceAttribute` with four list-type fields, allowing a device to advertise multiple
values for a single attribute:

- **`bools`** — a list of boolean values
- **`ints`** — a list of 64-bit integer values
- **`strings`** — a list of strings (each at most 64 characters)
- **`versions`** — a list of semantic version strings per semver.org spec 2.0.0
  (each at most 64 characters)

The total number of individual attribute values per device (scalar fields plus all list
elements combined) is limited to **48**. When any device in a ResourceSlice uses this feature or other advanced features such as taints,
the ResourceSlice will be limited to at most **64** devices.
use list-type attributes or other advanced features such as taints.

Here is an example of a device advertising multiple supported models using a list-type
string attribute:

```yaml
kind: ResourceSlice
apiVersion: resource.k8s.io/v1
metadata:
  name: example-resourceslice
spec:
  nodeName: worker-1
  pool:
    name: pool
    generation: 1
    resourceSliceCount: 1
  driver: dra.example.com
  devices:
  - name: gpu-0
    attributes:
      dra.example.com/supported-models:
        strings:
        - model-a
        - model-b
```

List type attributes is controlled by the
`DRAListTypeAttributes` feature gate
in the `kube-apiserver` and `kube-scheduler`.

## Derived attributes {#derived-attributes}

**Feature state:**

The `matchAttribute` and `distinctAttribute` constraints normally require
devices to publish attributes under the exact same name. If a GPU driver
publishes `pcie_locality` and a NIC driver publishes `pcie_root` (or embeds
the same information in a string like `numa0-pcie1`), the scheduler has no
way to recognize that these represent the same thing, so devices from the
two drivers can't be co-located without first agreeing on a shared
attribute name.

`derivedAttributes` lets you bridge this gap inline, without waiting for
drivers to standardize on shared attribute names. Add one or more
`derivedAttributes` entries to a request, under
`.spec.devices.requests[].exactly` or
`.spec.devices.requests[].firstAvailable[]`. Each entry defines a CEL
expression that the scheduler evaluates against every candidate device for
that request. The result becomes a virtual attribute that can be referenced
from a `matchAttribute` or `distinctAttribute` constraint exactly like a
driver-provided device attribute.

```yaml
apiVersion: resource.k8s.io/v1
kind: ResourceClaim
metadata:
  name: gpu-nic-numa-alignment
spec:
  devices:
    requests:
    - name: gpu
      exactly:
        deviceClassName: gpu.example.com
        count: 1
        derivedAttributes:
        - name: derived/numa
          expression: device.attributes["gpu.example.com"].numa
    - name: nic
      exactly:
        deviceClassName: nic.example.com
        count: 1
        derivedAttributes:
        - name: derived/numa
          expression: device.attributes["nic.example.com"].numaNode
    constraints:
    - requests: ["gpu", "nic"]
      matchAttribute: derived/numa
```

In this example, the `gpu` and `nic` drivers publish topology information
under different attribute names (`numa` and `numaNode`). Each request
computes a common `derived/numa` value from its own device's attributes,
and the `matchAttribute` constraint aligns the two requests on that virtual
attribute, even though the underlying drivers never agreed on a shared
attribute name.

A few things to know about `derivedAttributes`:

- **Naming**: `name` must be a DNS subdomain followed by a `/` and a C
  identifier, the same format used for driver-provided attribute names (for
  example, `example.com/numaNode` or `derived/numaNode`). If the name
  matches a driver-provided attribute already published by the driver,
  the derived attribute's value shadows the driver-provided one for
  constraint matching. Use a domain prefix that no driver would use,
  such as `derived/`, if you want to avoid shadowing unintentionally.
  You can define up to 32 derived attributes per request.
- **Must be used by a constraint**: every derived attribute must be
  referenced by at least one `matchAttribute` or `distinctAttribute`
  constraint that applies to the request (or subrequest) that defines it.
  Otherwise the ResourceClaim fails validation.
- **Evaluation scope and order**: `expression` is evaluated once per
  candidate device, after the request's own CEL selectors
  (`.selectors[].cel`) have already filtered that device. As a result,
  derived attributes can't be referenced from selector expressions, and
  aren't exposed through `device.attributes` in the CEL environment.
- **Return type**: `expression` must evaluate to a scalar (`string`, `int`,
  `bool`, or a semantic version) or, when the `DRAListTypeAttributes`
  feature gate is also enabled, a list of one of those scalar types.
- **Cost limits**: each expression has a maximum length and a limit on its
  estimated CEL evaluation cost. On top of that, the combined estimated cost
  of all `derivedAttributes` expressions in a ResourceClaim is also capped,
  to bound the total overhead added to a single scheduling attempt. The
  ResourceClaim is rejected if any of these limits are exceeded.
- **Runtime errors abort scheduling**: if evaluating an expression fails for
  a candidate device, for example because it references an attribute that
  device doesn't have, the scheduler aborts allocation and the Pod fails to
  schedule, rather than silently skipping that device. Write expressions
  defensively, for example by checking that an attribute exists before
  reading it.

Derived attributes is controlled by the
`DRADerivedAttributes` feature gate
in the `kube-apiserver` and `kube-scheduler`.

For a list of standard device attributes that DRA drivers can publish, see the
Standard Device Attributes
reference.

## Extended resource allocation by DRA {#extended-resource}

**Feature state:**

You can provide an extended resource name for a DeviceClass. The scheduler will then
select the devices matching the class for the extended resource requests.
This allows users to continue using extended resource requests in a pod to request
either extended resources provided by device plugin, or DRA devices.
The same extended resource can be provided either by device plugin, or DRA on one single cluster node.
The same extended resource can be provided by device plugin on some nodes, and DRA on other nodes in the same cluster.

In the example below, the DeviceClass is given an extendedResourceName `example.com/gpu`.
If a pod requested for the extended resource `example.com/gpu: 2`, it can be scheduled to
a node with two or more devices matching the DeviceClass.

```yaml
apiVersion: resource.k8s.io/v1
kind: DeviceClass
metadata:
  name: gpu.example.com
spec:
  selectors:
  - cel:
      expression: device.driver == 'gpu.example.com' && device.attributes['gpu.example.com'].type
        == 'gpu'
  extendedResourceName: example.com/gpu
```

In addition, users can use a special extended resource to allocate devices without
having to explicitly create a ResourceClaim. Using the extended resource name
prefix `deviceclass.resource.kubernetes.io/` and the DeviceClass name.
This works for any DeviceClass, even if it does not specify an extended resource name.
The resulting ResourceClaim will contain a request for an `ExactCount` of the
specified number of devices of that DeviceClass.

Extended resource allocation by DRA is controlled by the
`DRAExtendedResource` feature gate
in the `kube-apiserver`, `kube-scheduler`, `kube-controller-manager`, and `kubelet`.

For a hands-on walkthrough of requesting extended resources, see
Assign Extended Resources to a Container.
