---
title: "Permissions-Policy: summarizer directive"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/permissions-policy/summarizer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Permissions-Policy: summarizer directive

The HTTP `Permissions-Policy` header `summarizer` directive controls access to the Summarizer API.

Specifically, where a defined policy blocks Summarizer API usage, the `Summarizer.availability()` static method will return `unavailable`, and any attempts to call the API's other methods will fail with a `NotAllowedError` `DOMException`.

## Syntax

```http
Permissions-Policy: summarizer=<allowlist>;
```

- `<allowlist>`
    A list of origins for which permission is granted to use the feature. See `Permissions-Policy` > Syntax for more details.

## Default policy

The default allowlist for `summarizer` is `self`.

## See also

- `Permissions-Policy` header
- Permissions Policy
