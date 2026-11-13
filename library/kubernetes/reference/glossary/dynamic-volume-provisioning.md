---
title: "Dynamic Volume Provisioning"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/glossary/dynamic-volume-provisioning.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Dynamic Volume Provisioning

Allows users to request automatic creation of storage  Volumes.

Dynamic provisioning eliminates the need for cluster administrators to pre-provision storage. Instead, it automatically provisions storage by user request. Dynamic volume provisioning is based on an API object, StorageClass, referring to a Volume Plugin that provisions a Volume and the set of parameters to pass to the Volume Plugin.
