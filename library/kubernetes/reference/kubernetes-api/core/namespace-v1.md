---
title: "Namespace (part 1 of 5)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/core/namespace-v1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Namespace

`apiVersion: v1`

`import "k8s.io/api/core/v1"`

## Namespace {#Namespace}

Namespace provides a scope for Names. Use of multiple namespaces is optional.

   | Field | Description

       | `apiVersion`string
       | APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

       | `kind`string
       | Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

       | `metadata`ObjectMeta
       | Standard object's metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata

       | `spec`NamespaceSpec
       | Spec defines the behavior of the Namespace. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status

       | `status`NamespaceStatus
       | Status describes the current status of a Namespace. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status

## NamespaceSpec {#NamespaceSpec}

NamespaceSpec describes the attributes on a Namespace.

   | Field | Description

       | `finalizers`string array
       | Finalizers is an opaque list of values that must be empty to permanently remove object from storage. More info: https://kubernetes.io/docs/tasks/administer-cluster/namespaces/

## NamespaceStatus {#NamespaceStatus}

NamespaceStatus is information about the current status of a Namespace.

   | Field | Description

       | `conditions`NamespaceCondition arraypatch strategy: merge on key `type`
       | Represents the latest available observations of a namespace's current state.

       | `phase`string
       | Phase is the current lifecycle phase of the namespace. More info: https://kubernetes.io/docs/tasks/administer-cluster/namespaces/Possible enum values: - `"Active"` means the namespace is available for use in the system - `"Terminating"` means the namespace is undergoing graceful termination

## NamespaceList {#NamespaceList}

NamespaceList is a list of Namespaces.

   | Field | Description

       | `apiVersion`string
       | APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

       | `items` *Namespace array
       | Items is the list of Namespace objects in the list. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/

       | `kind`string
       | Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

       | `metadata`ListMeta
       | Standard list metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

## NamespaceCondition {#NamespaceCondition}

NamespaceCondition contains details about state of namespace.

   | Field | Description

       | `lastTransitionTime`Time
       | Last time the condition transitioned from one status to another.

       | `message`string
       | Human-readable message indicating details about last transition.

       | `reason`string
       | Unique, one-word, CamelCase reason for the condition's last transition.

       | `status` *string
       | Status of the condition, one of True, False, Unknown.

       | `type` *string
       | Type of namespace controller condition.
