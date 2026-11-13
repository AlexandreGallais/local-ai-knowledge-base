---
title: "PerformanceObserver"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performanceobserver/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceObserver

The **`PerformanceObserver`** interface is used to observe performance measurement events and be notified of new `performance entries` as they are recorded in the browser's _performance timeline_.

## Constructor

- `PerformanceObserver()`
    Creates and returns a new `PerformanceObserver` object.

## Static properties

- `PerformanceObserver.supportedEntryTypes` (read-only)
    Returns an array of the `entryType` values supported by the user agent.

## Instance methods

- `PerformanceObserver.observe()`
    Specifies the set of entry types to observe. The performance observer's callback function will be invoked when performance entry is recorded for one of the specified `entryTypes`.
- `PerformanceObserver.disconnect()`
    Stops the performance observer callback from receiving performance entries.
- `PerformanceObserver.takeRecords()`
    Returns the current list of performance entries stored in the performance observer, emptying it out.

## Examples

### Creating a PerformanceObserver

The following example creates a `PerformanceObserver` watching for "mark" (`PerformanceMark`) and "measure" (`PerformanceMeasure`) events.
The `perfObserver` callback provides a `list` (`PerformanceObserverEntryList`) which allows you to get observed performance entries.

```js
function perfObserver(list, observer) {
  list.getEntries().forEach((entry) => {
    if (entry.entryType === "mark") {
      console.log(`${entry.name}'s startTime: ${entry.startTime}`);
    }
    if (entry.entryType === "measure") {
      console.log(`${entry.name}'s duration: ${entry.duration}`);
    }
  });
}
const observer = new PerformanceObserver(perfObserver);
observer.observe({ entryTypes: ["measure", "mark"] });
```

## See also

- `MutationObserver`
- `ResizeObserver`
- `IntersectionObserver`
