---
title: "BaseAudioContext: createBiquadFilter() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/baseaudiocontext/createbiquadfilter/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BaseAudioContext: createBiquadFilter() method

The `createBiquadFilter()` method of the `BaseAudioContext`
interface creates a `BiquadFilterNode`, which represents a second order
filter configurable as several different common filter types.

> **Note:**
> The `BiquadFilterNode()` constructor is the
> recommended way to create a `BiquadFilterNode`; see
> Creating an AudioNode.

## Syntax

```js
createBiquadFilter()
```

### Parameters

None.

### Return value

A `BiquadFilterNode`.

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
biquadFilter.frequency.setValueAtTime(1000, audioCtx.currentTime);
biquadFilter.gain.setValueAtTime(25, audioCtx.currentTime);
```

## See also

- Using the Web Audio API
