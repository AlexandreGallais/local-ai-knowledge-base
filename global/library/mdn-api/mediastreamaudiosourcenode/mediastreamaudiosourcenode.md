---
title: "MediaStreamAudioSourceNode: MediaStreamAudioSourceNode() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediastreamaudiosourcenode/mediastreamaudiosourcenode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaStreamAudioSourceNode: MediaStreamAudioSourceNode() constructor

The Web Audio API's **`MediaStreamAudioSourceNode()`** constructor
creates and returns a new `MediaStreamAudioSourceNode` object which uses
the first audio track of a given `MediaStream` as its source.

> **Note:**
> Another way to create a
> `MediaStreamAudioSourceNode` is to call
> the `AudioContext.createMediaStreamSource()` method, specifying the stream
> from which you want to obtain audio.

## Syntax

```js
new MediaStreamAudioSourceNode(context, options)
```

### Parameters

- `context`
    An `AudioContext` representing the audio context you want the node to
    be associated with.
- `options`
    An object defining the properties you want the `MediaStreamAudioSourceNode` to have:
    - `mediaStream`
        A required property which specifies the `MediaStream` from which to obtain audio for the node.

### Return value

A new `MediaStreamAudioSourceNode` object representing the audio node
whose media is obtained from the specified source stream.

### Exceptions

- `InvalidStateError` `DOMException`
    Thrown if the specified `MediaStream` does not contain any audio tracks.

## Examples

This example uses `getUserMedia()` to obtain
access to the user's camera, then creates a new
`MediaStreamAudioSourceNode` from its `MediaStream`.

```js
// define variables
const audioCtx = new AudioContext();

// getUserMedia block - grab stream
// put it into a MediaStreamAudioSourceNode
if (navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices
    .getUserMedia(
      // constraints: audio and video for this app
      {
        audio: true,
        video: false,
      },
    )
    .then((stream) => {
      const options = {
        mediaStream: stream,
      };

      const source = new MediaStreamAudioSourceNode(audioCtx, options);
      source.connect(audioCtx.destination);
    })
    .catch((err) => {
      console.error(`The following gUM error occurred: ${err}`);
    });
} else {
  console.log("new getUserMedia not supported on your browser!");
}
```
