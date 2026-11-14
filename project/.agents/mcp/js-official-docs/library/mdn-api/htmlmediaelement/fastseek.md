---
title: "HTMLMediaElement: fastSeek() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlmediaelement/fastseek/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLMediaElement: fastSeek() method

The **`HTMLMediaElement.fastSeek()`** method quickly seeks the
media to the new time with precision tradeoff.

> **Note:**
> If you need to seek with precision, you should set `HTMLMediaElement.currentTime`
> instead.

## Syntax

```js
fastSeek(time)
```

### Parameters

- `time`
    A double.

### Return value

None (`undefined`).

## Examples

This example quickly seeks to 20-second position of the video element.

```js
let myVideo = document.getElementById("myVideoElement");

myVideo.fastSeek(20);
```

## See also

- HTMLMediaElement.currentTime
  for seeking without precision tradeoff
