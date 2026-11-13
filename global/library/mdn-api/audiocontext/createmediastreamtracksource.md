---
title: "AudioContext: createMediaStreamTrackSource() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/audiocontext/createmediastreamtracksource/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AudioContext: createMediaStreamTrackSource() method

The **`createMediaStreamTrackSource()`** method of the `AudioContext` interface creates and returns a `MediaStreamTrackAudioSourceNode` which represents an audio source whose data comes from the specified `MediaStreamTrack`.

This differs from `createMediaStreamSource()`, which creates a `MediaStreamAudioSourceNode` whose audio comes from the audio track in a specified `MediaStream` whose `id` is first, lexicographically (alphabetically).

## Syntax

```js
createMediaStreamTrackSource(track)
```

### Parameters

- `track`
    The `MediaStreamTrack` to use as the source of all audio data for the
    new node.

### Return value

A `MediaStreamTrackAudioSourceNode` object which acts as a source for
audio data found in the specified audio track.

## Examples

In this example, `getUserMedia()` is used to
request access to the user's microphone. Once that access is attained, an audio context
is established and a `MediaStreamTrackAudioSourceNode` is created using
`createMediaStreamTrackSource()`, taking its audio from the first audio track
in the stream returned by `getUserMedia()`.

Then a `BiquadFilterNode` is created using
`createBiquadFilter()`, and it's
configured as desired to perform a lowshelf filter on the audio coming from the source.
The output from the microphone is then routed into the new biquad filter, and the
filter's output is in turn routed to the audio context's
`destination`.

```js
navigator.mediaDevices
  .getUserMedia({ audio: true, video: false })
  .then((stream) => {
    audio.srcObject = stream;
    audio.onloadedmetadata = (e) => {
      audio.play();
      audio.muted = true;
    };

    const audioCtx = new AudioContext();
    const audioTracks = stream.getAudioTracks();
    const source = audioCtx.createMediaStreamTrackSource(audioTracks[0]);

    const biquadFilter = audioCtx.createBiquadFilter();
    biquadFilter.type = "lowshelf";
    biquadFilter.frequency.value = 3000;
    biquadFilter.gain.value = 20;

    source.connect(biquadFilter);
    biquadFilter.connect(audioCtx.destination);
  })
  .catch((err) => {
    // Handle getUserMedia() error
  });
```

## See also

- Web Audio API
- Using the Web Audio API
- `MediaStreamTrackAudioSourceNode`
