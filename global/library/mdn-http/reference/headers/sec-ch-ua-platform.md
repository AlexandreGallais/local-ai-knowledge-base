---
title: "Sec-CH-UA-Platform header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/sec-ch-ua-platform/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Sec-CH-UA-Platform header

The HTTP **`Sec-CH-UA-Platform`** request header is a user agent client hint which provides the platform or operating system on which the user agent is running.
For example: "Windows" or "Android".

`Sec-CH-UA-Platform` is a low entropy hint.
Unless blocked by a user agent permission policy, it is sent by default (without the server opting in by sending `Accept-CH`).

       | Header type
       |
        Request header,
        Client hint

       | Forbidden request header
       | Yes (`Sec-` prefix)

## Syntax

```http
Sec-CH-UA-Platform: <platform>
```

### Directives

- `<platform>`
    One of the following strings: `"Android"`, `"Chrome OS"`, `"Chromium OS"`, `"iOS"`, `"Linux"`, `"macOS"`, `"Windows"`, or `"Unknown"`.

## Examples

### Using Sec-CH-UA-Platform

As `Sec-CH-UA-Platform` is a low entropy hint it is typically sent in all requests.
A browser running on a macOS computer might add the following header to all requests.

```http
Sec-CH-UA-Platform: "macOS"
```

## See also

- Client hints
- User-Agent Client Hints API
- `Accept-CH`
- HTTP Caching: Vary and `Vary` header
- Improving user privacy and developer experience with User-Agent Client Hints (developer.chrome.com)
