---
title: "VideoFrame: allocationSize() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/videoframe/allocationsize/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VideoFrame: allocationSize() method

The **`allocationSize()`** method of the `VideoFrame` interface returns the number of bytes required to hold the video as filtered by options passed into the method.

## Syntax

```js
allocationSize()
allocationSize(options)
```

### Parameters

- `options` (optional)
    An object containing the following:
    - `rect` (optional)
        The rectangle of pixels to copy from the `VideoFrame`. If unspecified the `visibleRect` will be used. This is in the format of a dictionary object containing:
        - `x`: The x-coordinate.
        - `y`: The y-coordinate.
        - `width`: The width of the frame.
        - `height`: The height of the frame.
    - `layout` (optional)
        A list containing the following values for each plane in the `VideoFrame`. Planes may not overlap. If unspecified the planes will be tightly packed:
        - `offset`
            An integer representing the offset in bytes where the given plane begins.
        - `stride`
            An integer representing the number of bytes, including padding, used by each row of the plane.
    - `format` (optional)
        A pixel format for the pixel data in the `destination`. Can be set to `"RGBA"`, `"RGBX"`, `"BGRA"`, `"BGRX"`. If unspecified, the `format` will be used.
    - `colorSpace` (optional)
        Specifies the color space of the pixel data in the `destination`. Can be set to `"srgb"` for the sRGB color space or `"display-p3"` for the display-p3 color space. Only applicable for RGB pixel formats. If unspecified, `"srgb` will be used.

### Return value

An integer containing the number of bytes needed to hold the frame as specified by `options`.

## Examples

In the following example the `allocationSize` is returned for the rectangle at top left with dimensions of 800 by 600.

```js
const videoRect = {
  x: 0,
  y: 0,
  width: 800,
  height: 600,
};
let size = VideoFrame.allocationSize({ rect: videoRect });
```
