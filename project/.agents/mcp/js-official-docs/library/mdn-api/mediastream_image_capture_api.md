---
title: "MediaStream Image Capture API"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediastream_image_capture_api/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaStream Image Capture API

The **MediaStream Image Capture API** is an API for capturing images or videos from a photographic device. In addition to capturing data, it also allows you to retrieve information about device capabilities such as image size, red-eye reduction and whether or not there is a flash and what they are currently set to. Conversely, the API allows the capabilities to be configured within the constraints what the device allows.

## MediaStream image capture concepts and usage

The process of retrieving an image or video stream happens as described below. The example code is adapted from Chrome's Image Capture examples.

First, get a reference to a device by calling `MediaDevices.getUserMedia()`. The example below says give me whatever video device is available, though the `getUserMedia()` method allows more specific capabilities to be requested. This method returns a `Promise` that resolves with a `MediaStream` object.

```js
navigator.mediaDevices.getUserMedia({ video: true }).then((mediaStream) => {
  // Do something with the stream.
});
```

Next, isolate the visual part of the media stream. Do this by calling `MediaStream.getVideoTracks()`. This returns an array of `MediaStreamTrack` objects. The code below assumes that the first item in the `MediaStreamTrack` array is the one to use. You can use the properties of the `MediaStreamTrack` objects to select the one you need.

```js
const track = mediaStream.getVideoTracks()[0];
```

At this point, you might want to configure the device capabilities before capturing an image. You can do this by calling `applyConstraints()` on the track object before doing anything else.

```js
let zoom = document.querySelector("#zoom");
const capabilities = track.getCapabilities();
// Check whether zoom is supported or not.
if (!capabilities.zoom) {
  return;
}
track.applyConstraints({ advanced: [{ zoom: zoom.value }] });
```

Finally, pass the `MediaStreamTrack` object to the `ImageCapture()` constructor. Though a `MediaStream` holds several types of tracks and provides multiple methods for retrieving them, the ImageCapture constructor will throw a `DOMException` of type `NotSupportedError` if `MediaStreamTrack.kind` is not `"video"`.

```js
let imageCapture = new ImageCapture(track);
```

## Interfaces

- `ImageCapture`
    An interface for capturing images from a photographic device referenced through a valid `MediaStreamTrack`.

## See also

- `MediaStream`
- `MediaStreamTrack`
