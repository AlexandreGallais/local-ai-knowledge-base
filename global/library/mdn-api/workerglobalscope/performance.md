---
title: "WorkerGlobalScope: performance property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/workerglobalscope/performance/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WorkerGlobalScope: performance property

The **`performance`** read-only property of the `WorkerGlobalScope` interface returns a `Performance` object, which can be used to gather performance information about code running in the worker's scope.

Performance entries are per context. If you create a mark on a worker thread, you will not see it in the main thread or any other workers.

Note that only the following performance interfaces are available in worker contexts:

- `Performance`
- `PerformanceEntry`
- `PerformanceMark`
- `PerformanceMeasure`
- `PerformanceObserver`
- `PerformanceObserverEntryList`
- `PerformanceResourceTiming`
- `PerformanceServerTiming`

## Value

A `Performance` object offering access to performance and timing-related information for the context it is called on.

## See also

- `Window.performance`
