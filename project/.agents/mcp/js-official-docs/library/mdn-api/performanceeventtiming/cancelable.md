---
title: "PerformanceEventTiming: cancelable property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performanceeventtiming/cancelable/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceEventTiming: cancelable property

The read-only **`cancelable`** property returns the associated event's `cancelable` property, indicating whether the event can be canceled.

## Value

A boolean. `true` if the associated event is cancelable, `false` otherwise.

## Examples

### Observing non-cancelable events

The `cancelable` property can be used when observing event-timing entries (`PerformanceEventTiming`). For example, to log and measure non-cancelable events only.

```js
const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    if (!entry.cancelable) {
      const delay = entry.processingStart - entry.startTime;
      console.log(entry.name, delay);
    }
  });
});

// Register the observer for events
observer.observe({ type: "event", buffered: true });
```
