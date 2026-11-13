---
title: "DefaultPodSysctls"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/DefaultPodSysctls.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# DefaultPodSysctls

Enables the `defaultPodSysctls` field in KubeletConfiguration, allowing Node administrators to specify a default set of namespaced kernel parameters (sysctls) that the `kubelet` applies to all Pods on the Node. See Setting Sysctls for All Pods for more details.
