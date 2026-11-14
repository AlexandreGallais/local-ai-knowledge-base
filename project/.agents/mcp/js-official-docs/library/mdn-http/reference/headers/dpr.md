---
title: "DPR header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/dpr/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DPR header

> **Warning:**
> The `DPR` header was standardized as `Sec-CH-DPR` and the new name is now preferred.

The HTTP **`DPR`** request header provides device client hints about the client device pixel ratio (DPR).
This ratio is the number of physical device pixels corresponding to every CSS pixel.

The hint is useful when selecting image sources that best correspond to a screen's pixel density.
This is similar to the role played by `x` descriptors in the `` `srcset` attribute to allow user agents to select a preferred image.

If a server uses the `DPR` hint to choose which resource is sent in a response, the response must include the `Content-DPR` header.
The client must use the value in `Content-DPR` for layout if it differs from the value in the request's `DPR` header.

If the `DPR` header appears more than once in a message the last occurrence is used.

Servers that opt in to the `DPR` client hint will typically also specify it in the `Vary` header to inform caches that the server may send different responses based on the header value in a request.

       | Header type
       |
        Request header,
        Client hint

       | Forbidden request header
       | No

## Syntax

```http
DPR: <number>
```

## Directives

- `<number>`
    The client device pixel ratio.

## Examples

A server must first opt in to receive the `DPR` header by sending the response header `Accept-CH` containing the directive `DPR`.

```http
Accept-CH: DPR
```

Then on subsequent requests the client might send `DPR` header to the server:

```http
DPR: 2.0
```

If a request with the `DPR` header (as shown above) is for an image resource, then the server response must include the `Content-DPR` header:

```http
Content-DPR: 2.0
```

## See also

- Device and responsive image client hints
  - `Sec-CH-DPR`
  - `Sec-CH-Device-Memory`
  - `Sec-CH-Viewport-Height`
  - `Sec-CH-Viewport-Width`
  - `Sec-CH-Width`
  - `Content-DPR` (deprecated)
  - `Device-Memory` (deprecated)
  - `Viewport-Width` (deprecated)
  - `Width` (deprecated)
- `Accept-CH`
- HTTP Caching: Vary and `Vary`
- Improving user privacy and developer experience with User-Agent Client Hints (developer.chrome.com)
