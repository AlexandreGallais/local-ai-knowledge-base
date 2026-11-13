---
title: "Permissions-Policy: storage-access directive"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/permissions-policy/storage-access/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Permissions-Policy: storage-access directive

The HTTP `Permissions-Policy` header `storage-access` directive controls whether a document loaded in a third-party context (i.e., embedded in an ``) is allowed to use the `Storage Access API` to request access to unpartitioned cookies.

This is relevant to user agents that by default block access to unpartitioned cookies by sites loaded in a third-party context to improve privacy (for example, to prevent tracking).

Specifically, where a defined policy blocks use of this feature, `Document.requestStorageAccess()` calls will return a `Promise` that rejects with a `DOMException` of type `NotAllowedError`.

## Syntax

```http
Permissions-Policy: storage-access=<allowlist>;
```

- `<allowlist>`
    A list of origins for which permission is granted to use the feature. See `Permissions-Policy` > Syntax for more details.

## Default policy

The default allowlist for `storage-access` is `*`.

## See also

- Storage Access API
- `Permissions-Policy` header
- Permissions Policy
