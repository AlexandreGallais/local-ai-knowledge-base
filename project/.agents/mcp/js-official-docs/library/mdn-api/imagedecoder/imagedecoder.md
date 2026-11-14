---
title: "ImageDecoder: ImageDecoder() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/imagedecoder/imagedecoder/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ImageDecoder: ImageDecoder() constructor

The **`ImageDecoder()`** constructor creates a new `ImageDecoder` object which unpacks and decodes image data.

## Syntax

```js
new ImageDecoder(init)
```

### Parameters

- `init`
    An object containing the following members:
    - `type`
        A string containing the MIME type of the image file to be decoded.
    - `data`
        An `ArrayBuffer`, a `TypedArray`, a `DataView`, or a `ReadableStream` of bytes representing an encoded image type as described by `type`.
    - `colorSpaceConversion` (optional)
        Specifies whether the image should be decoded using color space conversion. If not provided set as `"default"`. The value `"default"` indicates that implementation-specific behavior is used:
        - `"none"`
        - `"default"`
    - `desiredWidth` (optional)
        An integer indicating the desired width for the decoded output. Has no effect unless the image codec supports variable resolution decoding.
    - `desiredHeight` (optional)
        An integer indicating the desired height for the decoded output. Has no effect unless the image codec supports variable resolution decoding.
    - `preferAnimation` (optional)
        A `Boolean` indicating whether the initial track selection should prefer an animated track.
    - `transfer`
        An array of `ArrayBuffer`s that `ImageDecoder` will detach and take ownership of. If the array contains the `ArrayBuffer` backing `data`, `ImageDecoder` will use that buffer directly instead of copying from it.

## Examples

The following example creates a new `ImageDecoder` with the required options.

```js
let init = {
  type: "image/png",
  data: imageByteStream,
};

let imageDecoder = new ImageDecoder(init);
```
