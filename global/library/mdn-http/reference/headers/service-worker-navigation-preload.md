---
title: "Service-Worker-Navigation-Preload header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/service-worker-navigation-preload/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Service-Worker-Navigation-Preload header

The HTTP **`Service-Worker-Navigation-Preload`** request header indicates that the request was the result of a `fetch()` operation made during service worker navigation preloading.
It allows a server to respond with a different resource than for a normal `fetch()`.

If a different response may result from setting this header, the server must include a `Vary: Service-Worker-Navigation-Preload` header in responses to ensure that different responses are cached.

For more information see `NavigationPreloadManager.setHeaderValue()` (and `NavigationPreloadManager`).

       | Header type
       | Request header

       | Forbidden request header
       | No

## Syntax

```http
Service-Worker-Navigation-Preload: <value>
```

## Directives

- `<value>`
    An arbitrary value that indicates what data should be sent in the response to the preload request.
    This defaults to `true`.
    It may be set to any other string value in the service worker, using `NavigationPreloadManager.setHeaderValue()`.

## Examples

### Service worker navigation preloading headers

The following request header is sent by default in navigation preload requests:

```http
Service-Worker-Navigation-Preload: true
```

The service worker can set a different header value using `NavigationPreloadManager.setHeaderValue()`.
For example, in order to request that a fragment of the requested resource be returned in JSON format, the value could be set with the string `json_fragment1`.

```http
Service-Worker-Navigation-Preload: json_fragment1
```

## See also

- HTTP Caching: Vary and `Vary` header
- Service Worker API
