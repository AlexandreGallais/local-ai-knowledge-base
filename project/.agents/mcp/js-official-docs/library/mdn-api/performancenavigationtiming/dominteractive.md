---
title: "PerformanceNavigationTiming: domInteractive property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performancenavigationtiming/dominteractive/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceNavigationTiming: domInteractive property

The **`domInteractive`** read-only property returns a `DOMHighResTimeStamp` representing the time immediately before the user agent sets the document's `readyState` to `"interactive"`.

> **Note:**
> This property is **not** Time to interactive (TTI). This property refers to the time when DOM construction is finished and interaction to it from JavaScript is possible. See also the `interactive` state of `Document.readyState` which corresponds to this property.

Measuring DOM processing time may not be consequential unless your site has a very large HTML source to a construct a Document Object Model from.

If there is no parser-blocking JavaScript then the `DOMContentLoaded` event (see `domContentLoadedEventStart` for the timestamp) will fire immediately after `domInteractive`.

## Value

A `DOMHighResTimeStamp` representing the time immediately before the user agent sets the document's `readyState` to `"interactive"`.

## Examples

### Logging DOM interaction time

The `domInteractive` property can be used to log the time when the DOM construction has finished and interaction with it is possible.

Example using a `PerformanceObserver`, which notifies of new `navigation` performance entries as they are recorded in the browser's performance timeline. Use the `buffered` option to access entries from before the observer creation.

```js
const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    console.log(
      `${entry.name}: domInteractive time: ${entry.domInteractive}ms`,
    );
  });
});

observer.observe({ type: "navigation", buffered: true });
```

Example using `Performance.getEntriesByType()`, which only shows `navigation` performance entries present in the browser's performance timeline at the time you call this method:

```js
const entries = performance.getEntriesByType("navigation");
entries.forEach((entry) => {
  console.log(`${entry.name}: domInteractive time: ${entry.domInteractive}ms`);
});
```

## See also

- `Document.readyState`
