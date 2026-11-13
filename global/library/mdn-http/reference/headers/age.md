---
title: "Age header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/age/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Age header

The HTTP **`Age`** response header indicates the time in seconds for which an object was in a proxy cache.

The header value is usually close to zero.
If the value is `0`, the object was probably fetched from the origin server; otherwise, the value is usually calculated as a difference between the proxy's current date and the `Date` general header included in the HTTP response.

       | Header type
       | Response header

## Syntax

```http
Age: <delta-seconds>
```

## Directives

- `<delta-seconds>`
    A non-negative integer that represents the time in seconds for which the object was in a proxy cache.

## Examples

```http
Age: 24
```

## See also

- `Cache-Control`
- `Expires`
