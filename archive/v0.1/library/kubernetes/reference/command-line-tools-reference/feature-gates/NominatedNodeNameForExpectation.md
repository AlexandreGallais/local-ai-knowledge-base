---
title: "NominatedNodeNameForExpectation"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/NominatedNodeNameForExpectation.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# NominatedNodeNameForExpectation

When enabled, kube-scheduler uses `.status.nominatedNodeName` to express where a
Pod is going to be bound. The `.status.nominatedNodeName` field is set when kube-scheduler
triggers preemption of pods, or anticipates that WaitOnPermit or PreBinding phase will take
relatively long.
Other components may read and use `.status.nominatedNodeName`, but should not set it.

When disabled, kube-scheduler will only set `.status.nominatedNodeName` before triggering preemption.
