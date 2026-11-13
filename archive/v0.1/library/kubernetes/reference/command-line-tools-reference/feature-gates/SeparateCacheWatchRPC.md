---
title: "SeparateCacheWatchRPC"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/SeparateCacheWatchRPC.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# SeparateCacheWatchRPC

Allows the API server watch cache to create a watch on a dedicated RPC.
This prevents watch cache from being starved by other watches.
