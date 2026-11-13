---
title: "PerformanceSoftNavigation: paintTime property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performancesoftnavigation/painttime/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceSoftNavigation: paintTime property

The **`paintTime`** read-only property of the `PerformanceSoftNavigation` interface returns the `timestamp` of when the rendering phase ended and the paint phase started.

The `paintTime` is broadly interoperable: The value should be the same across different implementations.

## Value

A `DOMHighResTimeStamp`.

## Examples

This example uses a `PerformanceObserver` to log new `soft-navigation` performance entries as they are recorded in the browser's performance timeline. The `buffered` option is used to access entries from before the observer creation.

```js
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log("Soft Nav:", entry.startTime, entry.paintTime);
  }
});
observer.observe({ type: "soft-navigation", buffered: true });
```

## See also

- `LargestContentfulPaint.presentationTime`
