---
title: "MemoryQoS"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/MemoryQoS.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# MemoryQoS

Enable memory protection and usage throttling for Pods and containers using
the cgroup v2 memory controller. When `memoryThrottlingFactor` is set, the
`kubelet` sets `memory.high` for throttling on Burstable and BestEffort
containers. The `kubelet` optionally sets `memory.min` and `memory.low` for
tiered memory protection when `memoryReservationPolicy` is set to
`TieredReservation`. Feature requires both - feature gate enablement and
`kubelet` configuration setting.
