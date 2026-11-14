---
title: "WaveShaperNode: curve property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/waveshapernode/curve/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WaveShaperNode: curve property

The `curve` property of the `WaveShaperNode` interface is a `Float32Array` of numbers describing the distortion to apply.

The mid-element of the array is applied to any signal value of `0`, the first one to signal values of `-1`, and the last to signal values of `1`; values lower than `-1` or greater than `1` are treated like `-1` or `1` respectively.

If necessary, intermediate values of the distortion curve are linearly interpolated.

> **Note:**
> The array can be a `null` value: in that case, no distortion is applied to the input signal.

## Value

A `Float32Array`.

## Examples

See `BaseAudioContext.createWaveShaper()` for example code.

## See also

- Using the Web Audio API
