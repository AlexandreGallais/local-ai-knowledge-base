---
title: "AudioBufferSourceNode: buffer property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/audiobuffersourcenode/buffer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AudioBufferSourceNode: buffer property

The **`buffer`** property of the `AudioBufferSourceNode` interface provides the ability to play back audio using an `AudioBuffer` as the source of the sound data.

If the `buffer` property is set to the value `null`, the node
generates a single channel containing silence (that is, every sample is 0).

## Value

An `AudioBuffer` which contains the data representing the sound which the
node will play.

## Exceptions

- `InvalidStateError` `DOMException`
    Thrown if the `buffer` property has already been set to a non-`null` value, and is then set to a non-`null` value again.

## Examples

> **Note:**
> For a full working example, see this code running live, or view the source.

```js
const myArrayBuffer = audioCtx.createBuffer(2, frameCount, audioCtx.sampleRate);

button.onclick = () => {
  // Fill the buffer with white noise;
  // just random values between -1.0 and 1.0
  for (let channel = 0; channel < channels; channel++) {
    // This gives us the actual ArrayBuffer that contains the data
    const nowBuffering = myArrayBuffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      // Math.random() is in [0; 1.0]
      // audio needs to be in [-1.0; 1.0]
      nowBuffering[i] = Math.random() * 2 - 1;
    }
  }

  // Get an AudioBufferSourceNode.
  // This is the AudioNode to use when we want to play an AudioBuffer
  const source = audioCtx.createBufferSource();
  // set the buffer in the AudioBufferSourceNode
  source.buffer = myArrayBuffer;
};
```

## See also

- Using the Web Audio API
- Web Audio API
