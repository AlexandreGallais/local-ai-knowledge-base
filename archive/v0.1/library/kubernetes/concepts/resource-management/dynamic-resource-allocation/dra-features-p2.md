---
title: "DRA Features (part 2 of 2)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/concepts/resource-management/dynamic-resource-allocation/dra-features.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# DRA Features (part 2 of 2)

## Optional node operations {#optional-node-operations}

**Feature state:**

In Dynamic Resource Allocation (DRA), the `kubelet` coordinates with a node-local
driver via gRPC to prepare allocated devices before container start
(`NodePrepareResources`) and to unprepare them upon Pod termination
(`NodeUnprepareResources`). While this setup is critical for node-local hardware
such as GPUs or FPGAs, some resources are managed entirely in the control plane
and require no node-local setup.

The optional node operations feature allows resource drivers to declare that
specific node-local gRPC operations can be skipped. When configured, the `kubelet`
bypasses driver lookup and gRPC calls for those devices, eliminating the need to
deploy and maintain empty node-local drivers on every worker node.

### Driver configuration

Driver authors can specify the `skipNodeOperations` field in
`.spec.skipNodeOperations` of a ResourceSlice. This field is a list of unique
strings specifying the node-local operations to bypass for all devices in that
slice.

Valid values are:

* `"NodePrepareResources"`: Skips `NodePrepareResources` gRPC calls. This value
  cannot be specified unless `"NodeUnprepareResources"` is also listed (or `"*"`
  is specified). This limitation avoids Pods getting stuck in Terminating if a
  node-local plugin is missing, since the plugin is not checked during Pod
  startup when preparation is skipped.
* `"NodeUnprepareResources"`: Skips `NodeUnprepareResources` gRPC calls.
* `"*"`: Skips all node-local resource operations.

Here is an example of a ResourceSlice for a control-plane resource that skips
all node-local operations:

```yaml
apiVersion: resource.k8s.io/v1
kind: ResourceSlice
metadata:
  name: control-plane-resources
spec:
  nodeName: worker-1
  pool:
    name: central-pool
    generation: 1
    resourceSliceCount: 1
  driver: control-plane.example.com
  skipNodeOperations:
  - "*"
  devices:
  - name: virtual-device-1
```

### Allocation result and execution

When the Kubernetes scheduler allocates a device to a ResourceClaim, it copies
the `skipNodeOperations` list from the ResourceSlice into the allocation
result:

```yaml
apiVersion: resource.k8s.io/v1
kind: ResourceClaim
...
status:
  allocation:
    devices:
      results:
      - device: virtual-device-1
        driver: control-plane.example.com
        pool: central-pool
        skipNodeOperations:
        - "*"
```

When a Pod runs on a node, the `kubelet` reads the allocation results. If all
allocated devices for a given driver within a ResourceClaim skip a specific
operation, the `kubelet` completely bypasses calling that gRPC hook for that
driver.

### Operational considerations

#### In-place driver updates

Because the `skipNodeOperations` setting is copied from the ResourceSlice into
the ResourceClaim at allocation time, running Pods and active allocations
retain whatever setting was in place when they were scheduled.

If a driver's node operation requirements are updated in place (for example,
changing from requiring node operations to skipping them), existing claims will
still use the previous configuration. To avoid issues—such as terminating Pods
hanging while waiting for a decommissioned node plugin—cluster administrators
should ensure no active claims exist for a driver before altering its node
operation requirements or removing node-local driver DaemonSets.

#### Node declared features integration

To prevent Pods from being scheduled onto nodes where the `kubelet` does not
support skipping DRA operations (which would cause the `kubelet` to fail while
waiting for a missing node plugin), this feature integrates with Node Declared
Features. When a
Pod uses a ResourceClaim with `skipNodeOperations` configured, the Kubernetes
scheduler verifies that the target node declares support for the
`DRAOptionalNodeOperations` feature in its `.status.declaredFeatures` before
scheduling the Pod.

Optional node operations is controlled by the
`DRAOptionalNodeOperations`
feature gate in the `kube-apiserver`, `kube-scheduler`, and `kubelet`.
