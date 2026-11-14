---
title: "Permissions-Policy: aria-notify directive"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/permissions-policy/aria-notify/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Permissions-Policy: aria-notify directive

The HTTP `Permissions-Policy` header `aria-notify` directive controls whether the current document is allowed to use the `Document.ariaNotify()` and `Element.ariaNotify()` methods to fire screen reader announcements.

Specifically, where a defined policy blocks usage, any announcements created using `ariaNotify()` silently fail (they will not be sent).

## Syntax

```http
Permissions-Policy: aria-notify=<allowlist>;
```

- `<allowlist>`
    A list of origins for which permission is granted to use the feature. See `Permissions-Policy` > Syntax for more details.

## Default policy

The default allowlist for `aria-notify` is `self`.

## See also

- `Permissions-Policy` header
- Permissions Policy
- `Document.ariaNotify()`, `Element.ariaNotify()`
