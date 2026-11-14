---
title: "Sec-CH-Width header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/sec-ch-width/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Sec-CH-Width header

The HTTP **`Sec-CH-Width`** request header is a device client hint which indicates the desired resource width in physical pixels — the intrinsic size of an image. The provided pixel value is a number rounded to the smallest following integer (i.e., ceiling value).

The hint is only sent on image requests.

The hint allows the client to request a resource that is optimal for both the screen and the layout: taking into account both the density-corrected width of the screen and the image's extrinsic size within the layout.

If the desired resource width is not known at the time of the request or the resource does not have a display width, the `Sec-CH-Width` header field can be omitted.
If the `Sec-CH-Width` header appears more than once in a message the last occurrence is used.

       | Header type
       |
        Request header,
        Client hint

       | Forbidden request header
       | No

## Syntax

```http
Width: <number>
```

## Directives

- `<number>`
    The width of the resource in physical pixels, rounded up to the nearest integer.

## Examples

The server first needs to opt in to receive the `Sec-CH-Width` header by sending the response headers `Accept-CH` containing `Sec-CH-Width`.

```http
Accept-CH: Sec-CH-Width
```

Then on subsequent image requests the client might send `Sec-CH-Width` header back:

```http
Width: 1920
```

## See also

- Device and responsive image client hints
  - `Width` (deprecated)
  - `Sec-CH-Viewport-Width`
  - `Sec-CH-Viewport-Height`
  - `Sec-CH-Device-Memory`
  - `Sec-CH-DPR`
- `Accept-CH`
- HTTP Caching: Vary and `Vary` header
- Improving user privacy and developer experience with User-Agent Client Hints (developer.chrome.com)
