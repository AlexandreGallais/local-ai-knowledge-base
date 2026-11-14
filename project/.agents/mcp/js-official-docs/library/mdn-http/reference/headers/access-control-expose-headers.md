---
title: "Access-Control-Expose-Headers header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/access-control-expose-headers/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Access-Control-Expose-Headers header

The HTTP **`Access-Control-Expose-Headers`** response header allows a server to indicate which response headers should be made available to scripts running in the browser in response to a cross-origin request.

Only the CORS-safelisted response headers are exposed by default. For clients to be able to access other headers, the server must list them using the `Access-Control-Expose-Headers` header.

       | Header type
       | Response header

       | Forbidden request header
       | No

## Syntax

```http
Access-Control-Expose-Headers: [<header-name>[, <header-name>]*]
Access-Control-Expose-Headers: *
```

## Directives

- ``
    A list of zero or more comma-separated header names that clients are allowed to access from a response.
    These are _in addition_ to the CORS-safelisted response headers.
- `*` (wildcard)
    Any header.
    The value `*` only counts as a special wildcard value for requests without credentials (requests without HTTP cookies or HTTP authentication information).
    In requests with credentials, it is treated as the literal header name `*`.

## Examples

The CORS-safelisted response headers are: `Cache-Control`, `Content-Language`, `Content-Length`, `Content-Type`, `Expires`, `Last-Modified`, `Pragma`. To expose a non-CORS-safelisted response header, you can specify:

```http
Access-Control-Expose-Headers: Content-Encoding
```

To additionally expose a custom header, like `Kuma-Revision`, you can specify multiple headers separated by a comma:

```http
Access-Control-Expose-Headers: Content-Encoding, Kuma-Revision
```

For requests without credentials, a server can also respond with a wildcard value:

```http
Access-Control-Expose-Headers: *
```

A server can also respond with the `*` value for requests with credentials, but in this case it would refer to a header named `*`.

## See also

- `Access-Control-Allow-Headers`
- `Access-Control-Allow-Origin`
