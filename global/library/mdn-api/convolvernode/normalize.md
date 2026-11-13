---
title: "ConvolverNode: normalize property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/convolvernode/normalize/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ConvolverNode: normalize property

The `normalize` property of the `ConvolverNode` interface
is a boolean that controls whether the impulse response from the buffer will be
scaled by an equal-power normalization when the `buffer` attribute is set,
or not.

Its default value is `true` in order to achieve a more uniform output
level from the convolver, when loaded with diverse impulse responses. If normalize is
set to `false`, then the convolution will be rendered with no
pre-processing/scaling of the impulse response. Changes to this value do not take
effect until the next time the `buffer` attribute is set.

## Value

A boolean.

## Examples

### Switching normalization off

The following example creates a convolver node and assigns it an `AudioBuffer`. Before assigning the audio buffer, it sets `normalize` to `false`.

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
  convolver.normalize = false; // must be set before the buffer, to take effect
  convolver.buffer = decodedAudio;
} catch (error) {
  console.error(
    `Unable to fetch the audio file: ${name} Error: ${err.message}`,
  );
}
```

## See also

- Using the Web Audio API
