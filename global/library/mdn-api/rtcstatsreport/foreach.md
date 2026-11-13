---
title: "RTCStatsReport: forEach() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcstatsreport/foreach/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCStatsReport: forEach() method

The **`forEach()`** method of the `RTCStatsReport` interface executes a provided function once for each key/value pair in the `RTCStatsReport` object, in insertion order.

The keys are unique `id` values for the monitored statistics objects from which the statistics are derived, and the associated values are statistics dictionary objects.

The method is otherwise the same as `Map.prototype.forEach()`.

## Syntax

```js
forEach(callbackFn)
forEach(callbackFn, thisArg)
```

### Parameters

- `callbackFn`
    A function to execute for each entry in the report.
    The function is called with the following arguments:
    - `report`
        Statistics report for each iteration.
        This can be any of the statistics dictionary types.
    - `id`
        A unique string identifying the monitored object from which the statistics are derived.
    - `map`
        The report being iterated.

- `thisArg` (optional)
    A value to use as `this` when executing `callbackFn`.

### Return value

`undefined`.

## Examples

Given a variable `myPeerConnection`, which is an instance of `RTCPeerConnection`, the code calls `getStats()` with `await` to wait for the statistics report.
It then iterates the report using `RTCStatsReport.forEach()`, and filters the dictionaries for just those reports that have the `type` of `inbound-rtp` and `kind` of `video`.
For matching dictionaries it logs the `framesPerSecond` property of the inbound video.

```js
const stats = await myPeerConnection.getStats();

stats.forEach((report) => {
  if (report.type === "inbound-rtp" && report.kind === "video") {
    // Log the frame rate
    console.log(report.framesPerSecond);
  }
});
```

## See also

- `Map.prototype.forEach()`
