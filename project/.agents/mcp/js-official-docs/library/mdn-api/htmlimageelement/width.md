---
title: "HTMLImageElement: width property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlimageelement/width/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLImageElement: width property

The **`width`** property of the `HTMLImageElement` interface indicates the width at which the image is drawn, in CSS pixels, if the image is being drawn or rendered to any visual medium such as a screen or printer. Otherwise, it's the natural, pixel density-corrected width of the image.

## Value

An integer value indicating the width of the image. The way the width is defined depends on whether the image is being rendered to a visual medium or not.

- If the image is being rendered to a visual medium such as a screen or printer, the width is expressed in CSS pixels.
- Otherwise, the image's width is represented using its natural (intrinsic) width, adjusted for the display density as indicated by `naturalWidth`.

## Examples

In this example, two different sizes are provided for an image of a clock using the `srcset` attribute. One is 200px wide and the other is 400px wide. Further, the `sizes` attribute is provided to specify the width at which the image should be drawn given the viewport's width.

### HTML

For viewports up to 400px wide, the image is drawn at a width of 200px. Otherwise, it's drawn at 400px.

```html
<p>Image width: <span class="size">?</span>px (resize to update)</p>
<img
  src="/en-US/docs/Web/HTML/Reference/Elements/img/clock-demo-200px.png"
  alt="Clock"
  srcset="
    /en-US/docs/Web/HTML/Reference/Elements/img/clock-demo-200px.png 200w,
    /en-US/docs/Web/HTML/Reference/Elements/img/clock-demo-400px.png 400w
  "
  sizes="(width <= 400px) 200px, 400px" />
```

### JavaScript

The JavaScript code looks at the `height` to determine the height of the image given the width at which it's currently drawn.

```js
const clockImage = document.querySelector("img");
let output = document.querySelector(".size");

const updateWidth = () => {
  output.innerText = clockImage.width;
};

updateWidth();
window.addEventListener("resize", updateWidth);
```

### Result

This example may be easier to try out .

## See also

- `HTMLImageElement.height`
- `HTMLImageElement.naturalWidth`
- `HTMLCanvasElement.width`
- `HTMLEmbedElement.width`
- `HTMLIFrameElement.width`
- `HTMLObjectElement.width`
- `HTMLSourceElement.width`
- `HTMLVideoElement.width`
