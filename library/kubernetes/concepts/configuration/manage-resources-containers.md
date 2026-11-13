---
title: "Resource Management for Pods and Containers (part 1 of 3)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/concepts/configuration/manage-resources-containers.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Resource Management for Pods and Containers

When you specify a pod, you can optionally specify how much of each resource a
container needs. The most common resources to specify are CPU and memory
(RAM); there are others.

When you specify the resource _request_ for containers in a Pod, the
kube-scheduler uses this information to decide which node to place the Pod on.
When you specify a resource _limit_ for a container, the kubelet enforces those
limits so that the running container is not allowed to use more of that resource
than the limit you set. The kubelet also reserves at least the _request_ amount of
that system resource specifically for that container to use.

## Requests and limits

If the node where a Pod is running has enough of a resource available, it's possible (and
allowed) for a container to use more resource than its `request` for that resource specifies.

For example, if you set a `memory` request of 256 MiB for a container, and that container is in
a Pod scheduled to a Node with 8GiB of memory and no other Pods, then the container can try to use
more RAM.

Limits are a different story. Both `cpu` and `memory` limits are applied by the kubelet (and
container runtime),
and are ultimately enforced by the kernel. On Linux nodes, the Linux kernel
enforces limits with
cgroups.
The behavior of `cpu` and `memory` limit enforcement is slightly different.

`cpu` limits are enforced by CPU throttling. When a container approaches
its `cpu` limit, the kernel will restrict access to the CPU corresponding to the
container's limit. Thus, a `cpu` limit is a hard limit the kernel enforces.
Containers may not use more CPU than is specified in their `cpu` limit.

`memory` limits are enforced by the kernel with out of memory (OOM) kills. When
a container uses more than its `memory` limit, the kernel may terminate it. However,
terminations only happen when the kernel detects memory pressure. Thus, a
container that over allocates memory may not be immediately killed. This means
`memory` limits are enforced reactively. A container may use more memory than
its `memory` limit, but if it does, it may get killed.

**Note:**
There is a feature `MemoryQoS` which adds memory throttling and optional
tiered memory reservation on Linux nodes using cgroup v2. For details, see
Memory QoS with cgroup v2.

**Note:**
If you specify a limit for a resource, but do not specify any request, and no admission-time
mechanism has applied a default request for that resource, then Kubernetes copies the limit
you specified and uses it as the requested value for the resource.

## Resource types

A *resource type* has a base unit and can be requested, limited, or both.
Kubernetes has the following built-in resource types:

| Resource type | Description | Base unit |
|---|---|---|
| `cpu` | Compute processing | cpu (core) |
| `memory` | RAM | Bytes |
| `ephemeral-storage` | Local ephemeral storage | Bytes |
| `hugepages-<size>` | Huge pages (Linux only) | Bytes |

Clusters can also provide
extended resources
(resources with a custom name, typically exposed by device plugins).

### Huge pages

For Linux workloads, you can specify _huge page_ resources.
Huge pages are a Linux-specific feature where the node kernel allocates blocks of memory
that are much larger than the default page size.

For example, on a system where the default page size is 4KiB, you could specify a limit,
`hugepages-2Mi: 80Mi`. If the container tries allocating over 40 2MiB huge pages (a
total of 80 MiB), that allocation fails.

**Note:**
You cannot overcommit `hugepages-*` resources.
This is different from the `memory` and `cpu` resources.

CPU and memory are collectively referred to as *compute resources*, or *resources*. Compute
resources are measurable quantities that can be requested, allocated, and
consumed. They are distinct from
API resources. API resources, such as Pods and
Services are objects that can be read and modified
through the Kubernetes API server.

## Resource requests and limits of Pod and container

For each container, you can specify resource limits and requests,
including the following:

* `spec.containers[].resources.limits.cpu`
* `spec.containers[].resources.limits.memory`
* `spec.containers[].resources.limits.ephemeral-storage`
* `spec.containers[].resources.limits.hugepages-<size>`
* `spec.containers[].resources.requests.cpu`
* `spec.containers[].resources.requests.memory`
* `spec.containers[].resources.requests.ephemeral-storage`
* `spec.containers[].resources.requests.hugepages-<size>`

Although you can only specify requests and limits for individual containers,
it is also useful to think about the overall resource requests and limits for
a Pod.
For a particular resource, a *Pod resource request/limit* is the sum of the
resource requests/limits of that type for each container in the Pod.

## Pod-level resource specification

**Feature state:**

Provided your cluster has the `PodLevelResources`
feature gate enabled,
you can specify resource requests and limits at
the Pod level. At the Pod level, Kubernetes
only supports resource requests or limits for specific resource types: `cpu` and /
or `memory` and / or `hugepages`. With this feature, Kubernetes allows you to declare an overall resource
budget for the Pod, which is especially helpful when dealing with a large number of
containers where it can be difficult to accurately gauge individual resource needs.
Additionally, it enables containers within a Pod to share idle resources with each
other, improving resource utilization.

For a Pod, you can specify resource limits and requests for CPU and memory by including the following:
* `spec.resources.limits.cpu`
* `spec.resources.limits.memory`
* `spec.resources.limits.hugepages-<size>`
* `spec.resources.requests.cpu`
* `spec.resources.requests.memory`
* `spec.resources.requests.hugepages-<size>`

## Resource units in Kubernetes

### CPU resource units {#meaning-of-cpu}

Limits and requests for CPU resources are measured in *cpu* units.
In Kubernetes, 1 CPU unit is equivalent to **1 physical CPU core**,
or **1 virtual core**, depending on whether the node is a physical host
or a virtual machine running inside a physical machine.

Fractional requests are allowed. When you define a container with
`spec.containers[].resources.requests.cpu` set to `0.5`, you are requesting half
as much CPU time compared to if you asked for `1.0` CPU.
For CPU resource units, the quantity expression `0.1` is equivalent to the
expression `100m`, which can be read as "one hundred millicpu". Some people say
"one hundred millicores", and this is understood to mean the same thing.

CPU resource is always specified as an absolute amount of resource, never as a relative amount. For example,
`500m` CPU represents the roughly same amount of computing power whether that container
runs on a single-core, dual-core, or 48-core machine.

**Note:**
Kubernetes doesn't allow you to specify CPU resources with a precision finer than
`1m` or `0.001` CPU. To avoid accidentally using an invalid CPU quantity, it's useful to specify CPU units using the milliCPU form
instead of the decimal form when using less than 1 CPU unit.

For example, you have a Pod that uses `5m` or `0.005` CPU and would like to decrease
its CPU resources. By using the decimal form, it's harder to spot that `0.0005` CPU
is an invalid value, while by using the milliCPU form, it's easier to spot that
`0.5m` is an invalid value.

### Memory resource units {#meaning-of-memory}

Limits and requests for `memory` are measured in bytes. You can express memory as
a plain integer or as a fixed-point number using one of these
quantity suffixes:
E, P, T, G, M, k. You can also use the power-of-two equivalents: Ei, Pi, Ti, Gi,
Mi, Ki. The Kubernetes API also allows m as a suffix (for millibytes: 1/1000 of a byte),
but this isn't useful to specify: you must always assign whole numbers of bytes, or sometimes larger chunks such as multiples of 1 gibibyte.

Here are some examples of memory quantities that represent roughly the same value:

```shell
128974848, 129e6, 129M,  128974848000m, 123Mi
```

Pay attention to the case of the suffixes. "M" means megabytes, while "m" means millibytes. If you request `400m` of memory, this is a request for 0.4 bytes. Someone who types that probably meant to ask for 400 mebibytes (`400Mi`)
or 400 megabytes (`400M`).

## Container resources example {#example-1}

The following Pod has two containers. Both containers are defined with a request for
0.25 CPU
and 64MiB (226 bytes) of memory. Each container has a limit of 0.5
CPU and 128MiB of memory. You can say the Pod has a request of 0.5 CPU and 128
MiB of memory, and a limit of 1 CPU and 256MiB of memory.

```yaml
---
apiVersion: v1
kind: Pod
metadata:
  name: frontend
spec:
  containers:
  - name: app
    image: images.my-company.example/app:v4
    resources:
      requests:
        memory: "64Mi"
        cpu: "250m"
      limits:
        memory: "128Mi"
        cpu: "500m"
  - name: log-aggregator
    image: images.my-company.example/log-aggregator:v6
    resources:
      requests:
        memory: "64Mi"
        cpu: "250m"
      limits:
        memory: "128Mi"
        cpu: "500m"
```

## Pod resources example {#example-2}

**Feature state:**

This feature can be enabled by setting the `PodLevelResources`
feature gate.
The following Pod has an explicit request of 1 CPU and 100 MiB of memory, and an
explicit limit of 1 CPU and 200 MiB of memory. The `pod-resources-demo-ctr-1`
container has explicit requests and limits set. However, the
`pod-resources-demo-ctr-2` container will simply share the resources available
within the Pod resource boundaries, as it does not have explicit requests and limits
set.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: pod-resources-demo
  namespace: pod-resources-example
spec:
  resources:
    limits:
      cpu: "1"
      memory: "200Mi"
    requests:
      cpu: "1"
      memory: "100Mi"
  containers:
  - name: pod-resources-demo-ctr-1
    image: nginx
    resources:
      limits:
        cpu: "0.5"
        memory: "100Mi"
      requests:
        cpu: "0.5"
        memory: "50Mi"
  - name: pod-resources-demo-ctr-2
    image: fedora
    command:
    - sleep
    - inf 
```

## How Pods with resource requests are scheduled

When you create a Pod, the Kubernetes scheduler selects a node for the Pod to
run on. Each node has a maximum capacity for each of the resource types: the
amount of CPU and memory it can provide for Pods. The scheduler ensures that,
for each resource type, the sum of the resource requests of the scheduled
containers is less than the capacity of the node.
Note that although actual memory
or CPU resource usage on nodes is very low, the scheduler still refuses to place
a Pod on a node if the capacity check fails. This protects against a resource
shortage on a node when resource usage later increases, for example, during a
daily peak in request rate.
