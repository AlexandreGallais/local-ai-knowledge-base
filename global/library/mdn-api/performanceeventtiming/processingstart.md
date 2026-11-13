---
title: "PerformanceEventTiming: processingStart property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performanceeventtiming/processingstart/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceEventTiming: processingStart property

The read-only **`processingStart`** property returns the time at which event dispatch started. This is when event handlers are about to be executed.

## Value

A `DOMHighResTimeStamp` timestamp.

## Examples

### Using the processingStart property

The `processingStart` property can be used when observing event timing entries (`PerformanceEventTiming`). For example, to calculate input delay or event processing times.

```js
const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    // Full duration
    const duration = entry.duration;
    // Input delay (before processing event)
    const delay = entry.processingStart - entry.startTime;
    // Synchronous event processing time
    // (between start and end dispatch)
    const time = entry.processingEnd - entry.processingStart;
  });
});
// Register the observer for events
observer.observe({ type: "event", buffered: true });
```

## See also

- `PerformanceEventTiming.processingEnd`
