---
title: "Retry-After header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/retry-after/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Retry-After header

The HTTP **`Retry-After`** response header indicates how long the user agent should wait before making a follow-up request.
There are three main cases this header is used:

- In a `503 Service Unavailable` response, this indicates how long the service is expected to be unavailable.
- In a `429 Too Many Requests` response, this indicates how long to wait before making a new request.
- In a redirect response, such as `301 Moved Permanently`, this indicates the minimum time that the user agent is asked to wait before issuing the redirected request.

       | Header type
       | Response header

## Syntax

```http
Retry-After: <http-date>
Retry-After: <delay-seconds>
```

## Directives

- `<http-date>`
    A date after which to retry. See the `Date` header for more details
    on the HTTP date format.
- `<delay-seconds>`
    A non-negative decimal integer indicating the seconds to delay after the response is
    received.

## Examples

### Dealing with scheduled downtime

Support for the `Retry-After` header on both clients and servers is still
inconsistent. However, some crawlers and spiders, like the Googlebot, honor the
`Retry-After` header. It is useful to send it along with a `503` response, so that search engines will keep
indexing your site when the downtime is over.

```http
Retry-After: Wed, 21 Oct 2015 07:28:00 GMT
Retry-After: 120
```

## See also

- `503 Service Unavailable`
- `301 Moved Permanently`
- How to deal with planned site downtime on developers.google.com (2011)
