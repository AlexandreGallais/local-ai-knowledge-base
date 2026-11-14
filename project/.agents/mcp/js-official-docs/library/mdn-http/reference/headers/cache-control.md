---
title: "Cache-Control header (part 1 of 3)"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/cache-control/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

The HTTP **`Cache-Control`** header holds _directives_ (instructions) in both requests and responses that control caching in browsers and shared caches (e.g., Proxies, CDNs).

       | Header type
       |
        Request header,
        Response header

       | Forbidden request header
       | No

       |
        CORS-safelisted response header

       | Yes

## Syntax

```http
Cache-Control: <directive>, <directive>, ...
```

Cache directives follow these rules:

- Caching directives are case-insensitive. However, lowercase is recommended because some implementations do not recognize uppercase directives.
- Multiple directives are permitted and must be comma-separated (e.g., `Cache-control: max-age=180, public`).
- Some directives have an optional argument. When an argument is provided, it is separated from the directive name by an equals symbol (`=`). Typically, arguments for the directives are integers and are therefore not enclosed in quote characters (e.g., `Cache-control: max-age=12`).

### Cache directives

The following table lists the standard `Cache-Control` directives:

| Request                               | Response                                            |
| ------------------------------------- | --------------------------------------------------- |
| `max-age`               | `max-age`                               |
| `max-stale`             | -                                                   |
| `min-fresh`             | -                                                   |
| -                                     | `s-maxage`                             |
| `no-cache`             | `no-cache`                             |
| `no-store`             | `no-store`                             |
| `no-transform`     | `no-transform`                     |
| `only-if-cached`   | -                                                   |
| -                                     | `must-revalidate`               |
| -                                     | `proxy-revalidate`             |
| -                                     | `must-understand`               |
| -                                     | `private`                               |
| -                                     | `public`                                 |
| -                                     | `immutable`                           |
| -                                     | `stale-while-revalidate` |
| `stale-if-error` | `stale-if-error`                 |

Note: Check the compatibility table for their support; user agents that don't recognize them should ignore them.

## Vocabulary

This section defines the terms used in this document, some of which are from the specification.

- (HTTP) cache
    Implementation that holds requests and responses for reusing in subsequent requests. It can be either a shared cache or a private cache.
- Shared cache
    Cache that exists between the origin server and clients (e.g., Proxy, CDN). It stores a single response and reuses it with multiple users — so developers should avoid storing personalized contents to be cached in the shared cache.
- Private cache
    Cache that exists in the client. It is also called _local cache_ or _browser cache_. It can store and reuse personalized content for a single user.
- Store response
    Store a response in caches when the response is cacheable. However, the cached response is not always reused as-is. (Usually, "cache" means storing a response.)
- Reuse response
    Reuse cached responses for subsequent requests.
- Revalidate response
    Ask the origin server whether or not the stored response is still fresh. Usually, the revalidation is done through a conditional request.
- Fresh response
    Indicates that the response is fresh. This usually means the response can be reused for subsequent requests, depending on request directives.
- Stale response
    Indicates that the response is a stale response. This usually means the response can't be reused as-is. Cache storage isn't required to remove stale responses immediately because revalidation could change the response from being stale to being fresh again.
- Age
    The time since a response was generated. It is a criterion for whether a response is fresh or stale.
