---
title: "BarcodeDetector: detect() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/barcodedetector/detect/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BarcodeDetector: detect() method

The **`detect()`** method of the
`BarcodeDetector` interface returns a `Promise` which fulfills
with an `Array` of detected barcodes within an image.

## Syntax

```js
detect(imageBitmapSource)
```

### Parameters

- `imageBitmapSource`
    Receives an image source as a parameter. This can be a `HTMLImageElement`, a `SVGImageElement`, a `HTMLVideoElement`, a `HTMLCanvasElement`, an `ImageBitmap`, an `OffscreenCanvas`, a `VideoFrame`, a `Blob` of type image or an `ImageData` object.

### Return value

Returns a `Promise` which fulfills with an array of
`DetectedBarcode` objects with the following properties:

- `boundingBox`
    A `DOMRectReadOnly`, which returns the
    dimensions of a rectangle representing the extent of a detected barcode, aligned with
    the image.
- `cornerPoints`
    The x and y co-ordinates of the four corner points of the
    detected barcode relative to the image, starting with the top left and working
    clockwise. This may not be square due to perspective distortions within the image.
- `format`
    The detected barcode format. (For a full list of formats see
    the supported barcode format).
- `rawValue`
    A string decoded from the barcode data.

### Exceptions

- `TypeError`
    Thrown if no parameter is specified or the `type` is not that of an `ImageBitmapSource`.
- `SecurityError` `DOMException`
    Thrown if the `imageBitmapSource` has an origin and is not the same as the document's origin, or if the `imageBitmapSource` is a `HTMLCanvasElement` and its origin-clean flag is set to `false`.
- `InvalidStateError` `DOMException`
    Thrown if the `imageBitmapSource` is an `HTMLImageElement` and is not fully decoded or decoding failed, or is an `HTMLVideoElement` and its `readyState` is `HAVE_NOTHING` or `HAVE_METADATA`.

## Examples

This example uses the `detect()` method to detect the barcodes within the
given image. These are iterated over and the barcode data is logged to the console.

```js
barcodeDetector
  .detect(imageEl)
  .then((barcodes) => {
    barcodes.forEach((barcode) => console.log(barcode.rawValue));
  })
  .catch((err) => {
    console.error(err);
  });
```
