---
title: "Docker Hub API changelog"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/reference/api/hub/changelog.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Docker Hub API changelog

Here you can learn about the latest changes, new features, bug fixes, and known
issues for Docker Service APIs.

---

## 2026-10-15

### Updates

- Add `sandbox:use` to personal access token <example-value> on
  Create personal access token.
  A request can send `sandbox:use` alone, or `sandbox:use` with one
  repository scope (`repo:admin`, `repo:write`, `repo:read`, or
  `repo:public_read`).
- In Docker Home, **Allow Cloud Sandboxes access** is separate from
  **Repository permissions**. The checkbox grants `sandbox:use`.
  **No repository access** leaves the token <example-value> a repository scope.

---

## 2026-09-01

### Updates

- Document that Update org member (role)
  accepts a custom role name in `role`.
- Document the `role` field on
  Update some details for an organization group.
- Add `Editor` to `org_member.role` on
  organization members.

---

## 2026-08-27

### Updates

- Document organization access token (OAT) support for
  repository management
  endpoints, the scope-dependent behavior of
  List repositories,
  and legacy paths that are OAT unsupported.

---

## 2025-11-21

### Updates

- Add missing `expires_at` fields on PAT management endpoints.

## 2025-09-25

### Updates

- Fix Assign repository group endpoints request/response

---

## 2025-09-19

### New

- Add Create repository endpoints for a given `namespace`.
- Add Get repository endpoints for a given `namespace`.
- Add Check repository endpoints for a given `namespace`.

### Deprecations

- Deprecate POST /v2/repositories
- Deprecate POST /v2/repositories/{namespace}
- Deprecate GET /v2/repositories/{namespace}/{repository}
- Deprecate HEAD /v2/repositories/{namespace}/{repository}

---

## 2025-07-29

### New

- Add Update repository immutable tags settings endpoints for a given `namespace` and `repository`.
- Add Verify repository immutable tags endpoints for a given `namespace` and `repository`.

---

## 2025-06-27

### New

- Add List repositories endpoints for a given `namespace`.

### Deprecations

- Deprecate /v2/repositories/{namespace}

---

## 2025-03-25

### New

- Add APIs for organization access token (OATs) management.

---

## 2025-03-18

### New

- Add access to audit logs for org
  access tokens.
