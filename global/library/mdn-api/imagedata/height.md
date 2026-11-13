---
title: "ImageData: height property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/imagedata/height/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ImageData: height property

The readonly **`ImageData.height`** property returns the number
of rows in the `ImageData` object.

## Value

A number.

## Examples

This example creates an `ImageData` object that is 200 pixels wide and 100
pixels tall. Thus, the `height` property is `100`.

```js
let imageData = new ImageData(200, 100);
console.log(imageData.height); // 100
```

## See also

- `ImageData.width`
- `ImageData`
