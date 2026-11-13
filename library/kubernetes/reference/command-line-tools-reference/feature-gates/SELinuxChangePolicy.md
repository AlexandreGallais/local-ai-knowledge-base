---
title: "SELinuxChangePolicy"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/SELinuxChangePolicy.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# SELinuxChangePolicy

Enables `spec.securityContext.seLinuxChangePolicy` field.
This field can be used to opt-out from applying the SELinux label to the pod
volumes using mount options. This is required when a single volume that supports
mounting with SELinux mount option is shared between Pods that have different
SELinux labels, such as a privileged and unprivileged Pods.

Enabling the `SELinuxChangePolicy` feature gate requires the feature gate `SELinuxMountReadWriteOncePod` to
be enabled.
