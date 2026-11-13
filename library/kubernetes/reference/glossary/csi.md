---
title: "Container Storage Interface (CSI)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/glossary/csi.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Container Storage Interface (CSI)

The Container Storage Interface (CSI) defines a standard interface to expose storage systems to containers.

CSI allows vendors to create custom storage plugins for Kubernetes without adding them to the Kubernetes repository (out-of-tree plugins). To use a CSI driver from a storage provider, you must first deploy it to your cluster. You will then be able to create a Storage Class that uses that CSI driver.

* CSI in the Kubernetes documentation
* List of available CSI drivers
