---
title: "PerformanceNavigationTiming: loadEventStart property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performancenavigationtiming/loadeventstart/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceNavigationTiming: loadEventStart property

The **`loadEventStart`** read-only property returns a `DOMHighResTimeStamp` representing the time immediately before the current document's `load` event handler starts.

## Value

A `DOMHighResTimeStamp` representing the time immediately before the current document's `load` event handler starts.

## Examples

### Measuring `load` event handler time

The `loadEventStart` property can be used to measure how long it takes to process the `load` event handler.

This is useful to measure the time of long-running `load` event handlers.

```js
window.addEventListener("load", (event) => {
  // Some long running code
});
```

Example using a `PerformanceObserver`, which notifies of new `navigation` performance entries as they are recorded in the browser's performance timeline. Use the `buffered` option to access entries from before the observer creation.

```js
const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    const loadEventTime = entry.loadEventEnd - entry.loadEventStart;
    if (loadEventTime > 0) {
      console.log(`${entry.name}: load event handler time: ${loadEventTime}ms`);
    }
  });
});

observer.observe({ type: "navigation", buffered: true });
```

Example using `Performance.getEntriesByType()`, which only shows `navigation` performance entries present in the browser's performance timeline at the time you call this method:

```js
const entries = performance.getEntriesByType("navigation");
entries.forEach((entry) => {
  const loadEventTime = entry.loadEventEnd - entry.loadEventStart;
  if (loadEventTime > 0) {
    console.log(`${entry.name}:
      load event handler time: ${loadEventTime}ms`);
  }
});
```

## See also

- `load` event
