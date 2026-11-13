---
title: "ResourceQuota (part 1 of 8)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/core/resource-quota-v1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# ResourceQuota

`apiVersion: v1`

`import "k8s.io/api/core/v1"`

## ResourceQuota {#ResourceQuota}

ResourceQuota sets aggregate quota restrictions enforced per namespace

   | Field | Description

       | `apiVersion`string
       | APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

       | `kind`string
       | Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

       | `metadata`ObjectMeta
       | Standard object's metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata

       | `spec`ResourceQuotaSpec
       | Spec defines the desired quota. https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status

       | `status`ResourceQuotaStatus
       | Status defines the actual enforced quota and its current usage. https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status

## ResourceQuotaSpec {#ResourceQuotaSpec}

ResourceQuotaSpec defines the desired hard limits to enforce for Quota.

   | Field | Description

       | `hard`object
       | hard is the set of desired hard limits for each named resource. More info: https://kubernetes.io/docs/concepts/policy/resource-quotas/

       | `scopeSelector`ScopeSelector
       | scopeSelector is also a collection of filters like scopes that must match each object tracked by a quota but expressed using ScopeSelectorOperator in combination with possible values. For a resource to match, both scopes AND scopeSelector (if specified in spec), must be matched.

       | `scopes`string array
       | A collection of filters that must match each object tracked by a quota. If not specified, the quota matches all objects.

## ResourceQuotaStatus {#ResourceQuotaStatus}

ResourceQuotaStatus defines the enforced hard limits and observed use.

   | Field | Description

       | `hard`object
       | Hard is the set of enforced hard limits for each named resource. More info: https://kubernetes.io/docs/concepts/policy/resource-quotas/

       | `used`object
       | Used is the current observed total usage of the resource in the namespace.

## ResourceQuotaList {#ResourceQuotaList}

ResourceQuotaList is a list of ResourceQuota items.

   | Field | Description

       | `apiVersion`string
       | APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

       | `items` *ResourceQuota array
       | Items is a list of ResourceQuota objects. More info: https://kubernetes.io/docs/concepts/policy/resource-quotas/

       | `kind`string
       | Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

       | `metadata`ListMeta
       | Standard list metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

## ScopeSelector {#ScopeSelector}

A scope selector represents the AND of the selectors represented by the scoped-resource selector requirements.

   | Field | Description

       | `matchExpressions`ScopedResourceSelectorRequirement array
       | A list of scope selector requirements by scope of the resources.

## ScopedResourceSelectorRequirement {#ScopedResourceSelectorRequirement}

A scoped-resource selector requirement is a selector that contains values, a scope name, and an operator that relates the scope name and values.

   | Field | Description

       | `operator` *string
       | Represents a scope's relationship to a set of values. Valid operators are In, NotIn, Exists, DoesNotExist.Possible enum values: - `"DoesNotExist"` - `"Exists"` - `"In"` - `"NotIn"`

       | `scopeName` *string
       | The name of the scope that the selector applies to.Possible enum values: - `"BestEffort"` Match all pod objects that have best effort quality of service - `"CrossNamespacePodAffinity"` Match all pod objects that have cross-namespace pod (anti)affinity mentioned. - `"NotBestEffort"` Match all pod objects that do not have best effort quality of service - `"NotTerminating"` Match all pod objects where spec.activeDeadlineSeconds is nil - `"PriorityClass"` Match all pod objects that have priority class mentioned - `"Terminating"` Match all pod objects where spec.activeDeadlineSeconds >=0 - `"VolumeAttributesClass"` Match all pvc objects that have volume attributes class mentioned.

       | `values`string array
       | An array of string values. If the operator is In or NotIn, the values array must be non-empty. If the operator is Exists or DoesNotExist, the values array must be empty. This array is replaced during a strategic merge patch.
