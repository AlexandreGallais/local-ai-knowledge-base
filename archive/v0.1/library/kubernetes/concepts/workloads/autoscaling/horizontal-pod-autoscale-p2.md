---
title: "Horizontal Pod Autoscaling (part 2 of 3)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/concepts/workloads/autoscaling/horizontal-pod-autoscale.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Horizontal Pod Autoscaling (part 2 of 3)

## Support for resource metrics

Any HPA target can be scaled based on the resource usage of the pods in the scaling target.
When defining the pod specification the resource requests like `cpu` and `memory` should
be specified. This is used to determine the resource utilization and used by the HPA controller
to scale the target up or down. To use resource utilization based scaling specify a metric source
like this:

```yaml
type: Resource
resource:
  name: cpu
  target:
    type: Utilization
    averageUtilization: 60
```
With this metric the HPA controller will keep the average utilization of the pods in the scaling
target at 60%. Utilization is the ratio between the current usage of resource to the requested
resources of the pod. See Algorithm for more details about how the utilization
is calculated and averaged.

**Note:**
Since the resource usages of all the containers are summed up the total pod utilization may not
accurately represent the individual container resource usage. This could lead to situations where
a single container might be running with high usage and the HPA will not scale out because the overall
pod usage is still within acceptable limits.

### Container resource metrics

**Feature state:**

The HorizontalPodAutoscaler API also supports a container metric source where the HPA can track the
resource usage of individual containers across a set of Pods, in order to scale the target resource.
This lets you configure scaling thresholds for the containers that matter most in a particular Pod.
For example, if you have a web application and a sidecar container that provides logging, you can scale based on the resource
use of the web application, ignoring the sidecar container and its resource use.

If you revise the target resource to have a new Pod specification with a different set of containers,
you should revise the HPA spec if that newly added container should also be used for
scaling. If the specified container in the metric source is not present or only present in a subset
of the pods then those pods are ignored and the recommendation is recalculated. See Algorithm
for more details about the calculation. To use container resources for autoscaling define a metric
source as follows:

```yaml
type: ContainerResource
containerResource:
  name: cpu
  container: application
  target:
    type: Utilization
    averageUtilization: 60
```

In the above example the HPA controller scales the target such that the average utilization of the cpu
in the `application` container of all the pods is 60%.

**Note:**
If you change the name of a container that a HorizontalPodAutoscaler is tracking, you can
make that change in a specific order to ensure scaling remains available and effective
whilst the change is being applied. Before you update the resource that defines the container
(such as a Deployment), you should update the associated HPA to track both the new and
old container names. This way, the HPA is able to calculate a scaling recommendation
throughout the update process.

Once you have rolled out the container name change to the workload resource, tidy up by removing
the old container name from the HPA specification.

## Scaling on custom metrics

**Feature state:** v1.23 [stable]

(the `autoscaling/v2beta2` API version previously provided this ability as a beta feature)

Provided that you use the `autoscaling/v2` API version, you can configure a HorizontalPodAutoscaler
to scale based on a custom metric (that is not built in to Kubernetes or any Kubernetes component).
The HorizontalPodAutoscaler controller then queries for these custom metrics from the Kubernetes
API.

See Support for metrics APIs for the requirements.

## Scaling on multiple metrics

**Feature state:** v1.23 [stable]

(the `autoscaling/v2beta2` API version previously provided this ability as a beta feature)

Provided that you use the `autoscaling/v2` API version, you can specify multiple metrics for a
HorizontalPodAutoscaler to scale on. Then, the HorizontalPodAutoscaler controller evaluates each metric,
and proposes a new scale based on that metric. The HorizontalPodAutoscaler takes the maximum scale
recommended for each metric and sets the workload to that size (provided that this isn't larger than the
overall maximum that you configured).

## Support for metrics APIs

By default, the HorizontalPodAutoscaler controller retrieves metrics from a series of APIs.
In order for it to access these APIs, cluster administrators must ensure that:

- The API aggregation layer is enabled.

- The corresponding APIs are registered:

  - For resource metrics, this is the `metrics.k8s.io` API,
    generally provided by metrics-server.
    It can be launched as a cluster add-on.

    **Note:**
    The HorizontalPodAutoscaler currently supports the `metrics.k8s.io/v1beta1`
    API for resource metrics. It does not support `metrics.k8s.io/v1` yet.

  - For custom metrics, this is the `custom.metrics.k8s.io` API.
    It's provided by "adapter" API servers provided by metrics solution vendors.
    Check with your metrics pipeline to see if there is a Kubernetes metrics adapter available.

  - For external metrics, this is the `external.metrics.k8s.io` API.
    It may be provided by the custom metrics adapters provided above.

For more information on these different metrics paths and how they differ please see the relevant design proposals for
the HPA V2,
custom.metrics.k8s.io
and external.metrics.k8s.io.

For examples of how to use them see
the walkthrough for using custom metrics
and the walkthrough for using external metrics.

## Configurable scaling behavior

**Feature state:** v1.23 [stable]

(the `autoscaling/v2beta2` API version previously provided this ability as a beta feature)

If you use the `v2` HorizontalPodAutoscaler API, you can use the `behavior` field
(see the API reference)
to configure separate scale-up and scale-down behaviors.
You specify these behaviors by setting `scaleUp` and / or `scaleDown`
under the `behavior` field.

Scaling policies let you control the rate of change of replicas while scaling.
Also two settings can be used to prevent flapping: you can specify a
_stabilization window_ for smoothing replica counts, and a tolerance to ignore
minor metric fluctuations below a specified threshold.

### Scaling policies

One or more scaling policies can be specified in the `behavior` section of the spec.
When multiple policies are specified the policy which allows the highest amount of
change is the policy which is selected by default. The following example shows this behavior
while scaling down:

```yaml
behavior:
  scaleDown:
    policies:
    - type: Pods
      value: 4
      periodSeconds: 60
    - type: Percent
      value: 10
      periodSeconds: 60
```

`periodSeconds` indicates the length of time in the past for which the policy must hold true.
The maximum value that you can set for `periodSeconds` is 1800 (half an hour).
The first policy _(Pods)_ allows at most 4 replicas to be scaled down in one minute. The second policy
_(Percent)_ allows at most 10% of the current replicas to be scaled down in one minute.

Since by default the policy which allows the highest amount of change is selected, the second policy will
only be used when the number of pod replicas is more than 40. With 40 or less replicas, the first policy will be applied.
For instance if there are 80 replicas and the target has to be scaled down to 10 replicas
then during the first step 8 replicas will be reduced. In the next iteration when the number
of replicas is 72, 10% of the pods is 7.2 but the number is rounded up to 8. On each loop of
the autoscaler controller the number of pods to be change is re-calculated based on the number
of current replicas. When the number of replicas falls below 40 the first policy _(Pods)_ is applied
and 4 replicas will be reduced at a time.

The policy selection can be changed by specifying the `selectPolicy` field for a scaling
direction. By setting the value to `Min` which would select the policy which allows the
smallest change in the replica count. Setting the value to `Disabled` completely disables
scaling in that direction.

### Stabilization window

The stabilization window is used to restrict the flapping of
replica count when the metrics used for scaling keep fluctuating. The autoscaling algorithm
uses this window to infer a previous desired state and avoid unwanted changes to workload
scale.

For example, in the following example snippet, a stabilization window is specified for `scaleDown`.

```yaml
behavior:
  scaleDown:
    stabilizationWindowSeconds: 300
```

When the metrics indicate that the target should be scaled down the algorithm looks
into previously computed desired states, and uses the highest value from the specified
interval. In the above example, all desired states from the past 5 minutes will be considered.

This approximates a rolling maximum, and avoids having the scaling algorithm frequently
remove Pods only to trigger recreating an equivalent Pod just moments later.

### Tolerance {#tolerance}

**Feature state:**

The `tolerance` field configures a threshold for metric variations, preventing the
autoscaler from scaling for changes below that value.

This tolerance is defined as the amount of variation around the desired metric value under
which no scaling will occur. For example, consider a HorizontalPodAutoscaler configured
with a target memory consumption of 100MiB and a scale-up tolerance of 5%:

```yaml
behavior:
  scaleUp:
    tolerance: 0.05 # 5% tolerance for scale up
```

With this configuration, the HPA algorithm will only consider scaling up if the memory
consumption is higher than 105MiB (that is: 5% above the target).

If you don't set this field, the HPA applies the default cluster-wide tolerance of 10%. This
default can be updated for both scale-up and scale-down using the
kube-controller-manager
`--horizontal-pod-autoscaler-tolerance` command line argument. (You can't use the Kubernetes API
to configure this default value.)

### Default behavior

To use the custom scaling not all fields have to be specified. Only values which need to be
customized can be specified. These custom values are merged with default values. The default values
match the existing behavior in the HPA algorithm.

```yaml
behavior:
  scaleDown:
    stabilizationWindowSeconds: 300
    policies:
    - type: Percent
      value: 100
      periodSeconds: 15
  scaleUp:
    stabilizationWindowSeconds: 0
    policies:
    - type: Percent
      value: 100
      periodSeconds: 15
    - type: Pods
      value: 4
      periodSeconds: 15
    selectPolicy: Max
```
For scaling down the stabilization window is _300_ seconds (or the value of the
`--horizontal-pod-autoscaler-downscale-stabilization` command line option, if provided). There is only a single policy
for scaling down which allows a 100% of the currently running replicas to be removed which
means the scaling target can be scaled down to the minimum allowed replicas.
For scaling up there is no stabilization window. When the metrics indicate that the target should be
scaled up the target is scaled up immediately. There are 2 policies where 4 pods or a 100% of the currently
running replicas may at most be added every 15 seconds till the HPA reaches its steady state.

### Example: change downscale stabilization window

To provide a custom downscale stabilization window of 1 minute, the following
behavior would be added to the HPA:

```yaml
behavior:
  scaleDown:
    stabilizationWindowSeconds: 60
```

### Example: limit scale down rate

To limit the rate at which pods are removed by the HPA to 10% per minute, the
following behavior would be added to the HPA:

```yaml
behavior:
  scaleDown:
    policies:
    - type: Percent
      value: 10
      periodSeconds: 60
```

To ensure that no more than 5 Pods are removed per minute, you can add a second scale-down
policy with a fixed size of 5, and set `selectPolicy` to minimum. Setting `selectPolicy` to `Min` means
that the autoscaler chooses the policy that affects the smallest number of Pods:

```yaml
behavior:
  scaleDown:
    policies:
    - type: Percent
      value: 10
      periodSeconds: 60
    - type: Pods
      value: 5
      periodSeconds: 60
    selectPolicy: Min
```

### Example: disable scale down

The `selectPolicy` value of `Disabled` turns off scaling the given direction.
So to prevent downscaling the following policy would be used:

```yaml
behavior:
  scaleDown:
    selectPolicy: Disabled
```

## Support for HorizontalPodAutoscaler in kubectl

HorizontalPodAutoscaler, like every API resource, is supported in a standard way by `kubectl`.
You can create a new autoscaler using `kubectl create` command.
You can list autoscalers by `kubectl get hpa` or get detailed description by `kubectl describe hpa`.
Finally, you can delete an autoscaler using `kubectl delete hpa`.

In addition, there is a special `kubectl autoscale` command for creating a HorizontalPodAutoscaler object.
For instance, executing `kubectl autoscale rs foo --min=2 --max=5 --cpu=80%`
will create an autoscaler for ReplicaSet _foo_, with target CPU utilization set to `80%`
and the number of replicas between 2 and 5.

## Scaling to and from zero

**Feature state:**

For HorizontalPodAutoscalers that scale on custom (object) or
external metrics, you can set `spec.minReplicas` to `0`. The workload is then scaled all the way
down to zero replicas when there is no load, and scaled back up when the metric indicates that at
least one replica is needed. This is useful for workloads that are idle for long periods and
expensive to keep running, such as consumers of an occasionally used queue or jobs that require
dedicated hardware like GPUs.

Scaling to zero is only supported for object and external metrics. It is not available for
resource metrics (such as CPU or memory utilization), because those can only be measured on
running Pods. Setting `minReplicas: 0` requires at least one object or external metric to be
configured; the API server rejects the HorizontalPodAutoscaler otherwise.

This behavior is controlled by the `HPAScaleToZero`
feature gate, which is enabled by
default. The feature gate must be enabled on both the
kube-apiserver (which allows
`minReplicas: 0`) and the
kube-controller-manager
(which performs the scaling).

While the HPA is holding a workload at zero replicas, it records a `ScaledToZero` condition set to
`True` on the HorizontalPodAutoscaler's status. The HPA uses this condition to distinguish a
workload that it scaled to zero (and will scale back up when the metric returns) from one that was
manually deactivated by setting its replica count to
`0`. Once the workload is scaled back up, the condition is set to `False` with the reason
`NotScaledToZero`.
