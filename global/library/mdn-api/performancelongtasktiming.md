---
title: "PerformanceLongTaskTiming"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performancelongtasktiming/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceLongTaskTiming

The **`PerformanceLongTaskTiming`** interface provides information about tasks that occupy the UI thread for 50 milliseconds or more.

`PerformanceLongTaskTiming` inherits from `PerformanceEntry`.

## Instance properties

This interface extends the following `PerformanceEntry` properties for long task timing performance entry types by qualifying them as follows:

- `PerformanceEntry.duration` (read-only) (experimental)
    Returns a `DOMHighResTimeStamp` representing the elapsed time between the start and end of the task, with a 1ms granularity.
- `PerformanceEntry.entryType` (read-only) (experimental)
    Always returns `"longtask"`
- `PerformanceEntry.name` (read-only) (experimental)
    Returns one of the following strings referring to the browsing context or frame that can be attributed to the long task:
    - `"cross-origin-ancestor"`
    - `"cross-origin-descendant"`
    - `"cross-origin-unreachable"`
    - `"multiple-contexts"`
    - `"same-origin-ancestor"`
    - `"same-origin-descendant"`
    - `"same-origin"`
    - `"self"`
    - `"unknown"`
- `PerformanceEntry.startTime` (read-only) (experimental)
    Returns a `DOMHighResTimeStamp` representing the time when the task started.

This interface also supports the following properties:

- `PerformanceLongTaskTiming.attribution` (read-only) (experimental) (non-standard)
    Returns a sequence of `TaskAttributionTiming` instances.

## Instance methods

- `PerformanceLongTaskTiming.toJSON()` (experimental) (non-standard)
    Returns a JSON-serializable plain object representing the `PerformanceLongTaskTiming` object. Automatically called by `JSON.stringify()`.

## Description

Long tasks that block the main thread for 50ms or more cause, among other issues:

- Delayed Time to interactive (TTI).
- High/variable input latency.
- High/variable event handling latency.
- Janky animations and scrolling.

A long task is any uninterrupted period where the main UI thread is busy for 50ms or longer. Common examples include:

- Long-running event handlers.
- Expensive reflows and other re-renders.
- Work the browser does between different turns of the event loop that exceeds 50 ms.

Long tasks refer to "culprit browsing context container", or "the container" for short, which is the top-level page, ``, `` or `<object>` that the task occurred within.

For tasks that don't occur within the top-level page and for figuring out which container is responsible for the long task, the `TaskAttributionTiming` interface provides the `containerId`, `containerName` and `containerSrc` properties, which may provide more information about the source of the task.

## Examples

### Getting long tasks

To get long task timing information, create a `PerformanceObserver` instance and then call its `observe()` method, passing in `"longtask"` as the value of the `type` option. You also need to set `buffered` to `true` to get access to long tasks the user agent buffered while constructing the document. The `PerformanceObserver` object's callback will then be called with a list of `PerformanceLongTaskTiming` objects which you can analyze.

```js
const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    console.log(entry);
  });
});

observer.observe({ type: "longtask", buffered: true });
```

## See also

- `TaskAttributionTiming`
