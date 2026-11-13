---
title: "PerformanceResourceTiming: responseStart property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performanceresourcetiming/responsestart/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceResourceTiming: responseStart property

The **`responseStart`** read-only property returns a `timestamp` immediately after the browser receives the first byte of the response from the server, cache, or local resource.

## Value

The `responseStart` property can have the following values:

- A `DOMHighResTimeStamp` immediately after the browser receives the first byte of the response from the server.
- `0` if the resource was instantaneously retrieved from a cache.
- `0` if the resource is a cross-origin request and no `Timing-Allow-Origin` HTTP response header is used.
- `0` if the resource is a canceled request.

## Examples

### Measuring request time

The `responseStart` and `requestStart` properties can be used to measure how long the request takes.

```js
const request = entry.responseStart - entry.requestStart;
```

Example using a `PerformanceObserver`, which notifies of new `resource` performance entries as they are recorded in the browser's performance timeline. Use the `buffered` option to access entries from before the observer creation.

```js
const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    const request = entry.responseStart - entry.requestStart;
    if (request > 0) {
      console.log(`${entry.name}: Request time: ${request}ms`);
    }
  });
});

observer.observe({ type: "resource", buffered: true });
```

Example using `Performance.getEntriesByType()`, which only shows `resource` performance entries present in the browser's performance timeline at the time you call this method:

```js
const resources = performance.getEntriesByType("resource");
resources.forEach((entry) => {
  const request = entry.responseStart - entry.requestStart;
  if (request > 0) {
    console.log(`${entry.name}: Request time: ${request}ms`);
  }
});
```

### Cross-origin timing information

If the value of the `responseStart` property is `0`, the resource might be a cross-origin request. To allow seeing cross-origin timing information, the `Timing-Allow-Origin` HTTP response header needs to be set.

For example, to allow `https://developer.mozilla.org` to see timing resources, the cross-origin resource should send:

```http
Timing-Allow-Origin: https://developer.mozilla.org
```

## See also

- `Timing-Allow-Origin`
