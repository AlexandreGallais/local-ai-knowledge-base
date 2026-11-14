---
title: "PerformanceNavigationTiming: unloadEventStart property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performancenavigationtiming/unloadeventstart/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceNavigationTiming: unloadEventStart property

The **`unloadEventStart`** read-only property returns a `DOMHighResTimeStamp` representing the time immediately before the previous document's `unload` event handler starts.

## Value

The `unloadEventStart` property can have the following values:

- A `DOMHighResTimeStamp` representing the time immediately before the previous document's `unload` event handler starts.
- `0` if there is no previous document.
- `0` if the previous page was on another origin.

## Examples

### Measuring `unload` event handler time

The `unloadEventStart` property can be used to measure how long it takes to process the `unload` event handler.

This is useful to measure the time of long-running `unload` event handlers.

```js
window.addEventListener("unload", (event) => {
  // Some long running code
});
```

Example using a `PerformanceObserver`, which notifies of new `navigation` performance entries as they are recorded in the browser's performance timeline. Use the `buffered` option to access entries from before the observer creation.

```js
const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    const unloadEventTime = entry.unloadEventEnd - entry.unloadEventStart;
    if (unloadEventTime > 0) {
      console.log(
        `${entry.name}: unload event handler time: ${unloadEventTime}ms`,
      );
    }
  });
});

observer.observe({ type: "navigation", buffered: true });
```

Example using `Performance.getEntriesByType()`, which only shows `navigation` performance entries present in the browser's performance timeline at the time you call this method:

```js
const entries = performance.getEntriesByType("navigation");
entries.forEach((entry) => {
  const unloadEventTime = entry.unloadEventEnd - entry.unloadEventStart;
  if (unloadEventTime > 0) {
    console.log(`${entry.name}:
      load event handler time: ${unloadEventTime}ms`);
  }
});
```

## See also

- `unload` event
