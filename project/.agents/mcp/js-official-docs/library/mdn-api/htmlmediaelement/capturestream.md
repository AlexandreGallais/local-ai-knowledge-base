---
title: "HTMLMediaElement: captureStream() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlmediaelement/capturestream/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLMediaElement: captureStream() method

The **`captureStream()`** method of the `HTMLMediaElement` interface returns a `MediaStream` object that streams a real-time capture of the content being rendered in the media element.

This can be used, for example, as a source for a WebRTC `RTCPeerConnection`.

## Syntax

```js
captureStream()
```

### Parameters

None.

### Return value

A `MediaStream` object which can be used as a source for audio and/or video data by other media processing code, or as a source for WebRTC.

## Examples

### Basic usage

In this example, an event handler is established so that clicking a button starts capturing the contents of a media element with the ID `"playback"` into a `MediaStream`.
The stream can then be used for other purposes, such as a WebRTC stream to share prerecorded videos with another person during a video call.

```js
document.querySelector(".playAndRecord").addEventListener("click", () => {
  const playbackElement = document.getElementById("playback");
  const captureStream = playbackElement.captureStream();
  playbackElement.play();
});
```

See Recording a media element for a longer and more intricate example and explanation.

## See also

- Recording a media element
- MediaStream Recording API
- `HTMLCanvasElement.captureStream()`
- `MediaStream`
- WebRTC API
