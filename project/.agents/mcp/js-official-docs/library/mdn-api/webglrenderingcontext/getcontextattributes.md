---
title: "WebGLRenderingContext: getContextAttributes() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/getcontextattributes/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: getContextAttributes() method

The **`WebGLRenderingContext.getContextAttributes()`** method
returns a `WebGLContextAttributes` object that contains the actual context
parameters. Might return `null`, if the context is lost.

## Syntax

```js
getContextAttributes()
```

### Parameters

None.

### Return value

A `WebGLContextAttributes` object that contains the actual context
parameters, or `null` if the context is lost.

## Examples

Given this `<canvas>` element

```html
<canvas id="canvas"></canvas>
```

and given this WebGL context

```js
const canvas = document.getElementById("canvas");
const gl = canvas.getContext("webgl");
gl.getContextAttributes();
```

the `getContextAttributes` method returns an object that describes the
attributes set on this context, for example:

```json
{
  "alpha": true,
  "antialias": true,
  "depth": true,
  "failIfMajorPerformanceCaveat": false,
  "powerPreference": "default",
  "premultipliedAlpha": true,
  "preserveDrawingBuffer": false,
  "stencil": false,
  "desynchronized": false
}
```

The context attributes can be set when creating the context using the
`HTMLCanvasElement.getContext()` method:

```js
canvas.getContext("webgl", { antialias: false, depth: false });
```

See `getContext()` for more information
about the individual attributes.

## See also

- `HTMLCanvasElement.getContext()`
- `CanvasRenderingContext2D.getContextAttributes()`
