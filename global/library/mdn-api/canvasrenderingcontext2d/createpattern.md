---
title: "CanvasRenderingContext2D: createPattern() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/canvasrenderingcontext2d/createpattern/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CanvasRenderingContext2D: createPattern() method

The **`CanvasRenderingContext2D.createPattern()`** method of the Canvas 2D API creates a pattern using the specified image and repetition.
This method returns a `CanvasPattern`.

This method doesn't draw anything to the canvas directly.
The pattern it creates must be assigned to the `CanvasRenderingContext2D.fillStyle` or `CanvasRenderingContext2D.strokeStyle` properties, after which it is applied to any subsequent drawing.

## Syntax

```js
createPattern(image, repetition)
```

### Parameters

- `image`
    An image to be used as the pattern's image.
    It can be any of the following:
    - `HTMLImageElement` (``)
    - `SVGImageElement` (`<image>`)
    - `HTMLVideoElement` (``, by using the capture of the video)
    - `HTMLCanvasElement` (`<canvas>`)
    - `ImageBitmap`
    - `OffscreenCanvas`
    - `VideoFrame`

- `repetition`
    A string indicating how to repeat the pattern's image.
    Possible values are:
    - `"repeat"` (both directions)
    - `"repeat-x"` (horizontal only)
    - `"repeat-y"` (vertical only)
    - `"no-repeat"` (neither direction)

    A `null` value is treated the same as the empty string (`""`): both are synonyms of `"repeat"`.

### Return value

An opaque `CanvasPattern` describing a pattern.

If the `image` is not fully loaded (`HTMLImageElement.complete` is `false`), then `null` is returned.

## Examples

### Creating a pattern from an image

This example uses the `createPattern()` method to create a `CanvasPattern` with a repeating source image.
Once created, the pattern is assigned to the canvas context's fill style and applied to a rectangle.

The original image looks like this:

#### HTML

```html
<canvas id="canvas" width="300" height="300"></canvas>
```

#### JavaScript

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const img = new Image();
img.src = "canvas_create_pattern.png";
// Only use the image after it's loaded
img.onload = () => {
  const pattern = ctx.createPattern(img, "repeat");
  ctx.fillStyle = pattern;
  ctx.fillRect(0, 0, 300, 300);
};
```

### Creating a pattern from a canvas

In this example we create a pattern from the contents of an offscreen canvas.
We then apply it to the fill style of our primary canvas, and fill that canvas with the pattern.

#### JavaScript

```js
// Create a pattern, offscreen
const patternCanvas = document.createElement("canvas");
const patternContext = patternCanvas.getContext("2d");

// Give the pattern a width and height of 50
patternCanvas.width = 50;
patternCanvas.height = 50;

// Give the pattern a background color and draw an arc
patternContext.fillStyle = "#ffeecc";
patternContext.fillRect(0, 0, patternCanvas.width, patternCanvas.height);
patternContext.arc(0, 0, 50, 0, 0.5 * Math.PI);
patternContext.stroke();

// Create our primary canvas and fill it with the pattern
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
const pattern = ctx.createPattern(patternCanvas, "repeat");
ctx.fillStyle = pattern;
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Add our primary canvas to the webpage
document.body.appendChild(canvas);
```

#### Result

## See also

- The interface defining this method: `CanvasRenderingContext2D`
- `CanvasPattern`
