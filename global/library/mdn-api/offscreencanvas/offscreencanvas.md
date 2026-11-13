---
title: "OffscreenCanvas: OffscreenCanvas() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/offscreencanvas/offscreencanvas/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# OffscreenCanvas: OffscreenCanvas() constructor

The **`OffscreenCanvas()`** constructor returns a newly instantiated `OffscreenCanvas` object.

## Syntax

```js
new OffscreenCanvas(width, height)
```

### Parameters

- `width`
    The width of the offscreen canvas.
- `height`
    The height of the offscreen canvas.

## Examples

This example creates a new offscreen canvas using the `OffscreenCanvas()` constructor.
We then initialize a WebGL context on it using the `getContext()` method.

```js
const offscreen = new OffscreenCanvas(256, 256);
const gl = offscreen.getContext("webgl");
```

## See also

- `OffscreenCanvas`, the interface this constructor belongs to
