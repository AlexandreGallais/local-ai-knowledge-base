---
title: "PerformanceSoftNavigation: presentationTime property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performancesoftnavigation/presentationtime/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceSoftNavigation: presentationTime property

The **`presentationTime`** read-only property of the `PerformanceSoftNavigation` interface returns the `timestamp` of when the painted pixels were actually drawn on the screen.

The `presentationTime` is optional — some browsers may always return `0` or not expose the value at all. The value is also implementation-dependent — it may differ across browsers that choose to expose it.

## Value

A `DOMHighResTimeStamp` or `null` if the value is not exposed.

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
