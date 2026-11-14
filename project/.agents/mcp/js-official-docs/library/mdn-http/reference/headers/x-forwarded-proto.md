---
title: "X-Forwarded-Proto header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/x-forwarded-proto/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

The HTTP **`X-Forwarded-Proto`** (XFP) request header is a de-facto standard header for identifying the protocol (HTTP or HTTPS) that a client used to connect to a proxy or load balancer.

Server access logs contain the protocol used between the server and the load balancer, but not the protocol used between the client and the load balancer.
To determine the protocol used between the client and the load balancer, the `X-Forwarded-Proto` request header can be used.

A standardized version of this header is the HTTP `Forwarded` header, although it's much less frequently used.

       | Header type
       | Request header

       | Forbidden request header
       | No

## Syntax

```http
X-Forwarded-Proto: <protocol>
```

## Directives

- `<protocol>`
    The forwarded protocol (`http` or `https`).

## Examples

### X-Forwarded-Proto client protocol

The following header indicates that the original request was made over HTTPS before being forwarded by a proxy or load balancer:

```http
X-Forwarded-Proto: https
```

### Non-standard forms

The following forms may be seen in request headers:

```http
# Microsoft
Front-End-Https: on

X-Forwarded-Protocol: https
X-Forwarded-Ssl: on
X-Url-Scheme: https
```

## Specifications

Not part of any current specification. The standardized version of this header is `Forwarded`.

## See also

- `X-Forwarded-Host`, `X-Forwarded-For` headers
- `Forwarded`
