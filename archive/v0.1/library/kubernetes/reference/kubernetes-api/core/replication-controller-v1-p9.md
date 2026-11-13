---
title: "ReplicationController (part 9 of 9)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/core/replication-controller-v1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# ReplicationController (part 9 of 9)

### `put` Replace Scale

#### HTTP Request

PUT /api/v1/namespaces/{namespace}/replicationcontrollers/{name}/scale

#### Path Parameters

   | Name | Type | Description

       | `name`
       | string
       | name of the Scale

       | `namespace`
       | string
       | object name and auth scope, such as for teams and projects

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
       | Scale
       |

#### Response

   | Status | Description | Response

       | 200
       | OK
       | Scale

       | 201
       | Created
       | Scale

### `patch` Patch Scale

#### HTTP Request

PATCH /api/v1/namespaces/{namespace}/replicationcontrollers/{name}/scale

#### Path Parameters

   | Name | Type | Description

       | `name`
       | string
       | name of the Scale

       | `namespace`
       | string
       | object name and auth scope, such as for teams and projects

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
       | Scale

       | 201
       | Created
       | Scale
