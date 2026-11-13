---
title: "ConvolverNode: buffer property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/convolvernode/buffer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ConvolverNode: buffer property

The **`buffer`** property of the `ConvolverNode` interface represents a mono, stereo, or 4-channel `AudioBuffer` containing the (possibly multichannel) impulse response used by the `ConvolverNode` to create the reverb effect.

This is normally a simple recording of as-close-to-an-impulse as can be found in the space you want to model. For example, if you want to model the reverb in your bathroom, you might set up a microphone near the door to record the sound of a balloon pop or synthesized impulse from the sink. That audio recording could then be used as the buffer.

This audio buffer must have the same sample-rate as the `AudioContext` or an exception will be thrown. At the time when this attribute is set, the buffer and the state of the attribute will be used to configure the `ConvolverNode` with this impulse response having the given normalization. The initial value of this attribute is `null`.

## Value

An `AudioBuffer`.

## Examples

### Assigning an audio buffer

The following example creates a convolver node and assigns it an `AudioBuffer`.

For more complete applied examples/information, check out our Voice-change-O-matic demo (see app.js for the code that is excerpted below).

```js
const audioCtx = new AudioContext();
// …

const convolver = audioCtx.createConvolver();
// …

// Grab audio track via fetch() for convolver node
try {
  const response = await fetch(
    "https://mdn.github.io/voice-change-o-matic/audio/concert-crowd.ogg",
  );
  const arrayBuffer = await response.arrayBuffer();
  const decodedAudio = await audioCtx.decodeAudioData(arrayBuffer);
  convolver.buffer = decodedAudio;
} catch (error) {
  console.error(
    `Unable to fetch the audio file: ${name} Error: ${err.message}`,
  );
}
```

## See also

- Using the Web Audio API
