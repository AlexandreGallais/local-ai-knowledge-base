---
title: "Condition"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/definitions/condition-v1-meta.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Condition

`apiVersion: meta/v1`

`import "k8s.io/apimachinery/pkg/apis/meta/v1"`

## Condition {#Condition}

Condition contains details for one aspect of the current state of this API Resource.

   | Field | Description

       | `lastTransitionTime` *Time
       | lastTransitionTime is the last time the condition transitioned from one status to another. This should be when the underlying condition changed.  If that is not known, then using the time when the API field changed is acceptable.

       | `message` *string
       | message is a human readable message indicating details about the transition. This may be an empty string.

       | `observedGeneration`integer
       | observedGeneration represents the .metadata.generation that the condition was set based upon. For instance, if .metadata.generation is currently 12, but the .status.conditions[x].observedGeneration is 9, the condition is out of date with respect to the current state of the instance.

       | `reason` *string
       | reason contains a programmatic identifier indicating the reason for the condition's last transition. Producers of specific condition types may define expected values and meanings for this field, and whether the values are considered a guaranteed API. The value should be a CamelCase string. This field may not be empty.

       | `status` *string
       | status of the condition, one of True, False, Unknown.

       | `type` *string
       | type of condition in CamelCase or in foo.example.com/CamelCase.
