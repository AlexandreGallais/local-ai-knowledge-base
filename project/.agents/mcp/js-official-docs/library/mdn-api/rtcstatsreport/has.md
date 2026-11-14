---
title: "RTCStatsReport: has() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcstatsreport/has/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCStatsReport: has() method

The **`has()`** method of the `RTCStatsReport` interface returns a boolean indicating whether a report contains a statistics dictionary with the specified id.

The method is otherwise the same as `Map.prototype.has()`.

## Syntax

```js
has(id)
```

### Parameters

- `id`
    A string containing the ID of a statistics object that might be present in this `RTCStatsReport`.

### Return value

`true` if an element with the specified `id` exists in the `RTCStatsReport` object; otherwise `false`.

## See also

- `Map`
- `Map.prototype.set()`
- `Map.prototype.get()`
