---
title: "TypedLocalObjectReference"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/definitions/typed-local-object-reference-v1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# TypedLocalObjectReference

`apiVersion: v1`

`import "k8s.io/api/core/v1"`

## TypedLocalObjectReference {#TypedLocalObjectReference}

TypedLocalObjectReference contains enough information to let you locate the typed referenced object inside the same namespace.

   | Field | Description

       | `apiGroup`string
       | APIGroup is the group for the resource being referenced. If APIGroup is not specified, the specified Kind must be in the core API group. For any other third-party types, APIGroup is required.

       | `kind` *string
       | Kind is the type of resource being referenced

       | `name` *string
       | Name is the name of resource being referenced
