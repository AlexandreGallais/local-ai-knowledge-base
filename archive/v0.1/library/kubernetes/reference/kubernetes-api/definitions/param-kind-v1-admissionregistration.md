---
title: "ParamKind"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/definitions/param-kind-v1-admissionregistration.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# ParamKind

`apiVersion: admissionregistration.k8s.io/v1`

`import "k8s.io/api/admissionregistration/v1"`

## ParamKind {#ParamKind}

ParamKind is a tuple of Group Kind and Version.

   | Field | Description

       | `apiVersion`string
       | apiVersion is the API group version the resources belong to. In format of "group/version". Required.

       | `kind`string
       | kind is the API kind the resources belong to. Required.
