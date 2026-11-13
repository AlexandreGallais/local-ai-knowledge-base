---
title: "UserNamespacesPodSecurityStandards"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/UserNamespacesPodSecurityStandards.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# UserNamespacesPodSecurityStandards

Enable Pod Security Standards policies relaxation for pods
that run with namespaces. You must set the value of this feature gate consistently across all nodes in
your cluster, and you must also enable `UserNamespacesSupport` to use this feature.

This feature gate is not part of Kubernetes v1.35 (and onwards) because,
for those versions of Kubernetes, all supported kubelet versions will fail to
create a pod if it requests a user namespace, but the node does not.
