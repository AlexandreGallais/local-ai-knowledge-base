---
title: "CanvasRenderingContext2D: fillText() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/canvasrenderingcontext2d/filltext/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CanvasRenderingContext2D: fillText() method

The `CanvasRenderingContext2D` method
**`fillText()`**, part of the Canvas 2D API, draws a text string
at the specified coordinates, filling the string's characters with the current
`fillStyle`. An optional parameter
allows specifying a maximum width for the rendered text, which the user agent will achieve by condensing the text or by using a lower font size.

This method draws directly to the canvas without modifying the current path, so any
subsequent `fill()` or
`stroke()` calls will have no effect
on it.

The text is rendered using the font and text layout configuration as defined by the
`font`,
`textAlign`,
`textBaseline`, and
`direction` properties.

> **Note:**
> To draw the outlines of the characters in a string, call the context's
> `strokeText()` method.

## Syntax

```js
fillText(text, x, y)
fillText(text, x, y, maxWidth)
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
    The x-axis coordinate of the point at which to begin drawing the text, in pixels.
- `y`
    The y-axis coordinate of the baseline on which to begin drawing the text, in pixels.
- `maxWidth` (optional)
    The maximum number of pixels wide the text may be once rendered. If not specified,
    there is no limit to the width of the text. However, if this value is provided, the
    user agent will adjust the kerning, select a more horizontally condensed font (if one
    is available or can be generated without loss of quality), or scale down to a smaller
    font size in order to fit the text in the specified width.

### Return value

None (`undefined`).

## Examples

### Drawing filled text

This example writes the words "Hello world" using the `fillText()` method.

#### HTML

First, we need a canvas to draw into. This code creates a context 400 pixels wide and
150 pixels across.

```html
<canvas id="canvas" width="400" height="150"></canvas>
```

#### JavaScript

The JavaScript code for this example follows.

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.font = "50px serif";
ctx.fillText("Hello world", 50, 90);
```

This code obtains a reference to the `<canvas>`, then gets a reference
to its 2D graphics context.

With that in hand, we set the `font` to
50-pixel-tall "serif" (the user's default serif font),
then call `fillText()` to draw the text "Hello world," starting at the
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
ctx.fillText("Hello world", 50, 90, 140);
```

#### Result

## See also

- Drawing text
- `CanvasRenderingContext2D`
- `CanvasRenderingContext2D.strokeText()`
