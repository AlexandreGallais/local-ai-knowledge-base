---
title: "X-Powered-By header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/x-powered-by/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# X-Powered-By header

The HTTP **`X-Powered-By`** response header is a non-standard header for identifying the application or framework that generated the response.

       | Header type
       | Response header

       | Forbidden response header name
       | No

## Syntax

```http
X-Powered-By: <application>
```

## Directives

- `<application>`
    A string describing the server application or framework.

## Examples

### Express X-Powered-By header

Express applications will usually include the `X-Powered-By` header in responses with the string `express` as the field value:

```http
X-Powered-By: express
```

## Specifications

Not part of any current specification.

## See also

- `X-Forwarded-Host`, `X-Forwarded-For`, `X-Forwarded-Proto` headers
- `Via`
- `Forwarded`
