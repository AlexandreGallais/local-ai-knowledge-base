---
title: "PerformanceObserverEntryList: getEntriesByName() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performanceobserverentrylist/getentriesbyname/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceObserverEntryList: getEntriesByName() method

The **`getEntriesByName()`** method of the `PerformanceObserverEntryList` interface returns a list of explicitly observed `PerformanceEntry` objects for a given `name` and `entryType`. The list's members are determined by the set of `entry types` specified in the call to the `observe()` method. The list is available in the observer's callback function (as the first parameter in the callback).

## Syntax

```js
getEntriesByName(name)
getEntriesByName(name, type)
```

### Parameters

- `name`
    A string representing the name of the entry to retrieve.
- `type` (optional)
    A string representing the type of entry to retrieve such as `"mark"`. The valid entry types are listed in `PerformanceEntry.entryType`.

### Return value

A list of explicitly _observed_ `performance entry` objects that have the specified `name` and `type`. If the `type` argument is not specified, only the `name` will be used to determine the entries to return. The items will be in chronological order based on the entries' `startTime`. If no objects meet the specified criteria, an empty list is returned.

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
