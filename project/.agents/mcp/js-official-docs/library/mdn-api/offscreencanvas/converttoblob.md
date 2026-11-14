---
title: "OffscreenCanvas: convertToBlob() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/offscreencanvas/converttoblob/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# OffscreenCanvas: convertToBlob() method

The **`OffscreenCanvas.convertToBlob()`** method creates a `Blob` object representing the image contained in the canvas.

The desired file format and image quality may be specified.
If the file format is not specified, or if the given format is not supported, then the data will be exported as `image/png`.
Browsers are required to support `image/png`; many will support additional formats including `image/jpeg` and `image/webp`.

The created image will have a resolution of 96dpi for file formats that support encoding resolution metadata.

## Syntax

```js
convertToBlob()
convertToBlob(options)
```

### Parameters

- `options` (optional)
    An object with the following properties:
    - `type`
        A string indicating the image format.
        The default type is `image/png`; this image format will be also used if the specified type is not supported.
    - `quality`
        A `Number` between `0` and `1` indicating the image quality to be used when creating images using file formats that support lossy compression (such as `image/jpeg` or `image/webp`).
        A user agent will use its default quality value if this option is not specified, or if the number is outside the allowed range.

### Return value

A `Promise` returning a `Blob` object representing the image contained in the canvas.

### Exceptions

The promise may be rejected with the following exceptions:

- `InvalidStateError` `DOMException`
    The `OffscreenCanvas` is not detached; in other words it still associated with the DOM and not the current worker.

- `SecurityError` `DOMException`
    The canvas context mode is 2d and the bitmap is not origin-clean; at least some of its contents have or may have been loaded from a site other than the one from which the document itself was loaded.

- `IndexSizeError` `DOMException`
    The canvas bitmap has no pixels (either the horizontal or vertical dimension is zero).

- `EncodingError` `DOMException`
    The blob could not be created due to an encoding error.

## Examples

```js
const offscreen = new OffscreenCanvas(256, 256);
const gl = offscreen.getContext("webgl");

// Perform some drawing using the gl context

offscreen.convertToBlob().then((blob) => console.log(blob));
// Blob { size: 334, type: "image/png" }
```

## See also

- The interface defining this method, `OffscreenCanvas`.
