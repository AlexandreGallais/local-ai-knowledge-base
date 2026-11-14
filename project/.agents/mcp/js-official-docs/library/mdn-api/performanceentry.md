---
title: "PerformanceEntry"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performanceentry/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceEntry

The **`PerformanceEntry`** object encapsulates a single performance metric that is part of the browser's performance timeline.

The Performance API offers built-in metrics which are specialized subclasses of `PerformanceEntry`. This includes entries for resource loading, event timing, and more.

A performance entry can also be created by calling the `Performance.mark()` or `Performance.measure()` methods at an explicit point in an application. This allows you to add your own metrics to the performance timeline.

The `PerformanceEntry` instances will always be one of the following subclasses:

- `InteractionContentfulPaint` (experimental)
- `LargestContentfulPaint`
- `LayoutShift` (experimental)
- `PerformanceContainerTiming` (experimental)
- `PerformanceElementTiming` (experimental)
- `PerformanceEventTiming`
- `PerformanceLongAnimationFrameTiming` (experimental)
- `PerformanceLongTaskTiming` (experimental)
- `PerformanceMark`
- `PerformanceMeasure`
- `PerformanceNavigationTiming`
- `PerformancePaintTiming`
- `PerformanceResourceTiming`
- `PerformanceScriptTiming` (experimental)
- `PerformanceSoftNavigation` (experimental)
- `TaskAttributionTiming` (experimental)
- `VisibilityStateEntry`

## Instance properties

- `PerformanceEntry.name` (read-only)
    A string representing the name for a performance entry. The value depends on the subtype.
- `PerformanceEntry.duration` (read-only)
    A `DOMHighResTimeStamp` representing the duration of the performance entry.
- `PerformanceEntry.entryType` (read-only)
    A string representing the type of performance metric. For example, `"mark"` when `PerformanceMark` is used.
- `PerformanceEntry.navigationId` (read-only) (experimental)
    The ID of the navigation the performance entry was emitted under.
- `PerformanceEntry.startTime` (read-only)
    A `DOMHighResTimeStamp` representing the starting time for the performance metric.

## Instance methods

- `PerformanceEntry.toJSON()`
    Returns a JSON-serializable plain object representing the `PerformanceEntry` object. Automatically called by `JSON.stringify()`.

## Examples

### Working with performance entries

The following example creates `PerformanceEntry` objects that are of the types `PerformanceMark` and `PerformanceMeasure`.
The `PerformanceMark` and `PerformanceMeasure` subclasses inherit the `duration`, `entryType`, `name`, and `startTime` properties from `PerformanceEntry` and set them to their appropriate values.

```js
// Place at a location in the code that starts login
performance.mark("login-started");

// Place at a location in the code that finishes login
performance.mark("login-finished");

// Measure login duration
performance.measure("login-duration", "login-started", "login-finished");

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
