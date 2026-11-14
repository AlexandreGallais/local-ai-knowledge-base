---
title: "PerformanceTiming: loadEventStart property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performancetiming/loadeventstart/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceTiming: loadEventStart property

> **Warning:**
> This interface of this property is deprecated in the Navigation Timing Level 2 specification. Please use the `PerformanceNavigationTiming`
> interface's `PerformanceNavigationTiming.loadEventStart` read-only property instead.

The legacy
**`PerformanceTiming.loadEventStart`**
read-only property returns an `unsigned long long` representing the moment,
in milliseconds since the UNIX epoch, when the `load` event was sent for the
current document. If this event has not yet been sent, it returns `0`.

## Value

An `unsigned long long`.

## See also

- The `PerformanceTiming` interface it belongs to.
