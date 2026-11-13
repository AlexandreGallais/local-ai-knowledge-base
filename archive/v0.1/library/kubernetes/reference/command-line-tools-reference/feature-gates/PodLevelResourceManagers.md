---
title: "PodLevelResourceManagers"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/PodLevelResourceManagers.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# PodLevelResourceManagers

Enable _Pod-level resource managers_: the ability for the Topology, CPU, and
Memory managers to use information from `.spec.resources` to perform NUMA
alignment for an entire pod and manage resources flexibly for the containers
within that pod.
