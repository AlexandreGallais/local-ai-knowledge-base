---
title: "LocalStorageCapacityIsolationFSQuotaMonitoring"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/LocalStorageCapacityIsolationFSQuotaMonitoring.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# LocalStorageCapacityIsolationFSQuotaMonitoring

When `LocalStorageCapacityIsolation`
is enabled for
local ephemeral storage,
the backing filesystem for emptyDir volumes supports project quotas,
and `UserNamespacesSupport` is enabled,
project quotas are used to monitor `emptyDir` volume storage consumption rather than using filesystem walk, ensuring better performance and accuracy.
