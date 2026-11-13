---
title: "Preconditions"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/definitions/preconditions-v1-meta.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Preconditions

`apiVersion: meta/v1`

`import "k8s.io/apimachinery/pkg/apis/meta/v1"`

## Preconditions {#Preconditions}

Preconditions must be fulfilled before an operation (update, delete, etc.) is carried out.

   | Field | Description

       | `resourceVersion`string
       | Specifies the target ResourceVersion

       | `uid`string
       | Specifies the target UID.
