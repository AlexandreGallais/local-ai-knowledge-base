---
title: "RTCStatsReport: values() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcstatsreport/values/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCStatsReport: values() method

The **`values()`** method of the `RTCStatsReport` interface returns a new _iterator_ object that can be used to iterate through the values for each element in the `RTCStatsReport` object, in insertion order.

The values are statistics dictionary objects.

The method is otherwise the same as `Map.prototype.values()`.

## Syntax

```js
values()
```

### Parameters

None.

### Return value

A new iterable iterator object.

## Examples

This example shows how to iterate through a `RTCStatsReport` using the iterator returned by `values()`.

Given a variable `myPeerConnection`, which is an instance of `RTCPeerConnection`, the code calls `getStats()` with `await` to wait for the statistics report.
It then uses a for...of loop, with the iterator returned by `values()`, to iterate through the dictionary objects in the report.
The properties of statistics objects with the `type` of `outbound-rtp` are logged to the console (other objects are discarded).

```js
const stats = await myPeerConnection.getStats();

for (const stat of stats.values()) {
  if (stat.type !== "outbound-rtp") continue;
  Object.keys(stat).forEach((statName) => {
    console.log(`${statName}: ${stat[statName]}`);
  });
}
```

## See also

- `Map.prototype.values()`
- `RTCStatsReport.keys()`
- `RTCStatsReport.entries()`
