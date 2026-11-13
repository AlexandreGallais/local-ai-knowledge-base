---
title: "HorizontalPodAutoscaler (part 2 of 9)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/autoscaling/horizontal-pod-autoscaler-v2.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# HorizontalPodAutoscaler (part 2 of 9)

## MetricSpec {#MetricSpec}

MetricSpec specifies how to scale based on a single metric (only `type` and one other matching field should be set at once).

   | Field | Description

       | `containerResource`ContainerResourceMetricSource
       | containerResource refers to a resource metric (such as those specified in requests and limits) known to Kubernetes describing a single container in each pod of the current scale target (e.g. CPU or memory). Such metrics are built in to Kubernetes, and have special scaling options on top of those available to normal per-pod metrics using the "pods" source.

       | `external`ExternalMetricSource
       | external refers to a global metric that is not associated with any Kubernetes object. It allows autoscaling based on information coming from components running outside of cluster (for example length of queue in cloud messaging service, or QPS from loadbalancer running outside of cluster).

       | `object`ObjectMetricSource
       | object refers to a metric describing a single kubernetes object (for example, hits-per-second on an Ingress object).

       | `pods`PodsMetricSource
       | pods refers to a metric describing each pod in the current scale target (for example, transactions-processed-per-second).  The values will be averaged together before being compared to the target value.

       | `resource`ResourceMetricSource
       | resource refers to a resource metric (such as those specified in requests and limits) known to Kubernetes describing each pod in the current scale target (e.g. CPU or memory). Such metrics are built in to Kubernetes, and have special scaling options on top of those available to normal per-pod metrics using the "pods" source.

       | `type` *string
       | type is the type of metric source.  It should be one of "ContainerResource", "External", "Object", "Pods" or "Resource", each mapping to a matching field in the object.

## MetricStatus {#MetricStatus}

MetricStatus describes the last-read state of a single metric.

   | Field | Description

       | `containerResource`ContainerResourceMetricStatus
       | containerResource refers to a resource metric (such as those specified in requests and limits) known to Kubernetes describing a single container in each pod in the current scale target (e.g. CPU or memory). Such metrics are built in to Kubernetes, and have special scaling options on top of those available to normal per-pod metrics using the "pods" source.

       | `external`ExternalMetricStatus
       | external refers to a global metric that is not associated with any Kubernetes object. It allows autoscaling based on information coming from components running outside of cluster (for example length of queue in cloud messaging service, or QPS from loadbalancer running outside of cluster).

       | `object`ObjectMetricStatus
       | object refers to a metric describing a single kubernetes object (for example, hits-per-second on an Ingress object).

       | `pods`PodsMetricStatus
       | pods refers to a metric describing each pod in the current scale target (for example, transactions-processed-per-second).  The values will be averaged together before being compared to the target value.

       | `resource`ResourceMetricStatus
       | resource refers to a resource metric (such as those specified in requests and limits) known to Kubernetes describing each pod in the current scale target (e.g. CPU or memory). Such metrics are built in to Kubernetes, and have special scaling options on top of those available to normal per-pod metrics using the "pods" source.

       | `type` *string
       | type is the type of metric source.  It will be one of "ContainerResource", "External", "Object", "Pods" or "Resource", each corresponds to a matching field in the object.

## MetricTarget {#MetricTarget}

MetricTarget defines the target value, average value, or average utilization of a specific metric

   | Field | Description

       | `averageUtilization`integer
       | averageUtilization is the target value of the average of the resource metric across all relevant pods, represented as a percentage of the requested value of the resource for the pods. Currently only valid for Resource metric source type

       | `averageValue`Quantity
       | averageValue is the target value of the average of the metric across all relevant pods (as a quantity)

       | `type` *string
       | type represents whether the metric type is Utilization, Value, or AverageValue

       | `value`Quantity
       | value is the target value of the metric (as a quantity).

## MetricValueStatus {#MetricValueStatus}

MetricValueStatus holds the current value for a metric

   | Field | Description

       | `averageUtilization`integer
       | averageUtilization is the current value of the average of the resource metric across all relevant pods, represented as a percentage of the requested value of the resource for the pods.

       | `averageValue`Quantity
       | averageValue is the current value of the average of the metric across all relevant pods (as a quantity)

       | `value`Quantity
       | value is the current value of the metric (as a quantity).

## ObjectMetricSource {#ObjectMetricSource}

ObjectMetricSource indicates how to scale on a metric describing a kubernetes object (for example, hits-per-second on an Ingress object).

   | Field | Description

       | `describedObject` *CrossVersionObjectReference
       | describedObject specifies the descriptions of a object,such as kind,name apiVersion

       | `metric` *MetricIdentifier
       | metric identifies the target metric by name and selector

       | `target` *MetricTarget
       | target specifies the target value for the given metric

## ObjectMetricStatus {#ObjectMetricStatus}

ObjectMetricStatus indicates the current value of a metric describing a kubernetes object (for example, hits-per-second on an Ingress object).

   | Field | Description

       | `current` *MetricValueStatus
       | current contains the current value for the given metric

       | `describedObject` *CrossVersionObjectReference
       | describedObject specifies the descriptions of a object,such as kind,name apiVersion

       | `metric` *MetricIdentifier
       | metric identifies the target metric by name and selector

## PodsMetricSource {#PodsMetricSource}

PodsMetricSource indicates how to scale on a metric describing each pod in the current scale target (for example, transactions-processed-per-second). The values will be averaged together before being compared to the target value.

   | Field | Description

       | `metric` *MetricIdentifier
       | metric identifies the target metric by name and selector

       | `target` *MetricTarget
       | target specifies the target value for the given metric

## PodsMetricStatus {#PodsMetricStatus}

PodsMetricStatus indicates the current value of a metric describing each pod in the current scale target (for example, transactions-processed-per-second).

   | Field | Description

       | `current` *MetricValueStatus
       | current contains the current value for the given metric

       | `metric` *MetricIdentifier
       | metric identifies the target metric by name and selector

## ResourceMetricSource {#ResourceMetricSource}

ResourceMetricSource indicates how to scale on a resource metric known to Kubernetes, as specified in requests and limits, describing each pod in the current scale target (e.g. CPU or memory).  The values will be averaged together before being compared to the target.  Such metrics are built in to Kubernetes, and have special scaling options on top of those available to normal per-pod metrics using the &#34;pods&#34; source.  Only one &#34;target&#34; type should be set.

   | Field | Description

       | `name` *string
       | name is the name of the resource in question.

       | `target` *MetricTarget
       | target specifies the target value for the given metric

## ResourceMetricStatus {#ResourceMetricStatus}

ResourceMetricStatus indicates the current value of a resource metric known to Kubernetes, as specified in requests and limits, describing each pod in the current scale target (e.g. CPU or memory).  Such metrics are built in to Kubernetes, and have special scaling options on top of those available to normal per-pod metrics using the &#34;pods&#34; source.

   | Field | Description

       | `current` *MetricValueStatus
       | current contains the current value for the given metric

       | `name` *string
       | name is the name of the resource in question.
