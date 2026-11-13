---
title: "RemoteRequestHeaderUID"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/RemoteRequestHeaderUID.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# RemoteRequestHeaderUID

Enable the API server to accept UIDs (user IDs) via request header authentication.
This will also make the `kube-apiserver`'s API aggregator add UIDs via standard headers when
forwarding requests to the servers serving the aggregated API.
