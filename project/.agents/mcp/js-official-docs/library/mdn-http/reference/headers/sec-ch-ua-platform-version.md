---
title: "Sec-CH-UA-Platform-Version header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/sec-ch-ua-platform-version/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Sec-CH-UA-Platform-Version header

The HTTP **`Sec-CH-UA-Platform-Version`** request header is a user agent client hint which provides the version of the operating system on which the user agent is running.

       | Header type
       |
        Request header,
        Client hint

       | Forbidden request header
       | Yes (`Sec-` prefix)

## Syntax

```http
Sec-CH-UA-Platform-Version: <version>
```

### Directives

- `<version>`
    The version string typically contains the operating system version in a string, consisting of dot-separated major, minor and patch version numbers, for example `"11.0.0"`.
    The version string on Linux is always empty.

## Examples

### Using Sec-CH-UA-Platform-Version

A server requests the `Sec-CH-UA-Platform-Version` header by including the `Accept-CH` in a _response_ to any request from the client, using the name of the desired header as a token:

```http
HTTP/1.1 200 OK
Accept-CH: Sec-CH-UA-Platform-Version
```

The client may choose to provide the hint, and add the `Sec-CH-UA-Platform-Version` header to subsequent requests.
For example, the following request headers might be sent from a browser running on Windows 10.

```http
GET /my/page HTTP/1.1
Host: example.site

Sec-CH-UA: " Not A;Brand";v="99", "Chromium";v="96", "Google Chrome";v="96"
Sec-CH-UA-Mobile: ?0
Sec-CH-UA-Platform: "Windows"
Sec-CH-UA-Platform-Version: "10.0.0"
```

## See also

- Client hints
- User-Agent Client Hints API
- `Accept-CH`
- HTTP Caching: Vary and `Vary` header
- Improving user privacy and developer experience with User-Agent Client Hints (developer.chrome.com)
