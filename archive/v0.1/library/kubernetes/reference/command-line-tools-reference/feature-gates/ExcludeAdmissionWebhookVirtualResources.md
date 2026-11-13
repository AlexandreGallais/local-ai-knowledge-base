---
title: "ExcludeAdmissionWebhookVirtualResources"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/ExcludeAdmissionWebhookVirtualResources.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# ExcludeAdmissionWebhookVirtualResources

Exclude non-persisted (virtual) authentication and authorization resources,
such as `TokenReview` and `SubjectAccessReview`, from admission webhooks.
This matches the set of resources that ValidatingAdmissionPolicy and
MutatingAdmissionPolicy already exclude, and prevents a misbehaving webhook
from blocking the cluster's own authentication and authorization requests.
Disable this feature gate to restore the previous behavior of dispatching
admission webhooks for these resources.
