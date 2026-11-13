---
title: "Affinity"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/glossary/affinity.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Affinity

In Kubernetes, _affinity_ is a set of rules that give hints to the scheduler about where to place pods.

There are two kinds of affinity:
* node affinity
* pod-to-pod affinity

The rules are defined using the Kubernetes labels,
and selectors specified in pods,
and they can be either required or preferred, depending on how strictly you want the scheduler to enforce them.
