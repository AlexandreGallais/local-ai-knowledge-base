---
title: "Sec-CH-DPR header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/sec-ch-dpr/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Sec-CH-DPR header

The HTTP **`Sec-CH-DPR`** request header provides device client hints about the client device pixel ratio (DPR).
This ratio is the number of physical device pixels corresponding to every CSS pixel.

The hint is useful when selecting image sources that best correspond to a screen's pixel density.
This is similar to the role played by `x` descriptors in the `` `srcset` attribute to allow user agents to select a preferred image.

If the `Sec-CH-DPR` header appears more than once in a message the last occurrence is used.

Servers that opt in to the `Sec-CH-DPR` client hint will typically also specify it in the `Vary` header to inform caches that the server may send different responses based on the header value in a request.

       | Header type
       |
        Request header,
        Client hint

       | Forbidden request header
       | No

## Syntax

```http
Sec-CH-DPR: <number>
```

## Directives

- `<number>`
    The client device pixel ratio.

## Examples

A server must first opt in to receive the `Sec-CH-DPR` header by sending the response header `Accept-CH` containing the directive `Sec-CH-DPR`.

```http
Accept-CH: Sec-CH-DPR
```

Then on subsequent requests the client might send `Sec-CH-DPR` header to the server:

```http
Sec-CH-DPR: 2.0
```

## See also

- Device and responsive image client hints
  - `Sec-CH-Device-Memory`
  - `Sec-CH-Viewport-Height`
  - `Sec-CH-Viewport-Width`
  - `DPR` (deprecated)
- `Accept-CH`
- HTTP Caching: Vary and `Vary`
- Improving user privacy and developer experience with User-Agent Client Hints (developer.chrome.com)
