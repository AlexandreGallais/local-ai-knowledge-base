---
title: "RoleRef"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/definitions/role-ref-v1-rbac.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# RoleRef

`apiVersion: rbac.authorization.k8s.io/v1`

`import "k8s.io/api/rbac/v1"`

## RoleRef {#RoleRef}

RoleRef contains information that points to the role being used

   | Field | Description

       | `apiGroup`string
       | apiGroup is the group for the resource being referenced

       | `kind` *string
       | kind is the type of resource being referenced

       | `name` *string
       | name is the name of resource being referenced
