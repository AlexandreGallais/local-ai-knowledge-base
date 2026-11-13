---
title: "ReplicationController"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/glossary/replication-controller.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# ReplicationController

A workload management object
that manages a replicated application, ensuring that
a specific number of instances of a Pod are running.

The control plane ensures that the defined number of Pods are running, even if some
Pods fail, if you delete Pods manually, or if too many are started by mistake.

**Note:**
ReplicationController is deprecated. See
Deployment, which is similar.
