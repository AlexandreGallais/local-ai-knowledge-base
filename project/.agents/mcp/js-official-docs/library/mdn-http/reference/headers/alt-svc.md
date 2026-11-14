---
title: "Alt-Svc header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/alt-svc/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Alt-Svc header

The HTTP **`Alt-Svc`** response header lets a server indicate that another network location (the "alternative service") can be treated as authoritative for that origin when making future requests.

Doing so allows new protocol versions to be advertised without affecting in-flight requests and can also help servers manage traffic. Using an alternative service is not visible to the end user; it does not change the URL or the origin of the request and does not introduce additional round trips.

       | Header type
       | Response header

## Syntax

```http
Alt-Svc: clear
Alt-Svc: <protocol-id>=<alt-authority>; ma=<max-age>
Alt-Svc: <protocol-id>=<alt-authority>; ma=<max-age>; persist=1
```

- `clear`
    All alternative services of the origin are invalidated.
- `<protocol-id>`
    The Application-Layer Protocol Negotiation (ALPN) protocol identifier. Examples include `h2` for HTTP/2 and `h3-25` for draft 25 of the HTTP/3 protocol.
- `<alt-authority>`
    A quoted string specifying the alternative authority, consisting of an optional host override, a colon, and a mandatory port number.
- `ma=<max-age>` (optional)
    The number of seconds for which the alternative service is considered fresh.
    If omitted, it defaults to 24 hours.
    Alternative service entries can be cached for up to `<max-age>` seconds, minus the age of the response (from the `Age` header).
    Once the cached entry expires, the client can no longer use this alternative service for new connections.
- `persist=1` (optional)
    Entries are not deleted by network configuration changes.
    Cached alternative service entries are usually cleared on such changes.

Multiple entries can be specified in a single `Alt-Svc` header using comma as separator.
In that case, early entries are considered more preferable.

## Example

```http
Alt-Svc: h2=":443"; ma=2592000;
Alt-Svc: h2=":443"; ma=2592000; persist=1
Alt-Svc: h2="alt.example.com:443", h2=":443"
Alt-Svc: h3-25=":443"; ma=3600, h2=":443"; ma=3600
```

## See also

- Alternative Services by HTTP Working Group chair, Mark Nottingham (2016)
