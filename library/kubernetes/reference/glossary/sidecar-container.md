---
title: "Sidecar Container"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/glossary/sidecar-container.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Sidecar Container

One or more containers that are typically started before any app containers run.

Sidecar containers are like regular app containers, but with a different purpose: the sidecar provides a Pod-local service to the main app container.
Unlike init containers, sidecar containers
continue running after Pod startup.

Read Sidecar containers for more information.
