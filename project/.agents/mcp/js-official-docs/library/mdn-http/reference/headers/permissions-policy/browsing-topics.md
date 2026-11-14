---
title: "Permissions-Policy: browsing-topics directive"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/permissions-policy/browsing-topics/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Permissions-Policy: browsing-topics directive

The HTTP `Permissions-Policy` header `browsing-topics` directive controls access to the Topics API.

Where a policy specifically disallows the use of the Topics API, any attempts to call the `Document.browsingTopics()` method or send a request with a `Sec-Browsing-Topics` header will fail with a `NotAllowedError` `DOMException`.

## Syntax

```http
Permissions-Policy: browsing-topics=<allowlist>;
```

- `<allowlist>`
    A list of origins for which permission is granted to use the feature. See `Permissions-Policy` > Syntax for more details.

## Default policy

The default allowlist for `browsing-topics` is `*`.

## Specifications

This feature is not part of an official standard, although it is specified in the Topics API Unofficial Proposal Draft.

## See also

- `Permissions-Policy` header
- Permissions Policy
- Topics API
- `Document.browsingTopics()`
