---
title: "PerformanceResourceTiming: redirectStart property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performanceresourcetiming/redirectstart/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceResourceTiming: redirectStart property

The **`redirectStart`** read-only property returns a `timestamp` representing the start time of the fetch which that initiates the redirect.

If there are HTTP redirects when fetching the resource and if any of the redirects are not from the same origin as the current document, but the timing allow check algorithm passes for each redirected resource, this property returns the starting time of the fetch that initiates the redirect; otherwise, zero is returned.

To get the amount of redirects, see also `PerformanceNavigationTiming.redirectCount`.

## Value

The `redirectStart` property can have the following values:

- A `timestamp` representing the start time of the fetch which initiates the redirect.
- `0` if there is no redirect.
- `0` if the resource is a cross-origin request and no `Timing-Allow-Origin` HTTP response header is used.

## Examples

### Measuring redirection time

The `redirectStart` and `redirectEnd` properties can be used to measure how long the redirection takes.

```js
const redirect = entry.redirectEnd - entry.redirectStart;
```

Example using a `PerformanceObserver`, which notifies of new `resource` performance entries as they are recorded in the browser's performance timeline. Use the `buffered` option to access entries from before the observer creation.

```js
const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    const redirect = entry.redirectEnd - entry.redirectStart;
    if (redirect > 0) {
      console.log(`${entry.name}: Redirect time: ${redirect}ms`);
    }
  });
});

observer.observe({ type: "resource", buffered: true });
```

Example using `Performance.getEntriesByType()`, which only shows `resource` performance entries present in the browser's performance timeline at the time you call this method:

```js
const resources = performance.getEntriesByType("resource");
resources.forEach((entry) => {
  const redirect = entry.redirectEnd - entry.redirectStart;
  if (redirect > 0) {
    console.log(`${entry.name}: Redirect time: ${redirect}ms`);
  }
});
```

### Cross-origin timing information

If the value of the `redirectStart` property is `0`, the resource might be a cross-origin request. To allow seeing cross-origin timing information, the `Timing-Allow-Origin` HTTP response header needs to be set.

For example, to allow `https://developer.mozilla.org` to see timing resources, the cross-origin resource should send:

```http
Timing-Allow-Origin: https://developer.mozilla.org
```

## See also

- `PerformanceNavigationTiming.redirectCount`
- `Timing-Allow-Origin`
