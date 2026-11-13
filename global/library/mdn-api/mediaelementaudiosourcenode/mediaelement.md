---
title: "MediaElementAudioSourceNode: mediaElement property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediaelementaudiosourcenode/mediaelement/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaElementAudioSourceNode: mediaElement property

The `MediaElementAudioSourceNode` interface's
read-only **`mediaElement`** property indicates the
`HTMLMediaElement` that contains the audio track from which the node is
receiving audio.

This stream was specified when the node was first created,
either using the `MediaElementAudioSourceNode()`
constructor or the `AudioContext.createMediaElementSource()` method.

## Value

An `HTMLMediaElement` representing the element which contains the source
of audio for the node.

## Examples

```js
const audioCtx = new window.AudioContext();
const audioElem = document.querySelector("audio");

let options = {
  mediaElement: audioElem,
};

let source = new MediaElementAudioSourceNode(audioCtx, options);
console.log(source.mediaElement);
```
