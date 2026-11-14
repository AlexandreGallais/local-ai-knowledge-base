---
title: "PerformanceObserver: PerformanceObserver() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performanceobserver/performanceobserver/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceObserver: PerformanceObserver() constructor

The **`PerformanceObserver()`** constructor creates a new `PerformanceObserver` object with the given observer `callback`. The observer callback is invoked when `performance entry events` are recorded for the `entry types` that have been registered, via the `observe()` method.

## Syntax

```js
new PerformanceObserver(callback)
```

### Parameters

- `callback`
    A `PerformanceObserverCallback` callback that will be invoked when observed performance events are recorded. When the callback is invoked, the following parameters are available:
    - `entries`
        The `list of performance observer entries`.
    - `observer`
        The `observer` object that is receiving the above entries.
    - `options`
        An object with the following properties:
        - `droppedEntriesCount`
            The number of entries which could not be recorded because the `Performance` object's internal buffer was full.

            Note that this is only provided the first time the observer calls the callback, when the buffered entries are replayed. Once the observer starts making future observations, it no longer needs to use the buffer. After the first time, `options` will be an empty object (`{}`).

### Return value

A new `PerformanceObserver` object which will call the specified `callback` when observed performance events occur.

## Examples

### Creating a PerformanceObserver

The following example creates a `PerformanceObserver` watching for "mark" (`PerformanceMark`) and "measure" (`PerformanceMeasure`) events.
The `perfObserver` callback provides a `list` (`PerformanceObserverEntryList`) which allows you get observed performance entries.

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

### Dropped buffer entries

You can use `PerformanceObserver` with a `buffered` flag to listen to past performance entries.
There is a buffer size limit, though. The performance observer callback contains an `options` object: the first time the observer calls the callback, the `options` parameter will have a `droppedEntriesCount` property that tells you how many entries were dropped due to the buffer storage being full. Subsequent callbacks will have an empty `options` parameter.

```js
function perfObserver(list, observer, options) {
  list.getEntries().forEach((entry) => {
    // do something with the entries
  });
  if (options?.droppedEntriesCount > 0) {
    console.warn(
      `${options?.droppedEntriesCount} entries got dropped due to the buffer being full.`,
    );
  }
}

const observer = new PerformanceObserver(perfObserver);
observer.observe({ type: "resource", buffered: true });
```

Usually, there are a lot of resource timing entries, and for these entries specifically, you can also set a larger buffer using `performance.setResourceTimingBufferSize()` and watch for the `resourcetimingbufferfull` event.
