---
title: "PerformanceObserver: disconnect() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performanceobserver/disconnect/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceObserver: disconnect() method

The **`disconnect()`** method of the `PerformanceObserver` interface is used to stop the performance observer from receiving any `performance entry` events.

## Syntax

```js
disconnect()
```

### Parameters

None.

### Return value

None (`undefined`).

## Examples

### Stopping a performance observer

The following example disconnects the performance observer to disable receiving any more performance entry events.

```js
const observer = new PerformanceObserver((list, obj) => {
  list.getEntries().forEach((entry) => {
    // Process "measure" events
    // …
    // Disable additional performance events
    observer.disconnect();
  });
});
observer.observe({ entryTypes: ["mark", "measure"] });
```
