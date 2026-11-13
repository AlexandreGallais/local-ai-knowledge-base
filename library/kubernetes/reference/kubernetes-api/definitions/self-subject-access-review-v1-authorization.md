---
title: "SelfSubjectAccessReview"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/definitions/self-subject-access-review-v1-authorization.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# SelfSubjectAccessReview

`apiVersion: authorization.k8s.io/v1`

`import "k8s.io/api/authorization/v1"`

## SelfSubjectAccessReview {#SelfSubjectAccessReview}

SelfSubjectAccessReview checks whether or the current user can perform an action.  Not filling in a spec.namespace means &#34;in all namespaces&#34;.  Self is a special case, because users should always be able to check whether they can perform an action

   | Field | Description

       | `apiVersion`string
       | APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

       | `kind`string
       | Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

       | `metadata`ObjectMeta
       | metadata is the standard list metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata

       | `spec` *SelfSubjectAccessReviewSpec
       | spec holds information about the request being evaluated.  user and groups must be empty

       | `status`SubjectAccessReviewStatus
       | status is filled in by the server and indicates whether the request is allowed or not

## SelfSubjectAccessReviewSpec {#SelfSubjectAccessReviewSpec}

SelfSubjectAccessReviewSpec is a description of the access request.  Exactly one of resourceAttributes and nonResourceAttributes must be set

   | Field | Description

       | `nonResourceAttributes`NonResourceAttributes
       | nonResourceAttributes describes information for a non-resource access request

       | `resourceAttributes`ResourceAttributes
       | resourceAttributes describes information for a resource access request
