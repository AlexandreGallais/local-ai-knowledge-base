---
title: "ResourceClaimTemplate (part 1 of 8)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/resource/resource-claim-template-v1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# ResourceClaimTemplate

`apiVersion: resource.k8s.io/v1`

`import "k8s.io/api/resource/v1"`

## ResourceClaimTemplate {#ResourceClaimTemplate}

ResourceClaimTemplate is used to produce ResourceClaim objects.

   | Field | Description

       | `apiVersion`string
       | APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

       | `kind`string
       | Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

       | `metadata`ObjectMeta
       | Standard object metadata

       | `spec`ResourceClaimTemplateSpec
       | Describes the ResourceClaim that is to be generated.  This field is immutable. A ResourceClaim will get created by the control plane for a Pod when needed and then not get updated anymore.

## ResourceClaimTemplateSpec {#ResourceClaimTemplateSpec}

ResourceClaimTemplateSpec contains the metadata and fields for a ResourceClaim.

   | Field | Description

       | `metadata`ObjectMeta
       | ObjectMeta may contain labels and annotations that will be copied into the ResourceClaim when creating it. No other fields are allowed and will be rejected during validation.

       | `spec`ResourceClaimSpec
       | Spec for the ResourceClaim. The entire content is copied unchanged into the ResourceClaim that gets created from this template. The same fields as in a ResourceClaim are also valid here.

## ResourceClaimTemplateList {#ResourceClaimTemplateList}

ResourceClaimTemplateList is a collection of claim templates.

   | Field | Description

       | `apiVersion`string
       | APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

       | `items` *ResourceClaimTemplate array
       | Items is the list of resource claim templates.

       | `kind`string
       | Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

       | `metadata`ListMeta
       | Standard list metadata
