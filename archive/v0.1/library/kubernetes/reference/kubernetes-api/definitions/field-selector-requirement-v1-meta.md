---
title: "FieldSelectorRequirement"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/definitions/field-selector-requirement-v1-meta.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# FieldSelectorRequirement

`apiVersion: meta/v1`

`import "k8s.io/apimachinery/pkg/apis/meta/v1"`

## FieldSelectorRequirement {#FieldSelectorRequirement}

FieldSelectorRequirement is a selector that contains values, a key, and an operator that relates the key and values.

   | Field | Description

       | `key` *string
       | key is the field selector key that the requirement applies to.

       | `operator` *string
       | operator represents a key's relationship to a set of values. Valid operators are In, NotIn, Exists, DoesNotExist. The list of operators may grow in the future.

       | `values`string array
       | values is an array of string values. If the operator is In or NotIn, the values array must be non-empty. If the operator is Exists or DoesNotExist, the values array must be empty.
