---
title: "Performance: clearMarks() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performance/clearmarks/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Performance: clearMarks() method

The **`clearMarks()`** method removes all or specific `PerformanceMark` objects from the browser's performance timeline.

## Syntax

```js
clearMarks()
clearMarks(name)
```

### Parameters

- `name` (optional)
    A string representing the `name` of the `PerformanceMark` object. If this argument is omitted, all entries with an `entryType` of `"mark"` will be removed.

### Return value

None (`undefined`).

## Examples

### Removing markers

To clean up all performance marks, or just specific entries, use the `clearMarks()` method like this:

```js
// Create a bunch of marks
performance.mark("login-started");
performance.mark("login-started");
performance.mark("login-finished");
performance.mark("form-sent");
performance.mark("video-loaded");
performance.mark("video-loaded");

performance.getEntriesByType("mark").length; // 6

// Delete just the "login-started" mark entries
performance.clearMarks("login-started");
performance.getEntriesByType("mark").length; // 4

// Delete all of the mark entries
performance.clearMarks();
performance.getEntriesByType("mark").length; // 0
```

## See also

- `PerformanceMark`
