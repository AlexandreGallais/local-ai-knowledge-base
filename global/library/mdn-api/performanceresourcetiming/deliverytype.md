---
title: "PerformanceResourceTiming: deliveryType property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performanceresourcetiming/deliverytype/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceResourceTiming: deliveryType property

The **`deliveryType`** read-only property is a string indicating how the resource was delivered — for example from the cache or from a navigational prefetch.

## Value

A string, which can be one of the following values:

- `"cache"`
    The resource was retrieved from the cache.
- `"navigational-prefetch"` (experimental) (non-standard)
    The resource was retrieved from a prefetched response stored in an in-memory cache via the Speculation Rules API.
- `""` (empty string)
    Returned if none of the earlier delivery types apply, or if the resource is cross-origin and doesn't pass the `Timing-Allow-Origin` check. In the cross-origin case, `""` is returned even if the resource was retrieved from the cache.

## Examples

### Filtering resources

The `deliveryType` property can be used to get specific resource timing entries only; for example, only those that were cached.

The following example uses a `PerformanceObserver` to notify of new `resource` performance entries as they are recorded in the browser's performance timeline. The `buffered` option is used for accessing entries from before the observer creation.

```js
const observer = new PerformanceObserver((list) => {
  const cachedResources = list
    .getEntries()
    .filter((entry) => entry.deliveryType === "cache");
  console.log(cachedResources);
});

observer.observe({ type: "resource", buffered: true });
```

The following example uses `Performance.getEntriesByType()`, which only shows `resource` performance entries present in the browser's performance timeline at the time you call the method.

```js
const scripts = performance
  .getEntriesByType("resource")
  .filter((entry) => entry.deliveryType === "cache");
console.log(scripts);
```

## See also

- `Timing-Allow-Origin`
- Resource timing
