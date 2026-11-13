---
title: "ResourceQuota"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/glossary/resource-quota.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# ResourceQuota

Object that constrains aggregate resource
consumption, per namespace.

A ResourceQuota can either limit the quantity of API resources
that can be created in a namespace by type, or it can set a limit on the total amount of
infrastructure resources
that may be consumed on behalf of the namespace (and the objects within it).
