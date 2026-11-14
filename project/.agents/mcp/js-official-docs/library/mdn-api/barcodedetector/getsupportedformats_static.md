---
title: "BarcodeDetector: getSupportedFormats() static method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/barcodedetector/getsupportedformats_static/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BarcodeDetector: getSupportedFormats() static method

The **`getSupportedFormats()`** static method
of the `BarcodeDetector` interface returns a `Promise` which
fulfills with an `Array` of supported barcode format types.

## Syntax

```js
BarcodeDetector.getSupportedFormats()
```

### Parameters

None.

### Return value

A `Promise` which fulfills with an `Array` of
supported barcode format types.

### Exceptions

No exceptions are thrown.

## Examples

The following example calls the `getSupportedFormats()` static method and logs
the results to the console.

```js
// check supported types
BarcodeDetector.getSupportedFormats().then((supportedFormats) => {
  supportedFormats.forEach((format) => console.log(format));
});
```
