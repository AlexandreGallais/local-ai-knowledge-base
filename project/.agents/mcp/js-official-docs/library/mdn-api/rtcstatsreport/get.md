---
title: "RTCStatsReport: get() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcstatsreport/get/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCStatsReport: get() method

The **`get()`** method of the `RTCStatsReport` interface returns a specified element from an `RTCStatsReport`.

Elements in the `RTCStatsReport` are identified by unique `id` values, which represent the monitored statistics objects from which the statistics are derived.
The element returned will be an instance of one of the statistics dictionary objects, and it will contain statistics for the object with the given `id`.
The fetched value is a reference to the statistics dictionary, and any change made to that object will effectively modify it inside the `RTCStatsReport` object.

The method is otherwise the same as `Map.prototype.get()`.

## Syntax

```js
get(id)
```

### Parameters

- `id`
    A string indicating the ID of the element to return from the `RTCStatsReport` object.
    IDs are unique strings that identify the monitored object from which the corresponding statistics are derived.

### Return value

The element associated with the specified `id` key, or `undefined` if the key can't be found in the `Map` object.

## See also

- `Map.prototype.get()`
