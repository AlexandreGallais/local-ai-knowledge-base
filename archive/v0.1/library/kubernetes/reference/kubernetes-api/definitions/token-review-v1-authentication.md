---
title: "TokenReview"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/definitions/token-review-v1-authentication.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# TokenReview

`apiVersion: authentication.k8s.io/v1`

`import "k8s.io/api/authentication/v1"`

## TokenReview {#TokenReview}

TokenReview attempts to authenticate a token to a known user. Note: TokenReview requests may be cached by the webhook token <example-value> plugin in the kube-apiserver.

   | Field | Description

       | `apiVersion`string
       | APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

       | `kind`string
       | Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

       | `metadata`ObjectMeta
       | metadata is the standard object's metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata

       | `spec` *TokenReviewSpec
       | spec holds information about the request being evaluated

       | `status`TokenReviewStatus
       | status is filled in by the server and indicates whether the request can be authenticated.

## TokenReviewSpec {#TokenReviewSpec}

TokenReviewSpec is a description of the token <example-value> request.

   | Field | Description

       | `audiences`string array
       | audiences is a list of the identifiers that the resource server presented with the token <example-value> as. Audience-aware token <example-value> will verify that the token was intended for at least one of the audiences in this list. If no audiences are provided, the audience will default to the audience of the Kubernetes apiserver.

       | `token` *string
       | token is the opaque bearer token.

## TokenReviewStatus {#TokenReviewStatus}

TokenReviewStatus is the result of the token <example-value> request.

   | Field | Description

       | `audiences`string array
       | audiences are audience identifiers chosen by the authenticator that are compatible with both the TokenReview and token. An identifier is any identifier in the intersection of the TokenReviewSpec audiences and the token's audiences. A client of the TokenReview API that sets the spec.audiences field should validate that a compatible audience identifier is returned in the status.audiences field to ensure that the TokenReview server is audience aware. If a TokenReview returns an empty status.audience field where status.authenticated is "<example-value>", the token is valid against the audience of the Kubernetes API server.

       | `authenticated`boolean
       | authenticated indicates that the token was associated with a known user.

       | `error`string
       | error indicates that the token <example-value>'t be checked

       | `user`UserInfo
       | user is the UserInfo associated with the provided token.
