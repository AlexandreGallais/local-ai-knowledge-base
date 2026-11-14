---
title: "BaseAudioContext: createDynamicsCompressor() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/baseaudiocontext/createdynamicscompressor/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BaseAudioContext: createDynamicsCompressor() method

The `createDynamicsCompressor()` method of the `BaseAudioContext` Interface is used to create a `DynamicsCompressorNode`, which can be used to apply compression to an audio signal.

Compression lowers the volume of the loudest parts of the signal and raises the volume
of the softest parts. Overall, a louder, richer, and fuller sound can be achieved. It is
especially important in games and musical applications where large numbers of individual
sounds are played simultaneously, where you want to control the overall signal level and
help avoid clipping (distorting) of the audio output.

> **Note:**
> The `DynamicsCompressorNode()`
> constructor is the recommended way to create a `DynamicsCompressorNode`; see
> Creating an AudioNode.

## Syntax

```js
createDynamicsCompressor()
```

### Parameters

None.

### Return value

A `DynamicsCompressorNode`.

## Examples

The code below shows how to use `createDynamicsCompressor()`
to add compression to an audio track. For a more complete example, have a look at our basic <example-value> example (view the source code).

```js
// Create a MediaElementAudioSourceNode
// Feed the HTMLMediaElement into it
const source = audioCtx.createMediaElementSource(myAudio);

// Create a compressor node
const compressor = audioCtx.createDynamicsCompressor();
compressor.threshold.setValueAtTime(-50, audioCtx.currentTime);
compressor.knee.setValueAtTime(40, audioCtx.currentTime);
compressor.ratio.setValueAtTime(12, audioCtx.currentTime);
compressor.attack.setValueAtTime(0, audioCtx.currentTime);
compressor.release.setValueAtTime(0.25, audioCtx.currentTime);

// connect the AudioBufferSourceNode to the destination
source.connect(audioCtx.destination);

button.onclick = () => {
  const active = button.getAttribute("data-active");
  if (active === "false") {
    button.setAttribute("data-active", "true");
    button.textContent = "Remove compression";

    source.disconnect(audioCtx.destination);
    source.connect(compressor);
    compressor.connect(audioCtx.destination);
  } else if (active === "true") {
    button.setAttribute("data-active", "false");
    button.textContent = "Add compression";

    source.disconnect(compressor);
    compressor.disconnect(audioCtx.destination);
    source.connect(audioCtx.destination);
  }
};
```

## See also

- Using the Web Audio API
