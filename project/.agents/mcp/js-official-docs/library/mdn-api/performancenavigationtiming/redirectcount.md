---
title: "PerformanceNavigationTiming: redirectCount property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performancenavigationtiming/redirectcount/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceNavigationTiming: redirectCount property

The **`redirectCount`** read-only property returns a number representing the number of redirects since the last non-redirect navigation in the current browsing context.

The higher the number of redirects on a page, the longer the page load time. To improve the performance of your web page, avoid multiple redirects.

The `redirectStart` and `redirectEnd` properties can be used to measure redirection time. Note that they will return `0` for cross-origin redirects.

Note that client-side redirects, such as `<meta http-equiv="refresh" content="0; url=https://example.com/">` are not considered here.

## Value

The `redirectCount` property can have the following values:

- A number representing the number of redirects since the last non-redirect navigation in the current browsing context.
- `0` if the redirect is cross-origin.

## Examples

### Logging entries with redirects

The `redirectCount` property can be used to check whether there are one or more redirects. We log the entry's name and the redirection time if it is available.

Example using a `PerformanceObserver`, which notifies of new `navigation` performance entries as they are recorded in the browser's performance timeline. Use the `buffered` option to access entries from before the observer creation.

```js
const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    const name = entry.name;
    const redirectCount = entry.redirectCount;
    const redirectTime = entry.redirectEnd - entry.redirectStart;
    if (redirectCount > 0) {
      console.log(`${name}: Redirect count: ${redirectCount}`);
      if (redirectTime > 0) {
        console.log(`${name}: Redirect time: ${redirectTime}ms`);
      }
    }
  });
});

observer.observe({ type: "navigation", buffered: true });
```

Example using `Performance.getEntriesByType()`, which only shows `navigation` performance entries present in the browser's performance timeline at the time you call this method:

```js
const entries = performance.getEntriesByType("navigation");
entries.forEach((entry) => {
  const name = entry.name;
  const redirectCount = entry.redirectCount;
  const redirectTime = entry.redirectEnd - entry.redirectStart;
  if (redirectCount > 0) {
    console.log(`${name}: Redirect count: ${redirectCount}`);
    if (redirectTime > 0) {
      console.log(`${name}: Redirect time: ${redirectTime}ms`);
    }
  }
});
```

## See also

- `PerformanceResourceTiming.redirectStart`
- `PerformanceResourceTiming.redirectEnd`
