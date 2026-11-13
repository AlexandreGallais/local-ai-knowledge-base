---
title: "ReplicaSet"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/glossary/replica-set.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# ReplicaSet

A ReplicaSet (aims to) maintain a set of replica Pods running at any given time.

Workload objects such as deployment make use of ReplicaSets
to ensure that the configured number of Pods are
running in your cluster, based on the spec of that ReplicaSet.
