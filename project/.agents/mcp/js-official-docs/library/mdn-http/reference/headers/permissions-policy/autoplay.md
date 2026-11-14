---
title: "Permissions-Policy: autoplay directive"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/permissions-policy/autoplay/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Permissions-Policy: autoplay directive

The HTTP `Permissions-Policy` header
`autoplay` directive controls whether the current document is allowed to
autoplay media requested through the `HTMLMediaElement` interface.

Specifically, where a defined policy blocks use of this feature and there were no user gestures, the `Promise`
returned by `HTMLMediaElement.play()` will reject with
a `DOMException`. The `autoplay` attribute on
`<audio>` and `` elements will be ignored.

> **Note:**
> For more details on autoplay and autoplay blocking, see the article Autoplay guide for media and Web Audio APIs.

## Syntax

```http
Permissions-Policy: autoplay=<allowlist>;
```

- `<allowlist>`
    A list of origins for which permission is granted to use the feature. See `Permissions-Policy` > Syntax for more details.

## Default policy

The default allowlist for `autoplay` is `self`.

## See also

- `Permissions-Policy` header
- Permissions Policy
