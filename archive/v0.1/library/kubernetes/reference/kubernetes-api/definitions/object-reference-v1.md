---
title: "ObjectReference"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/definitions/object-reference-v1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# ObjectReference

`apiVersion: v1`

`import "k8s.io/api/core/v1"`

## ObjectReference {#ObjectReference}

ObjectReference contains enough information to let you inspect or modify the referred object.

   | Field | Description

       | `apiVersion`string
       | API version of the referent.

       | `fieldPath`string
       | If referring to a piece of an object instead of an entire object, this string should contain a valid JSON/Go field access statement, such as desiredState.manifest.containers[2]. For example, if the object reference is to a container within a pod, this would take on a value like: "spec.containers{name}" (where "name" refers to the name of the container that triggered the event) or if no container name is specified "spec.containers[2]" (container with index 2 in this pod). This syntax is chosen only to have some well-defined way of referencing a part of an object.

       | `kind`string
       | Kind of the referent. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

       | `name`string
       | Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names

       | `namespace`string
       | Namespace of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/

       | `resourceVersion`string
       | Specific resourceVersion to which this reference is made, if any. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#concurrency-control-and-consistency

       | `uid`string
       | UID of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#uids
