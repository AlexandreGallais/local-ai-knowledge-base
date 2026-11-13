---
title: "APIServerWebhookAuthenticationToken"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/APIServerWebhookAuthenticationToken.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# APIServerWebhookAuthenticationToken

Enables the `kube-apiserver` to issue short-lived, scoped ServiceAccount tokens
for authenticating to
admission webhooks.
These tokens are bound to a specific ValidatingWebhookConfiguration or
MutatingWebhookConfiguration and are scoped to particular API groups
via attestation claims in the
TokenRequest API.
