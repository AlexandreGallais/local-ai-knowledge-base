---
title: "PerformanceNavigationTiming: criticalCHRestart property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performancenavigationtiming/criticalchrestart/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceNavigationTiming: criticalCHRestart property

A website can indicate that a particular Client Hint is critical to the page by including it in a `Critical-CH` HTTP response header (as well as the `Accept-CH` HTTP request header which is needed for all client hints whether critical or not). Doing so will trigger a connection restart if the hint listed in the `Critical-CH` HTTP response header could have been, but wasn't, included in the HTTP request initially sent. If the browser does not support that client hint, it is ignored and no connection restart occurs.

The **`criticalCHRestart`** read-only property represents the time at which the connection restart occurred.

## Value

A `DOMHighResTimeStamp` representing the number of milliseconds elapsed since `PerformanceEntry.startTime` when the connection restart occurred in milliseconds.

If the value is `0` the connection was not restarted.

## Examples

### Detecting connection restart pages

The following JavaScript can be used to see if the connection was restarted:

```js
const restartTime =
  performance?.getEntriesByType?.("navigation")[0]?.criticalCHRestart;
if (restartTime > 0) {
  console.log("Time at which connection restart happened:", restartTime);
}
```

## See also

- Client hints
- User-Agent Client Hints API
- Improving user privacy and developer experience with User-Agent Client Hints (developer.chrome.com)
- `Accept-CH`
- `Critical-CH`
