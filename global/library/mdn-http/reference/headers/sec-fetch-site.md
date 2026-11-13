---
title: "Sec-Fetch-Site header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/sec-fetch-site/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Sec-Fetch-Site header

The HTTP **`Sec-Fetch-Site`** fetch metadata request header indicates the relationship between a request initiator's origin and the origin of the requested resource.

In other words, this header tells a server whether a request for a resource is coming from the same origin, the same site, a different site, or is a "user initiated" request. The server can then use this information to decide if the request should be allowed.

Same-origin requests would usually be allowed by default, but what happens for requests from other origins may further depend on what resource is being requested, or information in another fetch metadata request header. By default, requests that are not accepted should be rejected with a `403` response code.

The header is only included in requests to potentially trustworthy URLs.

       | Header type
       | Fetch Metadata Request Header

       | Forbidden request header
       | Yes (`Sec-` prefix)

       |
        CORS-safelisted request header

       | No

## Syntax

```http
Sec-Fetch-Site: cross-site
Sec-Fetch-Site: same-origin
Sec-Fetch-Site: same-site
Sec-Fetch-Site: none
```

## Directives

- `cross-site`
    The request initiator and the server hosting the resource have a different site (i.e., a request by "potentially-evil.com" for a resource at "example.com").
- `same-origin`
    The request initiator and the server hosting the resource have the same origin (same scheme, host and port).
- `same-site`
    The request initiator and the server hosting the resource have the same site, including the scheme.
- `none`
    This request is a user-originated operation. For example: entering a URL into the address bar, opening a bookmark, or dragging-and-dropping a file into the browser window.

## Examples

A fetch request to `https://mysite.example/foo.json` originating from a web page on `https://mysite.example` (with the same port) is a same-origin request.
The browser will generate the `Sec-Fetch-Site: same-origin` header as shown below, and the server will typically allow the request:

```http
GET /foo.json
Sec-Fetch-Dest: empty
Sec-Fetch-Mode: cors
Sec-Fetch-Site: same-origin
```

A fetch request to the same URL from another site, for example `potentially-evil.com`, causes the browser to generate a different header (e.g., `Sec-Fetch-Site: cross-site`), which the server can choose to accept or reject:

```http
GET /foo.json
Sec-Fetch-Dest: empty
Sec-Fetch-Mode: cors
Sec-Fetch-Site: cross-site
```

## See also

- `Sec-Fetch-Mode`, `Sec-Fetch-User`, `Sec-Fetch-Dest` fetch metadata request headers
- Protect your resources from web attacks with Fetch Metadata (web.dev)
- Fetch Metadata Request Headers playground (secmetadata.appspot.com)
