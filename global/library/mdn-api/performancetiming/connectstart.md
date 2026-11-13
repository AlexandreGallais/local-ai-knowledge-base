---
title: "PerformanceTiming: connectStart property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performancetiming/connectstart/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceTiming: connectStart property

> **Warning:**
> This interface of this property is deprecated in the Navigation Timing Level 2 specification. Please use the `PerformanceNavigationTiming`
> interface instead.

The legacy
**`PerformanceTiming.connectStart`**
read-only property returns an `unsigned long long` representing the moment,
in milliseconds since the UNIX epoch, where the request to open a connection is sent to
the network. If the transport layer reports an error and the connection establishment is
started again, the last connection establishment start time is given. If a persistent
connection is used, the value will be the same as
`PerformanceTiming.fetchStart`.

## Value

An `unsigned long long`.

## See also

- The `PerformanceTiming` interface it belongs to.
