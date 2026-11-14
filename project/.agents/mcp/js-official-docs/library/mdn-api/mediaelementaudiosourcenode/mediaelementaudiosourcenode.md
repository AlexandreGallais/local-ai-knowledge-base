---
title: "MediaElementAudioSourceNode: MediaElementAudioSourceNode() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediaelementaudiosourcenode/mediaelementaudiosourcenode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaElementAudioSourceNode: MediaElementAudioSourceNode() constructor

The **`MediaElementAudioSourceNode()`** constructor creates a new `MediaElementAudioSourceNode` object instance.

## Syntax

```js
new MediaElementAudioSourceNode(context, options)
```

### Parameters

- `context`
    An `AudioContext` representing the audio context you want the node to be associated with.
- `options`
    An object defining the properties you want the `MediaElementAudioSourceNode` to have:
    - `mediaElement`
        An `HTMLMediaElement` that will be used as the source for the audio.

### Return value

A new `MediaElementAudioSourceNode` object instance.

## Examples

```js
const ac = new AudioContext();
const mediaElement = document.createElement("audio");

const myAudioSource = new MediaElementAudioSourceNode(ac, {
  mediaElement,
});
```
