---
title: "Performance: clearMeasures() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performance/clearmeasures/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Performance: clearMeasures() method

The **`clearMeasures()`** method removes all or specific `PerformanceMeasure` objects from the browser's performance timeline.

## Syntax

```js
clearMeasures()
clearMeasures(name)
```

### Parameters

- `name` (optional)
    A string representing the `name` of the `PerformanceMeasure` object. If this argument is omitted, all entries with an `entryType` of `"measure"` will be removed.

### Return value

None (`undefined`).

## Examples

### Removing measures

To clean up all performance measure, or just specific entries, use the `clearMeasures()` method like this:

```js
// Create a bunch of measures
performance.measure("from navigation");
performance.mark("a");
performance.measure("from mark a", "a");
performance.measure("from navigation");
performance.measure("from mark a", "a");
performance.mark("b");
performance.measure("between a and b", "a", "b");

performance.getEntriesByType("measure").length; // 5

// Delete just the "from navigation" measure entries
performance.clearMeasures("from navigation");
performance.getEntriesByType("measure").length; // 3

// Delete all of the measure entries
performance.clearMeasures();
performance.getEntriesByType("measure").length; // 0
```

## See also

- `PerformanceMeasure`
