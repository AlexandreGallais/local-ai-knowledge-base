---
title: "Performance: setResourceTimingBufferSize() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performance/setresourcetimingbuffersize/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Performance: setResourceTimingBufferSize() method

The **`setResourceTimingBufferSize()`** method sets the desired size of the browser's resource timing buffer which stores the `"resource"` performance entries.

The specification requires the resource timing buffer initially to be 250 or greater.

To clear the browser's performance resource data buffer, use the
`Performance.clearResourceTimings()` method.

To get notified when the browser's resource timing buffer is full, listen for the `resourcetimingbufferfull` event.

## Syntax

```js
setResourceTimingBufferSize(maxSize)
```

### Parameters

- `maxSize`
    A `number` representing the maximum number of `PerformanceEntry` objects the browser should hold in its performance entry buffer.

### Return value

None (`undefined`).

## Examples

### Setting a resource timing buffer size

The following call allows 500 `"resource"` performance entries in the browser's performance timeline.

```js
performance.setResourceTimingBufferSize(500);
```

If you set the buffer size to a number lower than the amount of current entries in the buffer, no entries will be removed. Instead, to clear the buffer, call `Performance.clearResourceTimings()`.

```js
performance.getEntriesByType("resource").length; // 20
performance.setResourceTimingBufferSize(10);
performance.getEntriesByType("resource").length; // 20

performance.clearResourceTimings();
performance.getEntriesByType("resource").length; // 0
```

## See also

- `Performance.clearResourceTimings()`
- `resourcetimingbufferfull`
