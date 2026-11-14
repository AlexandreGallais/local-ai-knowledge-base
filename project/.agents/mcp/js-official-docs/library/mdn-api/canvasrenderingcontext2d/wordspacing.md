---
title: "CanvasRenderingContext2D: wordSpacing property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/canvasrenderingcontext2d/wordspacing/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CanvasRenderingContext2D: wordSpacing property

The **`CanvasRenderingContext2D.wordSpacing`** property of the Canvas API specifies the spacing between words when drawing text.

This corresponds to the CSS `word-spacing` property.

## Value

The word spacing as a string in the CSS `length` data format.
The default is `0px`.

The property can be used to get or set the spacing.
The property value will remain unchanged if set to an invalid/unparsable value.

## Examples

In this example we display the text "Hello World" three times, using the `wordSpacing` property to modify the spacing in each case.
The spacing is also displayed for each case, using the value of the property.

### HTML

```html
<canvas id="canvas" width="700"></canvas>
```

### JavaScript

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.font = "30px serif";

// Default word spacing
ctx.fillText(`Hello world (default: ${ctx.wordSpacing})`, 10, 40);

// Custom word spacing: 10px
ctx.wordSpacing = "10px";
ctx.fillText(`Hello world (${ctx.wordSpacing})`, 10, 90);

// Custom word spacing: 30px
ctx.wordSpacing = "30px";
ctx.fillText(`Hello world (${ctx.wordSpacing})`, 10, 140);
```

## See also

- `CanvasRenderingContext2D.letterSpacing`
