---
title: "Common Expression Language"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/glossary/cel.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Common Expression Language

A general-purpose expression language that's designed to be fast, portable, and
safe to execute.

In Kubernetes, CEL can be used to run queries and perform fine-grained
filtering. For example, you can use CEL expressions with
dynamic admission control
to filter for specific fields in requests, and with
dynamic resource allocation (DRA)
to select resources based on specific attributes.
