---
title: "kube-scheduler"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/glossary/kube-scheduler.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# kube-scheduler

Control plane component that watches for newly created
Pods with no assigned
node, and selects a node for them
to run on.

Factors taken into account for scheduling decisions include:
individual and collective resource
requirements, hardware/software/policy constraints, affinity and anti-affinity specifications,
data locality, inter-workload interference, and deadlines.
