---
title: "CSIMigrationAWSComplete"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/CSIMigrationAWSComplete.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# CSIMigrationAWSComplete

Stops registering the EBS in-tree plugin in
kubelet and volume controllers and enables shims and translation logic to
route volume operations from the AWS-EBS in-tree plugin to EBS CSI plugin.
Requires CSIMigration and CSIMigrationAWS feature flags enabled and EBS CSI
plugin installed and configured on all nodes in the cluster. This flag has
been deprecated in favor of the `InTreePluginAWSUnregister` feature flag
which prevents the registration of in-tree EBS plugin.
