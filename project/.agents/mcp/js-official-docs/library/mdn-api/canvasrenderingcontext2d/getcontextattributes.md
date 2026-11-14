---
title: "CanvasRenderingContext2D: getContextAttributes() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/canvasrenderingcontext2d/getcontextattributes/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CanvasRenderingContext2D: getContextAttributes() method

The **`CanvasRenderingContext2D.getContextAttributes()`** method returns an object that contains attributes used by the context.

Note that context attributes may be requested when creating the context with `HTMLCanvasElement.getContext()`, but the attributes that are actually supported and used may differ.

## Syntax

```js
getContextAttributes()
```

### Parameters

None.

### Return value

A `CanvasRenderingContext2DSettings` object that contains the actual context parameters.
It has the following members:

- `alpha` (optional)
    A Boolean indicating if the canvas contains an alpha channel.
    If `false`, the backdrop is always opaque, which can speed up drawing of transparent content and images.
- `colorSpace` (optional)
    Indicates the color space of the rendering context. Possible values are:
    - `srgb`: denotes the sRGB color space
    - `display-p3`: denotes the display-p3 color space
- `colorType` (optional)
    Indicates the color type of the rendering context. Possible values are:
    - `"unorm8"` denotes the color channels to 8 bit unsigned values. This is the default value.
    - `"float16"` denotes the color channels to 16-bit floating-point values.
- `desynchronized` (optional)
    A Boolean indicating the user agent reduced the latency by desynchronizing the canvas paint cycle from the event loop.
- `willReadFrequently` (optional)
    A Boolean indicating whether or not this canvas uses software acceleration (instead of hardware acceleration) to support frequent read-back operations via `getImageData()`.

## Examples

This example shows how you can specify context attributes when creating a canvas context, and then call `getContextAttributes()` to read back the actual parameters that the browser used.

```html
<pre id="log"></pre>
```

```js
const logElement = document.getElementById("log");
function log(text) {
  logElement.innerText += text;
}
```

First we create a context using `HTMLCanvasElement.getContext()`, specifying just one context attribute.

```js
let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d", { alpha: false });
```

If the `getContextAttributes()` method is supported, we use it to read back the actual attributes used by the browser (including those we explicitly specified):

```js
if (ctx.getContextAttributes) {
  const attributes = ctx.getContextAttributes();
  log(JSON.stringify(attributes));
} else {
  log("CanvasRenderingContext2D.getContextAttributes() is not supported");
}
```

Depending on the attributes supported by the browser, the log below should display a string that looks something like: `{alpha: false, colorSpace: 'srgb', desynchronized: false, willReadFrequently: false}`

## See also

- `HTMLCanvasElement.getContext()`
- `WebGLRenderingContext.getContextAttributes()`
