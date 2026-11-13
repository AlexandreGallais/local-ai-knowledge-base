---
title: "KubeletSeparateDiskGC"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/KubeletSeparateDiskGC.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# KubeletSeparateDiskGC

The split image filesystem feature enables kubelet to perform garbage collection
of images (read-only layers) and/or containers (writeable layers) deployed on
separate filesystems.
