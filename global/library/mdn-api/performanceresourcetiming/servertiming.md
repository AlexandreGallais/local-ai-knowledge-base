---
title: "PerformanceResourceTiming: serverTiming property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performanceresourcetiming/servertiming/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceResourceTiming: serverTiming property

The **`serverTiming`** read-only property returns an array of `PerformanceServerTiming` entries containing server timing metrics.

Server timing metrics require the server to send the `Server-Timing` header. For example:

```http
Server-Timing: cache;desc="Cache Read";dur=23.2
```

The `serverTiming` entries can live on `navigation` and `resource` entries.

## Value

An array of `PerformanceServerTiming` entries.

## Examples

### Logging server timing entries

You can use a `PerformanceObserver` to watch for `PerformanceServerTiming` entries. Each server entry's duration is logged to the console.

Example using a `PerformanceObserver`, which notifies of new `resource` performance entries as they are recorded in the browser's performance timeline. Use the `buffered` option to access entries from before the observer creation.

```js
const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    entry.serverTiming.forEach((serverEntry) => {
      console.log(`${serverEntry.name} duration: ${serverEntry.duration}`);
    });
  });
});

["navigation", "resource"].forEach((type) =>
  observer.observe({ type, buffered: true }),
);
```

Example using `Performance.getEntriesByType()`, which only shows `resource` performance entries present in the browser's performance timeline at the time you call this method:

```js
for (const entryType of ["navigation", "resource"]) {
  for (const { name: url, serverTiming } of performance.getEntriesByType(
    entryType,
  )) {
    if (serverTiming) {
      for (const { name, duration } of serverTiming) {
        console.log(`${url}: ${name} duration: ${duration}`);
      }
    }
  }
}
```

### Cross-origin server timing information

Access to server timing information is restricted to the same origin. To expose cross-origin timing information, the `Timing-Allow-Origin` HTTP response header needs to be set.

For example, to allow `https://developer.mozilla.org` to see server timing information, the cross-origin resource should send:

```http
Timing-Allow-Origin: https://developer.mozilla.org
```

## See also

- `PerformanceServerTiming`
- `Server-Timing`
