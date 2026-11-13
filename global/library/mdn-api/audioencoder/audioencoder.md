---
title: "AudioEncoder: AudioEncoder() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/audioencoder/audioencoder/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AudioEncoder: AudioEncoder() constructor

The **`AudioEncoder()`** constructor creates a new `AudioEncoder` object with the provided `init.output` callback assigned as the output callback, the provided `init.error` callback as the error callback, and the `AudioEncoder.state` set to `"unconfigured"`.

## Syntax

```js
new AudioEncoder(init)
```

### Parameters

- `init`
    An object containing two required callbacks.
    - `output`
        A callback which takes an `EncodedAudioChunk` object as the first argument, and an optional metadata object as the second. The metadata object has one member, `decoderConfig` which has an object as its value containing:
        - `codec`
            A string containing a valid codec string.
        - `sampleRate`
            An integer representing the number of frame samples per second.
        - `numberOfChannels`
            An integer representing the number of audio channels.
        - `description` (optional)
            An `ArrayBuffer`, a `TypedArray`, or a `DataView` containing a sequence of codec specific bytes, commonly known as extradata.
    - `error`
        A callback which takes an `Error` object as its only argument.

## Examples

In the following example an `AudioEncoder` is created with the two required callback functions, one to deal with the decoded frame and the other to handle errors.

```js
const audioEncoder = new AudioEncoder({
  output: processAudio,
  error: onEncoderError,
});
```
