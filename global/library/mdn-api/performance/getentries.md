---
title: "Performance: getEntries() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performance/getentries/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Performance: getEntries() method

The **`getEntries()`** method returns an array of all `PerformanceEntry` objects currently present in the performance timeline.

If you are only interested in performance entries of certain types or that have certain names, see `getEntriesByType()` and `getEntriesByName()`.

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
getEntries()
```

### Parameters

None.

### Return value

An `Array` of `PerformanceEntry` objects. The items will be in chronological order based on the entries' `startTime`.

## Examples

### Logging all performance markers and measures

Assuming you created your own `PerformanceMark` and `PerformanceMeasure` objects at appropriate places in your code, you might want to log all them to the console like this:

```js
// Example markers/measures
performance.mark("login-started");
performance.mark("login-finished");
performance.mark("form-sent");
performance.mark("video-loaded");
performance.measure("login-duration", "login-started", "login-finished");

const entries = performance.getEntries();

entries.forEach((entry) => {
  if (entry.entryType === "mark") {
    console.log(`${entry.name}'s startTime: ${entry.startTime}`);
  }
  if (entry.entryType === "measure") {
    console.log(`${entry.name}'s duration: ${entry.duration}`);
  }
});
```

## See also

- `Performance.getEntriesByType()`
- `Performance.getEntriesByName()`
