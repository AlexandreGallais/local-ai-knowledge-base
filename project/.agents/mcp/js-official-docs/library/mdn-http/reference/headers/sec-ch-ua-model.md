---
title: "Sec-CH-UA-Model header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/sec-ch-ua-model/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Sec-CH-UA-Model header

The HTTP **`Sec-CH-UA-Model`** request header is a user agent client hint which indicates the device model on which the browser is running.

       | Header type
       |
        Request header,
        Client hint

       | Forbidden request header
       | Yes (`Sec-` prefix)

## Syntax

```http
Sec-CH-UA-Model: <device-version>
```

### Directives

- `<device-version>`
    A string containing the device version. For example "Pixel 3".

## Examples

### Using Sec-CH-UA-Model

A server requests the `Sec-CH-UA-Model` header by including `Accept-CH` in a _response_ to any request from the client, using the name of the desired header as a token:

```http
HTTP/1.1 200 OK
Accept-CH: Sec-CH-UA-Model
```

The client may choose to provide the hint, and add the `Sec-CH-UA-Model` header to subsequent requests.
For example, on mobile phone the client might add the header as shown:

```http
GET /my/page HTTP/1.1
Host: example.site

Sec-CH-UA: " Not A;Brand";v="99", "Chromium";v="96", "Google Chrome";v="96"
Sec-CH-UA-Mobile: ?1
Sec-CH-UA-Platform: "Android"
Sec-CH-UA-Bitness: "64"
Sec-CH-UA-Model: "Pixel 3 XL"
```

## See also

- Client hints
- User-Agent Client Hints API
- `Accept-CH`
- HTTP Caching: Vary and `Vary` header
- Improving user privacy and developer experience with User-Agent Client Hints (developer.chrome.com)
