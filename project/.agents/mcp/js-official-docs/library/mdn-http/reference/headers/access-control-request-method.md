---
title: "Access-Control-Request-Method header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/access-control-request-method/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Access-Control-Request-Method header

The HTTP **`Access-Control-Request-Method`** request header is used by browsers when issuing a preflight request to let the server know which HTTP method will be used when the actual request is made.
This header is necessary because the preflight request is always an `OPTIONS` and doesn't use the same method as the actual request.

       | Header type
       | Request header

       | Forbidden request header
       | Yes

## Syntax

```http
Access-Control-Request-Method: <method>
```

## Directives

- `<method>`
    An HTTP request method; for example, `GET`, `POST`, or `DELETE`.

## Examples

```http
Access-Control-Request-Method: POST
```

## See also

- `Access-Control-Request-Headers`
