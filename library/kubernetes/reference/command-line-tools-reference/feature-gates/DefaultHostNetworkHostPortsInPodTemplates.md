---
title: "DefaultHostNetworkHostPortsInPodTemplates"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/DefaultHostNetworkHostPortsInPodTemplates.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# DefaultHostNetworkHostPortsInPodTemplates

This feature gate controls the point at which a default value for
`.spec.containers[*].ports[*].hostPort`
is assigned, for Pods using `hostNetwork: true`. The default since Kubernetes v1.28 is to only set a default
value in Pods.

Enabling this means a default will be assigned even to the `.spec` of an embedded
PodTemplate (for example, in a Deployment),
which is the way that older releases of Kubernetes worked.
You should migrate your code so that it does not rely on the legacy behavior.
