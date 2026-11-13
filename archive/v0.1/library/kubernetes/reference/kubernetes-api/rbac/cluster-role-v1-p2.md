---
title: "ClusterRole (part 2 of 6)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/rbac/cluster-role-v1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# ClusterRole (part 2 of 6)

## Operations {#Operations}

### `post` Create

#### HTTP Request

POST /apis/rbac.authorization.k8s.io/v1/clusterroles

#### Query Parameters

   | Name | Type | Description

       | `pretty`
       | string
       | If 'true', then the output is pretty printed. Defaults to 'false' unless the user-agent indicates a browser or command-line HTTP tool (curl and wget).

       | `dryRun`
       | string
       | When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed

       | `fieldManager`
       | string
       | fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.

       | `fieldValidation`
       | string
       | fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.

#### Body Parameters

   | Name | Type | Description

       | `body`
       | ClusterRole
       |

#### Response

   | Status | Description | Response

       | 200
       | OK
       | ClusterRole

       | 201
       | Created
       | ClusterRole

       | 202
       | Accepted
       | ClusterRole

### `patch` Patch

#### HTTP Request

PATCH /apis/rbac.authorization.k8s.io/v1/clusterroles/{name}

#### Path Parameters

   | Name | Type | Description

       | `name`
       | string
       | name of the ClusterRole

#### Query Parameters

   | Name | Type | Description

       | `pretty`
       | string
       | If 'true', then the output is pretty printed. Defaults to 'false' unless the user-agent indicates a browser or command-line HTTP tool (curl and wget).

       | `dryRun`
       | string
       | When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed

       | `fieldManager`
       | string
       | fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. This field is required for apply requests (application/apply-patch) but optional for non-apply patch types (JsonPatch, MergePatch, StrategicMergePatch).

       | `fieldValidation`
       | string
       | fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.

       | `force`
       | boolean
       | Force is going to "force" Apply requests. It means user will re-acquire conflicting fields owned by other people. Force flag must be unset for non-apply patch requests.

#### Body Parameters

   | Name | Type | Description

       | `body`
       | Patch
       |

#### Response

   | Status | Description | Response

       | 200
       | OK
       | ClusterRole

       | 201
       | Created
       | ClusterRole

### `put` Replace

#### HTTP Request

PUT /apis/rbac.authorization.k8s.io/v1/clusterroles/{name}

#### Path Parameters

   | Name | Type | Description

       | `name`
       | string
       | name of the ClusterRole

#### Query Parameters

   | Name | Type | Description

       | `pretty`
       | string
       | If 'true', then the output is pretty printed. Defaults to 'false' unless the user-agent indicates a browser or command-line HTTP tool (curl and wget).

       | `dryRun`
       | string
       | When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed

       | `fieldManager`
       | string
       | fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.

       | `fieldValidation`
       | string
       | fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.

#### Body Parameters

   | Name | Type | Description

       | `body`
       | ClusterRole
       |

#### Response

   | Status | Description | Response

       | 200
       | OK
       | ClusterRole

       | 201
       | Created
       | ClusterRole

### `delete` Delete

#### HTTP Request

DELETE /apis/rbac.authorization.k8s.io/v1/clusterroles/{name}

#### Path Parameters

   | Name | Type | Description

       | `name`
       | string
       | name of the ClusterRole

#### Query Parameters

   | Name | Type | Description

       | `pretty`
       | string
       | If 'true', then the output is pretty printed. Defaults to 'false' unless the user-agent indicates a browser or command-line HTTP tool (curl and wget).

       | `dryRun`
       | string
       | When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed

       | `gracePeriodSeconds`
       | integer
       | The duration in seconds before the object should be deleted. Value must be non-negative integer. The value zero indicates delete immediately. If this value is nil, the default grace period for the specified type will be used. Defaults to a per object value if not specified. zero means delete immediately.

       | `ignoreStoreReadErrorWithClusterBreakingPotential`
       | boolean
       | if set to true, it will trigger an unsafe deletion of the resource in case the normal deletion flow fails with a corrupt object error. A resource is considered corrupt if it can not be retrieved from the underlying storage successfully because of a) its data can not be transformed e.g. decryption failure, or b) it fails to decode into an object. NOTE: unsafe deletion ignores finalizer constraints, skips precondition checks, and removes the object from the storage. WARNING: This may potentially break the cluster if the workload associated with the resource being unsafe-deleted relies on normal deletion flow. Use only if you REALLY know what you are doing. The default value is false, and the user must opt in to enable it

       | `orphanDependents`
       | boolean
       | Deprecated: please use the PropagationPolicy, this field will be deprecated in 1.7. Should the dependent objects be orphaned. If true/false, the "orphan" finalizer will be added to/removed from the object's finalizers list. Either this field or PropagationPolicy may be set, but not both.

       | `propagationPolicy`
       | string
       | Whether and how garbage collection will be performed. Either this field or OrphanDependents may be set, but not both. The default policy is decided by the existing finalizer set in the metadata.finalizers and the resource-specific default policy. Acceptable values are: 'Orphan' - orphan the dependents; 'Background' - allow the garbage collector to delete the dependents in the background; 'Foreground' - a cascading policy that deletes all dependents in the foreground.

#### Body Parameters

   | Name | Type | Description

       | `body`
       | DeleteOptions
       |

#### Response

   | Status | Description | Response

       | 200
       | OK
       | Status

       | 202
       | Accepted
       | Status
