---
title: "CSIServiceAccountTokenSecrets"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/CSIServiceAccountTokenSecrets.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# CSIServiceAccountTokenSecrets

Enables CSI drivers to opt-in for receiving service account tokens from kubelet
through the dedicated secrets field in NodePublishVolumeRequest instead of the volume_context field.
