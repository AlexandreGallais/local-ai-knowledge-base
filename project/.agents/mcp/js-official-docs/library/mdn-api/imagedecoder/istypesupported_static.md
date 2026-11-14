---
title: "ImageDecoder: isTypeSupported() static method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/imagedecoder/istypesupported_static/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ImageDecoder: isTypeSupported() static method

The **`ImageDecoder.isTypeSupported()`** static method checks if a given MIME type can be decoded by the user agent.

## Syntax

```js
ImageDecoder.isTypeSupported(type)
```

### Parameters

- `type`
    A string containing the MIME type to check for decoding support.

### Return value

A `Promise` that resolves with a boolean value indicating whether images with a format of `type` can be decoded by the API.

## Examples

The following example checks if GIF and PCX images are supported for decoding and prints the result to the console.

```js
let isGifSupported = await ImageDecoder.isTypeSupported("image/gif");
console.log(`GIF supported: ${isGifSupported}`); // Likely true.

let isPcxSupported = await ImageDecoder.isTypeSupported("image/pcx");
console.log(`PCX supported: ${isPcxSupported}`); // Probably false
```
