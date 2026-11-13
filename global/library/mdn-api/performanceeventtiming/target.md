---
title: "PerformanceEventTiming: target property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performanceeventtiming/target/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceEventTiming: target property

The read-only **`target`** property returns the associated event's last `target` which is the node onto which the event was last dispatched.

## Value

A `Node` onto which the event was last dispatched.

Or `null` if the `Node` is disconnected from the document's DOM or is in the shadow DOM.

## Examples

### Observing events with a specific last target

The `target` property can be used when observing event-timing entries (`PerformanceEventTiming`). For example, to log and measure events for a given last target only.

```js
const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    if (entry.target && entry.target.id === "myNode") {
      const delay = entry.processingStart - entry.startTime;
      console.log(entry.name, delay);
    }
  });
});

// Register the observer for events
observer.observe({ type: "event", buffered: true });
```
