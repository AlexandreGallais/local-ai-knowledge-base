---
title: "KubeletCgroupDriverFromCRI"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/KubeletCgroupDriverFromCRI.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# KubeletCgroupDriverFromCRI

Enable detection of the kubelet cgroup driver
configuration option from the CRI.
This feature gate is now on for all clusters. However, it only works on nodes
where there is a CRI container runtime that supports the `RuntimeConfig`
CRI call. If the CRI supports this feature, the kubelet ignores the
`cgroupDriver` configuration setting (or deprecated `--cgroup-driver` command
line argument). If the container runtime
doesn't support it, the kubelet falls back to using the driver configured using
the `cgroupDriver` configuration setting.
The kubelet will stop falling back to this configuration in Kubernetes 1.36.
Thus, users must upgrade their CRI container runtime to a version that supports
the `RuntimeConfig` CRI call by then. Admins can use the metric
`kubelet_cri_losing_support` to see if there are any nodes in their cluster that
will lose support in 1.36. The following CRI versions support this CRI call:

* containerd: Support was added in v2.0.0
* CRI-O: Support was added in v1.28.0
