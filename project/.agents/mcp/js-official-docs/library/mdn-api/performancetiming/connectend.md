---
title: "PerformanceTiming: connectEnd property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performancetiming/connectend/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceTiming: connectEnd property

> **Warning:**
> This interface of this property is deprecated in the Navigation Timing Level 2 specification. Please use the `PerformanceNavigationTiming`
> interface instead.

The legacy
**`PerformanceTiming.connectEnd`**
read-only property returns an `unsigned long long` representing the moment,
in milliseconds since the UNIX epoch, where the connection is opened network. If the
transport layer reports an error and the connection establishment is started again, the
last connection establishment end time is given. If a persistent connection is used, the
value will be the same as `PerformanceTiming.fetchStart`. A connection is
considered as opened when all secure connection handshake, or SOCKS authentication, is
terminated.

## Value

An `unsigned long long`.

## See also

- The `PerformanceTiming` interface it belongs to.
