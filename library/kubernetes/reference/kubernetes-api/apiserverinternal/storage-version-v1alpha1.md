---
title: "StorageVersion (part 1 of 6)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/apiserverinternal/storage-version-v1alpha1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# StorageVersion

`apiVersion: internal.apiserver.k8s.io/v1alpha1`

`import "k8s.io/api/apiserverinternal/v1alpha1"`

## StorageVersion {#StorageVersion}

Storage version of a specific resource.

   | Field | Description

       | `apiVersion`string
       | APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

       | `kind`string
       | Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

       | `metadata` *ObjectMeta
       | metadata is the standard object metadata. The name is \<group>.\<resource>.

       | `spec`StorageVersionSpec
       | spec is an empty spec. It is here to comply with Kubernetes API style.

       | `status`StorageVersionStatus
       | status on the version the API server instance can decode from and encode objects to when persisting objects in the backend.

## StorageVersionSpec {#StorageVersionSpec}

StorageVersionSpec is an empty spec.

## StorageVersionStatus {#StorageVersionStatus}

API server instances report the versions they can decode and the version they encode objects to when persisting objects in the backend.

   | Field | Description

       | `commonEncodingVersion`string
       | commonEncodingVersion is set to an encoding storage version if all API server instances share that same version. If they don't share one storage version, this field is left empty. API servers should finish updating its storageVersionStatus entry before serving write operations, so that this field will be in sync with the reality.

       | `conditions`StorageVersionCondition array
       | conditions lists the latest available observations of the storageVersion's state.

       | `storageVersions`ServerStorageVersion array
       | storageVersions lists the reported versions per API server instance.

## StorageVersionList {#StorageVersionList}

A list of StorageVersions.

   | Field | Description

       | `apiVersion`string
       | APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

       | `items` *StorageVersion array
       | Items holds a list of StorageVersion

       | `kind`string
       | Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

       | `metadata`ListMeta
       | Standard list metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata

## ServerStorageVersion {#ServerStorageVersion}

An API server instance reports the version it can decode and the version it encodes objects to when persisting objects in the backend.

   | Field | Description

       | `apiServerID` *string
       | apiServerID is the ID of the reporting API server.

       | `decodableVersions` *string array
       | decodableVersions are the encoding versions the API server can handle to decode. The API server can decode objects encoded in these versions. The encodingVersion must be included in the decodableVersions.

       | `encodingVersion` *string
       | encodingVersion the API server encodes the object to when persisting it in the backend (e.g., etcd).

       | `servedVersions`string array
       | servedVersions lists all versions the API server can serve. DecodableVersions must include all ServedVersions.

## StorageVersionCondition {#StorageVersionCondition}

Describes the state of the storageVersion at a certain point.

   | Field | Description

       | `lastTransitionTime`Time
       | lastTransitionTime is the last time the condition transitioned from one status to another.

       | `message` *string
       | message is a human readable string indicating details about the transition.

       | `observedGeneration`integer
       | observedGeneration represents the .metadata.generation that the condition was set based upon, if field is set.

       | `reason` *string
       | reason for the condition's last transition.

       | `status` *string
       | status of the condition, one of True, False, Unknown.

       | `type` *string
       | type of the condition.
