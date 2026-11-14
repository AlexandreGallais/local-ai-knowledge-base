---
title: "Via header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/via/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Via header

The **`Via`** request and response header is added by proxies, both forward and reverse.
It is used for tracking message forwards, avoiding request loops, and identifying the protocol capabilities of senders along the request/response chain.

       | Header type
       |
        Request header,
        Response header

       | Forbidden request header
       | Yes

## Syntax

```http
Via: [<protocol-name>/]<protocol-version> <host>[:<port>]
Via: [<protocol-name>/]<protocol-version> <pseudonym>
```

## Directives

- `<protocol-name>` (optional)
    The name of the protocol used, such as "HTTP".
- `<protocol-version>`
    The version of the protocol used, such as "1.1".
- `<host>`
    Public proxy URL and optional `<port>`.
    If a host is not provided, then a `<pseudonym>` must be used.
- `<pseudonym>`
    Name/alias of an internal proxy.
    If a pseudonym is not provided, then a `<host>` must be used.

## Examples

```http
Via: 1.1 vegur
Via: HTTP/1.1 GWA
Via: 1.0 fred, 1.1 p.example.net
```

## See also

- `X-Forwarded-For`
- Heroku's proxy library Vegur
