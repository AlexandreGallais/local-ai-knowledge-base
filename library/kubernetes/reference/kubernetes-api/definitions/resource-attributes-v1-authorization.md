---
title: "ResourceAttributes"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/definitions/resource-attributes-v1-authorization.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# ResourceAttributes

`apiVersion: authorization.k8s.io/v1`

`import "k8s.io/api/authorization/v1"`

## ResourceAttributes {#ResourceAttributes}

ResourceAttributes includes the authorization attributes available for resource requests to the Authorizer interface

   | Field | Description

       | `fieldSelector`FieldSelectorAttributes
       | fieldSelector describes the limitation on access based on field.  It can only limit access, not broaden it.

       | `group`string
       | group is the API Group of the Resource.  "*" means all.

       | `labelSelector`LabelSelectorAttributes
       | labelSelector describes the limitation on access based on labels.  It can only limit access, not broaden it.

       | `name`string
       | name is the name of the resource being requested for a "get" or deleted for a "delete". "" (empty) means all.

       | `namespace`string
       | namespace is the namespace of the action being requested.  Currently, there is no distinction between no namespace and all namespaces "" (empty) is defaulted for LocalSubjectAccessReviews "" (empty) is empty for cluster-scoped resources "" (empty) means "all" for namespace scoped resources from a SubjectAccessReview or SelfSubjectAccessReview

       | `resource`string
       | resource is one of the existing resource types.  "*" means all.

       | `subresource`string
       | subresource is one of the existing resource types.  "" means none.

       | `verb`string
       | verb is a kubernetes resource API verb, like: get, list, watch, create, update, delete, proxy.  "*" means all.

       | `version`string
       | version is the API Version of the Resource.  "*" means all.
