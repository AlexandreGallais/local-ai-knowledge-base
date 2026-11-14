---
title: "HTMLCanvasElement"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlcanvaselement/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLCanvasElement

The **`HTMLCanvasElement`** interface provides properties and methods for manipulating the layout and presentation of `<canvas>` elements. The `HTMLCanvasElement` interface also inherits the properties and methods of the `HTMLElement` interface.

## Instance properties

_Inherits properties from its parent, `HTMLElement`._

- `HTMLCanvasElement.height`
    The `height` HTML attribute of the `<canvas>` element is a non-negative `integer` reflecting the number of logical pixels (or RGBA values) going down one column of the canvas. When the attribute is not specified, or if it is set to an invalid value, like a negative, the default value of `150` is used. If no \[separate] CSS height is assigned to the `<canvas>`, then this value will also be used as the height of the canvas in the length-unit CSS Pixel.
- `HTMLCanvasElement.width`
    The `width` HTML attribute of the `<canvas>` element is a non-negative `integer` reflecting the number of logical pixels (or RGBA values) going across one row of the canvas. When the attribute is not specified, or if it is set to an invalid value, like a negative, the default value of `300` is used. If no \[separate] CSS width is assigned to the `<canvas>`, then this value will also be used as the width of the canvas in the length-unit CSS Pixel.
- `HTMLCanvasElement.mozOpaque` (non-standard) (deprecated)
    A boolean value reflecting the `moz-opaque` HTML attribute of the `<canvas>` element. It lets the canvas know whether or not translucency will be a factor. If the canvas knows there's no translucency, painting performance can be optimized. This is only supported in Mozilla-based browsers; use the standardized `canvas.getContext('2d', { alpha: false })` instead.
- `HTMLCanvasElement.mozPrintCallback` (non-standard)
    A `function` that is Initially null. Web content can set this to a JavaScript function that will be called when the canvas is to be redrawn while the page is being printed. When called, the callback is passed a "printState" object that implements the MozCanvasPrintState interface. The callback can get the context to draw to from the printState object and must then call done() on it when finished. The purpose of `mozPrintCallback` is to obtain a higher resolution rendering of the canvas at the resolution of the printer being used. See this blog post.

## Instance methods

_Inherits methods from its parent, `HTMLElement`._

- `HTMLCanvasElement.captureStream()`
    Returns a `CanvasCaptureMediaStreamTrack` that is a real-time video capture of the surface of the canvas.
- `HTMLCanvasElement.getContext()`
    Returns a drawing context on the canvas, or `null` if the context identifier is not supported, or the canvas has already been set to a different context mode.
- `HTMLCanvasElement.toDataURL()`
    Returns a data-URL containing a representation of the image in the format specified by the `type` parameter (defaults to `png`). The returned image is in a resolution of 96dpi.
- `HTMLCanvasElement.toBlob()`
    Creates a `Blob` object representing the image contained in the canvas; this file may be cached on the disk or stored in memory at the discretion of the user agent.
- `HTMLCanvasElement.transferControlToOffscreen()`
    Transfers control to an `OffscreenCanvas` object, either on the main thread or on a worker.

## Events

_Inherits events from its parent, `HTMLElement`._

Listen to these events using `addEventListener()` or by assigning an event listener to the `oneventname` property of this interface.

- `contextlost`
    Fired if the browser detects that the `CanvasRenderingContext2D` context has been lost.
- `contextrestored`
    Fired if the browser successfully restores a `CanvasRenderingContext2D` context
- `webglcontextcreationerror`
    Fired if the user agent is unable to create a `WebGLRenderingContext` or `WebGL2RenderingContext` context.
- `webglcontextlost`
    Fired if the user agent detects that the drawing buffer associated with a `WebGLRenderingContext` or `WebGL2RenderingContext` object has been lost.
- `webglcontextrestored`
    Fired if the user agent restores the drawing buffer for a `WebGLRenderingContext` or `WebGL2RenderingContext` object.

## See also

- HTML element implementing this interface: `<canvas>`
