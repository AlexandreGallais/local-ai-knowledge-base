---
title: "Alt-Used header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/alt-used/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Alt-Used header

The HTTP **`Alt-Used`** request header is used to identify the alternative service in use, just as the `Host` HTTP header field identifies the host and port of the origin.

The is intended to allow alternative services to detect loops, differentiate traffic for purposes of load balancing, and generally to ensure that it is possible to identify the intended destination of traffic, since introducing this information after a protocol is in use has proven to be problematic.

When a client uses an alternative service for a request, it can indicate this to the server using the `Alt-Used` HTTP header.

       | Header type
       | Request header

       | Forbidden request header
       | No

## Syntax

```http
Alt-Used: <host>:<port>
```

## Directives

- `<host>`
    The domain name of the server.
- `<port>` (optional)
    The TCP port number on which the server is listening.

## Examples

```http
Alt-Used: alternate.example.net
```

## See also

- `Alt-Svc`
- `Host`
