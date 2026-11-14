---
title: "Access-Control-Max-Age header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/access-control-max-age/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Access-Control-Max-Age header

The HTTP **`Access-Control-Max-Age`** response header indicates how long the results of a preflight request (that is, the information contained in the `Access-Control-Allow-Methods` and `Access-Control-Allow-Headers` headers) can be cached.

       | Header type
       | Response header

## Syntax

```http
Access-Control-Max-Age: <delta-seconds>
```

## Directives

- `<delta-seconds>`
    Maximum number of seconds for which the results can be cached as an unsigned non-negative integer.
    Firefox caps this at 24 hours (86400 seconds).
    Chromium (prior to v76) caps at 10 minutes (600 seconds).
    Chromium (starting in v76) caps at 2 hours (7200 seconds).
    The default value is 5 seconds.

## Examples

Cache results of a preflight request for 10 minutes:

```http
Access-Control-Max-Age: 600
```

## See also

- `Access-Control-Allow-Headers`
- `Access-Control-Allow-Methods`
