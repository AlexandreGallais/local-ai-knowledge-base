---
title: "API resource"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/glossary/api-resource.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# API resource

An entity in the Kubernetes type system, corresponding to an endpoint on the Kubernetes API.
A resource typically represents an object.
Some resources represent an operation on other objects, such as a permission check.

Each resource represents an HTTP endpoint (URI) on the Kubernetes API server, defining the schema for the objects or operations on that resource.
