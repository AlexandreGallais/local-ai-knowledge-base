---
title: "Preemption"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/glossary/preemption.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Preemption

Preemption logic in Kubernetes helps a pending pod to find a suitable node by evicting low priority Pods existing on that Node.

If a Pod cannot be scheduled, the scheduler tries to preempt lower priority Pods to make scheduling of the pending Pod possible.
