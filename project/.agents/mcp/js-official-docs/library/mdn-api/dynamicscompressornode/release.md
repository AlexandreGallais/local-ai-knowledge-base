---
title: "DynamicsCompressorNode: release property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/dynamicscompressornode/release/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DynamicsCompressorNode: release property

The `release` property of the `DynamicsCompressorNode` interface Is a k-rate `AudioParam` representing the amount of time, in seconds, required to increase the gain by 10 dB. It defines how quick the signal is adapted when its volume is reduced.

The `release` property's default value is `0.25` and it can be set between `0` and `1`.

## Value

An `AudioParam`.

> **Note:**
> Though the `AudioParam` returned is read-only, the value it represents is not.

## Examples

```js
const audioCtx = new AudioContext();
const compressor = audioCtx.createDynamicsCompressor();
compressor.release.value = 0.25;
```

See `BaseAudioContext.createDynamicsCompressor()` for more complete example code.

## See also

- Using the Web Audio API
