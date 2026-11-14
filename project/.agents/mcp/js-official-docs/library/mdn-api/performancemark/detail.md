---
title: "PerformanceMark: detail property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performancemark/detail/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceMark: detail property

The read-only **`detail`** property returns arbitrary metadata that was included in the mark upon construction (either when using `performance.mark()` or the `PerformanceMark()` constructor).

## Value

Returns the value it is set to (from `markOptions` of `performance.mark()` or the `PerformanceMark()` constructor).

## Examples

The following example demonstrates the `detail` property.

```js
performance.mark("dog", { detail: "labrador" });

const dogEntries = performance.getEntriesByName("dog");

dogEntries[0].detail; // labrador
```
