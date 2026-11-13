---
title: "Observability of Dynamic Resources (part 2 of 2)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/concepts/resource-management/dynamic-resource-allocation/dra-observability.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Observability of Dynamic Resources (part 2 of 2)

## DRA device metadata in containers {#device-metadata}

**Feature state:** v1.37 [beta]

DRA drivers can expose device metadata such as device attributes (PCI bus
addresses or mediated device UUIDs) and network configuration directly to
containers as JSON files.
This lets applications discover information about allocated devices without
querying the Kubernetes API or using custom controllers.

KEP-5304 defines a
device metadata protocol that drivers must follow
so that applications see a consistent layout across drivers and clusters. The
DRA kubelet plugin library
implements this protocol.

Device metadata follows the same rules as device access: it is available inside
a container only when that container requests the device. For details, see
Request devices in workloads using DRA.

### Device metadata protocol {#device-metadata-protocol}

The protocol consists of four rules:

1. **File paths.** Metadata files live inside containers under
   `/var/run/kubernetes.io/dra-device-attributes`. For a directly referenced
   ResourceClaim, the path is
   `resourceclaims/<claimName>/<requestName>/<driverName>-metadata.json`. For a
   claim created from a ResourceClaimTemplate, the path is
   `resourceclaimtemplates/<podClaimName>/<requestName>/<driverName>-metadata.json`,
   where `podClaimName` is `pod.spec.resourceClaims[].name`.

   When a request uses a prioritized list, only the
   top-level request name is used for the `<requestName>` path segment. The
   `requests[].name` field in the file contains the full
   `<request>/<subrequest>` reference, such as `gpu/high-memory`.

   The path constants are defined in
   `k8s.io/dynamic-resource-allocation/api/metadata`.

1. **JSON API.** Each file is a stream of one or more
   `DeviceMetadata`
   objects. Each object has `apiVersion` and `kind`, following Kubernetes API
   conventions. The same metadata is encoded once per configured API version
   in the order selected by the driver. Consumers use the first version that
   they can decode and skip unknown versions. A malformed object in a known
   version is an error.

1. **Generation.** The initial file has `metadata.generation` set to `1`.
   Each update increments the generation so that consumers can detect changes.

1. **Container exposure.** The DRA kubelet plugin library uses
   CDI to bind-mount each file
   read-only. Other implementations can use a different mechanism as long as
   the file appears at the required path and is read-only.

### Enable device metadata in a driver {#device-metadata-enable}

Device metadata is a driver-side feature. It has no Kubernetes feature gate and
is disabled by default in the DRA kubelet plugin library. A driver must enable
the feature and explicitly select the versions that it writes:

```go
kubeletplugin.EnableDeviceMetadata(true, []schema.GroupVersion{
	metadatav1beta1.SchemeGroupVersion,
	metadatav1alpha1.SchemeGroupVersion,
})
```

The `v1beta1` version is required. A driver can also write `v1alpha1` for
compatibility with older consumers. The order in the slice is the order in the
metadata stream; the framework does not sort the versions. Drivers should put
the newest version first. Enabling device metadata with no versions, without
`v1beta1`, or with an unknown version causes the plugin to fail during startup.

For each prepared device, the driver can populate
`Device.Metadata`
with
`kubeletplugin.DeviceMetadata`.
Drivers should include the attributes that they publish for that device in its
ResourceSlice, so workloads see the same information at runtime. Drivers can
also include attributes that are only relevant at runtime. For network devices,
drivers can add interface names, IP addresses, and hardware addresses after CNI
configuration by calling
`UpdateRequestMetadata`.

The kubelet plugin API links above describe integration for driver authors.
The DRA framework does not define a universal command-line flag, so cluster
operators enable the feature through the deployment configuration provided by
their driver.

When enabled, the DRA kubelet plugin library writes metadata files while
preparing allocated devices. It also writes CDI specifications to `/var/run/cdi`
by default. The container runtime must be configured to discover CDI
specifications from that directory. The library determines the minimum CDI
specification version required for each generated specification.

When one request allocates devices from multiple DRA drivers, each driver writes
its own metadata file. Consumers that know the driver name should construct the
exact path from the claim, request, and driver names. Go consumers can use
`ReadResourceClaimMetadata`
or
`ReadResourceClaimTemplateMetadata`
to read and merge all per-driver files for a request.

### Metadata schema {#device-metadata-schema}

Each object in a metadata file conforms to the
`DeviceMetadata`
API (`metadata.resource.k8s.io/v1beta1`).

The schema contains:

- Standard object metadata for the ResourceClaim, including its name,
  namespace, UID, and metadata generation.
- The optional `podClaimName` for a claim generated from a
  ResourceClaimTemplate.
- A list of requests. Each request has a required name and a list of allocated
  devices.
- The driver, pool, and name for each device.
- Optional device attributes and network data.

Attribute values use the same representation as ResourceSlice device
attributes. Each attribute has exactly one scalar value (`int`, `bool`,
`string`, or `version`) or list value (`ints`, `bools`, `strings`, or
`versions`). Device capacity values are not included in device metadata.

Network data can contain `interfaceName`, `ips`, and `hardwareAddress`.
For field constraints, see the
`DeviceMetadata` API documentation.

The following example shows one object in a metadata stream for a GPU device
allocated through a ResourceClaimTemplate:

```json
{
  "kind": "DeviceMetadata",
  "apiVersion": "metadata.resource.k8s.io/v1beta1",
  "metadata": {
    "name": "pod0-gpu-2kqrd",
    "namespace": "gpu-test1",
    "uid": "c7e7b22e-239b-4498-b27c-7f1344481e14",
    "generation": 1
  },
  "podClaimName": "gpu",
  "requests": [
    {
      "name": "gpu",
      "devices": [
        {
          "driver": "gpu.example.com",
          "pool": "worker-0",
          "name": "gpu-0",
          "attributes": {
            "driverVersion": {
              "version": "1.0.0"
            },
            "index": {
              "int": 0
            },
            "model": {
              "string": "LATEST-GPU-MODEL"
            },
            "uuid": {
              "string": "gpu-18db0e85-99e9-c746-8531-ffeb86328b39"
            }
          }
        }
      ]
    }
  ]
}
```

The DRA kubelet plugin does not validate metadata before writing it. Go
consumers can opt in to generated validation when decoding a stream. Decoding
and validation have separate results: a validation error does not prevent a
successfully decoded object from being returned. For usage, see
Access DRA device metadata.

### Immediate and deferred metadata {#device-metadata-lifecycle}

For immediate metadata, the driver supplies attributes or network data while it
prepares the claim. The DRA kubelet plugin writes the file with generation `1`
before the consuming container starts.

For deferred metadata, the driver can prepare a device without attributes or
network data. The initial generation `1` file contains the device identity. The
driver later calls `UpdateRequestMetadata` to replace the complete stream
atomically and increment the generation. An update requires the initial file to
exist. If device preparation returns no devices for a request, the framework
creates neither a metadata file nor a metadata CDI device for that request.

Metadata remains available to each consuming container for the lifetime of that
container. The framework removes the metadata files and CDI specifications
after the claim is unprepared.

To learn how to use device metadata in your workloads, see
Access DRA device metadata.

### Custom drivers {#device-metadata-custom-drivers}

Custom drivers that do not use the DRA kubelet plugin library must implement the
device metadata protocol themselves. This includes
writing the versioned `DeviceMetadata` stream at the correct paths, incrementing
`metadata.generation` on every update, and exposing files read-only through CDI
or an equivalent mechanism.
