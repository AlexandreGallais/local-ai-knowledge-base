---
title: "Namespace"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/glossary/namespace.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Namespace

An abstraction used by Kubernetes to support isolation of groups of API resources
within a single cluster.

Namespaces are used to organize objects in a cluster and provide a way to divide cluster resources. Names of resources need to be unique within a namespace, but not across namespaces. Namespace-based scoping is applicable only for namespaced resources _(for example: Pods, Deployments, Services)_ and not for cluster-wide resources _(for example: StorageClasses, Nodes, PersistentVolumes)_.
