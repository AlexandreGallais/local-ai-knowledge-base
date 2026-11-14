---
title: "Permissions-Policy: xr-spatial-tracking directive"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/permissions-policy/xr-spatial-tracking/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Permissions-Policy: xr-spatial-tracking directive

The HTTP `Permissions-Policy` header `xr-spatial-tracking` directive controls whether the current document is allowed to use the WebXR Device API.

Specifically, where a defined policy blocks usage of this feature:

- `navigator.xr.isSessionSupported()` and `navigator.xr.requestSession()` calls will return a `Promise` that rejects with a `DOMException` of type `SecurityError`.

- `devicechange` events are not fired on the `navigator.xr` object.

## Syntax

```http
Permissions-Policy: xr-spatial-tracking=<allowlist>;
```

- `<allowlist>`
    A list of origins for which permission is granted to use the feature. See `Permissions-Policy` > Syntax for more details.

## Default policy

The default allowlist for `xr-spatial-tracking` is `self`.

## See also

- WebXR Device API
- `navigator.xr.requestSession()`, and `navigator.xr.isSessionSupported()` and `devicechange` event on `navigator.xr`
- `Permissions-Policy` header
- Permissions Policy
