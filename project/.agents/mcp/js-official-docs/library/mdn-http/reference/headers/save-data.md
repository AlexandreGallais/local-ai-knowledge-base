---
title: "Save-Data header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/save-data/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Save-Data header

The HTTP **`Save-Data`** request header is a network client hint which indicates the client's preference for reduced data usage.
This could be for reasons such as high transfer costs, slow connection speeds, etc.

`Save-Data` is a low entropy hint, and hence may be sent by the client even if not requested by the server using an `Accept-CH` response header.
Further, it should be used to reduce data sent to the client irrespective of the values of other client hints that indicate network capability, like `Downlink` and `RTT`.

A value of `On` indicates explicit user opt-in into a reduced data usage mode on the client.
When communicated to origins, this allows them to deliver alternative content to reduce the data downloaded such as smaller image and video resources, different markup and styling, disabled polling and automatic updates, and so on.

> **Note:**
> Disabling HTTP/2 Server Push (Server Push) may reduce data downloads.
> Note that this feature is no longer supported by default in most major browser engines.

       | Header type
       |
        Request header,
        Client hint

       | Forbidden request header
       | No

       |
        CORS-safelisted response header

       | No

## Syntax

```http
Save-Data: <sd-token>
```

## Directives

- `<sd-token>`
    A value indicating whether the client wants to opt in to reduced data usage mode.
    `on` indicates yes, while `off` (the default) indicates no.

## Examples

### Using `Save-Data: on`

The following message requests a resource with `Save-Data` header indicating the client is opting in to reduced data mode:

```http
GET /image.jpg HTTP/1.1
Host: example.com
Save-Data: on
```

The server responds with a `200` response, and the `Vary` header indicates that `Save-Data` may have been used to create the response, and caches should be aware of this header to differentiate responses:

```http
HTTP/1.1 200 OK
Content-Length: 102832
Vary: Accept-Encoding, Save-Data
Cache-Control: public, max-age=31536000
Content-Type: image/jpeg

[…]
```

### Omitting `Save-Data`

In this case, the client requests the same resource without the `Save-Data` header:

```http
GET /image.jpg HTTP/1.1
Host: example.com
```

The server's response provides the full version of the content.
The `Vary` header ensures that responses should be separately cached based on the value of the `Save-Data` header.
This can ensure that the user is not served a lower-quality image from the cache when the `Save-Data` header is no longer present (e.g., after having switched from cellular to Wi-Fi).

```http
HTTP/1.1 200 OK
Content-Length: 481770
Vary: Accept-Encoding, Save-Data
Cache-Control: public, max-age=31536000
Content-Type: image/jpeg

[…]
```

## See also

- CSS `@media` feature `@media/prefers-reduced-data` (experimental)
- `Vary` header which indicates that the content served varies depending on the value of `Save-Data` (see HTTP Caching: Vary)
- `NetworkInformation.saveData`
- Help Your Users `Save-Data` on css-tricks.com
- Delivering Fast and Light Applications with Save-Data - web.dev on web.dev
- Improving user privacy and developer experience with User-Agent Client Hints (developer.chrome.com)
