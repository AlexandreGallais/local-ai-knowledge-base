---
title: "Cache-Control header (part 3 of 3)"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/cache-control/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Cache-Control header (part 3 of 3)

## Use Cases

### Preventing storing

If you don't want a response stored in caches, use the `no-store` directive.

```http
Cache-Control: no-store
```

Note that `no-cache` means "it can be stored but don't reuse before validating" — so it's not for preventing a response from being stored.

```http
Cache-Control: no-cache
```

In theory, if directives are conflicted, the most restrictive directive should be honored. So the example below is basically meaningless because `private`, `no-cache`, `max-age=0` and `must-revalidate` conflict with `no-store`.

```http
# conflicted
Cache-Control: private, no-cache, no-store, max-age=0, must-revalidate

# equivalent to
Cache-Control: no-store
```

### Caching static assets with "cache busting"

When you build static assets with versioning/hashing mechanisms, adding a version/hash to the filename or query string is a good way to manage caching.

For example:

```html
<!-- index.html -->
<script src="/assets/react.min.js"></script>
<img src="/assets/hero.png" width="900" height="400" />
```

The React library version will change when you update the library, and `hero.png` will also change when you edit the picture. So those are hard to store in a cache with `max-age`.

In such a case, you could address the caching needs by using a specific, numbered version of the library, and including the hash of the picture in its URL.

```html
<!-- index.html -->
<script src="/assets/react.0.0.0min.js"></script>
<img src="/assets/hero.png?hash=deadbeef" width="900" height="400" />
```

You can add a long `max-age` value and `immutable` because the content will never change.

```http
# /assets/*
Cache-Control: max-age=31536000, immutable
```

When you update the library or edit the picture, new content should have a new URL, and caches aren't reused. That is called the "cache busting" pattern.

Use a `no-cache` to make sure that the HTML response itself is not cached. `no-cache` could cause revalidation, and the client will correctly receive a new version of the HTML response and static assets.

```http
# /index.html
Cache-Control: no-cache
```

Note: If `index.html` is controlled under Basic <example-value> or Digest Authentication, files under `/assets` are not stored in the shared cache. If `/assets/` files are suitable for storing in a shared cache, you also need one of `public`, `s-maxage` or `must-revalidate`.

### Up-to-date contents always

For content that's generated dynamically, or that's static but updated often, you want a user to always receive the most up-to-date version.

If you don't add a `Cache-Control` header because the response is not intended to be cached, that could cause an unexpected result. Cache storage is allowed to cache it heuristically — so if you have any requirements on caching, you should always indicate them explicitly, in the `Cache-Control` header.

Adding `no-cache` to the response causes revalidation to the server, so you can serve a fresh response every time — or if the client already has a new one, just respond `304 Not Modified`.

```http
Cache-Control: no-cache
```

Most HTTP/1.0 caches don't support `no-cache` directives, so historically `max-age=0` was used as a workaround. But only `max-age=0` could cause a stale response to be reused when caches disconnected from the origin server. `must-revalidate` addresses that. That's why the example below is equivalent to `no-cache`.

```http
Cache-Control: max-age=0, must-revalidate
```

But for now, you can simply use `no-cache` instead.

### Clearing an already-stored cache

There are no cache directives for clearing already-stored responses from caches on _intermediate_ servers.

Imagine that clients/caches store a fresh response for a path, with no request flight to the server. There is nothing a server could do to that path.

`Clear-Site-Data: cache` can be used to clear every stored response for a site in the browser cache, so use this with care.
Note that this will not affect shared or intermediate caches.

## See also

- HTTP caching
- Caching Tutorial for Web Authors and Webmasters
- Caching best practices & max-age gotchas
- Cache-Control for Civilians
- RFC 9111 – HTTP Caching
- RFC 5861 – HTTP Cache-Control Extensions for Stale Content
- RFC 8246 – HTTP Immutable Responses
