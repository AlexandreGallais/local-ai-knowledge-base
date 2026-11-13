---
title: "PerformanceResourceTiming: fetchStart property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performanceresourcetiming/fetchstart/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceResourceTiming: fetchStart property

The **`fetchStart`** read-only property represents a `timestamp` immediately before the browser starts to fetch the resource.

## Value

A `DOMHighResTimeStamp` immediately before the browser starts to fetch the
resource.

## Description

If there are no HTTP redirects or their timing information is not exposed, this value is equivalent to `PerformanceEntry.startTime`. Otherwise, this value can be later than `startTime`.

Unlike many other `PerformanceResourceTiming` properties, the `fetchStart` property is available for cross-origin requests without the need for the `Timing-Allow-Origin` HTTP response header. However, without this header, `fetchStart` is equivalent to `startTime`, so it doesn't reveal the time spent on redirects. The exception is cross-origin `` elements, for which `fetchStart` is `0` (see Cross-origin iframes).

## Examples

### Measuring time to fetch (without redirects)

The `fetchStart` and `responseEnd` properties can be used to measure the overall time it took to fetch the final resource (without redirects). If you want to include redirects, the overall time to fetch is provided in the `duration` property.

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
