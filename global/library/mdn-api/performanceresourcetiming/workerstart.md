---
title: "PerformanceResourceTiming: workerStart property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performanceresourcetiming/workerstart/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceResourceTiming: workerStart property

The **`workerStart`** read-only property of the `PerformanceResourceTiming` interface returns a
`DOMHighResTimeStamp` immediately before dispatching the `FetchEvent` if a Service Worker thread is already running, or immediately before starting the Service Worker thread if it is not already running. If the resource is not intercepted by a Service Worker the property will always return 0.

## Value

The `workerStart` property can have the following values:

- A `DOMHighResTimeStamp`.
- `0` if no service worker is used.
- `0` if the resource is a cross-origin request and no `Timing-Allow-Origin` HTTP response header is used.

## Examples

### Measuring ServiceWorker processing time

The `workerStart` and `fetchStart` properties can be used to measure the processing time of a `ServiceWorker`.

```js
const workerProcessingTime = entry.fetchStart - entry.workerStart;
```

Example using a `PerformanceObserver`, which notifies of new `resource` performance entries as they are recorded in the browser's performance timeline. Use the `buffered` option to access entries from before the observer creation.

```js
const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    const workerProcessingTime = entry.fetchStart - entry.workerStart;
    if (workerProcessingTime > 0) {
      console.log(
        `${entry.name}: Worker processing time: ${workerProcessingTime}ms`,
      );
    }
  });
});

observer.observe({ type: "resource", buffered: true });
```

Example using `Performance.getEntriesByType()`, which only shows `resource` performance entries present in the browser's performance timeline at the time you call this method:

```js
const resources = performance.getEntriesByType("resource");
resources.forEach((entry) => {
  const workerProcessingTime = entry.fetchStart - entry.workerStart;
  if (workerProcessingTime > 0) {
    console.log(
      `${entry.name}: Worker processing time: ${workerProcessingTime}ms`,
    );
  }
});
```

### Cross-origin timing information

If the value of the `workerStart` property is `0`, the resource might be a cross-origin request. To allow seeing cross-origin timing information, the `Timing-Allow-Origin` HTTP response header needs to be set.

For example, to allow `https://developer.mozilla.org` to see timing resources, the cross-origin resource should send:

```http
Timing-Allow-Origin: https://developer.mozilla.org
```

## See also

- `Timing-Allow-Origin`
