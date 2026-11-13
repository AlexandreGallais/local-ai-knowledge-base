---
title: "ServiceReference"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/definitions/service-reference-v1-admissionregistration.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# ServiceReference

`apiVersion: admissionregistration.k8s.io/v1`

`import "k8s.io/api/admissionregistration/v1"`

## ServiceReference {#ServiceReference}

ServiceReference holds a reference to Service.legacy.k8s.io

   | Field | Description

       | `name` *string
       | name is the name of the service. Required

       | `namespace` *string
       | namespace is the namespace of the service. Required

       | `path`string
       | path is an optional URL path which will be sent in any request to this service.

       | `port`integer
       | port is the port on the service that hosts the webhook. Default to 443 for backward compatibility. `port` should be a valid port number (1-65535, inclusive).
