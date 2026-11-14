---
title: "HTMLCanvasElement: width property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlcanvaselement/width/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLCanvasElement: width property

The **`HTMLCanvasElement.width`** property is a
positive `integer` reflecting the `width` HTML
attribute of the `<canvas>` element interpreted in CSS pixels. When the
attribute is not specified, or if it is set to an invalid value, like a negative, the
default value of `300` is used.

Setting the `width` property resets the entire rendering context to its default state. This includes clearing the canvas (backing buffer), resetting the current path, and resetting _all_ properties like `fillStyle` and `globalCompositeOperation`. This reset occurs for all context types, and occurs even when setting `width` to its current value. To restore the previous content after changing the width, use `CanvasRenderingContext2D.getImageData()` and `CanvasRenderingContext2D.putImageData()`. Context properties must be separately tracked and restored.

This is one of the two properties, the other being
`HTMLCanvasElement.height`, that controls the size of the canvas.

## Value

A number.

## Examples

Given this `<canvas>` element:

```html
<canvas id="canvas" width="300" height="300"></canvas>
```

You can get the width of the canvas with the following code:

```js
const canvas = document.getElementById("canvas");
console.log(canvas.width); // 300
```

## See also

- `HTMLCanvasElement`: Interface used to define the `HTMLCanvasElement.width` property
- `HTMLCanvasElement.height`: Other property used to control the size of the canvas
- `HTMLEmbedElement.width`
- `HTMLIFrameElement.width`
- `HTMLImageElement.width`
- `HTMLObjectElement.width`
- `HTMLSourceElement.width`
- `HTMLVideoElement.width`
