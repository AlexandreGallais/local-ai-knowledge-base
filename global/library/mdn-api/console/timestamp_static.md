---
title: "console: timeStamp() static method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/console/timestamp_static/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# console: timeStamp() static method

The **`console.timeStamp()`** static method adds a marker to a performance recording in developer tools that support it, such as the Chrome Performance panel and Firefox Profiler. This lets you correlate a point in your code with recorded events such as layout and painting.

## Syntax

```js
console.timeStamp(label)
console.timeStamp(label, start, end, trackName, trackGroup, color, data)
```

### Parameters

- `label` (optional)
    Label for the timestamp.

- `start` (optional) (experimental)
    A string referencing a previously defined `timeStamp` label or a timestamp (`DOMHighResTimeStamp`) to be used as the start time.

- `end` (optional) (experimental)
    A string referencing a previously defined `timeStamp` label or a timestamp (`DOMHighResTimeStamp`) to be used as the end time.

- `trackName` (optional) (experimental)
    The name of the custom track used to display the timestamp data

- `trackGroup` (optional) (experimental)
    The group of the custom track used to display the timestamp data

- `color` (optional) (experimental)
    A string for the display color of the entry. Must be one of `"primary"`, `"primary-light"`, `"primary-dark"`, `"secondary"`, `"secondary-light"`, `"secondary-dark"`, `"tertiary"`, `"tertiary-light"`, `"tertiary-dark"`, `"error"`.

- `data` (optional) (experimental)
    An object with additional data to display. URLs may automatically be turned into links by some browsers.

### Return value

None (`undefined`).

## Description

To see the marker, start a performance recording before the call occurs. Marker recording and display depend on the browser and its profiling tool; the presence of `console.timeStamp()` does not by itself guarantee a visible marker.

This method does not log elapsed time to the console or create a `PerformanceEntry`. Use `console.time()` and `console.timeEnd()` for console timers, or `performance.mark()` and `performance.measure()` for standard entries that your application can observe and read.

## Examples

### Basic usage

```js
console.timeStamp("marker 1");
```

### Using the Extensibility API to provide richer details for display

```js
// 1. Create a duration event with rich data
const start = performance.now() - 150;
const end = performance.now() - 20;

const durationData = {
  processingTime: `${end - start}ms`,
  info: "Check this URL: https://example.com for more.",
  metrics: {
    items: 5,
    isCached: true,
  },
};

console.timeStamp(
  "My Timed Task", // label
  start, // startTime
  end, // endTime
  "Tasks", // trackName
  "My Extension", // trackGroup
  "tertiary", // color
  durationData, // data (object)
);

// 2. Create an instant event with a deep link for a DevTools extension
const linkData = {
  url: "ext://resource/123",
  description: "View Resource 123",
  otherDetail: "This data also appears in the JSON viewer",
};

console.timeStamp(
  "Event with Link", // label
  performance.now(), // startTime (instant)
  undefined, // endTime (instant)
  "Tasks", // trackName
  "My Extension", // trackGroup
  "primary-light", // color
  linkData, // data (object)
);
```

## See also

- `console.time()`
- `console.timeLog()`
- `console.timeEnd()`
- `performance.mark()`
- `performance.measure()`
- Chrome DevTools extensibility API
