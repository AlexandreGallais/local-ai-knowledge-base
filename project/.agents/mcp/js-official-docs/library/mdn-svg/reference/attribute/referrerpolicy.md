---
title: "referrerpolicy"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/attribute/referrerpolicy/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# referrerpolicy

The **`referrerpolicy`** attribute indicates which referrer information to send when fetching resources or navigating using an SVG `` element's link. You can use this attribute with the following SVG elements:

- ``

## Example

```html
<svg viewBox="0 0 150 20" xmlns="http://www.w3.org/2000/svg">
  <a href="https://example.com" referrerpolicy="origin">
    <text x="5" y="15">Website</text>
  </a>
</svg>
```

## Usage notes

       | Value
       |
        `no-referrer` | `no-referrer-when-downgrade` |
        `origin` | `origin-when-cross-origin` |
        `same-origin` | `strict-origin` |
        `strict-origin-when-cross-origin` | `unsafe-url`

       | Default value
       | `strict-origin-when-cross-origin`

       | Animatable
       | No

- `no-referrer`
    The `Referer` header will not be sent.
- `no-referrer-when-downgrade`
    Sends the full URL (origin, path, and query string) when the protocol security level is the same or better (HTTP→HTTP, HTTP→HTTPS, HTTPS→HTTPS), but sends no header to a less secure destination (HTTPS→HTTP).
- `origin`
    The `Referer` header will only send the origin of the URL. For example, a document at `https://example.com/page.html` will send `https://example.com/` as the referrer.
- `origin-when-cross-origin`
    Sends the full URL when performing a same-origin request, but only sends the origin for cross-origin requests, and sends no header to a less secure destination (HTTPS→HTTP).
- `same-origin`
    Only sends the full URL to a same-origin request, but sends no header for cross-origin requests.
- `strict-origin`
    Sends only the origin when the protocol security level stays the same, but sends no header to a less secure destination.
- `strict-origin-when-cross-origin`
    Default value. Sends the full URL when performing a same-origin request, but only sends the origin for cross-origin requests, and sends no `Referer` header to a less secure destination.
- `unsafe-url`
    Sends the full URL when performing any task regardless of security.
    > **Warning:**
    > This policy will potentially leak private information when navigating from HTTPS to HTTP.

## See also

- `href`
- `Referrer-Policy` header
- `SVGAElement.referrerPolicy`
