---
title: "Permissions-Policy: window-management directive"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/permissions-policy/window-management/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Permissions-Policy: window-management directive

The HTTP `Permissions-Policy` header `window-management` directive controls whether or not the current document is allowed to use the Window Management API to manage windows on multiple displays.

Where this policy forbids use of the API:

- The `Promise` returned by the `Window.getScreenDetails()` method will reject with a `NotAllowedError` exception.
- The `Window.screen.isExtended` property will always return `false`.

## Syntax

```http
Permissions-Policy: window-management=<allowlist>;
```

- `<allowlist>`
    A list of origins for which permission is granted to use the feature. See `Permissions-Policy` > Syntax for more details.

## Default policy

The default allowlist for `window-management` is `self`.

## See also

- Window Management API
- `Permissions-Policy` header
- Permissions Policy
