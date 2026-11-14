---
title: "HTMLCanvasElement: mozOpaque property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlcanvaselement/mozopaque/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLCanvasElement: mozOpaque property

The non-standard **`HTMLCanvasElement.mozOpaque`** property is
a boolean value reflecting the `moz-opaque` HTML
attribute of the `<canvas>` element. It lets the canvas know whether or
not translucency will be a factor. If the canvas knows there's no translucency, painting
performance can be optimized.

> **Note:**
> This has been standardized as setting the `alpha` option to
> `false` when creating a drawing context with
> `HTMLCanvasElement.getContext()`. Use of `mozOpaque` should be
> avoided. Firefox will stop supporting it in the future.

## Value

A boolean value.

## Examples

Given this `<canvas>` element:

```html
<canvas id="canvas" width="300" height="300" moz-opaque></canvas>
```

You can get or set the `mozOpaque` property. For example, you could
conditionally set it to `true` if `mimeType === 'image/jpeg'`, or
similar, to gain performance in your application when translucency is not needed.

```js
const canvas = document.getElementById("canvas");
console.log(canvas.mozOpaque); // true
// deactivate it
canvas.mozOpaque = false;
```

## Specifications

Not part of any standard.

## See also

- `HTMLCanvasElement`: Interface used to define the `HTMLCanvasElement.mozOpaque` property
- `moz-opaque`: HTML attribute of the `<canvas>` element
- Optimizing your JavaScript game for Firefox OS
