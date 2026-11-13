---
title: "Mixed Version Proxy (MVP)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/glossary/mixed-version-proxy.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Mixed Version Proxy (MVP)

Feature to let a kube-apiserver proxy a resource request to a different peer API server.

When a cluster has multiple API servers running different versions of Kubernetes, this
feature enables resource
requests to be served by the correct API server.

MVP is disabled by default and can be activated by enabling
the feature gate named `UnknownVersionInteroperabilityProxy` when
the API Server is started.
