---
title: "CanvasRenderingContext2D: measureText() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/canvasrenderingcontext2d/measuretext/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CanvasRenderingContext2D: measureText() method

The
`CanvasRenderingContext2D.measureText()`
method returns a `TextMetrics` object that contains information about the
measured text (such as its width, for example).

## Syntax

```js
measureText(text)
```

### Parameters

- `text`
    The text string to measure.

### Return value

A `TextMetrics` object.

## Examples

Given this `<canvas>` element:

```html
<canvas id="canvas"></canvas>
```

… you can get a `TextMetrics` object using the following code:

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let text = ctx.measureText("Hello world");
console.log(text.width); // 56;
```

## See also

- The interface defining this method: `CanvasRenderingContext2D`
- `TextMetrics`
