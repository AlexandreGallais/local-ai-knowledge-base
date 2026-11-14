---
title: "ImageData: width property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/imagedata/width/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ImageData: width property

The readonly **`ImageData.width`** property returns the number
of pixels per row in the `ImageData` object.

## Value

A number.

## Examples

This example creates an `ImageData` object that is 200 pixels wide and 100
pixels tall. Thus, the `width` property is `200`.

```js
let imageData = new ImageData(200, 100);
console.log(imageData.width); // 200
```

## See also

- `ImageData.height`
- `ImageData`
