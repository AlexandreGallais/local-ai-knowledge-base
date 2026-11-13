---
title: "HorizontalPodAutoscaler (part 1 of 9)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/autoscaling/horizontal-pod-autoscaler-v2.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# HorizontalPodAutoscaler

`apiVersion: autoscaling/v2`

`import "k8s.io/api/autoscaling/v2"`

## HorizontalPodAutoscaler {#HorizontalPodAutoscaler}

HorizontalPodAutoscaler is the configuration for a horizontal pod autoscaler, which automatically manages the replica count of any resource implementing the scale subresource based on the metrics specified.

   | Field | Description

       | `apiVersion`string
       | APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

       | `kind`string
       | Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

       | `metadata`ObjectMeta
       | metadata is the standard object metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata

       | `spec` *HorizontalPodAutoscalerSpec
       | spec is the specification for the behaviour of the autoscaler. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status.

       | `status`HorizontalPodAutoscalerStatus
       | status is the current information about the autoscaler.

## HorizontalPodAutoscalerSpec {#HorizontalPodAutoscalerSpec}

HorizontalPodAutoscalerSpec describes the desired functionality of the HorizontalPodAutoscaler.

   | Field | Description

       | `behavior`HorizontalPodAutoscalerBehavior
       | behavior configures the scaling behavior of the target in both Up and Down directions (scaleUp and scaleDown fields respectively). If not set, the default HPAScalingRules for scale up and scale down are used.

       | `maxReplicas` *integer
       | maxReplicas is the upper limit for the number of replicas to which the autoscaler can scale up. It cannot be less that minReplicas.

       | `metrics`MetricSpec array
       | metrics contains the specifications for which to use to calculate the desired replica count (the maximum replica count across all metrics will be used).  The desired replica count is calculated multiplying the ratio between the target value and the current value by the current number of pods.  Ergo, metrics used must decrease as the pod count is increased, and vice-versa.  See the individual metric source types for more information about how each type of metric must respond. If not set, the default metric will be set to 80% average CPU utilization.

       | `minReplicas`integer
       | minReplicas is the lower limit for the number of replicas to which the autoscaler can scale down.  It defaults to 1 pod.  minReplicas is allowed to be 0 if the alpha feature gate HPAScaleToZero is enabled and at least one Object or External metric is configured.  Scaling is active as long as at least one metric value is available.

       | `scaleTargetRef` *CrossVersionObjectReference
       | scaleTargetRef points to the target resource to scale, and is used to the pods for which metrics should be collected, as well as to actually change the replica count.

## HorizontalPodAutoscalerStatus {#HorizontalPodAutoscalerStatus}

HorizontalPodAutoscalerStatus describes the current status of a horizontal pod autoscaler.

   | Field | Description

       | `conditions`HorizontalPodAutoscalerCondition arraypatch strategy: merge on key `type`
       | conditions is the set of conditions required for this autoscaler to scale its target, and indicates whether or not those conditions are met.

       | `currentMetrics`MetricStatus array
       | currentMetrics is the last read state of the metrics used by this autoscaler.

       | `currentReplicas`integer
       | currentReplicas is current number of replicas of pods managed by this autoscaler, as last seen by the autoscaler.

       | `desiredReplicas` *integer
       | desiredReplicas is the desired number of replicas of pods managed by this autoscaler, as last calculated by the autoscaler.

       | `lastScaleTime`Time
       | lastScaleTime is the last time the HorizontalPodAutoscaler scaled the number of pods, used by the autoscaler to control how often the number of pods is changed.

       | `observedGeneration`integer
       | observedGeneration is the most recent generation observed by this autoscaler.

## HorizontalPodAutoscalerList {#HorizontalPodAutoscalerList}

HorizontalPodAutoscalerList is a list of horizontal pod autoscaler objects.

   | Field | Description

       | `apiVersion`string
       | APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

       | `items` *HorizontalPodAutoscaler array
       | items is the list of horizontal pod autoscaler objects.

       | `kind`string
       | Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

       | `metadata`ListMeta
       | metadata is the standard list metadata.

## ContainerResourceMetricSource {#ContainerResourceMetricSource}

ContainerResourceMetricSource indicates how to scale on a resource metric known to Kubernetes, as specified in requests and limits, describing each pod in the current scale target (e.g. CPU or memory).  The values will be averaged together before being compared to the target.  Such metrics are built in to Kubernetes, and have special scaling options on top of those available to normal per-pod metrics using the &#34;pods&#34; source.  Only one &#34;target&#34; type should be set.

   | Field | Description

       | `container` *string
       | container is the name of the container in the pods of the scaling target

       | `name` *string
       | name is the name of the resource in question.

       | `target` *MetricTarget
       | target specifies the target value for the given metric

## ContainerResourceMetricStatus {#ContainerResourceMetricStatus}

ContainerResourceMetricStatus indicates the current value of a resource metric known to Kubernetes, as specified in requests and limits, describing a single container in each pod in the current scale target (e.g. CPU or memory).  Such metrics are built in to Kubernetes, and have special scaling options on top of those available to normal per-pod metrics using the &#34;pods&#34; source.

   | Field | Description

       | `container` *string
       | container is the name of the container in the pods of the scaling target

       | `current` *MetricValueStatus
       | current contains the current value for the given metric

       | `name` *string
       | name is the name of the resource in question.

## CrossVersionObjectReference {#CrossVersionObjectReference}

CrossVersionObjectReference contains enough information to let you identify the referred resource.

   | Field | Description

       | `apiVersion`string
       | apiVersion is the API version of the referent

       | `kind` *string
       | kind is the kind of the referent; More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

       | `name` *string
       | name is the name of the referent; More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names

## ExternalMetricSource {#ExternalMetricSource}

ExternalMetricSource indicates how to scale on a metric not associated with any Kubernetes object (for example length of queue in cloud messaging service, or QPS from loadbalancer running outside of cluster).

   | Field | Description

       | `metric` *MetricIdentifier
       | metric identifies the target metric by name and selector

       | `target` *MetricTarget
       | target specifies the target value for the given metric

## ExternalMetricStatus {#ExternalMetricStatus}

ExternalMetricStatus indicates the current value of a global metric not associated with any Kubernetes object.

   | Field | Description

       | `current` *MetricValueStatus
       | current contains the current value for the given metric

       | `metric` *MetricIdentifier
       | metric identifies the target metric by name and selector

## HPAScalingPolicy {#HPAScalingPolicy}

HPAScalingPolicy is a single policy which must hold true for a specified past interval.

   | Field | Description

       | `periodSeconds` *integer
       | periodSeconds specifies the window of time for which the policy should hold true. PeriodSeconds must be greater than zero and less than or equal to 1800 (30 min).

       | `type` *string
       | type is used to specify the scaling policy.

       | `value` *integer
       | value contains the amount of change which is permitted by the policy. It must be greater than zero

## HPAScalingRules {#HPAScalingRules}

HPAScalingRules configures the scaling behavior for one direction via scaling Policy Rules and a configurable metric tolerance.

Scaling Policy Rules are applied after calculating DesiredReplicas from metrics for the HPA. They can limit the scaling velocity by specifying scaling policies. They can prevent flapping by specifying the stabilization window, so that the number of replicas is not set instantly, instead, the safest value from the stabilization window is chosen.

The tolerance is applied to the metric values and prevents scaling too eagerly for small metric variations.

   | Field | Description

       | `policies`HPAScalingPolicy array
       | policies is a list of potential scaling polices which can be used during scaling. If not set, use the default values: - For scale up: allow doubling the number of pods, or an absolute change of 4 pods in a 15s window. - For scale down: allow all pods to be removed in a 15s window.

       | `selectPolicy`string
       | selectPolicy is used to specify which policy should be used. If not set, the default value Max is used.

       | `stabilizationWindowSeconds`integer
       | stabilizationWindowSeconds is the number of seconds for which past recommendations should be considered while scaling up or scaling down. StabilizationWindowSeconds must be greater than or equal to zero and less than or equal to 3600 (one hour). If not set, use the default values: - For scale up: 0 (i.e. no stabilization is done). - For scale down: 300 (i.e. the stabilization window is 300 seconds long).

       | `tolerance`Quantity
       | tolerance is the tolerance on the ratio between the current and desired metric value under which no updates are made to the desired number of replicas (e.g. 0.01 for 1%). Must be greater than or equal to zero. If not set, the default cluster-wide tolerance is applied (by default 10%).  For example, if autoscaling is configured with a memory consumption target of 100Mi, and scale-down and scale-up tolerances of 5% and 1% respectively, scaling will be triggered when the actual consumption falls below 95Mi or exceeds 101Mi.

## HorizontalPodAutoscalerBehavior {#HorizontalPodAutoscalerBehavior}

HorizontalPodAutoscalerBehavior configures the scaling behavior of the target in both Up and Down directions (scaleUp and scaleDown fields respectively).

   | Field | Description

       | `scaleDown`HPAScalingRules
       | scaleDown is scaling policy for scaling Down. If not set, the default value is to allow to scale down to minReplicas pods, with a 300 second stabilization window (i.e., the highest recommendation for the last 300sec is used).

       | `scaleUp`HPAScalingRules
       | scaleUp is scaling policy for scaling Up. If not set, the default value is the higher of:   * increase no more than 4 pods per 60 seconds   * double the number of pods per 60 seconds No stabilization is used.

## HorizontalPodAutoscalerCondition {#HorizontalPodAutoscalerCondition}

HorizontalPodAutoscalerCondition describes the state of a HorizontalPodAutoscaler at a certain point.

   | Field | Description

       | `lastTransitionTime`Time
       | lastTransitionTime is the last time the condition transitioned from one status to another

       | `message`string
       | message is a human-readable explanation containing details about the transition

       | `observedGeneration`integer
       | observedGeneration represents the .metadata.generation that the condition was set based upon. For instance, if .metadata.generation is currently 12, but the .status.conditions[x].observedGeneration is 9, the condition is out of date with respect to the current state of the instance.

       | `reason`string
       | reason is the reason for the condition's last transition.

       | `status` *string
       | status is the status of the condition (True, False, Unknown)

       | `type` *string
       | type describes the current condition

## MetricIdentifier {#MetricIdentifier}

MetricIdentifier defines the name and optionally selector for a metric

   | Field | Description

       | `name` *string
       | name is the name of the given metric

       | `selector`LabelSelector
       | selector is the string-encoded form of a standard kubernetes label selector for the given metric When set, it is passed as an additional parameter to the metrics server for more specific metrics scoping. When unset, just the metricName will be used to gather metrics.
