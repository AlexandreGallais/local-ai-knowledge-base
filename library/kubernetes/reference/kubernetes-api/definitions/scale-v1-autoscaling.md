---
title: "Scale"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/definitions/scale-v1-autoscaling.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Scale

`apiVersion: autoscaling/v1`

`import "k8s.io/api/autoscaling/v1"`

## Scale {#Scale}

Scale represents a scaling request for a resource.

   | Field | Description

       | `apiVersion`string
       | APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

       | `kind`string
       | Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

       | `metadata`ObjectMeta
       | metadata is the standard object metadata; More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata.

       | `spec`ScaleSpec
       | spec defines the behavior of the scale. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status.

       | `status`ScaleStatus
       | status is the current status of the scale. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status. Read-only.

## ScaleSpec {#ScaleSpec}

ScaleSpec describes the attributes of a scale subresource.

   | Field | Description

       | `replicas`integer
       | replicas is the desired number of instances for the scaled object.

## ScaleStatus {#ScaleStatus}

ScaleStatus represents the current status of a scale subresource.

   | Field | Description

       | `replicas` *integer
       | replicas is the actual number of observed instances of the scaled object.

       | `selector`string
       | selector is the label query over pods that should match the replicas count. This is same as the label selector but in the string format to avoid introspection by clients. The string will be in the same format as the query-param syntax. More info about label selectors: https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/
