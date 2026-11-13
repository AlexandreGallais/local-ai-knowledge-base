---
title: "MediaDevices"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediadevices/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaDevices

The **`MediaDevices`** interface of the `Media Capture and Streams API` provides access to connected media input devices like cameras and microphones, as well as screen sharing. In essence, it lets you obtain access to any hardware source of media data.

## Instance properties

_Inherits properties from its parent interface, `EventTarget`._

## Instance methods

_Inherits methods from its parent interface, `EventTarget`._

- `enumerateDevices()`
    Obtains an array of information about the media input and output devices available on the system.
- `getSupportedConstraints()`
    Returns an object indicating which constrainable properties are supported on the `MediaStreamTrack` interface. See Media Streams API to learn more about constraints and how to use them.
- `getDisplayMedia()`
    Prompts the user to select a display or portion of a display (such as a window) to capture as a `MediaStream` for sharing or recording purposes. Returns a promise that resolves to a `MediaStream`.
- `getUserMedia()`
    With the user's permission through a prompt, turns on a camera and/or a microphone on the system and provides a `MediaStream` containing a video track and/or an audio track with the input.
- `selectAudioOutput()` (experimental)
    Prompts the user to select a specific audio output device.

## Events

- `devicechange`
    Fired when a media input or output device is attached to or removed from the user's computer.

## Example

```js
// Put variables in global scope to make them available to the browser console.
const video = document.querySelector("video");
const constraints = {
  audio: false,
  video: true,
};

navigator.mediaDevices
  .getUserMedia(constraints)
  .then((stream) => {
    const videoTracks = stream.getVideoTracks();
    console.log("Got stream with constraints:", constraints);
    console.log(`Using video device: ${videoTracks[0].label}`);
    stream.onremovetrack = () => {
      console.log("Stream ended");
    };
    video.srcObject = stream;
  })
  .catch((error) => {
    if (error.name === "OverconstrainedError") {
      console.error(
        `The resolution ${constraints.video.width.exact}x${constraints.video.height.exact} px is not supported by your device.`,
      );
    } else if (error.name === "NotAllowedError") {
      console.error(
        "You need to grant this page permission to access your camera and microphone.",
      );
    } else {
      console.error(`getUserMedia error: ${error.name}`, error);
    }
  });
```

## See also

- Media Capture and Streams API: The API this interface is part of.
- Screen Capture API: The API defining the `getDisplayMedia()` method.
- WebRTC API
- `Navigator.mediaDevices`: Returns a reference to a `MediaDevices` object that can be used to access devices.
- CameraCaptureJS: HTML video capture and playback using `MediaDevices` and the MediaStream Recording API
- OpenLang: HTML video language lab web application using `MediaDevices` and the MediaStream Recording API for video recording
