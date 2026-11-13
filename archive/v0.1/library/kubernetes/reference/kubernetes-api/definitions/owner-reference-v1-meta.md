---
title: "OwnerReference"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/definitions/owner-reference-v1-meta.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# OwnerReference

`apiVersion: meta/v1`

`import "k8s.io/apimachinery/pkg/apis/meta/v1"`

## OwnerReference {#OwnerReference}

OwnerReference contains enough information to let you identify an owning object. An owning object must be in the same namespace as the dependent, or be cluster-scoped, so there is no namespace field.

   | Field | Description

       | `apiVersion` *string
       | API version of the referent.

       | `blockOwnerDeletion`boolean
       | If true, AND if the owner has the "foregroundDeletion" finalizer, then the owner cannot be deleted from the key-value store until this reference is removed. See https://kubernetes.io/docs/concepts/architecture/garbage-collection/#foreground-deletion for how the garbage collector interacts with this field and enforces the foreground deletion. Defaults to false. To set this field, a user needs "delete" permission of the owner, otherwise 422 (Unprocessable Entity) will be returned.

       | `controller`boolean
       | If true, this reference points to the managing controller.

       | `kind` *string
       | Kind of the referent. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

       | `name` *string
       | Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names#names

       | `uid` *string
       | UID of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names#uids
