---
title: "Host header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/host/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Host header

The HTTP **`Host`** request header specifies the host and port number of the server to which the request is being sent.

If no port is included, the default port for the service requested is implied (e.g., `443` for an HTTPS URL, and `80` for an HTTP URL).

A `Host` header field must be sent in all HTTP/1.1 request messages.
A `400 Bad Request` status code may be sent to any HTTP/1.1 request message that lacks or contains more than one `Host` header field.

       | Header type
       | Request header

       | Forbidden request header
       | Yes

## Syntax

```http
Host: <host>:<port>
```

## Directives

- `<host>`
    The domain name of the server (for virtual hosting).
- `<port>` (optional)
    TCP port number on which the server is listening.

## Examples

```http
Host: developer.mozilla.org
```

## See also

- `400`
- `<base>`
