---
title: "StatusCause"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/definitions/status-cause-v1-meta.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# StatusCause

`apiVersion: meta/v1`

`import "k8s.io/apimachinery/pkg/apis/meta/v1"`

## StatusCause {#StatusCause}

StatusCause provides more information about an api.Status failure, including cases when multiple errors are encountered.

   | Field | Description

       | `field`string
       | The field of the resource that has caused this error, as named by its JSON serialization. May include dot and postfix notation for nested attributes. Arrays are zero-indexed.  Fields may appear more than once in an array of causes due to fields having multiple errors. Optional.  Examples:   "name" - the field "name" on the current resource   "items[0].name" - the field "name" on the first array entry in "items"

       | `message`string
       | A human-readable description of the cause of the error.  This field may be presented as-is to a reader.

       | `reason`string
       | A machine-readable description of the cause of the error. If this value is empty there is no information available.
