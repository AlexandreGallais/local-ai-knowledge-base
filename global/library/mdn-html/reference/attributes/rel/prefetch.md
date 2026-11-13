---
title: "`rel=\"prefetch\"` HTML attribute value"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/attributes/rel/prefetch/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `rel="prefetch"` HTML attribute value

The **`prefetch`** keyword for the `rel` attribute of the `<link>` element provides a hint to browsers that the user is likely to need the target resource for future navigations, and therefore the browser can likely improve the user experience by preemptively fetching and caching the resource. `<link rel="prefetch">` is used for same-site navigation resources, or for subresources used by same-site pages.

The result is kept in the HTTP cache on disk. Because of this it is useful for prefetching subresources, even if they are not used by the current page. You could also use it to prefetch the next document the user will likely visit on the site. However, as a result you need to be careful with headers — for example certain Cache-Control headers could block prefetching (for example `no-cache` or `no-store`).

> **Note:**
> Because of such limitations, you are advised to use the Speculation Rules API for document prefetches instead, where it is supported.

`<link rel="prefetch">` is functionally equivalent to a `fetch()` call with a `priority: "low"` option set on it, except that the former will generally have an even lower priority, and it will have a `Sec-Purpose: prefetch` header set on the request. Note that in general browsers will give prefetch resources a lower priority than preload ones (e.g., requested via `<link rel="preload">`) — the current page is more important than the next.

The fetch request for a `prefetch` operation results in an HTTP request that includes the HTTP header `Sec-Purpose: prefetch`. A server might use this header to change the cache timeouts for the resources, or perform other special handling.
The request will also include the `Sec-Fetch-Dest` header with the value set to `empty`.

The `Accept` header in the request will match the value used for normal navigation requests. This allows the browser to find the matching cached resources following navigation.

## Examples

### Basic <example-value>

```js
<link rel="prefetch" href="main.js" />
```

### Navigation and subresource prefetches

Prefetching can be used to fetch both HTML and sub-resources for a possible next navigation. A common use case is to have a website landing page that fetches more "heavy-weight" resources used by the rest of the site.

```html
<link rel="prefetch" href="/app/style.css" />
<link rel="prefetch" href="/landing-page" />
```

### The effects of cache partitioning

Many browsers now implement some form of cache partitioning, which makes `<link rel="prefetch">` useless for resources intended for use by different top-level sites. This includes the main document when navigating cross-site. So, for example, the following prefetch:

```html
<link rel="prefetch" href="https://news.example/article" />
```

Would not be accessible from `https://aggregator.example/`.

## See also

- Speculative loading for a comparison of `<link rel="prefetch">` and other similar performance improvement features.
