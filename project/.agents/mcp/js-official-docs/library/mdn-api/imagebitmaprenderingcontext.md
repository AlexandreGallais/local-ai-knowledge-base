---
title: "ImageBitmapRenderingContext"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/imagebitmaprenderingcontext/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ImageBitmapRenderingContext

The **`ImageBitmapRenderingContext`** interface is a canvas rendering context that provides the functionality to replace the canvas's contents with the given `ImageBitmap`. Its context id (the first argument to `HTMLCanvasElement.getContext()` or `OffscreenCanvas.getContext()`) is `"bitmaprenderer"`.

This interface is available in both the window and the worker context.

## Instance properties

- `ImageBitmapRenderingContext.canvas` (read-only)
    A read-only reference to the `HTMLCanvasElement` or `OffscreenCanvas` object that is associated with the given context.

## Instance methods

- `ImageBitmapRenderingContext.transferFromImageBitmap()`
    Displays the given `ImageBitmap` in the canvas associated with this rendering context. Ownership of the `ImageBitmap` is transferred to the canvas. This was previously named `transferImageBitmap()`, but was renamed in a spec change. The old name is being kept as an alias to avoid code breakage.

## See also

- `OffscreenCanvas`
