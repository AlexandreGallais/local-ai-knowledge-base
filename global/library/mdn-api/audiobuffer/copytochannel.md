---
title: "AudioBuffer: copyToChannel() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/audiobuffer/copytochannel/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AudioBuffer: copyToChannel() method

The `copyToChannel()` method of the `AudioBuffer` interface copies
the samples to the specified channel of the `AudioBuffer`, from the source array.

## Syntax

```js
copyToChannel(source, channelNumber)
copyToChannel(source, channelNumber, startInChannel)
```

### Parameters

- `source`
    A `Float32Array` that the channel data will be copied from.
- `channelNumber`
    The channel number of the current `AudioBuffer` to copy the channel
    data to. If _channelNumber_ is greater than or equal to
    `AudioBuffer.numberOfChannels`, an `INDEX_SIZE_ERR` will be
    thrown.
- `startInChannel` (optional)
    An optional offset to copy the data to. If _startInChannel_ is greater than
    `AudioBuffer.length`, an `INDEX_SIZE_ERR` will be thrown.

### Return value

None (`undefined`).

## Examples

```js
const myArrayBuffer = audioCtx.createBuffer(2, frameCount, audioCtx.sampleRate);
const anotherArray = new Float32Array();
// Copy channel data from second channel of myArrayBuffer.
myArrayBuffer.copyFromChannel(anotherArray, 1, 0);
// Copy data from anotherArray to first channel of myArrayBuffer. Both channels have the same data now.
myArrayBuffer.copyToChannel(anotherArray, 0, 0);
```

## See also

- Using the Web Audio API
