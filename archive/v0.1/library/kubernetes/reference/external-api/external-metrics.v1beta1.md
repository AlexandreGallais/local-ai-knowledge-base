---
title: "Kubernetes External Metrics (v1beta1)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/external-api/external-metrics.v1beta1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Kubernetes External Metrics (v1beta1)

Package v1beta1 is the v1beta1 version of the external metrics API.

## Resource Types

- ExternalMetricValue
- ExternalMetricValueList

## `ExternalMetricValue`     {#external-metrics-k8s-io-v1beta1-ExternalMetricValue}

**Appears in:**

- ExternalMetricValueList

ExternalMetricValue is a metric value for external metric
A single metric value is identified by metric name and a set of string labels.
For one metric there can be multiple values with different sets of labels.

 | Field | Description

 | `apiVersion`string | `external.metrics.k8s.io/v1beta1`

 | `kind`string | `ExternalMetricValue`

 | `metricName` [Required]
`string`

 |
   the name of the metric

 | `metricLabels` [Required]
`map[string]string`

 |
   a set of labels that identify a single time series for the metric

 | `timestamp` [Required]
`meta/v1.Time`

 |
   indicates the time at which the metrics were produced

 | `window` [Required]
`int64`

 |
   indicates the window ([Timestamp-Window, Timestamp]) from
which these metrics were calculated, when returning rate
metrics calculated from cumulative metrics (or zero for
non-calculated instantaneous metrics).

 | `value` [Required]
`k8s.io/apimachinery/pkg/api/resource.Quantity`

 |
   the value of the metric

## `ExternalMetricValueList`     {#external-metrics-k8s-io-v1beta1-ExternalMetricValueList}

ExternalMetricValueList is a list of values for a given metric for some set labels

 | Field | Description

 | `apiVersion`string | `external.metrics.k8s.io/v1beta1`

 | `kind`string | `ExternalMetricValueList`

 | `metadata` [Required]
`meta/v1.ListMeta`

 |
   No description provided.

 | `items` [Required]
`[]ExternalMetricValue`

 |
   value of the metric matching a given set of labels
