---
title: "ServiceNodeExclusion"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/ServiceNodeExclusion.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# ServiceNodeExclusion

Enable the exclusion of nodes from load balancers created by a cloud provider.
A node is eligible for exclusion if labelled with "`node.kubernetes.io/exclude-from-external-load-balancers`".
