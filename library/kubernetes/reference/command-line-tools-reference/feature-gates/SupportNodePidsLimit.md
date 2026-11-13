---
title: "SupportNodePidsLimit"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/SupportNodePidsLimit.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# SupportNodePidsLimit

Enable the support to limiting PIDs on the Node.  The parameter
`pid=<number>` in the `--system-reserved` and `--kube-reserved` options can be specified to
ensure that the specified number of process IDs will be reserved for the system as a whole and for
 Kubernetes system daemons respectively.
