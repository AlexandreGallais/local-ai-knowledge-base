---
title: "Performance: getEntriesByType() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performance/getentriesbytype/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Performance: getEntriesByType() method

The **`getEntriesByType()`** method returns an array of `PerformanceEntry` objects currently present in the performance timeline for a given _type_.

If you are interested in performance entries of certain name, see `getEntriesByName()`. For all performance entries, see `getEntries()`.

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
getEntriesByType(type)
```

### Parameters

- `type`
    The type of entry to retrieve such as `"mark"`. The valid entry types are listed in `PerformanceEntry.entryType`. The supported `entryTypes` can be retrieved using the static property `PerformanceObserver.supportedEntryTypes`.

### Return value

An `Array` of `PerformanceEntry` objects that have the specified `type`. The items will be in chronological order based on the entries' `startTime`. If no objects have the specified `type`, or no argument is provided, an empty array is returned.

## Examples

### Logging resource entries

The following example logs all entries with the type `"resource"`.

```js
const resources = performance.getEntriesByType("resource");
resources.forEach((entry) => {
  console.log(`${entry.name}'s startTime: ${entry.startTime}`);
});
```

## See also

- `Performance.getEntries()`
- `Performance.getEntriesByName()`
- `PerformanceObserver.supportedEntryTypes`
