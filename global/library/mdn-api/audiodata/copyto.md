---
title: "AudioData: copyTo() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/audiodata/copyto/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AudioData: copyTo() method

The **`copyTo()`** method of the `AudioData` interface copies a plane of an `AudioData` object to a destination buffer.

## Syntax

```js
copyTo(destination, options)
```

### Parameters

- `destination`
    An `ArrayBuffer`, a `TypedArray`, or a `DataView` to copy the plane to.
- `options`
    An object containing the following:
    - `planeIndex`
        The index of the plane to copy from.
    - `frameOffset` (optional)
        An integer giving the offset of the first frame to copy within the plane. Defaults to `0`.
    - `frameCount` (optional)
        An integer giving the number of frames to copy. If omitted, all frames from `frameOffset` to the end of the plane are copied.
    - `format` (optional)
        A string indicating the audio format that the source samples should be converted to when copied to the destination.
        This can be any of the values: `"u8"`, `"s16"`, `"s32"`, `"f32"`, `"u8-planar"`, `"s16-planar"`, `"s32-planar"`, and `"f32-planar"` (see `AudioData.format` for more information).
        Note that `"f32-planar"` must be supported.
        If omitted, the samples are copied in the `AudioData`'s own format.

### Return value

Undefined.

### Exceptions

- `InvalidStateError` `DOMException`
    Thrown if the `AudioData` object has been transferred.
- `RangeError`
    Thrown if one of the following conditions is met:
    - The length of the sample is longer than the destination length.
    - The format of the `AudioData` object describes a planar format, but `options.planeIndex` is outside of the number of planes available.
    - The format of the `AudioData` object describes an interleaved format, but `options.planeIndex` is greater than `0`.
- `NotSupportedError` `DOMException`
    Thrown if the specified `format` to convert the data to is not supported.

## Examples

The following example copies the plane at index `1` to a destination buffer.

```js
AudioData.copyTo(AudioBuffer, { planeIndex: 1 });
```
