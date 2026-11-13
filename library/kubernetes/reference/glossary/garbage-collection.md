---
title: "Garbage Collection"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/glossary/garbage-collection.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Garbage Collection

Garbage collection is a collective term for the various mechanisms Kubernetes uses to clean up
cluster resources.

Kubernetes uses garbage collection to clean up resources like
unused containers and images,
failed Pods,
objects owned by the targeted resource,
completed Jobs, and resources
that have expired or failed.
