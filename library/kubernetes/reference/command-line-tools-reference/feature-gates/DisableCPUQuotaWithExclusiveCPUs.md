---
title: "DisableCPUQuotaWithExclusiveCPUs"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/DisableCPUQuotaWithExclusiveCPUs.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# DisableCPUQuotaWithExclusiveCPUs

When the feature gate `DisableCPUQuotaWithExclusiveCPUs` is enabled (the default), then Kubernetes
does **not** enforce CPU quota for Pods that use the Guaranteed
QoS class.

You can disable the `DisableCPUQuotaWithExclusiveCPUs` feature gate to restore the legacy behavior.
