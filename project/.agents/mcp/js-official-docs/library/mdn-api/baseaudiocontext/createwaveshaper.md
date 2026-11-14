---
title: "BaseAudioContext: createWaveShaper() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/baseaudiocontext/createwaveshaper/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BaseAudioContext: createWaveShaper() method

The `createWaveShaper()` method of the `BaseAudioContext`
interface creates a `WaveShaperNode`, which represents a non-linear
distortion. It is used to apply distortion effects to your audio.

> **Note:**
> The `WaveShaperNode()`
> constructor is the recommended way to create a `WaveShaperNode`; see
> Creating an AudioNode.

## Syntax

```js
createWaveShaper()
```

### Parameters

None.

### Return value

A `WaveShaperNode`.

## Examples

The following example shows basic usage of an AudioContext to create a wave shaper node.
For more complete applied examples/information, check out our Voice-change-O-matic demo (see app.js for relevant code).

> **Note:**
> Sigmoid functions are commonly used for distortion curves
> because of their natural properties. Their S-shape, for instance, helps create a
> smoother sounding result. We found the below distortion curve code on Stack Overflow.

```js
const audioCtx = new AudioContext();
const distortion = audioCtx.createWaveShaper();

// …

function makeDistortionCurve(amount) {
  const k = typeof amount === "number" ? amount : 50;
  const numSamples = 44100;
  const curve = new Float32Array(numSamples);
  const deg = Math.PI / 180;

  for (let i = 0; i < numSamples; i++) {
    const x = (i * 2) / numSamples - 1;
    curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
  }
  return curve;
}

// …

distortion.curve = makeDistortionCurve(400);
distortion.oversample = "4x";
```

## See also

- Using the Web Audio API
