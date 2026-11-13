---
title: "MediaSource: setLiveSeekableRange() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediasource/setliveseekablerange/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaSource: setLiveSeekableRange() method

The **`setLiveSeekableRange()`** method of the
`MediaSource` interface sets the range that the user can seek to in the
media element.

## Syntax

```js
setLiveSeekableRange(start, end)
```

### Parameters

- `start`
    The start of the seekable range to set in seconds measured from the beginning of the
    source. If the duration of the media source is positive infinity, then the
    `TimeRanges` object returned by the
    `HTMLMediaElement.seekable` property will have a start timestamp no
    greater than this value.
- `end`
    The end of the seekable range to set in seconds measured from the beginning of the
    source. If the duration of the media source is positive infinity, then the
    `TimeRanges` object returned by the
    `HTMLMediaElement.seekable` property will have an end timestamp no
    less than this value.

### Return value

None (`undefined`).

## Examples

```js
// TBD
```
