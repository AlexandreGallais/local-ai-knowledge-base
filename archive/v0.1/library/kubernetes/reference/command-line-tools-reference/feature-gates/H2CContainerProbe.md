---
title: "H2CContainerProbe"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/H2CContainerProbe.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# H2CContainerProbe

Enables HTTP/2 cleartext (h2c) support for HTTP container probes. When enabled,
you can add the `protocol` field to the `httpGet` field in HTTP probes. Setting
`protocol: HTTP2` on a liveness, readiness, or startup probe causes the `kubelet` to
probe over h2c instead of HTTP/1.1.
See Configure Liveness, Readiness and Startup Probes.
