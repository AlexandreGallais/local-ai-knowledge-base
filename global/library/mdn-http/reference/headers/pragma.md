---
title: "Pragma header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/pragma/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Pragma header

The HTTP **`Pragma`** header is an implementation-specific header that may have various effects along the request-response chain.
This header serves for backwards compatibility with HTTP/1.0 caches that do not support the `Cache-Control` HTTP/1.1 header.

> **Note:**
> The `Pragma` header is not specified for HTTP responses and is therefore not a reliable replacement for the HTTP/1.1 `Cache-Control` header, although its behavior is the same as `Cache-Control: no-cache` if the `Cache-Control` header field is omitted in a request.
> Use `Pragma` only for backwards compatibility with HTTP/1.0 clients.

       | Header type
       |
        Request header,
        Response header (response behavior is not specified and is implementation-specific).

       | Forbidden request header
       | No

       |
        CORS-safelisted response header

       | Yes

## Syntax

```http
Pragma: no-cache
```

## Directives

- `no-cache`
    Same as `Cache-Control: no-cache`. Forces caches to submit the request to the origin server for validation before a cached copy is released.

## Examples

```http
Pragma: no-cache
```

## See also

- `Cache-Control`
- `Expires`
