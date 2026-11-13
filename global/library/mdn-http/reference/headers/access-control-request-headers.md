---
title: "Access-Control-Request-Headers header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/access-control-request-headers/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Access-Control-Request-Headers header

The HTTP **`Access-Control-Request-Headers`** request header is used by browsers when issuing a preflight request to let the server know which HTTP headers the client might send when the actual request is made (such as with `fetch()` or `XMLHttpRequest.setRequestHeader()`). The complementary server-side header of `Access-Control-Allow-Headers` will answer this browser-side header.

       | Header type
       | Request header

       | Forbidden request header
       | Yes

## Syntax

```http
Access-Control-Request-Headers: <header-name>,<header-name>,…
```

## Directives

- ``
    A sorted list of unique, comma-separated, lowercase HTTP headers that are included in the request.

## Examples

```http
Access-Control-Request-Headers: content-type,x-pingother
```

## See also

- `Access-Control-Request-Method`
