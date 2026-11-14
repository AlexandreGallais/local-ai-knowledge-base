---
title: "BarcodeDetector"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/barcodedetector/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BarcodeDetector

The **`BarcodeDetector`** interface of the `Barcode Detection API` allows detection of linear and two dimensional barcodes in images.

## Constructors

- `BarcodeDetector.BarcodeDetector()` (experimental)
    Creates and returns a `BarcodeDetector` object, with optional `BarcodeDetectorOptions`.

## Static methods

- `getSupportedFormats()` (experimental)
    Returns a `Promise` which fulfills with an `Array` of supported barcode format types.

## Instance methods

- `detect()` (experimental)
    Returns a `Promise` which fulfills with an array of `DetectedBarcode` objects with the following properties:
    - `boundingBox`: A `DOMRectReadOnly`, which returns the dimensions of a rectangle representing the extent of a detected barcode, aligned with the image.
    - `cornerPoints`: The x and y co-ordinates of the four corner points of the detected barcode relative to the image, starting with the top left and working clockwise. This may not be square due to perspective distortions within the image.
    - `format`: The detected barcode format. (For a full list of formats, consult the supported barcode format) list.
    - `rawValue`: A string decoded from the barcode data.

## Examples

### Creating A Detector

This example creates a new barcode detector object, with specified supported formats and tests for browser compatibility.

```js
// check compatibility
if (!("BarcodeDetector" in globalThis)) {
  console.log("Barcode Detector is not supported by this browser.");
} else {
  console.log("Barcode Detector supported!");

  // create new detector
  const barcodeDetector = new BarcodeDetector({
    formats: ["code_39", "codabar", "ean_13"],
  });
}
```

### Getting Supported Formats

The following example calls the `getSupportedFormats()` static method and logs the results to the console.

```js
// check supported types
BarcodeDetector.getSupportedFormats().then((supportedFormats) => {
  supportedFormats.forEach((format) => console.log(format));
});
```

### Detect Barcodes

This example uses the `detect()` method to detect the barcodes within the given image. These are iterated over and the barcode data is logged to the console.

```js
barcodeDetector
  .detect(imageEl)
  .then((barcodes) => {
    barcodes.forEach((barcode) => console.log(barcode.rawValue));
  })
  .catch((err) => {
    console.log(err);
  });
```

## See also

- barcodefaq.com: A website with information about different barcodes and examples of the different types.
- Accelerated Shape Detection in Images
