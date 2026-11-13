---
title: "ImageBitmap"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/imagebitmap/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ImageBitmap

The **`ImageBitmap`** interface represents a bitmap image which can be drawn to a `<canvas>` without undue latency. It can be created from a variety of source objects using the `Window.createImageBitmap()` or `WorkerGlobalScope.createImageBitmap()` factory method. `ImageBitmap` provides an asynchronous and resource efficient pathway to prepare textures for rendering in WebGL.

`ImageBitmap` is a transferable object.

## Instance properties

- `ImageBitmap.height` (read-only)
    An `unsigned long` representing the height, in CSS pixels, of the `ImageBitmap`.
- `ImageBitmap.width` (read-only)
    An `unsigned long` representing the width, in CSS pixels, of the `ImageBitmap`.

## Instance methods

- `ImageBitmap.close()`
    Disposes of all graphical resources associated with an `ImageBitmap`.

## See also

- `Window.createImageBitmap`
- `WorkerGlobalScope.createImageBitmap`
- `CanvasRenderingContext2D.drawImage()`
- `WebGLRenderingContext.texImage2D()`
- `OffscreenCanvas.transferToImageBitmap()`
