---
title: "Drain"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/glossary/drain.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Drain

The process of safely evicting Pods from a Node to prepare it for maintenance or removal from a cluster.

The `kubectl drain` command is used to mark a Node as going out of service.
When executed, it evicts all Pods from the Node.
If an eviction request is temporarily rejected, `kubectl drain` retries until all Pods are terminated or a configurable timeout is reached.
