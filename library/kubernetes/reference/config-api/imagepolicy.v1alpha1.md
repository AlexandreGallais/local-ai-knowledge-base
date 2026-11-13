---
title: "Image Policy API (v1alpha1)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/config-api/imagepolicy.v1alpha1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Image Policy API (v1alpha1)

## Resource Types

- ImageReview

## `ImageReview`     {#imagepolicy-k8s-io-v1alpha1-ImageReview}

ImageReview checks if the set of images in a pod are allowed.

 | Field | Description

 | `apiVersion`string | `imagepolicy.k8s.io/v1alpha1`

 | `kind`string | `ImageReview`

 | `metadata`
`meta/v1.ObjectMeta`

 |
   metadata is the standard object's metadata.
More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
Refer to the Kubernetes API documentation for the fields of the `metadata` field.

 | `spec`
`ImageReviewSpec`

 |
   spec holds information about the pod being evaluated

 | `status`
`ImageReviewStatus`

 |
   status is filled in by the backend and indicates whether the pod should be allowed.

## `ImageReviewContainerSpec`     {#imagepolicy-k8s-io-v1alpha1-ImageReviewContainerSpec}

**Appears in:**

- ImageReviewSpec

ImageReviewContainerSpec is a description of a container within the pod creation request.

 | Field | Description

 | `image`
`string`

 |
   image can be in the form image:tag or image@SHA:012345679abcdef.

## `ImageReviewSpec`     {#imagepolicy-k8s-io-v1alpha1-ImageReviewSpec}

**Appears in:**

- ImageReview

ImageReviewSpec is a description of the pod creation request.

 | Field | Description

 | `containers`
`[]ImageReviewContainerSpec`

 |
   containers is a list of a subset of the information in each container of the Pod being created.

 | `annotations`
`map[string]string`

 |
   annotations is a list of key-value pairs extracted from the Pod's annotations.
It only includes keys which match the pattern `*.image-policy.k8s.io/*`.
It is up to each webhook backend to determine how to interpret these annotations, if at all.

 | `namespace`
`string`

 |
   namespace is the namespace the pod is being created in.

## `ImageReviewStatus`     {#imagepolicy-k8s-io-v1alpha1-ImageReviewStatus}

**Appears in:**

- ImageReview

ImageReviewStatus is the result of the review for the pod creation request.

 | Field | Description

 | `allowed`
`bool`

 |
   allowed indicates that all images were allowed to be run.

 | `reason`
`string`

 |
   reason should be empty unless Allowed is false in which case it
may contain a short description of what is wrong.  Kubernetes
may truncate excessively long errors when displaying to the user.

 | `auditAnnotations`
`map[string]string`

 |
   auditAnnotations will be added to the attributes object of the
admission controller request using 'AddAnnotation'.  The keys should
be prefix-less (i.e., the admission controller will add an
appropriate prefix).
