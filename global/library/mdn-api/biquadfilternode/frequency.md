---
title: "BiquadFilterNode: frequency property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/biquadfilternode/frequency/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BiquadFilterNode: frequency property

The `frequency` property of the `BiquadFilterNode` interface is an a-rate `AudioParam` — a double representing a frequency in the current filtering algorithm measured in hertz (Hz).

Its default value is `350`, with a nominal range of `10` to the Nyquist frequency — that is, half of the sample rate.

## Value

An `AudioParam`.

> **Note:**
> Though the `AudioParam` returned is read-only, the value it represents is not.

## Examples

The following example shows basic usage of an AudioContext to create a Biquad filter node.
For a complete working example, check out our voice-change-o-matic demo (look at the source code too).

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
```

## See also

- Using the Web Audio API
