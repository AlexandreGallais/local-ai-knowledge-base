---
title: "PerformanceTiming: requestStart property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performancetiming/requeststart/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceTiming: requestStart property

> **Warning:**
> This interface of this property is deprecated in the Navigation Timing Level 2 specification. Please use the `PerformanceNavigationTiming`
> interface instead.

The legacy
**`PerformanceTiming.requestStart`**
read-only property returns an `unsigned long long` representing the moment,
in milliseconds since the UNIX epoch, when the browser sent the request to obtain the
actual document, from the server or from a cache. If the transport layer fails after the
start of the request and the connection is reopened, this property will be set to the
time corresponding to the new request.

## Value

An `unsigned long long`.

## See also

- The `PerformanceTiming` interface it belongs to.
