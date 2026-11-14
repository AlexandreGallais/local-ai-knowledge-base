---
title: "CanvasRenderingContext2D: imageSmoothingEnabled property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/canvasrenderingcontext2d/imagesmoothingenabled/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CanvasRenderingContext2D: imageSmoothingEnabled property

The **`imageSmoothingEnabled`** property of the
`CanvasRenderingContext2D` interface, part of the Canvas API, determines whether scaled images
are smoothed (`true`, default) or not (`false`). On getting the
`imageSmoothingEnabled` property, the last value it was set to is returned.

This property is useful for games and other apps that use pixel art. When enlarging
images, the default resizing algorithm will blur the pixels. Set this property to
`false` to retain the pixels' sharpness.

> **Note:**
> You can adjust the smoothing quality with the
> `imageSmoothingQuality`
> property.

## Value

A boolean value indicating whether to smooth scaled images or not. The default value is `true`.

## Examples

### Disabling image smoothing

This example compares three images. The first image is drawn at its natural size, the
second is scaled to 3X and drawn with image smoothing enabled, and the third is scaled
to 3X but drawn with image smoothing disabled.

#### HTML

```html
<canvas id="canvas" width="460" height="210"></canvas>
```

#### JavaScript

```js
const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");
ctx.font = "16px sans-serif";
ctx.textAlign = "center";

const img = new Image();
img.src = "/shared-assets/images/examples/big-star.png";
img.onload = () => {
  const w = img.width,
    h = img.height;

  ctx.fillText("Source", w * 0.5, 20);
  ctx.drawImage(img, 0, 24, w, h);

  ctx.fillText("Smoothing = TRUE", w * 2.5, 20);
  ctx.imageSmoothingEnabled = true;
  ctx.drawImage(img, w, 24, w * 3, h * 3);

  ctx.fillText("Smoothing = FALSE", w * 5.5, 20);
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(img, w * 4, 24, w * 3, h * 3);
};
```

#### Result

## See also

- The interface defining this property: `CanvasRenderingContext2D`
- `CanvasRenderingContext2D.imageSmoothingQuality`
- `image-rendering`
