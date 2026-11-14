---
title: "DynamicsCompressorNode: threshold property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/dynamicscompressornode/threshold/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DynamicsCompressorNode: threshold property

The `threshold` property of the `DynamicsCompressorNode` interface is a k-rate `AudioParam` representing the decibel value above which the compression will start taking effect.

The `threshold` property's default value is `-24` and it can be set between `-100` and `0`.

## Value

An `AudioParam`.

> **Note:**
> Though the `AudioParam` returned is read-only, the value it represents is not.

## Examples

```js
const audioCtx = new AudioContext();
const compressor = audioCtx.createDynamicsCompressor();
compressor.threshold.value = -50;
```

See `BaseAudioContext.createDynamicsCompressor()` for more complete example code.

## See also

- Using the Web Audio API
