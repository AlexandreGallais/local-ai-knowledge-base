---
title: "PerformanceResourceTiming: encodedBodySize property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performanceresourcetiming/encodedbodysize/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceResourceTiming: encodedBodySize property

The **`encodedBodySize`** read-only property represents the size (in octets) received from the fetch (HTTP or cache) of the payload body before removing any applied content encodings (like gzip or Brotli).

## Value

The `encodedBodySize` property can have the following values:

- A number representing the size (in octets) received from the fetch (HTTP or cache), of the payload body, before removing any applied content encoding.
- `0` if the resource is a cross-origin request made in `no-cors` mode, or if the request failed, for example, because it didn't pass the CORS check.

## Description

Content size information for a cross-origin resource is restricted unless the resource passes the CORS check, so if the value of the `encodedBodySize` property is `0`, the resource might be a cross-origin request.

To expose cross-origin content size information, the resource must be requested in `cors` mode, and the response must pass the CORS check, which requires it to include an appropriate `Access-Control-Allow-Origin` header.
Requests made with `fetch()` use `cors` mode by default.
Elements such as `` use `no-cors` mode unless the `crossorigin` attribute is set, so a cross-origin image loaded without it has a content size of `0`.

To allow `https://developer.mozilla.org` to see content sizes, the cross-origin resource should send:

```http
Access-Control-Allow-Origin: https://developer.mozilla.org
```

Browsers are allowed to apply stricter restrictions than CORS requires, and may return `0` even when the CORS check passes.

Frame navigations, such as an `` loading its document, don't use CORS.
Their content sizes are exposed only for same-origin frames that were loaded without cross-origin redirects, even if the frame's document passes the `Timing-Allow-Origin` check.

## Examples

### Checking if content was compressed

If the `encodedBodySize` and `decodedBodySize` properties are non-null and differ, the content was compressed (for example, gzip or Brotli).

Example using a `PerformanceObserver`, which notifies of new `resource` performance entries as they are recorded in the browser's performance timeline. Use the `buffered` option to access entries from before the observer creation.

```js
const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    const uncompressed =
      entry.decodedBodySize && entry.decodedBodySize === entry.encodedBodySize;
    if (uncompressed) {
      console.log(`${entry.name} was not compressed!`);
    }
  });
});

observer.observe({ type: "resource", buffered: true });
```

Example using `Performance.getEntriesByType()`, which only shows `resource` performance entries present in the browser's performance timeline at the time you call this method:

```js
const resources = performance.getEntriesByType("resource");
resources.forEach((entry) => {
  const uncompressed =
    entry.decodedBodySize && entry.decodedBodySize === entry.encodedBodySize;
  if (uncompressed) {
    console.log(`${entry.name} was not compressed!`);
  }
});
```

## See also

- `Access-Control-Allow-Origin`
- `Timing-Allow-Origin`
- Cross-origin resource sharing (CORS)
