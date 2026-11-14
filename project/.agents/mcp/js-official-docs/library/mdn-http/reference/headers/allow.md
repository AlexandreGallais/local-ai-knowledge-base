---
title: "Allow header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/allow/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Allow header

The HTTP **`Allow`** response header lists the set of request methods supported by a resource.
This header must be sent if the server responds with a `405 Method Not Allowed` status code to indicate which request methods can be used instead.
An empty `Allow` value indicates that the resource allows no request methods, which might occur temporarily for a given resource.

       | Header type
       | Response header

## Syntax

```http
Allow: <http-methods>
```

## Directives

- `<http-methods>`
    A comma-separated list of allowed request methods supported by a resource.

## Examples

```http
Allow: GET, POST, HEAD
```

## See also

- `405 Method Not Allowed` status code
- `Server`
- `OPTIONS`
