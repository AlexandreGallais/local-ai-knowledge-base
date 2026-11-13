---
title: "AtomicWriteVolumeUserFields"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/AtomicWriteVolumeUserFields.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# AtomicWriteVolumeUserFields

This feature gate exists in the Kubernetes API server and kubelet.

Used from the kube-apiserver, it allows users to set the `user` and `defaultUser` fields
across `configMap`, `secret`, `downwardAPI` and `projected` volumes.

In kubelet, if the `user` or `defaultUser` fields are specified for a volume,
it sets the owner UID of the volume's data files during file creation.
