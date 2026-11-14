---
title: "Sec-CH-UA-Full-Version header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/sec-ch-ua-full-version/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Sec-CH-UA-Full-Version header

> **Note:**
> This is being replaced by the `Sec-CH-UA-Full-Version-List`.

The HTTP **`Sec-CH-UA-Full-Version`** request header is a user agent client hint which provides the user-agent's full version string.

       | Header type
       |
        Request header,
        Client hint

       | Forbidden request header
       | Yes (`Sec-` prefix)

## Syntax

```http
Sec-CH-UA-Full-Version: <version>
```

### Directives

- `<version>`
    A string containing the full version number, like "96.0.4664.93".

## Examples

### Using Sec-CH-UA-Full-Version

A server requests the `Sec-CH-UA-Full-Version` header by including the `Accept-CH` in a _response_ to any request from the client, using the name of the desired header as a token:

```http
HTTP/1.1 200 OK
Accept-CH: Sec-CH-UA-Full-Version
```

The client may choose to provide the hint, and add the `Sec-CH-UA-Full-Version` header to subsequent requests.
For example, the client might add the header as shown:

```http
GET /my/page HTTP/1.1
Host: example.site

Sec-CH-UA: " Not A;Brand";v="99", "Chromium";v="96", "Google Chrome";v="96"
Sec-CH-UA-Mobile: ?0
Sec-CH-UA-Full-Version: "96.0.4664.110"
Sec-CH-UA-Platform: "Windows"
```

## See also

- Client hints
- User-Agent Client Hints API
- `Accept-CH`
- HTTP Caching: Vary and `Vary` header
- Improving user privacy and developer experience with User-Agent Client Hints (developer.chrome.com)
