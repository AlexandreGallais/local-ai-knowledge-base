---
title: "PerformanceTiming: domContentLoadedEventStart property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performancetiming/domcontentloadedeventstart/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceTiming: domContentLoadedEventStart property

> **Warning:**
> This interface of this property is deprecated in the Navigation Timing Level 2 specification. Please use the `PerformanceNavigationTiming`
> interface instead.

The legacy
**`PerformanceTiming.domContentLoadedEventStart`**
read-only property returns an `unsigned long long` representing the moment,
in milliseconds since the UNIX epoch, right before the parser sent the
`DOMContentLoaded` event, that is right after all the scripts that need to be
executed right after parsing has been executed.

## Value

An `unsigned long long`.

## See also

- The `PerformanceTiming` interface it belongs to.
