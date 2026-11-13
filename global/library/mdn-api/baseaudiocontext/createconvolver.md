---
title: "BaseAudioContext: createConvolver() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/baseaudiocontext/createconvolver/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BaseAudioContext: createConvolver() method

The `createConvolver()` method of the `BaseAudioContext`
interface creates a `ConvolverNode`, which is commonly used to apply
reverb effects to your audio. See the spec definition of Convolution for more information.

> **Note:**
> The `ConvolverNode()`
> constructor is the recommended way to create a `ConvolverNode`; see
> Creating an AudioNode.

## Syntax

```js
createConvolver()
```

### Parameters

None.

### Return value

A `ConvolverNode`.

## Examples

### Creating a convolver node

The following example shows how to use an AudioContext to create a convolver node.
You create an `AudioBuffer` containing a sound sample to be used
as an ambience to shape the convolution (called the _impulse response_) and
apply that to the convolver. The example below uses a short sample of a concert hall
crowd, so the reverb effect applied is really deep and echoey.

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
