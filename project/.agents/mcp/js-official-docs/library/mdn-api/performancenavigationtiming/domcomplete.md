---
title: "PerformanceNavigationTiming: domComplete property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performancenavigationtiming/domcomplete/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceNavigationTiming: domComplete property

The **`domComplete`** read-only property returns a `DOMHighResTimeStamp` representing the time immediately before the user agent sets the document's `readyState` to `"complete"`.

See also the `complete` state of `Document.readyState` which corresponds to this property and refers to the state in which the document and all sub-resources have finished loading. The state also indicates that the `load` event is about to fire.

## Value

A `DOMHighResTimeStamp` representing the time immediately before the user agent sets the document's `readyState` to `"complete"`.

## Examples

### Logging DOM completion time

The `domComplete` property can be used to log the time when the DOM is complete.

Example using a `PerformanceObserver`, which notifies of new `navigation` performance entries as they are recorded in the browser's performance timeline. Use the `buffered` option to access entries from before the observer creation.

```js
const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    console.log(`${entry.name}: domComplete time: ${entry.domComplete}ms`);
  });
});

observer.observe({ type: "navigation", buffered: true });
```

Example using `Performance.getEntriesByType()`, which only shows `navigation` performance entries present in the browser's performance timeline at the time you call this method:

```js
const entries = performance.getEntriesByType("navigation");
entries.forEach((entry) => {
  console.log(`${entry.name}: domComplete time: ${entry.domComplete}ms`);
});
```

## See also

- `Document.readyState`
