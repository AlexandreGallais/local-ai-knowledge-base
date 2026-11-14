---
title: "SVGFEGaussianBlurElement: y property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgfegaussianblurelement/y/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGFEGaussianBlurElement: y property

The **`y`** read-only property of the `SVGFEGaussianBlurElement` interface describes the vertical coordinate of the position of an SVG filter primitive as a `SVGAnimatedLength`.

It reflects the `y` attribute of the `<feGaussianBlur>` element, which blurs an input image. The attribute is a `<length>` or `<percentage>`. The `<coordinate>` is a length in the user coordinate system that is the given distance from the origin of the filter along the y-axis. If the `y` attribute is a percent value, the property value is relative to the height of the filter region in user coordinate system units. The default value is `0`.

## Value

An `SVGAnimatedLength`.

## Example

```js
const feGaussianBlur = document.querySelector("feGaussianBlur");
const topPosition = feGaussianBlur.y;
console.log(topPosition.baseVal.value); // the `y` value
```

## See also

- `SVGFEGaussianBlurElement.x`
- Applying effects with SVG filters
- CSS `blend-mode` data type
- CSS `blur()` function
- CSS filter effects module
- CSS `mix-blend-mode` property
