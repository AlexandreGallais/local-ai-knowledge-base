---
title: "AudioSession"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/audiosession/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AudioSession

The **`AudioSession`** interface of the Audio Session API lets a web page declare the type of audio it is producing — for example music playback, a video call, or a short notification.
The platform uses the declared type to decide how the page's audio and audio from other applications and tabs should coexist — whether to pause, duck (lower the volume), or play in parallel.

The interface also provides the `state` property, which indicates if audio is actively playing on the page, is inactive, or has been interrupted, and the `statechange` event, which provides notification when the state changes.
While audible media is automatically paused/resumed by interruptions, state monitoring allows the configuration of behavior that is not automatically controlled.

## Instance properties

- `AudioSession.type` (experimental)
    A string representing the type of the audio session. Possible values include `"auto"`, `"playback"`, `"transient"`, `"transient-solo"`, `"ambient"`, and `"play-and-record"`.
- `AudioSession.state` (read-only) (experimental)
    A string representing the current state of the audio session. Possible values are `"active"`, `"interrupted"`, and `"inactive"`.

## Events

Listen to these events using `addEventListener()` or by assigning an event listener to the `oneventname` property of this interface.

- `statechange` (experimental)
    Fired when the `state` property changes.
    Also available through the `onstatechange` event handler property.

## Examples

### Basic usage

The following example sets the audio session type to `"playback"` before starting media playback (provided `AudioSession` is supported).
This signals that the page is playing media such as music or video.

```js
if ("audioSession" in navigator) {
  // Set the audio session type for media playback
  navigator.audioSession.type = "playback";
}

// Play some audio
audioElement.play();
```

### Setting up a video conferencing app

This example sets the audio session type to `"play-and-record"` for a video conferencing application.

First we use `Navigator.audioSession` to signal that the page needs simultaneous playback and recording.
This may cause the system to route audio through the correct output (for example, earpiece instead of speaker on mobile devices) and prevent other applications' audio from interrupting the call.
Then we start playing the remote media and streaming our own video and audio.

```js
navigator.audioSession.type = "play-and-record";

// Start playing remote media
remoteVideo.srcObject = remoteMediaStream;
remoteVideo.play();

// Start capturing local media
const stream = await navigator.mediaDevices.getUserMedia({
  audio: true,
  video: true,
});
localVideo.srcObject = stream;
```

The following code listens for the `statechange` event.
If the session state is `"interrupted"` by the platform, for example due to an incoming phone call, the handler pauses unmuted local and remote video while the interruption lasts (the platform itself will pause and restart any elements that have an audible output).

```js
// Pause local playback and recording while the platform interrupts the call
navigator.audioSession.addEventListener("statechange", () => {
  const interrupted = navigator.audioSession.state === "interrupted";

  // remoteVideo is the audio/video from the remote end.
  // We pause it on interruption if it was muted (and hence not paused automatically)
  if (remoteVideo.muted) {
    if (interrupted) {
      remoteVideo.pause();
    } else {
      remoteVideo.play();
    }
  }

  // localVideo is the preview for the local user.
  // This is typically muted by default,
  // so the page must pause and resume it explicitly.
  if (interrupted) {
    localVideo.pause();
  } else {
    localVideo.play();
  }
});
```

## See also

- `Navigator.audioSession`
- Audio Session API
