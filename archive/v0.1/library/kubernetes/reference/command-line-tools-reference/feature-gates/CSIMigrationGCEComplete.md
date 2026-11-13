---
title: "CSIMigrationGCEComplete"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/CSIMigrationGCEComplete.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# CSIMigrationGCEComplete

Stops registering the GCE-PD in-tree plugin in
kubelet and volume controllers and enables shims and translation logic to
route volume operations from the GCE-PD in-tree plugin to PD CSI plugin.
Requires CSIMigration and CSIMigrationGCE feature flags enabled and PD CSI
plugin installed and configured on all nodes in the cluster. This flag has
been deprecated in favor of the `InTreePluginGCEUnregister` feature flag which
prevents the registration of in-tree GCE PD plugin.
