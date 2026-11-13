---
title: "Device Plugins (part 1 of 2)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/concepts/extend-kubernetes/compute-storage-net/device-plugins.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

**Feature state:** v1.26 [stable]

Kubernetes provides a device plugin framework that you can use to advertise system hardware
resources to the kubelet.

Instead of customizing the code for Kubernetes itself, vendors can implement a
device plugin that you deploy either manually or as a daemonset.
The targeted devices include GPUs, high-performance NICs, FPGAs, InfiniBand adapters,
and other similar computing resources that may require vendor specific initialization
and setup.

## Device plugin registration

The kubelet exports a `Registration` gRPC service:

```grpc
service Registration {
	rpc Register(RegisterRequest) returns (Empty) {}
}
```

A device plugin can register itself with the kubelet through this gRPC service.
During the registration, the device plugin needs to send:

* The name of its Unix socket.
* The Device Plugin API version against which it was built.
* The `ResourceName` it wants to advertise. Here `ResourceName` needs to follow the
  extended resource naming scheme
  as `vendor-domain/resourcetype`.
  (For example, an NVIDIA GPU is advertised as `nvidia.com/gpu`.)

Following a successful registration, the device plugin sends the kubelet the
list of devices it manages, and the kubelet is then in charge of advertising those
resources to the API server as part of the kubelet node status update.
For example, after a device plugin registers `hardware-vendor.example/foo` with the kubelet
and reports two healthy devices on a node, the node status is updated
to advertise that the node has 2 "Foo" devices installed and available.

Then, users can request devices as part of a Pod specification
(see `container`).
Requesting extended resources is similar to how you manage requests and limits for
other resources, with the following differences:
* Extended resources are only supported as integer resources and cannot be overcommitted.
* Devices cannot be shared between containers.

### Example {#example-pod}

Suppose a Kubernetes cluster is running a device plugin that advertises resource `hardware-vendor.example/foo`
on certain nodes. Here is an example of a pod requesting this resource to run a demo workload:

```yaml
---
apiVersion: v1
kind: Pod
metadata:
  name: demo-pod
spec:
  containers:
    - name: demo-container-1
      image: registry.k8s.io/pause:3.8
      resources:
        limits:
          hardware-vendor.example/foo: 2
#
# This Pod needs 2 of the hardware-vendor.example/foo devices
# and can only schedule onto a Node that's able to satisfy
# that need.
#
# If the Node has more than 2 of those devices available, the
# remainder would be available for other Pods to use.
```

## Device plugin implementation

The general workflow of a device plugin includes the following steps:

1. Initialization. During this phase, the device plugin performs vendor-specific
   initialization and setup to make sure the devices are in a ready state.

1. The plugin starts a gRPC service, with a Unix socket under the host path
   `/var/lib/kubelet/device-plugins/` (this path is hardcoded and is not
   affected by the kubelet's `--root-dir` or any other configuration), that
   implements the following interfaces:

   ```grpc
   service DevicePlugin {
         // GetDevicePluginOptions returns options to be communicated with Device Manager.
         rpc GetDevicePluginOptions(Empty) returns (DevicePluginOptions) {}

         // ListAndWatch returns a stream of List of Devices
         // Whenever a Device state change or a Device disappears, ListAndWatch
         // returns the new list
         rpc ListAndWatch(Empty) returns (stream ListAndWatchResponse) {}

         // Allocate is called during container creation so that the Device
         // Plugin can run device specific operations and instruct Kubelet
         // of the steps to make the Device available in the container
         rpc Allocate(AllocateRequest) returns (AllocateResponse) {}

         // GetPreferredAllocation returns a preferred set of devices to allocate
         // from a list of available ones. The resulting preferred allocation is not
         // guaranteed to be the allocation ultimately performed by the
         // devicemanager. It is only designed to help the devicemanager make a more
         // informed allocation decision when possible.
         rpc GetPreferredAllocation(PreferredAllocationRequest) returns (PreferredAllocationResponse) {}

         // PreStartContainer is called, if indicated by Device Plugin during registration phase,
         // before each container start. Device plugin can run device specific operations
         // such as resetting the device before making devices available to the container.
         rpc PreStartContainer(PreStartContainerRequest) returns (PreStartContainerResponse) {}
   }
   ```

   **Note:**
   Plugins are not required to provide useful implementations for
   `GetPreferredAllocation()` or `PreStartContainer()`. Flags indicating
   the availability of these calls, if any, should be set in the `DevicePluginOptions`
   message sent back by a call to `GetDevicePluginOptions()`. The `kubelet` will
   always call `GetDevicePluginOptions()` to see which optional functions are
   available, before calling any of them directly.

1. The plugin registers itself with the kubelet through the Unix socket at host
   path `/var/lib/kubelet/device-plugins/kubelet.sock`.

   **Note:**
   The ordering of the workflow is important. A plugin MUST start serving gRPC
   service before registering itself with kubelet for successful registration.

1. After successfully registering itself, the device plugin runs in serving mode, during which it keeps
   monitoring device health and reports back to the kubelet upon any device state changes.
   It is also responsible for serving `Allocate` gRPC requests. During `Allocate`, the device plugin may
   do device-specific preparation; for example, GPU cleanup or QRNG initialization.
   If the operations succeed, the device plugin returns an `AllocateResponse` that contains container
   runtime configurations for accessing the allocated devices. The kubelet passes this information
   to the container runtime.

   An `AllocateResponse` contains zero or more `ContainerAllocateResponse` objects. In these, the
   device plugin defines modifications that must be made to a container's definition to provide
   access to the device. These modifications include:

   * Annotations
   * device nodes
   * environment variables
   * mounts
   * fully-qualified CDI device names

   **Note:**
   The processing of the fully-qualified CDI device names by the Device Manager requires
   that the `DevicePluginCDIDevices` feature gate
   is enabled for both the kubelet and the kube-apiserver. This was added as an alpha feature in Kubernetes
   v1.28, graduated to beta in v1.29 and to GA in v1.31.

### Handling kubelet restarts

A device plugin is expected to detect kubelet restarts and re-register itself with the new
kubelet instance. A new kubelet instance deletes all the existing Unix sockets under
`/var/lib/kubelet/device-plugins` (the hardcoded path for device plugins) when it starts. A device plugin can monitor the deletion
of its Unix socket and re-register itself upon such an event.

### Device plugin and unhealthy devices

There are cases when devices fail or are shut down. The responsibility of the Device Plugin
in this case is to notify the kubelet about the situation using the `ListAndWatchResponse` API.

Once a device is marked as unhealthy, the kubelet will decrease the allocatable count
for this resource on the Node to reflect how many devices can be used for scheduling new pods.
Capacity count for the resource will not change.

Pods that were assigned to the failed devices will continue be assigned to this device.
It is typical that code relying on the device will start failing and Pod may get
into Failed phase if `restartPolicy` for the Pod was not `Always` or enter the crash loop
otherwise.

Before Kubernetes v1.31, the way to know whether or not a Pod is associated with the
failed device is to use the PodResources API.

**Feature state:**

When the feature gate `ResourceHealthStatus` is enabled (beta and enabled by default since v1.36),
the field `allocatedResourcesStatus`
is added to each container status, within the `.status` for each Pod. The `allocatedResourcesStatus`
field reports health information for each device assigned to the container.
Each resource health entry can include an optional `message` field with additional
human readable context about the health status, such as error details or failure reasons.

For a failed Pod, or where you suspect a fault, you can use this status to understand whether
the Pod behavior may be associated with device failure. For example, if an accelerator is reporting
an over-temperature event, the `allocatedResourcesStatus` field may report this.

## Device plugin deployment

You can deploy a device plugin as a DaemonSet, as a package for your node's operating system,
or manually.

The canonical directory `/var/lib/kubelet/device-plugins` (which is hardcoded on the kubelet) requires privileged access,
so a device plugin must run in a privileged security context.
If you're deploying a device plugin as a DaemonSet, `/var/lib/kubelet/device-plugins`
must be mounted as a volume
in the plugin's PodSpec.

If you choose the DaemonSet approach you can rely on Kubernetes to: place the device plugin's
Pod onto Nodes, to restart the daemon Pod after failure, and to help automate upgrades.

## API compatibility

Previously, the versioning scheme required the Device Plugin's API version to match
exactly the Kubelet's version. Since the graduation of this feature to Beta in v1.12
this is no longer a hard requirement. The API is versioned and has been stable since
Beta graduation of this feature. Because of this, kubelet upgrades should be seamless
but there still may be changes in the API before stabilization making upgrades not
guaranteed to be non-breaking.

**Note:**
Although the Device Manager component of Kubernetes is a generally available feature,
the _device plugin API_ is not stable. For information on the device plugin API and
version compatibility, read Device Plugin API versions.

As a project, Kubernetes recommends that device plugin developers:

* Watch for Device Plugin API changes in the future releases.
* Support multiple versions of the device plugin API for backward/forward compatibility.

To run device plugins on nodes that need to be upgraded to a Kubernetes release with
a newer device plugin API version, upgrade your device plugins to support both versions
before upgrading these nodes. Taking that approach will ensure the continuous functioning
of the device allocations during the upgrade.
