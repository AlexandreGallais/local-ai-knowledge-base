---
title: "BiquadFilterNode: Q property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/biquadfilternode/q/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BiquadFilterNode: Q property

The `Q` property of the `BiquadFilterNode` interface is an a-rate `AudioParam`, a double representing a Q factor, or _quality factor_.

## Value

An `AudioParam`. Its `defaultValue` is `1`, and its `minValue` and `maxValue` are ±(2128 - 2104), or approximately ±3.403e38. This is the range of single-precision floating-point numbers.

Its actual value range depends on the filter's `type`:

- For `lowpass` and `highpass`, the `Q` value is interpreted to be in dB. For these filters the value range is [-Q, Q]
  where Q is the largest value for which 10Q/20 does not overflow the bound above. This is approximately 770.63678.
- For `bandpass`, `notch`, `allpass`, and `peaking`, the `Q` value is related to the bandwidth of the filter and should be positive, but there's no stricter maximum than the above.
- It is not used for `lowshelf` and `highshelf` filters.

> **Note:**
> Though the `AudioParam` returned is read-only, the value it represents is not.

## Examples

The following example shows basic usage of an AudioContext to create a Biquad filter node.
For more complete applied examples/information, check out our Voice-change-O-matic demo (see app.js lines 108–193 for relevant code).

```js
const audioCtx = new AudioContext();

// Set up the different audio nodes we will use for the app
const analyser = audioCtx.createAnalyser();
const distortion = audioCtx.createWaveShaper();
const gainNode = audioCtx.createGain();
const biquadFilter = audioCtx.createBiquadFilter();
const convolver = audioCtx.createConvolver();

// Connect the nodes together

source = audioCtx.createMediaStreamSource(stream);
source.connect(analyser);
analyser.connect(distortion);
distortion.connect(biquadFilter);
biquadFilter.connect(convolver);
convolver.connect(gainNode);
gainNode.connect(audioCtx.destination);

// Manipulate the Biquad filter

biquadFilter.type = "lowshelf";
biquadFilter.frequency.value = 1000;
biquadFilter.gain.value = 25;

biquadFilter.type = "peaking";
biquadFilter.frequency.value = 1000;
biquadFilter.Q.value = 100;
biquadFilter.gain.value = 25;
```

## See also

- Using the Web Audio API
