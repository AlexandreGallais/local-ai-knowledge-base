---
title: "ImageData: colorSpace property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/imagedata/colorspace/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ImageData: colorSpace property

The read-only **`ImageData.colorSpace`** property is a string indicating the color space of the image data.

The color space can be set during `ImageData` initialization using either the `ImageData()` constructor or the `createImageData()` method.

## Value

This property can have the following values:

- `"srgb"` representing the sRGB color space.
- `"display-p3"` representing the display-p3 color space.

## Examples

### Getting the color space of canvas image data

The `getImageData()` method allows you to explicitly request a color space. If it doesn't match the color space the canvas was initialized with, a conversion will be performed.
Use the `colorSpace` property to know which color space your `ImageData` object is in.

```js
const context = canvas.getContext("2d", { colorSpace: "display-p3" });
context.fillStyle = "color(display-p3 0.5 0 0)";
context.fillRect(0, 0, 10, 10);

const p3ImageData = context.getImageData(0, 0, 1, 1);
console.log(p3ImageData.colorSpace); // "display-p3"

const srgbImageData = context.getImageData(0, 0, 1, 1, { colorSpace: "srgb" });
console.log(srgbImageData.colorSpace); // "srgb"
```

## See also

- `CanvasRenderingContext2D.createImageData()`
- `CanvasRenderingContext2D.getImageData()`
- `colorSpace` setting in `canvas.getContext()`
- Setting WebGL color spaces:
  - `WebGLRenderingContext.drawingBufferColorSpace`
  - `WebGLRenderingContext.unpackColorSpace`
