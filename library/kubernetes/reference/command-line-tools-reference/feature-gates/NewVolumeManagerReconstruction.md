---
title: "NewVolumeManagerReconstruction"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/NewVolumeManagerReconstruction.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# NewVolumeManagerReconstruction

Enables improved discovery of mounted volumes during kubelet
startup. Since the associated code had been significantly refactored, Kubernetes versions 1.25 to 1.29
allowed you to opt-out in case the kubelet got stuck at the startup, or did not unmount volumes
from terminated Pods.

This refactoring was behind the `SELinuxMountReadWriteOncePod`  feature gate in Kubernetes
releases 1.25 and 1.26.
