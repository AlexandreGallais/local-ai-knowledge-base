---
title: "Permissions-Policy: picture-in-picture directive"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/permissions-policy/picture-in-picture/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Permissions-Policy: picture-in-picture directive

The HTTP `Permissions-Policy` header `picture-in-picture` directive controls whether the current document is allowed to play a video in a `Picture-in-Picture` mode.

Specifically, where a defined policy blocks use of this feature, `HTMLVideoElement.requestPictureInPicture()` calls will throw a `DOMException` of type `SecurityError`.

## Syntax

```http
Permissions-Policy: picture-in-picture=<allowlist>;
```

- `<allowlist>`
    A list of origins for which permission is granted to use the feature. See `Permissions-Policy` > Syntax for more details.

## Default policy

The default allowlist for `picture-in-picture` is `*`.

## See also

- `Permissions-Policy` header
- Permissions Policy
