---
title: "Permissions-Policy: screen-wake-lock directive"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/permissions-policy/screen-wake-lock/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Permissions-Policy: screen-wake-lock directive

The HTTP `Permissions-Policy` header **`screen-wake-lock`** directive controls whether the current document is allowed to use Screen Wake Lock API to indicate that the device should not dim or turn off the screen.

Specifically, where a defined policy blocks use of this feature, `WakeLock.request()` calls will return a `Promise` that rejects with a `DOMException` of type `NotAllowedError`.

## Syntax

```http
Permissions-Policy: screen-wake-lock=<allowlist>;
```

- `<allowlist>`
    A list of origins for which permission is granted to use the feature. See `Permissions-Policy` > Syntax for more details.

## Default policy

The default allowlist for `screen-wake-lock` is `self`.

## See also

- Screen Wake Lock API
- `Permissions-Policy` header
- Permissions Policy
