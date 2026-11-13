---
title: "RTCStatsReport: [Symbol.iterator]() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcstatsreport/symbol.iterator/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCStatsReport: [Symbol.iterator]() method

The **`Symbol.iterator`** method of the `RTCStatsReport` interface implements the iterable protocol and allows statistics reports to be consumed by most syntaxes expecting iterables, such as the spread syntax and `for...of` loops.
It returns an iterator object that yields the key-value pairs of the report in insertion order.

The initial value of this property is the same function object as the initial value of the `RTCStatsReport.entries()` method.

The method is otherwise the same as `Map.prototype[Symbol.iterator]()`.

## Syntax

```js
RTCStatsReport[Symbol.iterator]()
```

### Parameters

None.

### Return value

The same return value as `RTCStatsReport.entries()`.
This is a new iterable iterator object that yields the key-value (`id`-"statistics dictionary") pairs of the report.

## See also

- `RTCStatsReport.entries()`
- `Map.prototype[Symbol.iterator]()`
