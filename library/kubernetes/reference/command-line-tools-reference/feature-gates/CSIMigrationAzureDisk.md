---
title: "CSIMigrationAzureDisk"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/CSIMigrationAzureDisk.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# CSIMigrationAzureDisk

Enables shims and translation logic to route volume
operations from the Azure-Disk in-tree plugin to AzureDisk CSI plugin.
Supports falling back to in-tree AzureDisk plugin for mount operations to
nodes that have the feature disabled or that do not have AzureDisk CSI plugin
installed and configured. Does not support falling back for provision
operations, for those the CSI plugin must be installed and configured.
Requires CSIMigration feature flag enabled.
