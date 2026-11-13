---
title: "ExtendWebSocketsToKubelet"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/extend-websockets-to-kubelet.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# ExtendWebSocketsToKubelet

When ExtendWebSocketsToKubelet is enabled and a kubelet node advertises support,
exec/attach/portforward streams are proxied directly to the kubelet rather than
being translated or tunneled at the API server. Critically, the same
stream translation and tunneling handlers used at the API server are now set up
identically at the kubelet — the logic is simply moved closer to the container
runtime. This feature depends on NodeDeclaredFeatures graduating to beta so that
kubelet capability advertisement is reliable in production clusters.
