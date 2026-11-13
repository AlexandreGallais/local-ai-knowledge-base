---
title: "AudioBuffer: length property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/audiobuffer/length/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AudioBuffer: length property

The **`length`** property of the `AudioBuffer`
interface returns an integer representing the length, in sample-frames, of the PCM data
stored in the buffer.

## Value

An integer.

## Examples

```js
// Stereo
const channels = 2;

// Create an empty two second stereo buffer at the
// sample rate of the AudioContext
const frameCount = audioCtx.sampleRate * 2.0;
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

  console.log(myArrayBuffer.length);
};
```

## See also

- Using the Web Audio API
