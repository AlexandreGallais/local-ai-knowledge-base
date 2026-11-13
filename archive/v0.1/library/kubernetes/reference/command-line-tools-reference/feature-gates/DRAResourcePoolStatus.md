---
title: "DRAResourcePoolStatus"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/DRAResourcePoolStatus.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# DRAResourcePoolStatus

Enables the ResourcePoolStatusRequest API for querying the
availability of devices in DRA resource pools.
When enabled, users can create ResourcePoolStatusRequest objects to get a
point-in-time snapshot of device availability (total, allocated, available, and
unavailable devices) for a specific driver and optionally a specific pool.
A controller in kube-controller-manager processes these one-time requests and
populates the status with pool information.
