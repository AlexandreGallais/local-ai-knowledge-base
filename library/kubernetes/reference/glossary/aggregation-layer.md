---
title: "Aggregation Layer"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/glossary/aggregation-layer.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Aggregation Layer

The aggregation layer lets you install additional Kubernetes-style APIs in your cluster.

When you've configured the Kubernetes API Server to support additional APIs, you can add `APIService` objects to "claim" a URL path in the Kubernetes API.
