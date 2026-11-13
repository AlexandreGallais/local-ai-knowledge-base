---
title: "ClusterTrustBundle"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/ClusterTrustBundle.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# ClusterTrustBundle

This feature gate exists in the Kubernetes API server and the controller manager.

Used from the kube-apiserver, it enables ClusterTrustBundle support.

In the Kubernetes controller manager, it is used to control publishing of a ClusterTrustBundle
for the `kubernetes.io/kube-apiserver-serving` signer.
