---
title: "EndpointSliceProxying"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/EndpointSliceProxying.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# EndpointSliceProxying

When enabled, kube-proxy running
 on Linux will use EndpointSlices as the primary data source instead of
 Endpoints, enabling scalability and performance improvements. See
 Enabling Endpoint Slices.
