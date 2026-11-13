---
title: "EventedPLEG"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/EventedPLEG.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# EventedPLEG

Enable support for the kubelet to receive container life cycle events from the
container runtime via
an extension to CRI.
(PLEG is an abbreviation for “Pod lifecycle event generator”).
For this feature to be useful, you also need to enable support for container lifecycle events
in each container runtime running in your cluster. If the container runtime does not announce
support for container lifecycle events then the kubelet automatically switches to the legacy
generic PLEG mechanism, even if you have this feature gate enabled.
