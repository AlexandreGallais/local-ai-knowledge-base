---
title: "kube-scheduler Configuration (v1) (part 3 of 3)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/config-api/kube-scheduler-config.v1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# kube-scheduler Configuration (v1) (part 3 of 3)

## `ResourceSpec`     {#kubescheduler-config-k8s-io-v1-ResourceSpec}

**Appears in:**

- NodeResourcesBalancedAllocationArgs

- ScoringStrategy

ResourceSpec represents a single resource.

 | Field | Description

 | `name` [Required]
`string`

 |
   Name of the resource.

 | `weight` [Required]
`int64`

 |
   Weight of the resource.

## `ScoringStrategy`     {#kubescheduler-config-k8s-io-v1-ScoringStrategy}

**Appears in:**

- NodeResourcesFitArgs

ScoringStrategy define ScoringStrategyType for node resource plugin

 | Field | Description

 | `type` [Required]
`ScoringStrategyType`

 |
   Type selects which strategy to run.

 | `resources` [Required]
`[]ResourceSpec`

 |
   Resources to consider when scoring.
The default resource set includes "cpu" and "memory" with an equal weight.
Allowed weights go from 1 to 100.
Weight defaults to 1 if not specified or explicitly set to 0.

 | `requestedToCapacityRatio` [Required]
`RequestedToCapacityRatioParam`

 |
   Arguments specific to RequestedToCapacityRatio strategy.

## `ScoringStrategyType`     {#kubescheduler-config-k8s-io-v1-ScoringStrategyType}

(Alias of `string`)

**Appears in:**

- ScoringStrategy

ScoringStrategyType the type of scoring strategy used in NodeResourcesFit plugin.

## `UtilizationShapePoint`     {#kubescheduler-config-k8s-io-v1-UtilizationShapePoint}

**Appears in:**

- VolumeBindingArgs

- RequestedToCapacityRatioParam

UtilizationShapePoint represents single point of priority function shape.

 | Field | Description

 | `utilization` [Required]
`int32`

 |
   Utilization (x axis). Valid values are 0 to 100. Fully utilized node maps to 100.

 | `score` [Required]
`int32`

 |
   Score assigned to given utilization (y axis). Valid values are 0 to 10.
