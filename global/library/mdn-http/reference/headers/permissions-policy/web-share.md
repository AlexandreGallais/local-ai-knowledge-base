---
title: "Permissions-Policy: web-share directive"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/permissions-policy/web-share/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Permissions-Policy: web-share directive

The HTTP `Permissions-Policy` header `web-share` directive controls whether the current document is allowed to use the `Navigator.share()` method of the Web Share API to share text, links, images, and other content to arbitrary destinations of the user's choice.

Specifically, where a defined policy blocks usage of this feature, `Navigator.share()` calls will return a `Promise` that rejects with a `DOMException` of type `NotAllowedError`.

## Syntax

```http
Permissions-Policy: web-share=<allowlist>;
```

- `<allowlist>`
    A list of origins for which permission is granted to use the feature. See `Permissions-Policy` > Syntax for more details.

## Default policy

The default allowlist for `web-share` is `self`.

## See also

- `Permissions-Policy` header
- Permissions Policy
