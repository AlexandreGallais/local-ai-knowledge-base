---
title: "Permissions-Policy: local-fonts directive"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/permissions-policy/local-fonts/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Permissions-Policy: local-fonts directive

The HTTP `Permissions-Policy` header `local-fonts` directive controls whether the current document is allowed to gather data on the user's locally-installed fonts via the `Window.queryLocalFonts()` method.

Specifically, where a defined policy blocks use of this feature, `Promise`s returned by `Window.queryLocalFonts()` will reject with a `DOMException` of type `SecurityError`.

## Syntax

```http
Permissions-Policy: local-fonts=<allowlist>;
```

- `<allowlist>`
    A list of origins for which permission is granted to use the feature. See `Permissions-Policy` > Syntax for more details.

## Default policy

The default allowlist for `local-fonts` is `self`.

## See also

- `Local Font Access API`
- `Permissions-Policy` header
- Permissions Policy
