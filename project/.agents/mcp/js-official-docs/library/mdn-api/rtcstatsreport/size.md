---
title: "RTCStatsReport: size property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcstatsreport/size/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCStatsReport: size property

The **`size`** read-only property of the `RTCStatsReport` interface returns the number of items in the current report.

Note that each item consists of a key-value pair, where the keys are unique `id` values for monitored statistics objects from which the statistics are derived, and the associated values are statistics dictionary objects.

This property is otherwise the same as `Map.prototype.size`.

## Value

An integer indicating the number of items in this report.
The value is zero if the report is empty.

## See also

- `Map`
