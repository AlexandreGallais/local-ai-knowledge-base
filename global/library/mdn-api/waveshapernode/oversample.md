---
title: "WaveShaperNode: oversample property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/waveshapernode/oversample/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WaveShaperNode: oversample property

The `oversample` property of the `WaveShaperNode` interface is an enumerated value indicating if oversampling must be used. Oversampling is a technique for creating more samples (up-sampling) before applying a distortion effect to the audio signal.

Once applied, the number of samples is reduced to its initial numbers. This leads to better results by avoiding some aliasing, but comes at the expense of a lower precision shaping curve.

The possible `oversample` values are:

| Value    | Effect                                                                 |
| -------- | ---------------------------------------------------------------------- |
| `'none'` | Do not perform any oversampling.                                       |
| `'2x'`   | Double the number of samples before applying the shaping curve.        |
| `'4x'`   | Multiply by 4 the number of samples before applying the shaping curve. |

## Value

One of `'none'`, `'2x'`, or `'4x'`.

## Examples

See `BaseAudioContext.createWaveShaper()` for example code.

## See also

- Using the Web Audio API
