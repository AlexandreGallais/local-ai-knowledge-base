---
title: "Watch"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/glossary/watch.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Watch

A verb that is used to track changes to an object in Kubernetes as a stream.
It is used for the efficient detection of changes.

A verb that is used to track changes to an object in Kubernetes as a stream. Watches allow
efficient detection of changes; for example, a
controller that needs to know whenever a
ConfigMap has changed can use a watch rather than polling.

See Efficient Detection of Changes in API Concepts for more information.
