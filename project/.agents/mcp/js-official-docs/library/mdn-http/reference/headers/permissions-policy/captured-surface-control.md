---
title: "Permissions-Policy: captured-surface-control directive"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/permissions-policy/captured-surface-control/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Permissions-Policy: captured-surface-control directive

The HTTP `Permissions-Policy` header `captured-surface-control` directive controls whether or not the document is permitted to use the Captured Surface Control API. Specifically, the `forwardWheel()`, `increaseZoomLevel()`, `decreaseZoomLevel()`, and `resetZoomLevel()` methods are controlled by this directive.

The promise returned by the API's main methods will reject with a `NotAllowedError` `DOMException` if the permission is not allowed.

## Syntax

```http
Permissions-Policy: captured-surface-control=<allowlist>;
```

- `<allowlist>`
    A list of origins for which permission is granted to use the feature. See `Permissions-Policy` > Syntax for more details.

## Default policy

The default allowlist for `captured-surface-control` is `self`.

## See also

- `Permissions-Policy` header
- Permissions Policy
- Screen Capture API
- Using the Captured Surface Control API
