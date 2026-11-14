---
title: "Performance"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performance/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Performance

The **`Performance`** interface provides access to performance-related information for the current page.

Performance entries are specific to each execution context. You can access performance information for code running in a window via `Window.performance`, and for code running in a worker via `WorkerGlobalScope.performance`.

## Instance properties

_The `Performance` interface doesn't inherit any properties._

- `Performance.eventCounts` (read-only)
    An `EventCounts` map containing the number of events which have been dispatched per event type.
- `Performance.interactionCount` (read-only)
    The number of real-user interactions that have occurred on the page, which is useful when calculating Interaction to Next Paint (INP).
- `Performance.navigation` (read-only) (deprecated)
    A legacy `PerformanceNavigation` object that provides useful context about the operations included in the times listed in `timing`, including whether the page was a load or a refresh, how many redirections occurred, and so forth.
- `Performance.timing` (read-only) (deprecated)
    A legacy `PerformanceTiming` object containing latency-related performance information.
- `Performance.memory` (read-only) (non-standard) (deprecated)
    A _non-standard_ extension added in Chrome, this property provides an object with basic <example-value> usage information. _You **should not use** this non-standard API._
- `Performance.timeOrigin` (read-only)
    Returns the high resolution timestamp of the start time of the performance measurement.

## Instance methods

_The `Performance` interface doesn't inherit any methods._

- `Performance.clearMarks()`
    Removes the given _mark_ from the browser's performance entry buffer.
- `Performance.clearMeasures()`
    Removes the given _measure_ from the browser's performance entry buffer.
- `Performance.clearResourceTimings()`
    Removes all performance entries with an `entryType` of `"resource"` from the browser's performance data buffer.
- `Performance.getEntries()`
    Returns a list of `PerformanceEntry` objects based on the given _filter_.
- `Performance.getEntriesByName()`
    Returns a list of `PerformanceEntry` objects based on the given _name_ and _entry type_.
- `Performance.getEntriesByType()`
    Returns a list of `PerformanceEntry` objects of the given _entry type_.
- `Performance.mark()`
    Creates a `timestamp` in the browser's _performance entry buffer_ with the given name.
- `Performance.measure()`
    Creates a named `timestamp` in the browser's performance entry buffer between two specified marks (known as the _start mark_ and _end mark_, respectively).
- `Performance.measureUserAgentSpecificMemory()` (experimental)
    Estimates the memory usage of a web application including all its iframes and workers.
- `Performance.now()`
    Returns a `DOMHighResTimeStamp` representing the number of milliseconds elapsed since a reference instant.
- `Performance.setResourceTimingBufferSize()`
    Sets the browser's resource timing buffer size to the specified number of `"resource"` `type` `PerformanceEntry` objects.
- `Performance.toJSON()`
    Returns a JSON-serializable plain object representing the `Performance` object. Automatically called by `JSON.stringify()`.

## Events

Listen to these events using `addEventListener()` or by assigning an event listener to the `oneventname` property of this interface.

- `resourcetimingbufferfull`
    Fired when the browser's resource timing buffer is full.
