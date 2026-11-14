---
title: "AudioSession: state property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/audiosession/state/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AudioSession: state property

The **`state`** read-only property of the `AudioSession` interface returns the current state of the audio session.

## Value

A string whose value is one of the following:

- `"active"`
    The audio session is currently playing sound, recording audio, or both.
- `"interrupted"`
    The audio session was active but has been temporarily suspended by the platform, for example because of an incoming phone call or another application taking exclusive control of audio. The session may return to `"active"` once the interruption ends.
- `"inactive"`
    The audio session is not playing or recording audio, and is not currently interrupted. This is the default state.

## Description

The platform updates the `state` in response to the page's own audio activity (starting or stopping playback or recording) and to platform-level events, such as another application taking exclusive control of audio or an incoming phone call.
The `statechange` event can be monitored for notifications when the value changes.

The property reflects the state of every audio source and sink that the page has created, including `<audio>` and `` elements, `AudioContext` instances, and microphone `MediaStreamTrack`s obtained with `MediaDevices.getUserMedia()`.
The session becomes `"active"` when any of these is producing or capturing audible sound, and returns to `"inactive"` when all of them are stopped.
Starting or stopping an individual source doesn't otherwise change the reported state.

When the state becomes `"interrupted"`, because something else has taken exclusive control of audio, the browser automatically pauses playing media elements, suspends `AudioContext`s, and mutes microphone tracks that belong to the session.
It then automatically resumes them when the state returns to `"active"`.
Note that this only applies to elements that are producing audible output when the state is interrupted; a muted or silent element is never affected and must be explicitly paused or resumed if needed.
See the `statechange` event page for an example.

The value of `state` doesn't stop you calling `HTMLMediaElement.play()` or other mechanisms to start audio, but such a call will likely fail if another app is still holding exclusive control of audio.
In this case the `state` stays `"inactive"` or `"interrupted"`, the method returns without error, but no sound may actually be produced.
You should instead wait for the `statechange` event to report that `state` has returned to `"active"` on its own.

## Examples

### Basic usage

```js
navigator.audioSession.addEventListener("statechange", () => {
  statusElement.textContent = `Audio session: ${navigator.audioSession.state}`;
});
```

## See also

- `AudioSession`
- `statechange` event
- Audio Session API
