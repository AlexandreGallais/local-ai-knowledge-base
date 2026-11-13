---
title: "LimitRange (part 1 of 8)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/core/limit-range-v1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# LimitRange

`apiVersion: v1`

`import "k8s.io/api/core/v1"`

## LimitRange {#LimitRange}

LimitRange sets resource usage limits for each kind of resource in a Namespace.

   | Field | Description

       | `apiVersion`string
       | APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

       | `kind`string
       | Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

       | `metadata`ObjectMeta
       | Standard object's metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata

       | `spec`LimitRangeSpec
       | Spec defines the limits enforced. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status

## LimitRangeSpec {#LimitRangeSpec}

LimitRangeSpec defines a min/max usage limit for resources that match on kind.

   | Field | Description

       | `limits` *LimitRangeItem array
       | Limits is the list of LimitRangeItem objects that are enforced.

## LimitRangeList {#LimitRangeList}

LimitRangeList is a list of LimitRange items.

   | Field | Description

       | `apiVersion`string
       | APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

       | `items` *LimitRange array
       | Items is a list of LimitRange objects. More info: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/

       | `kind`string
       | Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

       | `metadata`ListMeta
       | Standard list metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

## LimitRangeItem {#LimitRangeItem}

LimitRangeItem defines a min/max usage limit for any resource that matches on kind.

   | Field | Description

       | `default`object
       | Default resource requirement limit value by resource name if resource limit is omitted.

       | `defaultRequest`object
       | DefaultRequest is the default resource requirement request value by resource name if resource request is omitted.

       | `max`object
       | Max usage constraints on this kind by resource name.

       | `maxLimitRequestRatio`object
       | MaxLimitRequestRatio if specified, the named resource must have a request and limit that are both non-zero where limit divided by request is less than or equal to the enumerated value; this represents the max burst for the named resource.

       | `min`object
       | Min usage constraints on this kind by resource name.

       | `type` *string
       | Type of resource that this limit applies to.
