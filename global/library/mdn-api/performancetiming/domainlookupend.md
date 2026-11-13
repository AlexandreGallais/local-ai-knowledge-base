---
title: "PerformanceTiming: domainLookupEnd property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performancetiming/domainlookupend/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceTiming: domainLookupEnd property

> **Warning:**
> This interface of this property is deprecated in the Navigation Timing Level 2 specification. Please use the `PerformanceNavigationTiming`
> interface instead.

The legacy
**`PerformanceTiming.domainLookupEnd`**
read-only property returns an `unsigned long long` representing the moment,
in milliseconds since the UNIX epoch, where the domain lookup is finished. If a
persistent connection is used, or the information is stored in a cache or a local
resource, the value will be the same as `PerformanceTiming.fetchStart`.

## Value

An `unsigned long long`.

## See also

- The `PerformanceTiming` interface it belongs to.
