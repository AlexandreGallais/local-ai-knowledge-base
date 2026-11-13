---
title: "LocalObjectReference"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/definitions/local-object-reference-v1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# LocalObjectReference

`apiVersion: v1`

`import "k8s.io/api/core/v1"`

## LocalObjectReference {#LocalObjectReference}

LocalObjectReference contains enough information to let you locate the referenced object inside the same namespace.

   | Field | Description

       | `name`string
       | Name of the referent. This field is effectively required, but due to backwards compatibility is allowed to be empty. Instances of this type with an empty value here are almost certainly wrong. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
