---
title: "ImageData"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/imagedata/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ImageData

The **`ImageData`** interface represents the underlying pixel data of an area of a `<canvas>` element.

It is created using the `ImageData()` constructor or creator methods on the `CanvasRenderingContext2D` object associated with a canvas: `createImageData()` and `getImageData()`. It can also be used to set a part of the canvas by using `putImageData()`.

## Constructors

- `ImageData()`
    Creates an `ImageData` object from a given `Uint8ClampedArray` or `Float16Array` and the size of the image it contains. If no array is given, it creates an image of a transparent black rectangle. Note that this is the most common way to create such an object in workers as `createImageData()` is not available there.

## Instance properties

- `ImageData.data` (read-only)
    A `Uint8ClampedArray` or `Float16Array` representing a one-dimensional array containing the data in the RGBA order. The order goes by rows from the top-left pixel to the bottom-right.
- `ImageData.colorSpace` (read-only)
    A string indicating the color space of the image data.
- `ImageData.height` (read-only)
    An `unsigned long` representing the actual height, in pixels, of the `ImageData`.
- `ImageData.width` (read-only)
    An `unsigned long` representing the actual width, in pixels, of the `ImageData`.
- `ImageData.pixelFormat` (read-only) (experimental)
    A string indicating the format to use for the `ImageData`.

## See also

- `CanvasRenderingContext2D`
- The `<canvas>` element and its associated interface, `HTMLCanvasElement`.
