---
title: "MediaStream: removeTrack() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediastream/removetrack/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaStream: removeTrack() method

The **`removeTrack()`** method of the `MediaStream` interface removes a
`MediaStreamTrack` from a stream.

## Syntax

```js
removeTrack(track)
```

### Parameters

- `track`
    A `MediaStreamTrack` that will be removed from the stream.

### Return value

None (`undefined`).

## Examples

The following example demonstrates how to remove the audio and video tracks from a `MediaStream`.
`fetchStreamFunction` is an event handler for `fetchStreamButton`. When the button is clicked, audio
and video are captured from the system's devices. `removeTracksFunction` is the event handler for `removeTracksButton`.
When this button is clicked, the audio and video tracks are removed from the `MediaStream`.

```js
let initialStream = null;
let newStream = null;

let fetchStreamButton = document.getElementById("fetchStream");
let removeTracksButton = document.getElementById("removeTracks");

async function fetchStreamFunction() {
  initialStream = await navigator.mediaDevices.getUserMedia({
    video: { width: 620, height: 310 },
    audio: true,
  });
  if (initialStream) {
    await attachToDOM(initialStream);
  }
}

async function attachToDOM(stream) {
  newStream = new MediaStream(stream.getTracks());
  document.querySelector("video").srcObject = newStream;
}

async function removeTracksFunction() {
  let videoTrack = newStream.getVideoTracks()[0];
  let audioTrack = newStream.getAudioTracks()[0];

  newStream.removeTrack(videoTrack);
  newStream.removeTrack(audioTrack);

  // Stream will be empty
  console.log(newStream.getTracks());
}

fetchStreamButton.addEventListener("click", fetchStreamFunction);
removeTracksButton.addEventListener("click", removeTracksFunction);
```
