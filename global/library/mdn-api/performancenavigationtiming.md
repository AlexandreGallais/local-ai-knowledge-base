---
title: "PerformanceNavigationTiming"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performancenavigationtiming/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceNavigationTiming

The **`PerformanceNavigationTiming`** interface provides methods and properties to store and retrieve metrics regarding the browser's document navigation events. For example, this interface can be used to determine how much time it takes to load or unload a document.

Only the current document is included in the performance timeline, so there is only one `PerformanceNavigationTiming` object in the performance timeline. It inherits all of the properties and methods of `PerformanceResourceTiming` and `PerformanceEntry`.

The following diagram shows all of the timestamp properties defined in `PerformanceNavigationTiming`.

## Instance properties

This interface extends the following `PerformanceEntry` properties by qualifying and constraining them as follows:

- `PerformanceEntry.entryType` (read-only)
    Returns `"navigation"`.
- `PerformanceEntry.name` (read-only)
    Returns the document's URL.
    Note that text fragments, and any other fragment directives, are stripped from the URL.
- `PerformanceEntry.startTime` (read-only)
    Returns a `DOMHighResTimeStamp` with a value of `0`.
- `PerformanceEntry.duration` (read-only)
    Returns a `timestamp` that is the difference between the `PerformanceNavigationTiming.loadEventEnd` and `PerformanceEntry.startTime` properties.

This interface also extends the following `PerformanceResourceTiming` properties by qualifying and constraining them as follows:

- `PerformanceResourceTiming.initiatorType` (read-only)
    Returns `"navigation"`.

The interface also supports the following properties:

- `PerformanceNavigationTiming.activationStart` (read-only) (experimental)
    A `DOMHighResTimeStamp` representing the time between when a document starts prerendering and when it is activated.
- `PerformanceNavigationTiming.confidence` (read-only) (experimental)
    A `PerformanceTimingConfidence` object containing information that indicates whether a performance record reflects typical application performance, or is likely affected by external factors.
- `PerformanceNavigationTiming.criticalCHRestart` (read-only) (experimental)
    A `DOMHighResTimeStamp` representing the time at which the connection restart occurred due to `Critical-CH` HTTP response header mismatch.
- `PerformanceNavigationTiming.domComplete` (read-only)
    A `DOMHighResTimeStamp` representing the time immediately before the user agent sets the document's `readyState` to `"complete"`.
- `PerformanceNavigationTiming.domContentLoadedEventEnd` (read-only)
    A `DOMHighResTimeStamp` representing the time immediately after the current document's `DOMContentLoaded` event handler completes.
- `PerformanceNavigationTiming.domContentLoadedEventStart` (read-only)
    A `DOMHighResTimeStamp` representing the time immediately before the current document's `DOMContentLoaded` event handler starts.
- `PerformanceNavigationTiming.domInteractive` (read-only)
    A `DOMHighResTimeStamp` representing the time immediately before the user agent sets the document's `readyState` to `"interactive"`.
- `PerformanceNavigationTiming.loadEventEnd` (read-only)
    A `DOMHighResTimeStamp` representing the time immediately after the current document's `load` event handler completes.
- `PerformanceNavigationTiming.loadEventStart` (read-only)
    A `DOMHighResTimeStamp` representing the time immediately before the current document's `load` event handler starts.
- `PerformanceNavigationTiming.notRestoredReasons` (read-only) (experimental)
    A `NotRestoredReasons` object providing report data on reasons why the current document was blocked from using the back/forward cache (bfcache) on navigation.
- `PerformanceNavigationTiming.redirectCount` (read-only)
    A number representing the number of redirects since the last non-redirect navigation in the current browsing context.
- `PerformanceNavigationTiming.type` (read-only)
    A string representing the navigation type. Either `"navigate"`, `"reload"`, or `"back_forward"`.
- `PerformanceNavigationTiming.unloadEventEnd` (read-only)
    A `DOMHighResTimeStamp` representing the time immediately after the current document's `unload` event handler completes.
- `PerformanceNavigationTiming.unloadEventStart` (read-only)
    A `DOMHighResTimeStamp` representing the time immediately before the current document's `unload` event handler starts.

## Instance methods

- `PerformanceNavigationTiming.toJSON()`
    Returns a JSON-serializable plain object representing the `PerformanceNavigationTiming` object. Automatically called by `JSON.stringify()`.

## See also

- `Performance.navigation`
- `PerformanceNavigation`
