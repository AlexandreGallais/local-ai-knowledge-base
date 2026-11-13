---
title: "WaveShaperNode"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/waveshapernode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WaveShaperNode

The **`WaveShaperNode`** interface represents a non-linear distorter.

It is an `AudioNode` that uses a curve to apply a wave shaping distortion to the signal. Beside obvious distortion effects, it is often used to add a warm feeling to the signal.

A `WaveShaperNode` always has exactly one input and one output.

       | Number of inputs
       | `1`

       | Number of outputs
       | `1`

       | Channel count mode
       | `"max"`

       | Channel count
       | `2` (not used in the default count mode)

       | Channel interpretation
       | `"speakers"`

## Constructor

- `WaveShaperNode()`
    Creates a new instance of a `WaveShaperNode` object.

## Instance properties

_Inherits properties from its parent, `AudioNode`_.

- `WaveShaperNode.curve`
    A `Float32Array` of numbers describing the distortion to apply.
- `WaveShaperNode.oversample`
    An enumerated value indicating if oversampling must be used. Oversampling is a technique for creating more samples (up-sampling) before applying the distortion effect to the audio signal.

## Instance methods

_No specific method; inherits methods from its parent, `AudioNode`_.

## Example

See `BaseAudioContext.createWaveShaper()` for example code.

## See also

- Using the Web Audio API
