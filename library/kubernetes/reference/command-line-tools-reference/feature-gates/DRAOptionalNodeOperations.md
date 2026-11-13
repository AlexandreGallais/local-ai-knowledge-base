---
title: "DRAOptionalNodeOperations"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/DRAOptionalNodeOperations.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# DRAOptionalNodeOperations

Enables support for optional node-local operations in Dynamic Resource
Allocation (DRA). This allows drivers to declare that specific node operations
(`NodePrepareResources` and/or `NodeUnprepareResources`) can be skipped for
their devices, enabling the `kubelet` to bypass <example-value> gRPC calls.

For more information, see
Optional node operations
in the Dynamic Resource Allocation documentation.
