---
title: "Sec-Purpose header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/sec-purpose/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Sec-Purpose header

The HTTP **`Sec-Purpose`** fetch metadata request header indicates the purpose for which the requested resource will be used, when that purpose is something other than immediate use by the user-agent.

The only purpose that is currently defined is `prefetch`, which indicates that the resource is being requested in anticipation that it will be needed by a page that is likely to be navigated to in the near future, such as a page linked in search results or a link that a user has hovered over.
The server can use this knowledge to: adjust the caching expiry for the request, disallow the request, or perhaps to treat it differently when counting page visits.

The header is sent when a page is loaded that has a `<link>` element with attribute `rel="prefetch"`.
Note that if this header is set then a `Sec-Fetch-Dest` header in the request must be set to `empty` (any value in the `<link>` attribute `as` is ignored) and the `Accept` header should match the value used for normal navigation requests.

       | Header type
       | Fetch Metadata Request Header

       | Forbidden request header
       | Yes (`Sec-` prefix)

       |
        CORS-safelisted request header

       | No

## Syntax

```http
Sec-Purpose: prefetch
```

## Directives

The allowed tokens are:

- `prefetch`
    The purpose is to prefetch a resource that may be needed in a probable future navigation.

## Examples

### A prefetch request

Consider the case where a browser loads a file with a `<link>` element that has the attribute `rel="prefetch"` and an `href` attribute containing the address of an image file.
The resulting `fetch()` should result in an HTTP request where `Sec-Purpose: prefetch`, `Sec-Fetch-Dest: empty`, and an `Accept` value that is the same as the browser uses for page navigation.

An example of such a header (on Firefox) is given below:

```http
GET /images/some_image.png HTTP/1.1
Host: example.com
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/116.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate, br
Sec-Purpose: prefetch
Connection: keep-alive
Sec-Fetch-Dest: empty
Sec-Fetch-Mode: no-cors
Sec-Fetch-Site: same-origin
Pragma: no-cache
Cache-Control: no-cache
```

> **Note:**
> At time of writing Firefox incorrectly sets the `Accept` header as `Accept: */*` for prefetches.
> The example has been modified to show what the `Accept` value should be.
> This issue can be tracked in Firefox bug 1836334.

## See also

- `Sec-Fetch-Dest`, `Sec-Fetch-Mode`, `Sec-Fetch-Site`, `Sec-Fetch-User` fetch metadata request headers
- Prefetch (Glossary)
- `<link>` element with attribute `rel="prefetch"`
