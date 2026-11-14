---
title: "Navigator: audioSession property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigator/audiosession/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Navigator: audioSession property

The **`audioSession`** read-only property of the `Navigator` interface returns the `AudioSession` object for the current document.

The `AudioSession` interface can be used to control how audio from a web application interacts with other audio playing on a device, for example, allowing developers to specify whether their application's audio should play on its own, or along with other device audio.

## Value

An `AudioSession` object.

## Examples

### Setting the audio session type

The following example sets the audio session type to `"play-and-record"` before starting a video call:

```js
navigator.audioSession.type = "play-and-record";

// Start video call
const stream = await navigator.mediaDevices.getUserMedia({
  audio: true,
  video: true,
});
localVideo.srcObject = stream;
```

## See also

- `AudioSession`
- `AudioSession.type`
- Audio Session API
