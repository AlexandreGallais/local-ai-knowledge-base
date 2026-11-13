---
title: "Resource Management for Pods and Containers (part 2 of 3)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/concepts/configuration/manage-resources-containers.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Resource Management for Pods and Containers (part 2 of 3)

## How Kubernetes applies resource requests and limits {#how-pods-with-resource-limits-are-run}

When the kubelet starts a container as part of a Pod, the kubelet passes that container's
requests and limits for memory and CPU to the container runtime.

On Linux, the container runtime typically configures
kernel cgroups that apply and enforce the
limits you defined.

- The CPU limit defines a hard ceiling on how much CPU time the container can use.
  During each scheduling interval (time slice), the Linux kernel checks to see if this
  limit is exceeded; if so, the kernel waits before allowing that cgroup to resume execution.
- The CPU request typically defines a weighting. If several different containers (cgroups)
  want to run on a contended system, workloads with larger CPU requests are allocated more
  CPU time than workloads with small requests.
- The memory request is mainly used during (Kubernetes) Pod scheduling. On a node that uses
  cgroups v2, the container runtime might use the memory request as a hint to set
  `memory.min` and `memory.low`.
- The memory limit defines a memory limit for that cgroup. If the container tries to
  allocate more memory than this limit, the Linux kernel out-of-memory subsystem activates
  and, typically, intervenes by stopping one of the processes in the container that tried
  to allocate memory. If that process is the container's PID 1, and the container is marked
  as restartable, Kubernetes restarts the container.
- The memory limit for the Pod or container can also apply to pages in memory backed
  volumes, such as an `emptyDir`. The kubelet tracks `tmpfs` emptyDir volumes as container
  memory use, rather than as local ephemeral storage.
  When using memory backed `emptyDir`,
  be sure to check the notes below.

If a container exceeds its memory request and the node that it runs on becomes short of
memory overall, it is likely that the Pod the container belongs to will be
evicted.

A container might or might not be allowed to exceed its CPU limit for extended periods of time.
However, container runtimes don't terminate Pods or containers for excessive CPU usage.

To determine whether a container cannot be scheduled or is being killed due to resource limits,
see the Troubleshooting section.

### Resizing container resources

After creating a Pod, you may need to adjust its CPU or memory resources based on
actual usage patterns. Kubernetes provides two approaches for resizing Pod resources:

#### In-place resize {#pod-resize-inplace}
**Feature state:**

You can modify the CPU and memory `requests` and `limits` of containers
in a running Pod without recreating it. This is called _in-place Pod vertical scaling_
or _in-place Pod resize_. To perform an in-place resize, update the container's resource
specifications using the Pod's `/resize` subresource. You can control whether a container
restart is required by setting the `resizePolicy` field in the container specification.

**Note:**
In-place resize currently applies to container-level resources. For resizing Pod-level
resources, see Resize Pod CPU and Memory Resources.

**Note:**
**Feature state:**

When the `InPlacePodVerticalScalingSchedulerPreemption` feature gate is enabled,
deferred in-place resize requests can trigger `kube-scheduler` to preempt
lower-priority Pods on the assigned node to make room for the resize.
For more details, see
Preemption for in-place Pod resize.

#### Resizing by launching replacement Pods

The cloud native approach to changing a Pod's resources is to update the Pod template
in the workload object (such as a Deployment or StatefulSet) and let the workload's
controller replace Pods with new ones that have the updated resources. This approach
works with any Kubernetes version and can change any Pod specification.

For more details about Pod resizing, see Resizing Pods.
For detailed instructions on in-place resize, see
Resize CPU and Memory Resources assigned to Containers.
You can also use the Vertical Pod Autoscaler
to automatically manage Pod resource recommendations.

### Monitoring compute & memory resource usage

The kubelet reports the resource usage of a Pod as part of the Pod
`status`.

If optional tools for monitoring
are available in your cluster, then Pod resource usage can be retrieved either
from the Metrics API
directly or from your monitoring tools.

### Considerations for memory backed `emptyDir` volumes {#memory-backed-emptydir}

**Note:**
**Feature state:**

When the `InPlacePodVerticalScalingMemoryBackedVolumes` feature gate is enabled, you can dynamically adjust the `sizeLimit` of a memory-backed (`medium: Memory`) `emptyDir` volume on a running Pod without requiring Pod recreation or container restarts. For step-by-step instructions, see Resize CPU and Memory Resources assigned to Containers.

**Caution:**
If you do not specify a `sizeLimit` for an `emptyDir` volume, that volume may
consume up to that pod's memory limit (`Pod.spec.containers[].resources.limits.memory`).
If you do not set a memory limit, the pod has no upper bound on memory consumption,
and can consume all available memory on the node. Kubernetes schedules pods based
on resource requests (`Pod.spec.containers[].resources.requests`) and will not
consider memory usage above the request when deciding if another pod can fit on
a given node. This can result in a denial of service and cause the OS to do
out-of-memory (OOM) handling. It is possible to create any number of `emptyDir`s
that could potentially consume all available memory on the node, making OOM
more likely.

From the perspective of memory management, there are some similarities between
when a process uses memory as a work area and when using memory-backed
`emptyDir`. But when using memory as a volume, like memory-backed `emptyDir`,
there are additional points below that you should be careful of:

* Files stored on a memory-backed volume are almost entirely managed by the
  user application. Unlike when used as a work area for a process, you can not
  rely on things like language-level garbage collection.
* The purpose of writing files to a volume is to save data or pass it between
  applications. Neither Kubernetes nor the OS may automatically delete files
  from a volume, so memory used by those files can not be reclaimed when the
  system or the pod are under memory pressure.
* A memory-backed `emptyDir` is useful because of its performance, but memory
  is generally much smaller in size and much higher in cost than other storage
  media, such as disks or SSDs. Using large amounts of memory for `emptyDir`
  volumes may affect the normal operation of your pod or of the whole node,
  so should be used carefully.

If you are administering a cluster or namespace, you can also set
ResourceQuota that limits memory use;
you may also want to define a LimitRange
for additional enforcement.
If you specify a `spec.containers[].resources.limits.memory` for each Pod,
then the maximum size of an `emptyDir` volume will be the pod's memory limit.

As an alternative, a cluster administrator can enforce size limits for
`emptyDir` volumes in new Pods using a policy mechanism such as
ValidatingAdmissionPolicy.

## Local ephemeral storage

For general concepts about local ephemeral storage and hints about
configuring the requests and/or limits of ephemeral storage for a container,
please check the local ephemeral storage
page.

### Resource monitoring for local ephemeral storage

The kubelet can measure how much local ephemeral storage is being used. It
does this as long as you have enabled local ephemeral storage capacity isolation.

Kubernetes tracks the amount of ephemeral storage a Pod uses from the following:
* Writing to the container's writable layer (rootfs), container images, or both.
* Writing to local `emptyDir` volumes.
* The Pod's own logs (usually stored under `/var/log/pods`).
* System files managed by Kubernetes that are mapped into the Pod, such as `/etc/hosts`.

## Extended resources

Extended resources are fully-qualified resource names outside the
`kubernetes.io` domain. They allow cluster operators to advertise and users to
consume the non-Kubernetes-built-in resources.

There are two steps required to use Extended Resources. First, the cluster
operator must advertise an Extended Resource. Second, users must request the
Extended Resource in Pods.

### Managing extended resources

#### Node-level extended resources

Node-level extended resources are tied to nodes.

##### Device plugin managed resources
See Device
Plugin
for how to advertise device plugin managed resources on each node.

##### Other resources

To advertise a new node-level extended resource, the cluster operator can
submit a `PATCH` HTTP request to the API server to specify the available
quantity in the `status.capacity` for a node in the cluster. After this
operation, the node's `status.capacity` will include a new resource. The
`status.allocatable` field is updated automatically with the new resource
asynchronously by the kubelet.

Because the scheduler uses the node's `status.allocatable` value when
evaluating Pod fitness, the scheduler only takes account of the new value after
that asynchronous update. There may be a short delay between patching the
node capacity with a new resource and the time when the first Pod that requests
the resource can be scheduled on that node.

**Example:**

Here is an example showing how to use `curl` to form an HTTP request that
advertises five "example.com/foo" resources on node `k8s-node-1` whose master
is `k8s-master`.

```shell
curl --header "Content-Type: application/json-patch+json" \
--request PATCH \
--data '[{"op": "add", "path": "/status/capacity/example.com~1foo", "value": "5"}]' \
http://k8s-master:8080/api/v1/nodes/k8s-node-1/status
```

**Note:**
In the preceding request, `~1` is the encoding for the character `/`
in the patch path. The operation path value in JSON-Patch is interpreted as a
JSON-Pointer. For more details, see
IETF RFC 6901, section 3.

#### Cluster-level extended resources

Cluster-level extended resources are not tied to nodes. They are usually managed
by scheduler extenders, which handle the resource consumption and resource quota.

You can specify the extended resources that are handled by scheduler extenders
in scheduler configuration

**Example:**

The following configuration for a scheduler policy indicates that the
cluster-level extended resource "example.com/foo" is handled by the scheduler
extender.

- The scheduler sends a Pod to the scheduler extender only if the Pod requests
     "example.com/foo".
- The `ignoredByScheduler` field specifies that the scheduler does not check
     the "example.com/foo" resource in its `PodFitsResources` predicate.

```json
{
  "kind": "Policy",
  "apiVersion": "v1",
  "extenders": [
    {
      "urlPrefix":"<extender-endpoint>",
      "bindVerb": "bind",
      "managedResources": [
        {
          "name": "example.com/foo",
          "ignoredByScheduler": true
        }
      ]
    }
  ]
}
```

#### Extended resources allocation by DRA
Extended resources allocation by DRA allows cluster administrators to specify an `extendedResourceName`
in DeviceClass, then the devices matching the DeviceClass can be requested from a pod's extended
resource requests. Read more about
Extended Resource allocation by DRA.

### Consuming extended resources

Users can consume extended resources in Pod specs like CPU and memory.
The scheduler takes care of the resource accounting so that no more than the
available amount is simultaneously allocated to Pods.

The API server restricts quantities of extended resources to whole numbers.
Examples of _valid_ quantities are `3`, `3000m` and `3Ki`. Examples of
_invalid_ quantities are `0.5` and `1500m` (because `1500m` would result in `1.5`).

**Note:**
Extended resources replace Opaque Integer Resources.
Users can use any domain name prefix other than `kubernetes.io` which is reserved.

To consume an extended resource in a Pod, include the resource name as a key
in the `spec.containers[].resources.limits` map in the container spec.

**Note:**
Extended resources cannot be overcommitted, so request and limit
must be equal if both are present in a container spec.

A Pod is scheduled only if all of the resource requests are satisfied, including
CPU, memory and any extended resources. The Pod remains in the `PENDING` state
as long as the resource request cannot be satisfied.

**Example:**

The Pod below requests 2 CPUs and 1 "example.com/foo" (an extended resource).

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-pod
spec:
  containers:
  - name: my-container
    image: myimage
    resources:
      requests:
        cpu: 2
        example.com/foo: 1
      limits:
        example.com/foo: 1
```

## PID limiting

Process ID (PID) limits allow for the configuration of a kubelet
to limit the number of PIDs that a given Pod can consume. See
PID Limiting for information.
