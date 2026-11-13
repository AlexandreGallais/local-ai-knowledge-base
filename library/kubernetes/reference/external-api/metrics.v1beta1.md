---
title: "Kubernetes Metrics (v1beta1)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/external-api/metrics.v1beta1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Kubernetes Metrics (v1beta1)

Package v1beta1 is the v1beta1 version of the metrics API.

## Resource Types

- NodeMetrics
- NodeMetricsList
- PodMetrics
- PodMetricsList

## `NodeMetrics`     {#metrics-k8s-io-v1beta1-NodeMetrics}

**Appears in:**

- NodeMetricsList

NodeMetrics sets resource usage metrics of a node.

 | Field | Description

 | `apiVersion`string | `metrics.k8s.io/v1beta1`

 | `kind`string | `NodeMetrics`

 | `metadata`
`meta/v1.ObjectMeta`

 |
   Standard object's metadata.
More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
Refer to the Kubernetes API documentation for the fields of the `metadata` field.

 | `timestamp` [Required]
`meta/v1.Time`

 |
   The following fields define time interval from which metrics were
collected from the interval [Timestamp-Window, Timestamp].

 | `window` [Required]
`meta/v1.Duration`

 |
   No description provided.

 | `usage` [Required]
`core/v1.ResourceList`

 |
   The memory usage is the memory working set.

## `NodeMetricsList`     {#metrics-k8s-io-v1beta1-NodeMetricsList}

NodeMetricsList is a list of NodeMetrics.

 | Field | Description

 | `apiVersion`string | `metrics.k8s.io/v1beta1`

 | `kind`string | `NodeMetricsList`

 | `metadata` [Required]
`meta/v1.ListMeta`

 |
   Standard list metadata.
More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

 | `items` [Required]
`[]NodeMetrics`

 |
   List of node metrics.

## `PodMetrics`     {#metrics-k8s-io-v1beta1-PodMetrics}

**Appears in:**

- PodMetricsList

PodMetrics sets resource usage metrics of a pod.

 | Field | Description

 | `apiVersion`string | `metrics.k8s.io/v1beta1`

 | `kind`string | `PodMetrics`

 | `metadata`
`meta/v1.ObjectMeta`

 |
   Standard object's metadata.
More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
Refer to the Kubernetes API documentation for the fields of the `metadata` field.

 | `timestamp` [Required]
`meta/v1.Time`

 |
   The following fields define time interval from which metrics were
collected from the interval [Timestamp-Window, Timestamp].

 | `window` [Required]
`meta/v1.Duration`

 |
   No description provided.

 | `containers` [Required]
`[]ContainerMetrics`

 |
   Metrics for all containers are collected within the same time window.

## `PodMetricsList`     {#metrics-k8s-io-v1beta1-PodMetricsList}

PodMetricsList is a list of PodMetrics.

 | Field | Description

 | `apiVersion`string | `metrics.k8s.io/v1beta1`

 | `kind`string | `PodMetricsList`

 | `metadata` [Required]
`meta/v1.ListMeta`

 |
   Standard list metadata.
More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

 | `items` [Required]
`[]PodMetrics`

 |
   List of pod metrics.

## `ContainerMetrics`     {#metrics-k8s-io-v1beta1-ContainerMetrics}

**Appears in:**

- PodMetrics

ContainerMetrics sets resource usage metrics of a container.

 | Field | Description

 | `name` [Required]
`string`

 |
   Container name corresponding to the one from pod.spec.containers.

 | `usage` [Required]
`core/v1.ResourceList`

 |
   The memory usage is the memory working set.
