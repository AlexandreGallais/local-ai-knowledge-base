---
title: "HTTP caching (part 3 of 3)"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/guides/caching/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTTP caching (part 3 of 3)

## Common caching patterns

There are many directives in the `Cache-Control` spec, and it may be difficult to understand all of them. But most websites can be covered by a combination of a handful of patterns.

This section describes the common patterns in designing caches.

### Default settings

As mentioned above, the default behavior for caching (that is, for a response without `Cache-Control`) is not simply "don't cache" but implicit caching according to so-called "heuristic caching".

To avoid that heuristic caching, it's preferable to explicitly give all responses a default `Cache-Control` header.

To ensure that by default the latest versions of resources will always be transferred, it's common practice to make the default `Cache-Control` value include `no-cache`:

```http
Cache-Control: no-cache
```

In addition, if the service implements cookies or other login methods, and the content is personalized for each user, `private` must be given too, to prevent sharing with other users:

```http
Cache-Control: no-cache, private
```

### Cache Busting

The resources that work best with caching are static immutable files whose contents never change. And for resources that _do_ change, it is a common best practice to change the URL each time the content changes, so that the URL unit can be cached for a longer period.

As an example, consider the following HTML:

```html
<script src="bundle.js"></script>
<link rel="stylesheet" href="build.css" />
<body>
  hello
</body>
```

In modern web development, JavaScript and CSS resources are frequently updated as development progresses. Also, if the versions of JavaScript and CSS resources that a client uses are out of sync, the display will break.

So the HTML above makes it difficult to cache `bundle.js` and `build.css` with `max-age`.

Therefore, you can serve the JavaScript and CSS with URLs that include a changing part based on a version number or hash value. Some of the ways to do that are shown below.

```plain
# version in filename
bundle.v123.js

# version in query
bundle.js?v=123

# hash in filename
bundle.YsAIAAAA-QG4G6kCMAMBAAAAAAAoK.js

# hash in query
bundle.js?v=YsAIAAAA-QG4G6kCMAMBAAAAAAAoK
```

Since the cache distinguishes resources from one another based on their URLs, the cache will not be reused again if the URL changes when a resource is updated.

```html
<script src="bundle.v123.js"></script>
<link rel="stylesheet" href="build.v123.css" />
<body>
  hello
</body>
```

With that design, both JavaScript and CSS resources can be cached for a long time. So how long should `max-age` be set to? The QPACK specification provides an answer to that question.

QPACK is a standard for compressing HTTP header fields, with tables of commonly-used field values defined.

Some commonly-used cache-header values are shown below.

```plain
36 cache-control max-age=0
37 cache-control max-age=604800
38 cache-control max-age=2592000
39 cache-control no-cache
40 cache-control no-store
41 cache-control public, max-age=31536000
```

If you select one of those numbered options, you can compress values in 1 byte when transferred via HTTP3.

Numbers `37`, `38`, and `41` are for periods of one week, one month, and one year.

Because the cache removes old entries when new entries are saved, the probability that a stored response still exists after one week is not that high — even if `max-age` is set to 1 week. Therefore, in practice, it does not make much difference which one you choose.

Note that number `41` has the longest `max-age` (1 year), but with `public`.

The `public` value has the effect of making the response storable even if the `Authorization` header is present.

> **Note:**
> The `public` directive should only be used if there is a need to store the response when the `Authorization` header is set.
> It is not required otherwise, because a response will be stored in the shared cache as long as `max-age` is given.

So if the response is personalized with basic <example-value>, the presence of `public` may cause problems. If you are concerned about that, you can choose the second-longest value, `38` (1 month).

```http
# response for bundle.v123.js

# If you never personalize responses via Authorization
Cache-Control: public, max-age=31536000

# If you can't be certain
Cache-Control: max-age=2592000
```

### Validation

Don't forget to set the `Last-Modified` and `ETag` headers, so that you don't have to re-transmit a resource when reloading. It's easy to generate those headers for pre-built static files.

The `ETag` value here may be a hash of the file.

```http
# response for bundle.v123.js
Last-Modified: Tue, 22 Feb 2022 20:20:20 GMT
ETag: "YsAIAAAA-QG4G6kCMAMBAAAAAAAoK"
```

In addition, `immutable` can be added to prevent validation on reload.

The combined result is shown below.

```http
# bundle.v123.js
HTTP/1.1 200 OK
Content-Type: text/javascript
Content-Length: 1024
Cache-Control: public, max-age=31536000, immutable
Last-Modified: Tue, 22 Feb 2022 20:20:20 GMT
ETag: "YsAIAAAA-QG4G6kCMAMBAAAAAAAoK"
```

**Cache busting** is a technique to make a response cacheable over a long period by changing the URL when the content changes. The technique can be applied to all subresources, such as images.

> **Note:**
> When evaluating the use of `immutable` and QPACK:
> If you're concerned that `immutable` changes the predefined value provided by QPACK, consider that
> in this case, the `immutable` part can be encoded separately by splitting the `Cache-Control` value into two lines — though this is dependent on the encoding algorithm a particular QPACK implementation uses.

```http
Cache-Control: public, max-age=31536000
Cache-Control: immutable
```

### Main resources

Unlike subresources, main resources cannot be cache busted because their URLs can't be decorated in the same way that subresource URLs can be.

If the following HTML itself is stored, the latest version cannot be displayed even if the content is updated on the server side.

```html
<script src="bundle.v123.js"></script>
<link rel="stylesheet" href="build.v123.css" />
<body>
  hello
</body>
```

For that case, `no-cache` would be appropriate — rather than `no-store` — since we don't want to store HTML, but instead just want it to always be up-to-date.

Furthermore, adding `Last-Modified` and `ETag` will allow clients to send conditional requests, and a `304 Not Modified` can be returned if there have been no updates to the HTML:

```http
HTTP/1.1 200 OK
Content-Type: text/html
Content-Length: 1024
Cache-Control: no-cache
Last-Modified: Tue, 22 Feb 2022 20:20:20 GMT
ETag: "AAPuIbAOdvAGEETbgAAAAAAABAAE"
```

That setting is appropriate for non-personalized HTML, but for a response that gets personalized using cookies — for example, after a login — don't forget to also specify `private`:

```http
HTTP/1.1 200 OK
Content-Type: text/html
Content-Length: 1024
Cache-Control: no-cache, private
Last-Modified: Tue, 22 Feb 2022 20:20:20 GMT
ETag: "AAPuIbAOdvAGEETbgAAAAAAABAAE"
Set-Cookie: __Host-SID=AHNtAyt3fvJrUL5g5tnGwER; Secure; Path=/; HttpOnly
```

The same can be used for `favicon.ico`, `manifest.json`, `.well-known`, and API endpoints whose URLs cannot be changed using cache busting.

Most web content can be covered by a combination of the two patterns described above.

### More about managed caches

With the method described in previous sections, subresources can be cached for a long time by using cache busting, but main resources (which are usually HTML documents) can't be.

Caching main resources is difficult because, using just standard directives from the HTTP Caching specification, there's no way to actively delete cache contents when content is updated on the server.

However, it is possible by deploying a managed cache such as a CDN or service worker.

For example, a CDN that allows cache purging via an API or dashboard operation would allow for a more aggressive caching strategy by storing the main resource and explicitly purging the relevant cache only when an update occurs on the server.

A service worker could do the same if it could delete the contents in the Cache API when an update occurs on the server.

For more information, see the documentation for your CDN, and consult the service worker documentation.

## See also

- `Cache-Control` HTTP header
- RFC 9111: Hypertext Transfer Protocol (HTTP/1.1): Caching
- Caching Tutorial - Mark Nottingham
