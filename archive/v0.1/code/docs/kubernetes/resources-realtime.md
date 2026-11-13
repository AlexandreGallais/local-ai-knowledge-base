---
id: kubernetes-resources-realtime
title: Resources, exclusive cores and .NET memory
topic: kubernetes
summary: Requests, limits and units, exclusive CPU cores for latency, and the .NET garbage collector in a container. Kubernetes 1.37.
tool: kubernetes
version: "1.37"
checked: 2026-11-13
sources: [S1, S2, S3]
license: MIT, written for this base from CC BY 4.0 sources
variant: files
---

# Resources, exclusive cores and .NET memory

Contents: 1. Requests and limits · 2. When latency matters · 3. .NET memory · Sources

## 1. Requests and limits (Kubernetes resources)

| Point | Rule |
| --- | --- |
| CPU limit | A hard limit applied by the kernel: the container is throttled, never killed. [S1] |
| Memory limit | Over the limit, the container is killed (`OOMKilled`, code 137) and restarted if it can be. [S1] |
| Limit without request | The request is set to the limit. [S1] |
| Units | CPU in cores or millicores (`500m`); memory in `Mi` or `Gi`. `400m` of memory is 0.4 byte. [S1] |

## 2. When latency matters (exclusive CPU cores)

- The CPU manager policy is `none` by default. The `static` policy is set on the kubelet of each node (`cpuManagerPolicy: static`), with a CPU reserve that is not zero. [S2]
- Only the containers of a "Guaranteed" Pod with a whole number of CPUs get exclusive cores. A fractional request stays in the shared pool. [S2]
- Changing the policy means draining the node and restarting the kubelet: it is the work of the cluster administrator. [S2]

For a latency-sensitive process, write requests equal to limits, CPU as a whole number, memory with a margin above the .NET heap:

```yaml
resources:
  requests:
    cpu: "2"
    memory: "1Gi"
  limits:
    cpu: "2"
    memory: "1Gi"
```

Then ask the cluster administrator whether the `static` policy is active. Without it, the manifest alone reserves no core. Keep a tolerant liveness probe and a separate startup probe (`docs/kubernetes/health-endpoints.md`).

## 3. The .NET garbage collector in a container

- The hard heap limit is 75 % of the container memory limit by default, 20 MB at least. [S3]
- Settings: `DOTNET_gcServer`, `DOTNET_GCHeapCount`, `DOTNET_GCHeapHardLimit`, `DOTNET_GCConserveMemory`. [S3]
- From .NET 9, dynamic adaptation to the size of the application is on by default. [S3]

```yaml
env:
  - name: DOTNET_GCHeapHardLimit
    value: "0x30000000"
```

Set a heap limit only with a measure of the real use; the default of 75 % fits most services.

## Sources

- [S1] Kubernetes, "Resource Management for Pods and Containers", <https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/>, read 2026-11-12, CC BY 4.0, summarized.
- [S2] Kubernetes, "Control CPU Management Policies on the Node", <https://kubernetes.io/docs/tasks/administer-cluster/cpu-management-policies>, read 2026-11-12, CC BY 4.0, summarized.
- [S3] Microsoft, "Runtime configuration options for garbage collection", <https://learn.microsoft.com/dotnet/core/runtime-config/garbage-collector>, read 2026-11-12, CC BY 4.0, summarized.
