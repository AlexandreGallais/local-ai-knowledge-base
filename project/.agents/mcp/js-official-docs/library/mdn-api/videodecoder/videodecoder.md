---
title: "VideoDecoder: VideoDecoder() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/videodecoder/videodecoder/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VideoDecoder: VideoDecoder() constructor

The **`VideoDecoder()`** constructor creates a new `VideoDecoder` object with the provided `init.output` callback assigned as the output callback, the provided `init.error` callback as the error callback, and the `VideoDecoder.state` set to `"unconfigured"`.

## Syntax

```js
new VideoDecoder(options)
```

### Parameters

- `options`
    An object containing two callbacks.
    - `output`
        A callback which takes a `VideoFrame` object as its only argument.
    - `error`
        A callback which takes an `Error` object as its only argument.

## Examples

In the following example a `VideoDecoder` is created with the two required callback functions, one to deal with the decoded frame and the other to handle errors.

```js
const videoDecoder = new VideoDecoder({
  output: processVideo,
  error: onEncoderError,
});
```
