---
title: "Service-Worker header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/service-worker/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Service-Worker header

The HTTP **`Service-Worker`** request header is included in fetches for a service worker's script resource.
This header helps administrators log service worker script requests for monitoring purposes.

       | Header type
       | Request header

       | Forbidden request header
       | No

## Syntax

```http
Service-Worker: script
```

## Directives

- `script`
    A value indicating that this is a script.
    This is the only allowed directive for this header.

## See also

- `Service-Worker-Allowed` header
- Service worker API
