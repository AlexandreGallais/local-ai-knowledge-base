---
title: "BaseAudioContext: createBufferSource() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/baseaudiocontext/createbuffersource/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BaseAudioContext: createBufferSource() method

The `createBufferSource()` method of the `BaseAudioContext`
Interface is used to create a new `AudioBufferSourceNode`, which can be
used to play audio data contained within an `AudioBuffer` object.
`AudioBuffer`s are created using `BaseAudioContext.createBuffer` or returned by `BaseAudioContext.decodeAudioData` when it successfully decodes an audio track.

> **Note:**
> The `AudioBufferSourceNode()`
> constructor is the recommended way to create an `AudioBufferSourceNode`; see
> Creating an AudioNode.

## Syntax

```js
createBufferSource()
```

### Parameters

None.

### Return value

An `AudioBufferSourceNode`.

## Examples

In this example, we create a two second buffer, fill it with white noise, and then play
it via an `AudioBufferSourceNode`. The comments should clearly explain
what is going on.

> **Note:**
> You can also run the code live,
> or view the source.

```js
const audioCtx = new AudioContext();
const button = document.querySelector("button");
const pre = document.querySelector("pre");
const myScript = document.querySelector("script");

pre.textContent = myScript.textContent;

// Stereo
const channels = 2;
// Create an empty two second stereo buffer at the
// sample rate of the AudioContext
const frameCount = audioCtx.sampleRate * 2.0;

const myArrayBuffer = audioCtx.createBuffer(
  channels,
  frameCount,
  audioCtx.sampleRate,
);

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
  // connect the AudioBufferSourceNode to the
  // destination so we can hear the sound
  source.connect(audioCtx.destination);
  // start the source playing
  source.start();
};
```

## See also

- Using the Web Audio API
