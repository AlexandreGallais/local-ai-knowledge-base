---
title: "Object"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/glossary/object.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Object

An entity in the Kubernetes system. An object is an
API resource that the Kubernetes API
uses to represent the state of your cluster.

A Kubernetes object is typically a “record of intent”—once you create the object, the Kubernetes
control plane works constantly to ensure
that the item it represents actually exists.
By creating an object, you're effectively telling the Kubernetes system what you want that part of
your cluster's workload to look like; this is your cluster's desired state.
