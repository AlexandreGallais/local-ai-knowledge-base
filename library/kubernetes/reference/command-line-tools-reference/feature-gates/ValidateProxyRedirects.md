---
title: "ValidateProxyRedirects"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/ValidateProxyRedirects.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# ValidateProxyRedirects

This flag controls whether the API server should validate that redirects
are only followed to the same host. Only used if the `StreamingProxyRedirects` flag is enabled.
