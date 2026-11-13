---
title: "Group Version Resource"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/glossary/group-version-resource.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Group Version Resource

Means of representing specific Kubernetes APIs uniquely.

Group Version Resources (GVRs) specify the API group, API version, and _resource_ (name for the object kind as it appears in the URI) associated with accessing a particular id of object in Kubernetes.
GVRs let you define and distinguish different Kubernetes objects, and to specify a way of accessing
objects that is stable even as APIs change.

In this usage, _resource_ refers to an HTTP resource. Because some APIs are namespaced, a GVR may
not refer to a specific API resource.
