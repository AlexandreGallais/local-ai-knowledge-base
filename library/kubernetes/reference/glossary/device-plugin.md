---
title: "Device Plugin"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/glossary/device-plugin.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Device Plugin

Device plugins run on worker
Nodes and provide
Pods with access to
infrastructure resources,
such as local hardware, that require vendor-specific initialization or setup
steps.

Device plugins advertise resources to the
kubelet, so that workload
Pods can access hardware features that relate to the Node where that Pod is running.
You can deploy a device plugin as a daemonset,
or install the device plugin software directly on each target Node.

See
Device Plugins
for more information.
