---
title: "X-Forwarded-Host header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/x-forwarded-host/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# X-Forwarded-Host header

The HTTP **`X-Forwarded-Host`** (XFH) request header is a de-facto standard header for identifying the original host requested by the client in the `Host` HTTP request header.

Host names and ports of reverse proxies (load balancers, CDNs) may differ from the origin server handling the request, in that case the `X-Forwarded-Host` header is useful to determine which `Host` was originally used.

A standardized version of this header is the HTTP `Forwarded` header, although it's much less frequently used.

       | Header type
       | Request header

       | Forbidden request header
       | No

## Syntax

```http
X-Forwarded-Host: <host>
```

## Directives

- `<host>`
    The domain name of the forwarded server.

## Examples

```http
X-Forwarded-Host: id42.example-cdn.com
```

## Specifications

Not part of any current specification.

## See also

- `X-Forwarded-For`, `X-Forwarded-Proto` headers
- `Host`
- `Forwarded`
