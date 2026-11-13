---
title: "NodeOutOfServiceVolumeDetach"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/NodeOutOfServiceVolumeDetach.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# NodeOutOfServiceVolumeDetach

When a Node is marked out-of-service using the
`node.kubernetes.io/out-of-service` taint, Pods on the node will be forcefully deleted
 if they can not tolerate this taint, and the volume detach operations for Pods terminating
 on the node will happen immediately. The deleted Pods can recover quickly on different nodes.
