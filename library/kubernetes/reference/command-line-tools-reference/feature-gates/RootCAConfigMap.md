---
title: "RootCAConfigMap"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/RootCAConfigMap.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# RootCAConfigMap

Configure the `kube-controller-manager` to publish a
ConfigMap named `kube-root-ca.crt`
to every namespace. This ConfigMap contains a CA bundle used for verifying connections
to the kube-apiserver. See
Bound Service Account Tokens
for more details.
