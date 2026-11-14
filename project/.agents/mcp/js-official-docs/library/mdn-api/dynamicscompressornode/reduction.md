---
title: "DynamicsCompressorNode: reduction property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/dynamicscompressornode/reduction/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DynamicsCompressorNode: reduction property

The **`reduction`** read-only property of the `DynamicsCompressorNode` interface is a float representing the amount of gain reduction currently applied by the compressor to the signal.

Intended for metering purposes, it returns a value in dB, or `0` (no gain reduction) if no signal is fed into the `DynamicsCompressorNode`. The range of this value is between `-20` and `0` (in dB).

## Value

A float.

## Examples

```js
const audioCtx = new AudioContext();
const compressor = audioCtx.createDynamicsCompressor();
const myReduction = compressor.reduction;
```

See `BaseAudioContext.createDynamicsCompressor()` for more complete example code.

## See also

- Using the Web Audio API
