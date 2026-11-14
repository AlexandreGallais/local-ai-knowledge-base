---
title: "OffscreenCanvas: width property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/offscreencanvas/width/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# OffscreenCanvas: width property

The **`width`** property returns and sets the width of an `OffscreenCanvas` object.

## Value

A positive integer representing the width of the offscreen canvas in CSS pixels.

## Examples

Creating a new offscreen canvas and returning or setting the width of the offscreen canvas:

```js
const offscreen = new OffscreenCanvas(256, 256);
offscreen.width; // 256
offscreen.width = 512;
```

## See also

- `OffscreenCanvas`, the interface this property belongs to.
