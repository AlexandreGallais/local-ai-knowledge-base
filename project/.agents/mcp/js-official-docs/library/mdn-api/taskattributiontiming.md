---
title: "TaskAttributionTiming"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/taskattributiontiming/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TaskAttributionTiming

The **`TaskAttributionTiming`** interface returns information about the work involved in a long task and its associate frame context. The frame context, also called the container, is the iframe, embed or object that is being implicated, on the whole, for a long task.

You usually work with `TaskAttributionTiming` objects when observing long tasks.

`TaskAttributionTiming` inherits from `PerformanceEntry`.

## Instance properties

This interface extends the following `PerformanceEntry` properties for event timing performance entry types by qualifying them as follows:

- `PerformanceEntry.duration` (read-only) (experimental)
    Always returns `0`, as `duration` is not applicable for this interface.
- `PerformanceEntry.entryType` (read-only) (experimental)
    Always returns `taskattribution`.
- `PerformanceEntry.name` (read-only) (experimental)
    Always returns `"unknown"`.
- `PerformanceEntry.startTime` (read-only) (experimental)
    Always returns `0`.

This interface also supports the following properties:

- `TaskAttributionTiming.containerType` (read-only) (experimental) (non-standard)
    Returns the type of frame container, one of `iframe`, `embed`, or `object`.
- `TaskAttributionTiming.containerSrc` (read-only) (experimental) (non-standard)
    Returns the container's `src` attribute.
- `TaskAttributionTiming.containerId` (read-only) (experimental) (non-standard)
    Returns the container's `id` attribute.
- `TaskAttributionTiming.containerName` (read-only) (experimental) (non-standard)
    Returns the container's `name` attribute.

## Instance methods

- `TaskAttributionTiming.toJSON()` (experimental) (non-standard)
    Returns a JSON-serializable plain object representing the `TaskAttributionTiming` object. Automatically called by `JSON.stringify()`.

## See also

- `PerformanceLongTaskTiming`
