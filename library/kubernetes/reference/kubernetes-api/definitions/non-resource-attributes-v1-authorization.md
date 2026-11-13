---
title: "NonResourceAttributes"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/definitions/non-resource-attributes-v1-authorization.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# NonResourceAttributes

`apiVersion: authorization.k8s.io/v1`

`import "k8s.io/api/authorization/v1"`

## NonResourceAttributes {#NonResourceAttributes}

NonResourceAttributes includes the authorization attributes available for non-resource requests to the Authorizer interface

   | Field | Description

       | `path`string
       | path is the URL path of the request

       | `verb`string
       | verb is the standard HTTP verb
