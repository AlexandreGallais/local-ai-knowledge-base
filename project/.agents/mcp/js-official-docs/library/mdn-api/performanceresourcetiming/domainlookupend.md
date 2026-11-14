---
title: "PerformanceResourceTiming: domainLookupEnd property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performanceresourcetiming/domainlookupend/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceResourceTiming: domainLookupEnd property

The **`domainLookupEnd`** read-only property returns the `timestamp` immediately after the browser finishes the domain-name lookup for the resource.

If the user agent has the domain information in cache, `domainLookupStart` and `domainLookupEnd` represent the times when the user agent starts and ends the domain data retrieval from the cache.

## Value

The `domainLookupEnd` property can have the following values:

- A `DOMHighResTimeStamp` representing the time immediately after the browser finishes the domain name lookup for the resource.
- `0` if the resource was instantaneously retrieved from a cache.
- `0` if the resource is a cross-origin request and no `Timing-Allow-Origin` HTTP response header is used.

## Examples

### Measuring DNS lookup time

The `domainLookupEnd` and `domainLookupStart` properties can be used to measure how long it takes for the DNS lookup to happen.

```js
const dns = entry.domainLookupEnd - entry.domainLookupStart;
```

Example using a `PerformanceObserver`, which notifies of new `resource` performance entries as they are recorded in the browser's performance timeline. Use the `buffered` option to access entries from before the observer creation.

```js
const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    const dns = entry.domainLookupEnd - entry.domainLookupStart;
    if (dns > 0) {
      console.log(`${entry.name}: DNS lookup duration: ${dns}ms`);
    }
  });
});

observer.observe({ type: "resource", buffered: true });
```

Example using `Performance.getEntriesByType()`, which only shows `resource` performance entries present in the browser's performance timeline at the time you call this method:

```js
const resources = performance.getEntriesByType("resource");
resources.forEach((entry) => {
  const dns = entry.domainLookupEnd - entry.domainLookupStart;
  if (dns > 0) {
    console.log(`${entry.name}: DNS lookup duration: ${dns}ms`);
  }
});
```

### Cross-origin timing information

If the value of the `domainLookupEnd` property is `0`, the resource might be a cross-origin request. To allow seeing cross-origin timing information, the `Timing-Allow-Origin` HTTP response header needs to be set.

For example, to allow `https://developer.mozilla.org` to see timing resources, the cross-origin resource should send:

```http
Timing-Allow-Origin: https://developer.mozilla.org
```

## See also

- `Timing-Allow-Origin`
