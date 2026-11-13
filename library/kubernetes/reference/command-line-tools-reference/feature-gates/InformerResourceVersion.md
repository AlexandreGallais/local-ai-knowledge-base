---
title: "InformerResourceVersion"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/InformerResourceVersion.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# InformerResourceVersion

Allow clients to use the `LastSyncResourceVersion()` call on informers, enabling
them to perform actions based on the current resource version. When disabled,
`LastSyncResourceVersion()` succeeds but returns an empty string. Used by
kube-controller-manager for StorageVersionMigration.
