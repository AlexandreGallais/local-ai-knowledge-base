---
title: "ConvolverNode"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/convolvernode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ConvolverNode

The `ConvolverNode` interface is an `AudioNode` that performs a Linear Convolution on a given `AudioBuffer`, often used to achieve a reverb effect. A `ConvolverNode` always has exactly one input and one output.

> **Note:**
> For more information on the theory behind Linear Convolution, see the Convolution article on Wikipedia.

       | Number of inputs
       | `1`

       | Number of outputs
       | `1`

       | Channel count mode
       | `"clamped-max"`

       | Channel count
       | `1`, `2`, or `4`

       | Channel interpretation
       | `"speakers"`

## Constructor

- `ConvolverNode()`
    Creates a new `ConvolverNode` object instance.

## Instance properties

_Inherits properties from its parent, `AudioNode`_.

- `ConvolverNode.buffer`
    A mono, stereo, or 4-channel _`AudioBuffer`_ containing the (possibly multichannel) impulse response used by the `ConvolverNode` to create the reverb effect.
- `ConvolverNode.normalize`
    A boolean that controls whether the impulse response from the buffer will be scaled by an equal-power normalization when the `buffer` attribute is set, or not.

## Instance methods

_No specific method; inherits methods from its parent, `AudioNode`_.

## Examples

The following example shows basic usage of an AudioContext to create a convolver node. You will need to find an impulse response to complete the example below. See our HolySpaceCow example for a complete, applied example.

```js
let audioCtx = new window.AudioContext();

async function createReverb() {
  let convolver = audioCtx.createConvolver();

  // load impulse response from file
  let response = await fetch("path/to/impulse-response.wav");
  let arraybuffer = await response.arrayBuffer();
  convolver.buffer = await audioCtx.decodeAudioData(arraybuffer);

  return convolver;
}

// …

let reverb = await createReverb();

// someOtherAudioNode -> reverb -> destination
someOtherAudioNode.connect(reverb);
reverb.connect(audioCtx.destination);
```

## See also

- Using the Web Audio API
