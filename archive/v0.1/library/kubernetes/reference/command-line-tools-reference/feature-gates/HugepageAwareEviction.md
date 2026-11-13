---
title: "HugepageAwareEviction"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/HugepageAwareEviction.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# HugepageAwareEviction

Subtracts hugepage capacity from `memory.available` so the kubelet's eviction
signal reflects actual regular-memory availability. Without this gate, hugepage
reservations inflate `AvailableBytes`, delaying eviction and causing OOM kills
on nodes with hugepages configured.
