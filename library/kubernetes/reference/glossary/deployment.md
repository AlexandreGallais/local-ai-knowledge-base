---
title: "Deployment"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/glossary/deployment.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Deployment

An API object that manages a replicated application, typically by running Pods with no local state.

Each replica is represented by a pod, and the Pods are distributed among the
nodes of a cluster.
For workloads that do require local state, consider using a StatefulSet.
