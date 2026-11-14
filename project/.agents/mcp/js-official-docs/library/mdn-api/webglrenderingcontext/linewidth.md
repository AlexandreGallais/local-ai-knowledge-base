---
title: "WebGLRenderingContext: lineWidth() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/linewidth/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: lineWidth() method

The **`WebGLRenderingContext.lineWidth()`** method of the WebGL API sets the line width of rasterized
lines.

## Syntax

```js
lineWidth(width)
```

### Parameters

- `width`
    A `GLfloat` specifying the width of rasterized lines. Default value: 1.

### Return value

None (`undefined`).

## Examples

Setting the line width:

```js
gl.lineWidth(5);
```

Getting the line width:

```js
gl.getParameter(gl.LINE_WIDTH);
```

Getting the range of available widths. Returns a `Float32Array`.

```js
gl.getParameter(gl.ALIASED_LINE_WIDTH_RANGE);
```

## See also

- `WebGLRenderingContext`
