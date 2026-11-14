---
title: "Permissions-Policy: idle-detection directive"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/permissions-policy/idle-detection/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Permissions-Policy: idle-detection directive

The HTTP `Permissions-Policy` header `idle-detection` directive controls whether the current document is allowed to use the `Idle Detection API` to detect when users are interacting with their devices, for example to report "available"/"away" status in chat applications.

Specifically, where a defined policy blocks use of this feature, `IdleDetector.start()` calls will return a `Promise` that rejects with a `DOMException` of type `NotAllowedError`.

## Syntax

```http
Permissions-Policy: idle-detection=<allowlist>;
```

- `<allowlist>`
    A list of origins for which permission is granted to use the feature. See `Permissions-Policy` > Syntax for more details.

## Default policy

The default allowlist for `idle-detection` is `self`.

## See also

- `Permissions-Policy` header
- Permissions Policy
