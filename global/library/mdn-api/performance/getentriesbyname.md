---
title: "Performance: getEntriesByName() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performance/getentriesbyname/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Performance: getEntriesByName() method

The **`getEntriesByName()`** method returns an array of `PerformanceEntry` objects currently present in the performance timeline with the given _name_ and _type_.

If you are interested in performance entries of certain types, see `getEntriesByType()`. For all performance entries, see `getEntries()`.

> **Note:**
> This method does not notify you about new performance entries; you will only get entries that are present in the performance timeline at the time you call this method.
> To receive notifications about entries as they become available, use a `PerformanceObserver`.

The following entry types are not supported by this method at all and won't be returned even if entries for these types might exist:

- `"container"` (`PerformanceContainerTiming`)
- `"element"` (`PerformanceElementTiming`)
- `"event"` (`PerformanceEventTiming`)
- `"largest-contentful-paint"` (`LargestContentfulPaint`)
- `"layout-shift"` (`LayoutShift`)
- `"longtask"` (`PerformanceLongTaskTiming`)

To access entries of these types, you must use a `PerformanceObserver` instead.

## Syntax

```js
getEntriesByName(name)
getEntriesByName(name, type)
```

### Parameters

- `name`
    The name of the entries to retrieve.
- `type` (optional)
    The type of entries to retrieve such as `"mark"`. The valid entry types are
    listed in `PerformanceEntry.entryType`.

### Return value

An `Array` of `PerformanceEntry` objects that have the specified `name` and `type`.
The items will be in chronological order based on the entries' `startTime`. If no objects meet the
specified criteria, an empty array is returned.

## Examples

### Logging performance markers

The following example logs all `PerformanceMark` objects named `"debug-mark"`.

```js
const debugMarks = performance.getEntriesByName("debug-mark", "mark");
debugMarks.forEach((entry) => {
  console.log(`${entry.name}'s startTime: ${entry.startTime}`);
});
```

## See also

- `Performance.getEntries()`
- `Performance.getEntriesByType()`
