---
title: "Drawing text"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/canvas_api/tutorial/drawing_text/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Drawing text

After having seen how to apply styles and colors in the previous chapter, we will now have a look at how to draw text onto the canvas.

## Drawing text

The canvas rendering context provides two methods to render text:

- `fillText(text, x, y [, maxWidth])`
    Fills a given text at the given (x,y) position. Optionally with a maximum width to draw.
- `strokeText(text, x, y [, maxWidth])`
    Strokes a given text at the given (x,y) position. Optionally with a maximum width to draw.

### A `fillText` example

The text is filled using the current `fillStyle`.

```js
function draw() {
  const ctx = document.getElementById("my-canvas").getContext("2d");
  ctx.font = "48px serif";
  ctx.fillText("Hello world", 10, 50);
}
```

```html
<canvas id="my-canvas" width="300" height="100"></canvas>
```

```js
draw();
```

### A `strokeText` example

The text is filled using the current `strokeStyle`.

```js
function draw() {
  const ctx = document.getElementById("my-canvas").getContext("2d");
  ctx.font = "48px serif";
  ctx.strokeText("Hello world", 10, 50);
}
```

```html
<canvas id="my-canvas" width="300" height="100"></canvas>
```

```js
draw();
```

## Styling text

In the examples above we are already making use of the `font` property to make the text a bit larger than the default size. There are some more properties which let you adjust the way the text gets displayed on the canvas:

- `font = value`
    The current text style being used when drawing text. This string uses the same syntax as the CSS `font` property. The default font is 10px sans-serif.
- `textAlign = value`
    Text alignment setting. Possible values: `start`, `end`, `left`, `right` or `center`. The default value is `start`.
- `textBaseline = value`
    Baseline alignment setting. Possible values: `top`, `hanging`, `middle`, `alphabetic`, `ideographic`, `bottom`. The default value is `alphabetic`.
- `direction = value`
    Directionality. Possible values: `ltr`, `rtl`, `inherit`. The default value is `inherit`.

These properties might be familiar to you, if you have worked with CSS before.

The following diagram from the HTML spec demonstrates the various baselines supported by the `textBaseline` property.

### A `textBaseline` example

This example demonstrates the various `textBaseline` property values.
See the `CanvasRenderingContext2D.textBaseline` page for more information and detailed examples.

```html
<canvas id="my-canvas" width="400" height="100"></canvas>
```

```js
function draw() {
  const ctx = document.getElementById("my-canvas").getContext("2d");
  ctx.font = "48px serif";

  ctx.textBaseline = "hanging";
  ctx.strokeText("hanging", 10, 50);

  ctx.textBaseline = "middle";
  ctx.strokeText("middle", 250, 50);

  ctx.beginPath();
  ctx.moveTo(10, 50);
  ctx.lineTo(300, 50);
  ctx.stroke();
}
```

```js
draw();
```

## Advanced text measurements

In the case you need to obtain more details about the text, the following method allows you to measure it.

- `measureText()`
    Returns a `TextMetrics` object containing the width, in pixels, that the specified text will be when drawn in the current text style.

The following code snippet shows how you can measure a text and get its width.

```js
function draw() {
  const ctx = document.getElementById("my-canvas").getContext("2d");
  const text = ctx.measureText("foo"); // TextMetrics object
  text.width; // 16;
}
```
