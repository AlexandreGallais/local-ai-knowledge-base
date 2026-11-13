---
title: "CanvasRenderingContext2D: strokeText() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/canvasrenderingcontext2d/stroketext/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CanvasRenderingContext2D: strokeText() method

The `CanvasRenderingContext2D` method
**`strokeText()`**, part of the Canvas 2D API, strokes — that
is, draws the outlines of — the characters of a text string at the specified
coordinates. An optional parameter allows specifying a maximum width for the rendered
text, which the user agent will achieve by condensing the text or by
using a lower font size.

This method draws directly to the canvas without modifying the current path, so any
subsequent `fill()` or
`stroke()` calls will have no effect
on it.

> **Note:**
> Use the `fillText()` method to
> fill the text characters rather than having just their outlines drawn.

## Syntax

```js
strokeText(text, x, y)
strokeText(text, x, y, maxWidth)
```

### Parameters

- `text`
    A string specifying the text string to render into the context.
    The text is rendered using the settings specified by
    `font`,
    `textAlign`,
    `textBaseline`, and
    `direction`.
- `x`
    The x-axis coordinate of the point at which to begin drawing the text.
- `y`
    The y-axis coordinate of the point at which to begin drawing the text.
- `maxWidth` (optional)
    The maximum width the text may be once rendered. If not specified, there is no limit
    to the width of the text. However, if this value is provided, the user agent will
    adjust the kerning, select a more horizontally condensed font (if one is available or
    can be generated without loss of quality), or scale down to a smaller font size in
    order to fit the text in the specified width.

### Return value

None (`undefined`).

## Examples

### Drawing text outlines

This example writes the words "Hello world" using the `strokeText()` method.

#### HTML

First, we need a canvas to draw into. This code creates a context 400 pixels wide and
150 pixels high.

```html
<canvas id="canvas" width="400" height="150"></canvas>
```

#### JavaScript

The JavaScript code for this example follows.

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.font = "50px serif";
ctx.strokeText("Hello world", 50, 90);
```

This code obtains a reference to the `<canvas>`, then gets a reference
to its 2D graphics context.

With that in hand, we set the `font` to
50-pixel-tall "serif" (the user's default serif font),
then call `strokeText()` to draw the text "Hello world," starting at the
coordinates (50, 90).

#### Result

### Restricting the text size

This example writes the words "Hello world," restricting its width to 140 pixels.

#### HTML

```html
<canvas id="canvas" width="400" height="150"></canvas>
```

#### JavaScript

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.font = "50px serif";
ctx.strokeText("Hello world", 50, 90, 140);
```

#### Result

## See also

- Drawing text
- The interface defining this method: `CanvasRenderingContext2D`
- `CanvasRenderingContext2D.fillText()`
