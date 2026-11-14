---
title: "BarcodeDetector: BarcodeDetector() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/barcodedetector/barcodedetector/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BarcodeDetector: BarcodeDetector() constructor

The **`BarcodeDetector()`** constructor creates
a new `BarcodeDetector` object which detects linear and two-dimensional
barcodes in images.

## Syntax

```js
new BarcodeDetector()
new BarcodeDetector(options)
```

### Parameters

- `options` (optional)
    An options object containing a series of `BarcodeFormats` to search for
    in the subsequent `detect()` calls. The
    options are:
    - `formats` (optional)
        An `Array` of barcode formats as strings.
        If not provided, `detect()` calls search for all supported formats.
        Limiting to specific formats is therefore recommended for performance reasons.
        To see a full list of supported formats see the supported barcode format.

### Exceptions

- `TypeError`
    Thrown if the `formats` is specified and the parameter is empty or contains `unknown`.

## Examples

This example creates a new barcode detector object, with specified supported formats
and tests for browser compatibility.

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
