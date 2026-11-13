---
title: "Sec-CH-Prefers-Reduced-Transparency header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/sec-ch-prefers-reduced-transparency/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Sec-CH-Prefers-Reduced-Transparency header

The HTTP **`Sec-CH-Prefers-Reduced-Transparency`** request header is a user agent client hint that indicates the user agent's preference for reduced transparency.

If a server signals to a client via the `Accept-CH` header that it accepts `Sec-CH-Prefers-Reduced-Transparency`, the client can then respond with this header to indicate the user's preference for reduced transparency. The server can send the client appropriately adapted content — for example, CSS or images — to reduce the transparency of the content.

This header is modeled on the `prefers-reduced-transparency` media query.

       | Header type
       |
        Request header,
        Client hint

       | Forbidden request header
       | Yes (`Sec-` prefix)

## Syntax

```http
Sec-CH-Prefers-Reduced-Transparency: <preference>
```

### Directives

- `<preference>`
    The user agent's preference for reduced transparency. This is often taken from the underlying operating system's setting. The value of this directive can be either `no-preference` or `reduce`.

## Examples

### Using Sec-CH-Prefers-Reduced-Transparency

The client makes an initial request to the server:

```http
GET / HTTP/1.1
Host: example.com
```

The server responds, telling the client via `Accept-CH` that it accepts `Sec-CH-Prefers-Reduced-Transparency`. In this example `Critical-CH` is also used, indicating that `Sec-CH-Prefers-Reduced-Transparency` is considered a critical client hint.

```http
HTTP/1.1 200 OK
Content-Type: text/html
Accept-CH: Sec-CH-Prefers-Reduced-Transparency
Vary: Sec-CH-Prefers-Reduced-Transparency
Critical-CH: Sec-CH-Prefers-Reduced-Transparency
```

> **Note:**
> We've also specified `Sec-CH-Prefers-Reduced-Transparency` in the `Vary` header, to indicate to the browser that the served content will differ based on this header value — even if the URL stays the same — so the browser shouldn't just use an existing cached response and instead should cache this response separately. Each header listed in the `Critical-CH` header should also be present in the `Accept-CH` and `Vary` headers.

The client automatically retries the request (due to `Critical-CH` being specified above), telling the server via `Sec-CH-Prefers-Reduced-Transparency` that it has a user preference for reduced transparency:

```http
GET / HTTP/1.1
Host: example.com
Sec-CH-Prefers-Reduced-Transparency: "reduce"
```

The client will include the header in subsequent requests in the current session unless the `Accept-CH` changes in responses to indicate that it is no longer supported by the server.

## See also

- Client hints
- User-Agent Client Hints API
- `Accept-CH`
- HTTP Caching: Vary and the `Vary` header
- Improving user privacy and developer experience with User-Agent Client Hints (developer.chrome.com)
