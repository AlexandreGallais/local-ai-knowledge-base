---
title: "VolumeBindMountOptions"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/VolumeBindMountOptions.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# VolumeBindMountOptions

Enables setting bind mount options (`noexec`, `nodev`, `nosuid`) per container
volume mount using the `bindMountOptions` field in `volumeMounts`. When enabled,
the kubelet passes these options to the container runtime, which applies them as
Linux bind mount flags. The container runtime must support the `mount_options`
field in the CRI `Mount` message. This field has no effect on Windows nodes.
