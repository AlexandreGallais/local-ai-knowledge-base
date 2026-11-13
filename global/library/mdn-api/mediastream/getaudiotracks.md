---
title: "MediaStream: getAudioTracks() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediastream/getaudiotracks/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaStream: getAudioTracks() method

The **`getAudioTracks()`** method of the
`MediaStream` interface returns a sequence that represents all the
`MediaStreamTrack` objects in this
stream's track set where `MediaStreamTrack.kind`
is `audio`.

## Syntax

```js
getAudioTracks()
```

### Parameters

None.

### Return value

An array of `MediaStreamTrack` objects, one for each audio track contained
in the stream. Audio tracks are those tracks whose `kind`
property is `audio`. The array is empty if the stream contains no
audio tracks.

> **Note:**
> The order of the returned tracks is not defined by the
> specification and may, in fact, change from one call to `getAudioTracks()`
> to the next.

Early versions of this API included a special `AudioStreamTrack` interface
which was used as the type for each entry in the list of audio streams; however, this
has since been merged into the main `MediaStreamTrack` interface.

## Examples

This example gets a webcam's audio and video in a stream using
`getUserMedia()`, attaches the stream to a
`` element, then sets a timer that, upon expiring, will stop the
first audio track found on the stream.

```js
navigator.mediaDevices
  .getUserMedia({ audio: true, video: true })
  .then((mediaStream) => {
    document.querySelector("video").srcObject = mediaStream;
    // Stop the audio stream after 5 seconds
    setTimeout(() => {
      const tracks = mediaStream.getAudioTracks();
      tracks[0].stop();
    }, 5000);
  });
```
