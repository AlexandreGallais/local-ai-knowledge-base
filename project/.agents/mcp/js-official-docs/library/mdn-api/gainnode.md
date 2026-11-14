---
title: "GainNode"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gainnode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GainNode

The `GainNode` interface represents a change in volume. It is an `AudioNode` audio-processing module that causes a given gain to be applied to the input data before its propagation to the output. A `GainNode` always has exactly one input and one output, both with the same number of channels.

The gain is a unitless value, changing with time, that is multiplied to each corresponding sample of all input channels. If modified, the new gain is instantly applied, causing unaesthetic 'clicks' in the resulting audio. To prevent this from happening, never change the value directly but use the exponential interpolation methods on the `AudioParam` interface.

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

- `GainNode()`
    Creates and returns a new `GainNode` object. As an alternative, you can use the `BaseAudioContext.createGain()` factory method; see Creating an AudioNode.

## Instance properties

_Inherits properties from its parent, `AudioNode`_.

- `GainNode.gain` (read-only)
    An a-rate `AudioParam` representing the amount of gain to apply. You have to set `AudioParam.value` or use the methods of `AudioParam` to change the effect of gain.

## Instance methods

_No specific method; inherits methods from its parent, `AudioNode`_.

## Example

See `BaseAudioContext.createGain()` for example code showing how to use an `AudioContext` to create a `GainNode`.

## See also

- Using the Web Audio API
