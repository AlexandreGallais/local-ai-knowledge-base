---
title: "StereoPannerNode"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/stereopannernode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# StereoPannerNode

The `StereoPannerNode` interface of the Web Audio API represents a simple stereo panner node that can be used to pan an audio stream left or right. It is an `AudioNode` audio-processing module that positions an incoming audio stream in a stereo image using a low-cost equal-power panning algorithm.

The `pan` property takes a unitless value between `-1` (full left pan) and `1` (full right pan). This interface was introduced as a much simpler way to apply a simple panning effect than having to use a full `PannerNode`.

       | Number of inputs
       | `1`

       | Number of outputs
       | `1`

       | Channel count mode
       | `"clamped-max"`

       | Channel count
       | `2`

       | Channel interpretation
       | `"speakers"`

## Constructor

- `StereoPannerNode()`
    Creates a new instance of a `StereoPannerNode` object.

## Instance properties

_Inherits properties from its parent, `AudioNode`_.

- `StereoPannerNode.pan` (read-only)
    An a-rate `AudioParam` representing the amount of panning to apply.

## Instance methods

_No specific method; inherits methods from its parent, `AudioNode`_.

## Example

See `BaseAudioContext.createStereoPanner()` for example code.

## See also

- Using the Web Audio API
