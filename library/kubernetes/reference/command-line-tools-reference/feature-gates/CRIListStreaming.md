---
title: "CRIListStreaming"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/CRIListStreaming.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# CRIListStreaming

Enable streaming RPCs for CRI list operations (`ListContainers`,
`ListPodSandbox`, `ListImages`). When enabled, the kubelet uses server-side
streaming RPCs (e.g., `StreamContainers`, `StreamPodSandboxes`) that allow the
container runtime to divide results across multiple response messages,
bypassing the 16 MiB gRPC message size limit. This allows listing containers
on nodes with thousands of containers without failures. If the container
runtime does not support streaming RPCs, the kubelet falls back to unary RPCs.
