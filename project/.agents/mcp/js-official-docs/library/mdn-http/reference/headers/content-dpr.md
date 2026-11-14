---
title: "Content-DPR header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/content-dpr/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Content-DPR header

The HTTP **`Content-DPR`** response header is used to confirm the _image_ device to pixel ratio (DPR) in requests where the screen `DPR` client hint was used to select an image resource.

> **Note:**
> The `Content-DPR` header was removed from the client hints specification in draft-ietf-httpbis-client-hints-07.
> The Responsive Image Client Hints specification proposes to replace this header by specifying intrinsic resolution/dimensions in EXIF metadata.

If the `DPR` client hint is used to select an image, the server must specify `Content-DPR` in the response.
If the value in `Content-DPR` is different from the `DPR` value in the request (i.e., image DPR is not the same as screen DPR), the client must use the `Content-DPR` for determining intrinsic image size and scaling the image.

If the `Content-DPR` header appears more than once in a message, the last occurrence is used.

       | Header type
       |
        Response header,
        Client hint

       | Forbidden request header
       | No

       |
        CORS-safelisted response header

       | No

## Syntax

```http
Content-DPR: <number>
```

## Directives

- `<number>`
    The image device pixel ratio, calculated according to the following formula:
    Content-DPR = _Selected image resource size_ / (_Width_ / _DPR_)

## Examples

See the `DPR` header example.

## See also

- Device and responsive image client hints
  - `Sec-CH-Device-Memory`
  - `Sec-CH-DPR`
  - `Sec-CH-Viewport-Height`
  - `Sec-CH-Viewport-Width`
- `Accept-CH`
- HTTP Caching: Vary and `Vary`
- Improving user privacy and developer experience with User-Agent Client Hints on developer.chrome.com (2020)
