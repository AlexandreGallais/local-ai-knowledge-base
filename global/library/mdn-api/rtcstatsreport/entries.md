---
title: "RTCStatsReport: entries() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcstatsreport/entries/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCStatsReport: entries() method

The **`entries()`** method of the `RTCStatsReport` interface returns a new iterator object that can be used to iterate through the key/value pairs for each element in the `RTCStatsReport` object, in insertion order.

The keys are unique `id` values for monitored statistics objects from which the statistics are derived, and the associated values are statistics dictionary objects.

The method is otherwise the same as `Map.prototype.entries()`.

## Syntax

```js
entries()
```

### Parameters

None.

### Return value

A new iterable iterator object.

## Examples

This example shows how to iterate through a `RTCStatsReport` using the iterator returned by `entries()`.

Given a variable `myPeerConnection`, which is an instance of `RTCPeerConnection`, the code calls `getStats()` with `await` to wait for the statistics report.
It then uses a for...of loop, with the iterator returned by `entries()`, to iterate through the entries.
The properties of statistics objects with the `type` of `outbound-rtp` are logged to the console (other objects are discarded).

```js
const stats = await myPeerConnection.getStats();

for (const [id, stat] of stats.entries()) {
  if (stat.type !== "outbound-rtp") continue;
  Object.keys(stat).forEach((statName) => {
    console.log(`${statName}: ${stat[statName]}`);
  });
}
```

## See also

- `Map.prototype.entries()`
- `RTCStatsReport.values()`
- `RTCStatsReport.keys()`
