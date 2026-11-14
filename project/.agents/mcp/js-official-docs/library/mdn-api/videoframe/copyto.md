---
title: "VideoFrame: copyTo() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/videoframe/copyto/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VideoFrame: copyTo() method

The **`copyTo()`** method of the `VideoFrame` interface copies the contents of the `VideoFrame` to an `ArrayBuffer`.

## Syntax

```js
copyTo(destination)
copyTo(destination, options)
```

### Parameters

- `destination`
    An `ArrayBuffer`, a `TypedArray`, or a `DataView` to copy to.
- `options` (optional)
    An object containing the following:
    - `rect` (optional)
        The rectangle of pixels to copy from the `VideoFrame`. If unspecified, the `visibleRect` will be used. This is in the format of a dictionary object containing:
        - `x`: The x-coordinate.
        - `y`: The y-coordinate.
        - `width`: The width of the frame.
        - `height`: The height of the frame.
    - `layout` (optional)
        A list containing the following values for each plane in the `VideoFrame`:
        - `offset`
            An integer representing the offset in bytes where the given plane begins.
        - `stride`
            An integer representing the number of bytes, including padding, used by each row of the plane.
            Planes may not overlap. If no `layout` is specified, the planes will be tightly packed.
    - `format` (optional)
        A pixel format for the pixel data in the `destination`. Can be set to `"RGBA"`, `"RGBX"`, `"BGRA"`, `"BGRX"`. If unspecified, the `format` will be used.
    - `colorSpace` (optional)
        Specifies the color space of the pixel data in the `destination`. Can be set to `"srgb"` for the sRGB color space or `"display-p3"` for the display-p3 color space. Only applicable for RGB pixel formats. If unspecified, `"srgb` will be used.

### Return value

A `Promise` that resolves to the layout of the copy when the copy has completed.

## Examples

The following example copies the entire contents of `videoFrame`.

```js
let buffer = new Uint8Array(videoFrame.allocationSize());
let layout = await videoFrame.copyTo(buffer);
```

The following example converts a portion of the `videoFrame` to RGB format.

```js
const videoRect = {
  x: 100,
  y: 100,
  width: 80,
  height: 60,
};
const options = {
  rect: videoRect,
  format: "RGBX",
  colorSpace: "display-p3",
};
const size = videoFrame.allocationSize(options);
const buffer = new ArrayBuffer(size);
const layout = await videoFrame.copyTo(buffer, options);
```
