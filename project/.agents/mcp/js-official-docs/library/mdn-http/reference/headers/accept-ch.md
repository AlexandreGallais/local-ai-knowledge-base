---
title: "Accept-CH header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/accept-ch/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Accept-CH header

The HTTP **`Accept-CH`** response header may be set by a server to specify which client hint headers should be included by the client in subsequent requests.
To ensure client hints are sent reliably, the `Accept-CH` header should be persisted for all secure requests.

       | Header type
       | Response header

       |
        CORS-safelisted response header

       | No

## Syntax

```http
Accept-CH: <client-hints-headers>

// Client hint headers in a comma-separated list
Accept-CH: <ch-header-one>, <ch-header-two>
```

## Examples

### Client hint response headers

The following response headers indicate that the server accepts `Sec-CH-Viewport-Width` and `Sec-CH-Width` device client hints in subsequent requests.
The `Vary` header indicates which values were used to vary the response based on the accepted client hints.

```http
Accept-CH: Sec-CH-Viewport-Width, Sec-CH-Width
Vary: Sec-CH-Viewport-Width, Sec-CH-Width
```

## See also

- `Vary`
