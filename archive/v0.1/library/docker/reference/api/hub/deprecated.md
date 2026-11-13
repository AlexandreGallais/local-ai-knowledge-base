---
title: "Deprecated Docker Hub API endpoints"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/reference/api/hub/deprecated.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Deprecated Docker Hub API endpoints

This page provides an overview of endpoints that are deprecated in Docker Hub API.

## Endpoint deprecation policy

As changes are made to Docker there may be times when existing endpoints need to be removed or replaced with newer endpoints. Before an existing endpoint is removed it is labeled as "deprecated" within the documentation. After some time it may be removed.

## Deprecated endpoints

The following table provides an overview of the current status of deprecated endpoints:

**Deprecated**: the endpoint is marked "deprecated" and should no longer be used.

The endpoint may be removed, disabled, or change behavior in a future release.

**Removed**: the endpoint was removed, disabled, or hidden.

---

| Status     | Feature                                                                                              | Date       |
|------------|------------------------------------------------------------------------------------------------------|------------|
| Deprecated | Deprecate undocumented create/get repository | 2025-09-19 |
| Deprecated | Deprecate /v2/repositories/{namespace}                | 2025-06-27 |
|            | Create deprecation log table                                        | 2025-06-27 |
| Removed    | Docker Hub API v1 deprecation                                      | 2022-08-23 |

---

### Deprecate legacy CreateRepository and GetRepository

Deprecate undocumented endpoints :
- `POST /v2/repositories` and `POST /v2/repositories/{namespace}` replaced by Create repository.
- `GET /v2/repositories/{namespace}/{repository}` replaced by Get repository.
- `HEAD /v2/repositories/{namespace}/{repository}` replaced by Check repository.

---

### Deprecate legacy ListNamespaceRepositories

Deprecate undocumented endpoint `GET /v2/repositories/{namespace}` replaced by List repositories.

---

### Create deprecation log table

Reformat page

---

### Docker Hub API v1 deprecation

Docker Hub API v1 has been deprecated. Use Docker Hub API v2 instead.

The following API routes within the v1 path will no longer work and will return a 410 status code:
* `/v1/repositories/{name}/images`
* `/v1/repositories/{name}/tags`
* `/v1/repositories/{name}/tags/{tag_name}`
* `/v1/repositories/{namespace}/{name}/images`
* `/v1/repositories/{namespace}/{name}/tags`
* `/v1/repositories/{namespace}/{name}/tags/{tag_name}`

If you want to continue using the Docker Hub API in your current applications, update your clients to use v2 endpoints.

| **OLD**                                                                                                                                                              | **NEW**                                                                                                                                   |
|----------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------|
| /v1/repositories/{name}/tags                                     | /v2/namespaces/{namespace}/repositories/{repository}/tags     |
| /v1/repositories/{namespace}/{name}/tags                         | /v2/namespaces/{namespace}/repositories/{repository}/tags  |
| /v1/repositories/{namespace}/{name}/tags            | /v2/namespaces/{namespace}/repositories/{repository}/tags/{tag} |
| /v1/repositories/{namespace}/{name}/tags/{tag_name} | /v2/namespaces/{namespace}/repositories/{repository}/tags/{tag} |

---
