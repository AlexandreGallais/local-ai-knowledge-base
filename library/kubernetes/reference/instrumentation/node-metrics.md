---
title: "Node metrics data"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/instrumentation/node-metrics.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

The kubelet
gathers metric statistics at the node, volume, pod and container level,
and emits this information in the
Summary API.

You can send a proxied request to the stats summary API via the
Kubernetes API server.

Here is an example of a Summary API request for a node named `minikube`:

```shell
kubectl get --raw "/api/v1/nodes/minikube/proxy/stats/summary"
```

Here is the same API call using `curl`:

```shell
# You need to run "kubectl proxy" first
# Change 8080 to the port that "kubectl proxy" assigns
curl http://localhost:8080/api/v1/nodes/minikube/proxy/stats/summary
```

**Note:**
Beginning with `metrics-server` 0.6.x, `metrics-server` queries the `/metrics/resource`
kubelet endpoint, and not `/stats/summary`.

## Summary metrics API source {#summary-api-source}

By default, Kubernetes fetches node summary metrics data using an embedded
cAdvisor that runs within the kubelet. If you
enable the `PodAndContainerStatsFromCRI` feature gate
in your cluster, and you use a container runtime that supports statistics access via
Container Runtime Interface (CRI), then
the kubelet fetches Pod- and container-level metric data using CRI, and not via cAdvisor.

## Pressure Stall Information (PSI) {#psi}

**Feature state:**

As a stable feature, Kubernetes lets you configure kubelet to collect Linux kernel
Pressure Stall Information
(PSI) for CPU, memory, and I/O usage. The information is collected at node, pod and container level.
See Summary API for detailed schema.
Starting with Kubernetes v.1.36, the `KubeletPSI` feature gate is locked to true and cannot be disabled. The information is also exposed in
Prometheus metrics.

You can learn how to interpret the PSI metrics in Understand PSI Metrics.

### Requirements

Pressure Stall Information requires:

- Linux kernel versions 4.20 or later.
- cgroup v2

## What's next

The task pages for Troubleshooting Clusters discuss
how to use a metrics pipeline that rely on these data.
