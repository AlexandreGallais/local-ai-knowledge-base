---
title: "LayoutShift"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/layoutshift/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# LayoutShift

The `LayoutShift` interface of the Performance API provides insights into the layout stability of web pages based on movements of the elements on the page.

## Instance properties

This interface extends the following `PerformanceEntry` properties by qualifying them as follows:

- `PerformanceEntry.duration` (read-only) (experimental)
    Always returns `0` (the concept of duration does not apply to layout shifts).
- `PerformanceEntry.entryType` (read-only) (experimental)
    Always returns `"layout-shift"`.
- `PerformanceEntry.name` (read-only) (experimental)
    Always returns an empty string.
- `PerformanceEntry.startTime` (read-only) (experimental)
    Returns a `DOMHighResTimeStamp` representing the time when the layout shift started.

This interface also supports the following properties:

- `LayoutShift.value` (read-only) (experimental)
    Returns the layout shift score calculated as the impact fraction (fraction of the viewport that was shifted) multiplied by the distance fraction (distance moved as a fraction of viewport).
- `LayoutShift.hadRecentInput` (read-only) (experimental)
    Returns `true` if `lastInputTime` is less than 500 milliseconds in the past.
- `LayoutShift.lastInputTime` (read-only) (experimental)
    Returns the time of the most recent excluding input (user input that would exclude this entry as a contributor to the CLS score) or `0` if no excluding input has occurred.
- `LayoutShift.sources` (read-only) (experimental)
    Returns an array of `LayoutShiftAttribution` objects with information on the elements that were shifted.

## Instance methods

- `LayoutShift.toJSON()` (experimental)
    Returns a JSON-serializable plain object representing the `LayoutShift` object. Automatically called by `JSON.stringify()`.

## Description

A layout shift happens when any element that is visible in the viewport changes its position between two frames. These elements are described as being **unstable**, indicating a lack of visual stability.

The Layout Instability API provides a way to measure and report on these layout shifts. All tools for debugging layout shifts, including those in the browser's developer tools, use this API. The API can also be used to observe and debug layout shifts by logging the information to the console, to send the data to a server endpoint, or to web page analytics.

Performance tools can use this API to calculate a CLS score.

## Examples

### Logging layout shift values

The following example shows how to capture layout shifts and log them to the console.

```js
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    // Count layout shifts without recent user input only
    if (!entry.hadRecentInput) {
      console.log("LayoutShift value:", entry.value);
      if (entry.sources) {
        for (const { node, currentRect, previousRect } of entry.sources)
          console.log("LayoutShift source:", node, {
            currentRect,
            previousRect,
          });
      }
    }
  }
});

observer.observe({ type: "layout-shift", buffered: true });
```

## See also

- `LayoutShiftAttribution`
- CLS
