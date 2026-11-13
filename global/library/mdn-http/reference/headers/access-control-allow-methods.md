---
title: "Access-Control-Allow-Methods header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/access-control-allow-methods/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Access-Control-Allow-Methods header

The HTTP **`Access-Control-Allow-Methods`** response header specifies one or more HTTP request methods allowed when accessing a resource in response to a preflight request.

       | Header type
       | Response header

## Syntax

```http
Access-Control-Allow-Methods: <method>, <method>, …
Access-Control-Allow-Methods: *
```

## Directives

- `<method>`
    A comma-separated list of the allowed request methods. `GET`, `HEAD`, and `POST` are always allowed, regardless of whether they are specified in this header, as they are defined as CORS-safelisted methods.
- `*` (wildcard)
    All HTTP methods.
    It has this meaning only for requests without credentials (requests without HTTP cookies or HTTP authentication information). In requests with credentials, it is
    treated as the literal method name `*` without special semantics.

## Examples

```http
Access-Control-Allow-Methods: PUT, DELETE
Access-Control-Allow-Methods: *
```

## See also

- `Access-Control-Allow-Origin`
- `Access-Control-Expose-Headers`
- `Access-Control-Allow-Headers`
- `Access-Control-Request-Method`
- HTTP request methods
