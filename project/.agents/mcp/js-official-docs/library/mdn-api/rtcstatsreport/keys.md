---
title: "RTCStatsReport: keys() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcstatsreport/keys/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCStatsReport: keys() method

The **`keys()`** method of the `RTCStatsReport` interface returns a new _iterator_ object that can be used to iterate through the keys for each element in the `RTCStatsReport` object, in insertion order.

The keys in the `RTCStatsReport` are unique string `id` values, which represent the monitored statistics objects from which the statistics are derived.

The method is otherwise the same as `Map.prototype.keys()`.

## Syntax

```js
keys()
```

### Parameters

None.

### Return value

A new iterable iterator object.

## Examples

This example shows how to iterate through a `RTCStatsReport` using the iterator returned by `keys()`.

Given a variable `myPeerConnection`, which is an instance of `RTCPeerConnection`, the code calls `getStats()` with `await` to wait for the statistics report.
It then uses a for...of loop, with the iterator returned by `keys()`, to iterate through the IDs.
Each ID is used to get the corresponding statistics dictionary.
The properties of statistics objects with the `type` of `outbound-rtp` are logged to the console (other objects are discarded).

```js
const stats = await myPeerConnection.getStats();

for (const id of stats.keys()) {
  // Get dictionary associated with key (id)
  const stat = stats.get(id);
  if (stat.type !== "outbound-rtp") continue;
  Object.keys(stat).forEach((statName) => {
    console.log(`${statName}: ${stat[statName]}`);
  });
}
```

Note that this examples is somewhat contrived.
You could more easily iterate with `entries()` or `values()` and not have to map the ID to a value.
You can even iterate the `RTCStatsReport` itself, as it has the `[Symbol.iterator]()` method!

## See also

- `Map.prototype.keys()`
- `RTCStatsReport.values()`
- `RTCStatsReport.entries()`
