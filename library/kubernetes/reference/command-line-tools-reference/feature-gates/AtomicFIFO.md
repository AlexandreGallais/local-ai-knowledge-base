---
title: "AtomicFIFO"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/AtomicFIFO.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# AtomicFIFO

A client-go implementation of a FIFO queue that uses atomic operations to ensure events that come in
batches, such as those from a ListAndWatch call, are processed in a single chunk. This is in contrast to
the previous implementation which would process these events one by one, potentially causing the internal
cache to become temporarily inconsistent with the API server. This feature gate can be toggled in the
kube-controller-manager and any client-go based controller.
