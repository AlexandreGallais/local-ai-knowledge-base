---
title: "ImageData: pixelFormat property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/imagedata/pixelformat/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ImageData: pixelFormat property

The read-only **`ImageData.pixelFormat`** property is a string indicating the pixel format of the image data.

The pixel format can be set during `ImageData` initialization using either the `ImageData()` constructor or the `createImageData()` method.

## Value

This property can have the following values:

- `"rgba-unorm8"` representing RGBA with 8 bit per component unsigned normalized format, using a `Uint8ClampedArray`.
- `"rgba-float16"` representing RGBA with 16 bits per component, using a `Float16Array`. Floating-point pixel values allow representing colors in arbitrarily wide gamuts and high dynamic range (HDR).

## Examples

### Floating-point pixel data for wide gamuts and high dynamic range (HDR)

Floating-point pixel values allow representing colors in arbitrarily wide gamuts and high dynamic range (HDR). You can set the `pixelFormat` setting to `"rgba-float16"` to use RGBA values with 16 bits per component. This requires the `dataArray` to be a `Float16Array`.

```js
let floatArray = new Float16Array(4 * 200 * 200);
let imageData = new ImageData(floatArray, 200, 200, {
  pixelFormat: "rgba-float16",
});
console.log(imageData.pixelFormat); // "rgba-float16"
```

## See also

- `ImageData`
- `Float16Array`
- `CanvasRenderingContext2D.createImageData()`
- `CanvasRenderingContext2D.putImageData()`
