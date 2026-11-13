---
title: "Performance: clearResourceTimings() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performance/clearresourcetimings/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Performance: clearResourceTimings() method

The **`clearResourceTimings()`** method removes all performance entries with an `entryType` of `"resource"` from the browser's performance timeline and sets the size of the performance resource data buffer to zero.

To set the size of the browser's performance resource data buffer, use the
`Performance.setResourceTimingBufferSize()` method.

To get notified when the browser's resource timing buffer is full, listen for the `resourcetimingbufferfull` event.

## Syntax

```js
clearResourceTimings()
```

### Parameters

None.

### Return value

None (`undefined`).

## Examples

### Clearing the performance resource data buffer

To remove all resource performance entries from the buffer, call the `clearResourceTimings()` at an appropriate point in your code or paste it into the console.

```js
performance.clearResourceTimings();
performance.getEntriesByType("resource").length; // 0
```

### Taking records and emptying performance observers

When using `PerformanceObserver` objects (especially with the `buffered` flag set to `true`), the performance resource buffer might get full quickly. However, instead of clearing the buffer, you can also store the current list of performance entries and empty the performance observer using the `PerformanceObserver.takeRecords()` method. This works with all kinds of performance entry types, not just `"resource"` entries.

```js
function perfObserver(list, observer) {
  list.getEntries().forEach((entry) => {
    // do something with the entries
  });
}
const observer = new PerformanceObserver(perfObserver);
observer.observe({ type: "resource", buffered: true });

// Store entries and empty performance observer
const records = observer.takeRecords();
```

## See also

- `Performance.setResourceTimingBufferSize()`
- `resourcetimingbufferfull`
