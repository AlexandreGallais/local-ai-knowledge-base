---
title: "VolumeHealthCondition"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/definitions/volume-health-condition-v1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# VolumeHealthCondition

`apiVersion: v1`

`import "k8s.io/api/core/v1"`

## VolumeHealthCondition {#VolumeHealthCondition}

VolumeHealthCondition represents an adverse health condition reported for a volume.

   | Field | Description

       | `message`string
       | message is a human-readable description. Maximum permitted length of a message is 1024 bytes.

       | `reason` *string
       | reason is a brief CamelCase machine-parseable reason. Together with status it forms the unique identity of a condition entry. Maximum permitted length of a reason is 256 bytes.

       | `status` *string
       | status is the machine-parseable health category. Possible values: - "Inaccessible": the volume cannot be accessed. - "DataLoss": data loss has been detected on the volume. - "Degraded": the volume is functioning with reduced capability.Possible enum values: - `"DataLoss"` indicates data loss has been detected on the volume. - `"Degraded"` indicates the volume is functioning but with reduced capability. - `"Inaccessible"` indicates the volume cannot be accessed.
