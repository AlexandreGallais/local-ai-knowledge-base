---
title: "Sec-CH-UA-Bitness header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/sec-ch-ua-bitness/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Sec-CH-UA-Bitness header

The HTTP **`Sec-CH-UA-Bitness`** request header is a user agent client hint which provides the "bitness" of the user-agent's underlying CPU architecture.
This is the size in bits of an integer or memory address—typically 64 or 32 bits.

This might be used by a server, for example, to select and offer the correct binary format of an executable for a user to download.

       | Header type
       |
        Request header,
        Client hint

       | Forbidden request header
       | Yes (`Sec-` prefix)

## Syntax

```http
Sec-CH-UA-Bitness: <bitness>
```

## Directives

- `<bitness>`
    A string indicating the underlying platform architecture bitness, such as: `"64"`, `"32"`.

## Examples

### Using Sec-CH-UA-Bitness

A server requests the `Sec-CH-UA-Bitness` header by including `Accept-CH` in a _response_ to any request from the client, using the name of the desired header as a token:

```http
HTTP/1.1 200 OK
Accept-CH: Sec-CH-UA-Bitness
```

The client may choose to provide the hint, and add the `Sec-CH-UA-Bitness` header to subsequent requests.
For example, on a Windows based 64-bit computer, the client might add the header as shown:

```http
GET /my/page HTTP/1.1
Host: example.site

Sec-CH-UA: " Not A;Brand";v="99", "Chromium";v="96", "Google Chrome";v="96"
Sec-CH-UA-Mobile: ?0
Sec-CH-UA-Platform: "Windows"
Sec-CH-UA-Bitness: "64"
```

## See also

- Client hints
- User-Agent Client Hints API
- `Accept-CH`
- HTTP Caching: Vary and `Vary` header
- Improving user privacy and developer experience with User-Agent Client Hints (developer.chrome.com)
