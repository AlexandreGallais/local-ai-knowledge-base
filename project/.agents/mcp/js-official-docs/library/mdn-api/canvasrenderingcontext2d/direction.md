---
title: "CanvasRenderingContext2D: direction property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/canvasrenderingcontext2d/direction/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CanvasRenderingContext2D: direction property

The
**`CanvasRenderingContext2D.direction`**
property of the Canvas 2D API specifies the current text direction used to draw text.

## Value

Possible values:

- `"ltr"`
    The text direction is left-to-right.
- `"rtl"`
    The text direction is right-to-left.
- `"inherit"`
    The text direction is inherited from the `<canvas>` element or the
    `Document` as appropriate. Default value.

The default value is `"inherit"`.

## Examples

### Changing text direction

This example draws two pieces of text. The first one is left-to-right, and the second
is right-to-left. Note that "Hi!" in `ltr` becomes "!Hi" in `rtl`.

#### HTML

```html
<canvas id="canvas"></canvas>
```

#### JavaScript

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.font = "48px serif";
ctx.fillText("Hi!", 150, 50);
ctx.direction = "rtl";
ctx.fillText("Hi!", 150, 130);
```

#### Result

## See also

- The interface defining this property: `CanvasRenderingContext2D`
