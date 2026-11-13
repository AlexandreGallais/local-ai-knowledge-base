---
title: "LimitRange"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/glossary/limitrange.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# LimitRange

Constraints resource consumption per container or Pod,
specified for a particular namespace.

A LimitRange either limits the quantity of API resources
that can be created (for a particular resource type),
or the amount of infrastructure resources
that may be requested/consumed by individual containers or Pods within a namespace.
