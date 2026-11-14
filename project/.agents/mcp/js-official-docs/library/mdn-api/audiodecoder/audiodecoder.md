---
title: "AudioDecoder: AudioDecoder() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/audiodecoder/audiodecoder/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AudioDecoder: AudioDecoder() constructor

The **`AudioDecoder()`** constructor creates a new `AudioDecoder` object with the provided `init.output` callback assigned as the output callback, the provided `init.error` callback as the error callback, and the `AudioDecoder.state` set to `"unconfigured"`.

## Syntax

```js
new AudioDecoder(init)
```

### Parameters

- `init`
    A dictionary object containing two required callbacks.
    - `output`
        A callback which is passed a single argument of an `AudioData` object.
    - `error`
        A callback which is passed a single argument of the error that has been thrown.

## Examples

In the following example an `AudioDecoder` is created with the two required callback functions, one to deal with the decoded chunk and the other to handle errors.

```js
const audioDecoder = new AudioDecoder({
  output: processAudio,
  error: onEncoderError,
});
```
