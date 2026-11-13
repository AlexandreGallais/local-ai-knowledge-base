---
title: "ImageBitmapRenderingContext: transferFromImageBitmap() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/imagebitmaprenderingcontext/transferfromimagebitmap/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ImageBitmapRenderingContext: transferFromImageBitmap() method

The **`ImageBitmapRenderingContext.transferFromImageBitmap()`**
method displays the given `ImageBitmap` in the canvas associated with this
rendering context. The ownership of the `ImageBitmap` is transferred to the
canvas as well.

This method was previously named `transferImageBitmap()`, but was renamed in
a spec change. The old name is being kept as an alias to avoid code breakage.

## Syntax

```js
transferFromImageBitmap(bitmap)
```

### Parameters

- `bitmap`
    An `ImageBitmap` object to transfer, or `null`. If the value is `null`, the canvas is reset to blank.

### Return value

None (`undefined`).

## Examples

### HTML

```html
<canvas id="htmlCanvas"></canvas>
```

### JavaScript

```js
const htmlCanvas = document
  .getElementById("htmlCanvas")
  .getContext("bitmaprenderer");

// Draw a WebGL scene offscreen
const offscreen = new OffscreenCanvas(256, 256);
const gl = offscreen.getContext("webgl");

// Perform some drawing using the gl context

// Transfer the current frame to the visible canvas
const bitmap = offscreen.transferToImageBitmap();
htmlCanvas.transferFromImageBitmap(bitmap);
```

## See also

- The interface defining this method, `ImageBitmapRenderingContext`
- `OffscreenCanvas`
- `OffscreenCanvas.transferToImageBitmap()`
