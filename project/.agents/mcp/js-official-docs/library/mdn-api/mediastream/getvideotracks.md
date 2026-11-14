---
title: "MediaStream: getVideoTracks() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediastream/getvideotracks/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaStream: getVideoTracks() method

The **`getVideoTracks()`** method of the
`MediaStream` interface returns a sequence of
`MediaStreamTrack` objects representing the video tracks in this stream.

## Syntax

```js
getVideoTracks()
```

### Parameters

None.

### Return value

An array of `MediaStreamTrack` objects, one for each video track contained
in the media stream. Video tracks are those tracks whose
`kind` property is `video`. The array
is empty if the stream contains no video tracks.

> **Note:**
> The order of the tracks is not defined by the specification,
> and may not be the same from one call to `getVideoTracks()` to another.

## Examples

The following example, extracted from Chrome's
Image Capture / Photo Resolution Sample, uses `getVideoTracks()` to
retrieve a track for passing to the `ImageCapture()` constructor.

```js
let imageCapture;

navigator.mediaDevices.getUserMedia({ video: true }).then((mediaStream) => {
  document.querySelector("video").srcObject = mediaStream;

  const track = mediaStream.getVideoTracks()[0];
  imageCapture = new ImageCapture(track);

  return imageCapture.getPhotoCapabilities();
});
```
