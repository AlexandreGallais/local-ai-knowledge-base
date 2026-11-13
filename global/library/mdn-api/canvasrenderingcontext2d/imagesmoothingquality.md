---
title: "CanvasRenderingContext2D: imageSmoothingQuality property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/canvasrenderingcontext2d/imagesmoothingquality/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CanvasRenderingContext2D: imageSmoothingQuality property

The **`imageSmoothingQuality`** property of the
`CanvasRenderingContext2D` interface, part of the Canvas API, lets you set the quality of
image smoothing.

> **Note:**
> For this property to have an effect,
> `imageSmoothingEnabled`
> must be `true`.

## Value

One of the following:

- `"low"`
    Low quality.
- `"medium"`
    Medium quality.
- `"high"`
    High quality.

The default value is `"low"`.

## Examples

### Setting image smoothing quality

This example uses the `imageSmoothingQuality` property with a scaled image.

#### HTML

```html
<canvas id="canvas"></canvas>
```

#### JavaScript

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let img = new Image();
img.src = "canvas_create_pattern.png";
img.onload = () => {
  ctx.imageSmoothingQuality = "low";
  ctx.drawImage(img, 0, 0, 300, 150);
};
```

#### Result

## See also

- The interface defining this property: `CanvasRenderingContext2D`
- `CanvasRenderingContext2D.imageSmoothingEnabled`
- `image-rendering`
