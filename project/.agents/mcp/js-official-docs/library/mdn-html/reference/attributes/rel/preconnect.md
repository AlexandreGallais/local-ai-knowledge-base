---
title: "`rel=\"preconnect\"` HTML attribute value"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/attributes/rel/preconnect/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `rel="preconnect"` HTML attribute value

The **`preconnect`** keyword for the `rel` attribute of the `<link>` element is a hint to browsers that the user is likely to need resources from the target resource's origin, and therefore the browser can likely improve the user experience by preemptively initiating a connection to that origin. Preconnecting speeds up future loads from a given origin by preemptively performing part or all of the handshake (DNS+TCP for HTTP, and DNS+TCP+TLS for HTTPS origins).

`<link rel="preconnect">` will provide a benefit to any future cross-origin HTTP request, navigation or subresource. It has no benefit on same-origin requests because the connection is already open.

If a page needs to make connections to many third-party domains, preconnecting them all can be counterproductive. The `<link rel="preconnect">` hint is best used for only the most critical connections. For the others, just use `<link rel="dns-prefetch">` to save time on the first step — the DNS lookup.

## Examples

```html
<link rel="preconnect" href="https://example.com" />
```

You can also implement preconnect as an HTTP `Link` header, for example:

```http
Link: <https://example.com>; rel="preconnect"
```

## See also

- Speculative loading for a comparison of `<link rel="preconnect">` and other similar performance improvement features.
