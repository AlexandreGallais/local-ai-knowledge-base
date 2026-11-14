---
title: "PerformanceTiming: unloadEventEnd property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performancetiming/unloadeventend/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceTiming: unloadEventEnd property

> **Warning:**
> This interface of this property is deprecated in the Navigation Timing Level 2 specification. Please use the `PerformanceNavigationTiming`
> interface instead.

The legacy
**`PerformanceTiming.unloadEventEnd`**
read-only property returns an `unsigned long long` representing the moment,
in milliseconds since the UNIX epoch, the `unload` event handler finishes. If
there is no previous document, or if the previous document, or one of the needed
redirects, is not of the same origin, the value returned is `0`.

## Value

An `unsigned long long`.

## See also

- The `PerformanceTiming` interface it belongs to.
