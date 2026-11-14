---
title: "Sec-Fetch-User header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/sec-fetch-user/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Sec-Fetch-User header

The HTTP **`Sec-Fetch-User`** fetch metadata request header is sent for requests initiated by user activation, and its value is always `?1`.

A server can use this header to identify whether a navigation request from a document, iframe, etc., was originated by the user.

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
Sec-Fetch-User: ?1
```

## Directives

The value will always be `?1`. When a request is triggered by something other than a user activation, the spec requires browsers to omit the header completely.

## Examples

### Using Sec-Fetch-User

If a user clicks on a page link to another page on the same origin, the resulting request would have the following headers:

```http
Sec-Fetch-Dest: document
Sec-Fetch-Mode: navigate
Sec-Fetch-Site: same-origin
Sec-Fetch-User: ?1
```

## See also

- `Sec-Fetch-Dest`, `Sec-Fetch-Mode`, `Sec-Fetch-Site` fetch metadata request headers
- Protect your resources from web attacks with Fetch Metadata (web.dev)
- Fetch Metadata Request Headers playground (secmetadata.appspot.com)
