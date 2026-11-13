---
title: "Permissions-Policy: translator directive"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/permissions-policy/translator/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Permissions-Policy: translator directive

The HTTP `Permissions-Policy` header `translator` directive controls access to the translation functionality of the Translator and Language Detector APIs.

Specifically, where a defined policy blocks usage, the `Translator.availability()` static method will return `unavailable`, and any attempts to call the API's other methods will fail with a `NotAllowedError` `DOMException`.

## Syntax

```http
Permissions-Policy: translator=<allowlist>;
```

- `<allowlist>`
    A list of origins for which permission is granted to use the feature. See `Permissions-Policy` > Syntax for more details.

## Default policy

The default allowlist for `translator` is `self`.

## See also

- `Permissions-Policy` header
- Permissions Policy
