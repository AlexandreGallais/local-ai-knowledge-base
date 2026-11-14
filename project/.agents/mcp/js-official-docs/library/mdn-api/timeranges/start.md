---
title: "TimeRanges: start() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/timeranges/start/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TimeRanges: start() method

The **`start()`** method of the `TimeRanges` interface returns the time offset (in seconds) at which a specified time range begins.

## Syntax

```js
start(index)
```

### Parameters

- `index`
    The range number to return the starting time for.

### Return value

A number.

### Exceptions

- `IndexSizeError` `DOMException`
    Thrown if the specified index doesn't correspond to an
    existing range.

## Examples

Given a video element with the ID "myVideo":

```js
const v = document.getElementById("myVideo");

const buf = v.buffered;

const numRanges = buf.length;

if (buf.length === 1) {
  // only one range
  if (buf.start(0) === 0 && buf.end(0) === v.duration) {
    // The one range starts at the beginning and ends at
    // the end of the video, so the whole thing is loaded
  }
}
```

This example looks at the time ranges and looks to see if the entire video has been
loaded.
