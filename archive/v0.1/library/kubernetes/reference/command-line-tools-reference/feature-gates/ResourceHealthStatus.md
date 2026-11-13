---
title: "ResourceHealthStatus"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/ResourceHealthStatus.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# ResourceHealthStatus

Enable the `allocatedResourcesStatus` field within the `.status` for a Pod. The field
reports additional details for each container in the Pod,
with the health information for each device assigned to the Pod.

Starting in v1.36 (beta), the health report includes an optional `message` field that
provides additional human-readable context about the health status, such as error details
or failure reasons.

This feature applies to devices managed by both Device Plugins and Dynamic Resource Allocation. See Device plugin and unhealthy devices for more details.
