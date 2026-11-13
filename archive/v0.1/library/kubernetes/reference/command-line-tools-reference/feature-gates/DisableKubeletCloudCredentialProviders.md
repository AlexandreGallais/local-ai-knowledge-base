---
title: "DisableKubeletCloudCredentialProviders"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/DisableKubeletCloudCredentialProviders.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# DisableKubeletCloudCredentialProviders

Enabling the feature gate deactivated the legacy in-tree functionality within the
kubelet, that allowed the kubelet to authenticate to a cloud provider container registry
for container image pulls.
