---
title: "Toleration"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/glossary/toleration.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Toleration

A core object consisting of three required properties: key, value, and effect. Tolerations enable the scheduling of pods on nodes or node groups that have matching taints.

Tolerations and taints work together to ensure that pods are not scheduled onto inappropriate nodes. One or more tolerations are applied to a pod. A toleration indicates that the pod is allowed (but not required) to be scheduled on nodes or node groups with matching taints.
