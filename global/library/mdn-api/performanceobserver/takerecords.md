---
title: "PerformanceObserver: takeRecords() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performanceobserver/takerecords/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceObserver: takeRecords() method

The **`takeRecords()`** method of the `PerformanceObserver` interface returns the current list of `PerformanceEntry` objects stored in the performance observer, emptying it out.

## Syntax

```js
takeRecords()
```

### Parameters

None.

### Return value

A list of `PerformanceEntry` objects.

## Examples

### Taking records

The following example stores the current list of performance entries into `records` and empties the performance observer.

```js
const observer = new PerformanceObserver((list, obj) => {
  list.getEntries().forEach((entry) => {
    // Process "mark" and "measure" events
  });
});
observer.observe({ entryTypes: ["mark", "measure"] });
const records = observer.takeRecords();
console.log(records[0].name);
console.log(records[0].startTime);
console.log(records[0].duration);
```
