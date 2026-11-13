---
title: "Admission Controller"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/glossary/admission-controller.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Admission Controller

A piece of code that intercepts requests to the Kubernetes API server prior to persistence of the object.

Admission controllers are configurable for the Kubernetes API server and may be "validating", "mutating", or
both. Any admission controller may reject the request. Mutating controllers may modify the objects they admit;
validating controllers may not.

* Admission controllers in the Kubernetes documentation
