---
title: "ConcurrentWatchObjectDecode"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/ConcurrentWatchObjectDecode.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# ConcurrentWatchObjectDecode

Enable concurrent watch object decoding. This is to avoid starving the API server's
watch cache when a conversion webhook is installed.
