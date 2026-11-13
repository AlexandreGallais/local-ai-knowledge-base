---
title: "CanvasRenderingContext2D: font property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/canvasrenderingcontext2d/font/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CanvasRenderingContext2D: font property

The **`CanvasRenderingContext2D.font`** property of the Canvas 2D API specifies the current text style to use when drawing text.
This string uses the same syntax as the CSS font specifier.

## Value

A string parsed as CSS `font` value. The default font is 10px sans-serif.

## Examples

### Using a custom font

In this example we use the `font` property to specify a custom font weight, size, and family.

#### HTML

```html
<canvas id="canvas"></canvas>
```

#### JavaScript

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.font = "bold 48px serif";
ctx.strokeText("Hello world", 50, 100);
```

#### Result

### Loading fonts with the CSS Font Loading API

With the help of the `FontFace` API, you can explicitly load fonts before using them in a canvas.

```js
let f = new FontFace("test", "url(x)");

f.load().then(() => {
  // Ready to use the font in a canvas context
});
```

## See also

- The interface defining this property: `CanvasRenderingContext2D`
