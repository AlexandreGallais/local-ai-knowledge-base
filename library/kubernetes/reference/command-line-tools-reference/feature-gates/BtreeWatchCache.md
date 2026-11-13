---
title: "BtreeWatchCache"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/BtreeWatchCache.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# BtreeWatchCache

When enabled, the API server will replace the legacy HashMap-based _watch cache_
with a BTree-based implementation. This replacement may bring performance improvements.
