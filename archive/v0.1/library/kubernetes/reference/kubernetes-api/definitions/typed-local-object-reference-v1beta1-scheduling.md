---
title: "TypedLocalObjectReference"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/definitions/typed-local-object-reference-v1beta1-scheduling.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# TypedLocalObjectReference

`apiVersion: scheduling.k8s.io/v1beta1`

`import "k8s.io/api/scheduling/v1beta1"`

## TypedLocalObjectReference {#TypedLocalObjectReference}

TypedLocalObjectReference allows to reference typed object inside the same namespace.

   | Field | Description

       | `apiGroup`string
       | apiGroup is the group for the resource being referenced. If apiGroup is empty, the specified Kind must be in the core API group. For any other third-party types, setting apiGroup is required. It must be a DNS subdomain.

       | `kind` *string
       | kind is the type of resource being referenced. It must be a path segment name.

       | `name` *string
       | name is the name of resource being referenced. It must be a path segment name.
