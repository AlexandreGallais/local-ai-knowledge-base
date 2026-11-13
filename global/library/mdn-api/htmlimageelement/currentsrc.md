---
title: "HTMLImageElement: currentSrc property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlimageelement/currentsrc/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLImageElement: currentSrc property

The **`currentSrc`** read-only property of the `HTMLImageElement` interface indicates the URL of the image selected by the browser to load.

## Value

A string indicating the full URL of the image currently selected by the browser to load. If the image uses the `srcset` attribute, `currentSrc` lets you determine which image from the set of provided images was selected by the browser. The property's value is unrelated to whether the image has successfully loaded or not.

## Examples

### Testing which image is loaded

In this example, two different sizes are provided for an image of a clock. One is 200px wide and the other is 400px wide. The `sizes` attribute is provided to indicate that the image should be drawn at 50% of the document width if the viewport is under 400px wide; otherwise, the image is drawn at 90% width of the document.

#### HTML

```html
<img
  src="/en-US/docs/Web/HTML/Reference/Elements/img/clock-demo-400px.png"
  alt="Clock"
  srcset="
    /en-US/docs/Web/HTML/Reference/Elements/img/clock-demo-200px.png 200w,
    /en-US/docs/Web/HTML/Reference/Elements/img/clock-demo-400px.png 400w
  "
  sizes="(width <= 400px) 50%, 90%" />
```

#### JavaScript

```js
const clockImage = document.querySelector("img");
const p = document.createElement("p");

p.textContent = clockImage.currentSrc.endsWith("200px.png")
  ? "Using the 200px image!"
  : "Using the 400px image.";
document.body.appendChild(p);
```

#### Result

## See also

- `HTMLImageElement.src`
- `HTMLImageElement.srcSet`
