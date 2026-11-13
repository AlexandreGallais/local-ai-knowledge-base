---
title: "UnlockWhileProcessingFIFO"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/UnlockWhileProcessingFIFO.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# UnlockWhileProcessingFIFO

Enable use of a FIFO queue within client-go that unlocks while processing events. If not enabled,
the queue instead holds the lock for the entire duration of processing events, which could lead
to performance issues in high-throughput scenarios. This feature gate can be toggled in the
kube-controller-manager and any client-go based controller.

You can only enable this feature gate if the
AtomicFIFO feature gate is also enabled.
