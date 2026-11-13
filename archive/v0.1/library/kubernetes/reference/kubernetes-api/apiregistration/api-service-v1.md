---
title: "APIService (part 1 of 6)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/apiregistration/api-service-v1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# APIService

`apiVersion: apiregistration.k8s.io/v1`

`import "k8s.io/kube-aggregator/pkg/apis/apiregistration/v1"`

## APIService {#APIService}

APIService represents a server for a particular GroupVersion. Name must be &#34;version.group&#34;.

   | Field | Description

       | `apiVersion`string
       | APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

       | `kind`string
       | Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

       | `metadata`ObjectMeta
       | Standard object's metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata

       | `spec`APIServiceSpec
       | Spec contains information for locating and communicating with a server

       | `status`APIServiceStatus
       | Status contains derived information about an API server

## APIServiceSpec {#APIServiceSpec}

APIServiceSpec contains information for locating and communicating with a server. Only https is supported, though you are able to disable certificate verification.

   | Field | Description

       | `caBundle`string
       | CABundle is a PEM encoded CA bundle which will be used to validate an API server's serving certificate. If unspecified, system trust roots on the apiserver are used.

       | `group`string
       | Group is the API group name this server hosts

       | `groupPriorityMinimum` *integer
       | GroupPriorityMinimum is the priority this group should have at least. Higher priority means that the group is preferred by clients over lower priority ones. Note that other versions of this group might specify even higher GroupPriorityMinimum values such that the whole group gets a higher priority. The primary sort is based on GroupPriorityMinimum, ordered highest number to lowest (20 before 10). The secondary sort is based on the alphabetical comparison of the name of the object.  (v1.bar before v1.foo) We'd recommend something like: *.k8s.io (except extensions) at 18000 and PaaSes (OpenShift, Deis) are recommended to be in the 2000s

       | `insecureSkipTLSVerify`boolean
       | InsecureSkipTLSVerify disables TLS certificate verification when communicating with this server. This is strongly discouraged.  You should use the CABundle instead.

       | `service`ServiceReference
       | Service is a reference to the service for this API server.  It must communicate on port 443. If the Service is nil, that means the handling for the API groupversion is handled locally on this server. The call will simply delegate to the normal handler chain to be fulfilled.

       | `version`string
       | Version is the API version this server hosts.  For example, "v1"

       | `versionPriority` *integer
       | VersionPriority controls the ordering of this API version inside of its group.  Must be greater than zero. The primary sort is based on VersionPriority, ordered highest to lowest (20 before 10). Since it's inside of a group, the number can be small, probably in the 10s. In case of equal version priorities, the version string will be used to compute the order inside a group. If the version string is "kube-like", it will sort above non "kube-like" version strings, which are ordered lexicographically. "Kube-like" versions start with a "v", then are followed by a number (the major version), then optionally the string "alpha" or "beta" and another number (the minor version). These are sorted first by GA > beta > alpha (where GA is a version with no suffix such as beta or alpha), and then by comparing major version, then minor version. An example sorted list of versions: v10, v2, v1, v11beta2, v10beta3, v3beta1, v12alpha1, v11alpha2, foo1, foo10.

## APIServiceStatus {#APIServiceStatus}

APIServiceStatus contains derived information about an API server

   | Field | Description

       | `conditions`APIServiceCondition arraypatch strategy: merge on key `type`
       | Current service state of apiService.

## APIServiceList {#APIServiceList}

APIServiceList is a list of APIService objects.

   | Field | Description

       | `apiVersion`string
       | APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

       | `items` *APIService array
       | Items is the list of APIService

       | `kind`string
       | Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

       | `metadata`ListMeta
       | Standard list metadata More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata

## APIServiceCondition {#APIServiceCondition}

APIServiceCondition describes the state of an APIService at a particular point

   | Field | Description

       | `lastTransitionTime`Time
       | Last time the condition transitioned from one status to another.

       | `message`string
       | Human-readable message indicating details about last transition.

       | `reason`string
       | Unique, one-word, CamelCase reason for the condition's last transition.

       | `status` *string
       | Status is the status of the condition. Can be True, False, Unknown.

       | `type` *string
       | Type is the type of the condition.

## ServiceReference {#ServiceReference}

ServiceReference holds a reference to Service.legacy.k8s.io

   | Field | Description

       | `name`string
       | Name is the name of the service

       | `namespace`string
       | Namespace is the namespace of the service

       | `port`integer
       | If specified, the port on the service that hosting webhook. Default to 443 for backward compatibility. `port` should be a valid port number (1-65535, inclusive).
