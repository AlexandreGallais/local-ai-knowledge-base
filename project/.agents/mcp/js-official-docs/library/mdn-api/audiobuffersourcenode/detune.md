---
title: "AudioBufferSourceNode: detune property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/audiobuffersourcenode/detune/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AudioBufferSourceNode: detune property

The **`detune`** property of the
`AudioBufferSourceNode` interface is a k-rate `AudioParam`
representing detuning of oscillation in cents.

For example, values of +100 and -100 detune the source up or down by one semitone,
while +1200 and -1200 detune it up or down by one octave.

## Value

A k-rate `AudioParam`
whose value indicates the detuning of oscillation in cents.

> **Note:**
> Though the `AudioParam` returned is read-only, the
> value it represents is not.

## Examples

```js
const audioCtx = new AudioContext();

const channelCount = 2;
const frameCount = audioCtx.sampleRate * 2.0; // 2 seconds

const myArrayBuffer = audioCtx.createBuffer(
  channelCount,
  frameCount,
  audioCtx.sampleRate,
);

for (let channel = 0; channel < channelCount; channel++) {
  const nowBuffering = myArrayBuffer.getChannelData(channel);
  for (let i = 0; i < frameCount; i++) {
    nowBuffering[i] = Math.random() * 2 - 1;
  }
}

const source = audioCtx.createBufferSource();
source.buffer = myArrayBuffer;
source.connect(audioCtx.destination);
source.detune.value = 100; // value in cents
source.start();
```

## See also

- Using the Web Audio API
- Web Audio API
