---
title: "VolumeScheduling"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/VolumeScheduling.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# VolumeScheduling

Enable volume topology aware scheduling and make the PersistentVolumeClaim
(PVC) binding aware of scheduling decisions. It also enables the usage of
`local` volume type when used together with the
`PersistentLocalVolumes` feature gate.
