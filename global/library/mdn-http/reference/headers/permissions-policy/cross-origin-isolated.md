---
title: "Permissions-Policy: cross-origin-isolated directive"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/permissions-policy/cross-origin-isolated/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Permissions-Policy: cross-origin-isolated directive

The HTTP `Permissions-Policy` header `cross-origin-isolated` directive controls whether the current document is allowed to use APIs that require `cross-origin isolation`.

Specifically, where a defined policy blocks use of this feature, the `Window.crossOriginIsolated` and `WorkerGlobalScope.crossOriginIsolated` properties will always return `false`, and the document will not benefit from reduced restrictions on the use of some APIs that are granted only to cross-origin isolated documents.
This is true regardless of the `Cross-Origin-Embedder-Policy` and `Cross-Origin-Opener-Policy` headers, and whether the document would have been cross-origin isolated had the permission been granted.

The APIs that require this permission include the use of `SharedArrayBuffer` objects and `Performance.now()` with unthrottled timers — see `Window.crossOriginIsolated` for information about other restricted APIs.

The permission can be used to maintain restrictions on access to the sensitive APIs unless they are actually needed by a cross-origin isolated document.
Note that if the feature is not allowed, but it otherwise would have been cross-origin isolated, then in all other respects it is still cross-origin isolated.
For example, it will only share a browsing context group with documents in the same origin.

## Syntax

```http
Permissions-Policy: cross-origin-isolated=<allowlist>;
```

- `<allowlist>`
    A list of one or more origins for which permission is granted to use the feature.
    See `Permissions-Policy` > Syntax for more details.

## Default policy

The default allowlist for `cross-origin-isolated` is `self`.

## See also

- `Permissions-Policy` header
- Permissions Policy
