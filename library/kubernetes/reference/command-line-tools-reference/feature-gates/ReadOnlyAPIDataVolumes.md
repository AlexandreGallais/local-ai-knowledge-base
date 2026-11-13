---
title: "ReadOnlyAPIDataVolumes"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/ReadOnlyAPIDataVolumes.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# ReadOnlyAPIDataVolumes

Set `configMap`,
`secret`,
`downwardAPI` and
`projected`
volumes to be mounted read-only.

Since Kubernetes v1.10, these volume types are always read-only and you cannot opt out.
