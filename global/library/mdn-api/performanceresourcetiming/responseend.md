---
title: "PerformanceResourceTiming: responseEnd property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performanceresourcetiming/responseend/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceResourceTiming: responseEnd property

The **`responseEnd`** read-only property returns a `timestamp` immediately after the browser receives the last byte of the resource or immediately before the transport connection is closed, whichever comes first.

## Value

A `DOMHighResTimeStamp` immediately after the browser receives the last byte of the resource or immediately before the transport connection is closed, whichever comes first.

## Description

The `responseEnd` property is available for cross-origin requests without the `Timing-Allow-Origin` HTTP response header, except for navigations of cross-origin `` elements.

### Cross-origin iframes

For a cross-origin ``, if the iframe's document is served with a `Timing-Allow-Origin` header that allows the embedding page's origin, `responseEnd` is the time immediately after the browser receives the last byte of that document.

Without this header, the precise time isn't reported, because it could reveal how the user interacted with the frame.
Instead, the browser reports a fallback entry once the iframe's `load` event fires.
In this entry, `startTime` is the time the iframe started navigating, and `responseEnd` is the time the iframe finished loading, including all of its subresources.
The other timestamps, as well as the `encodedBodySize` and `decodedBodySize` properties, are `0`.

## Examples

### Measuring time to fetch (without redirects)

The `responseEnd` and `fetchStart` properties can be used to measure the overall time it took to fetch the final resource (without redirects). If you want to include redirects, the overall time to fetch is provided in the `duration` property.

```js
const timeToFetch = entry.responseEnd - entry.fetchStart;
```

Example using a `PerformanceObserver`, which notifies of new `resource` performance entries as they are recorded in the browser's performance timeline. Use the `buffered` option to access entries from before the observer creation.

```js
const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    const timeToFetch = entry.responseEnd - entry.fetchStart;
    if (timeToFetch > 0) {
      console.log(`${entry.name}: Time to fetch: ${timeToFetch}ms`);
    }
  });
});

observer.observe({ type: "resource", buffered: true });
```

Example using `Performance.getEntriesByType()`, which only shows `resource` performance entries present in the browser's performance timeline at the time you call this method:

```js
const resources = performance.getEntriesByType("resource");
resources.forEach((entry) => {
  const timeToFetch = entry.responseEnd - entry.fetchStart;
  if (timeToFetch > 0) {
    console.log(`${entry.name}: Time to fetch: ${timeToFetch}ms`);
  }
});
```

## See also

- `Timing-Allow-Origin`
- Resource timing
