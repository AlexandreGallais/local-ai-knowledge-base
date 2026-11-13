---
title: "DynamicsCompressorNode"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/dynamicscompressornode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DynamicsCompressorNode

The `DynamicsCompressorNode` interface provides a compression effect, which lowers the volume of the loudest parts of a signal.
Compression can help prevent clipping and distortion when multiple sounds are combined, and it is also used in music production and game audio for dynamic control, tone shaping, and creative effects.
`DynamicsCompressorNode` is an `AudioNode` that has exactly one input and one output.

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

- `DynamicsCompressorNode()`
    Creates a new instance of a `DynamicsCompressorNode` object.

## Instance properties

_Inherits properties from its parent, `AudioNode`_.

- `DynamicsCompressorNode.threshold` (read-only)
    A k-rate `AudioParam` representing the decibel value above which the compression will start taking effect.
- `DynamicsCompressorNode.knee` (read-only)
    A k-rate `AudioParam` containing a decibel value representing the range above the threshold where the curve smoothly transitions to the compressed portion.
- `DynamicsCompressorNode.ratio` (read-only)
    A k-rate `AudioParam` representing the amount of change, in dB, needed in the input for a 1 dB change in the output.
- `DynamicsCompressorNode.reduction` (read-only)
    A `float` representing the amount of gain reduction currently applied by the compressor to the signal.
- `DynamicsCompressorNode.attack` (read-only)
    A k-rate `AudioParam` representing the amount of time, in seconds, required to reduce the gain by 10 dB.
- `DynamicsCompressorNode.release` (read-only)
    A k-rate `AudioParam` representing the amount of time, in seconds, required to increase the gain by 10 dB.

## Instance methods

_No specific methods; inherits methods from its parent, `AudioNode`_.

## Example

See `BaseAudioContext.createDynamicsCompressor()` example code.

## See also

- Using the Web Audio API
