---
title: "DynamicsCompressorNode: knee property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/dynamicscompressornode/knee/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DynamicsCompressorNode: knee property

The `knee` property of the `DynamicsCompressorNode` interface is a k-rate `AudioParam` containing a decibel value representing the range above the threshold where the curve smoothly transitions to the compressed portion.

The `knee` property's default value is `30` and it can be set between `0` and `40`.

## Value

An `AudioParam`.

> **Note:**
> Though the `AudioParam` returned is read-only, the value it represents is not.

## Examples

```js
const audioCtx = new AudioContext();
const compressor = audioCtx.createDynamicsCompressor();
compressor.knee.value = 40;
```

See `BaseAudioContext.createDynamicsCompressor()` for more complete example code.

## See also

- Using the Web Audio API
