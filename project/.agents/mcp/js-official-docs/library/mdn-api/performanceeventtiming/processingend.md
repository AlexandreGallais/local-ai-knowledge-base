---
title: "PerformanceEventTiming: processingEnd property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performanceeventtiming/processingend/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceEventTiming: processingEnd property

The read-only **`processingEnd`** property returns the time the last event handler finished executing.

It's equal to `PerformanceEventTiming.processingStart` when there are no such event handlers.

## Value

A `DOMHighResTimeStamp` timestamp.

## Examples

### Using the processingEnd property

The `processingEnd` property can be used when observing event-timing entries (`PerformanceEventTiming`). For example, to calculate input delay or event processing times.

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

- `PerformanceEventTiming.processingStart`
