---
title: "NodeDeclaredFeatures"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/NodeDeclaredFeatures.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# NodeDeclaredFeatures

Enables Nodes to report supported features via their `.status`. This enables the
scheduler and admission controller to prevent operations on nodes lacking features
required by the Pod. See Node Declared Features.
