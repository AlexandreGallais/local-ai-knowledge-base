---
title: "HTMLMediaElement: seekable property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlmediaelement/seekable/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLMediaElement: seekable property

The **`seekable`** read-only property of `HTMLMediaElement` objects returns a new static normalized `TimeRanges` object that represents the ranges of the media resource, if any, that the user agent is able to seek to at the time `seekable` property is accessed.

## Value

A new static normalized TimeRanges object that represents the ranges of the media resource, if any, that the user agent is able to seek to at the time `seekable` property is accessed.

## Examples

```js
const video = document.querySelector("video");
const timeRangesObject = video.seekable;
const timeRanges = [];
// Go through the object and output an array
for (let count = 0; count < timeRangesObject.length; count++) {
  timeRanges.push([timeRangesObject.start(count), timeRangesObject.end(count)]);
}
```

## See also

- `HTMLMediaElement`: Interface used to define the `HTMLMediaElement.seekable` property
- Media Source API
- Media buffering, seeking, and time ranges
