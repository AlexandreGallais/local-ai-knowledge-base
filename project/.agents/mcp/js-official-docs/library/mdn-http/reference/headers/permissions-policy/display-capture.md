---
title: "Permissions-Policy: display-capture directive"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/permissions-policy/display-capture/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Permissions-Policy: display-capture directive

The HTTP `Permissions-Policy` header `display-capture` directive controls whether or not the document is permitted to use Screen Capture API, that is, `getDisplayMedia()` to capture the screen's contents.

If `display-capture` is disabled in a document, the document will not be able to initiate screen capture via `getDisplayMedia()` and will throw a `NotAllowedError` exception.

## Syntax

```http
Permissions-Policy: display-capture=<allowlist>;
```

- `<allowlist>`
    A list of origins for which permission is granted to use the feature. See `Permissions-Policy` > Syntax for more details.

## Default policy

The default allowlist for `display-capture` is `self`.

## See also

- `Permissions-Policy` header
- Permissions Policy
- Screen Capture API
- Using the Screen Capture API
