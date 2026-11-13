---
title: "Pod Disruption"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/glossary/pod-disruption.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Pod Disruption

Pod disruption is the process by which
Pods on Nodes are terminated either voluntarily or involuntarily.

Voluntary disruptions are started intentionally by application owners or cluster
administrators. Involuntary disruptions are unintentional and can be triggered by
unavoidable issues like Nodes running out of resources,
or by accidental deletions.
