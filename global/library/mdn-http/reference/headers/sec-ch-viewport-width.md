---
title: "Sec-CH-Viewport-Width header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/sec-ch-viewport-width/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Sec-CH-Viewport-Width header

The HTTP **`Sec-CH-Viewport-Width`** request header is a device client hint which provides the client's layout viewport width in CSS pixels.
The value is rounded up to the smallest following integer (i.e., ceiling value).

The hint can be used with other screen-specific hints to deliver images optimized for a specific screen size, or to omit resources that are not needed for a particular screen width.
If the `Sec-CH-Viewport-Width` header appears more than once in a message the last occurrence is used.

A server has to opt-in to receive the `Sec-CH-Viewport-Width` header from the client, by sending the `Accept-CH` response header.
Servers that opt-in will typically also specify it in the `Vary` header which informs caches that the server may send different responses based on the header value in a request.

       | Header type
       |
        Request header,
        Client hint

       | Forbidden request header
       | No

## Syntax

```http
Sec-CH-Viewport-Width: <number>
```

## Directives

- `<number>`
    The width of the user's viewport in CSS pixels, rounded up to the nearest integer.

## Examples

### Using Sec-CH-Viewport-Width

A server must first opt-in to receive the `Sec-CH-Viewport-Width` header by sending the response header `Accept-CH` containing the directive `Sec-CH-Viewport-Width`.

```http
Accept-CH: Sec-CH-Viewport-Width
```

In subsequent requests, the client might send `Sec-CH-Viewport-Width` header:

```http
Sec-CH-Viewport-Width: 320
```

## See also

- Improving user privacy and developer experience with User-Agent Client Hints (developer.chrome.com)
- Device and responsive image client hints
  - `Sec-CH-Device-Memory`
  - `Sec-CH-DPR`
  - `Sec-CH-Viewport-Height`
  - `Viewport-Width` (deprecated)
- `Accept-CH`
- HTTP Caching: Vary and `Vary` header
