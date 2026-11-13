---
title: "PerformanceNavigationTiming: domContentLoadedEventStart property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performancenavigationtiming/domcontentloadedeventstart/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceNavigationTiming: domContentLoadedEventStart property

The **`domContentLoadedEventStart`** read-only property returns a `DOMHighResTimeStamp` representing the time immediately before the current document's `DOMContentLoaded` event handler starts.

Typically frameworks and libraries wait for the `DOMContentLoaded` event before starting to run their code. We can use the `domContentLoadedEventStart` and the `domContentLoadedEventEnd` properties to calculate how long this takes to run.

## Value

A `DOMHighResTimeStamp` representing the time immediately before the current document's `DOMContentLoaded` event handler starts.

## Examples

### Measuring `DOMContentLoaded` event handler time

The `domContentLoadedEventStart` property can be used to measure how long it takes process the `DOMContentLoaded` event handler.

Example using a `PerformanceObserver`, which notifies of new `navigation` performance entries as they are recorded in the browser's performance timeline. Use the `buffered` option to access entries from before the observer creation.

```js
const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    const domContentLoadedTime =
      entry.domContentLoadedEventEnd - entry.domContentLoadedEventStart;
    console.log(
      `${entry.name}: DOMContentLoaded processing time: ${domContentLoadedTime}ms`,
    );
  });
});

observer.observe({ type: "navigation", buffered: true });
```

Example using `Performance.getEntriesByType()`, which only shows `navigation` performance entries present in the browser's performance timeline at the time you call this method:

```js
const entries = performance.getEntriesByType("navigation");
entries.forEach((entry) => {
  const domContentLoadedTime =
    entry.domContentLoadedEventEnd - entry.domContentLoadedEventStart;
  console.log(
    `${entry.name}: DOMContentLoaded processing time: ${domContentLoadedTime}ms`,
  );
});
```

## See also

- DOMContentLoaded
