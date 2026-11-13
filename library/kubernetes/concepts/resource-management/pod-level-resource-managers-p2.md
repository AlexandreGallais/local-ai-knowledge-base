---
title: "Pod-level resource managers (part 2 of 2)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/concepts/resource-management/pod-level-resource-managers.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Pod-level resource managers (part 2 of 2)

## Observability and metrics

You can monitor the behavior and health of the resource managers across both
container-level and pod-level allocations using the following `kubelet`
metrics (enabled via the `PodLevelResourceManagers` feature gate):

-   `resource_manager_allocations_total`: Counts the total number of exclusive
    resource allocations performed by a manager. The `source` label ("pod" or
    "node") distinguishes between allocations drawn from the node-level pool
    versus a pre-allocated pod-level pool.
-   `resource_manager_allocation_errors_total`: Counts errors encountered during
    exclusive resource allocation, distinguished by the intended allocation
    `source` ("pod" or "node").
-   `resource_manager_container_assignments`: Tracks the cumulative number of
    containers that will be granted a specific type of resource assignment. The
    `assignment_type` label ("node_exclusive", "pod_exclusive", "pod_shared")
    provides visibility into how many containers are running with exclusive
    resources (from the node or pod pool) versus the pod-level shared pool.

### PodResources API {#podresources-api}

In Kubernetes 1.37, the `kubelet`'s node-local `PodResources` gRPC API
includes pod-level resource allocations when `PodLevelResourceManagers` is
enabled. Node-local monitoring agents and device plugins can query
top-level Pod assignments (`cpu_ids` and `memory`) while avoiding
double-counting container-level allocations.

For complete API schemas, field masks, and scope-by-scope reporting tables, see
the
Pod-level resource managers reference.

## Limitations and caveats

-   The functionality is only implemented for the `static` CPU Manager policy
    and the `Static` Memory Manager policy. Note that the `BestEffort` policy is
    not supported for the Memory Manager.
-   This feature is only supported on Linux nodes. On Windows nodes, the
    resource managers will act as a no-op for pod-level allocations.

## What's next

-   Learn how to
    Assign Pod-level CPU and memory resources.
-   Follow the
    Use pod-level resources with `kubelet` resource managers
    tutorial.
-   Read about
    Node Resource Managers.
