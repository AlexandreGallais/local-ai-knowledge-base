---
title: "API-initiated eviction"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/glossary/api-eviction.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# API-initiated eviction

API-initiated eviction is the process by which you use the Eviction API
to create an `Eviction` object that triggers graceful pod termination.

You can request eviction either by directly calling the Eviction API
using a client of the kube-apiserver, like the `kubectl drain` command.
When an `Eviction` object is created, the API server terminates the Pod.

API-initiated evictions respect your configured `PodDisruptionBudgets`
and `terminationGracePeriodSeconds`.

API-initiated eviction is not the same as node-pressure eviction.

* See API-initiated eviction for more information.
