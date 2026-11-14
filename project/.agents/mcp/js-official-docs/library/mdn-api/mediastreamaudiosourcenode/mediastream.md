---
title: "MediaStreamAudioSourceNode: mediaStream property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediastreamaudiosourcenode/mediastream/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaStreamAudioSourceNode: mediaStream property

The `MediaStreamAudioSourceNode` interface's
read-only **`mediaStream`** property indicates the
`MediaStream` that contains the audio track from which the node is
receiving audio.

This stream was specified when the node was first created,
either using the `MediaStreamAudioSourceNode()`
constructor or the `AudioContext.createMediaStreamSource()` method.

## Value

A `MediaStream` representing the stream which contains the
`MediaStreamTrack` serving as the source of audio for the node.

The user agent uses the first audio track it finds on the specified
stream as the audio source for this node. However, there is no way to be certain which
track that will be on multi-track streams. If the specific track matters to you, or you
need to have access to the track itself, you should use a
`MediaStreamTrackAudioSourceNode` instead.

## Examples

```js
const audioCtx = new window.AudioContext();
let options = {
  mediaStream: stream,
};

let source = new MediaStreamAudioSourceNode(audioCtx, options);
console.log(source.mediaStream);
```
