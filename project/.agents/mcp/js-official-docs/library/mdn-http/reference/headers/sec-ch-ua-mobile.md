---
title: "Sec-CH-UA-Mobile header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/sec-ch-ua-mobile/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Sec-CH-UA-Mobile header

The HTTP **`Sec-CH-UA-Mobile`** request header is a user agent client hint which indicates whether the browser is on a mobile device.
It can also be used by a desktop browser to indicate a preference for a "mobile" user experience.

`Sec-CH-UA-Mobile` is a low entropy hint.
Unless blocked by a user agent permission policy, it is sent by default, without the server opting in by sending `Accept-CH`.

       | Header type
       |
        Request header,
        Client hint

       | Forbidden request header
       | Yes (`Sec-` prefix)

## Syntax

```http
Sec-CH-UA-Mobile: <boolean>
```

### Directives

- `<boolean>`
    `?1` indicates that the user-agent prefers a mobile experience (true).
    `?0` indicates that user-agent does not prefer a mobile experience (false).

## Examples

### Using Sec-CH-UA-Mobile

As `Sec-CH-UA-Mobile` is a low entropy hint it is typically sent in all requests.
A desktop browser would usually send requests with the following header:

```http
Sec-CH-UA-Mobile: ?0
```

A browser on a mobile device would usually send requests with the following header:

```http
Sec-CH-UA-Mobile: ?1
```

## See also

- Client hints
- User-Agent Client Hints API
- `Accept-CH`
- HTTP Caching: Vary and `Vary` header
- Improving user privacy and developer experience with User-Agent Client Hints (developer.chrome.com)
