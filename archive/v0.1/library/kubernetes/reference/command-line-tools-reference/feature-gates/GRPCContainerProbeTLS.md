---
title: "GRPCContainerProbeTLS"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/GRPCContainerProbeTLS.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# GRPCContainerProbeTLS

Enables TLS support for gRPC container probes. When enabled,
you can add the `mode` field to the `grpc` field in gRPC probes. Setting
`mode: TLS` on a liveness, readiness, or startup probe causes the kubelet
to connect over TLS (with `InsecureSkipVerify`).
See Configure Liveness, Readiness and Startup Probes.
