---
title: "MediaStreamTrack: stop() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediastreamtrack/stop/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaStreamTrack: stop() method

The **`stop()`** method of the `MediaStreamTrack` interface stops the track.

## Syntax

```js
stop()
```

### Parameters

None.

### Return value

None (`undefined`).

## Description

Calling `stop()` tells the user agent that the track's
source—whatever that source may be, including files, network streams, or a local camera
or microphone—is no longer needed by the `MediaStreamTrack`. Since multiple
tracks may use the same source (for example, if two tabs are using the device's
microphone), the source itself isn't necessarily immediately stopped. It is instead
disassociated from the track and the track object is stopped. Once no media tracks are
using the source, the source may actually be completely stopped.

Immediately after calling `stop()`, the
`readyState` property is set to
`ended`. Note that the `ended` event will not be fired in this situation.

## Examples

### Stopping a video stream

In this example, we see a function which stops a streamed video by calling
`stop()` on every track on a given ``.

```js
function stopStreamedVideo(videoElem) {
  const stream = videoElem.srcObject;
  const tracks = stream.getTracks();

  tracks.forEach((track) => {
    track.stop();
  });

  videoElem.srcObject = null;
}
```

This works by obtaining the video element's stream from its
`srcObject` property. Then the stream's track
list is obtained by calling its `getTracks()`
method. From there, all that remains to do is to iterate over the track list using
`forEach()` and calling each track's `stop()`
method.

Finally, `srcObject` is set to `null` to sever the link to the
`MediaStream` object so it can be released.

## See also

- `MediaStreamTrack`, the interface it belongs to.
- `MediaStreamTrack.readyState`
- `ended`
