---
title: "PerformanceResourceTiming: responseStatus property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performanceresourcetiming/responsestatus/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceResourceTiming: responseStatus property

The **`responseStatus`** read-only property represents the HTTP response status code returned when fetching the resource.

This property maps to `Response.status` from the Fetch API.

## Value

The `responseStatus` property can have the following values:

- A number indicating the HTTP response status code returned when fetching the resource.
- `0` if the CORS check fails.
- `0` for cross-origin `` objects.

## Examples

### Checking if a cache was hit

The `responseStatus` property can be used to check for cached resources with a `304` `Not Modified` response status code.

Example using a `PerformanceObserver`, which notifies of new `resource` performance entries as they are recorded in the browser's performance timeline. Use the `buffered` option to access entries from before the observer creation.

```js
const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    if (entry.responseStatus === 304) {
      console.log(`${entry.name} was loaded from cache`);
    }
  });
});

observer.observe({ type: "resource", buffered: true });
```

Example using `Performance.getEntriesByType()`, which only shows `resource` performance entries present in the browser's performance timeline at the time you call this method:

```js
const resources = performance.getEntriesByType("resource");
resources.forEach((entry) => {
  if (entry.responseStatus === 304) {
    console.log(`${entry.name} was loaded from cache`);
  }
});
```

Alternatively, if `responseStatus` is not available, you can check if the `transferSize` property returned `0`.

### Cross-origin response status codes

If the value of the `responseStatus` property is `0`, the resource might be a cross-origin request. To allow seeing cross-origin response status codes, the CORS `Access-Control-Allow-Origin` HTTP response header needs to be set.

For example, to allow `https://developer.mozilla.org` to see response status codes, the cross-origin resource should send:

```http
Access-Control-Allow-Origin: https://developer.mozilla.org
```

## See also

- HTTP response status code
- `Response.status`
- CORS
