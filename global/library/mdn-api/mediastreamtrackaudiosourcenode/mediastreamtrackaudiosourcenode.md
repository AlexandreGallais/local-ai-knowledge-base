---
title: "MediaStreamTrackAudioSourceNode: MediaStreamTrackAudioSourceNode() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediastreamtrackaudiosourcenode/mediastreamtrackaudiosourcenode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaStreamTrackAudioSourceNode: MediaStreamTrackAudioSourceNode() constructor

The Web Audio API's **`MediaStreamTrackAudioSourceNode()`** constructor creates and returns a new `MediaStreamTrackAudioSourceNode` object whose audio is taken from the `MediaStreamTrack` specified in the given options object.

Another way to create a `MediaStreamTrackAudioSourceNode` is to call the `AudioContext.createMediaStreamTrackSource()` method, specifying the `MediaStreamTrack` from which you want to obtain audio.

## Syntax

```js
new MediaStreamTrackAudioSourceNode(context, options)
```

### Parameters

- `context`
    An `AudioContext` representing the audio context you want the node to be associated with.
- `options`
    An object defining the properties you want the `MediaStreamTrackAudioSourceNode` to have:
    - `mediaStreamTrack`
        The `MediaStreamTrack` from which to take audio data for this node's output.

### Return value

A new `MediaStreamTrackAudioSourceNode` object representing the audio node whose media is obtained from the specified media track.

### Exceptions

- `NotSupportedError` `DOMException`
    Thrown if the specified `context` is not an `AudioContext`.
- `InvalidStateError` `DOMException`
    Thrown if the specified `MediaStreamTrack` isn't an audio track (that is, its `kind` property isn't `audio`).

## Example

This example uses `getUserMedia()` to obtain access to the user's camera, then creates a new `MediaStreamAudioSourceNode` from the first audio track provided by the device.

```js
const audioCtx = new AudioContext();

if (navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices
    .getUserMedia({
      audio: true,
      video: false,
    })
    .then((stream) => {
      const options = {
        mediaStreamTrack: stream.getAudioTracks()[0],
      };

      const source = new MediaStreamTrackAudioSourceNode(audioCtx, options);
      source.connect(audioCtx.destination);
    })
    .catch((err) => {
      console.error(`The following gUM error occurred: ${err}`);
    });
} else {
  console.log("new getUserMedia not supported on your browser!");
}
```
