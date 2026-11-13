---
title: "Kubernetes Custom Metrics (v1beta2)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/external-api/custom-metrics.v1beta2.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Kubernetes Custom Metrics (v1beta2)

Package v1beta2 is the v1beta2 version of the custom_metrics API.

## Resource Types

- MetricListOptions
- MetricValue
- MetricValueList

## `MetricListOptions`     {#custom-metrics-k8s-io-v1beta2-MetricListOptions}

MetricListOptions is used to select metrics by their label selectors

 | Field | Description

 | `apiVersion`string | `custom.metrics.k8s.io/v1beta2`

 | `kind`string | `MetricListOptions`

 | `labelSelector`
`string`

 |
   A selector to restrict the list of returned objects by their labels.
Defaults to everything.

 | `metricLabelSelector`
`string`

 |
   A selector to restrict the list of returned metrics by their labels

## `MetricValue`     {#custom-metrics-k8s-io-v1beta2-MetricValue}

**Appears in:**

- MetricValueList

MetricValue is the metric value for some object

 | Field | Description

 | `apiVersion`string | `custom.metrics.k8s.io/v1beta2`

 | `kind`string | `MetricValue`

 | `describedObject` [Required]
`core/v1.ObjectReference`

 |
   a reference to the described object

 | `metric` [Required]
`MetricIdentifier`

 |
   No description provided.

 | `timestamp` [Required]
`meta/v1.Time`

 |
   indicates the time at which the metrics were produced

 | `windowSeconds` [Required]
`int64`

 |
   indicates the window ([Timestamp-Window, Timestamp]) from
which these metrics were calculated, when returning rate
metrics calculated from cumulative metrics (or zero for
non-calculated instantaneous metrics).

 | `value` [Required]
`k8s.io/apimachinery/pkg/api/resource.Quantity`

 |
   the value of the metric for this

## `MetricValueList`     {#custom-metrics-k8s-io-v1beta2-MetricValueList}

MetricValueList is a list of values for a given metric for some set of objects

 | Field | Description

 | `apiVersion`string | `custom.metrics.k8s.io/v1beta2`

 | `kind`string | `MetricValueList`

 | `metadata` [Required]
`meta/v1.ListMeta`

 |
   No description provided.

 | `items` [Required]
`[]MetricValue`

 |
   the value of the metric across the described objects

## `MetricIdentifier`     {#custom-metrics-k8s-io-v1beta2-MetricIdentifier}

**Appears in:**

- MetricValue

MetricIdentifier identifies a metric by name and, optionally, selector

 | Field | Description

 | `name` [Required]
`string`

 |
   name is the name of the given metric

 | `selector`
`meta/v1.LabelSelector`

 |
   selector represents the label selector that could be used to select
this metric, and will generally just be the selector passed in to
the query used to fetch this metric.
When left blank, only the metric's Name will be used to gather metrics.
