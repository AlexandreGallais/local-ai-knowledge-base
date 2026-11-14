---
title: "PerformanceObserverEntryList: getEntries() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performanceobserverentrylist/getentries/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceObserverEntryList: getEntries() method

The **`getEntries()`** method of the `PerformanceObserverEntryList` interface returns a list of explicitly observed `performance entry` objects. The list's members are determined by the set of `entry types` specified in the call to the `observe()` method. The list is available in the observer's callback function (as the first parameter in the callback).

## Syntax

```js
getEntries()
```

### Parameters

None.

### Return value

A list of explicitly observed `PerformanceEntry` objects. The items will be in chronological order based on the entries' `startTime`. If no objects are found, an empty list is returned.

## Examples

### Working with getEntries, getEntriesByName and getEntriesByType

The following example shows the difference between the `getEntries()`, `getEntriesByName()`, and `getEntriesByType()` methods.

```js
const observer = new PerformanceObserver((list, obs) => {
  // Log all entries
  let perfEntries = list.getEntries();
  perfEntries.forEach((entry) => {
    console.log(`${entry.name}'s duration: ${entry.duration}`);
  });

  // Log entries named "debugging" with type "measure"
  perfEntries = list.getEntriesByName("debugging", "measure");
  perfEntries.forEach((entry) => {
    console.log(`${entry.name}'s duration: ${entry.duration}`);
  });

  // Log entries with type "mark"
  perfEntries = list.getEntriesByType("mark");
  perfEntries.forEach((entry) => {
    console.log(`${entry.name}'s startTime: ${entry.startTime}`);
  });
});

// Subscribe to various performance event types
observer.observe({
  entryTypes: ["mark", "measure", "navigation", "resource"],
});
```
