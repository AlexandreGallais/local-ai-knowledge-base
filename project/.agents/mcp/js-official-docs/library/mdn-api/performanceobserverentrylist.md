---
title: "PerformanceObserverEntryList"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performanceobserverentrylist/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceObserverEntryList

The **`PerformanceObserverEntryList`** interface is a list of `performance events` that were explicitly observed via the `observe()` method.

## Instance methods

- `PerformanceObserverEntryList.getEntries()`
    Returns a list of all explicitly observed `PerformanceEntry` objects.
- `PerformanceObserverEntryList.getEntriesByType()`
    Returns a list of all explicitly observed `PerformanceEntry` objects of the given entry type.
- `PerformanceObserverEntryList.getEntriesByName()`
    Returns a list of all explicitly observed `PerformanceEntry` objects based on the given name and entry type.

## Examples

### Using PerformanceObserverEntryList

In the following example, `list` is the `PerformanceObserverEntryList` object. The `getEntries()` method is called to get all explicitly observed `PerformanceEntry` objects which are "measure" and "mark" in this case.

```js
function perfObserver(list, observer) {
  list.getEntries().forEach((entry) => {
    if (entry.entryType === "mark") {
      console.log(`${entry.name}'s startTime: ${entry.startTime}`);
    }
    if (entry.entryType === "measure") {
      console.log(`${entry.name}'s duration: ${entry.duration}`);
    }
  });
}
const observer = new PerformanceObserver(perfObserver);
observer.observe({ entryTypes: ["measure", "mark"] });
```
