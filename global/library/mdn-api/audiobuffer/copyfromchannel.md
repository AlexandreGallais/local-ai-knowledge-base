---
title: "AudioBuffer: copyFromChannel() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/audiobuffer/copyfromchannel/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AudioBuffer: copyFromChannel() method

The
**`copyFromChannel()`** method of the
`AudioBuffer` interface copies the audio sample data from the specified
channel of the `AudioBuffer` to a specified
`Float32Array`.

## Syntax

```js
copyFromChannel(destination, channelNumber, startInChannel)
```

### Parameters

- `destination`
    A `Float32Array` to copy the channel's samples to.
- `channelNumber`
    The channel number of the current `AudioBuffer` to copy the channel data
    from.
- `startInChannel` (optional)
    An optional offset into the source channel's buffer from which to begin copying
    samples. If not specified, a value of 0 (the beginning of the buffer) is assumed by
    default.

### Return value

None (`undefined`).

### Exceptions

- `IndexSizeError` `DOMException`
    The value of `channelNumber` specifies a channel number which doesn't exist (that is, it's greater than or equal to the value of `numberOfChannels` on the buffer).

## Examples

This example creates a new audio buffer, then copies the samples from another channel
into it.

```js
const myArrayBuffer = audioCtx.createBuffer(2, frameCount, audioCtx.sampleRate);
const anotherArray = new Float32Array(length);
myArrayBuffer.copyFromChannel(anotherArray, 1, 0);
```

## See also

- Using the Web Audio API
