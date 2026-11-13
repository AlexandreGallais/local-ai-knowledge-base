---
title: "PerformanceMeasure: detail property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performancemeasure/detail/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceMeasure: detail property

The read-only **`detail`** property returns arbitrary metadata that was included in the measure upon construction (when using `performance.measure()`).

## Value

Returns the value it was set to (from `measureOptions` of `performance.measure()`).

## Examples

The following example demonstrates the `detail` property.

```js
performance.measure("dog", { detail: "labrador", start: 0, end: 12345 });

const dogEntries = performance.getEntriesByName("dog");

dogEntries[0].detail; // labrador
```
