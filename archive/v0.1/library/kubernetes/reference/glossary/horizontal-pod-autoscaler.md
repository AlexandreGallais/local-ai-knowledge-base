---
title: "Horizontal Pod Autoscaler"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/glossary/horizontal-pod-autoscaler.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Horizontal Pod Autoscaler

An object that automatically scales the number of pod replicas,
based on targeted resource utilization or custom metric targets.

HorizontalPodAutoscaler (HPA) is typically used with Deployments, or ReplicaSets. It cannot be applied to objects that cannot be scaled, for example DaemonSets.
