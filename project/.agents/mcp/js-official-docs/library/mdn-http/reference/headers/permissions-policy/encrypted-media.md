---
title: "Permissions-Policy: encrypted-media directive"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/permissions-policy/encrypted-media/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Permissions-Policy: encrypted-media directive

The HTTP `Permissions-Policy` header `encrypted-media` directive controls whether the current document is allowed to use the Encrypted Media Extensions API (EME).

Specifically, where a defined policy blocks use of this feature, the `Promise` returned by `Navigator.requestMediaKeySystemAccess()` will reject with a `DOMException` of type `SecurityError`.

## Syntax

```http
Permissions-Policy: encrypted-media=<allowlist>;
```

- `<allowlist>`
    A list of origins for which permission is granted to use the feature. See `Permissions-Policy` > Syntax for more details.

## Default policy

The default allowlist for `encrypted-media` is `self`.

## See also

- `Permissions-Policy` header
- Permissions Policy
