---
title: "SelfSubjectReview"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/definitions/self-subject-review-v1-authentication.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# SelfSubjectReview

`apiVersion: authentication.k8s.io/v1`

`import "k8s.io/api/authentication/v1"`

## SelfSubjectReview {#SelfSubjectReview}

SelfSubjectReview contains the user information that the kube-apiserver has about the user making this request. When using impersonation, users will receive the user info of the user being impersonated.  If impersonation or request header authentication is used, any extra keys will have their case ignored and returned as lowercase.

   | Field | Description

       | `apiVersion`string
       | APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

       | `kind`string
       | Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

       | `metadata`ObjectMeta
       | metadata is standard object's metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata

       | `status`SelfSubjectReviewStatus
       | status is filled in by the server with the user attributes.

## SelfSubjectReviewStatus {#SelfSubjectReviewStatus}

SelfSubjectReviewStatus is filled by the kube-apiserver and sent back to a user.

   | Field | Description

       | `userInfo`UserInfo
       | userInfo is a set of attributes belonging to the user making this request.
